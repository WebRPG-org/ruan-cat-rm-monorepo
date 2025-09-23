/**
 * @fileoverview 游戏结束场景类，显示游戏失败时的结束界面。
 * Game over scene class for displaying the game over screen when the player fails.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_游戏结束
// Scene_Gameover
//
// 游戏结束画面的场景类。
// The scene class of the game over screen.

/**
 * 游戏结束场景类
 * Game over scene class
 *
 * @class Scene_Gameover
 * @description 游戏失败时显示的游戏结束界面场景类。
 * The scene class for displaying the game over screen when the player fails.
 * @extends Scene_Base
 */
function Scene_Gameover() {
	this.initialize.apply(this, arguments);
}

Scene_Gameover.prototype = Object.create(Scene_Base.prototype);
Scene_Gameover.prototype.constructor = Scene_Gameover;

/**
 * 初始化游戏结束场景
 * Initialize game over scene
 *
 * @memberof Scene_Gameover
 * @method initialize
 * @description 初始化游戏结束场景对象。
 * Initializes the game over scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_Gameover.prototype.initialize = function () {
	Scene_Base.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Gameover
 * @method create
 * @description 创建游戏结束场景的显示对象，播放结束音乐并创建背景。
 * Creates the display objects for the game over scene, plays game over music and creates background.
 * @returns {void} 无返回值 No return value
 */
Scene_Gameover.prototype.create = function () {
	Scene_Base.prototype.create.call(this);
	this.playGameoverMusic();
	this.createBackground();
};

/**
 * 开始场景
 * Start scene
 *
 * @memberof Scene_Gameover
 * @method start
 * @description 开始游戏结束场景，启动淡入效果。
 * Starts the game over scene, starts the fade in effect.
 * @returns {void} 无返回值 No return value
 */
Scene_Gameover.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	this.startFadeIn(this.slowFadeSpeed(), false);
};

/**
 * 更新场景
 * Update scene
 *
 * @memberof Scene_Gameover
 * @method update
 * @description 每帧更新游戏结束场景，检测玩家输入以返回标题。
 * Updates the game over scene each frame, detects player input to return to title.
 * @returns {void} 无返回值 No return value
 */
Scene_Gameover.prototype.update = function () {
	if (this.isActive() && !this.isBusy() && this.isTriggered()) {
		this.gotoTitle();
	}
	Scene_Base.prototype.update.call(this);
};

/**
 * 停止场景
 * Stop scene
 *
 * @memberof Scene_Gameover
 * @method stop
 * @description 停止游戏结束场景，淡出所有内容。
 * Stops the game over scene, fades out all content.
 * @returns {void} 无返回值 No return value
 */
Scene_Gameover.prototype.stop = function () {
	Scene_Base.prototype.stop.call(this);
	this.fadeOutAll();
};

/**
 * 终止场景
 * Terminate scene
 *
 * @memberof Scene_Gameover
 * @method terminate
 * @description 终止游戏结束场景，停止所有音频。
 * Terminates the game over scene, stops all audio.
 * @returns {void} 无返回值 No return value
 */
Scene_Gameover.prototype.terminate = function () {
	Scene_Base.prototype.terminate.call(this);
	AudioManager.stopAll();
};

/**
 * 播放游戏结束音乐
 * Play game over music
 *
 * @memberof Scene_Gameover
 * @method playGameoverMusic
 * @description 播放游戏结束的音乐效果。
 * Plays the game over music effect.
 * @returns {void} 无返回值 No return value
 */
Scene_Gameover.prototype.playGameoverMusic = function () {
	AudioManager.stopBgm();
	AudioManager.stopBgs();
	AudioManager.playMe($dataSystem.gameoverMe);
};

/**
 * 创建背景
 * Create background
 *
 * @memberof Scene_Gameover
 * @method createBackground
 * @description 创建游戏结束界面的背景图像。
 * Creates the background image for the game over screen.
 * @returns {void} 无返回值 No return value
 */
Scene_Gameover.prototype.createBackground = function () {
	this._backSprite = new Sprite();
	this._backSprite.bitmap = ImageManager.loadSystem("GameOver");
	this.addChild(this._backSprite);
};

/**
 * 检查是否触发
 * Check if triggered
 *
 * @memberof Scene_Gameover
 * @method isTriggered
 * @description 检查玩家是否触发了确认按钮或触摸屏。
 * Checks whether the player triggered the confirm button or touch screen.
 * @returns {Boolean} 如果触发则返回true - Returns true if triggered
 */
Scene_Gameover.prototype.isTriggered = function () {
	return Input.isTriggered("ok") || TouchInput.isTriggered();
};

/**
 * 回到标题
 * Go to title
 *
 * @memberof Scene_Gameover
 * @method gotoTitle
 * @description 跳转到标题画面。
 * Jumps to the title screen.
 * @returns {void} 无返回值 No return value
 */
Scene_Gameover.prototype.gotoTitle = function () {
	SceneManager.goto(Scene_Title);
};
