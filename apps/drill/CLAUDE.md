# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 项目概述

这是一个 **drill-up** 项目的现代化改造版本，将传统的 RPG Maker MV (RMMV) 项目升级为使用 TypeScript + Vue 3 + Vite 的现代前端工程化项目。

核心特点：

- **双系统架构**：RMMV 游戏引擎 + Vue 3 现代 UI 层
- **TypeScript 插件开发**：使用 TypeScript 编写 RMMV 插件，自动编译为 ES5/IIFE 格式
- **零配置自动构建**：Vite 插件自动检测并构建 RPGMV 插件
- **多项目支持**：通过环境变量配置支持多个独立项目（drill, qj-en 等）

---

## 主动问询实施细节

在我与你沟通并要求你具体实施更改时，难免会遇到很多模糊不清的事情。

请你深度思考这些`遗漏点`，`缺漏点`，和`冲突相悖点`，**并主动的向我问询这些你不清楚的实施细节**。

我会与你共同补充细化实现细节。我们先迭代出一轮完整完善的实施清单，然后再由你亲自落实实施下去。

---

## 常用命令

### 开发命令

```bash
# 启动 drill 项目开发服务器（推荐）
pnpm run dev:drill

# 启动 qj-en 项目开发服务器
pnpm run dev:qj-en

# 默认开发命令（等同于 dev:drill）
pnpm run dev
```

### 生产构建

```bash
# 构建 drill 项目
pnpm run build:drill

# 构建 qj-en 项目
pnpm run build:qj-en

# 默认构建命令
pnpm run build
```

### 代码质量

```bash
# 运行 ESLint 并自动修复
pnpm run lint:eslint

# 格式化代码
pnpm run format:prettier

# TypeScript 类型检查
pnpm run vue-tsc
```

---

## 核心架构

### 1. 双系统架构

项目由两个并行运行的系统组成：

#### RMMV 游戏引擎（传统系统）

- **位置**: `drill-project/` 或 `QJ-MZPlugin-24-12-2/qj-en/`
- **入口**: `index.html`
- **核心文件**:
  - `js/rpg_*.js` - RMMV 核心引擎文件
  - `js/plugins/*.js` - RMMV 插件（由 TypeScript 编译生成）
  - `js/main.js` - 游戏启动入口

#### Vue 3 UI 层（现代系统）

- **位置**: `src/`
- **入口**: `src/main.ts`
- **核心文件**:
  - `src/main.ts` - Vue 应用入口
  - `src/bridge/GameBridge.ts` - 双向通信桥接层
  - `src/composables/useGameState.ts` - Vue 组合式 API

**通信机制**：通过 `GameBridge` 和自定义事件实现双向数据流：

```plain
RMMV <--> VueBridge 插件 <--> GameBridge <--> Vue 组件
```

---

### 2. TypeScript 插件开发系统

#### 插件源码位置

- **TypeScript 源码**: `src/rpgmv-plugins/*.ts`
- **编译输出**: `drill-project/js/plugins/*.js`

#### 现有插件

1. **NodeCompatLayer.ts** (Node.js API 兼容层)
   - 在纯浏览器环境中模拟 Node.js API (`__dirname`, `__filename`, `require()`)
   - 自动检测环境：nw.js 环境下不激活，使用原生 API
   - 必须在所有其他插件之前加载

2. **VueBridge.ts** (Vue-RMMV 双向通信桥接)
   - 监听 Vue 发来的事件并转换为 RMMV 操作
   - 监听 RMMV 游戏状态变化并通知 Vue
   - 提供完整的类型安全 API

#### 插件开发流程

1. 在 `src/rpgmv-plugins/` 创建 `.ts` 文件
2. 在 `build/plugins/index.ts` 的 `vitePluginTsupRpgmv` 配置中添加插件：
   ```typescript
   plugins: [
     {
       name: "YourPlugin",
       srcPath: "./src/rpgmv-plugins/YourPlugin.ts",
       outputPath: "./drill-project/js/plugins/YourPlugin.js",
       description: "你的插件描述",
     },
   ]
   ```
3. 在项目 HTML 文件中引用生成的 `.js` 文件
4. 运行 `pnpm run dev:drill` - 自动构建并启动

#### 构建配置

Vite 插件 `vitePluginTsupRpgmv` 会自动使用以下 tsup 配置：

- **format**: `["iife"]` - RMMV 要求 IIFE 格式
- **target**: `"es5"` - RMMV 引擎兼容 ES5
- **external**: 列出所有 RMMV 全局对象（如 `$gameVariables`, `SceneManager` 等）
- **banner**: 自动为每个插件生成带版本号和时间戳的注释头

---

### 3. 自动构建系统

#### Vite 插件：vite-plugin-tsup-rpgmv

**位置**: `build/plugins/vite-plugin-tsup-rpgmv/index.ts`

**工作原理**:

1. 在 Vite 启动前检查 RPGMV 插件是否需要构建
2. 如果插件文件不存在或配置了 `forceRebuild`，调用 tsup 的 `build()` 进行编程式构建
3. 在开发模式下，监听 `src/rpgmv-plugins/**/*.ts` 文件变化并自动重新构建
4. 构建完成后启动 Vite 开发服务器

**配置选项**:

```typescript
vitePluginTsupRpgmv({
  verbose: true,         // 启用详细日志
  forceRebuild: false,   // 仅在需要时构建
  outputPaths: [...]     // 自定义检测的输出路径
})
```

---

### 4. 多项目配置系统

#### 环境文件

- `.env.drill` - drill 项目配置
- `.env.qj-en` - qj-en 项目配置

环境变量：

- `VITE_project_flag_name` - 项目标识名（用于 base 路径）
- `VITE_project_path` - 项目目录路径（作为 Vite 的 `publicDir`）

#### Vite 配置 (vite.config.ts)

通过 `mode` 参数加载对应的 `.env.*` 文件：

```bash
vite --mode drill   # 加载 .env.drill
vite --mode qj-en   # 加载 .env.qj-en
```

**base 路径逻辑**：

- 单域名部署 (`isSingleDomain=true`): `/${project_flag_name}/`
- 独立域名部署: `/`

---

### 5. 类型系统

#### RMMV 类型声明

**位置**: `src/types/rpg_*.d.ts`

提供完整的 RMMV API 类型声明：

- `rpg_core.d.ts` - 核心类型（Bitmap, Sprite, Graphics 等）
- `rpg_managers.d.ts` - 管理器类型（SceneManager, AudioManager 等）
- `rpg_objects.d.ts` - 游戏对象类型（Game_Variables, Game_Switches 等）
- `rpg_scenes.d.ts` - 场景类型（Scene_Boot, Scene_Map 等）
- `rpg_sprites.d.ts` - 精灵类型
- `rpg_windows.d.ts` - 窗口类型

#### 全局类型扩展

**位置**: `src/types/global.d.ts`

扩展 Window 接口以支持：

- RMMV 全局对象（`$gameVariables`, `$gameSwitches` 等）
- 自定义全局对象（`gameBridge`, `VueBridge`, `NodeCompatLayer`）

---

## 重要开发规范

### RPGMV 插件开发规范

1. **类型安全**：充分利用 RMMV 类型声明，避免使用 `any`
2. **IIFE 包装**：所有插件代码必须包装在 IIFE 中
3. **ES5 兼容**：不使用 ES6+ 特性（箭头函数、类等会被编译为 ES5）
4. **全局对象**：通过 `window` 暴露插件 API
5. **加载顺序**：NodeCompatLayer 必须在所有插件之前加载
6. **初始化时机**：
   - 需要 RMMV 系统的插件：使用 `Scene_Boot.prototype.start` hook
   - 环境兼容性插件（如 NodeCompatLayer）：立即执行，不等待 RMMV

### 文件组织规范

```plain
src/
├── rpgmv-plugins/         # RPGMV 插件源码（TypeScript）
├── bridge/                # 双向通信桥接层
├── composables/           # Vue 组合式 API
├── types/                 # TypeScript 类型声明
├── config/                # 配置文件
└── main.ts               # Vue 应用入口

drill-project/            # RMMV 项目目录
├── index.html            # 项目入口 HTML
├── js/
│   ├── plugins/          # 编译后的插件（自动生成）
│   ├── rpg_*.js         # RMMV 核心文件
│   └── main.js          # RMMV 启动文件
├── data/                 # 游戏数据
├── img/                  # 图片资源
└── audio/                # 音频资源
```

---

## 调试和测试

### 开发环境调试

1. 启动开发服务器：`pnpm run dev:drill`
2. 打开浏览器开发者工具
3. 查看控制台日志：
   - `[NodeCompatLayer]` - Node.js 兼容层日志
   - `[VueBridge]` - 桥接插件日志
   - `GameBridge` - 通信桥接日志

### 插件加载验证

在浏览器控制台检查全局对象：

```javascript
// 检查插件是否加载
console.log(window.NodeCompatLayer);
console.log(window.VueBridge);
console.log(window.gameBridge);

// 测试 Node.js API 兼容
console.log(__dirname);
console.log(__filename);
const path = require("path");
```

### RMMV-Vue 通信测试

```javascript
// 从 Vue 发送到 RMMV
gameBridge.sendToRPGMV("change-variable", { id: 1, value: 100 });

// 从 RMMV 发送到 Vue（在 RMMV 插件中）
VueBridge.sendToVue("variable-changed", { id: 1, value: 100 });
```

---

## 常见问题

### 插件未生成或未更新

1. 检查 `build/plugins/index.ts` 中的 `vitePluginTsupRpgmv` 配置是否添加了插件
2. 检查 TypeScript 编译错误（查看终端输出）
3. 确认 HTML 文件中正确引用了插件
4. 尝试删除输出文件后重新运行 `pnpm run dev:drill`

### 环境检测失败

NodeCompatLayer 依赖准确的环境检测：

- nw.js 环境：检测 `process.versions.nw`
- 纯浏览器环境：检测 `typeof window.require === 'undefined'`

### 双系统通信失败

确认加载顺序：

1. RMMV 核心文件
2. NodeCompatLayer.js
3. VueBridge.js
4. Vue 应用（通过 `<%= injectScript %>`）

---

## 技术栈总结

| 层次     | 技术              | 版本    | 用途                 |
| -------- | ----------------- | ------- | -------------------- |
| 游戏引擎 | RPG Maker MV      | -       | 游戏核心逻辑         |
| UI 框架  | Vue 3             | ^3.5.22 | 现代 UI 界面         |
| 组件库   | Element Plus      | ^2.11.5 | UI 组件              |
| 开发工具 | Vite              | ^5.4.1  | 开发服务器和构建工具 |
| 类型系统 | TypeScript        | ^5.9.3  | 类型安全             |
| 插件构建 | tsup              | ^8.5.0  | RPGMV 插件编译       |
| 渲染引擎 | Pixi.js           | 4.5.4   | RMMV 图形渲染        |
| 代码质量 | ESLint + Prettier | -       | 代码检查和格式化     |

---

## 参考文档

项目内文档：

- `README-TYPESCRIPT-PLUGINS.md` - TypeScript 插件开发详细指南
- `docs/reports/node-api-compatibility-layer.md` - Node.js 兼容层技术报告
- `docs/prompts/change-node-api/index.md` - Node.js API 兼容任务说明

外部文档：

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [tsup 文档](https://tsup.egoist.dev/)
- [RPG Maker MV 文档](https://www.rpgmakerweb.com/support/products/rpg-maker-mv)
