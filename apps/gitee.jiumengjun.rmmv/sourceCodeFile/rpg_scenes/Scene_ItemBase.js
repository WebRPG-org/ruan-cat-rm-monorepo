/**
 * @fileoverview 物品场景基类，物品和技能场景的父类。
 * Item scene base class, the superclass of item and skill scenes.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_项目基础
// Scene_ItemBase
//
// Scene_Item 和 Scene_Skill 的父类。
// The superclass of Scene_Item and Scene_Skill.

/**
 * 物品场景基类
 * Item scene base class
 *
 * @class Scene_ItemBase
 * @description 物品和技能场景的父类，提供物品选择和使用的基础功能。
 * The superclass of item and skill scenes, providing basic functionality for item selection and usage.
 * @extends Scene_MenuBase
 */
function Scene_ItemBase() {
	this.initialize.apply(this, arguments);
}

Scene_ItemBase.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ItemBase.prototype.constructor = Scene_ItemBase;

/**
 * 初始化物品场景基类
 * Initialize item scene base
 *
 * @memberof Scene_ItemBase
 * @method initialize
 * @description 初始化物品场景基类对象。
 * Initializes the item scene base object.
 * @returns {void} 无返回值 No return value
 */
Scene_ItemBase.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_ItemBase
 * @method create
 * @description 创建物品场景基类的显示对象。
 * Creates the display objects for the item scene base.
 * @returns {void} 无返回值 No return value
 */
Scene_ItemBase.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
};

/**
 * 获取当前物品
 * Get current item
 *
 * @memberof Scene_ItemBase
 * @method item
 * @description 获取当前选中的物品，由子类实现。
 * Gets the currently selected item, implemented by subclasses.
 * @returns {Object|undefined} 当前物品对象 - Current item object
 */
Scene_ItemBase.prototype.item = function () {
	return this._itemWindow.item();
};

/**
 * 获取当前角色
 * Get current actor
 *
 * @memberof Scene_ItemBase
 * @method actor
 * @description 获取当前选中的角色，由子类实现。
 * Gets the currently selected actor, implemented by subclasses.
 * @returns {Game_Actor|undefined} 当前角色对象 - Current actor object
 */
Scene_ItemBase.prototype.actor = function () {
	return this._actorWindow.actor();
};

/**
 * 当物品确定时
 * When item is confirmed
 *
 * @memberof Scene_ItemBase
 * @method onItemOk
 * @description 当物品确定时的处理，由子类实现。
 * Handles when the item is confirmed, implemented by subclasses.
 * @returns {void} 无返回值 No return value
 */
Scene_ItemBase.prototype.onItemOk = function () {
	// 子类实现
	// Implemented by subclasses
};
