/**
 * @fileoverview 读档场景类，用于游戏存档读取界面。
 * Load scene class for game save loading interface.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_读档
// Scene_Load
//
// 读档画面的场景类。
// The scene class of the load screen.

/**
 * 读档场景类
 * Load scene class
 *
 * @class Scene_Load
 * @description 游戏存档读取界面的场景类，提供存档选择和加载功能。
 * The scene class of the game save loading interface, providing save selection and loading functionality.
 * @extends Scene_File
 */
function Scene_Load() {
	this.initialize.apply(this, arguments);
}

Scene_Load.prototype = Object.create(Scene_File.prototype);
Scene_Load.prototype.constructor = Scene_Load;

/**
 * 初始化读档场景
 * Initialize load scene
 *
 * @memberof Scene_Load
 * @method initialize
 * @description 初始化读档场景对象，设置加载成功标志。
 * Initializes the load scene object, sets load success flag.
 * @returns {void} 无返回值 No return value
 */
Scene_Load.prototype.initialize = function () {
	Scene_File.prototype.initialize.call(this);
	this._loadSuccess = false;
};

/**
 * 终止场景
 * Terminate scene
 *
 * @memberof Scene_Load
 * @method terminate
 * @description 终止读档场景，如果加载成功则执行加载后处理。
 * Terminates the load scene, executes post-load processing if load was successful.
 * @returns {void} 无返回值 No return value
 */
Scene_Load.prototype.terminate = function () {
	Scene_File.prototype.terminate.call(this);
	if (this._loadSuccess) {
		$gameSystem.onAfterLoad();
	}
};

/**
 * 获取模式
 * Get mode
 *
 * @memberof Scene_Load
 * @method mode
 * @description 获取文件操作模式为读档。
 * Gets the file operation mode as load.
 * @returns {String} 文件操作模式 - File operation mode
 */
Scene_Load.prototype.mode = function () {
	return "load";
};

/**
 * 帮助窗口文本
 * Help window text
 *
 * @memberof Scene_Load
 * @method helpWindowText
 * @description 获取帮助窗口显示的文本内容。
 * Gets the text content displayed in the help window.
 * @returns {String} 帮助文本 - Help text
 */
Scene_Load.prototype.helpWindowText = function () {
	return TextManager.loadMessage;
};

/**
 * 第一个存档索引
 * First savefile index
 *
 * @memberof Scene_Load
 * @method firstSavefileIndex
 * @description 获取最新存档的索引位置。
 * Gets the index position of the latest save file.
 * @returns {Number} 存档索引 - Save file index
 */
Scene_Load.prototype.firstSavefileIndex = function () {
	return DataManager.latestSavefileId() - 1;
};

/**
 * 当存档确定时
 * When savefile is confirmed
 *
 * @memberof Scene_Load
 * @method onSavefileOk
 * @description 当存档文件确定时尝试加载存档数据。
 * Attempts to load save data when the save file is confirmed.
 * @returns {void} 无返回值 No return value
 */
Scene_Load.prototype.onSavefileOk = function () {
	Scene_File.prototype.onSavefileOk.call(this);
	if (DataManager.loadGame(this.savefileId())) {
		this.onLoadSuccess();
	} else {
		this.onLoadFailure();
	}
};

/**
 * 当加载成功时
 * When load succeeds
 *
 * @memberof Scene_Load
 * @method onLoadSuccess
 * @description 当存档加载成功时的处理，播放音效并跳转到地图场景。
 * Handles when save loading succeeds, plays sound effect and jumps to map scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Load.prototype.onLoadSuccess = function () {
	SoundManager.playLoad();
	this.fadeOutAll();
	this.reloadMapIfUpdated();
	SceneManager.goto(Scene_Map);
	this._loadSuccess = true;
};

/**
 * 当加载失败时
 * When load fails
 *
 * @memberof Scene_Load
 * @method onLoadFailure
 * @description 当存档加载失败时的处理，播放错误音效并重新激活列表窗口。
 * Handles when save loading fails, plays error sound and reactivates list window.
 * @returns {void} 无返回值 No return value
 */
Scene_Load.prototype.onLoadFailure = function () {
	SoundManager.playBuzzer();
	this.activateListWindow();
};

/**
 * 如果更新则重载地图
 * Reload map if updated
 *
 * @memberof Scene_Load
 * @method reloadMapIfUpdated
 * @description 如果游戏版本更新则重新加载地图数据。
 * Reloads map data if the game version has been updated.
 * @returns {void} 无返回值 No return value
 */
Scene_Load.prototype.reloadMapIfUpdated = function () {
	if ($gameSystem.versionId() !== $dataSystem.versionId) {
		$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
		$gamePlayer.requestMapReload();
	}
};

//-----------------------------------------------------------------------------
// 场景_游戏结束
