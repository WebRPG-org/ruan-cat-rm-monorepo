/**
 * Vite插件：自动构建RPGMV插件
 *
 * 这个插件在Vite开发服务器启动前和构建前自动使用tsup构建TypeScript编写的RPGMV插件
 * 解决了用户不希望有额外启动脚本的需求
 */

import { build, type Options as TsupOptions } from "tsup";
import { existsSync } from "fs";
import { resolve } from "path";
import type { Plugin } from "vite";

export interface TsupRpgmvPluginOptions {
	/**
	 * tsup配置选项
	 */
	tsupOptions?: TsupOptions;

	/**
	 * 是否在每次启动时强制重新构建
	 */
	forceRebuild?: boolean;

	/**
	 * 是否启用详细日志
	 */
	verbose?: boolean;

	/**
	 * 检查的插件输出路径（用于判断是否需要构建）
	 */
	outputPaths?: string[];
}

/**
 * 检查是否需要构建RPGMV插件
 */
function shouldBuildPlugins(options: TsupRpgmvPluginOptions, root: string): boolean {
	// 如果强制重新构建，直接返回true
	if (options.forceRebuild) {
		return true;
	}

	// 检查输出文件是否存在
	const defaultOutputPaths = ["drill-project/js/plugins/NodeCompatLayer.js", "drill-project/js/plugins/VueBridge.js"];
	const outputPaths = options.outputPaths || defaultOutputPaths;

	for (const outputPath of outputPaths) {
		const fullPath = resolve(root, outputPath);
		if (!existsSync(fullPath)) {
			if (options.verbose) {
				console.log(`🔍 插件文件不存在: ${outputPath}`);
			}
			return true;
		}
	}

	// TODO: 可以进一步检查源文件的修改时间 vs 输出文件的修改时间
	return false;
}

/**
 * 构建RPGMV插件
 */
async function buildRpgmvPlugins(options: TsupRpgmvPluginOptions): Promise<void> {
	try {
		if (options.verbose) {
			console.log("🔨 开始构建RPGMV插件...");
		}

		// 默认的tsup配置
		const defaultTsupOptions: TsupOptions = {
			entry: {
				NodeCompatLayer: "./src/rpgmv-plugins/NodeCompatLayer.ts",
				VueBridge: "./src/rpgmv-plugins/VueBridge.ts",
			},
			outDir: "./drill-project/js/plugins",
			format: ["iife"],
			sourcemap: false,
			clean: false,
			dts: false,
			minify: false,
			tsconfig: "./tsconfig.json",
			target: "es5",
			outExtension: () => ({ js: ".js" }),
			external: [
				"$gameVariables",
				"$gameSwitches",
				"$gameMessage",
				"$gameParty",
				"$gamePlayer",
				"$gameMap",
				"SceneManager",
				"AudioManager",
				"Scene_Boot",
				"Game_Actor",
			],
			banner(context: any) {
				const name = context.name || "";
				const bannerMap: { [key: string]: string } = {
					NodeCompatLayer: `//=============================================================================
// NodeCompatLayer.js - 由TypeScript编译生成
// Node.js API 兼容层 - 为纯浏览器环境提供 Node.js API 兼容
// 编译时间: ${new Date().toISOString()}
//=============================================================================`,
					VueBridge: `//=============================================================================
// VueBridge.js - 由TypeScript编译生成
// Vue与RPGMV双向通信桥接插件
// 编译时间: ${new Date().toISOString()}
//=============================================================================`,
				};
				return {
					js: bannerMap[name] || `// ${name}.js - 编译时间: ${new Date().toISOString()}`,
				};
			},
			silent: !options.verbose,
		};

		// 合并用户配置
		const finalOptions: TsupOptions = {
			...defaultTsupOptions,
			...options.tsupOptions,
		};

		// 执行构建
		await build(finalOptions);

		if (options.verbose) {
			console.log("✅ RPGMV插件构建成功！");
			console.log("📁 输出目录: drill-project/js/plugins/");
			console.log("📋 生成的插件文件:");
			console.log("   - NodeCompatLayer.js (Node.js API 兼容层)");
			console.log("   - VueBridge.js (Vue与RPGMV双向通信桥接)");
		}
	} catch (error) {
		console.error("❌ RPGMV插件构建失败:", error);
		throw error;
	}
}

/**
 * Vite插件工厂函数
 */
export function vitePluginTsupRpgmv(options: TsupRpgmvPluginOptions = {}): Plugin {
	let root: string;
	let built = false;

	return {
		name: "vite-plugin-tsup-rpgmv",

		// 在配置解析后获取项目根目录
		configResolved(config) {
			root = config.root;
			if (options.verbose) {
				console.log(`🎮 Vite RPGMV插件自动构建器已启用`);
				console.log(`📂 项目根目录: ${root}`);
			}
		},

		// 在开发服务器配置时构建插件
		async configureServer() {
			if (!built && shouldBuildPlugins(options, root)) {
				await buildRpgmvPlugins(options);
				built = true;
			}
		},

		// 在构建开始前构建插件
		async buildStart() {
			if (!built && shouldBuildPlugins(options, root)) {
				await buildRpgmvPlugins(options);
				built = true;
			}
		},

		// 在监听模式下，当相关文件改变时重新构建
		async handleHotUpdate(ctx) {
			// 检查是否是RPGMV插件源文件
			if (ctx.file.includes("src/rpgmv-plugins/")) {
				if (options.verbose) {
					console.log(`🔄 检测到RPGMV插件源文件变更: ${ctx.file}`);
				}

				try {
					await buildRpgmvPlugins(options);
					if (options.verbose) {
						console.log("🔥 RPGMV插件热重载完成");
					}
				} catch (error) {
					console.error("❌ RPGMV插件热重载失败:", error);
				}
			}

			// 继续正常的HMR流程
			return undefined;
		},
	};
}

export default vitePluginTsupRpgmv;
