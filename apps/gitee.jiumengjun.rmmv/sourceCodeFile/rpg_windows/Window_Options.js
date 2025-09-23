//=============================================================================
// Window_Options.js
//=============================================================================

/**
 * 设置画面上的更改各种设置的窗口
 * The window for changing various settings on the options screen
 * @class
 * @extends Window_Command
 */
function Window_Options() {
	this.initialize.apply(this, arguments);
}

Window_Options.prototype = Object.create(Window_Command.prototype);
Window_Options.prototype.constructor = Window_Options;

/**
 * 初始化设置窗口
 * Initialize the options window
 */
Window_Options.prototype.initialize = function () {
	Window_Command.prototype.initialize.call(this, 0, 0);
	this.updatePlacement();
};

/**
 * 获取窗口宽度
 * Get window width
 * @returns {number} 窗口宽度 - Window width
 */
Window_Options.prototype.windowWidth = function () {
	return 400;
};

/**
 * 获取窗口高度
 * Get window height
 * @returns {number} 窗口高度 - Window height
 */
Window_Options.prototype.windowHeight = function () {
	return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};

/**
 * 更新窗口位置
 * Update window position
 */
Window_Options.prototype.updatePlacement = function () {
	this.x = (Graphics.boxWidth - this.width) / 2;
	this.y = (Graphics.boxHeight - this.height) / 2;
};

/**
 * 制作指令列表
 * Make command list
 */
Window_Options.prototype.makeCommandList = function () {
	this.addGeneralOptions();
	this.addVolumeOptions();
};

/**
 * 增加一般选项
 * Add general options
 */
Window_Options.prototype.addGeneralOptions = function () {
	this.addCommand(TextManager.alwaysDash, "alwaysDash");
	this.addCommand(TextManager.commandRemember, "commandRemember");
};

/**
 * 增加音量选项
 * Add volume options
 */
Window_Options.prototype.addVolumeOptions = function () {
	this.addCommand(TextManager.bgmVolume, "bgmVolume");
	this.addCommand(TextManager.bgsVolume, "bgsVolume");
	this.addCommand(TextManager.meVolume, "meVolume");
	this.addCommand(TextManager.seVolume, "seVolume");
};

/**
 * 绘制项目
 * Draw item
 * @param {number} index - 项目索引 - Item index
 */
Window_Options.prototype.drawItem = function (index) {
	var rect = this.itemRectForText(index);
	var statusWidth = this.statusWidth();
	var titleWidth = rect.width - statusWidth;
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, "left");
	this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, "right");
};

/**
 * 获取状态宽度
 * Get status width
 * @returns {number} 状态宽度 - Status width
 */
Window_Options.prototype.statusWidth = function () {
	return 120;
};

/**
 * 获取状态文本
 * Get status text
 * @param {number} index - 项目索引 - Item index
 * @returns {string} 状态文本 - Status text
 */
Window_Options.prototype.statusText = function (index) {
	var symbol = this.commandSymbol(index);
	var value = this.getConfigValue(symbol);
	if (this.isVolumeSymbol(symbol)) {
		return this.volumeStatusText(value);
	} else {
		return this.booleanStatusText(value);
	}
};

/**
 * 检查是否为音量标识
 * Check if symbol is volume symbol
 * @param {string} symbol - 符号 - Symbol
 * @returns {boolean} 是否为音量标识 - Whether symbol is volume symbol
 */
Window_Options.prototype.isVolumeSymbol = function (symbol) {
	return symbol.contains("Volume");
};

/**
 * 获取布尔值状态文本
 * Get boolean status text
 * @param {boolean} value - 布尔值 - Boolean value
 * @returns {string} 状态文本 - Status text
 */
Window_Options.prototype.booleanStatusText = function (value) {
	return value ? "ON" : "OFF";
};

/**
 * 获取音量状态文本
 * Get volume status text
 * @param {number} value - 音量值 - Volume value
 * @returns {string} 音量状态文本 - Volume status text
 */
Window_Options.prototype.volumeStatusText = function (value) {
	return value + "%";
};

/**
 * 处理确定操作
 * Process OK operation
 */
Window_Options.prototype.processOk = function () {
	var index = this.index();
	var symbol = this.commandSymbol(index);
	var value = this.getConfigValue(symbol);
	if (this.isVolumeSymbol(symbol)) {
		value += this.volumeOffset();
		if (value > 100) {
			value = 0;
		}
		value = value.clamp(0, 100);
		this.changeValue(symbol, value);
	} else {
		this.changeValue(symbol, !value);
	}
};

/**
 * 光标向右移动
 * Move cursor right
 * @param {boolean} wrap - 是否循环 - Whether to wrap
 */
Window_Options.prototype.cursorRight = function (wrap) {
	var index = this.index();
	var symbol = this.commandSymbol(index);
	var value = this.getConfigValue(symbol);
	if (this.isVolumeSymbol(symbol)) {
		value += this.volumeOffset();
		value = value.clamp(0, 100);
		this.changeValue(symbol, value);
	} else {
		this.changeValue(symbol, true);
	}
};

/**
 * 光标向左移动
 * Move cursor left
 * @param {boolean} wrap - 是否循环 - Whether to wrap
 */
Window_Options.prototype.cursorLeft = function (wrap) {
	var index = this.index();
	var symbol = this.commandSymbol(index);
	var value = this.getConfigValue(symbol);
	if (this.isVolumeSymbol(symbol)) {
		value -= this.volumeOffset();
		value = value.clamp(0, 100);
		this.changeValue(symbol, value);
	} else {
		this.changeValue(symbol, false);
	}
};

/**
 * 获取音量偏移量
 * Get volume offset
 * @returns {number} 音量偏移量 - Volume offset
 */
Window_Options.prototype.volumeOffset = function () {
	return 20;
};

/**
 * 改变配置值
 * Change configuration value
 * @param {string} symbol - 配置符号 - Configuration symbol
 * @param {number|boolean} value - 配置值 - Configuration value
 */
Window_Options.prototype.changeValue = function (symbol, value) {
	var lastValue = this.getConfigValue(symbol);
	if (lastValue !== value) {
		this.setConfigValue(symbol, value);
		this.redrawItem(this.findSymbol(symbol));
		SoundManager.playCursor();
	}
};

/**
 * 获取配置值
 * Get configuration value
 * @param {string} symbol - 配置符号 - Configuration symbol
 * @returns {number|boolean} 配置值 - Configuration value
 */
Window_Options.prototype.getConfigValue = function (symbol) {
	return ConfigManager[symbol];
};

/**
 * 设置配置值
 * Set configuration value
 * @param {string} symbol - 配置符号 - Configuration symbol
 * @param {number|boolean} volume - 配置值 - Configuration value
 */
Window_Options.prototype.setConfigValue = function (symbol, volume) {
	ConfigManager[symbol] = volume;
};
