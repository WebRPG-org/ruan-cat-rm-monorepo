//=============================================================================
// Window_HorzCommand.js
//=============================================================================

//-----------------------------------------------------------------------------
// 窗口_水平指令
// Window_HorzCommand
//
// 水平选择格式的指令窗口。
// The command window for the horizontal selection format.

function Window_HorzCommand() {
	this.initialize.apply(this, arguments);
}

Window_HorzCommand.prototype = Object.create(Window_Command.prototype);
Window_HorzCommand.prototype.constructor = Window_HorzCommand;

/**
 * 初始化
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 * Initialize
 */
Window_HorzCommand.prototype.initialize = function (x, y) {
	Window_Command.prototype.initialize.call(this, x, y);
};

/**
 * 可见的行数
 * @returns {number} 可见行数 - Number of visible rows
 * Number of visible rows
 */
Window_HorzCommand.prototype.numVisibleRows = function () {
	return 1;
};

/**
 * 最大列数
 * @returns {number} 最大列数 - Maximum columns
 * Maximum columns
 */
Window_HorzCommand.prototype.maxCols = function () {
	return 4;
};

/**
 * 项目文本对齐
 * @returns {string} 对齐方式 - Alignment
 * Item text alignment
 */
Window_HorzCommand.prototype.itemTextAlign = function () {
	return "center";
};
