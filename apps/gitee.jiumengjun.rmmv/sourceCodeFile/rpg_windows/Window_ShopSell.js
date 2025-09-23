//=============================================================================
// Window_ShopSell.js
//=============================================================================

/**
 * 在商店画面上的选择要出售的商品的窗口
 * The window for selecting an item to sell on the shop screen
 * @class
 * @extends Window_ItemList
 */
function Window_ShopSell() {
	this.initialize.apply(this, arguments);
}

Window_ShopSell.prototype = Object.create(Window_ItemList.prototype);
Window_ShopSell.prototype.constructor = Window_ShopSell;

/**
 * 初始化商店出售窗口
 * Initialize the shop sell window
 * @param {number} x - 窗口的X坐标 - The x-coordinate of the window
 * @param {number} y - 窗口的Y坐标 - The y-coordinate of the window
 * @param {number} width - 窗口的宽度 - The width of the window
 * @param {number} height - 窗口的高度 - The height of the window
 */
Window_ShopSell.prototype.initialize = function (x, y, width, height) {
	Window_ItemList.prototype.initialize.call(this, x, y, width, height);
};

/**
 * 检查物品是否可出售
 * Check if item can be sold
 * @param {Object} item - 物品对象 - Item object
 * @returns {boolean} 是否可出售 - Whether can be sold
 */
Window_ShopSell.prototype.isEnabled = function (item) {
	return item && item.price > 0;
};
