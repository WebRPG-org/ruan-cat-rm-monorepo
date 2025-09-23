//=============================================================================
// Window_ScrollText.js
//=============================================================================

/**
 * 显示滚动文本的窗口，无边框显示，但为了方便起见作为窗口处理
 * Window for displaying scrolling text. No frame is displayed, but it is handled as a window for convenience
 * @class
 * @extends Window_Base
 */
function Window_ScrollText() {
	this.initialize.apply(this, arguments);
}

Window_ScrollText.prototype = Object.create(Window_Base.prototype);
Window_ScrollText.prototype.constructor = Window_ScrollText;

/**
 * 初始化滚动文本窗口
 * Initialize the scroll text window
 */
Window_ScrollText.prototype.initialize = function () {
	var width = Graphics.boxWidth;
	var height = Graphics.boxHeight;
	Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	this.opacity = 0;
	this.hide();
	this._text = "";
	this._allTextHeight = 0;
};

/**
 * 更新窗口
 * Update window
 */
Window_ScrollText.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	if ($gameMessage.scrollMode()) {
		if (this._text) {
			this.updateMessage();
		}
		if (!this._text && $gameMessage.hasText()) {
			this.startMessage();
		}
	}
};

/**
 * 开始显示消息
 * Start displaying message
 */
Window_ScrollText.prototype.startMessage = function () {
	this._text = $gameMessage.allText();
	this.refresh();
	this.show();
};

/**
 * 刷新窗口
 * Refresh window
 */
Window_ScrollText.prototype.refresh = function () {
	var textState = { index: 0 };
	textState.text = this.convertEscapeCharacters(this._text);
	this.resetFontSettings();
	this._allTextHeight = this.calcTextHeight(textState, true);
	this.createContents();
	this.origin.y = -this.height;
	this.drawTextEx(this._text, this.textPadding(), 1);
};

/**
 * 获取内容高度
 * Get contents height
 * @returns {number} 内容高度 - Contents height
 */
Window_ScrollText.prototype.contentsHeight = function () {
	return Math.max(this._allTextHeight, 1);
};

/**
 * 更新消息
 * Update message
 */
Window_ScrollText.prototype.updateMessage = function () {
	this.origin.y += this.scrollSpeed();
	if (this.origin.y >= this.contents.height) {
		this.terminateMessage();
	}
};

/**
 * 获取滚动速度
 * Get scroll speed
 * @returns {number} 滚动速度 - Scroll speed
 */
Window_ScrollText.prototype.scrollSpeed = function () {
	var speed = $gameMessage.scrollSpeed() / 2;
	if (this.isFastForward()) {
		speed *= this.fastForwardRate();
	}
	return speed;
};

/**
 * 检查是否快进
 * Check if fast forward
 * @returns {boolean} 是否快进 - Whether fast forward
 */
Window_ScrollText.prototype.isFastForward = function () {
	if ($gameMessage.scrollNoFast()) {
		return false;
	} else {
		return Input.isPressed("ok") || Input.isPressed("shift") || TouchInput.isPressed();
	}
};

/**
 * 获取快进倍率
 * Get fast forward rate
 * @returns {number} 快进倍率 - Fast forward rate
 */
Window_ScrollText.prototype.fastForwardRate = function () {
	return 3;
};

/**
 * 结束消息
 * Terminate message
 */
Window_ScrollText.prototype.terminateMessage = function () {
	this._text = null;
	$gameMessage.clear();
	this.hide();
};
