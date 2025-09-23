/**
 * 场景_商店
 * 商店画面的场景类。
 * Scene_Shop
 * The scene class of the shop screen.
 */

function Scene_Shop() {
	this.initialize.apply(this, arguments);
}

Scene_Shop.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Shop.prototype.constructor = Scene_Shop;

/**
 * 初始化
 * Initialize
 */
Scene_Shop.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * 准备
 * @param {Array} goods - 商品数组 - Goods array
 * @param {boolean} purchaseOnly - 仅购买标志 - Purchase only flag
 * Prepare
 */
Scene_Shop.prototype.prepare = function (goods, purchaseOnly) {
	this._goods = goods;
	this._purchaseOnly = purchaseOnly;
	this._item = null;
};

/**
 * 创建
 * Create
 */
Scene_Shop.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
	this.createHelpWindow();
	this.createGoldWindow();
	this.createCommandWindow();
	this.createDummyWindow();
	this.createNumberWindow();
	this.createStatusWindow();
	this.createBuyWindow();
	this.createCategoryWindow();
	this.createSellWindow();
};

/**
 * 创建金钱窗口
 * Create gold window
 */
Scene_Shop.prototype.createGoldWindow = function () {
	this._goldWindow = new Window_Gold(0, this._helpWindow.height);
	this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
	this.addWindow(this._goldWindow);
};

/**
 * 创建指令窗口
 * Create command window
 */
Scene_Shop.prototype.createCommandWindow = function () {
	this._commandWindow = new Window_ShopCommand(this._goldWindow.x, this._purchaseOnly);
	this._commandWindow.y = this._helpWindow.height;
	this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
	this._commandWindow.setHandler("sell", this.commandSell.bind(this));
	this._commandWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};

/**
 * 创建样品窗口
 * Create dummy window
 */
Scene_Shop.prototype.createDummyWindow = function () {
	var wy = this._commandWindow.y + this._commandWindow.height;
	var wh = Graphics.boxHeight - wy;
	this._dummyWindow = new Window_Base(0, wy, Graphics.boxWidth, wh);
	this.addWindow(this._dummyWindow);
};

/**
 * 创建数值窗口
 * Create number window
 */
Scene_Shop.prototype.createNumberWindow = function () {
	var wy = this._dummyWindow.y;
	var wh = this._dummyWindow.height;
	this._numberWindow = new Window_ShopNumber(0, wy, wh);
	this._numberWindow.hide();
	this._numberWindow.setHandler("ok", this.onNumberOk.bind(this));
	this._numberWindow.setHandler("cancel", this.onNumberCancel.bind(this));
	this.addWindow(this._numberWindow);
};

/**
 * 创建状态窗口
 * Create status window
 */
Scene_Shop.prototype.createStatusWindow = function () {
	var wx = this._numberWindow.width;
	var wy = this._dummyWindow.y;
	var ww = Graphics.boxWidth - wx;
	var wh = this._dummyWindow.height;
	this._statusWindow = new Window_ShopStatus(wx, wy, ww, wh);
	this._statusWindow.hide();
	this.addWindow(this._statusWindow);
};

/**
 * 创建购买窗口
 * Create buy window
 */
Scene_Shop.prototype.createBuyWindow = function () {
	var wy = this._dummyWindow.y;
	var wh = this._dummyWindow.height;
	this._buyWindow = new Window_ShopBuy(0, wy, wh, this._goods);
	this._buyWindow.setHelpWindow(this._helpWindow);
	this._buyWindow.setStatusWindow(this._statusWindow);
	this._buyWindow.hide();
	this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
	this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
	this.addWindow(this._buyWindow);
};

/**
 * 创建类型窗口
 * Create category window
 */
Scene_Shop.prototype.createCategoryWindow = function () {
	this._categoryWindow = new Window_ItemCategory();
	this._categoryWindow.setHelpWindow(this._helpWindow);
	this._categoryWindow.y = this._dummyWindow.y;
	this._categoryWindow.hide();
	this._categoryWindow.deactivate();
	this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
	this.addWindow(this._categoryWindow);
};

/**
 * 创建出售窗口
 * Create sell window
 */
Scene_Shop.prototype.createSellWindow = function () {
	var wy = this._categoryWindow.y + this._categoryWindow.height;
	var wh = Graphics.boxHeight - wy;
	this._sellWindow = new Window_ShopSell(0, wy, Graphics.boxWidth, wh);
	this._sellWindow.setHelpWindow(this._helpWindow);
	this._sellWindow.hide();
	this._sellWindow.setHandler("ok", this.onSellOk.bind(this));
	this._sellWindow.setHandler("cancel", this.onSellCancel.bind(this));
	this._categoryWindow.setItemWindow(this._sellWindow);
	this.addWindow(this._sellWindow);
};

/**
 * 激活购买窗口
 * Activate buy window
 */
Scene_Shop.prototype.activateBuyWindow = function () {
	this._buyWindow.setMoney(this.money());
	this._buyWindow.show();
	this._buyWindow.activate();
	this._statusWindow.show();
};

/**
 * 激活出售窗口
 * Activate sell window
 */
Scene_Shop.prototype.activateSellWindow = function () {
	this._categoryWindow.show();
	this._sellWindow.refresh();
	this._sellWindow.show();
	this._sellWindow.activate();
	this._statusWindow.hide();
};

/**
 * 购买的指令
 * Command buy
 */
Scene_Shop.prototype.commandBuy = function () {
	this._dummyWindow.hide();
	this.activateBuyWindow();
};

/**
 * 出售的指令
 * Command sell
 */
Scene_Shop.prototype.commandSell = function () {
	this._dummyWindow.hide();
	this._categoryWindow.show();
	this._categoryWindow.activate();
	this._sellWindow.show();
	this._sellWindow.deselect();
	this._sellWindow.refresh();
};

/**
 * 当购买确定
 * When buy ok
 */
Scene_Shop.prototype.onBuyOk = function () {
	this._item = this._buyWindow.item();
	this._buyWindow.hide();
	this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
	this._numberWindow.setCurrencyUnit(this.currencyUnit());
	this._numberWindow.show();
	this._numberWindow.activate();
};

/**
 * 当购买取消
 * When buy cancel
 */
Scene_Shop.prototype.onBuyCancel = function () {
	this._commandWindow.activate();
	this._dummyWindow.show();
	this._buyWindow.hide();
	this._statusWindow.hide();
	this._statusWindow.setItem(null);
	this._helpWindow.clear();
};

/**
 * 当类型确定
 * When category ok
 */
Scene_Shop.prototype.onCategoryOk = function () {
	this.activateSellWindow();
	this._sellWindow.select(0);
};

/**
 * 当类型取消
 * When category cancel
 */
Scene_Shop.prototype.onCategoryCancel = function () {
	this._commandWindow.activate();
	this._dummyWindow.show();
	this._categoryWindow.hide();
	this._sellWindow.hide();
};

/**
 * 当出售确定
 * When sell ok
 */
Scene_Shop.prototype.onSellOk = function () {
	this._item = this._sellWindow.item();
	this._categoryWindow.hide();
	this._sellWindow.hide();
	this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
	this._numberWindow.setCurrencyUnit(this.currencyUnit());
	this._numberWindow.show();
	this._numberWindow.activate();
	this._statusWindow.setItem(this._item);
	this._statusWindow.show();
};

/**
 * 当出售取消
 * When sell cancel
 */
Scene_Shop.prototype.onSellCancel = function () {
	this._sellWindow.deselect();
	this._categoryWindow.activate();
	this._statusWindow.setItem(null);
	this._helpWindow.clear();
};

/**
 * 当数值确定
 * When number ok
 */
Scene_Shop.prototype.onNumberOk = function () {
	SoundManager.playShop();
	switch (this._commandWindow.currentSymbol()) {
		case "buy":
			this.doBuy(this._numberWindow.number());
			break;
		case "sell":
			this.doSell(this._numberWindow.number());
			break;
	}
	this.endNumberInput();
	this._goldWindow.refresh();
	this._statusWindow.refresh();
};

/**
 * 当数值取消
 * When number cancel
 */
Scene_Shop.prototype.onNumberCancel = function () {
	SoundManager.playCancel();
	this.endNumberInput();
};

/**
 * 进行购买
 * @param {number} number - 数量 - Number
 * Do buy
 */
Scene_Shop.prototype.doBuy = function (number) {
	$gameParty.loseGold(number * this.buyingPrice());
	$gameParty.gainItem(this._item, number);
};

/**
 * 进行出售
 * @param {number} number - 数量 - Number
 * Do sell
 */
Scene_Shop.prototype.doSell = function (number) {
	$gameParty.gainGold(number * this.sellingPrice());
	$gameParty.loseItem(this._item, number);
};

/**
 * 结束数值输入
 * End number input
 */
Scene_Shop.prototype.endNumberInput = function () {
	this._numberWindow.hide();
	switch (this._commandWindow.currentSymbol()) {
		case "buy":
			this.activateBuyWindow();
			break;
		case "sell":
			this.activateSellWindow();
			break;
	}
};

/**
 * 最多购买数
 * @returns {number} 最大购买数量 - Maximum buy number
 * Max buy
 */
Scene_Shop.prototype.maxBuy = function () {
	var max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item);
	var price = this.buyingPrice();
	if (price > 0) {
		return Math.min(max, Math.floor(this.money() / price));
	} else {
		return max;
	}
};

/**
 * 最多出售数
 * @returns {number} 最大出售数量 - Maximum sell number
 * Max sell
 */
Scene_Shop.prototype.maxSell = function () {
	return $gameParty.numItems(this._item);
};

/**
 * 金钱
 * @returns {number} 金钱数量 - Money amount
 * Money
 */
Scene_Shop.prototype.money = function () {
	return this._goldWindow.value();
};

/**
 * 货币单位
 * @returns {string} 货币单位 - Currency unit
 * Currency unit
 */
Scene_Shop.prototype.currencyUnit = function () {
	return this._goldWindow.currencyUnit();
};

/**
 * 购买价格
 * @returns {number} 购买价格 - Buying price
 * Buying price
 */
Scene_Shop.prototype.buyingPrice = function () {
	return this._buyWindow.price(this._item);
};

/**
 * 出售价格
 * @returns {number} 出售价格 - Selling price
 * Selling price
 */
Scene_Shop.prototype.sellingPrice = function () {
	return Math.floor(this._item.price / 2);
};

//-----------------------------------------------------------------------------
