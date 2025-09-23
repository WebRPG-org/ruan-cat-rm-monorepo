/**
 * @fileoverview 场景基类，游戏中所有场景的父类。
 * Scene base class, the superclass of all scenes within the game.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

/**
 * 场景基类
 * Scene base class
 *
 * @class Scene_Base
 * @description 游戏中所有场景的父类，提供基本的场景管理功能。
 * The superclass of all scenes within the game, providing basic scene management functionality.
 * @extends Stage
 */
function Scene_Base() {
	this.initialize.apply(this, arguments);
}

Scene_Base.prototype = Object.create(Stage.prototype);
Scene_Base.prototype.constructor = Scene_Base;

/**
 * 初始化场景基类
 * Initialize scene base
 *
 * @memberof Scene_Base
 * @method initialize
 * @description 初始化场景基类，设置默认属性和图像预留ID。
 * Initializes the scene base, sets default properties and image reservation ID.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.initialize = function () {
	Stage.prototype.initialize.call(this);
	this._active = false;
	this._fadeSign = 0;
	this._fadeDuration = 0;
	this._fadeSprite = null;
	this._imageReservationId = Utils.generateRuntimeId();
};

/**
 * 附加预留到预留队列
 * Attach reservation to reserve queue
 *
 * @memberof Scene_Base
 * @method attachReservation
 * @description 将图像预留ID附加到默认预留队列。
 * Attaches the image reservation ID to the default reservation queue.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.attachReservation = function () {
	ImageManager.setDefaultReservationId(this._imageReservationId);
};

/**
 * 从预留队列移除预留
 * Remove reservation from reserve queue
 *
 * @memberof Scene_Base
 * @method detachReservation
 * @description 从预留队列中移除图像预留ID。
 * Removes the image reservation ID from the reservation queue.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.detachReservation = function () {
	ImageManager.releaseReservation(this._imageReservationId);
};

/**
 * 创建组件并添加到渲染流程
 * Create components and add to rendering process
 *
 * @memberof Scene_Base
 * @method create
 * @description 创建场景的组件并添加到渲染流程中，由子类重写实现。
 * Creates scene components and adds them to the rendering process, overridden by subclasses.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.create = function () {};

/**
 * 检查场景是否活动
 * Check if scene is active
 *
 * @memberof Scene_Base
 * @method isActive
 * @returns {Boolean} 如果场景活动则返回true - Returns true if scene is active
 */
Scene_Base.prototype.isActive = function () {
	return this._active;
};

/**
 * 检查场景是否准备就绪
 * Check if scene is ready to start
 *
 * @memberof Scene_Base
 * @method isReady
 * @returns {Boolean} 如果场景准备就绪则返回true - Returns true if scene is ready to start
 */
Scene_Base.prototype.isReady = function () {
	return ImageManager.isReady();
};

/**
 * 开始场景处理
 * Start scene processing
 *
 * @memberof Scene_Base
 * @method start
 * @description 开始场景处理，将场景设置为激活状态。
 * Starts scene processing, sets the scene to active state.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.start = function () {
	this._active = true;
};

/**
 * 更新场景处理
 * Update scene processing
 *
 * @memberof Scene_Base
 * @method update
 * @description 每帧更新场景处理，包括淡化效果和子元素更新。
 * Updates scene processing each frame, including fade effects and children updates.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.update = function () {
	this.updateFade();
	this.updateChildren();
};

/**
 * 停止场景处理
 * Stop scene processing
 *
 * @memberof Scene_Base
 * @method stop
 * @description 停止场景处理，将场景设置为非激活状态。
 * Stops scene processing, sets the scene to inactive state.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.stop = function () {
	this._active = false;
};

/**
 * 检查场景是否繁忙
 * Check if scene is busy
 *
 * @memberof Scene_Base
 * @method isBusy
 * @returns {Boolean} 如果场景繁忙则返回true - Returns true if scene is busy
 */
Scene_Base.prototype.isBusy = function () {
	return this._fadeDuration > 0;
};

/**
 * 终止场景处理
 * Terminate scene processing
 *
 * @memberof Scene_Base
 * @method terminate
 * @description 终止场景处理，由子类重写实现。
 * Terminates scene processing, overridden by subclasses.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.terminate = function () {};

/**
 * 创建窗口图层
 * Create window layer
 *
 * @memberof Scene_Base
 * @method createWindowLayer
 * @description 创建窗口图层并添加到场景中。
 * Creates the window layer and adds it to the scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.createWindowLayer = function () {
	var width = Graphics.boxWidth;
	var height = Graphics.boxHeight;
	var x = (Graphics.width - width) / 2;
	var y = (Graphics.height - height) / 2;
	this._windowLayer = new WindowLayer();
	this._windowLayer.move(x, y, width, height);
	this.addChild(this._windowLayer);
};

/**
 * 添加窗口到窗口图层
 * Add window to window layer
 *
 * @memberof Scene_Base
 * @method addWindow
 * @param {Window} window - 窗口对象 - Window object
 */
Scene_Base.prototype.addWindow = function (window) {
	this._windowLayer.addChild(window);
};

/**
 * 开始淡入效果
 * Start fade in effect
 *
 * @memberof Scene_Base
 * @method startFadeIn
 * @param {Number} [duration=30] - 淡入时间 - Fade in duration
 * @param {Boolean} [white=false] - 是否使用白色 - Whether to use white color
 */
Scene_Base.prototype.startFadeIn = function (duration, white) {
	this.createFadeSprite(white);
	this._fadeSign = 1;
	this._fadeDuration = duration || 30;
	this._fadeSprite.opacity = 255;
};

/**
 * 开始淡出效果
 * Start fade out effect
 *
 * @memberof Scene_Base
 * @method startFadeOut
 * @param {Number} [duration=30] - 淡出时间 - Fade out duration
 * @param {Boolean} [white=false] - 是否使用白色 - Whether to use white color
 */
Scene_Base.prototype.startFadeOut = function (duration, white) {
	this.createFadeSprite(white);
	this._fadeSign = -1;
	this._fadeDuration = duration || 30;
	this._fadeSprite.opacity = 0;
};

/**
 * 创建淡化精灵
 * Create fade sprite
 *
 * @memberof Scene_Base
 * @method createFadeSprite
 * @param {Boolean} white - 是否使用白色 - Whether to use white color
 */
Scene_Base.prototype.createFadeSprite = function (white) {
	if (!this._fadeSprite) {
		this._fadeSprite = new ScreenSprite();
		this.addChild(this._fadeSprite);
	}
	if (white) {
		this._fadeSprite.setWhite();
	} else {
		this._fadeSprite.setBlack();
	}
};

/**
 * 更新淡化效果
 * Update fade effect
 *
 * @memberof Scene_Base
 * @method updateFade
 * @description 更新淡化效果的透明度。
 * Updates the opacity of the fade effect.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.updateFade = function () {
	if (this._fadeDuration > 0) {
		var d = this._fadeDuration;
		if (this._fadeSign > 0) {
			this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
		} else {
			this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
		}
		this._fadeDuration--;
	}
};

/**
 * 更新子元素
 * Update children elements
 *
 * @memberof Scene_Base
 * @method updateChildren
 * @description 更新所有子元素的每一帧处理。
 * Updates the frame processing of all child elements.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.updateChildren = function () {
	this.children.forEach(function (child) {
		if (child.update) {
			child.update();
		}
	});
};

/**
 * 弹出场景
 * Pop scene
 *
 * @memberof Scene_Base
 * @method popScene
 * @description 弹出当前场景，返回到上一个场景。
 * Pops the current scene and returns to the previous scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.popScene = function () {
	SceneManager.pop();
};

/**
 * 检查游戏结束
 * Check game over
 *
 * @memberof Scene_Base
 * @method checkGameover
 * @description 检查游戏是否结束，如果所有角色死亡则跳转到游戏结束场景。
 * Checks whether the game is over, if all characters are dead, jumps to game over scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.checkGameover = function () {
	if ($gameParty.isAllDead()) {
		SceneManager.goto(Scene_Gameover);
	}
};

/**
 * 淡出所有内容
 * Fade out all content
 *
 * @memberof Scene_Base
 * @method fadeOutAll
 * @description 淡出所有音频和视频内容。
 * Fades out all audio and visual content.
 * @returns {void} 无返回值 No return value
 */
Scene_Base.prototype.fadeOutAll = function () {
	var time = this.slowFadeSpeed() / 60;
	AudioManager.fadeOutBgm(time);
	AudioManager.fadeOutBgs(time);
	AudioManager.fadeOutMe(time);
	this.startFadeOut(this.slowFadeSpeed());
};

/**
 * 获取淡化速度
 * Get fade speed
 *
 * @memberof Scene_Base
 * @method fadeSpeed
 * @returns {Number} 淡化速度 - Fade speed value
 */
Scene_Base.prototype.fadeSpeed = function () {
	return 24;
};

/**
 * 获取慢速淡化速度
 * Get slow fade speed
 *
 * @memberof Scene_Base
 * @method slowFadeSpeed
 * @returns {Number} 慢速淡化速度 - Slow fade speed value
 */
Scene_Base.prototype.slowFadeSpeed = function () {
	return this.fadeSpeed() * 2;
};
