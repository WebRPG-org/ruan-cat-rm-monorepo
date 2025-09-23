/**
 * @fileoverview 菜单基础场景类，所有菜单类型场景的父类。
 * Menu base scene class, the superclass of all menu-type scenes.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_菜单基础
// Scene_MenuBase
//
// 所有菜单类型场景的父类。
// The superclass of all the menu-type scenes.

/**
 * 菜单基础场景类
 * Menu base scene class
 *
 * @class Scene_MenuBase
 * @description 所有菜单类型场景的父类，提供菜单场景的基础功能。
 * The superclass of all menu-type scenes, providing basic functionality for menu scenes.
 * @extends Scene_Base
 */
function Scene_MenuBase() {
	this.initialize.apply(this, arguments);
}

Scene_MenuBase.prototype = Object.create(Scene_Base.prototype);
Scene_MenuBase.prototype.constructor = Scene_MenuBase;

/**
 * 初始化菜单基础场景
 * Initialize menu base scene
 *
 * @memberof Scene_MenuBase
 * @method initialize
 * @description 初始化菜单基础场景对象。
 * Initializes the menu base scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_MenuBase.prototype.initialize = function () {
	Scene_Base.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_MenuBase
 * @method create
 * @description 创建菜单基础场景的背景、窗口层等基础组件。
 * Creates basic components for the menu base scene such as background, window layer, etc.
 * @returns {void} 无返回值 No return value
 */
Scene_MenuBase.prototype.create = function () {
	Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.updateActor();
	this.createWindowLayer();
};

/**
 * 获取当前角色
 * Get current actor
 *
 * @memberof Scene_MenuBase
 * @method actor
 * @description 获取当前选中的角色对象。
 * Gets the currently selected actor object.
 * @returns {Game_Actor} 当前角色对象 Current actor object
 */
Scene_MenuBase.prototype.actor = function () {
	return this._actor;
};

/**
 * 更新角色
 * Update actor
 *
 * @memberof Scene_MenuBase
 * @method updateActor
 * @description 更新当前选中的角色。
 * Updates the currently selected actor.
 * @returns {void} 无返回值 No return value
 */
Scene_MenuBase.prototype.updateActor = function () {
	this._actor = $gameParty.menuActor();
};

/**
 * 创建背景
 * Create background
 *
 * @memberof Scene_MenuBase
 * @method createBackground
 * @description 创建菜单场景的背景精灵。
 * Creates the background sprite for the menu scene.
 * @returns {void} 无返回值 No return value
 */
Scene_MenuBase.prototype.createBackground = function () {
	this._backgroundSprite = new Sprite();
	this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	this.addChild(this._backgroundSprite);
};

/**
 * 设置背景不透明度
 * Set background opacity
 *
 * @memberof Scene_MenuBase
 * @method setBackgroundOpacity
 * @description 设置菜单背景的不透明度。
 * Sets the opacity of the menu background.
 * @param {number} opacity - 不透明度值 Opacity value
 * @returns {void} 无返回值 No return value
 */
Scene_MenuBase.prototype.setBackgroundOpacity = function (opacity) {
	this._backgroundSprite.opacity = opacity;
};

/**
 * 创建帮助窗口
 * Create help window
 *
 * @memberof Scene_MenuBase
 * @method createHelpWindow
 * @description 创建显示帮助信息的窗口。
 * Creates the window for displaying help information.
 * @returns {void} 无返回值 No return value
 */
Scene_MenuBase.prototype.createHelpWindow = function () {
	this._helpWindow = new Window_Help();
	this.addWindow(this._helpWindow);
};

/**
 * 切换到下一个角色
 * Switch to next actor
 *
 * @memberof Scene_MenuBase
 * @method nextActor
 * @description 切换到菜单中的下一个角色。
 * Switches to the next actor in the menu.
 * @returns {void} 无返回值 No return value
 */
Scene_MenuBase.prototype.nextActor = function () {
	$gameParty.makeMenuActorNext();
	this.updateActor();
	this.onActorChange();
};

/**
 * 切换到上一个角色
 * Switch to previous actor
 *
 * @memberof Scene_MenuBase
 * @method previousActor
 * @description 切换到菜单中的上一个角色。
 * Switches to the previous actor in the menu.
 * @returns {void} 无返回值 No return value
 */
Scene_MenuBase.prototype.previousActor = function () {
	$gameParty.makeMenuActorPrevious();
	this.updateActor();
	this.onActorChange();
};

/**
 * 角色改变时的处理
 * Processing when actor changes
 *
 * @memberof Scene_MenuBase
 * @method onActorChange
 * @description 当角色切换时调用的虚方法，由子类实现具体功能。
 * Virtual method called when actor changes, implemented by subclasses for specific functionality.
 * @returns {void} 无返回值 No return value
 */
Scene_MenuBase.prototype.onActorChange = function () {};
