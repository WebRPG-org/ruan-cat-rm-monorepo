/**
 * @fileoverview 调试场景类，用于游戏调试和修改开关变量。
 * Debug scene class for game debugging and modifying switches and variables.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_调试
// Scene_Debug
//
// 调试画面的场景类。
// The scene class of the debug screen.

/**
 * 调试场景类
 * Debug scene class
 *
 * @class Scene_Debug
 * @description 游戏调试界面的场景类，用于修改游戏开关和变量。
 * The scene class of the debug screen for modifying game switches and variables.
 * @extends Scene_MenuBase
 */
function Scene_Debug() {
	this.initialize.apply(this, arguments);
}

Scene_Debug.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Debug.prototype.constructor = Scene_Debug;

/**
 * 初始化调试场景
 * Initialize debug scene
 *
 * @memberof Scene_Debug
 * @method initialize
 * @description 初始化调试场景对象。
 * Initializes the debug scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_Debug.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Debug
 * @method create
 * @description 创建调试场景的显示对象，包括范围窗口、编辑窗口和帮助窗口。
 * Creates the display objects for the debug scene, including range window, edit window and help window.
 * @returns {void} 无返回值 No return value
 */
Scene_Debug.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
	this.createRangeWindow();
	this.createEditWindow();
	this.createDebugHelpWindow();
};

/**
 * 创建范围窗口
 * Create range window
 *
 * @memberof Scene_Debug
 * @method createRangeWindow
 * @description 创建用于选择调试范围（开关或变量）的窗口。
 * Creates the window for selecting debug range (switches or variables).
 * @returns {void} 无返回值 No return value
 */
Scene_Debug.prototype.createRangeWindow = function () {
	this._rangeWindow = new Window_DebugRange(0, 0);
	this._rangeWindow.setHandler("ok", this.onRangeOk.bind(this));
	this._rangeWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._rangeWindow);
};

/**
 * 创建编辑窗口
 * Create edit window
 *
 * @memberof Scene_Debug
 * @method createEditWindow
 * @description 创建用于编辑开关或变量值的窗口。
 * Creates the window for editing switch or variable values.
 * @returns {void} 无返回值 No return value
 */
Scene_Debug.prototype.createEditWindow = function () {
	var wx = this._rangeWindow.width;
	var ww = Graphics.boxWidth - wx;
	this._editWindow = new Window_DebugEdit(wx, 0, ww);
	this._editWindow.setHandler("cancel", this.onEditCancel.bind(this));
	this._rangeWindow.setEditWindow(this._editWindow);
	this.addWindow(this._editWindow);
};

/**
 * 创建调试帮助窗口
 * Create debug help window
 *
 * @memberof Scene_Debug
 * @method createDebugHelpWindow
 * @description 创建显示调试操作帮助信息的窗口。
 * Creates the window for displaying debug operation help information.
 * @returns {void} 无返回值 No return value
 */
Scene_Debug.prototype.createDebugHelpWindow = function () {
	var wx = this._editWindow.x;
	var wy = this._editWindow.height;
	var ww = this._editWindow.width;
	var wh = Graphics.boxHeight - wy;
	this._debugHelpWindow = new Window_Base(wx, wy, ww, wh);
	this.addWindow(this._debugHelpWindow);
};

/**
 * 当范围确定时
 * When range is confirmed
 *
 * @memberof Scene_Debug
 * @method onRangeOk
 * @description 当范围窗口确定时激活编辑窗口。
 * Activates the edit window when the range window is confirmed.
 * @returns {void} 无返回值 No return value
 */
Scene_Debug.prototype.onRangeOk = function () {
	this._editWindow.activate();
	this._editWindow.select(0);
	this.refreshHelpWindow();
};

/**
 * 当编辑取消时
 * When edit is cancelled
 *
 * @memberof Scene_Debug
 * @method onEditCancel
 * @description 当编辑窗口取消时激活范围窗口。
 * Activates the range window when the edit window is cancelled.
 * @returns {void} 无返回值 No return value
 */
Scene_Debug.prototype.onEditCancel = function () {
	this._rangeWindow.activate();
	this._editWindow.deselect();
	this.refreshHelpWindow();
};

/**
 * 刷新帮助窗口
 * Refresh help window
 *
 * @memberof Scene_Debug
 * @method refreshHelpWindow
 * @description 刷新帮助窗口的显示内容。
 * Refreshes the display content of the help window.
 * @returns {void} 无返回值 No return value
 */
Scene_Debug.prototype.refreshHelpWindow = function () {
	this._debugHelpWindow.contents.clear();
	if (this._editWindow.active) {
		this._debugHelpWindow.drawTextEx(this.helpText(), 4, 0);
	}
};

/**
 * 帮助文本
 * Help text
 *
 * @memberof Scene_Debug
 * @method helpText
 * @description 根据当前模式返回相应的帮助文本。
 * Returns the corresponding help text based on the current mode.
 * @returns {String} 帮助文本内容 - Help text content
 */
Scene_Debug.prototype.helpText = function () {
	if (this._rangeWindow.mode() === "switch") {
		return "Enter : ON / OFF";
	} else {
		return "Left     :  -1\n" + "Right    :  +1\n" + "Pageup   : -10\n" + "Pagedown : +10";
	}
};

//-----------------------------------------------------------------------------
// 场景_战斗
