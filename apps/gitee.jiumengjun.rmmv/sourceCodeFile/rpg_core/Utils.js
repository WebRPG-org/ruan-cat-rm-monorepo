//-----------------------------------------------------------------------------
/**
 * @fileoverview Utils - 实用工具类
 * @description 定义实用方法的静态类，提供各种游戏开发相关的工具函数
 * The static class that defines utility methods, providing various game development utility functions
 * @author RPG Maker MV Development Team
 * @since RPG Maker MV 1.0.0
 */

/**
 * 实用工具类
 * Utility class
 *
 * @class Utils
 * @description 定义实用方法的静态类，提供各种游戏开发相关的工具函数
 * The static class that defines utility methods, providing various game development utility functions
 */
function Utils() {
	throw new Error("This is a static class");
}

/**
 * RPG Maker 的名称。当前版本为 'MV'。
 * The name of the RPG Maker. 'MV' in the current version.
 *
 * @memberof Utils
 * @static
 * @property {string} RPGMAKER_NAME - RPG Maker名称 - RPG Maker name
 * @readonly
 * @description RPG Maker的名称，当前版本为'MV'
 * The name of the RPG Maker, 'MV' in the current version
 */
Utils.RPGMAKER_NAME = "MV";

/**
 * RPG Maker 的版本。
 * The version of the RPG Maker.
 *
 * @memberof Utils
 * @static
 * @property {string} RPGMAKER_VERSION - RPG Maker版本 - RPG Maker version
 * @readonly
 * @description RPG Maker的版本号
 * The version number of the RPG Maker
 */
Utils.RPGMAKER_VERSION = "1.6.1";

/**
 * 检查选项是否在查询字符串中
 * Checks whether the option is in the query string
 *
 * @memberof Utils
 * @static
 * @method isOptionValid
 * @param {string} name - 选项名称 - Option name
 * @returns {boolean} 如果选项在查询字符串中则返回true - True if the option is in the query string
 * @description 检查指定的选项是否在URL查询字符串中
 * Checks whether the specified option is in the URL query string
 */
Utils.isOptionValid = function (name) {
	if (location.search.slice(1).split("&").contains(name)) {
		return 1;
	}
	if (typeof nw !== "undefined" && nw.App.argv.length > 0 && nw.App.argv[0].split("&").contains(name)) {
		return 1;
	}
	return 0;
};

/**
 * 检查平台是否为 NW.js
 * Checks whether the platform is NW.js
 *
 * @memberof Utils
 * @static
 * @method isNwjs
 * @description 检查当前运行平台是否为 NW.js 桌面应用
 * Checks whether the current platform is NW.js desktop application
 * @returns {boolean} 如果平台是 NW.js 则返回true - True if the platform is NW.js
 */
Utils.isNwjs = function () {
	return typeof require === "function" && typeof process === "object";
};

/**
 * 检查平台是否为移动设备
 * Checks whether the platform is a mobile device
 *
 * @memberof Utils
 * @static
 * @method isMobileDevice
 * @description 检查当前运行平台是否为移动设备
 * Checks whether the current platform is a mobile device
 * @returns {boolean} 如果平台是移动设备则返回true - True if the platform is a mobile device
 */
Utils.isMobileDevice = function () {
	var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return !!navigator.userAgent.match(r);
};

/**
 * 检查浏览器是否为 Mobile Safari
 * Checks whether the browser is Mobile Safari
 *
 * @memberof Utils
 * @static
 * @method isMobileSafari
 * @description 检查当前浏览器是否为 iOS 设备上的 Safari 浏览器
 * Checks whether the current browser is Safari on iOS devices
 * @returns {boolean} 如果浏览器是 Mobile Safari 则返回true - True if the browser is Mobile Safari
 */
Utils.isMobileSafari = function () {
	var agent = navigator.userAgent;
	return !!(agent.match(/iPhone|iPad|iPod/) && agent.match(/AppleWebKit/) && !agent.match("CriOS"));
};

/**
 * 检查浏览器是否为 Android Chrome
 * Checks whether the browser is Android Chrome
 *
 * @memberof Utils
 * @static
 * @method isAndroidChrome
 * @description 检查当前浏览器是否为 Android 设备上的 Chrome 浏览器
 * Checks whether the current browser is Chrome on Android devices
 * @returns {boolean} 如果浏览器是 Android Chrome 则返回true - True if the browser is Android Chrome
 */
Utils.isAndroidChrome = function () {
	var agent = navigator.userAgent;
	return !!(agent.match(/Android/) && agent.match(/Chrome/));
};

/**
 * 检查浏览器是否可以读取游戏文件夹中的文件
 * Checks whether the browser can read files in the game folder
 *
 * @memberof Utils
 * @static
 * @method canReadGameFiles
 * @description 检查浏览器是否具有读取游戏文件夹中文件的权限
 * Checks whether the browser has permission to read files in the game folder
 * @returns {boolean} 如果浏览器可以读取游戏文件夹中的文件则返回true - True if the browser can read files in the game folder
 */
Utils.canReadGameFiles = function () {
	var scripts = document.getElementsByTagName("script");
	var lastScript = scripts[scripts.length - 1];
	var xhr = new XMLHttpRequest();
	try {
		xhr.open("GET", lastScript.src);
		xhr.overrideMimeType("text/javascript");
		xhr.send();
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * 从 RGB 值创建 CSS 颜色字符串
 * Makes a CSS color string from RGB values
 *
 * @memberof Utils
 * @static
 * @method rgbToCssColor
 * @description 将RGB颜色值转换为CSS颜色字符串格式
 * Converts RGB color values to CSS color string format
 * @param {number} r - 红色值，范围为 (0, 255) - The red value in the range (0, 255)
 * @param {number} g - 绿色值，范围为 (0, 255) - The green value in the range (0, 255)
 * @param {number} b - 蓝色值，范围为 (0, 255) - The blue value in the range (0, 255)
 * @returns {string} CSS 颜色字符串 - CSS color string
 */
Utils.rgbToCssColor = function (r, g, b) {
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);
	return "rgb(" + r + "," + g + "," + b + ")";
};

Utils._id = 1;

/**
 * 生成一个唯一的运行时ID
 * Generates a unique runtime ID
 *
 * @memberof Utils
 * @static
 * @method generateRuntimeId
 * @description 生成一个递增的唯一运行时标识符
 * Generates an incrementing unique runtime identifier
 * @returns {number} 唯一的运行时ID - A unique runtime ID
 */
Utils.generateRuntimeId = function () {
	return Utils._id++;
};

Utils._supportPassiveEvent = null;
/**
 * 测试此浏览器是否支持被动事件功能
 * Test this browser support passive event feature
 *
 * @memberof Utils
 * @static
 * @method isSupportPassiveEvent
 * @description 检测浏览器是否支持被动事件监听器，用于提高滚动性能
 * Tests whether the browser supports passive event listeners for better scroll performance
 * @returns {boolean} 如果浏览器支持被动事件则返回true - True if the browser supports passive event, false otherwise
 */
Utils.isSupportPassiveEvent = function () {
	if (typeof Utils._supportPassiveEvent === "boolean") {
		return Utils._supportPassiveEvent;
	}
	// test support passive event
	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
	var passive = false;
	var options = Object.defineProperty({}, "passive", {
		get: function () {
			passive = true;
		},
	});
	window.addEventListener("test", null, options);
	Utils._supportPassiveEvent = passive;
	return passive;
};
