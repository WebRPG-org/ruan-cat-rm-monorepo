/**
 * @fileoverview 游戏结束场景类，用于显示游戏结束界面。
 * Game end scene class for displaying the game end interface.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_游戏结束
// Scene_GameEnd
//
// 游戏结束画面的场景类。
// The scene class of the game end screen.

/**
 * 游戏结束场景类
 * Game end scene class
 *
 * @class Scene_GameEnd
 * @description 游戏结束界面的场景类，提供返回标题等选项。
 * The scene class of the game end screen, providing options such as returning to the title.
 * @extends Scene_MenuBase
 */
function Scene_GameEnd() {
	this.initialize.apply(this, arguments);
}

Scene_GameEnd.prototype = Object.create(Scene_MenuBase.prototype);
Scene_GameEnd.prototype.constructor = Scene_GameEnd;

/**
 * 初始化游戏结束场景
 * Initialize game end scene
 *
 * @memberof Scene_GameEnd
 * @method initialize
 * @description 初始化游戏结束场景对象。
 * Initializes the game end scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_GameEnd.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_GameEnd
 * @method create
 * @description 创建游戏结束场景的显示对象和指令窗口。
 * Creates the display objects and command window for the game end scene.
 * @returns {void} 无返回值 No return value
 */
Scene_GameEnd.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
	this.createCommandWindow();
};

/**
 * 停止场景
 * Stop scene
 *
 * @memberof Scene_GameEnd
 * @method stop
 * @description 停止游戏结束场景，关闭指令窗口。
 * Stops the game end scene, closes the command window.
 * @returns {void} 无返回值 No return value
 */
Scene_GameEnd.prototype.stop = function () {
	Scene_MenuBase.prototype.stop.call(this);
	this._commandWindow.close();
};

/**
 * 创建背景
 * Create background
 *
 * @memberof Scene_GameEnd
 * @method createBackground
 * @description 创建游戏结束场景的背景，设置半透明效果。
 * Creates the background for the game end scene, sets semi-transparent effect.
 * @returns {void} 无返回值 No return value
 */
Scene_GameEnd.prototype.createBackground = function () {
	Scene_MenuBase.prototype.createBackground.call(this);
	this.setBackgroundOpacity(128);
};

/**
 * 创建指令窗口
 * Create command window
 *
 * @memberof Scene_GameEnd
 * @method createCommandWindow
 * @description 创建游戏结束操作的指令窗口。
 * Creates the command window for game end operations.
 * @returns {void} 无返回值 No return value
 */
Scene_GameEnd.prototype.createCommandWindow = function () {
	this._commandWindow = new Window_GameEnd();
	this._commandWindow.setHandler("toTitle", this.commandToTitle.bind(this));
	this._commandWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};

/**
 * 回到标题指令
 * Return to title command
 *
 * @memberof Scene_GameEnd
 * @method commandToTitle
 * @description 执行返回标题画面的指令。
 * Executes the command to return to the title screen.
 * @returns {void} 无返回值 No return value
 */
Scene_GameEnd.prototype.commandToTitle = function () {
	this.fadeOutAll();
	SceneManager.goto(Scene_Title);
};

//-----------------------------------------------------------------------------
// 场景_商店
