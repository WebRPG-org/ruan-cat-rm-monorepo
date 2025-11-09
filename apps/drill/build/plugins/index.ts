/**
 * Vite插件集合
 *
 * 统一导出所有自定义的Vite插件
 */

import type { PluginOption, ConfigEnv } from "vite";

import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createHtmlPlugin } from "vite-plugin-html";

// 开发调试插件
import vueDevTools from "vite-plugin-vue-devtools";

// Node.js polyfills 插件
import { nodePolyfills } from "vite-plugin-node-polyfills";

import { vitePluginTsupRpgmv } from "./vite-plugin-tsup-rpgmv/index";
// 集中封装后的 别名插件
import tsAlias from "./vite-plugin-ts-alias/index";

export interface GetPluginsListParams {
	/**
	 * 环境变量
	 * @description
	 * 原框架没有 这里额外拓展的
	 * 用来获取vite配置的环境变量
	 */
	env: ImportMetaEnv;
}

export function getPluginsList(params: GetPluginsListParams): PluginOption[] {
	const { env } = params;

	const VITE_project_flag_name = env.VITE_project_flag_name;
	const VITE_project_path = env.VITE_project_path;

	// 检查是否在开发环境中
	const isDev = env.NODE_ENV !== 'production';
	const isDevMode = env.MODE?.includes('dev');

	return [
		// Node.js polyfills 插件（放在最前面）
		nodePolyfills({
			// 包含所有常用 Node.js 核心模块
			include: [
				'buffer',
				'process',
				'events',
				'stream',
				'util',
				'path',
				'url',
				'querystring',
				'string_decoder',
				'punycode',
				'crypto',
				'http',
				'https',
				'os',
				'assert',
				'constants',
				'timers',
				'console',
				'vm',
				'zlib',
			],

			// 全局变量注入
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},

			// 支持 node: 协议导入
			protocolImports: true,

			// 不包含 fs，因为我们用 memfs 自定义实现
			exclude: ['fs'],
		}),

		// RPGMV插件自动构建器
		vitePluginTsupRpgmv({
			// 启用详细日志
			verbose: true,
			// 仅在需要时构建（不强制重新构建）
			forceRebuild: false,
			// 输出目录
			outDir: "./drill-project/js/plugins",
			// RPGMV插件列表配置
			plugins: [
				{
					name: "NodeCompatLayer",
					srcPath: "./src/rpgmv-plugins/NodeCompatLayer.ts",
					outputPath: "./drill-project/js/plugins/NodeCompatLayer.js",
					description: "Node.js API 兼容层 v1.0 - Mock 实现（向后兼容）",
				},
				{
					name: "NodeCompatLayerV2",
					srcPath: "./src/rpgmv-plugins/NodeCompatLayerV2.ts",
					outputPath: "./drill-project/js/plugins/NodeCompatLayerV2.js",
					description: "Node.js API 兼容层 v2.0 - 真实文件系统 + IndexedDB 持久化",
				},
				{
					name: "VueBridge",
					srcPath: "./src/rpgmv-plugins/VueBridge.ts",
					outputPath: "./drill-project/js/plugins/VueBridge.js",
					description: "Vue与RPGMV双向通信桥接插件",
				},
			],
		}) as any,

		vue(),

		/**
		 * 开发调试插件
		 * @description
		 * vueDevTools 必须在 createHtmlPlugin 的前面导入
		 *
		 * 条件性启用，避免 vite-plugin-inspect 的问题
		 * 如果遇到问题，可以设置环境变量 DISABLE_VUE_DEVTOOLS=true
		 *
		 * @see https://devtools.vuejs.org/help/troubleshooting#devtools-vite-plugin-doesn-t-render-as-expected
		 * @see https://github.com/vuejs/devtools/issues/278#issuecomment-2167415057
		 */
		...(isDev && !process.env.DISABLE_VUE_DEVTOOLS ? [vueDevTools()] : []),

		// 重设index.html的入口 和 全局ts文件的注入
		createHtmlPlugin({
			minify: false,
			template: `${VITE_project_path}/index.html`,

			/**
			 * 需要注入 index.html ejs 模版的数据
			 */
			inject: {
				data: {
					// 出现在模版中的 <%- title %>
					title: "插件集合示例",

					// 出现在模版中的<%- injectScript %>
					// 可以正常打包
					injectScript: `<script async type="module" src="../src/main.ts"></script>`,
				},

				tags: [
					{
						injectTo: "body-prepend",
						tag: "section",
						attrs: {
							id: "vue-root-app",
						},
					},
				],
			},
		}),

		AutoImport({
			imports: ["vue"],
			resolvers: [ElementPlusResolver()],
		}),

		Components({ dts: true, version: 3, resolvers: [ElementPlusResolver()] }),

		// 路径别名插件
		tsAlias,
	];
}
