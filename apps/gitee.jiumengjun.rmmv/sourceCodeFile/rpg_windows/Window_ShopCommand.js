//=============================================================================
// Window_ShopCommand.js
//=============================================================================

/**
 * 在商店画面上的选择购买/出售的窗口
 * The window for selecting buy/sell on the shop screen
 * @class
 * @extends Window_HorzCommand
 */
function Window_ShopCommand() {
	this.initialize.apply(this, arguments);
}

Window_ShopCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_ShopCommand.prototype.constructor = Window_ShopCommand;

/**
 * 初始化商店指令窗口
 * Initialize the shop command window
 * @param {number} width - 窗口宽度 - Window width
 * @param {boolean} purchaseOnly - 是否仅购买 - Whether purchase only
 */
Window_ShopCommand.prototype.initialize = function (width, purchaseOnly) {
	this._windowWidth = width;
	this._purchaseOnly = purchaseOnly;
	Window_HorzCommand.prototype.initialize.call(this, 0, 0);
};

/**
 * 获取窗口宽度
 * Get window width
 * @returns {number} 窗口宽度 - Window width
 */
Window_ShopCommand.prototype.windowWidth = function () {
	return this._windowWidth;
};

/**
 * 获取最大列数
 * Get maximum number of columns
 * @returns {number} 最大列数 - Maximum number of columns
 */
Window_ShopCommand.prototype.maxCols = function () {
	return 3;
};

/**
 * 制作指令列表
 * Make command list
 */
Window_ShopCommand.prototype.makeCommandList = function () {
	this.addCommand(TextManager.buy, "buy");
	this.addCommand(TextManager.sell, "sell", !this._purchaseOnly);
	this.addCommand(TextManager.cancel, "cancel");
};
