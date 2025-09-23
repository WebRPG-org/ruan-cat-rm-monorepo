//=============================================================================
// Window_ShopNumber.js
//=============================================================================

/**
 * 窗口_商店数值
 *
 * 在商店画面上的输入要买卖的商品数量的窗口。
 * The window for inputting quantity of items to buy or sell on the shop
 * screen.
 *
 * @class Window_ShopNumber
 * @extends Window_Selectable
 */
function Window_ShopNumber() {
	this.initialize.apply(this, arguments);
}

Window_ShopNumber.prototype = Object.create(Window_Selectable.prototype);
Window_ShopNumber.prototype.constructor = Window_ShopNumber;

/**
 * 初始化窗口。
 * Initialize the window.
 *
 * @param {number} x - 窗口的 X 坐标
 * @param {number} y - 窗口的 Y 坐标
 * @param {number} height - 窗口的高度
 * @returns {void}
 */
Window_ShopNumber.prototype.initialize = function (x, y, height) {
	var width = this.windowWidth();
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._item = null;
	this._max = 1;
	this._price = 0;
	this._number = 1;
	this._currencyUnit = TextManager.currencyUnit;
	this.createButtons();
};

/**
 * 获取窗口宽度。
 * Get the window width.
 *
 * @returns {number} 窗口宽度
 */
Window_ShopNumber.prototype.windowWidth = function () {
	return 456;
};

/**
 * 获取当前数值。
 * Get the current number.
 *
 * @returns {number} 当前数值
 */
Window_ShopNumber.prototype.number = function () {
	return this._number;
};

/**
 * 设置商品信息。
 * Set up the item information.
 *
 * @param {RPG.BaseItem} item - 商品对象
 * @param {number} max - 最大数量
 * @param {number} price - 单价
 * @returns {void}
 */
Window_ShopNumber.prototype.setup = function (item, max, price) {
	this._item = item;
	this._max = Math.floor(max);
	this._price = price;
	this._number = 1;
	this.placeButtons();
	this.updateButtonsVisiblity();
	this.refresh();
};

/**
 * 设置货币单位。
 * Set the currency unit.
 *
 * @param {string} currencyUnit - 货币单位
 * @returns {void}
 */
Window_ShopNumber.prototype.setCurrencyUnit = function (currencyUnit) {
	this._currencyUnit = currencyUnit;
	this.refresh();
};

/**
 * 创建按钮。
 * Create the buttons.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.createButtons = function () {
	var bitmap = ImageManager.loadSystem("ButtonSet");
	var buttonWidth = 48;
	var buttonHeight = 48;
	this._buttons = [];
	for (var i = 0; i < 5; i++) {
		var button = new Sprite_Button();
		var x = buttonWidth * i;
		var w = buttonWidth * (i === 4 ? 2 : 1);
		button.bitmap = bitmap;
		button.setColdFrame(x, 0, w, buttonHeight);
		button.setHotFrame(x, buttonHeight, w, buttonHeight);
		button.visible = false;
		this._buttons.push(button);
		this.addChild(button);
	}
	this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
	this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
	this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
	this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
	this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
};

/**
 * 放置按钮。
 * Place the buttons.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.placeButtons = function () {
	var numButtons = this._buttons.length;
	var spacing = 16;
	var totalWidth = -spacing;
	for (var i = 0; i < numButtons; i++) {
		totalWidth += this._buttons[i].width + spacing;
	}
	var x = (this.width - totalWidth) / 2;
	for (var j = 0; j < numButtons; j++) {
		var button = this._buttons[j];
		button.x = x;
		button.y = this.buttonY();
		x += button.width + spacing;
	}
};

/**
 * 更新按钮可见性。
 * Update button visibility.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.updateButtonsVisiblity = function () {
	if (TouchInput.date > Input.date) {
		this.showButtons();
	} else {
		this.hideButtons();
	}
};

/**
 * 显示按钮。
 * Show the buttons.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.showButtons = function () {
	for (var i = 0; i < this._buttons.length; i++) {
		this._buttons[i].visible = true;
	}
};

/**
 * 隐藏按钮。
 * Hide the buttons.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.hideButtons = function () {
	for (var i = 0; i < this._buttons.length; i++) {
		this._buttons[i].visible = false;
	}
};

/**
 * 刷新窗口内容。
 * Refresh the window contents.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.refresh = function () {
	this.contents.clear();
	this.drawItemName(this._item, 0, this.itemY());
	this.drawMultiplicationSign();
	this.drawNumber();
	this.drawTotalPrice();
};

/**
 * 绘制乘号。
 * Draw the multiplication sign.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.drawMultiplicationSign = function () {
	var sign = "\u00d7";
	var width = this.textWidth(sign);
	var x = this.cursorX() - width * 2;
	var y = this.itemY();
	this.resetTextColor();
	this.drawText(sign, x, y, width);
};

/**
 * 绘制数值。
 * Draw the number.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.drawNumber = function () {
	var x = this.cursorX();
	var y = this.itemY();
	var width = this.cursorWidth() - this.textPadding();
	this.resetTextColor();
	this.drawText(this._number, x, y, width, "right");
};

/**
 * 绘制总价。
 * Draw the total price.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.drawTotalPrice = function () {
	var total = this._price * this._number;
	var width = this.contentsWidth() - this.textPadding();
	this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY(), width);
};

/**
 * 获取项目的 Y 坐标。
 * Get the Y coordinate of the item.
 *
 * @returns {number} 项目 Y 坐标
 */
Window_ShopNumber.prototype.itemY = function () {
	return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 1.5);
};

/**
 * 获取价格的 Y 坐标。
 * Get the Y coordinate of the price.
 *
 * @returns {number} 价格 Y 坐标
 */
Window_ShopNumber.prototype.priceY = function () {
	return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2);
};

/**
 * 获取按钮的 Y 坐标。
 * Get the Y coordinate of the buttons.
 *
 * @returns {number} 按钮 Y 坐标
 */
Window_ShopNumber.prototype.buttonY = function () {
	return Math.round(this.priceY() + this.lineHeight() * 2.5);
};

/**
 * 获取光标宽度。
 * Get the cursor width.
 *
 * @returns {number} 光标宽度
 */
Window_ShopNumber.prototype.cursorWidth = function () {
	var digitWidth = this.textWidth("0");
	return this.maxDigits() * digitWidth + this.textPadding() * 2;
};

/**
 * 获取光标的 X 坐标。
 * Get the X coordinate of the cursor.
 *
 * @returns {number} 光标 X 坐标
 */
Window_ShopNumber.prototype.cursorX = function () {
	return this.contentsWidth() - this.cursorWidth() - this.textPadding();
};

/**
 * 获取最大位数。
 * Get the maximum number of digits.
 *
 * @returns {number} 最大位数
 */
Window_ShopNumber.prototype.maxDigits = function () {
	return 2;
};

/**
 * 更新窗口。
 * Update the window.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.update = function () {
	Window_Selectable.prototype.update.call(this);
	this.processNumberChange();
};

/**
 * 检查是否触发确定操作。
 * Check if the OK operation is triggered.
 *
 * @returns {boolean} 是否触发确定操作
 */
Window_ShopNumber.prototype.isOkTriggered = function () {
	return Input.isTriggered("ok");
};

/**
 * 播放确定声音（空实现）。
 * Play the OK sound (empty implementation).
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.playOkSound = function () {};

/**
 * 处理数值改变。
 * Process number changes.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.processNumberChange = function () {
	if (this.isOpenAndActive()) {
		if (Input.isRepeated("right")) {
			this.changeNumber(1);
		}
		if (Input.isRepeated("left")) {
			this.changeNumber(-1);
		}
		if (Input.isRepeated("up")) {
			this.changeNumber(10);
		}
		if (Input.isRepeated("down")) {
			this.changeNumber(-10);
		}
	}
};

/**
 * 改变数值。
 * Change the number.
 *
 * @param {number} amount - 改变量
 * @returns {void}
 */
Window_ShopNumber.prototype.changeNumber = function (amount) {
	var lastNumber = this._number;
	this._number = (this._number + amount).clamp(1, this._max);
	if (this._number !== lastNumber) {
		SoundManager.playCursor();
		this.refresh();
	}
};

/**
 * 更新光标位置。
 * Update the cursor position.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.updateCursor = function () {
	this.setCursorRect(this.cursorX(), this.itemY(), this.cursorWidth(), this.lineHeight());
};

/**
 * 当向上按钮点击时的处理函数。
 * Handler for when the up button is clicked.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.onButtonUp = function () {
	this.changeNumber(1);
};

/**
 * 当向上按钮（+10）点击时的处理函数。
 * Handler for when the up button (+10) is clicked.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.onButtonUp2 = function () {
	this.changeNumber(10);
};

/**
 * 当向下按钮点击时的处理函数。
 * Handler for when the down button is clicked.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.onButtonDown = function () {
	this.changeNumber(-1);
};

/**
 * 当向下按钮（-10）点击时的处理函数。
 * Handler for when the down button (-10) is clicked.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.onButtonDown2 = function () {
	this.changeNumber(-10);
};

/**
 * 当确定按钮点击时的处理函数。
 * Handler for when the OK button is clicked.
 *
 * @returns {void}
 */
Window_ShopNumber.prototype.onButtonOk = function () {
	this.processOk();
};
