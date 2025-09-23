//=============================================================================
// Window_Message.js
//=============================================================================

//-----------------------------------------------------------------------------
// 窗口_信息
// Window_Message
//
// 显示文本信息的窗口。
// The window for displaying text messages.

function Window_Message() {
	this.initialize.apply(this, arguments);
}

Window_Message.prototype = Object.create(Window_Base.prototype);
Window_Message.prototype.constructor = Window_Message;

/**
 * 初始化
 * Initialize
 */
Window_Message.prototype.initialize = function () {
	var width = this.windowWidth();
	var height = this.windowHeight();
	var x = (Graphics.boxWidth - width) / 2;
	Window_Base.prototype.initialize.call(this, x, 0, width, height);
	this.openness = 0;
	this.initMembers();
	this.createSubWindows();
	this.updatePlacement();
};

/**
 * 初始化成员
 * Initialize members
 */
Window_Message.prototype.initMembers = function () {
	this._imageReservationId = Utils.generateRuntimeId();
	this._background = 0;
	this._positionType = 2;
	this._waitCount = 0;
	this._faceBitmap = null;
	this._textState = null;
	this.clearFlags();
};

/**
 * 子窗口
 * @returns {Array<Window_Base>} 子窗口数组 - Sub windows array
 * Sub windows
 */
Window_Message.prototype.subWindows = function () {
	return [this._goldWindow, this._choiceWindow, this._numberWindow, this._itemWindow];
};

/**
 * 创建子窗口
 * Create sub windows
 */
Window_Message.prototype.createSubWindows = function () {
	this._goldWindow = new Window_Gold(0, 0);
	this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
	this._goldWindow.openness = 0;
	this._choiceWindow = new Window_ChoiceList(this);
	this._numberWindow = new Window_NumberInput(this);
	this._itemWindow = new Window_EventItem(this);
};

/**
 * 窗口宽度
 * @returns {number} 窗口宽度 - Window width
 * Window width
 */
Window_Message.prototype.windowWidth = function () {
	return Graphics.boxWidth;
};

/**
 * 窗口高度
 * @returns {number} 窗口高度 - Window height
 * Window height
 */
Window_Message.prototype.windowHeight = function () {
	return this.fittingHeight(this.numVisibleRows());
};

/**
 * 清除标志
 * Clear flags
 */
Window_Message.prototype.clearFlags = function () {
	this._showFast = false;
	this._lineShowFast = false;
	this._pauseSkip = false;
};

/**
 * 可见的行数
 * @returns {number} 可见行数 - Number of visible rows
 * Number of visible rows
 */
Window_Message.prototype.numVisibleRows = function () {
	return 4;
};

/**
 * 更新
 * Update
 */
Window_Message.prototype.update = function () {
	this.checkToNotClose();
	Window_Base.prototype.update.call(this);
	while (!this.isOpening() && !this.isClosing()) {
		if (this.updateWait()) {
			return;
		} else if (this.updateLoading()) {
			return;
		} else if (this.updateInput()) {
			return;
		} else if (this.updateMessage()) {
			return;
		} else if (this.canStart()) {
			this.startMessage();
		} else {
			this.startInput();
			return;
		}
	}
};

/**
 * 检测不关闭
 * Check to not close
 */
Window_Message.prototype.checkToNotClose = function () {
	if (this.isClosing() && this.isOpen()) {
		if (this.doesContinue()) {
			this.open();
		}
	}
};

/**
 * 是否能开始
 * @returns {boolean} 是否能开始 - Whether can start
 * Can start
 */
Window_Message.prototype.canStart = function () {
	return $gameMessage.hasText() && !$gameMessage.scrollMode();
};

/**
 * 开始信息
 * Start message
 */
Window_Message.prototype.startMessage = function () {
	this._textState = {};
	this._textState.index = 0;
	this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
	this.newPage(this._textState);
	this.updatePlacement();
	this.updateBackground();
	this.open();
};

/**
 * 更新位置
 * Update placement
 */
Window_Message.prototype.updatePlacement = function () {
	this._positionType = $gameMessage.positionType();
	this.y = (this._positionType * (Graphics.boxHeight - this.height)) / 2;
	this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
};

/**
 * 更新背景
 * Update background
 */
Window_Message.prototype.updateBackground = function () {
	this._background = $gameMessage.background();
	this.setBackgroundType(this._background);
};

/**
 * 结束信息
 * Terminate message
 */
Window_Message.prototype.terminateMessage = function () {
	this.close();
	this._goldWindow.close();
	$gameMessage.clear();
};

/**
 * 更新等待
 * @returns {boolean} 是否在等待 - Whether waiting
 * Update wait
 */
Window_Message.prototype.updateWait = function () {
	if (this._waitCount > 0) {
		this._waitCount--;
		return true;
	} else {
		return false;
	}
};

/**
 * 更新加载中
 * @returns {boolean} 是否在加载中 - Whether loading
 * Update loading
 */
Window_Message.prototype.updateLoading = function () {
	if (this._faceBitmap) {
		if (this._faceBitmap.isReady()) {
			this.drawMessageFace();
			this._faceBitmap = null;
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
};

/**
 * 更新输入
 * @returns {boolean} 是否在输入中 - Whether inputting
 * Update input
 */
Window_Message.prototype.updateInput = function () {
	if (this.isAnySubWindowActive()) {
		return true;
	}
	if (this.pause) {
		if (this.isTriggered()) {
			Input.update();
			this.pause = false;
			if (!this._textState) {
				this.terminateMessage();
			}
		}
		return true;
	}
	return false;
};

/**
 * 是否有任何子窗口处于活动状态
 * @returns {boolean} 是否有子窗口活动 - Whether any sub window is active
 * Is any sub window active
 */
Window_Message.prototype.isAnySubWindowActive = function () {
	return this._choiceWindow.active || this._numberWindow.active || this._itemWindow.active;
};

/**
 * 更新信息
 * @returns {boolean} 是否在更新信息 - Whether updating message
 * Update message
 */
Window_Message.prototype.updateMessage = function () {
	if (this._textState) {
		while (!this.isEndOfText(this._textState)) {
			if (this.needsNewPage(this._textState)) {
				this.newPage(this._textState);
			}
			this.updateShowFast();
			this.processCharacter(this._textState);
			if (!this._showFast && !this._lineShowFast) {
				break;
			}
			if (this.pause || this._waitCount > 0) {
				break;
			}
		}
		if (this.isEndOfText(this._textState)) {
			this.onEndOfText();
		}
		return true;
	} else {
		return false;
	}
};

/**
 * 当文本结束
 * On end of text
 */
Window_Message.prototype.onEndOfText = function () {
	if (!this.startInput()) {
		if (!this._pauseSkip) {
			this.startPause();
		} else {
			this.terminateMessage();
		}
	}
	this._textState = null;
};

/**
 * 开始输入
 * @returns {boolean} 是否开始输入 - Whether started input
 * Start input
 */
Window_Message.prototype.startInput = function () {
	if ($gameMessage.isChoice()) {
		this._choiceWindow.start();
		return true;
	} else if ($gameMessage.isNumberInput()) {
		this._numberWindow.start();
		return true;
	} else if ($gameMessage.isItemChoice()) {
		this._itemWindow.start();
		return true;
	} else {
		return false;
	}
};

/**
 * 是否触发
 * @returns {boolean} 是否触发 - Whether triggered
 * Is triggered
 */
Window_Message.prototype.isTriggered = function () {
	return Input.isRepeated("ok") || Input.isRepeated("cancel") || TouchInput.isRepeated();
};

/**
 * 是否继续
 * @returns {boolean} 是否继续 - Whether continues
 * Does continue
 */
Window_Message.prototype.doesContinue = function () {
	return $gameMessage.hasText() && !$gameMessage.scrollMode() && !this.areSettingsChanged();
};

/**
 * 是否设置改变
 * @returns {boolean} 是否设置改变 - Whether settings changed
 * Are settings changed
 */
Window_Message.prototype.areSettingsChanged = function () {
	return this._background !== $gameMessage.background() || this._positionType !== $gameMessage.positionType();
};

/**
 * 更新显示快速
 * Update show fast
 */
Window_Message.prototype.updateShowFast = function () {
	if (this.isTriggered()) {
		this._showFast = true;
	}
};

/**
 * 新页
 * @param {Object} textState - 文本状态对象 - Text state object
 * New page
 */
Window_Message.prototype.newPage = function (textState) {
	this.contents.clear();
	this.resetFontSettings();
	this.clearFlags();
	this.loadMessageFace();
	textState.x = this.newLineX();
	textState.y = 0;
	textState.left = this.newLineX();
	textState.height = this.calcTextHeight(textState, false);
};

/**
 * 加载信息脸图
 * Load message face
 */
Window_Message.prototype.loadMessageFace = function () {
	this._faceBitmap = ImageManager.reserveFace($gameMessage.faceName(), 0, this._imageReservationId);
};

/**
 * 绘制信息脸图
 * Draw message face
 */
Window_Message.prototype.drawMessageFace = function () {
	this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0);
	ImageManager.releaseReservation(this._imageReservationId);
};

/**
 * 新行 X 坐标
 * @returns {number} 新行X坐标 - New line X coordinate
 * New line X
 */
Window_Message.prototype.newLineX = function () {
	return $gameMessage.faceName() === "" ? 0 : 168;
};

/**
 * 处理新行
 * @param {Object} textState - 文本状态对象 - Text state object
 * Process new line
 */
Window_Message.prototype.processNewLine = function (textState) {
	this._lineShowFast = false;
	Window_Base.prototype.processNewLine.call(this, textState);
	if (this.needsNewPage(textState)) {
		this.startPause();
	}
};

/**
 * 处理新页
 * @param {Object} textState - 文本状态对象 - Text state object
 * Process new page
 */
Window_Message.prototype.processNewPage = function (textState) {
	Window_Base.prototype.processNewPage.call(this, textState);
	if (textState.text[textState.index] === "\n") {
		textState.index++;
	}
	textState.y = this.contents.height;
	this.startPause();
};

/**
 * 是否文本结束
 * @param {Object} textState - 文本状态对象 - Text state object
 * @returns {boolean} 是否文本结束 - Whether end of text
 * Is end of text
 */
Window_Message.prototype.isEndOfText = function (textState) {
	return textState.index >= textState.text.length;
};

/**
 * 是否需要新页
 * @param {Object} textState - 文本状态对象 - Text state object
 * @returns {boolean} 是否需要新页 - Whether needs new page
 * Needs new page
 */
Window_Message.prototype.needsNewPage = function (textState) {
	return !this.isEndOfText(textState) && textState.y + textState.height > this.contents.height;
};

/**
 * 处理转义字符
 * @param {string} code - 转义字符代码 - Escape character code
 * @param {Object} textState - 文本状态对象 - Text state object
 * Process escape character
 */
Window_Message.prototype.processEscapeCharacter = function (code, textState) {
	switch (code) {
		case "$":
			this._goldWindow.open();
			break;
		case ".":
			this.startWait(15);
			break;
		case "|":
			this.startWait(60);
			break;
		case "!":
			this.startPause();
			break;
		case ">":
			this._lineShowFast = true;
			break;
		case "<":
			this._lineShowFast = false;
			break;
		case "^":
			this._pauseSkip = true;
			break;
		default:
			Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
			break;
	}
};

/**
 * 开始等待
 * @param {number} count - 等待计数 - Wait count
 * Start wait
 */
Window_Message.prototype.startWait = function (count) {
	this._waitCount = count;
};

/**
 * 开始暂停
 * Start pause
 */
Window_Message.prototype.startPause = function () {
	this.startWait(10);
	this.pause = true;
};
