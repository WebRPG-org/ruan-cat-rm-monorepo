//=============================================================================
// Window_NumberInput.js
//=============================================================================

/**
 * 数值输入窗口类，用于事件指令[数值输入处理]
 * Window for inputting numbers, used for the event command [Input Number]
 * @class
 * @extends Window_Selectable
 */
function Window_NumberInput() {
	this.initialize.apply(this, arguments);
}

Window_NumberInput.prototype = Object.create(Window_Selectable.prototype);
Window_NumberInput.prototype.constructor = Window_NumberInput;

/**
 * 初始化数值输入窗口
 * Initialize the number input window
 * @param {Window_Message} messageWindow - 消息窗口对象 - The message window object
 */
Window_NumberInput.prototype.initialize = function (messageWindow) {
	this._messageWindow = messageWindow;
	Window_Selectable.prototype.initialize.call(this, 0, 0, 0, 0);
	this._number = 0;
	this._maxDigits = 1;
	this.openness = 0;
	this.createButtons();
	this.deactivate();
};

/**
 * 开始数值输入
 * Start number input
 */
Window_NumberInput.prototype.start = function () {
	this._maxDigits = $gameMessage.numInputMaxDigits();
	this._number = $gameVariables.value($gameMessage.numInputVariableId());
	this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
	this.updatePlacement();
	this.placeButtons();
	this.updateButtonsVisiblity();
	this.createContents();
	this.refresh();
	this.open();
	this.activate();
	this.select(0);
};

/**
 * 更新窗口位置
 * Update window placement
 */
Window_NumberInput.prototype.updatePlacement = function () {
	var messageY = this._messageWindow.y;
	var spacing = 8;
	this.width = this.windowWidth();
	this.height = this.windowHeight();
	this.x = (Graphics.boxWidth - this.width) / 2;
	if (messageY >= Graphics.boxHeight / 2) {
		this.y = messageY - this.height - spacing;
	} else {
		this.y = messageY + this._messageWindow.height + spacing;
	}
};

/**
 * 获取窗口宽度
 * Get window width
 * @returns {number} 窗口宽度 - Window width
 */
Window_NumberInput.prototype.windowWidth = function () {
	return this.maxCols() * this.itemWidth() + this.padding * 2;
};

/**
 * 获取窗口高度
 * Get window height
 * @returns {number} 窗口高度 - Window height
 */
Window_NumberInput.prototype.windowHeight = function () {
	return this.fittingHeight(1);
};

/**
 * 获取最大列数
 * Get maximum number of columns
 * @returns {number} 最大列数 - Maximum number of columns
 */
Window_NumberInput.prototype.maxCols = function () {
	return this._maxDigits;
};

/**
 * 获取最大项目数
 * Get maximum number of items
 * @returns {number} 最大项目数 - Maximum number of items
 */
Window_NumberInput.prototype.maxItems = function () {
	return this._maxDigits;
};

/**
 * 获取项目间距
 * Get item spacing
 * @returns {number} 项目间距 - Item spacing
 */
Window_NumberInput.prototype.spacing = function () {
	return 0;
};

/**
 * 获取项目宽度
 * Get item width
 * @returns {number} 项目宽度 - Item width
 */
Window_NumberInput.prototype.itemWidth = function () {
	return 32;
};

/**
 * 创建按钮
 * Create buttons
 */
Window_NumberInput.prototype.createButtons = function () {
	var bitmap = ImageManager.loadSystem("ButtonSet");
	var buttonWidth = 48;
	var buttonHeight = 48;
	this._buttons = [];
	for (var i = 0; i < 3; i++) {
		var button = new Sprite_Button();
		var x = buttonWidth * [1, 2, 4][i];
		var w = buttonWidth * (i === 2 ? 2 : 1);
		button.bitmap = bitmap;
		button.setColdFrame(x, 0, w, buttonHeight);
		button.setHotFrame(x, buttonHeight, w, buttonHeight);
		button.visible = false;
		this._buttons.push(button);
		this.addChild(button);
	}
	this._buttons[0].setClickHandler(this.onButtonDown.bind(this));
	this._buttons[1].setClickHandler(this.onButtonUp.bind(this));
	this._buttons[2].setClickHandler(this.onButtonOk.bind(this));
};

/**
 * 放置按钮
 * Place buttons
 */
Window_NumberInput.prototype.placeButtons = function () {
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
 * 更新按钮可见性
 * Update button visibility
 */
Window_NumberInput.prototype.updateButtonsVisiblity = function () {
	if (TouchInput.date > Input.date) {
		this.showButtons();
	} else {
		this.hideButtons();
	}
};

/**
 * 显示按钮
 * Show buttons
 */
Window_NumberInput.prototype.showButtons = function () {
	for (var i = 0; i < this._buttons.length; i++) {
		this._buttons[i].visible = true;
	}
};

/**
 * 隐藏按钮
 * Hide buttons
 */
Window_NumberInput.prototype.hideButtons = function () {
	for (var i = 0; i < this._buttons.length; i++) {
		this._buttons[i].visible = false;
	}
};

/**
 * 获取按钮的Y坐标
 * Get button Y coordinate
 * @returns {number} 按钮的Y坐标 - Button Y coordinate
 */
Window_NumberInput.prototype.buttonY = function () {
	var spacing = 8;
	if (this._messageWindow.y >= Graphics.boxHeight / 2) {
		return 0 - this._buttons[0].height - spacing;
	} else {
		return this.height + spacing;
	}
};

/**
 * 更新窗口
 * Update window
 */
Window_NumberInput.prototype.update = function () {
	Window_Selectable.prototype.update.call(this);
	this.processDigitChange();
};

/**
 * 处理数字改变
 * Process digit change
 */
Window_NumberInput.prototype.processDigitChange = function () {
	if (this.isOpenAndActive()) {
		if (Input.isRepeated("up")) {
			this.changeDigit(true);
		} else if (Input.isRepeated("down")) {
			this.changeDigit(false);
		}
	}
};

/**
 * 改变数字
 * Change digit
 * @param {boolean} up - 是否向上增加 - Whether to increase upward
 */
Window_NumberInput.prototype.changeDigit = function (up) {
	var index = this.index();
	var place = Math.pow(10, this._maxDigits - 1 - index);
	var n = Math.floor(this._number / place) % 10;
	this._number -= n * place;
	if (up) {
		n = (n + 1) % 10;
	} else {
		n = (n + 9) % 10;
	}
	this._number += n * place;
	this.refresh();
	SoundManager.playCursor();
};

/**
 * 检查触摸确定是否启用
 * Check if touch OK is enabled
 * @returns {boolean} 触摸确定是否启用 - Whether touch OK is enabled
 */
Window_NumberInput.prototype.isTouchOkEnabled = function () {
	return false;
};

/**
 * 检查确定是否启用
 * Check if OK is enabled
 * @returns {boolean} 确定是否启用 - Whether OK is enabled
 */
Window_NumberInput.prototype.isOkEnabled = function () {
	return true;
};

/**
 * 检查取消是否启用
 * Check if cancel is enabled
 * @returns {boolean} 取消是否启用 - Whether cancel is enabled
 */
Window_NumberInput.prototype.isCancelEnabled = function () {
	return false;
};

/**
 * 检查确定是否被触发
 * Check if OK is triggered
 * @returns {boolean} 确定是否被触发 - Whether OK is triggered
 */
Window_NumberInput.prototype.isOkTriggered = function () {
	return Input.isTriggered("ok");
};

/**
 * 处理确定操作
 * Process OK operation
 */
Window_NumberInput.prototype.processOk = function () {
	SoundManager.playOk();
	$gameVariables.setValue($gameMessage.numInputVariableId(), this._number);
	this._messageWindow.terminateMessage();
	this.updateInputData();
	this.deactivate();
	this.close();
};

/**
 * 绘制项目
 * Draw item
 * @param {number} index - 项目索引 - Item index
 */
Window_NumberInput.prototype.drawItem = function (index) {
	var rect = this.itemRect(index);
	var align = "center";
	var s = this._number.padZero(this._maxDigits);
	var c = s.slice(index, index + 1);
	this.resetTextColor();
	this.drawText(c, rect.x, rect.y, rect.width, align);
};

/**
 * 当向上按钮被按下时
 * When up button is pressed
 */
Window_NumberInput.prototype.onButtonUp = function () {
	this.changeDigit(true);
};

/**
 * 当向下按钮被按下时
 * When down button is pressed
 */
Window_NumberInput.prototype.onButtonDown = function () {
	this.changeDigit(false);
};

/**
 * 当确定按钮被按下时
 * When OK button is pressed
 */
Window_NumberInput.prototype.onButtonOk = function () {
	this.processOk();
	this.hideButtons();
};
