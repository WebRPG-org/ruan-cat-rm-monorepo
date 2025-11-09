/**
 * Vite插件：自动构建RPGMV插件
 *
 * 这个插件在Vite开发服务器启动前和构建前自动使用tsup构建TypeScript编写的RPGMV插件
 * 解决了用户不希望有额外启动脚本的需求
 */

import { build, type Options as TsupOptions } from "tsup";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import type { Plugin } from "vite";
import dayjs from "dayjs";

/**
 * RPGMV插件配置
 */
export interface RpgmvPluginConfig {
	/**
	 * 插件名称（入口名称）
	 */
	name: string;

	/**
	 * 插件源文件路径（相对于项目根目录）
	 */
	srcPath: string;

	/**
	 * 插件输出路径（相对于项目根目录）
	 */
	outputPath: string;

	/**
	 * 插件说明/描述
	 */
	description?: string;
}

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
	 * RPGMV插件列表配置
	 */
	plugins?: RpgmvPluginConfig[];

	/**
	 * 输出目录（默认为 ./drill-project/js/plugins）
	 */
	outDir?: string;
}

/**
 * 检查是否需要构建RPGMV插件
 */
function shouldBuildPlugins(
	options: TsupRpgmvPluginOptions,
	root: string,
): boolean {
	// 如果强制重新构建，直接返回true
	if (options.forceRebuild) {
		return true;
	}

	// 获取默认插件列表
	const defaultPlugins: RpgmvPluginConfig[] = [
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
	];

	// 使用用户配置的插件列表或默认列表
	const plugins = options.plugins || defaultPlugins;

	// 检查输出文件是否存在
	for (const plugin of plugins) {
		const fullPath = resolve(root, plugin.outputPath!);
		if (!existsSync(fullPath)) {
			if (options.verbose) {
				console.log(`🔍 插件文件不存在: ${plugin.outputPath}`);
			}
			return true;
		}
	}

	// TODO: 可以进一步检查源文件的修改时间 vs 输出文件的修改时间
	return false;
}

/**
 * 从插件源文件中提取版本号
 */
function extractPluginVersion(srcPath: string, root: string): string {
	try {
		const fullPath = resolve(root, srcPath);
		const content = readFileSync(fullPath, "utf-8");

		// 查找版本号，匹配 patterns like: version: "x.x.x" 或 version: 'x.x.x'
		const versionRegex = /version:\s*["']([^"']+)["']/;
		const match = content.match(versionRegex);

		if (match && match[1]) {
			return match[1];
		}

		return "1.0.0";
	} catch (error) {
		console.error(`❌ 读取插件版本号失败 (${srcPath}):`, error);
		return "1.0.0";
	}
}

/**
 * 构建RPGMV插件
 */
async function buildRpgmvPlugins(
	options: TsupRpgmvPluginOptions,
	root?: string,
): Promise<void> {
	try {
		if (options.verbose) {
			console.log("🔨 开始构建RPGMV插件...");
		}

		const currentRoot = root || process.cwd();

		// 获取默认插件列表
		const defaultPlugins: RpgmvPluginConfig[] = [
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
		];

		// 使用用户配置的插件列表或默认列表
		const plugins = options.plugins || defaultPlugins;

		// 当前时间（统一所有插件的构建时间）
		const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

		// 为每个插件单独构建
		for (const plugin of plugins) {
			const version = extractPluginVersion(plugin.srcPath, currentRoot);
			const banner = `//=============================================================================
// ${plugin.name}.js - 由@vitejs/vite构建自动生成 - 请勿手动修改
// ${plugin.description || "RPGMV插件"}
// 插件版本: v${version}
// 编译时间: ${currentTime}
//=============================================================================`;

			if (options.verbose) {
				console.log(`📝 开始构建插件: ${plugin.name}`);
				console.log(`   源文件: ${plugin.srcPath}`);
				console.log(`   输出: ${plugin.outputPath}`);
				console.log(`   版本: v${version}`);
			}

			const pluginTsupOptions: TsupOptions = {
				entry: {
					[plugin.name]: plugin.srcPath,
				},
				outDir: options.outDir || "./drill-project/js/plugins",
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
				banner: {
					js: banner,
				},
				silent: !options.verbose,
			};

			// 合并用户配置
			const finalOptions: TsupOptions = {
				...pluginTsupOptions,
				...options.tsupOptions,
				// 确保 banner 使用我们生成的，不被用户配置覆盖
				banner: pluginTsupOptions.banner,
			};

			// 执行构建
			await build(finalOptions);
		}

		if (options.verbose) {
			console.log("✅ RPGMV插件构建成功！");
			console.log(`📁 输出目录: ${options.outDir || "./drill-project/js/plugins/"}`);
			console.log("📋 生成的插件文件:");

			for (const plugin of plugins) {
				const version = extractPluginVersion(plugin.srcPath, currentRoot);
				console.log(`   - ${plugin.name}.js (${plugin.description || "RPGMV插件"}) v${version}`);
			}
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
				await buildRpgmvPlugins(options, root);
				built = true;
			}
		},

		// 在构建开始前构建插件
		async buildStart() {
			if (!built && shouldBuildPlugins(options, root)) {
				await buildRpgmvPlugins(options, root);
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
					await buildRpgmvPlugins(options, root);
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
