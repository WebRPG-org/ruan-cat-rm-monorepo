/**
 * @fileoverview 物品场景类，用于物品使用和管理界面。
 * Item scene class for item usage and management interface.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_项目
// Scene_Item
//
// 物品画面的场景类。
// The scene class of the item screen.

/**
 * 物品场景类
 * Item scene class
 *
 * @class Scene_Item
 * @description 物品使用和管理界面的场景类。
 * The scene class of the item usage and management interface.
 * @extends Scene_ItemBase
 */
function Scene_Item() {
	this.initialize.apply(this, arguments);
}

Scene_Item.prototype = Object.create(Scene_ItemBase.prototype);
Scene_Item.prototype.constructor = Scene_Item;

/**
 * 初始化物品场景
 * Initialize item scene
 *
 * @memberof Scene_Item
 * @method initialize
 * @description 初始化物品场景对象。
 * Initializes the item scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_Item.prototype.initialize = function () {
	Scene_ItemBase.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Item
 * @method create
 * @description 创建物品场景的显示对象。
 * Creates the display objects for the item scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Item.prototype.create = function () {
	Scene_ItemBase.prototype.create.call(this);
};

/**
 * 当物品确定时
 * When item is confirmed
 *
 * @memberof Scene_Item
 * @method onItemOk
 * @description 当物品确定时使用物品。
 * Uses the item when the item is confirmed.
 * @returns {void} 无返回值 No return value
 */
Scene_Item.prototype.onItemOk = function () {
	$this.item().useEffect(this.actor());
	this.activateItemWindow();
};
