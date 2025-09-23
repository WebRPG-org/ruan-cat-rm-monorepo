//=============================================================================
// Window_DebugRange.js
//=============================================================================

//-----------------------------------------------------------------------------
// 窗口_调试范围
// Window_DebugRange
//
// 在调试画面上的选择一块开关/变量的窗口。
// The window for selecting a block of switches/variables on the debug screen.

function Window_DebugRange() {
	this.initialize.apply(this, arguments);
}

Window_DebugRange.prototype = Object.create(Window_Selectable.prototype);
Window_DebugRange.prototype.constructor = Window_DebugRange;

Window_DebugRange.lastTopRow = 0; // 上一个顶部行数 - Last top row
Window_DebugRange.lastIndex = 0; // 上一个索引 - Last index

/**
 * 初始化
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 * Initialize
 */
Window_DebugRange.prototype.initialize = function (x, y) {
	this._maxSwitches = Math.ceil(($dataSystem.switches.length - 1) / 10);
	this._maxVariables = Math.ceil(($dataSystem.variables.length - 1) / 10);
	var width = this.windowWidth();
	var height = this.windowHeight();
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.setTopRow(Window_DebugRange.lastTopRow);
	this.select(Window_DebugRange.lastIndex);
	this.activate();
};

/**
 * 窗口宽度
 * @returns {number} 窗口宽度 - Window width
 * Window width
 */
Window_DebugRange.prototype.windowWidth = function () {
	return 246;
};

/**
 * 窗口高度
 * @returns {number} 窗口高度 - Window height
 * Window height
 */
Window_DebugRange.prototype.windowHeight = function () {
	return Graphics.boxHeight;
};

/**
 * 最大项目数
 * @returns {number} 最大项目数 - Maximum items
 * Maximum items
 */
Window_DebugRange.prototype.maxItems = function () {
	return this._maxSwitches + this._maxVariables;
};

/**
 * 更新
 * Update
 */
Window_DebugRange.prototype.update = function () {
	Window_Selectable.prototype.update.call(this);
	if (this._editWindow) {
		this._editWindow.setMode(this.mode());
		this._editWindow.setTopId(this.topId());
	}
};

/**
 * 模式
 * @returns {string} 模式（"switch" 或 "variable"）- Mode ("switch" or "variable")
 * Mode
 */
Window_DebugRange.prototype.mode = function () {
	return this.index() < this._maxSwitches ? "switch" : "variable";
};

/**
 * 顶部 ID
 * @returns {number} 顶部ID - Top ID
 * Top ID
 */
Window_DebugRange.prototype.topId = function () {
	var index = this.index();
	if (index < this._maxSwitches) {
		return index * 10 + 1;
	} else {
		return (index - this._maxSwitches) * 10 + 1;
	}
};

/**
 * 刷新
 * Refresh
 */
Window_DebugRange.prototype.refresh = function () {
	this.createContents();
	this.drawAllItems();
};

/**
 * 绘制项目
 * @param {number} index - 索引 - Index
 * Draw item
 */
Window_DebugRange.prototype.drawItem = function (index) {
	var rect = this.itemRectForText(index);
	var start;
	var text;
	if (index < this._maxSwitches) {
		start = index * 10 + 1;
		text = "S";
	} else {
		start = (index - this._maxSwitches) * 10 + 1;
		text = "V";
	}
	var end = start + 9;
	text += " [" + start.padZero(4) + "-" + end.padZero(4) + "]";
	this.drawText(text, rect.x, rect.y, rect.width);
};

/**
 * 是否取消触发
 * @returns {boolean} 是否取消触发 - Whether cancel is triggered
 * Is cancel triggered
 */
Window_DebugRange.prototype.isCancelTriggered = function () {
	return Window_Selectable.prototype.isCancelTriggered() || Input.isTriggered("debug");
};

/**
 * 处理取消
 * Process cancel
 */
Window_DebugRange.prototype.processCancel = function () {
	Window_Selectable.prototype.processCancel.call(this);
	Window_DebugRange.lastTopRow = this.topRow();
	Window_DebugRange.lastIndex = this.index();
};

/**
 * 设置编辑窗口
 * @param {Window_DebugEdit} editWindow - 编辑窗口对象 - Edit window object
 * Set edit window
 */
Window_DebugRange.prototype.setEditWindow = function (editWindow) {
	this._editWindow = editWindow;
};
