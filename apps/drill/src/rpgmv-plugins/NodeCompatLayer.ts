//=============================================================================
// NodeCompatLayer.ts
// Node.js API 兼容层 - 为纯浏览器环境提供 Node.js API 兼容
//=============================================================================

/**
 * 模块导出接口
 */
interface ModuleExports {
	[key: string]: any;
}

/**
 * Path 模块接口
 */
interface PathModule {
	dirname(filepath: string): string;
	basename(filepath: string, ext?: string): string;
	extname(filepath: string): string;
	join(...paths: string[]): string;
	resolve(...paths: string[]): string;
	sep: string;
}

/**
 * Process 对象接口
 */
interface ProcessObject {
	env: { [key: string]: string };
	cwd(): string;
	platform: string;
	version: string;
	versions: { [key: string]: string };
	mainModule?: {
		filename: string;
		exports: any;
		require: any;
		id: string;
		loaded: boolean;
		parent: any;
		children: any[];
	};
}

/**
 * NodeCompatLayer 主接口
 */
interface NodeCompatLayerStatic {
	version: string;
	initialized: boolean;
	isNodeEnv: boolean;
	isNwjs: boolean;
	isBrowser: boolean;

	// 模块注册表
	moduleRegistry: { [key: string]: ModuleExports };

	// 核心方法
	init(): void;
	detectEnvironment(): void;
	setupBrowserCompat(): void;
	getScriptPath(): { dirname: string; filename: string };

	// 模块管理
	registerModule(name: string, exports: ModuleExports): void;
	createRequireFunction(): (moduleName: string) => any;

	// 内置模块实现
	createFsModule(): any;
	createNwGuiModule(): any;
	createPathModule(): PathModule;
	createProcessObject(): ProcessObject;
}

/**
 * NodeCompatLayer 实现
 */
const NodeCompatLayer: NodeCompatLayerStatic = {
	version: "1.0.0",
	initialized: false,
	isNodeEnv: false,
	isNwjs: false,
	isBrowser: false,
	moduleRegistry: {},

	/**
	 * 初始化兼容层
	 */
	init(): void {
		if (this.initialized) {
			console.log("[NodeCompatLayer] Already initialized, skipping...");
			return;
		}

		console.log("[NodeCompatLayer] Initializing Node.js API compatibility layer...");

		// 检测运行环境
		this.detectEnvironment();

		// 如果是 nw.js 环境，不需要兼容层
		if (this.isNwjs) {
			console.log("[NodeCompatLayer] Running in nw.js environment, native Node.js API available");
			console.log("[NodeCompatLayer] Compatibility layer not needed, initialization skipped");
			this.initialized = true;
			return;
		}

		// 如果是纯浏览器环境，设置兼容层
		if (this.isBrowser) {
			console.log("[NodeCompatLayer] Running in browser environment, setting up compatibility layer...");
			this.setupBrowserCompat();
			console.log("[NodeCompatLayer] Compatibility layer initialized successfully");
		}

		this.initialized = true;
	},

	/**
	 * 检测运行环境
	 */
	detectEnvironment(): void {
		// 检测是否有 process 对象
		const hasProcess = typeof process !== "undefined";

		// 检测是否是 nw.js 环境
		this.isNwjs = hasProcess && !!(process as any).versions && !!(process as any).versions.nw;

		// 检测是否是 Node.js 环境（包括 nw.js）
		this.isNodeEnv = hasProcess && typeof (window as any).require === "function";

		// 检测是否是纯浏览器环境
		this.isBrowser = !this.isNodeEnv;

		console.log("[NodeCompatLayer] Environment detection:");
		console.log("  - isNwjs:", this.isNwjs);
		console.log("  - isNodeEnv:", this.isNodeEnv);
		console.log("  - isBrowser:", this.isBrowser);
	},

	/**
	 * 为浏览器环境设置 Node.js API 兼容
	 */
	setupBrowserCompat(): void {
		const win = window as any;

		// 获取脚本路径
		const scriptPath = this.getScriptPath();

		// 1. 设置 __dirname 和 __filename
		if (typeof win.__dirname === "undefined") {
			win.__dirname = scriptPath.dirname;
			console.log("[NodeCompatLayer] Set __dirname:", win.__dirname);
		}

		if (typeof win.__filename === "undefined") {
			win.__filename = scriptPath.filename;
			console.log("[NodeCompatLayer] Set __filename:", win.__filename);
		}

		// 2. 注册内置模块
		this.registerModule("path", this.createPathModule());
		console.log("[NodeCompatLayer] Registered built-in module: path");

		this.registerModule("fs", this.createFsModule());
		console.log("[NodeCompatLayer] Registered built-in module: fs");

		this.registerModule("nw.gui", this.createNwGuiModule());
		console.log("[NodeCompatLayer] Registered built-in module: nw.gui");

		// 3. 创建 process 对象（如果不存在）
		if (typeof win.process === "undefined") {
			win.process = this.createProcessObject();
			console.log("[NodeCompatLayer] Created process object");
		}

		// 4. 设置 require 函数
		if (typeof win.require === "undefined") {
			win.require = this.createRequireFunction();
			console.log("[NodeCompatLayer] Set require function");
		}

		// 5. 设置 module 和 exports（兼容 CommonJS 模式）
		if (typeof win.module === "undefined") {
			win.module = { exports: {} };
		}
		if (typeof win.exports === "undefined") {
			win.exports = win.module.exports;
		}
	},

	/**
	 * 获取当前脚本的路径信息
	 */
	getScriptPath(): { dirname: string; filename: string } {
		let scriptUrl = "";

		// 尝试获取当前正在执行的脚本
		if (document.currentScript) {
			scriptUrl = (document.currentScript as HTMLScriptElement).src;
		} else {
			// 回退方案：获取最后一个 script 标签
			const scripts = document.getElementsByTagName("script");
			if (scripts.length > 0) {
				scriptUrl = scripts[scripts.length - 1].src;
			}
		}

		// 如果没有获取到脚本 URL，使用当前页面 URL
		if (!scriptUrl) {
			scriptUrl = window.location.href;
		}

		try {
			const url = new URL(scriptUrl);
			const pathname = url.pathname;

			// 获取目录路径（去掉文件名）
			const lastSlashIndex = pathname.lastIndexOf("/");
			const dirname = lastSlashIndex >= 0 ? pathname.substring(0, lastSlashIndex) : "/";

			return {
				dirname: dirname,
				filename: pathname,
			};
		} catch (error) {
			console.warn("[NodeCompatLayer] Failed to parse script URL:", error);
			return {
				dirname: "/",
				filename: "/index.html",
			};
		}
	},

	/**
	 * 注册模块到注册表
	 */
	registerModule(name: string, exports: ModuleExports): void {
		this.moduleRegistry[name] = exports;
		console.log("[NodeCompatLayer] Module registered:", name);
	},

	/**
	 * 创建 require 函数
	 */
	createRequireFunction(): (moduleName: string) => any {
		const self = this;

		return function require(moduleName: string): any {
			// 检查模块是否已注册
			if (self.moduleRegistry[moduleName]) {
				return self.moduleRegistry[moduleName];
			}

			// 未找到模块，提供友好的警告
			console.warn(`[NodeCompatLayer] Module '${moduleName}' not found in browser environment`);
			console.warn(
				`[NodeCompatLayer] You can register custom modules using: NodeCompatLayer.registerModule('${moduleName}', yourModuleExports)`,
			);

			// 返回空对象，避免程序崩溃
			return {};
		};
	},

	/**
	 * 创建 fs 模块的浏览器 mock 实现
	 */
	createFsModule(): any {
		return {
			existsSync(_path: string): boolean {
				// 在浏览器中，假设文件系统相关操作都失败
				return false;
			},

			mkdirSync(path: string): void {
				// 浏览器中无操作
				console.warn(`[NodeCompatLayer] fs.mkdirSync('${path}') called in browser - no-op`);
			},

			writeFileSync(path: string, _data: any): void {
				// 浏览器中无操作
				console.warn(`[NodeCompatLayer] fs.writeFileSync('${path}') called in browser - no-op`);
			},

			readFileSync(path: string): string {
				// 浏览器中返回空字符串
				console.warn(`[NodeCompatLayer] fs.readFileSync('${path}') called in browser - returning empty string`);
				return "";
			},

			unlinkSync(path: string): void {
				// 浏览器中无操作
				console.warn(`[NodeCompatLayer] fs.unlinkSync('${path}') called in browser - no-op`);
			},

			readdirSync(path: string): string[] {
				// 浏览器中返回空数组
				console.warn(`[NodeCompatLayer] fs.readdirSync('${path}') called in browser - returning empty array`);
				return [];
			},

			statSync(_path: string): any {
				// 返回一个 mock 的 stat 对象
				return {
					isFile(): boolean {
						return false;
					},
					isDirectory(): boolean {
						return false;
					},
				};
			},
		};
	},

	/**
	 * 创建 nw.gui 模块的浏览器 mock 实现
	 */
	createNwGuiModule(): any {
		// 创建一个 mock 的窗口对象
		const mockWindow = {
			menu: null,
			showDevTools(): void {
				console.warn("[NodeCompatLayer] nw.gui.Window.showDevTools() called in browser - opening browser DevTools");
				// 在浏览器中，尝试触发 DevTools（虽然这个 API 不存在）
			},
			show(): void {
				console.warn("[NodeCompatLayer] nw.gui.Window.show() called in browser - no-op");
			},
			hide(): void {
				console.warn("[NodeCompatLayer] nw.gui.Window.hide() called in browser - no-op");
			},
			focus(): void {
				// 在浏览器中，尝试聚焦到当前窗口
				window.focus();
			},
			blur(): void {
				// 在浏览器中，尝试失焦当前窗口
				window.blur();
			},
			close(): void {
				console.warn("[NodeCompatLayer] nw.gui.Window.close() called in browser - no-op");
				// 不关闭浏览器窗口，因为这可能不是用户期望的
			},
		};

		// 创建一个 mock 的 Menu 构造函数
		const MockMenu = function (this: any, options?: any) {
			this.items = [];
			this.type = options?.type || "contextmenu";
		} as any;

		MockMenu.prototype.append = function (item: any) {
			this.items.push(item);
		};

		MockMenu.prototype.createMacBuiltin = function (appName: string, _options?: any) {
			console.warn(`[NodeCompatLayer] nw.gui.Menu.createMacBuiltin('${appName}') called in browser - no-op`);
		};

		return {
			Window: {
				get(): any {
					return mockWindow;
				},
			},
			Menu: MockMenu,
		};
	},

	/**
	 * 创建 path 模块的浏览器实现
	 */
	createPathModule(): PathModule {
		return {
			sep: "/",

			dirname(filepath: string): string {
				if (!filepath) return ".";
				const lastSlash = filepath.lastIndexOf("/");
				if (lastSlash === -1) return ".";
				if (lastSlash === 0) return "/";
				return filepath.substring(0, lastSlash);
			},

			basename(filepath: string, ext?: string): string {
				if (!filepath) return "";
				const lastSlash = filepath.lastIndexOf("/");
				let base = lastSlash === -1 ? filepath : filepath.substring(lastSlash + 1);

				if (ext && base.endsWith(ext)) {
					base = base.substring(0, base.length - ext.length);
				}

				return base;
			},

			extname(filepath: string): string {
				if (!filepath) return "";
				const lastDot = filepath.lastIndexOf(".");
				const lastSlash = filepath.lastIndexOf("/");

				if (lastDot === -1 || lastDot < lastSlash) return "";
				return filepath.substring(lastDot);
			},

			join(...paths: string[]): string {
				if (paths.length === 0) return ".";

				let joined = "";
				for (let i = 0; i < paths.length; i++) {
					const part = paths[i];
					if (part) {
						if (joined) {
							joined += "/" + part;
						} else {
							joined = part;
						}
					}
				}

				// 规范化路径（移除多余的斜杠）
				return joined.replace(/\/+/g, "/");
			},

			resolve(...paths: string[]): string {
				let resolved = "";

				for (let i = paths.length - 1; i >= 0; i--) {
					const path = paths[i];
					if (!path) continue;

					resolved = path + "/" + resolved;

					// 如果是绝对路径，停止解析
					if (path.startsWith("/")) {
						break;
					}
				}

				// 如果没有绝对路径，使用当前目录
				if (!resolved.startsWith("/")) {
					const win = window as any;
					const currentDir = win.__dirname || "/";
					resolved = currentDir + "/" + resolved;
				}

				// 规范化路径
				return resolved.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
			},
		};
	},

	/**
	 * 创建 process 对象的浏览器实现
	 */
	createProcessObject(): ProcessObject {
		const win = window as any;

		return {
			env: {
				NODE_ENV: "browser",
				BROWSER: "true",
			},

			cwd(): string {
				return win.__dirname || "/";
			},

			platform: "browser",
			version: "v0.0.0",

			versions: {
				node: "0.0.0",
				browser: "1.0.0",
			},

			// 添加 mainModule 以支持 process.mainModule.filename
			mainModule: {
				// 主模块应该指向入口页面，而不是插件文件
				// 在浏览器中，使用当前页面的路径
				filename: window.location.pathname || "/index.html",
				exports: {},
				require: win.require,
				id: ".",
				loaded: true,
				parent: null,
				children: [],
			} as any,
		};
	},
};

// IIFE wrapper for plugin
(() => {
	"use strict";

	// 尽早初始化，在所有其他插件之前
	// 不使用 Scene_Boot hook，直接立即执行
	console.log("[NodeCompatLayer] Plugin loading...");

	// 立即初始化兼容层
	NodeCompatLayer.init();

	// 暴露到全局
	(window as any).NodeCompatLayer = NodeCompatLayer;

	console.log("[NodeCompatLayer] Plugin loaded successfully");

	// 如果是浏览器环境，打印使用提示
	if (NodeCompatLayer.isBrowser && NodeCompatLayer.initialized) {
		console.log("");
		console.log("=".repeat(70));
		console.log("Node.js API Compatibility Layer is active");
		console.log("=".repeat(70));
		console.log("Available global variables:");
		console.log("  - __dirname:", (window as any).__dirname);
		console.log("  - __filename:", (window as any).__filename);
		console.log("  - require: function (browser-compatible)");
		console.log("  - process: object (browser-compatible)");
		console.log("");
		console.log("Available modules:");
		console.log("  - path: require('path')");
		console.log("  - fs: require('fs') (mock implementation)");
		console.log("  - nw.gui: require('nw.gui') (mock implementation)");
		console.log("");
		console.log("To register custom modules:");
		console.log("  NodeCompatLayer.registerModule('moduleName', { ... })");
		console.log("=".repeat(70));
		console.log("");
	}
})();
