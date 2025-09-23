//=============================================================================
// Window_BattleItem.js
//=============================================================================

/**
 * 战斗画面上的物品选择窗口类
 * Window for selecting an item to use on the battle screen
 * @class
 * @extends Window_ItemList
 */
function Window_BattleItem() {
	this.initialize.apply(this, arguments);
}

Window_BattleItem.prototype = Object.create(Window_ItemList.prototype);
Window_BattleItem.prototype.constructor = Window_BattleItem;

/**
 * 初始化战斗物品窗口
 * Initialize the battle item window
 * @param {number} x - 窗口的X坐标 - The x-coordinate of the window
 * @param {number} y - 窗口的Y坐标 - The y-coordinate of the window
 * @param {number} width - 窗口的宽度 - The width of the window
 * @param {number} height - 窗口的高度 - The height of the window
 */
Window_BattleItem.prototype.initialize = function (x, y, width, height) {
	Window_ItemList.prototype.initialize.call(this, x, y, width, height);
	this.hide();
};

/**
 * 检查物品是否包含在列表中
 * Check if an item is included in the list
 * @param {Object} item - 要检查的物品 - The item to check
 * @returns {boolean} 如果物品可以使用则返回true - Returns true if the item can be used
 */
Window_BattleItem.prototype.includes = function (item) {
	return $gameParty.canUse(item);
};

/**
 * 显示战斗物品窗口
 * Show the battle item window
 */
Window_BattleItem.prototype.show = function () {
	this.selectLast();
	this.showHelpWindow();
	Window_ItemList.prototype.show.call(this);
};

/**
 * 隐藏战斗物品窗口
 * Hide the battle item window
 */
Window_BattleItem.prototype.hide = function () {
	this.hideHelpWindow();
	Window_ItemList.prototype.hide.call(this);
};
