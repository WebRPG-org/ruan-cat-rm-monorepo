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
