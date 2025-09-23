//=============================================================================
// WindowLayer.js
//=============================================================================

/**
 * @fileoverview 窗口图层类，用于管理和渲染多个游戏窗口。
 * Window layer class for managing and rendering multiple game windows.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

/**
 * 包含游戏窗口的层。
 * The layer which contains game windows.
 *
 * @class WindowLayer
 * @description 窗口图层类，用于管理和渲染多个游戏窗口，支持Canvas和WebGL渲染。
 * Window layer class for managing and rendering multiple game windows, supporting both Canvas and WebGL rendering.
 * @extends PIXI.Container
 */
function WindowLayer() {
	this.initialize.apply(this, arguments);
}

WindowLayer.prototype = Object.create(PIXI.Container.prototype);
WindowLayer.prototype.constructor = WindowLayer;

WindowLayer.prototype.initialize = function () {
	PIXI.Container.call(this);
	this._width = 0;
	this._height = 0;
	this._tempCanvas = null;
	this._translationMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

	this._windowMask = new PIXI.Graphics();
	this._windowMask.beginFill(0xffffff, 1);
	this._windowMask.drawRect(0, 0, 0, 0);
	this._windowMask.endFill();
	this._windowRect = this._windowMask.graphicsData[0].shape;

	this._renderSprite = null;
	this.filterArea = new PIXI.Rectangle();
	this.filters = [WindowLayer.voidFilter];

	//temporary fix for memory leak bug
	this.on("removed", this.onRemoveAsAChild);
};

/**
 * 初始化窗口图层对象。
 * Initializes the window layer object.
 *
 * @memberof WindowLayer
 * @method initialize
 * @description 初始化窗口图层对象，创建遮罩和渲染所需的资源。
 * Initializes the window layer object, creates masks and rendering resources.
 * @returns {void} 无返回值 No return value
 */

WindowLayer.prototype.onRemoveAsAChild = function () {
	this.removeChildren();
};

/**
 * 作为子对象被移除时的处理。
 * Handles when removed as a child.
 *
 * @memberof WindowLayer
 * @method onRemoveAsAChild
 * @description 当窗口图层作为子对象被移除时，清除所有子对象以防止内存泄漏。
 * When the window layer is removed as a child, clears all children to prevent memory leaks.
 * @returns {void} 无返回值 No return value
 */

WindowLayer.voidFilter = new PIXI.filters.VoidFilter();

/**
 * 窗口层的宽度（像素）。
 * The width of the window layer in pixels.
 *
 * @memberof WindowLayer
 * @property {Number} width - 窗口层的宽度（像素） The width of the window layer in pixels
 * @description 窗口图层的宽度属性，以像素为单位。
 * The width property of the window layer in pixels.
 */
Object.defineProperty(WindowLayer.prototype, "width", {
	get: function () {
		return this._width;
	},
	set: function (value) {
		this._width = value;
	},
	configurable: true,
});

/**
 * 窗口层的高度（像素）。
 * The height of the window layer in pixels.
 *
 * @memberof WindowLayer
 * @property {Number} height - 窗口层的高度（像素） The height of the window layer in pixels
 * @description 窗口图层的高度属性，以像素为单位。
 * The height property of the window layer in pixels.
 */
Object.defineProperty(WindowLayer.prototype, "height", {
	get: function () {
		return this._height;
	},
	set: function (value) {
		this._height = value;
	},
	configurable: true,
});

/**
 * 同时设置 x、y、宽度和高度。
 * Sets the x, y, width, and height all at once.
 *
 * @memberof WindowLayer
 * @method move
 * @description 同时设置窗口图层的位置和大小。
 * Sets the position and size of the window layer at once.
 * @param {Number} x - 窗口层的x坐标 The x coordinate of the window layer
 * @param {Number} y - 窗口层的y坐标 The y coordinate of the window layer
 * @param {Number} width - 窗口层的宽度 The width of the window layer
 * @param {Number} height - 窗口层的高度 The height of the window layer
 * @returns {void} 无返回值 No return value
 */
WindowLayer.prototype.move = function (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};

/**
 * 每帧更新窗口层。
 * Updates the window layer for each frame.
 *
 * @memberof WindowLayer
 * @method update
 * @description 每帧更新窗口图层，更新所有子窗口对象。
 * Updates the window layer each frame, updates all child window objects.
 * @returns {void} 无返回值 No return value
 */
WindowLayer.prototype.update = function () {
	this.children.forEach(function (child) {
		if (child.update) {
			child.update();
		}
	});
};

/**
 * Canvas渲染。
 * Renders with Canvas.
 *
 * @memberof WindowLayer
 * @method renderCanvas
 * @private
 * @description 使用Canvas渲染器渲染窗口图层。
 * Renders the window layer using Canvas renderer.
 * @param {Object} renderer - 渲染器 The renderer
 * @returns {void} 无返回值 No return value
 */
WindowLayer.prototype.renderCanvas = function (renderer) {
	if (!this.visible || !this.renderable) {
		return;
	}

	if (!this._tempCanvas) {
		this._tempCanvas = document.createElement("canvas");
	}

	this._tempCanvas.width = Graphics.width;
	this._tempCanvas.height = Graphics.height;

	var realCanvasContext = renderer.context;
	var context = this._tempCanvas.getContext("2d");

	context.save();
	context.clearRect(0, 0, Graphics.width, Graphics.height);
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.closePath();
	context.clip();

	renderer.context = context;

	for (var i = 0; i < this.children.length; i++) {
		var child = this.children[i];
		if (child._isWindow && child.visible && child.openness > 0) {
			this._canvasClearWindowRect(renderer, child);
			context.save();
			child.renderCanvas(renderer);
			context.restore();
		}
	}

	context.restore();

	renderer.context = realCanvasContext;
	renderer.context.setTransform(1, 0, 0, 1, 0, 0);
	renderer.context.globalCompositeOperation = "source-over";
	renderer.context.globalAlpha = 1;
	renderer.context.drawImage(this._tempCanvas, 0, 0);

	for (var j = 0; j < this.children.length; j++) {
		if (!this.children[j]._isWindow) {
			this.children[j].renderCanvas(renderer);
		}
	}
};

/**
 * Canvas清除窗口矩形。
 * Clears window rectangle on Canvas.
 *
 * @memberof WindowLayer
 * @method _canvasClearWindowRect
 * @private
 * @description 在Canvas上清除窗口矩形区域。
 * Clears the window rectangle area on Canvas.
 * @param {Object} renderSession - 渲染会话 The render session
 * @param {Window} window - 窗口 The window
 * @returns {void} 无返回值 No return value
 */
WindowLayer.prototype._canvasClearWindowRect = function (renderSession, window) {
	var rx = this.x + window.x;
	var ry = this.y + window.y + (window.height / 2) * (1 - window._openness / 255);
	var rw = window.width;
	var rh = (window.height * window._openness) / 255;
	renderSession.context.clearRect(rx, ry, rw, rh);
};

/**
 * WebGL渲染。
 * Renders with WebGL.
 *
 * @memberof WindowLayer
 * @method renderWebGL
 * @private
 * @description 使用WebGL渲染器渲染窗口图层。
 * Renders the window layer using WebGL renderer.
 * @param {Object} renderer - 渲染器 The renderer
 * @returns {void} 无返回值 No return value
 */
WindowLayer.prototype.renderWebGL = function (renderer) {
	if (!this.visible || !this.renderable) {
		return;
	}

	if (this.children.length == 0) {
		return;
	}

	renderer.flush();
	this.filterArea.copy(this);
	renderer.filterManager.pushFilter(this, this.filters);
	renderer.currentRenderer.start();

	var shift = new PIXI.Point();
	var rt = renderer._activeRenderTarget;
	var projectionMatrix = rt.projectionMatrix;
	shift.x = Math.round(((projectionMatrix.tx + 1) / 2) * rt.sourceFrame.width);
	shift.y = Math.round(((projectionMatrix.ty + 1) / 2) * rt.sourceFrame.height);

	for (var i = 0; i < this.children.length; i++) {
		var child = this.children[i];
		if (child._isWindow && child.visible && child.openness > 0) {
			this._maskWindow(child, shift);
			renderer.maskManager.pushScissorMask(this, this._windowMask);
			renderer.clear();
			renderer.maskManager.popScissorMask();
			renderer.currentRenderer.start();
			child.renderWebGL(renderer);
			renderer.currentRenderer.flush();
		}
	}

	renderer.flush();
	renderer.filterManager.popFilter();
	renderer.maskManager.popScissorMask();

	for (var j = 0; j < this.children.length; j++) {
		if (!this.children[j]._isWindow) {
			this.children[j].renderWebGL(renderer);
		}
	}
};

/**
 * 窗口遮罩。
 * Masks the window.
 *
 * @memberof WindowLayer
 * @method _maskWindow
 * @private
 * @description 为窗口设置遮罩区域。
 * Sets the mask area for the window.
 * @param {Window} window - 窗口 The window
 * @param {PIXI.Point} shift - 偏移 The shift
 * @returns {void} 无返回值 No return value
 */
WindowLayer.prototype._maskWindow = function (window, shift) {
	this._windowMask._currentBounds = null;
	this._windowMask.boundsDirty = true;
	var rect = this._windowRect;
	rect.x = this.x + shift.x + window.x;
	rect.y = this.x + shift.y + window.y + (window.height / 2) * (1 - window._openness / 255);
	rect.width = window.width;
	rect.height = (window.height * window._openness) / 255;
};

// The important members from Pixi.js

/**
 * 窗口层的x坐标。
 * The x coordinate of the window layer.
 *
 * @type {Number}
 */

/**
 * 窗口层的y坐标。
 * The y coordinate of the window layer.
 *
 * @type {Number}
 */

/**
 * [只读] 窗口层的子对象数组。
 * [read-only] The array of children of the window layer.
 *
 * @type {Array}
 */

/**
 * [只读] 包含窗口层的对象。
 * [read-only] The object that contains the window layer.
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
