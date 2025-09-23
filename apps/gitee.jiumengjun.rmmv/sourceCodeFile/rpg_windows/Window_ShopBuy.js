//=============================================================================
// Window_ShopBuy.js
//=============================================================================

/**
 * 在商店画面上的选择要购买的商品的窗口
 * The window for selecting an item to buy on the shop screen
 * @class
 * @extends Window_Selectable
 */
function Window_ShopBuy() {
	this.initialize.apply(this, arguments);
}

Window_ShopBuy.prototype = Object.create(Window_Selectable.prototype);
Window_ShopBuy.prototype.constructor = Window_ShopBuy;

/**
 * 初始化商店购买窗口
 * Initialize the shop buy window
 * @param {number} x - 窗口的X坐标 - The x-coordinate of the window
 * @param {number} y - 窗口的Y坐标 - The y-coordinate of the window
 * @param {number} height - 窗口的高度 - The height of the window
 * @param {Array} shopGoods - 商店商品数组 - Array of shop goods
 */
Window_ShopBuy.prototype.initialize = function (x, y, height, shopGoods) {
	var width = this.windowWidth();
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._shopGoods = shopGoods;
	this._money = 0;
	this.refresh();
	this.select(0);
};

/**
 * 获取窗口宽度
 * Get window width
 * @returns {number} 窗口宽度 - Window width
 */
Window_ShopBuy.prototype.windowWidth = function () {
	return 456;
};

/**
 * 获取最大项目数
 * Get maximum number of items
 * @returns {number} 最大项目数 - Maximum number of items
 */
Window_ShopBuy.prototype.maxItems = function () {
	return this._data ? this._data.length : 1;
};

/**
 * 获取当前项目
 * Get current item
 * @returns {Object} 当前项目 - Current item
 */
Window_ShopBuy.prototype.item = function () {
	return this._data[this.index()];
};

/**
 * 设置金钱数量
 * Set money amount
 * @param {number} money - 金钱数量 - Money amount
 */
Window_ShopBuy.prototype.setMoney = function (money) {
	this._money = money;
	this.refresh();
};

/**
 * 检查当前项目是否启用
 * Check if current item is enabled
 * @returns {boolean} 是否启用 - Whether enabled
 */
Window_ShopBuy.prototype.isCurrentItemEnabled = function () {
	return this.isEnabled(this._data[this.index()]);
};

/**
 * 获取物品价格
 * Get item price
 * @param {Object} item - 物品对象 - Item object
 * @returns {number} 物品价格 - Item price
 */
Window_ShopBuy.prototype.price = function (item) {
	return this._price[this._data.indexOf(item)] || 0;
};

/**
 * 检查物品是否可购买
 * Check if item can be bought
 * @param {Object} item - 物品对象 - Item object
 * @returns {boolean} 是否可购买 - Whether can be bought
 */
Window_ShopBuy.prototype.isEnabled = function (item) {
	return item && this.price(item) <= this._money && !$gameParty.hasMaxItems(item);
};

/**
 * 刷新窗口
 * Refresh window
 */
Window_ShopBuy.prototype.refresh = function () {
	this.makeItemList();
	this.createContents();
	this.drawAllItems();
};

/**
 * 制作项目列表
 * Make item list
 */
Window_ShopBuy.prototype.makeItemList = function () {
	this._data = [];
	this._price = [];
	this._shopGoods.forEach(function (goods) {
		var item = null;
		switch (goods[0]) {
			case 0:
				item = $dataItems[goods[1]];
				break;
			case 1:
				item = $dataWeapons[goods[1]];
				break;
			case 2:
				item = $dataArmors[goods[1]];
				break;
		}
		if (item) {
			this._data.push(item);
			this._price.push(goods[2] === 0 ? item.price : goods[3]);
		}
	}, this);
};

/**
 * 绘制项目
 * Draw item
 * @param {number} index - 项目索引 - Item index
 */
Window_ShopBuy.prototype.drawItem = function (index) {
	var item = this._data[index];
	var rect = this.itemRect(index);
	var priceWidth = 96;
	rect.width -= this.textPadding();
	this.changePaintOpacity(this.isEnabled(item));
	this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
	this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, "right");
	this.changePaintOpacity(true);
};

/**
 * 设置状态窗口
 * Set status window
 * @param {Window_ShopStatus} statusWindow - 状态窗口对象 - Status window object
 */
Window_ShopBuy.prototype.setStatusWindow = function (statusWindow) {
	this._statusWindow = statusWindow;
	this.callUpdateHelp();
};

/**
 * 更新帮助信息
 * Update help information
 */
Window_ShopBuy.prototype.updateHelp = function () {
	this.setHelpWindowItem(this.item());
	if (this._statusWindow) {
		this._statusWindow.setItem(this.item());
	}
};
