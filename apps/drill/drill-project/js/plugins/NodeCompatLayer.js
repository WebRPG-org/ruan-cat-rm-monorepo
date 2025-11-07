// undefined.js - 编译时间: 2025-11-07T11:47:00.846Z
"use strict";
var VueBridgePlugin = function() {
    // src/rpgmv-plugins/NodeCompatLayer.ts
    var NodeCompatLayer = {
        version: "1.0.0",
        initialized: false,
        isNodeEnv: false,
        isNwjs: false,
        isBrowser: false,
        moduleRegistry: {},
        /**
     * 初始化兼容层
     */ init: function init() {
            if (this.initialized) {
                console.log("[NodeCompatLayer] Already initialized, skipping...");
                return;
            }
            console.log("[NodeCompatLayer] Initializing Node.js API compatibility layer...");
            this.detectEnvironment();
            if (this.isNwjs) {
                console.log("[NodeCompatLayer] Running in nw.js environment, native Node.js API available");
                console.log("[NodeCompatLayer] Compatibility layer not needed, initialization skipped");
                this.initialized = true;
                return;
            }
            if (this.isBrowser) {
                console.log("[NodeCompatLayer] Running in browser environment, setting up compatibility layer...");
                this.setupBrowserCompat();
                console.log("[NodeCompatLayer] Compatibility layer initialized successfully");
            }
            this.initialized = true;
        },
        /**
     * 检测运行环境
     */ detectEnvironment: function detectEnvironment() {
            var hasProcess = typeof process !== "undefined";
            this.isNwjs = hasProcess && !!process.versions && !!process.versions.nw;
            this.isNodeEnv = hasProcess && typeof window.require === "function";
            this.isBrowser = !this.isNodeEnv;
            console.log("[NodeCompatLayer] Environment detection:");
            console.log("  - isNwjs:", this.isNwjs);
            console.log("  - isNodeEnv:", this.isNodeEnv);
            console.log("  - isBrowser:", this.isBrowser);
        },
        /**
     * 为浏览器环境设置 Node.js API 兼容
     */ setupBrowserCompat: function setupBrowserCompat() {
            var win = window;
            var scriptPath = this.getScriptPath();
            if (typeof win.__dirname === "undefined") {
                win.__dirname = scriptPath.dirname;
                console.log("[NodeCompatLayer] Set __dirname:", win.__dirname);
            }
            if (typeof win.__filename === "undefined") {
                win.__filename = scriptPath.filename;
                console.log("[NodeCompatLayer] Set __filename:", win.__filename);
            }
            this.registerModule("path", this.createPathModule());
            console.log("[NodeCompatLayer] Registered built-in module: path");
            if (typeof win.process === "undefined") {
                win.process = this.createProcessObject();
                console.log("[NodeCompatLayer] Created process object");
            }
            if (typeof win.require === "undefined") {
                win.require = this.createRequireFunction();
                console.log("[NodeCompatLayer] Set require function");
            }
            if (typeof win.module === "undefined") {
                win.module = {
                    exports: {}
                };
            }
            if (typeof win.exports === "undefined") {
                win.exports = win.module.exports;
            }
        },
        /**
     * 获取当前脚本的路径信息
     */ getScriptPath: function getScriptPath() {
            var scriptUrl = "";
            if (document.currentScript) {
                scriptUrl = document.currentScript.src;
            } else {
                var scripts = document.getElementsByTagName("script");
                if (scripts.length > 0) {
                    scriptUrl = scripts[scripts.length - 1].src;
                }
            }
            if (!scriptUrl) {
                scriptUrl = window.location.href;
            }
            try {
                var url = new URL(scriptUrl);
                var pathname = url.pathname;
                var lastSlashIndex = pathname.lastIndexOf("/");
                var dirname = lastSlashIndex >= 0 ? pathname.substring(0, lastSlashIndex) : "/";
                return {
                    dirname: dirname,
                    filename: pathname
                };
            } catch (error) {
                console.warn("[NodeCompatLayer] Failed to parse script URL:", error);
                return {
                    dirname: "/",
                    filename: "/index.html"
                };
            }
        },
        /**
     * 注册模块到注册表
     */ registerModule: function registerModule(name, exports) {
            this.moduleRegistry[name] = exports;
            console.log("[NodeCompatLayer] Module registered:", name);
        },
        /**
     * 创建 require 函数
     */ createRequireFunction: function createRequireFunction() {
            var self = this;
            return function require2(moduleName) {
                if (self.moduleRegistry[moduleName]) {
                    return self.moduleRegistry[moduleName];
                }
                console.warn("[NodeCompatLayer] Module '".concat(moduleName, "' not found in browser environment"));
                console.warn("[NodeCompatLayer] You can register custom modules using: NodeCompatLayer.registerModule('".concat(moduleName, "', yourModuleExports)"));
                return {};
            };
        },
        /**
     * 创建 path 模块的浏览器实现
     */ createPathModule: function createPathModule() {
            return {
                sep: "/",
                dirname: function dirname(filepath) {
                    if (!filepath) return ".";
                    var lastSlash = filepath.lastIndexOf("/");
                    if (lastSlash === -1) return ".";
                    if (lastSlash === 0) return "/";
                    return filepath.substring(0, lastSlash);
                },
                basename: function basename(filepath, ext) {
                    if (!filepath) return "";
                    var lastSlash = filepath.lastIndexOf("/");
                    var base = lastSlash === -1 ? filepath : filepath.substring(lastSlash + 1);
                    if (ext && base.endsWith(ext)) {
                        base = base.substring(0, base.length - ext.length);
                    }
                    return base;
                },
                extname: function extname(filepath) {
                    if (!filepath) return "";
                    var lastDot = filepath.lastIndexOf(".");
                    var lastSlash = filepath.lastIndexOf("/");
                    if (lastDot === -1 || lastDot < lastSlash) return "";
                    return filepath.substring(lastDot);
                },
                join: function join() {
                    for(var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++){
                        paths[_key] = arguments[_key];
                    }
                    if (paths.length === 0) return ".";
                    var joined = "";
                    for(var i = 0; i < paths.length; i++){
                        var part = paths[i];
                        if (part) {
                            if (joined) {
                                joined += "/" + part;
                            } else {
                                joined = part;
                            }
                        }
                    }
                    return joined.replace(/\/+/g, "/");
                },
                resolve: function resolve() {
                    for(var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++){
                        paths[_key] = arguments[_key];
                    }
                    var resolved = "";
                    for(var i = paths.length - 1; i >= 0; i--){
                        var path = paths[i];
                        if (!path) continue;
                        resolved = path + "/" + resolved;
                        if (path.startsWith("/")) {
                            break;
                        }
                    }
                    if (!resolved.startsWith("/")) {
                        var win = window;
                        var currentDir = win.__dirname || "/";
                        resolved = currentDir + "/" + resolved;
                    }
                    return resolved.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
                }
            };
        },
        /**
     * 创建 process 对象的浏览器实现
     */ createProcessObject: function createProcessObject() {
            var win = window;
            return {
                env: {
                    NODE_ENV: "browser",
                    BROWSER: "true"
                },
                cwd: function cwd() {
                    return win.__dirname || "/";
                },
                platform: "browser",
                version: "v0.0.0",
                versions: {
                    node: "0.0.0",
                    browser: "1.0.0"
                }
            };
        }
    };
    (function() {
        "use strict";
        console.log("[NodeCompatLayer] Plugin loading...");
        NodeCompatLayer.init();
        window.NodeCompatLayer = NodeCompatLayer;
        console.log("[NodeCompatLayer] Plugin loaded successfully");
        if (NodeCompatLayer.isBrowser && NodeCompatLayer.initialized) {
            console.log("");
            console.log("=".repeat(70));
            console.log("Node.js API Compatibility Layer is active");
            console.log("=".repeat(70));
            console.log("Available global variables:");
            console.log("  - __dirname:", window.__dirname);
            console.log("  - __filename:", window.__filename);
            console.log("  - require: function (browser-compatible)");
            console.log("  - process: object (browser-compatible)");
            console.log("");
            console.log("Available modules:");
            console.log("  - path: require('path')");
            console.log("");
            console.log("To register custom modules:");
            console.log("  NodeCompatLayer.registerModule('moduleName', { ... })");
            console.log("=".repeat(70));
            console.log("");
        }
    })();
}();
