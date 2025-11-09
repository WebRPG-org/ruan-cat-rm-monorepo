<!--
	一次性提示词
	长期跟进 尚未结束
-->

# 兼容 node 的 api 写法

## 问题说明

在运行 `apps\drill\package.json` 的 dev 命令时，会出现识别故障的错误。因为在 H5 项目内，不能直接识别 node 的函数，所以导致纯粹的 H5 运行时出现故障。

在面对 javascript 代码时，需要手写兼容层的 api：

- `__dirname`
- `__filename`
- `require()`

请为我提供一个方案，判断上下文环境，并且实现环境切换与兼容。

## 编写要求

1. 请你先整体性的阅读以下文件，在阅读文件时，请你务必 ultrathink，深度思考开发规范，并在后续的步骤设计内，严格遵守规范。确保你遵守相关的开发规范：
   - apps\drill\README.md
   - apps\drill\README-TYPESCRIPT-PLUGINS.md
   - apps\drill\build\plugins\vite-plugin-tsup-rpgmv\index.ts
   - apps\drill\src\rpgmv-plugins\VueBridge.ts
2. 请你在 `apps\drill\src\rpgmv-plugins` 目录内，编写一个 typescript 的 rmmv 插件，这个插件将编译成 javascript，且务必保证在纯粹的浏览器环境内，能够实现对上述 node 常见函数即变量的兼容识别。这个插件预期将要被 tsup 构建，插入到指定的 rmmv 插件目录内。编译后的 javascript rmmv 代码，必须满足以下要求：
   - 能够自动判断上下文环境。如果当前环境是纯粹的浏览器环境，那就必须实现对 node 函数 `require()` 的兼容替换。提供一个全局可用的 require 函数，确保其使用不会出现故障。
   - 如果当前环境是 nw.js 环境，那么就不做处理。

## 自测方式

### 在 vite 环境内测试

### 在纯粹的 H5 环境内测试

## 其他要求

1. 在你做复杂的任务进度安排时，请你务必 ultrathink 地，合理的编排任务。
2. 你应该在思考的时候，充分的，大胆的使用 token 。允许你大幅度的增加思考预算。
3. 输出报告时，请输出到 `apps\drill\docs\reports` 文件夹内。

## 可能的技术方案 createRequire

## 参考资料

- https://juejin.cn/post/7128218760300724232

## 01 处理类型报错

请你使用谷歌浏览器 MCP，运行 `apps\drill\package.json` 的 dev 命令。在浏览器内阅读控制台报错，根据报错信息，改进你设计的 `apps\drill\src\rpgmv-plugins\NodeCompatLayer.ts` node 兼容层插件。并处理好报错信息。

## 02 改写拓展 vitePluginTsupRpgmv 这款 vite 插件

现在这款 vitePluginTsupRpgmv `apps\drill\build\plugins\vite-plugin-tsup-rpgmv\index.ts` 插件，为我构建了两款插件，分别是：

- NodeCompatLayer
- VueBridge

我希望你把这样的配置，实现 vite 插件配置化。因为未来 vitePluginTsupRpgmv 可能会构建很多款 rm 插件，我希望构建这些插件的配置，可以在 vitePluginTsupRpgmv vite 插件内实现配置，而不是预先写死在 vitePluginTsupRpgmv 的 buildRpgmvPlugins 函数内。

1. 我希望你对此做出改造，适当地增加一个构建插件列表配置。允许未来我借助 vitePluginTsupRpgmv 来构建多款 rm 插件。
2. 改造后，请你在 `apps\drill\build\plugins\index.ts` 的 vitePluginTsupRpgmv 插件处，增加你的配置。这个配置预期应该包括：
   - rm 插件名称
   - rm 插件的文件存储地址
   - 预设固定好的 banner 说明文本
3. 其中，对于预设固定好的 banner 说明文本，我希望包含以下内容：
   - 插件名称： 比如 `NodeCompatLayer.js`
   - 插件说明： 比如 `Node.js API 兼容层`
   - 插件编译时间： 比如 `2025-11-07 12:22:18` 。其日期格式为 `YYYY-MM-DD HH:mm:ss"` 。格式化日期请使用 `day.js` 来完成格式化。如果没有这个库，请安装并使用。
   - 插件版本号： 语义化的版本号，比如 `v0.1.23` 这样的。版本号应该从被构建的 rm 插件本身提取，如果被构建的 rm 插件本身不对外提供基础的 version 字段，请改造现存的 typescript 编写的 rm 插件，适当的增加 version 字段，使得 vitePluginTsupRpgmv 这款 vite 插件能获取数据并打包构建顶部头的 banner 说明文本。
4. 请你对 `apps\drill\tsup.config.ts` 也做出适当的改造，未来构建的 rm 插件会来越来越多，我希望关于 tsup 的构建细节和要求，全部都在预设在 vitePluginTsupRpgmv 的 buildRpgmvPlugins 函数内。按理说项目 `apps\drill` 不应该再出现具体的 `tsup.config.ts` 文件了，因为在 buildRpgmvPlugins 函数内，我已经使用函数化的 tsup 完成目标 typescript 文件的构建了。
5. 改造后，请你在 `apps\drill\build\plugins\vite-plugin-tsup-rpgmv` 目录内，编写一个简单的，简要的插件使用文档。使用文档务必要**清晰简单**。

### 01 运行命令并测试

请使用谷歌浏览器 MCP，运行 apps\drill\package.json 的 dev 命令，检查关于 【改写拓展 vitePluginTsupRpgmv 这款 vite 插件】 的一系列需求是否完成。

## 03 调研由 vite 全面接管 node 兼容的 rm 插件生成方案

请阅读以下对话报告：

- https://gemini.google.com/share/aa9de61e86c0

注意到 `apps\drill\src\rpgmv-plugins\NodeCompatLayer.ts` 的 createFsModule 函数，其本质是忽略，欺骗，报错的形式来避免 H5 浏览器环境直接使用 node 的 API。

我希望你结合上面的参考资料，或者是你自己的思考调研，帮我提出一款全新的方案。大胆的使用 vite 本身的能力，或者是其他的兼容库，设计一个全新的 node 环境兼容 rm 插件。

我希望你设计的新 rm 插件，可以最终实现在 H5 环境内，使用兼容改造的 node 环境 API。请提出你的思考和新的设计。

我们共同讨论设计一个方案。

### 01 回答 AI 问题

1. 包体积增加
   - 可以接受。请你大胆的安装 npm 包
2. 持久化策略
   - Option B
3. 如何过渡到新方案？
   - Option C: 提供切换开关（兼容模式）
4. 功能范围
   - 完整支持: 包括 events, stream, crypto, util 等

请你直接开始完整实施下去。

## 04

vite-plugin-node-polyfills

<!-- TODO:  -->
 <!-- 02 改写 NodeCompatLayer 的 createFsModule 实现 -->
