# 全新 Node.js 兼容层设计方案

**日期**: 2025-11-09
**版本**: 2.0.0 (设计稿)
**作者**: Claude Code Assistant

---

## 📋 目录

1. [现状分析](#现状分析)
2. [问题与挑战](#问题与挑战)
3. [技术调研](#技术调研)
4. [新方案设计](#新方案设计)
5. [实施方案对比](#实施方案对比)
6. [推荐方案](#推荐方案)
7. [实施步骤](#实施步骤)
8. [风险评估](#风险评估)

---

## 现状分析

### 当前 NodeCompatLayer 的实现

目前的 `NodeCompatLayer.ts` 实现主要采用 **"欺骗式兼容"** 策略：

```typescript
createFsModule(): any {
  return {
    existsSync(_path: string): boolean {
      return false;  // ❌ 总是返回 false
    },
    writeFileSync(path: string, _data: any): void {
      console.warn(`fs.writeFileSync('${path}') called - no-op`);  // ❌ 仅警告，不执行
    },
    readFileSync(path: string): string {
      console.warn(`fs.readFileSync('${path}') called - returning empty`);
      return "";  // ❌ 总是返回空字符串
    }
  };
}
```

### 核心局限性

| 问题                      | 影响                              | 严重程度 |
| ------------------------- | --------------------------------- | -------- |
| **无真实文件操作**        | 不能读写文件，数据持久化失败      | ⛔️ 严重  |
| **fs API 是假的**         | 调用后没有实际效果，仅避免报错    | ⛔️ 严重  |
| **require() 只是注册表**  | 不能动态加载模块                  | 🟡 中等  |
| **path 功能受限**         | 仅基础字符串操作，无真实路径解析  | 🟢 轻微  |
| **无法与现有 npm 包配合** | 许多依赖 Node.js API 的包无法使用 | ⛔️ 严重  |

### 实际使用场景中的问题

**场景 1: 保存游戏配置**

```javascript
const fs = require("fs");
const config = { playerName: "Alice", level: 10 };

// ❌ 当前实现：什么都不做，数据丢失
fs.writeFileSync("config.json", JSON.stringify(config));

// ❌ 当前实现：返回空字符串，无法读取
const savedConfig = fs.readFileSync("config.json", "utf-8");
console.log(savedConfig); // ""
```

**场景 2: 检查文件是否存在**

```javascript
const fs = require("fs");

// ❌ 当前实现：总是返回 false
if (fs.existsSync("save-data.json")) {
	// 这里的代码永远不会执行
	console.log("Save data exists");
}
```

---

## 问题与挑战

### 核心挑战

1. **浏览器安全限制**
   - 浏览器不能访问本地文件系统（出于安全考虑）
   - 不能执行任意代码（沙箱限制）
   - 不能访问系统资源

2. **API 差异**
   - Node.js 是同步 API（blocking）
   - 浏览器主要是异步 API（non-blocking）
   - 文件路径概念不同（绝对路径 vs URL）

3. **性能与兼容性**
   - Polyfill 可能增加打包体积
   - 不同浏览器的兼容性问题
   - 运行时性能开销

### 需要解决的核心问题

1. ✅ **真实的文件系统操作**：读写文件应该有实际效果
2. ✅ **数据持久化**：数据应该能保存并在下次访问时恢复
3. ✅ **模块加载**：能够加载和使用 npm 包
4. ✅ **API 兼容性**：尽可能接近 Node.js 原生 API
5. ✅ **性能优化**：不影响应用整体性能

---

## 技术调研

### 方案 A: vite-plugin-node-polyfills（推荐）

#### 简介

[vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) 是一个 Vite 官方生态的插件，为浏览器环境提供 Node.js 核心模块的完整 polyfill。

#### 核心特性

```javascript
// 支持的模块（部分列表）
import { Buffer } from "buffer";
import { EventEmitter } from "events";
import path from "path";
import process from "process";
import stream from "stream";
import util from "util";
import crypto from "crypto";
```

#### 优势

| 特性            | 说明                                |
| --------------- | ----------------------------------- |
| ✅ **官方生态** | Vite 官方推荐，持续维护             |
| ✅ **全面覆盖** | 支持 30+ Node.js 核心模块           |
| ✅ **零配置**   | 开箱即用，自动处理                  |
| ✅ **按需加载** | 支持 Tree-shaking，只打包用到的模块 |
| ✅ **类型支持** | 完整的 TypeScript 类型定义          |
| ✅ **兼容性好** | Vite 2.x ~ 6.x 全版本支持           |

#### 安装与配置

```bash
pnpm add -D vite-plugin-node-polyfills
```

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	plugins: [
		nodePolyfills({
			// 默认启用所有 polyfill
			// 可以选择性排除某些模块
			exclude: ["fs"], // 如果不需要 fs

			// 或选择性启用
			include: ["path", "buffer", "process", "events"],

			// 全局变量注入
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},

			// 协议导入支持
			protocolImports: true, // 支持 import fs from 'node:fs'
		}),
	],
});
```

#### 文件系统处理

**重要**：`vite-plugin-node-polyfills` 默认**不包含 fs 模块**，因为浏览器无法真正访问文件系统。

可以配合 **memfs** 使用：

```typescript
import { nodePolyfills } from "vite-plugin-node-polyfills";

nodePolyfills({
	overrides: {
		// 使用 memfs 替代真实的 fs
		fs: "memfs",
	},
});
```

---

### 方案 B: memfs（内存文件系统）

#### 简介

[memfs](https://github.com/streamich/memfs) 是一个完全在内存中实现的文件系统，100% 兼容 Node.js `fs` API。

#### 核心特性

```javascript
import { fs } from "memfs";

// ✅ 真实的文件操作（在内存中）
fs.writeFileSync("/hello.txt", "Hello, World!");
const content = fs.readFileSync("/hello.txt", "utf-8");
console.log(content); // "Hello, World!"

// ✅ 支持目录操作
fs.mkdirSync("/my-dir");
fs.readdirSync("/"); // ['hello.txt', 'my-dir']

// ✅ 支持 Promise API
await fs.promises.writeFile("/async.txt", "Async content");
```

#### 优势

| 特性                 | 说明                          |
| -------------------- | ----------------------------- |
| ✅ **100% API 兼容** | 完全兼容 Node.js fs API       |
| ✅ **同步 + 异步**   | 支持 sync 和 promise 两种模式 |
| ✅ **轻量高效**      | 纯 JavaScript 实现，无依赖    |
| ✅ **持久化选项**    | 可配合 localStorage/IndexedDB |
| ✅ **开发工具友好**  | 支持 JSON 初始化、目录挂载    |

#### 局限性

| 局限                    | 影响                             |
| ----------------------- | -------------------------------- |
| ⚠️ **内存存储**         | 刷新页面后数据丢失（除非持久化） |
| ⚠️ **容量限制**         | 受浏览器内存限制                 |
| ⚠️ **无法访问本地文件** | 不能读取用户本地文件系统         |

#### 持久化方案

```typescript
import { fs, vol } from "memfs";

// 1. 保存到 localStorage
function saveToLocalStorage() {
	const snapshot = vol.toJSON(); // 导出整个文件系统
	localStorage.setItem("virtual-fs", JSON.stringify(snapshot));
}

// 2. 从 localStorage 恢复
function loadFromLocalStorage() {
	const snapshot = localStorage.getItem("virtual-fs");
	if (snapshot) {
		vol.fromJSON(JSON.parse(snapshot));
	}
}

// 3. 自动持久化
setInterval(saveToLocalStorage, 5000); // 每 5 秒自动保存
window.addEventListener("beforeunload", saveToLocalStorage); // 关闭前保存
```

---

### 方案 C: BrowserFS / ZenFS（高级方案）

#### 简介

[BrowserFS](https://github.com/jvilk/BrowserFS) 是一个功能强大的浏览器文件系统，支持多种后端存储。

**注意**: BrowserFS 正在迁移到 [ZenFS](https://github.com/zen-fs/core)（下一代版本）。

#### 核心特性

```javascript
import { configure, BFSRequire } from "browserfs";

configure(
	{
		fs: "MountableFileSystem",
		options: {
			"/tmp": { fs: "InMemory" },
			"/home": { fs: "IndexedDB", options: { storeName: "home" } },
			"/mnt": { fs: "LocalStorage" },
		},
	},
	(err) => {
		if (err) throw err;

		const fs = BFSRequire("fs");

		// ✅ 支持多种存储后端
		fs.writeFileSync("/tmp/temp.txt", "Temporary"); // 内存
		fs.writeFileSync("/home/data.txt", "Persistent"); // IndexedDB
		fs.writeFileSync("/mnt/config.json", "{}"); // LocalStorage
	},
);
```

#### 支持的后端

| 后端             | 特点           | 持久化 | 性能    |
| ---------------- | -------------- | ------ | ------- |
| **InMemory**     | 纯内存存储     | ❌     | ⚡️ 极快 |
| **LocalStorage** | localStorage   | ✅     | 🟢 快   |
| **IndexedDB**    | 异步数据库     | ✅     | 🟡 中等 |
| **OverlayFS**    | 分层文件系统   | 混合   | 🟡 中等 |
| **ZipFS**        | ZIP 文件读取   | ❌     | 🟢 快   |
| **Emscripten**   | WebAssembly FS | 可选   | ⚡️ 极快 |

#### 优势

| 特性                | 说明                            |
| ------------------- | ------------------------------- |
| ✅ **多后端支持**   | 灵活选择存储方式                |
| ✅ **持久化完善**   | IndexedDB/LocalStorage 双支持   |
| ✅ **大文件支持**   | IndexedDB 可存储 GB 级数据      |
| ✅ **分层架构**     | OverlayFS 支持只读 + 可写层     |
| ✅ **ZIP 文件支持** | 可直接挂载 ZIP 作为只读文件系统 |

#### 局限性

| 局限            | 影响                   |
| --------------- | ---------------------- |
| ⚠️ **包体积大** | 完整功能约 200KB       |
| ⚠️ **配置复杂** | 需要理解文件系统概念   |
| ⚠️ **异步 API** | IndexedDB 后端是异步的 |
| ⚠️ **项目状态** | 正在迁移到 ZenFS       |

---

### 方案 D: 自定义混合方案

结合多种技术的优势，打造最适合 RPGMV 的方案。

#### 架构设计

```plain
┌─────────────────────────────────────────────────────┐
│              Vite Build Process                      │
├─────────────────────────────────────────────────────┤
│  vite-plugin-node-polyfills                         │
│  ├─ Buffer, process, events, stream, util...        │
│  └─ 自动 polyfill 30+ Node.js 核心模块              │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│         RPGMV Plugin: NodeCompatLayer v2            │
├─────────────────────────────────────────────────────┤
│  1. 环境检测层                                       │
│     ├─ nw.js 环境 → 使用原生 Node.js API           │
│     └─ 浏览器环境 → 启用兼容层                      │
│                                                      │
│  2. 文件系统层 (memfs + 持久化)                     │
│     ├─ 内存文件系统 (memfs)                         │
│     ├─ localStorage 持久化                          │
│     ├─ IndexedDB 大文件支持                         │
│     └─ 虚拟文件系统挂载                             │
│                                                      │
│  3. 模块系统层                                       │
│     ├─ Vite polyfills 提供的模块                    │
│     ├─ 自定义模块注册表                             │
│     └─ CommonJS require() 实现                      │
│                                                      │
│  4. 全局变量注入层                                   │
│     ├─ __dirname / __filename                       │
│     ├─ Buffer (from polyfill)                       │
│     ├─ process (from polyfill)                      │
│     └─ global (from polyfill)                       │
└─────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│          RPGMV 游戏代码 & 其他插件                   │
│  ✅ 可以使用真实的 Node.js API                       │
│  ✅ 文件操作会真实执行（内存 + 持久化）              │
│  ✅ 可以使用 npm 包（如果已 polyfill）               │
└─────────────────────────────────────────────────────┘
```

---

## 新方案设计

### 推荐方案：方案 A + memfs 混合

#### 为什么选择这个方案？

| 考虑因素         | 方案评分                         |
| ---------------- | -------------------------------- |
| **实现复杂度**   | 🟢 低 - Vite 插件自动化处理      |
| **功能完整性**   | ✅ 高 - 覆盖绝大部分 Node.js API |
| **性能开销**     | 🟢 低 - Tree-shaking 优化        |
| **维护成本**     | 🟢 低 - 依赖官方维护的库         |
| **与 Vite 集成** | ✅ 完美 - 原生支持               |
| **文件系统功能** | ✅ 真实 - memfs 提供完整 fs API  |
| **数据持久化**   | ✅ 可选 - localStorage/IndexedDB |
| **nw.js 兼容**   | ✅ 完美 - 可条件禁用             |

---

## 实施方案对比

### 对比表

| 特性                 | 当前方案          | 方案 A            | 方案 A + memfs    | 方案 D (混合)         |
| -------------------- | ----------------- | ----------------- | ----------------- | --------------------- |
| **fs.readFileSync**  | ❌ 返回空字符串   | ❌ 不支持         | ✅ 真实读取       | ✅ 真实读取 + 持久化  |
| **fs.writeFileSync** | ❌ 无操作         | ❌ 不支持         | ✅ 真实写入       | ✅ 真实写入 + 持久化  |
| **path 模块**        | 🟡 基础实现       | ✅ 完整实现       | ✅ 完整实现       | ✅ 完整实现           |
| **Buffer**           | ❌ 不支持         | ✅ 完整实现       | ✅ 完整实现       | ✅ 完整实现           |
| **process**          | 🟡 mock 实现      | ✅ 完整实现       | ✅ 完整实现       | ✅ 完整实现           |
| **events**           | ❌ 不支持         | ✅ 完整实现       | ✅ 完整实现       | ✅ 完整实现           |
| **stream**           | ❌ 不支持         | ✅ 完整实现       | ✅ 完整实现       | ✅ 完整实现           |
| **crypto**           | ❌ 不支持         | ✅ 完整实现       | ✅ 完整实现       | ✅ 完整实现           |
| **数据持久化**       | ❌ 不支持         | ❌ 不支持         | 🟡 需手动实现     | ✅ 自动持久化         |
| **包体积增加**       | ~5KB              | ~50-100KB         | ~50-120KB         | ~100-150KB            |
| **配置复杂度**       | 🟢 低             | 🟢 低             | 🟡 中             | 🟡 中                 |
| **维护成本**         | 🔴 高（自己维护） | 🟢 低（社区维护） | 🟢 低（社区维护） | 🟡 中（部分自己维护） |

---

## 推荐方案

### 🎯 最终推荐：**方案 D（混合方案）**

#### 技术栈

1. **vite-plugin-node-polyfills** - 基础 Node.js 模块 polyfill
2. **memfs** - 内存文件系统
3. **自定义持久化层** - localStorage + IndexedDB
4. **自定义 RPGMV 插件** - NodeCompatLayer v2

#### 核心优势

✅ **真实的文件操作**
✅ **数据持久化**
✅ **完整的 Node.js API**
✅ **与 Vite 完美集成**
✅ **nw.js 环境自动禁用**
✅ **按需加载，优化体积**

---

## 实施步骤

### 阶段 1: 安装依赖

```bash
cd apps/drill
pnpm add -D vite-plugin-node-polyfills
pnpm add memfs
```

### 阶段 2: 配置 Vite 插件

```typescript
// apps/drill/vite.config.ts
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	plugins: [
		nodePolyfills({
			// 包含常用模块
			include: ["buffer", "process", "events", "stream", "util", "path"],

			// 全局变量
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},

			// 不包含 fs，因为我们用 memfs 替代
			exclude: ["fs"],

			// 支持 node: 协议
			protocolImports: true,
		}),

		// 其他插件...
	],
});
```

### 阶段 3: 重构 NodeCompatLayer 插件

创建新的 `NodeCompatLayer v2`：

```typescript
// apps/drill/src/rpgmv-plugins/NodeCompatLayerV2.ts

import { fs, vol } from "memfs";

interface NodeCompatLayerV2Static {
	version: string;
	initialized: boolean;
	isNwjs: boolean;

	// 文件系统
	fs: typeof fs;

	// 持久化
	saveToPersistentStorage(): void;
	loadFromPersistentStorage(): void;
	enableAutosave(interval?: number): void;

	// 虚拟文件系统
	mountVirtualFS(mountPoint: string, files: Record<string, string>): void;
}

const NodeCompatLayerV2: NodeCompatLayerV2Static = {
	version: "2.0.0",
	initialized: false,
	isNwjs: false,

	fs: fs as any,

	init() {
		// 检测 nw.js
		const hasProcess = typeof process !== "undefined";
		this.isNwjs = hasProcess && !!(process as any).versions?.nw;

		if (this.isNwjs) {
			console.log("[NodeCompatLayerV2] nw.js detected, using native APIs");
			return;
		}

		console.log("[NodeCompatLayerV2] Initializing browser compatibility layer...");

		// 初始化虚拟文件系统
		this.setupVirtualFS();

		// 加载持久化数据
		this.loadFromPersistentStorage();

		// 启用自动保存
		this.enableAutosave(5000);

		// 注入全局 fs
		(window as any).fs = fs;
		(window as any).require = this.createRequire();

		this.initialized = true;
		console.log("[NodeCompatLayerV2] Initialized successfully");
	},

	setupVirtualFS() {
		// 创建标准目录结构
		vol.fromJSON({
			"/home": null,
			"/tmp": null,
			"/save": null,
			"/config": null,
		});
	},

	saveToPersistentStorage() {
		try {
			const snapshot = vol.toJSON();

			// 小文件存 localStorage
			const smallFiles: Record<string, string> = {};
			const largeFiles: Record<string, string> = {};

			for (const [path, content] of Object.entries(snapshot)) {
				if (content && content.length < 10000) {
					smallFiles[path] = content;
				} else if (content) {
					largeFiles[path] = content;
				}
			}

			// 保存到 localStorage
			localStorage.setItem("vfs-small", JSON.stringify(smallFiles));

			// TODO: 大文件保存到 IndexedDB

			console.log("[NodeCompatLayerV2] Saved to persistent storage");
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to save:", error);
		}
	},

	loadFromPersistentStorage() {
		try {
			const smallData = localStorage.getItem("vfs-small");
			if (smallData) {
				const files = JSON.parse(smallData);
				vol.fromJSON(files);
				console.log("[NodeCompatLayerV2] Loaded from persistent storage");
			}
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to load:", error);
		}
	},

	enableAutosave(interval = 5000) {
		setInterval(() => this.saveToPersistentStorage(), interval);
		window.addEventListener("beforeunload", () => this.saveToPersistentStorage());
	},

	mountVirtualFS(mountPoint: string, files: Record<string, string>) {
		vol.fromJSON(files, mountPoint);
	},

	createRequire() {
		return function require(moduleName: string) {
			// fs 模块使用 memfs
			if (moduleName === "fs") {
				return fs;
			}

			// path 模块由 vite-plugin-node-polyfills 提供
			if (moduleName === "path") {
				return require("path"); // 使用 polyfill
			}

			// 其他模块...
			console.warn(`[NodeCompatLayerV2] Module '${moduleName}' not found`);
			return {};
		};
	},
};

// 立即初始化
(() => {
	NodeCompatLayerV2.init();
	(window as any).NodeCompatLayerV2 = NodeCompatLayerV2;
})();
```

### 阶段 4: 更新构建配置

```typescript
// apps/drill/build/plugins/index.ts

vitePluginTsupRpgmv({
  plugins: [
    {
      name: "NodeCompatLayerV2",
      srcPath: "./src/rpgmv-plugins/NodeCompatLayerV2.ts",
      outputPath: "./drill-project/js/plugins/NodeCompatLayerV2.js",
      description: "Node.js API 兼容层 v2 - 真实文件系统 + 持久化",
    },
    // ... 其他插件
  ],
}),
```

### 阶段 5: 测试验证

```javascript
// 在浏览器控制台测试

// ✅ 测试文件写入
const fs = require("fs");
fs.writeFileSync("/save/game-data.json", JSON.stringify({ level: 10 }));

// ✅ 测试文件读取
const data = fs.readFileSync("/save/game-data.json", "utf-8");
console.log(JSON.parse(data)); // { level: 10 }

// ✅ 测试持久化（刷新页面后）
// 数据应该仍然存在！

// ✅ 测试目录操作
fs.mkdirSync("/save/backups");
fs.readdirSync("/save"); // ['game-data.json', 'backups']
```

---

## 风险评估

### 技术风险

| 风险              | 可能性 | 影响  | 缓解措施                |
| ----------------- | ------ | ----- | ----------------------- |
| **包体积过大**    | 🟡 中  | 🟡 中 | Tree-shaking + 按需加载 |
| **性能下降**      | 🟢 低  | 🟡 中 | 异步操作 + Web Worker   |
| **浏览器兼容性**  | 🟢 低  | 🔴 高 | Polyfill + 降级方案     |
| **数据丢失**      | 🟡 中  | 🔴 高 | 多重备份 + 定期保存     |
| **与 nw.js 冲突** | 🟢 低  | 🔴 高 | 环境检测 + 条件加载     |

### 实施风险

| 风险           | 缓解措施           |
| -------------- | ------------------ |
| **学习曲线**   | 提供完整文档和示例 |
| **调试困难**   | 增强日志输出       |
| **迁移成本**   | 向后兼容，逐步迁移 |
| **第三方依赖** | 选择成熟稳定的库   |

---

## 下一步行动

### 讨论要点

1. **是否接受 100-150KB 的包体积增加？**
   - 考虑到功能提升，这个体积是可接受的吗？

2. **持久化策略**
   - localStorage（简单，容量限制 5-10MB）
   - IndexedDB（复杂，容量大）
   - 两者结合？

3. **迁移策略**
   - 一次性完全替换？
   - 保留旧版本，逐步迁移？
   - 提供兼容模式？

4. **性能要求**
   - 文件操作的频率？
   - 数据量级？
   - 对游戏性能的影响容忍度？

5. **功能范围**
   - 是否需要支持所有 Node.js 模块？
   - 还是只聚焦核心模块（fs, path, buffer）？

---

## 总结

### 现状问题

当前的 NodeCompatLayer 是"假兼容"，无法真正执行文件操作。

### 解决方案

采用 **vite-plugin-node-polyfills + memfs + 自定义持久化** 的混合方案。

### 预期效果

✅ **真实的 Node.js API** - 代码可以正常运行
✅ **数据持久化** - 文件写入后可以读取
✅ **向后兼容** - nw.js 环境不受影响
✅ **开发体验** - 可以使用 npm 生态的包

### 需要你的反馈

1. 是否认可这个技术方案？
2. 对包体积增加的看法？
3. 是否需要调整某些设计？
4. 是否立即开始实施，还是先做原型验证？

---

**等待你的反馈，我们可以一起完善这个方案！** 🚀
