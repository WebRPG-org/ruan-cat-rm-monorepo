//=============================================================================
// Window_ChoiceList.js
//=============================================================================

//-----------------------------------------------------------------------------
// 窗口_选项列表
// Window_ChoiceList
//
// 用于事件指令[显示选项]的窗口。
// The window used for the event command [Show Choices].

function Window_ChoiceList() {
	this.initialize.apply(this, arguments);
}

Window_ChoiceList.prototype = Object.create(Window_Command.prototype);
Window_ChoiceList.prototype.constructor = Window_ChoiceList;

/**
 * 初始化
 * @param {Window_Message} messageWindow - 消息窗口对象 - Message window object
 * Initialize
 */
Window_ChoiceList.prototype.initialize = function (messageWindow) {
	this._messageWindow = messageWindow;
	Window_Command.prototype.initialize.call(this, 0, 0);
	this.openness = 0;
	this.deactivate();
	this._background = 0;
};

/**
 * 开始
 * Start
 */
Window_ChoiceList.prototype.start = function () {
	this.updatePlacement();
	this.updateBackground();
	this.refresh();
	this.selectDefault();
	this.open();
	this.activate();
};

/**
 * 选择默认
 * Select default
 */
Window_ChoiceList.prototype.selectDefault = function () {
	this.select($gameMessage.choiceDefaultType());
};

/**
 * 更新位置
 * Update placement
 */
Window_ChoiceList.prototype.updatePlacement = function () {
	var positionType = $gameMessage.choicePositionType();
	var messageY = this._messageWindow.y;
	this.width = this.windowWidth();
	this.height = this.windowHeight();
	switch (positionType) {
		case 0:
			this.x = 0;
			break;
		case 1:
			this.x = (Graphics.boxWidth - this.width) / 2;
			break;
		case 2:
			this.x = Graphics.boxWidth - this.width;
			break;
	}
	if (messageY >= Graphics.boxHeight / 2) {
		this.y = messageY - this.height;
	} else {
		this.y = messageY + this._messageWindow.height;
	}
};

/**
 * 更新背景
 * Update background
 */
Window_ChoiceList.prototype.updateBackground = function () {
	this._background = $gameMessage.choiceBackground();
	this.setBackgroundType(this._background);
};

/**
 * 窗口宽度
 * @returns {number} 窗口宽度 - Window width
 * Window width
 */
Window_ChoiceList.prototype.windowWidth = function () {
	var width = this.maxChoiceWidth() + this.padding * 2;
	return Math.min(width, Graphics.boxWidth);
};

/**
 * 可见的行数
 * @returns {number} 可见行数 - Number of visible rows
 * Number of visible rows
 */
Window_ChoiceList.prototype.numVisibleRows = function () {
	var messageY = this._messageWindow.y;
	var messageHeight = this._messageWindow.height;
	var centerY = Graphics.boxHeight / 2;
	var choices = $gameMessage.choices();
	var numLines = choices.length;
	var maxLines = 8;
	if (messageY < centerY && messageY + messageHeight > centerY) {
		maxLines = 4;
	}
	if (numLines > maxLines) {
		numLines = maxLines;
	}
	return numLines;
};

/**
 * 最大选项宽度
 * @returns {number} 最大选项宽度 - Maximum choice width
 * Maximum choice width
 */
Window_ChoiceList.prototype.maxChoiceWidth = function () {
	var maxWidth = 96;
	var choices = $gameMessage.choices();
	for (var i = 0; i < choices.length; i++) {
		var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
		if (maxWidth < choiceWidth) {
			maxWidth = choiceWidth;
		}
	}
	return maxWidth;
};

/**
 * 文本宽扩展
 * @param {string} text - 文本内容 - Text content
 * @returns {number} 文本宽度 - Text width
 * Text width extended
 */
Window_ChoiceList.prototype.textWidthEx = function (text) {
	return this.drawTextEx(text, 0, this.contents.height);
};

/**
 * 内容高度
 * @returns {number} 内容高度 - Contents height
 * Contents height
 */
Window_ChoiceList.prototype.contentsHeight = function () {
	return this.maxItems() * this.itemHeight();
};

/**
 * 制作指令列表
 * Make command list
 */
Window_ChoiceList.prototype.makeCommandList = function () {
	var choices = $gameMessage.choices();
	for (var i = 0; i < choices.length; i++) {
		this.addCommand(choices[i], "choice");
	}
};

/**
 * 绘制项目
 * @param {number} index - 索引 - Index
 * Draw item
 */
Window_ChoiceList.prototype.drawItem = function (index) {
	var rect = this.itemRectForText(index);
	this.drawTextEx(this.commandName(index), rect.x, rect.y);
};

/**
 * 是否取消启用
 * @returns {boolean} 是否取消启用 - Whether cancel is enabled
 * Is cancel enabled
 */
Window_ChoiceList.prototype.isCancelEnabled = function () {
	return $gameMessage.choiceCancelType() !== -1;
};

/**
 * 是否确定触发
 * @returns {boolean} 是否确定触发 - Whether ok is triggered
 * Is ok triggered
 */
Window_ChoiceList.prototype.isOkTriggered = function () {
	return Input.isTriggered("ok");
};

/**
 * 呼叫确定处理者
 * Call ok handler
 */
Window_ChoiceList.prototype.callOkHandler = function () {
	$gameMessage.onChoice(this.index());
	this._messageWindow.terminateMessage();
	this.close();
};

/**
 * 呼叫取消处理者
 * Call cancel handler
 */
Window_ChoiceList.prototype.callCancelHandler = function () {
	$gameMessage.onChoice($gameMessage.choiceCancelType());
	this._messageWindow.terminateMessage();
	this.close();
};
