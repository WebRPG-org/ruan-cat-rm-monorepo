# vite-plugin-tsup-rpgmv

自动构建 RPG Maker MV 插件的 Vite 插件。在 Vite 启动前自动使用 tsup 构建 TypeScript 编写的 RPGMV 插件。

## 功能特点

- 零配置：在 Vite 启动时自动构建
- 支持多插件：可以配置构建多个 RPGMV 插件
- 智能检测：只在需要时构建（插件文件不存在时）
- 热重载：开发环境下自动监听并重新构建
- 版本管理：自动提取插件版本并添加到 banner
- 时间戳：使用 dayjs 格式化编译时间

## 快速开始

### 1. 插件配置

在 `apps/drill/build/plugins/index.ts` 中配置插件：

```typescript
import { vitePluginTsupRpgmv } from "./vite-plugin-tsup-rpgmv";

export function getPluginsList() {
  return [
    vitePluginTsupRpgmv({
      // 启用详细日志
      verbose: true,
      // 只在需要时构建
      forceRebuild: false,
      // 输出目录
      outDir: "./drill-project/js/plugins",
      // 插件列表配置
      plugins: [
        {
          name: "NodeCompatLayer",
          srcPath: "./src/rpgmv-plugins/NodeCompatLayer.ts",
          outputPath: "./drill-project/js/plugins/NodeCompatLayer.js",
          description: "Node.js API 兼容层",
        },
        {
          name: "VueBridge",
          srcPath: "./src/rpgmv-plugins/VueBridge.ts",
          outputPath: "./drill-project/js/plugins/VueBridge.js",
          description: "Vue与RPGMV双向通信桥接插件",
        },
      ],
    }),
  ];
}
```

### 2. 添加新插件

要添加新的 RPGMV 插件，只需三步：

#### 第 1 步：创建插件源文件

在 `src/rpgmv-plugins/` 目录下创建 TypeScript 文件：

```typescript
// =============================================================================
// MyNewPlugin.ts
// 我的新插件 - 插件说明
// =============================================================================

interface MyNewPluginStatic {
  // 版本号（必须包含）
  version: string;
  initialized: boolean;

  init(): void;
  myCustomMethod(): void;
}

const MyNewPlugin: MyNewPluginStatic = {
  // 版本号（必须定义，会在构建时提取到 banner）
  version: "1.0.0",

  // 初始化
  init(): void {
    if (this.initialized) return;
    console.log("MyNewPlugin initialized");
    this.initialized = true;
  },

  // 自定义方法
  myCustomMethod(): void {
    // 插件逻辑
  },
};

// 暴露到全局
declare global {
  interface Window {
    MyNewPlugin: typeof MyNewPlugin;
  }
}
window.MyNewPlugin = MyNewPlugin;
```

#### 第 2 步：在插件配置中添加

在 `apps/drill/build/plugins/index.ts` 中添加插件配置：

```typescript
vitePluginTsupRpgmv({
  plugins: [
    // ... 现有的插件配置 ...
    {
      name: "MyNewPlugin",  // 插件名称，必须与文件对象名一致
      srcPath: "./src/rpgmv-plugins/MyNewPlugin.ts",  // 源文件路径
      outputPath: "./drill-project/js/plugins/MyNewPlugin.js",  // 输出路径
      description: "我的新插件 - 功能说明",  // 插件描述
    },
  ],
})
```

#### 第 3 步：运行项目

```bash
pnpm run dev:drill
```

插件会自动构建，无需额外操作！

## 配置选项

### RpgmvPluginConfig

单个插件的配置接口：

```typescript
interface RpgmvPluginConfig {
  /** 插件名称（入口对象名，如 NodeCompatLayer） */
  name: string;

  /** 插件源文件路径 */
  srcPath: string;

  /** 插件输出路径 */
  outputPath: string;

  /** 插件说明/描述（可选） */
  description?: string;
}
```

### TsupRpgmvPluginOptions

插件选项：

```typescript
interface TsupRpgmvPluginOptions {
  /** tsup 配置选项（可选） */
  tsupOptions?: TsupOptions;

  /** 是否强制重新构建（默认 false） */
  forceRebuild?: boolean;

  /** 是否启用详细日志（默认 false） */
  verbose?: boolean;

  /** RPGMV 插件列表配置 */
  plugins?: RpgmvPluginConfig[];

  /** 输出目录（默认 ./drill-project/js/plugins） */
  outDir?: string;
}
```

## 构建输出

每次构建时，插件会：

1. 提取每个插件的 `version` 字段
2. 使用 dayjs 格式化当前时间（格式：`YYYY-MM-DD HH:mm:ss`）
3. 生成包含以下信息的 banner：

```javascript
//=============================================================================
// PluginName.js - 由@vitejs/vite构建自动生成 - 请勿手动修改
// 插件说明
// 插件版本: v1.0.0
// 编译时间: 2025-11-09 15:30:25
//=============================================================================
```

## 常见问题

### 1. 如何提取插件版本号？

确保插件源码中定义了 `version` 字段：

```typescript
const MyPlugin: MyPluginStatic = {
  version: "1.0.0",  // 会被自动提取
  // ...
}
```

版本号会显示在生成的 banner 中。

### 2. 开发时需要手动构建吗？

不需要！插件会在 Vite 启动时自动构建，并在源文件变更时自动重新构建。

### 3. 如何手动构建插件？

如果需要手动构建，可以使用：

```bash
pnpm run build:rpgmv-plugins
```

### 4. 插件版本号不正确？

检查：
- 源文件中是否正确定义了 `version` 字段
- 格式是否正确：`version: "x.x.x"`
- 是否在导出的对象内部

## 注意事项

1. **输出目录**：确保 `outDir` 与 `outputPath` 的目录部分一致
2. **版本格式**：插件版本号使用语义化版本格式（如 `"1.0.0"`）
3. **插件名称**（`name`）必须与 TypeScript 文件中导出的对象名一致
4. **全局暴露**：确保插件在 `window` 对象中正确注册：
   ```typescript
   declare global {
     interface Window {
       MyPlugin: typeof MyPlugin;
     }
   }
   window.MyPlugin = MyPlugin;
   ```

## 技术细节

- 构建工具：`tsup`（使用 ESBuild）
- 输出格式：IIFE（RPGMV 要求）
- TypeScript 目标：ES5（兼容 RPGMV）
- 日期格式化：`dayjs`（YYYY-MM-DD HH:mm:ss）

## 相关链接

- [tsup 文档](https://tsup.egoist.dev/)
- [dayjs 文档](https://day.js.org/)
- [Vite 插件开发指南](https://vitejs.dev/guide/api-plugin.html)
