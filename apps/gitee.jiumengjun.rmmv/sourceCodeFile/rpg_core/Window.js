//=============================================================================
// Window.js
//=============================================================================

/**
 * @fileoverview 游戏窗口类，提供基本的窗口UI功能。
 * Game window class providing basic window UI functionality.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

/**
 * 游戏中的窗口。
 * The window in the game.
 *
 * @class Window
 * @description 游戏窗口类，提供基本的窗口UI功能，包括背景、边框、光标等。
 * Game window class providing basic window UI functionality including background, frame, cursor, etc.
 * @extends PIXI.Container
 */
function Window() {
	this.initialize.apply(this, arguments);
}

Window.prototype = Object.create(PIXI.Container.prototype);
Window.prototype.constructor = Window;

Window.prototype.initialize = function () {
	PIXI.Container.call(this);

	this._isWindow = true;
	this._windowskin = null;
	this._width = 0;
	this._height = 0;
	this._cursorRect = new Rectangle();
	this._openness = 255;
	this._animationCount = 0;

	this._padding = 18;
	this._margin = 4;
	this._colorTone = [0, 0, 0];

	this._windowSpriteContainer = null;
	this._windowBackSprite = null;
	this._windowCursorSprite = null;
	this._windowFrameSprite = null;
	this._windowContentsSprite = null;
	this._windowArrowSprites = [];
	this._windowPauseSignSprite = null;

	this._createAllParts();

	/**
	 * 窗口滚动的原点。
	 * The origin point of the window for scrolling.
	 *
	 * @memberof Window
	 * @property {Point} origin - 窗口滚动的原点 The origin point of the window for scrolling
	 * @description 窗口内容滚动的原点坐标。
	 * The origin coordinates for window content scrolling.
	 */
	this.origin = new Point();

	/**
	 * 窗口的激活状态。
	 * The active state for the window.
	 *
	 * @memberof Window
	 * @property {Boolean} active - 窗口的激活状态 The active state for the window
	 * @description 窗口是否处于激活状态，影响光标闪烁等交互效果。
	 * Whether the window is in active state, affecting interactions like cursor blinking.
	 */
	this.active = true;

	/**
	 * 下滚动箭头的可见性。
	 * The visibility of the down scroll arrow.
	 *
	 * @memberof Window
	 * @property {Boolean} downArrowVisible - 下滚动箭头的可见性 The visibility of the down scroll arrow
	 * @description 控制向下滚动箭头是否可见。
	 * Controls whether the downward scroll arrow is visible.
	 */
	this.downArrowVisible = false;

	/**
	 * 上滚动箭头的可见性。
	 * The visibility of the up scroll arrow.
	 *
	 * @memberof Window
	 * @property {Boolean} upArrowVisible - 上滚动箭头的可见性 The visibility of the up scroll arrow
	 * @description 控制向上滚动箭头是否可见。
	 * Controls whether the upward scroll arrow is visible.
	 */
	this.upArrowVisible = false;

	/**
	 * 暂停标志的可见性。
	 * The visibility of the pause sign.
	 *
	 * @memberof Window
	 * @property {Boolean} pause - 暂停标志的可见性 The visibility of the pause sign
	 * @description 控制暂停标志是否可见。
	 * Controls whether the pause sign is visible.
	 */
	this.pause = false;
};

/**
 * 初始化窗口对象。
 * Initializes the window object.
 *
 * @memberof Window
 * @method initialize
 * @description 初始化窗口对象，创建所有窗口部件并设置默认属性。
 * Initializes the window object, creates all window parts and sets default properties.
 * @returns {void} 无返回值 No return value
 */

/**
 * 作为窗口皮肤的图像。
 * The image used as a window skin.
 *
 * @memberof Window
 * @property {Bitmap} windowskin - 作为窗口皮肤的图像 The image used as a window skin
 * @description 窗口皮肤的位图图像，用于绘制窗口的外观。
 * The bitmap image used as window skin for drawing the window appearance.
 */
Object.defineProperty(Window.prototype, "windowskin", {
	get: function () {
		return this._windowskin;
	},
	set: function (value) {
		if (this._windowskin !== value) {
			this._windowskin = value;
			this._windowskin.addLoadListener(this._onWindowskinLoad.bind(this));
		}
	},
	configurable: true,
});

/**
 * 用于窗口内容的位图。
 * The bitmap used for the window contents.
 *
 * @memberof Window
 * @property {Bitmap} contents - 用于窗口内容的位图 The bitmap used for the window contents
 * @description 窗口内容的位图图像，用于显示窗口内的文本和图像。
 * The bitmap image for window contents, used to display text and images within the window.
 */
Object.defineProperty(Window.prototype, "contents", {
	get: function () {
		return this._windowContentsSprite.bitmap;
	},
	set: function (value) {
		this._windowContentsSprite.bitmap = value;
	},
	configurable: true,
});

/**
 * 窗口的宽度（像素）。
 * The width of the window in pixels.
 *
 * @memberof Window
 * @property {Number} width - 窗口的宽度（像素） The width of the window in pixels
 * @description 窗口的宽度属性，以像素为单位。
 * The width property of the window in pixels.
 */
Object.defineProperty(Window.prototype, "width", {
	get: function () {
		return this._width;
	},
	set: function (value) {
		this._width = value;
		this._refreshAllParts();
	},
	configurable: true,
});

/**
 * 窗口的高度（像素）。
 * The height of the window in pixels.
 *
 * @memberof Window
 * @property {Number} height - 窗口的高度（像素） The height of the window in pixels
 * @description 窗口的高度属性，以像素为单位。
 * The height property of the window in pixels.
 */
Object.defineProperty(Window.prototype, "height", {
	get: function () {
		return this._height;
	},
	set: function (value) {
		this._height = value;
		this._refreshAllParts();
	},
	configurable: true,
});

/**
 * 框架和内容之间的填充大小。
 * The size of the padding between the frame and contents.
 *
 * @memberof Window
 * @property {Number} padding - 框架和内容之间的填充大小 The size of the padding between the frame and contents
 * @description 窗口框架与内容之间的填充大小。
 * The padding size between the window frame and contents.
 */
Object.defineProperty(Window.prototype, "padding", {
	get: function () {
		return this._padding;
	},
	set: function (value) {
		this._padding = value;
		this._refreshAllParts();
	},
	configurable: true,
});

/**
 * 窗口背景的边距大小。
 * The size of the margin for the window background.
 *
 * @memberof Window
 * @property {Number} margin - 窗口背景的边距大小 The size of the margin for the window background
 * @description 窗口背景的边距大小。
 * The margin size for the window background.
 */
Object.defineProperty(Window.prototype, "margin", {
	get: function () {
		return this._margin;
	},
	set: function (value) {
		this._margin = value;
		this._refreshAllParts();
	},
	configurable: true,
});

/**
 * 窗口不包括内容的不透明度 (0 到 255)。
 * The opacity of the window without contents (0 to 255).
 *
 * @memberof Window
 * @property {Number} opacity - 窗口不包括内容的不透明度 (0 到 255) The opacity of the window without contents (0 to 255)
 * @description 窗口整体的不透明度，不包括内容部分。
 * The overall opacity of the window, excluding the contents.
 */
Object.defineProperty(Window.prototype, "opacity", {
	get: function () {
		return this._windowSpriteContainer.alpha * 255;
	},
	set: function (value) {
		this._windowSpriteContainer.alpha = value.clamp(0, 255) / 255;
	},
	configurable: true,
});

/**
 * 窗口背景的不透明度 (0 到 255)。
 * The opacity of the window background (0 to 255).
 *
 * @memberof Window
 * @property {Number} backOpacity - 窗口背景的不透明度 (0 到 255) The opacity of the window background (0 to 255)
 * @description 窗口背景的不透明度。
 * The opacity of the window background.
 */
Object.defineProperty(Window.prototype, "backOpacity", {
	get: function () {
		return this._windowBackSprite.alpha * 255;
	},
	set: function (value) {
		this._windowBackSprite.alpha = value.clamp(0, 255) / 255;
	},
	configurable: true,
});

/**
 * 窗口内容的不透明度 (0 到 255)。
 * The opacity of the window contents (0 to 255).
 *
 * @memberof Window
 * @property {Number} contentsOpacity - 窗口内容的不透明度 (0 到 255) The opacity of the window contents (0 to 255)
 * @description 窗口内容的不透明度。
 * The opacity of the window contents.
 */
Object.defineProperty(Window.prototype, "contentsOpacity", {
	get: function () {
		return this._windowContentsSprite.alpha * 255;
	},
	set: function (value) {
		this._windowContentsSprite.alpha = value.clamp(0, 255) / 255;
	},
	configurable: true,
});

/**
 * 窗口的开启度 (0 到 255)。
 * The openness of the window (0 to 255).
 *
 * @memberof Window
 * @property {Number} openness - 窗口的开启度 (0 到 255) The openness of the window (0 to 255)
 * @description 窗口的开启程度，用于开启动画效果。
 * The openness degree of the window, used for opening animation effects.
 */
Object.defineProperty(Window.prototype, "openness", {
	get: function () {
		return this._openness;
	},
	set: function (value) {
		if (this._openness !== value) {
			this._openness = value.clamp(0, 255);
			this._windowSpriteContainer.scale.y = this._openness / 255;
			this._windowSpriteContainer.y = (this.height / 2) * (1 - this._openness / 255);
		}
	},
	configurable: true,
});

/**
 * 每帧更新窗口。
 * Updates the window for each frame.
 *
 * @memberof Window
 * @method update
 * @description 每帧更新窗口状态，包括动画计数和子对象更新。
 * Updates the window state each frame, including animation count and child object updates.
 * @returns {void} 无返回值 No return value
 */
Window.prototype.update = function () {
	if (this.active) {
		this._animationCount++;
	}
	this.children.forEach(function (child) {
		if (child.update) {
			child.update();
		}
	});
};

/**
 * 同时设置 x、y、宽度和高度。
 * Sets the x, y, width, and height all at once.
 *
 * @memberof Window
 * @method move
 * @description 同时设置窗口的位置和大小，如果尺寸变化会刷新所有部件。
 * Sets the position and size of the window at once, refreshes all parts if size changes.
 * @param {Number} x - 窗口的x坐标 The x coordinate of the window
 * @param {Number} y - 窗口的y坐标 The y coordinate of the window
 * @param {Number} width - 窗口的宽度 The width of the window
 * @param {Number} height - 窗口的高度 The height of the window
 * @returns {void} 无返回值 No return value
 */
Window.prototype.move = function (x, y, width, height) {
	this.x = x || 0;
	this.y = y || 0;
	if (this._width !== width || this._height !== height) {
		this._width = width || 0;
		this._height = height || 0;
		this._refreshAllParts();
	}
};

/**
 * 如果窗口完全打开则返回true (openness == 255)。
 * Returns true if the window is completely open (openness == 255).
 *
 * @memberof Window
 * @method isOpen
 * @description 检查窗口是否完全打开。
 * Checks whether the window is completely open.
 * @returns {Boolean} 如果窗口完全打开则返回true True if the window is completely open
 */
Window.prototype.isOpen = function () {
	return this._openness >= 255;
};

/**
 * 如果窗口完全关闭则返回true (openness == 0)。
 * Returns true if the window is completely closed (openness == 0).
 *
 * @memberof Window
 * @method isClosed
 * @description 检查窗口是否完全关闭。
 * Checks whether the window is completely closed.
 * @returns {Boolean} 如果窗口完全关闭则返回true True if the window is completely closed
 */
Window.prototype.isClosed = function () {
	return this._openness <= 0;
};

/**
 * 设置命令光标的位置。
 * Sets the position of the command cursor.
 *
 * @memberof Window
 * @method setCursorRect
 * @description 设置窗口内命令光标的位置和大小。
 * Sets the position and size of the command cursor within the window.
 * @param {Number} x - 光标的x坐标 The x coordinate of the cursor
 * @param {Number} y - 光标的y坐标 The y coordinate of the cursor
 * @param {Number} width - 光标的宽度 The width of the cursor
 * @param {Number} height - 光标的高度 The height of the cursor
 * @returns {void} 无返回值 No return value
 */
Window.prototype.setCursorRect = function (x, y, width, height) {
	var cx = Math.floor(x || 0);
	var cy = Math.floor(y || 0);
	var cw = Math.floor(width || 0);
	var ch = Math.floor(height || 0);
	var rect = this._cursorRect;
	if (rect.x !== cx || rect.y !== cy || rect.width !== cw || rect.height !== ch) {
		this._cursorRect.x = cx;
		this._cursorRect.y = cy;
		this._cursorRect.width = cw;
		this._cursorRect.height = ch;
		this._refreshCursor();
	}
};

/**
 * 改变背景的颜色。
 * Changes the color of the background.
 *
 * @memberof Window
 * @method setTone
 * @description 改变窗口背景的色调。
 * Changes the color tone of the window background.
 * @param {Number} r - 红色值，范围 (-255, 255) The red value in the range (-255, 255)
 * @param {Number} g - 绿色值，范围 (-255, 255) The green value in the range (-255, 255)
 * @param {Number} b - 蓝色值，范围 (-255, 255) The blue value in the range (-255, 255)
 * @returns {void} 无返回值 No return value
 */
Window.prototype.setTone = function (r, g, b) {
	var tone = this._colorTone;
	if (r !== tone[0] || g !== tone[1] || b !== tone[2]) {
		this._colorTone = [r, g, b];
		this._refreshBack();
	}
};

/**
 * 在背景和内容之间添加子对象。
 * Adds a child between the background and contents.
 *
 * @memberof Window
 * @method addChildToBack
 * @description 在窗口背景和内容之间添加子对象。
 * Adds a child object between the window background and contents.
 * @param {Object} child - 要添加的子对象 The child to add
 * @returns {Object} 被添加的子对象 The child that was added
 */
Window.prototype.addChildToBack = function (child) {
	var containerIndex = this.children.indexOf(this._windowSpriteContainer);
	return this.addChildAt(child, containerIndex + 1);
};

/**
 * 更新变换。
 * Updates the transform.
 *
 * @memberof Window
 * @method updateTransform
 * @private
 * @description 更新窗口的变换，包括光标、箭头、暂停标志和内容。
 * Updates the window transform, including cursor, arrows, pause sign and contents.
 * @returns {void} 无返回值 No return value
 */
Window.prototype.updateTransform = function () {
	this._updateCursor();
	this._updateArrows();
	this._updatePauseSign();
	this._updateContents();
	PIXI.Container.prototype.updateTransform.call(this);
};

/**
 * 创建所有部件。
 * Creates all parts.
 *
 * @memberof Window
 * @method _createAllParts
 * @private
 * @description 创建窗口的所有视觉部件，包括背景、框架、光标等。
 * Creates all visual parts of the window, including background, frame, cursor, etc.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._createAllParts = function () {
	this._windowSpriteContainer = new PIXI.Container();
	this._windowBackSprite = new Sprite();
	this._windowCursorSprite = new Sprite();
	this._windowFrameSprite = new Sprite();
	this._windowContentsSprite = new Sprite();
	this._downArrowSprite = new Sprite();
	this._upArrowSprite = new Sprite();
	this._windowPauseSignSprite = new Sprite();
	this._windowBackSprite.bitmap = new Bitmap(1, 1);
	this._windowBackSprite.alpha = 192 / 255;
	this.addChild(this._windowSpriteContainer);
	this._windowSpriteContainer.addChild(this._windowBackSprite);
	this._windowSpriteContainer.addChild(this._windowFrameSprite);
	this.addChild(this._windowCursorSprite);
	this.addChild(this._windowContentsSprite);
	this.addChild(this._downArrowSprite);
	this.addChild(this._upArrowSprite);
	this.addChild(this._windowPauseSignSprite);
};

/**
 * 窗口皮肤加载事件处理。
 * Handles windowskin load event.
 *
 * @memberof Window
 * @method _onWindowskinLoad
 * @private
 * @description 处理窗口皮肤加载完成事件，刷新所有部件。
 * Handles windowskin load completion event, refreshes all parts.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._onWindowskinLoad = function () {
	this._refreshAllParts();
};

/**
 * 刷新所有部件。
 * Refreshes all parts.
 *
 * @memberof Window
 * @method _refreshAllParts
 * @private
 * @description 刷新窗口的所有视觉部件。
 * Refreshes all visual parts of the window.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._refreshAllParts = function () {
	this._refreshBack();
	this._refreshFrame();
	this._refreshCursor();
	this._refreshContents();
	this._refreshArrows();
	this._refreshPauseSign();
};

/**
 * 刷新背景。
 * Refreshes the background.
 *
 * @memberof Window
 * @method _refreshBack
 * @private
 * @description 刷新窗口背景的绘制。
 * Refreshes the drawing of the window background.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._refreshBack = function () {
	var m = this._margin;
	var w = this._width - m * 2;
	var h = this._height - m * 2;
	var bitmap = new Bitmap(w, h);

	this._windowBackSprite.bitmap = bitmap;
	this._windowBackSprite.setFrame(0, 0, w, h);
	this._windowBackSprite.move(m, m);

	if (w > 0 && h > 0 && this._windowskin) {
		var p = 96;
		bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
		for (var y = 0; y < h; y += p) {
			for (var x = 0; x < w; x += p) {
				bitmap.blt(this._windowskin, 0, p, p, p, x, y, p, p);
			}
		}
		var tone = this._colorTone;
		bitmap.adjustTone(tone[0], tone[1], tone[2]);
	}
};

/**
 * 刷新框架。
 * Refreshes the frame.
 *
 * @memberof Window
 * @method _refreshFrame
 * @private
 * @description 刷新窗口框架的绘制。
 * Refreshes the drawing of the window frame.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._refreshFrame = function () {
	var w = this._width;
	var h = this._height;
	var m = 24;
	var bitmap = new Bitmap(w, h);

	this._windowFrameSprite.bitmap = bitmap;
	this._windowFrameSprite.setFrame(0, 0, w, h);

	if (w > 0 && h > 0 && this._windowskin) {
		var skin = this._windowskin;
		var p = 96;
		var q = 96;
		bitmap.blt(skin, p + m, 0 + 0, p - m * 2, m, m, 0, w - m * 2, m);
		bitmap.blt(skin, p + m, 0 + q - m, p - m * 2, m, m, h - m, w - m * 2, m);
		bitmap.blt(skin, p + 0, 0 + m, m, p - m * 2, 0, m, m, h - m * 2);
		bitmap.blt(skin, p + q - m, 0 + m, m, p - m * 2, w - m, m, m, h - m * 2);
		bitmap.blt(skin, p + 0, 0 + 0, m, m, 0, 0, m, m);
		bitmap.blt(skin, p + q - m, 0 + 0, m, m, w - m, 0, m, m);
		bitmap.blt(skin, p + 0, 0 + q - m, m, m, 0, h - m, m, m);
		bitmap.blt(skin, p + q - m, 0 + q - m, m, m, w - m, h - m, m, m);
	}
};

/**
 * 刷新光标。
 * Refreshes the cursor.
 *
 * @memberof Window
 * @method _refreshCursor
 * @private
 * @description 刷新光标的绘制。
 * Refreshes the drawing of the cursor.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._refreshCursor = function () {
	var pad = this._padding;
	var x = this._cursorRect.x + pad - this.origin.x;
	var y = this._cursorRect.y + pad - this.origin.y;
	var w = this._cursorRect.width;
	var h = this._cursorRect.height;
	var m = 4;
	var x2 = Math.max(x, pad);
	var y2 = Math.max(y, pad);
	var ox = x - x2;
	var oy = y - y2;
	var w2 = Math.min(w, this._width - pad - x2);
	var h2 = Math.min(h, this._height - pad - y2);
	var bitmap = new Bitmap(w2, h2);

	this._windowCursorSprite.bitmap = bitmap;
	this._windowCursorSprite.setFrame(0, 0, w2, h2);
	this._windowCursorSprite.move(x2, y2);

	if (w > 0 && h > 0 && this._windowskin) {
		var skin = this._windowskin;
		var p = 96;
		var q = 48;
		bitmap.blt(skin, p + m, p + m, q - m * 2, q - m * 2, ox + m, oy + m, w - m * 2, h - m * 2);
		bitmap.blt(skin, p + m, p + 0, q - m * 2, m, ox + m, oy + 0, w - m * 2, m);
		bitmap.blt(skin, p + m, p + q - m, q - m * 2, m, ox + m, oy + h - m, w - m * 2, m);
		bitmap.blt(skin, p + 0, p + m, m, q - m * 2, ox + 0, oy + m, m, h - m * 2);
		bitmap.blt(skin, p + q - m, p + m, m, q - m * 2, ox + w - m, oy + m, m, h - m * 2);
		bitmap.blt(skin, p + 0, p + 0, m, m, ox + 0, oy + 0, m, m);
		bitmap.blt(skin, p + q - m, p + 0, m, m, ox + w - m, oy + 0, m, m);
		bitmap.blt(skin, p + 0, p + q - m, m, m, ox + 0, oy + h - m, m, m);
		bitmap.blt(skin, p + q - m, p + q - m, m, m, ox + w - m, oy + h - m, m, m);
	}
};

/**
 * 刷新内容。
 * Refreshes the contents.
 *
 * @memberof Window
 * @method _refreshContents
 * @private
 * @description 刷新内容精灵的位置。
 * Refreshes the position of the contents sprite.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._refreshContents = function () {
	this._windowContentsSprite.move(this.padding, this.padding);
};

/**
 * 刷新箭头。
 * Refreshes the arrows.
 *
 * @memberof Window
 * @method _refreshArrows
 * @private
 * @description 刷新滚动箭头的绘制。
 * Refreshes the drawing of the scroll arrows.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._refreshArrows = function () {
	var w = this._width;
	var h = this._height;
	var p = 24;
	var q = p / 2;
	var sx = 96 + p;
	var sy = 0 + p;
	this._downArrowSprite.bitmap = this._windowskin;
	this._downArrowSprite.anchor.x = 0.5;
	this._downArrowSprite.anchor.y = 0.5;
	this._downArrowSprite.setFrame(sx + q, sy + q + p, p, q);
	this._downArrowSprite.move(w / 2, h - q);
	this._upArrowSprite.bitmap = this._windowskin;
	this._upArrowSprite.anchor.x = 0.5;
	this._upArrowSprite.anchor.y = 0.5;
	this._upArrowSprite.setFrame(sx + q, sy, p, q);
	this._upArrowSprite.move(w / 2, q);
};

/**
 * 刷新暂停标志。
 * Refreshes the pause sign.
 *
 * @memberof Window
 * @method _refreshPauseSign
 * @private
 * @description 刷新暂停标志的绘制。
 * Refreshes the drawing of the pause sign.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._refreshPauseSign = function () {
	var sx = 144;
	var sy = 96;
	var p = 24;
	this._windowPauseSignSprite.bitmap = this._windowskin;
	this._windowPauseSignSprite.anchor.x = 0.5;
	this._windowPauseSignSprite.anchor.y = 1;
	this._windowPauseSignSprite.move(this._width / 2, this._height);
	this._windowPauseSignSprite.setFrame(sx, sy, p, p);
	this._windowPauseSignSprite.alpha = 0;
};

/**
 * 更新光标。
 * Updates the cursor.
 *
 * @memberof Window
 * @method _updateCursor
 * @private
 * @description 更新光标的闪烁效果和可见性。
 * Updates the blinking effect and visibility of the cursor.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._updateCursor = function () {
	var blinkCount = this._animationCount % 40;
	var cursorOpacity = this.contentsOpacity;
	if (this.active) {
		if (blinkCount < 20) {
			cursorOpacity -= blinkCount * 8;
		} else {
			cursorOpacity -= (40 - blinkCount) * 8;
		}
	}
	this._windowCursorSprite.alpha = cursorOpacity / 255;
	this._windowCursorSprite.visible = this.isOpen();
};

/**
 * 更新内容。
 * Updates the contents.
 *
 * @memberof Window
 * @method _updateContents
 * @private
 * @description 更新内容精灵的可见性和显示区域。
 * Updates the visibility and display area of the contents sprite.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._updateContents = function () {
	var w = this._width - this._padding * 2;
	var h = this._height - this._padding * 2;
	if (w > 0 && h > 0) {
		this._windowContentsSprite.setFrame(this.origin.x, this.origin.y, w, h);
		this._windowContentsSprite.visible = this.isOpen();
	} else {
		this._windowContentsSprite.visible = false;
	}
};

/**
 * 更新箭头。
 * Updates the arrows.
 *
 * @memberof Window
 * @method _updateArrows
 * @private
 * @description 更新滚动箭头的可见性。
 * Updates the visibility of the scroll arrows.
 * @returns {void} 无返回值 No return value
 */
Window.prototype._updateArrows = function () {
	this._downArrowSprite.visible = this.isOpen() && this.downArrowVisible;
	this._upArrowSprite.visible = this.isOpen() && this.upArrowVisible;
};

/**
 * 更新暂停标志。
 * Updates the pause sign.
 *
 * @memberof Window
 * @method _updatePauseSign
 * @private
 * @description 更新暂停标志的动画和可见性。
 * Updates the animation and visibility of the pause sign.
 * @returns {void} 无返回值 No return value

Window.prototype._updatePauseSign = function () {
	var sprite = this._windowPauseSignSprite;
	var x = Math.floor(this._animationCount / 16) % 2;
	var y = Math.floor(this._animationCount / 16 / 2) % 2;
	var sx = 144;
	var sy = 96;
	var p = 24;
	if (!this.pause) {
		sprite.alpha = 0;
	} else if (sprite.alpha < 1) {
		sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
	}
	sprite.setFrame(sx + x * p, sy + y * p, p, p);
	sprite.visible = this.isOpen();
};

// The important members from Pixi.js

/**
 * 窗口的可见性。
 * The visibility of the window.
 *
 * @type {Boolean}
 */

/**
 * 窗口的x坐标。
 * The x coordinate of the window.
 *
 * @type {Number}
 */

/**
 * 窗口的y坐标。
 * The y coordinate of the window.
 *
 * @type {Number}
 */

/**
 * [只读] 窗口的子对象数组。
 * [read-only] The array of children of the window.
 *
 * @type {Array}
 */

/**
 * [只读] 包含窗口的对象。
 * [read-only] The object that contains the window.
 *
 * @type {Object}
 */

/**
 * 向容器中添加子对象。
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child 要添加的子对象 The child to add
 * @return {Object} 被添加的子对象 The child that was added
 */

/**
 * 在指定索引处向容器中添加子对象。
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child 要添加的子对象 The child to add
 * @param {Number} index 放置子对象的索引 The index to place the child in
 * @return {Object} 被添加的子对象 The child that was added
 */

/**
 * 从容器中移除子对象。
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child 要移除的子对象 The child to remove
 * @return {Object} 被移除的子对象 The child that was removed
 */

/**
 * 从指定索引位置移除子对象。
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index 获取子对象的索引 The index to get the child from
 * @return {Object} 被移除的子对象 The child that was removed
 */

//-----------------------------------------------------------------------------
