//=============================================================================
// Window_Selectable.js
//=============================================================================

/**
 * Window_Selectable
 * 具有光标移动和滚动功能的窗口类。
 * The window class with cursor movement and scroll functions.
 * @class
 * @extends Window_Base
 */
function Window_Selectable() {
	this.initialize.apply(this, arguments);
}

Window_Selectable.prototype = Object.create(Window_Base.prototype);
Window_Selectable.prototype.constructor = Window_Selectable;

/**
 * 初始化方法
 * Initialize method
 * @param {number} x - 窗口的x坐标 | X coordinate of the window
 * @param {number} y - 窗口的y坐标 | Y coordinate of the window
 * @param {number} width - 窗口的宽度 | Width of the window
 * @param {number} height - 窗口的高度 | Height of the window
 */
Window_Selectable.prototype.initialize = function (x, y, width, height) {
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._index = -1;
	this._cursorFixed = false;
	this._cursorAll = false;
	this._stayCount = 0;
	this._helpWindow = null;
	this._handlers = {};
	this._touching = false;
	this._scrollX = 0;
	this._scrollY = 0;
	this.deactivate();
};

/**
 * 获取当前索引
 * Gets the current index
 * @returns {number} 当前索引值 | Current index value
 */
Window_Selectable.prototype.index = function () {
	return this._index;
};

/**
 * 光标固定
 * 获取光标是否固定状态
 * Cursor fixed
 * Gets whether the cursor is fixed
 * @returns {boolean} 光标是否固定 | Whether the cursor is fixed
 */
Window_Selectable.prototype.cursorFixed = function () {
	return this._cursorFixed;
};

/**
 * 设置光标固定状态
 * Sets whether the cursor is fixed
 * @param {boolean} cursorFixed - 光标是否固定 | Whether the cursor is fixed
 */
Window_Selectable.prototype.setCursorFixed = function (cursorFixed) {
	this._cursorFixed = cursorFixed;
};

/**
 * 光标所有
 * 获取光标是否选中所有项目
 * Cursor all
 * Gets whether all items are selected
 * @returns {boolean} 是否选中所有项目 | Whether all items are selected
 */
Window_Selectable.prototype.cursorAll = function () {
	return this._cursorAll;
};

/**
 * 设置光标选中所有项目
 * Sets whether to select all items
 * @param {boolean} cursorAll - 是否选中所有项目 | Whether to select all items
 */
Window_Selectable.prototype.setCursorAll = function (cursorAll) {
	this._cursorAll = cursorAll;
};

/**
 * 获取最大列数
 * Gets the maximum number of columns
 * @returns {number} 最大列数 | Maximum number of columns
 */
Window_Selectable.prototype.maxCols = function () {
	return 1;
};

/**
 * 获取最大项目数
 * Gets the maximum number of items
 * @returns {number} 最大项目数 | Maximum number of items
 */
Window_Selectable.prototype.maxItems = function () {
	return 0;
};

/**
 * 获取项目间隔
 * Gets the spacing between items
 * @returns {number} 项目间隔 | Spacing between items
 */
Window_Selectable.prototype.spacing = function () {
	return 12;
};

/**
 * 获取项目宽度
 * Gets the width of each item
 * @returns {number} 项目宽度 | Width of each item
 */
Window_Selectable.prototype.itemWidth = function () {
	return Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing());
};

/**
 * 获取项目高度
 * Gets the height of each item
 * @returns {number} 项目高度 | Height of each item
 */
Window_Selectable.prototype.itemHeight = function () {
	return this.lineHeight();
};

/**
 * 获取最大行数
 * Gets the maximum number of rows
 * @returns {number} 最大行数 | Maximum number of rows
 */
Window_Selectable.prototype.maxRows = function () {
	return Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
};

/**
 * 激活窗口
 * Activates the window
 */
Window_Selectable.prototype.activate = function () {
	Window_Base.prototype.activate.call(this);
	this.reselect();
};

/**
 * 停用窗口
 * Deactivates the window
 */
Window_Selectable.prototype.deactivate = function () {
	Window_Base.prototype.deactivate.call(this);
	this.reselect();
};

/**
 * 选择指定索引的项目
 * Selects an item by index
 * @param {number} index - 要选择的索引 | Index to select
 */
Window_Selectable.prototype.select = function (index) {
	this._index = index;
	this._stayCount = 0;
	this.ensureCursorVisible();
	this.updateCursor();
	this.callUpdateHelp();
};

/**
 * 取消选择
 * Deselects the current item
 */
Window_Selectable.prototype.deselect = function () {
	this.select(-1);
};

/**
 * 重新选择
 * Reselects the current item
 */
Window_Selectable.prototype.reselect = function () {
	this.select(this._index);
};

/**
 * 获取当前行号
 * Gets the current row number
 * @returns {number} 当前行号 | Current row number
 */
Window_Selectable.prototype.row = function () {
	return Math.floor(this.index() / this.maxCols());
};

/**
 * 获取顶部行号
 * Gets the top row number
 * @returns {number} 顶部行号 | Top row number
 */
Window_Selectable.prototype.topRow = function () {
	return Math.floor(this._scrollY / this.itemHeight());
};

/**
 * 获取最大顶部行号
 * Gets the maximum top row number
 * @returns {number} 最大顶部行号 | Maximum top row number
 */
Window_Selectable.prototype.maxTopRow = function () {
	return Math.max(0, this.maxRows() - this.maxPageRows());
};

/**
 * 设置顶部行号
 * Sets the top row number
 * @param {number} row - 顶部行号 | Top row number
 */
Window_Selectable.prototype.setTopRow = function (row) {
	var scrollY = row.clamp(0, this.maxTopRow()) * this.itemHeight();
	if (this._scrollY !== scrollY) {
		this._scrollY = scrollY;
		this.refresh();
		this.updateCursor();
	}
};

/**
 * 重置滚动
 * Resets the scroll position
 */
Window_Selectable.prototype.resetScroll = function () {
	this.setTopRow(0);
};

/**
 * 获取最大页面行数
 * Gets the maximum number of rows per page
 * @returns {number} 最大页面行数 | Maximum number of rows per page
 */
Window_Selectable.prototype.maxPageRows = function () {
	var pageHeight = this.height - this.padding * 2;
	return Math.floor(pageHeight / this.itemHeight());
};

/**
 * 获取最大页面项目数
 * Gets the maximum number of items per page
 * @returns {number} 最大页面项目数 | Maximum number of items per page
 */
Window_Selectable.prototype.maxPageItems = function () {
	return this.maxPageRows() * this.maxCols();
};

/**
 * 判断是否为横向布局
 * Checks if the layout is horizontal
 * @returns {boolean} 是否为横向布局 | Whether the layout is horizontal
 */
Window_Selectable.prototype.isHorizontal = function () {
	return this.maxPageRows() === 1;
};

/**
 * 获取底部行号
 * Gets the bottom row number
 * @returns {number} 底部行号 | Bottom row number
 */
Window_Selectable.prototype.bottomRow = function () {
	return Math.max(0, this.topRow() + this.maxPageRows() - 1);
};

/**
 * 设置底部行号
 * Sets the bottom row number
 * @param {number} row - 底部行号 | Bottom row number
 */
Window_Selectable.prototype.setBottomRow = function (row) {
	this.setTopRow(row - (this.maxPageRows() - 1));
};

/**
 * 获取顶部索引
 * Gets the top index
 * @returns {number} 顶部索引 | Top index
 */
Window_Selectable.prototype.topIndex = function () {
	return this.topRow() * this.maxCols();
};

/**
 * 获取项目的矩形区域
 * Gets the rectangle area for an item
 * @param {number} index - 项目索引 | Item index
 * @returns {Rectangle} 项目的矩形区域 | Rectangle area of the item
 */
Window_Selectable.prototype.itemRect = function (index) {
	var rect = new Rectangle();
	var maxCols = this.maxCols();
	rect.width = this.itemWidth();
	rect.height = this.itemHeight();
	rect.x = (index % maxCols) * (rect.width + this.spacing()) - this._scrollX;
	rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	return rect;
};

/**
 * 获取文本项目的矩形区域
 * Gets the rectangle area for a text item
 * @param {number} index - 项目索引 | Item index
 * @returns {Rectangle} 文本项目的矩形区域 | Rectangle area of the text item
 */
Window_Selectable.prototype.itemRectForText = function (index) {
	var rect = this.itemRect(index);
	rect.x += this.textPadding();
	rect.width -= this.textPadding() * 2;
	return rect;
};

/**
 * 设置帮助窗口
 * Sets the help window
 * @param {Window_Help} helpWindow - 帮助窗口 | Help window
 */
Window_Selectable.prototype.setHelpWindow = function (helpWindow) {
	this._helpWindow = helpWindow;
	this.callUpdateHelp();
};

/**
 * 显示帮助窗口
 * Shows the help window
 */
Window_Selectable.prototype.showHelpWindow = function () {
	if (this._helpWindow) {
		this._helpWindow.show();
	}
};

/**
 * 隐藏帮助窗口
 * Hides the help window
 */
Window_Selectable.prototype.hideHelpWindow = function () {
	if (this._helpWindow) {
		this._helpWindow.hide();
	}
};

/**
 * 设置处理者
 * Sets a handler for a symbol
 * @param {string} symbol - 符号标识 | Symbol identifier
 * @param {Function} method - 处理方法 | Handler method
 */
Window_Selectable.prototype.setHandler = function (symbol, method) {
	this._handlers[symbol] = method;
};

/**
 * 判断是否有处理者
 * Checks if a handler exists for a symbol
 * @param {string} symbol - 符号标识 | Symbol identifier
 * @returns {boolean} 是否有处理者 | Whether a handler exists
 */
Window_Selectable.prototype.isHandled = function (symbol) {
	return !!this._handlers[symbol];
};

/**
 * 调用处理者
 * Calls the handler for a symbol
 * @param {string} symbol - 符号标识 | Symbol identifier
 */
Window_Selectable.prototype.callHandler = function (symbol) {
	if (this.isHandled(symbol)) {
		this._handlers[symbol]();
	}
};

/**
 * 判断窗口是否打开并且激活
 * Checks if the window is open and active
 * @returns {boolean} 是否打开并且激活 | Whether the window is open and active
 */
Window_Selectable.prototype.isOpenAndActive = function () {
	return this.isOpen() && this.active;
};

/**
 * 判断光标是否可移动
 * Checks if the cursor is movable
 * @returns {boolean} 光标是否可移动 | Whether the cursor is movable
 */
Window_Selectable.prototype.isCursorMovable = function () {
	return this.isOpenAndActive() && !this._cursorFixed && !this._cursorAll && this.maxItems() > 0;
};

/**
 * 光标向下移动
 * Moves the cursor down
 * @param {boolean} wrap - 是否循环 | Whether to wrap around
 */
Window_Selectable.prototype.cursorDown = function (wrap) {
	var index = this.index();
	var maxItems = this.maxItems();
	var maxCols = this.maxCols();
	if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
		this.select((index + maxCols) % maxItems);
	}
};

/**
 * 光标向上移动
 * Moves the cursor up
 * @param {boolean} wrap - 是否循环 | Whether to wrap around
 */
Window_Selectable.prototype.cursorUp = function (wrap) {
	var index = this.index();
	var maxItems = this.maxItems();
	var maxCols = this.maxCols();
	if (index >= maxCols || (wrap && maxCols === 1)) {
		this.select((index - maxCols + maxItems) % maxItems);
	}
};

/**
 * 光标向右移动
 * Moves the cursor right
 * @param {boolean} wrap - 是否循环 | Whether to wrap around
 */
Window_Selectable.prototype.cursorRight = function (wrap) {
	var index = this.index();
	var maxItems = this.maxItems();
	var maxCols = this.maxCols();
	if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
		this.select((index + 1) % maxItems);
	}
};

/**
 * 光标向左移动
 * Moves the cursor left
 * @param {boolean} wrap - 是否循环 | Whether to wrap around
 */
Window_Selectable.prototype.cursorLeft = function (wrap) {
	var index = this.index();
	var maxItems = this.maxItems();
	var maxCols = this.maxCols();
	if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
		this.select((index - 1 + maxItems) % maxItems);
	}
};

/**
 * 光标下翻页
 * Moves the cursor page down
 */
Window_Selectable.prototype.cursorPagedown = function () {
	var index = this.index();
	var maxItems = this.maxItems();
	if (this.topRow() + this.maxPageRows() < this.maxRows()) {
		this.setTopRow(this.topRow() + this.maxPageRows());
		this.select(Math.min(index + this.maxPageItems(), maxItems - 1));
	}
};

/**
 * 光标上翻页
 * Moves the cursor page up
 */
Window_Selectable.prototype.cursorPageup = function () {
	var index = this.index();
	if (this.topRow() > 0) {
		this.setTopRow(this.topRow() - this.maxPageRows());
		this.select(Math.max(index - this.maxPageItems(), 0));
	}
};

/**
 * 向下滚动
 * Scrolls down
 */
Window_Selectable.prototype.scrollDown = function () {
	if (this.topRow() + 1 < this.maxRows()) {
		this.setTopRow(this.topRow() + 1);
	}
};

/**
 * 向上滚动
 * Scrolls up
 */
Window_Selectable.prototype.scrollUp = function () {
	if (this.topRow() > 0) {
		this.setTopRow(this.topRow() - 1);
	}
};

/**
 * 更新窗口
 * Updates the window
 */
Window_Selectable.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	this.updateArrows();
	this.processCursorMove();
	this.processHandling();
	this.processWheel();
	this.processTouch();
	this._stayCount++;
};

/**
 * 更新箭头
 * Updates the arrows
 */
Window_Selectable.prototype.updateArrows = function () {
	var topRow = this.topRow();
	var maxTopRow = this.maxTopRow();
	this.downArrowVisible = maxTopRow > 0 && topRow < maxTopRow;
	this.upArrowVisible = topRow > 0;
};

/**
 * 处理光标移动
 * Processes cursor movement
 */
Window_Selectable.prototype.processCursorMove = function () {
	if (this.isCursorMovable()) {
		var lastIndex = this.index();
		if (Input.isRepeated("down")) {
			this.cursorDown(Input.isTriggered("down"));
		}
		if (Input.isRepeated("up")) {
			this.cursorUp(Input.isTriggered("up"));
		}
		if (Input.isRepeated("right")) {
			this.cursorRight(Input.isTriggered("right"));
		}
		if (Input.isRepeated("left")) {
			this.cursorLeft(Input.isTriggered("left"));
		}
		if (!this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
			this.cursorPagedown();
		}
		if (!this.isHandled("pageup") && Input.isTriggered("pageup")) {
			this.cursorPageup();
		}
		if (this.index() !== lastIndex) {
			SoundManager.playCursor();
		}
	}
};

/**
 * 处理输入
 * Processes input handling
 */
Window_Selectable.prototype.processHandling = function () {
	if (this.isOpenAndActive()) {
		if (this.isOkEnabled() && this.isOkTriggered()) {
			this.processOk();
		} else if (this.isCancelEnabled() && this.isCancelTriggered()) {
			this.processCancel();
		} else if (this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
			this.processPagedown();
		} else if (this.isHandled("pageup") && Input.isTriggered("pageup")) {
			this.processPageup();
		}
	}
};

/**
 * 处理鼠标滚轮
 * Processes mouse wheel input
 */
Window_Selectable.prototype.processWheel = function () {
	if (this.isOpenAndActive()) {
		var threshold = 20;
		if (TouchInput.wheelY >= threshold) {
			this.scrollDown();
		}
		if (TouchInput.wheelY <= -threshold) {
			this.scrollUp();
		}
	}
};

/**
 * 处理触摸输入
 * Processes touch input
 */
Window_Selectable.prototype.processTouch = function () {
	if (this.isOpenAndActive()) {
		if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
			this._touching = true;
			this.onTouch(true);
		} else if (TouchInput.isCancelled()) {
			if (this.isCancelEnabled()) {
				this.processCancel();
			}
		}
		if (this._touching) {
			if (TouchInput.isPressed()) {
				this.onTouch(false);
			} else {
				this._touching = false;
			}
		}
	} else {
		this._touching = false;
	}
};

/**
 * 判断触摸是否在窗口内部
 * Checks if touch is inside the window frame
 * @returns {boolean} 是否在内部 | Whether the touch is inside
 */
Window_Selectable.prototype.isTouchedInsideFrame = function () {
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

/**
 * 处理触摸事件
 * Handles touch events
 * @param {boolean} triggered - 是否为触发状态 | Whether it's triggered
 */
Window_Selectable.prototype.onTouch = function (triggered) {
	var lastIndex = this.index();
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	var hitIndex = this.hitTest(x, y);
	if (hitIndex >= 0) {
		if (hitIndex === this.index()) {
			if (triggered && this.isTouchOkEnabled()) {
				this.processOk();
			}
		} else if (this.isCursorMovable()) {
			this.select(hitIndex);
		}
	} else if (this._stayCount >= 10) {
		if (y < this.padding) {
			this.cursorUp();
		} else if (y >= this.height - this.padding) {
			this.cursorDown();
		}
	}
	if (this.index() !== lastIndex) {
		SoundManager.playCursor();
	}
};

/**
 * 命中测试
 * 判断点是在哪个项目的矩形区域内，返回该项目索引。
 * Hit test
 * Determines which item's rectangle area the point is in, returns that item's index.
 * @param {number} x - x坐标 | X coordinate
 * @param {number} y - y坐标 | Y coordinate
 * @returns {number} 项目索引，-1表示没有命中 | Item index, -1 means no hit
 */
Window_Selectable.prototype.hitTest = function (x, y) {
	if (this.isContentsArea(x, y)) {
		var cx = x - this.padding;
		var cy = y - this.padding;
		var topIndex = this.topIndex();
		for (var i = 0; i < this.maxPageItems(); i++) {
			var index = topIndex + i;
			if (index < this.maxItems()) {
				var rect = this.itemRect(index);
				var right = rect.x + rect.width;
				var bottom = rect.y + rect.height;
				if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
					return index;
				}
			}
		}
	}
	return -1;
};

/**
 * 判断是否为内容区域
 * Checks if the coordinates are in the content area
 * @param {number} x - x坐标 | X coordinate
 * @param {number} y - y坐标 | Y coordinate
 * @returns {boolean} 是否为内容区域 | Whether it's the content area
 */
Window_Selectable.prototype.isContentsArea = function (x, y) {
	var left = this.padding;
	var top = this.padding;
	var right = this.width - this.padding;
	var bottom = this.height - this.padding;
	return x >= left && y >= top && x < right && y < bottom;
};

/**
 * 判断触摸确定是否启用
 * Checks if touch OK is enabled
 * @returns {boolean} 是否启用 | Whether it's enabled
 */
Window_Selectable.prototype.isTouchOkEnabled = function () {
	return this.isOkEnabled();
};

/**
 * 判断确定按钮是否启用
 * Checks if OK button is enabled
 * @returns {boolean} 是否启用 | Whether it's enabled
 */
Window_Selectable.prototype.isOkEnabled = function () {
	return this.isHandled("ok");
};

/**
 * 判断取消按钮是否启用
 * Checks if cancel button is enabled
 * @returns {boolean} 是否启用 | Whether it's enabled
 */
Window_Selectable.prototype.isCancelEnabled = function () {
	return this.isHandled("cancel");
};

/**
 * 判断确定按钮是否触发
 * Checks if OK button is triggered
 * @returns {boolean} 是否触发 | Whether it's triggered
 */
Window_Selectable.prototype.isOkTriggered = function () {
	return Input.isRepeated("ok");
};

/**
 * 判断取消按钮是否触发
 * Checks if cancel button is triggered
 * @returns {boolean} 是否触发 | Whether it's triggered
 */
Window_Selectable.prototype.isCancelTriggered = function () {
	return Input.isRepeated("cancel");
};

/**
 * 处理确定操作
 * Processes OK operation
 */
Window_Selectable.prototype.processOk = function () {
	if (this.isCurrentItemEnabled()) {
		this.playOkSound();
		this.updateInputData();
		this.deactivate();
		this.callOkHandler();
	} else {
		this.playBuzzerSound();
	}
};

/**
 * 播放确定音效
 * Plays OK sound
 */
Window_Selectable.prototype.playOkSound = function () {
	SoundManager.playOk();
};

/**
 * 播放蜂鸣器音效
 * Plays buzzer sound
 */
Window_Selectable.prototype.playBuzzerSound = function () {
	SoundManager.playBuzzer();
};

/**
 * 调用确定处理者
 * Calls OK handler
 */
Window_Selectable.prototype.callOkHandler = function () {
	this.callHandler("ok");
};

/**
 * 处理取消操作
 * Processes cancel operation
 */
Window_Selectable.prototype.processCancel = function () {
	SoundManager.playCancel();
	this.updateInputData();
	this.deactivate();
	this.callCancelHandler();
};

/**
 * 调用取消处理者
 * Calls cancel handler
 */
Window_Selectable.prototype.callCancelHandler = function () {
	this.callHandler("cancel");
};

/**
 * 处理上翻页操作
 * Processes page up operation
 */
Window_Selectable.prototype.processPageup = function () {
	SoundManager.playCursor();
	this.updateInputData();
	this.deactivate();
	this.callHandler("pageup");
};

/**
 * 处理下翻页操作
 * Processes page down operation
 */
Window_Selectable.prototype.processPagedown = function () {
	SoundManager.playCursor();
	this.updateInputData();
	this.deactivate();
	this.callHandler("pagedown");
};

/**
 * 更新输入数据
 * Updates input data
 */
Window_Selectable.prototype.updateInputData = function () {
	Input.update();
	TouchInput.update();
};

/**
 * 更新光标
 * Updates the cursor
 */
Window_Selectable.prototype.updateCursor = function () {
	if (this._cursorAll) {
		var allRowsHeight = this.maxRows() * this.itemHeight();
		this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
		this.setTopRow(0);
	} else if (this.isCursorVisible()) {
		var rect = this.itemRect(this.index());
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
	} else {
		this.setCursorRect(0, 0, 0, 0);
	}
};

/**
 * 判断光标是否可见
 * Checks if the cursor is visible
 * @returns {boolean} 光标是否可见 | Whether the cursor is visible
 */
Window_Selectable.prototype.isCursorVisible = function () {
	var row = this.row();
	return row >= this.topRow() && row <= this.bottomRow();
};

/**
 * 确保光标可见
 * Ensures the cursor is visible
 */
Window_Selectable.prototype.ensureCursorVisible = function () {
	var row = this.row();
	if (row < this.topRow()) {
		this.setTopRow(row);
	} else if (row > this.bottomRow()) {
		this.setBottomRow(row);
	}
};

/**
 * 调用更新帮助
 * Calls update help
 */
Window_Selectable.prototype.callUpdateHelp = function () {
	if (this.active && this._helpWindow) {
		this.updateHelp();
	}
};

/**
 * 更新帮助信息
 * Updates help information
 */
Window_Selectable.prototype.updateHelp = function () {
	this._helpWindow.clear();
};

/**
 * 设置帮助窗口项目
 * Sets help window item
 * @param {object} item - 项目对象 | Item object
 */
Window_Selectable.prototype.setHelpWindowItem = function (item) {
	if (this._helpWindow) {
		this._helpWindow.setItem(item);
	}
};

/**
 * 判断当前项目是否启用
 * Checks if the current item is enabled
 * @returns {boolean} 当前项目是否启用 | Whether the current item is enabled
 */
Window_Selectable.prototype.isCurrentItemEnabled = function () {
	return true;
};

/**
 * 绘制所有项目
 * Draws all items
 */
Window_Selectable.prototype.drawAllItems = function () {
	var topIndex = this.topIndex();
	for (var i = 0; i < this.maxPageItems(); i++) {
		var index = topIndex + i;
		if (index < this.maxItems()) {
			this.drawItem(index);
		}
	}
};

/**
 * 绘制指定项目
 * Draws a specific item (abstract method)
 * @param {number} index - 项目索引 | Item index
 */
Window_Selectable.prototype.drawItem = function (index) {};

/**
 * 清除指定项目
 * Clears a specific item
 * @param {number} index - 项目索引 | Item index
 */
Window_Selectable.prototype.clearItem = function (index) {
	var rect = this.itemRect(index);
	this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
};

/**
 * 重绘指定项目
 * Redraws a specific item
 * @param {number} index - 项目索引 | Item index
 */
Window_Selectable.prototype.redrawItem = function (index) {
	if (index >= 0) {
		this.clearItem(index);
		this.drawItem(index);
	}
};

/**
 * 重绘当前项目
 * Redraws the current item
 */
Window_Selectable.prototype.redrawCurrentItem = function () {
	this.redrawItem(this.index());
};

/**
 * 刷新窗口
 * Refreshes the window
 */
Window_Selectable.prototype.refresh = function () {
	if (this.contents) {
		this.contents.clear();
		this.drawAllItems();
	}
};
