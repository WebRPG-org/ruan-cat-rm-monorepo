/**
 * @fileoverview 存档场景类，用于游戏存档界面。
 * Save scene class for game save interface.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_存档
// Scene_Save
//
// 存档画面的场景类。
// The scene class of the save screen.

/**
 * 存档场景类
 * Save scene class
 *
 * @class Scene_Save
 * @description 游戏存档画面的场景类，提供游戏存档功能。
 * The scene class of the game save screen, providing game save functionality.
 * @extends Scene_File
 * @description
 * Scene_Save 和 Scene_Load 的父类。
 * The superclass of Scene_Save and Scene_Load.
 */
function Scene_Save() {
	this.initialize.apply(this, arguments);
}

Scene_Save.prototype = Object.create(Scene_File.prototype);
Scene_Save.prototype.constructor = Scene_Save;

/**
 * 初始化存档场景
 * Initialize save scene
 *
 * @memberof Scene_Save
 * @method initialize
 * @description 初始化存档场景对象。
 * Initializes the save scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_Save.prototype.initialize = function () {
	Scene_File.prototype.initialize.call(this);
};

/**
 * 获取模式
 * Get mode
 *
 * @memberof Scene_Save
 * @method mode
 * @description 获取存档场景的模式标识。
 * Gets the mode identifier for the save scene.
 * @returns {string} 模式标识 Mode identifier
 */
Scene_Save.prototype.mode = function () {
	return "save";
};

/**
 * 帮助窗口文本
 * Help window text
 *
 * @memberof Scene_Save
 * @method helpWindowText
 * @description 获取帮助窗口显示的文本。
 * Gets the text to display in the help window.
 * @returns {string} 帮助文本 Help text
 */
Scene_Save.prototype.helpWindowText = function () {
	return "选择要存档的文件位置。";
};

/**
 * 存档文件ID
 * Savefile ID
 *
 * @memberof Scene_Save
 * @method savefileId
 * @description 获取当前选中的存档文件ID。
 * Gets the ID of the currently selected savefile.
 * @returns {number} 存档文件ID Savefile ID
 */
Scene_Save.prototype.savefileId = function () {
	return this._savefileWindow.id();
};

/**
 * 执行存档
 * Execute save
 *
 * @memberof Scene_Save
 * @method onSavefileOk
 * @description 执行游戏存档操作。
 * Executes the game save operation.
 * @returns {void} 无返回值 No return value
 */
Scene_Save.prototype.onSavefileOk = function () {
	Scene_File.prototype.onSavefileOk.call(this);
	$gameSystem.onBeforeSave();
	if (DataManager.saveGame(this.savefileId())) {
		this.onSaveSuccess();
	} else {
		this.onSaveFailure();
	}
};

/**
 * 存档成功时的处理
 * Processing when save succeeds
 *
 * @memberof Scene_Save
 * @method onSaveSuccess
 * @description 存档成功时的处理，播放音效并显示成功信息。
 * Processing when save succeeds, plays sound effect and shows success message.
 * @returns {void} 无返回值 No return value
 */
Scene_Save.prototype.onSaveSuccess = function () {
	SoundManager.playSave();
	StorageManager.cleanBackup(this.savefileId());
	this._savefileWindow.redrawItem(this._savefileWindow.index());
	this.popScene();
};

/**
 * 存档失败时的处理
 * Processing when save fails
 *
 * @memberof Scene_Save
 * @method onSaveFailure
 * @description 存档失败时的处理，显示错误信息。
 * Processing when save fails, shows error message.
 * @returns {void} 无返回值 No return value
 */
Scene_Save.prototype.onSaveFailure = function () {
	SoundManager.playBuzzer();
};
