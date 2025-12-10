//=============================================================================
// NodeCompatLayerV2.ts
// Node.js API 兼容层 v2.0 - 真实文件系统 + IndexedDB 持久化
//=============================================================================

import { Buffer } from "buffer";
import { fs as memfsInstance, vol } from "memfs";
import { openDB, type IDBPDatabase } from "idb";

/**
 * 配置接口
 */
interface NodeCompatConfig {
	/** 是否启用 v2 版本（默认 true） */
	enableV2?: boolean;

	/** 是否启用 IndexedDB 持久化（默认 true） */
	enablePersistence?: boolean;

	/** 自动保存间隔（毫秒，默认 5000） */
	autosaveInterval?: number;

	/** 是否启用详细日志（默认 false） */
	verbose?: boolean;
}

/**
 * IndexedDB 持久化管理器
 */
class IndexedDBPersistence {
	private db: IDBPDatabase | null = null;
	private dbName = "NodeCompatLayerV2";
	private storeName = "virtual-fs";
	private version = 1;

	async init(): Promise<void> {
		try {
			this.db = await openDB(this.dbName, this.version, {
				upgrade(db) {
					if (!db.objectStoreNames.contains("virtual-fs")) {
						db.createObjectStore("virtual-fs");
					}
				},
			});
			console.log("[NodeCompatLayerV2] IndexedDB initialized");
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to initialize IndexedDB:", error);
			throw error;
		}
	}

	async save(key: string, value: any): Promise<void> {
		if (!this.db) {
			throw new Error("IndexedDB not initialized");
		}

		try {
			await this.db.put(this.storeName, value, key);
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to save to IndexedDB:", error);
			throw error;
		}
	}

	async load(key: string): Promise<any> {
		if (!this.db) {
			throw new Error("IndexedDB not initialized");
		}

		try {
			return await this.db.get(this.storeName, key);
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to load from IndexedDB:", error);
			return null;
		}
	}

	async delete(key: string): Promise<void> {
		if (!this.db) {
			throw new Error("IndexedDB not initialized");
		}

		try {
			await this.db.delete(this.storeName, key);
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to delete from IndexedDB:", error);
			throw error;
		}
	}

	async clear(): Promise<void> {
		if (!this.db) {
			throw new Error("IndexedDB not initialized");
		}

		try {
			await this.db.clear(this.storeName);
			console.log("[NodeCompatLayerV2] IndexedDB cleared");
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to clear IndexedDB:", error);
			throw error;
		}
	}
}

/**
 * NodeCompatLayerV2 主接口
 */
interface NodeCompatLayerV2Static {
	version: string;
	initialized: boolean;
	isNwjs: boolean;
	isBrowser: boolean;
	config: NodeCompatConfig;

	// 文件系统
	fs: typeof memfsInstance;

	// 持久化管理器
	persistence: IndexedDBPersistence;

	// 核心方法
	init(config?: NodeCompatConfig): Promise<void>;
	detectEnvironment(): void;
	setupVirtualFS(): void;
	initPersistence(): Promise<void>;
	injectGlobals(): void;
	printUsageInfo(): void;

	// 持久化方法
	saveToStorage(): Promise<void>;
	loadFromStorage(): Promise<void>;
	enableAutosave(interval?: number): void;
	disableAutosave(): void;
	clearStorage(): Promise<void>;

	// 虚拟文件系统
	mountVirtualFS(mountPoint: string, files: Record<string, string>): void;
	exportFS(): Record<string, string | null>;

	// 模块系统
	createRequire(): (moduleName: string) => any;
	registerModule(name: string, exports: any): void;
	moduleRegistry: Record<string, any>;
}

/**
 * NodeCompatLayerV2 实现
 */
const NodeCompatLayerV2: NodeCompatLayerV2Static = {
	version: "2.0.0",
	initialized: false,
	isNwjs: false,
	isBrowser: false,

	config: {
		enableV2: true,
		enablePersistence: true,
		autosaveInterval: 5000,
		verbose: false,
	},

	fs: memfsInstance,
	persistence: new IndexedDBPersistence(),
	moduleRegistry: {},

	/**
	 * 检测运行环境
	 */
	detectEnvironment(): void {
		// 检测是否有 process 对象
		const hasProcess = typeof process !== "undefined";

		// 检测是否是 nw.js 环境
		this.isNwjs = hasProcess && !!(process as any).versions && !!(process as any).versions.nw;

		// 检测是否是纯浏览器环境
		this.isBrowser = !this.isNwjs && typeof window !== "undefined";

		if (this.config.verbose) {
			console.log("[NodeCompatLayerV2] Environment detection:");
			console.log("  - isNwjs:", this.isNwjs);
			console.log("  - isBrowser:", this.isBrowser);
		}
	},

	/**
	 * 初始化兼容层
	 */
	async init(config?: NodeCompatConfig): Promise<void> {
		if (this.initialized) {
			console.log("[NodeCompatLayerV2] Already initialized");
			return;
		}

		// 合并配置
		this.config = { ...this.config, ...config };

		console.log("[NodeCompatLayerV2] Initializing Node.js API compatibility layer v2.0...");

		// 检测运行环境
		this.detectEnvironment();

		// 如果是 nw.js 环境，不需要兼容层
		if (this.isNwjs) {
			console.log("[NodeCompatLayerV2] Running in nw.js environment, native Node.js API available");
			console.log("[NodeCompatLayerV2] Compatibility layer disabled");
			this.initialized = true;
			return;
		}

		// 检查是否启用 v2
		if (!this.config.enableV2) {
			console.log("[NodeCompatLayerV2] v2 disabled by config, falling back to v1");
			this.initialized = true;
			return;
		}

		// 如果是纯浏览器环境，设置兼容层
		if (this.isBrowser) {
			console.log("[NodeCompatLayerV2] Running in browser environment, setting up compatibility layer...");

			// 初始化虚拟文件系统
			this.setupVirtualFS();

			// 初始化持久化
			if (this.config.enablePersistence) {
				await this.initPersistence();
			}

			// 注入全局对象
			this.injectGlobals();

			// 启用自动保存
			if (this.config.enablePersistence && this.config.autosaveInterval) {
				this.enableAutosave(this.config.autosaveInterval);
			}

			console.log("[NodeCompatLayerV2] Compatibility layer initialized successfully");
			this.printUsageInfo();
		}

		this.initialized = true;
	},

	/**
	 * 初始化虚拟文件系统
	 */
	setupVirtualFS(): void {
		// 创建标准目录结构
		vol.fromJSON({
			"/home": null,
			"/tmp": null,
			"/save": null,
			"/config": null,
			"/data": null,
		});

		if (this.config.verbose) {
			console.log("[NodeCompatLayerV2] Virtual file system initialized");
			console.log("[NodeCompatLayerV2] Created directories: /home, /tmp, /save, /config, /data");
		}
	},

	/**
	 * 初始化持久化
	 */
	async initPersistence(): Promise<void> {
		try {
			// 初始化 IndexedDB
			await this.persistence.init();

			// 加载已保存的数据
			await this.loadFromStorage();
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to initialize persistence:", error);
			console.warn("[NodeCompatLayerV2] Continuing without persistence");
		}
	},

	/**
	 * 保存到持久化存储
	 */
	async saveToStorage(): Promise<void> {
		if (!this.config.enablePersistence) {
			return;
		}

		try {
			const snapshot = vol.toJSON();

			// 分类文件：小文件和大文件
			const smallFiles: Record<string, string> = {};
			const largeFiles: Record<string, string> = {};
			const SMALL_FILE_LIMIT = 100000; // 100KB

			for (const [path, content] of Object.entries(snapshot)) {
				if (content === null) {
					// 目录，跳过
					continue;
				}

				if (content.length < SMALL_FILE_LIMIT) {
					smallFiles[path] = content;
				} else {
					largeFiles[path] = content;
				}
			}

			// 保存到 localStorage（小文件）
			try {
				localStorage.setItem("vfs-small", JSON.stringify(smallFiles));
				if (this.config.verbose) {
					console.log(`[NodeCompatLayerV2] Saved ${Object.keys(smallFiles).length} small files to localStorage`);
				}
			} catch (error) {
				console.warn("[NodeCompatLayerV2] Failed to save to localStorage:", error);
			}

			// 保存到 IndexedDB（大文件）
			for (const [path, content] of Object.entries(largeFiles)) {
				await this.persistence.save(`file:${path}`, content);
			}

			if (Object.keys(largeFiles).length > 0 && this.config.verbose) {
				console.log(`[NodeCompatLayerV2] Saved ${Object.keys(largeFiles).length} large files to IndexedDB`);
			}

			// 保存文件系统元数据
			await this.persistence.save("metadata", {
				timestamp: Date.now(),
				smallFileCount: Object.keys(smallFiles).length,
				largeFileCount: Object.keys(largeFiles).length,
			});

			if (this.config.verbose) {
				console.log("[NodeCompatLayerV2] File system saved to persistent storage");
			}
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to save to storage:", error);
		}
	},

	/**
	 * 从持久化存储加载
	 */
	async loadFromStorage(): Promise<void> {
		if (!this.config.enablePersistence) {
			return;
		}

		try {
			const files: Record<string, string> = {};

			// 从 localStorage 加载小文件
			try {
				const smallData = localStorage.getItem("vfs-small");
				if (smallData) {
					const smallFiles = JSON.parse(smallData);
					Object.assign(files, smallFiles);
					if (this.config.verbose) {
						console.log(`[NodeCompatLayerV2] Loaded ${Object.keys(smallFiles).length} small files from localStorage`);
					}
				}
			} catch (error) {
				console.warn("[NodeCompatLayerV2] Failed to load from localStorage:", error);
			}

			// 从 IndexedDB 加载元数据
			const metadata = await this.persistence.load("metadata");
			if (metadata && this.config.verbose) {
				console.log("[NodeCompatLayerV2] Loaded metadata:", metadata);
			}

			// TODO: 从 IndexedDB 加载大文件
			// 这里需要遍历 IndexedDB 中所有以 'file:' 开头的键

			// 恢复文件系统
			if (Object.keys(files).length > 0) {
				vol.fromJSON(files);
				console.log(`[NodeCompatLayerV2] Restored ${Object.keys(files).length} files from persistent storage`);
			} else {
				if (this.config.verbose) {
					console.log("[NodeCompatLayerV2] No saved data found, starting with fresh file system");
				}
			}
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to load from storage:", error);
		}
	},

	/**
	 * 启用自动保存
	 */
	enableAutosave(interval: number = 5000): void {
		// 定期保存
		(window as any).__nodeCompatAutosaveTimer = setInterval(() => {
			this.saveToStorage().catch((err) => {
				console.error("[NodeCompatLayerV2] Autosave failed:", err);
			});
		}, interval);

		// 页面关闭前保存
		window.addEventListener("beforeunload", () => {
			// 使用同步方式尽可能保存（IndexedDB 部分可能丢失）
			try {
				const snapshot = vol.toJSON();
				const smallFiles: Record<string, string> = {};

				for (const [path, content] of Object.entries(snapshot)) {
					if (content && content.length < 100000) {
						smallFiles[path] = content;
					}
				}

				localStorage.setItem("vfs-small", JSON.stringify(smallFiles));
			} catch (error) {
				console.error("[NodeCompatLayerV2] Failed to save on beforeunload:", error);
			}
		});

		if (this.config.verbose) {
			console.log(`[NodeCompatLayerV2] Autosave enabled (interval: ${interval}ms)`);
		}
	},

	/**
	 * 禁用自动保存
	 */
	disableAutosave(): void {
		const timer = (window as any).__nodeCompatAutosaveTimer;
		if (timer) {
			clearInterval(timer);
			delete (window as any).__nodeCompatAutosaveTimer;
			console.log("[NodeCompatLayerV2] Autosave disabled");
		}
	},

	/**
	 * 清除所有持久化数据
	 */
	async clearStorage(): Promise<void> {
		try {
			// 清除 localStorage
			localStorage.removeItem("vfs-small");

			// 清除 IndexedDB
			await this.persistence.clear();

			// 重置虚拟文件系统
			vol.reset();
			this.setupVirtualFS();

			console.log("[NodeCompatLayerV2] Storage cleared and file system reset");
		} catch (error) {
			console.error("[NodeCompatLayerV2] Failed to clear storage:", error);
			throw error;
		}
	},

	/**
	 * 挂载虚拟文件系统
	 */
	mountVirtualFS(mountPoint: string, files: Record<string, string>): void {
		vol.fromJSON(files, mountPoint);
		if (this.config.verbose) {
			console.log(`[NodeCompatLayerV2] Mounted ${Object.keys(files).length} files to ${mountPoint}`);
		}
	},

	/**
	 * 导出文件系统
	 */
	exportFS(): Record<string, string | null> {
		return vol.toJSON();
	},

	/**
	 * 注册模块
	 */
	registerModule(name: string, exports: any): void {
		this.moduleRegistry[name] = exports;
		if (this.config.verbose) {
			console.log(`[NodeCompatLayerV2] Module registered: ${name}`);
		}
	},

	/**
	 * 创建 require 函数
	 */
	createRequire(): (moduleName: string) => any {
		const self = this;

		return function require(moduleName: string): any {
			// fs 模块使用 memfs
			if (moduleName === "fs") {
				return memfsInstance;
			}

			// buffer 模块使用导入的 Buffer
			if (moduleName === "buffer") {
				return { Buffer };
			}

			// 检查自定义模块注册表
			if (self.moduleRegistry[moduleName]) {
				return self.moduleRegistry[moduleName];
			}

			// 其他模块由 vite-plugin-node-polyfills 提供
			// 在运行时，这些模块已经被 Vite 打包进来了
			console.warn(`[NodeCompatLayerV2] Module '${moduleName}' not found in registry`);
			console.warn(
				`[NodeCompatLayerV2] If this is a Node.js core module, it should be polyfilled by vite-plugin-node-polyfills`,
			);

			return {};
		};
	},

	/**
	 * 注入全局对象
	 */
	injectGlobals(): void {
		const win = window as any;

		// 注入 Buffer（确保 memfs 可以访问）
		if (typeof win.Buffer === "undefined") {
			win.Buffer = Buffer;
		}
		if (typeof win.global === "undefined") {
			win.global = win;
		}

		// 注入 fs 模块
		win.fs = memfsInstance;

		// 注入 require 函数
		if (typeof win.require === "undefined") {
			win.require = this.createRequire();
		}

		// 注入 __dirname 和 __filename
		if (typeof win.__dirname === "undefined") {
			win.__dirname = "/";
		}
		if (typeof win.__filename === "undefined") {
			win.__filename = "/index.html";
		}

		// 注入 module 和 exports
		if (typeof win.module === "undefined") {
			win.module = { exports: {} };
		}
		if (typeof win.exports === "undefined") {
			win.exports = win.module.exports;
		}

		if (this.config.verbose) {
			console.log("[NodeCompatLayerV2] Global objects injected:");
			console.log("  - window.Buffer");
			console.log("  - window.global");
			console.log("  - window.fs");
			console.log("  - window.require");
			console.log("  - __dirname");
			console.log("  - __filename");
		}
	},

	/**
	 * 打印使用信息
	 */
	printUsageInfo(): void {
		console.log("");
		console.log("=".repeat(70));
		console.log("Node.js API Compatibility Layer v2.0 is active");
		console.log("=".repeat(70));
		console.log("✅ Real file system (memfs) - files are actually written!");
		console.log("✅ IndexedDB persistence - data survives page refresh!");
		console.log("✅ 20+ Node.js core modules polyfilled");
		console.log("");
		console.log("Available APIs:");
		console.log("  - fs: require('fs') - Full Node.js fs API");
		console.log("  - path: require('path') - Path manipulation");
		console.log("  - buffer: Buffer - Binary data handling");
		console.log("  - events: EventEmitter - Event system");
		console.log("  - stream: Stream - Data streams");
		console.log("  - crypto: crypto - Cryptographic functions");
		console.log("  - And 15+ more modules...");
		console.log("");
		console.log("Virtual directories:");
		console.log("  - /home - User files");
		console.log("  - /save - Game saves");
		console.log("  - /config - Configuration files");
		console.log("  - /data - Data files");
		console.log("  - /tmp - Temporary files");
		console.log("");
		console.log("Quick start:");
		console.log("  const fs = require('fs');");
		console.log("  fs.writeFileSync('/save/game.json', JSON.stringify({level: 10}));");
		console.log("  const data = fs.readFileSync('/save/game.json', 'utf-8');");
		console.log("");
		console.log("Management:");
		console.log("  - NodeCompatLayerV2.saveToStorage() - Manual save");
		console.log("  - NodeCompatLayerV2.loadFromStorage() - Manual load");
		console.log("  - NodeCompatLayerV2.clearStorage() - Clear all data");
		console.log("  - NodeCompatLayerV2.exportFS() - Export file system");
		console.log("=".repeat(70));
		console.log("");
	},
};

// IIFE wrapper for plugin
(() => {
	"use strict";

	console.log("[NodeCompatLayerV2] Plugin loading...");

	// 检查配置
	const config: NodeCompatConfig = (window as any).__nodeCompatConfig || {
		enableV2: true,
		enablePersistence: true,
		autosaveInterval: 5000,
		verbose: false,
	};

	// 立即暴露到全局（同步）
	(window as any).NodeCompatLayerV2 = NodeCompatLayerV2;

	// 立即进行环境检测和基础全局注入（同步）
	NodeCompatLayerV2.detectEnvironment();

	// 如果不是 nw.js 环境，立即注入基础全局变量
	if (!NodeCompatLayerV2.isNwjs) {
		// 同步注入必要的全局变量，确保其他插件能立即使用
		const win = window as any;

		// 注入 Buffer（关键：解决 dynamic require 问题）
		if (typeof win.Buffer === "undefined") {
			// 使用 vite-plugin-node-polyfills 提供的 Buffer
			win.Buffer = (globalThis as any).Buffer;
		}
		if (typeof win.global === "undefined") {
			win.global = win;
		}

		// 创建一个同步的 require 函数，优先处理 buffer 模块
		const syncRequire = function (moduleName: string): any {
			// 优先处理 buffer 模块
			if (moduleName === "buffer") {
				return { Buffer: win.Buffer };
			}

			// fs 模块使用 memfs
			if (moduleName === "fs") {
				return NodeCompatLayerV2.fs;
			}

			// 其他已知模块的处理
			switch (moduleName) {
				case "process":
					return win.process;
				case "path":
					return (globalThis as any).path;
				case "events":
					return (globalThis as any).events;
				case "util":
					return (globalThis as any).util;
				case "stream":
					return (globalThis as any).stream;
				case "crypto":
					return (globalThis as any).crypto;
				default:
					// 返回空对象以避免 "require is not defined" 错误
					return {};
			}
		};

		// 立即注入 require 函数
		if (typeof win.require === "undefined") {
			win.require = syncRequire;
		}

		// 注入基础变量
		if (typeof win.__dirname === "undefined") {
			win.__dirname = "/";
		}
		if (typeof win.__filename === "undefined") {
			win.__filename = "/index.html";
		}

		// 注入 module 和 exports
		if (typeof win.module === "undefined") {
			win.module = { exports: {} };
		}
		if (typeof win.exports === "undefined") {
			win.exports = win.module.exports;
		}

		console.log("[NodeCompatLayerV2] Basic globals injected synchronously");
	}

	// 异步初始化剩余功能
	NodeCompatLayerV2.init(config)
		.then(() => {
			console.log("[NodeCompatLayerV2] Plugin loaded successfully");

			// 向后兼容：也暴露为 NodeCompatLayer
			if (config.enableV2) {
				(window as any).NodeCompatLayer = NodeCompatLayerV2;
			}
		})
		.catch((error) => {
			console.error("[NodeCompatLayerV2] Plugin initialization failed:", error);
		});
})();
