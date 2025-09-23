/**
 * @fileoverview 选项场景类，用于游戏选项设置界面。
 * Options scene class for game options settings interface.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_选项
// Scene_Options
//
// 选项画面的场景类。
// The scene class of the options screen.

/**
 * 选项场景类
 * Options scene class
 *
 * @class Scene_Options
 * @description 游戏选项画面的场景类，提供音量、画面等各种设置选项。
 * The scene class of the game options screen, providing various settings such as volume, screen, etc.
 * @extends Scene_MenuBase
 */
function Scene_Options() {
	this.initialize.apply(this, arguments);
}

Scene_Options.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Options.prototype.constructor = Scene_Options;

/**
 * 初始化选项场景
 * Initialize options scene
 *
 * @memberof Scene_Options
 * @method initialize
 * @description 初始化选项场景对象。
 * Initializes the options scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_Options.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Options
 * @method create
 * @description 创建选项场景的窗口组件。
 * Creates window components for the options scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Options.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
	this.createOptionsWindow();
};

/**
 * 终止场景
 * Terminate scene
 *
 * @memberof Scene_Options
 * @method terminate
 * @description 终止选项场景，保存配置设置。
 * Terminates the options scene, saves configuration settings.
 * @returns {void} 无返回值 No return value
 */
Scene_Options.prototype.terminate = function () {
	Scene_MenuBase.prototype.terminate.call(this);
	ConfigManager.save();
};

/**
 * 创建选项窗口
 * Create options window
 *
 * @memberof Scene_Options
 * @method createOptionsWindow
 * @description 创建显示和设置游戏选项的窗口。
 * Creates the window for displaying and setting game options.
 * @returns {void} 无返回值 No return value
 */
Scene_Options.prototype.createOptionsWindow = function () {
	this._optionsWindow = new Window_Options();
	this._optionsWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._optionsWindow);
};

//-----------------------------------------------------------------------------
// 场景_文件
