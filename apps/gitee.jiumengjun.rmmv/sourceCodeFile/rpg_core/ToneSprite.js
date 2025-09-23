//=============================================================================
// ToneSprite.js
//=============================================================================

/**
 * @fileoverview ToneSprite - 色调精灵类
 * @description 在2D canvas模式下改变屏幕颜色的精灵类
 * The sprite which changes the screen color in 2D canvas mode.
 * @author RPG Maker MV Development Team
 * @since RPG Maker MV 1.0.0
 */

/**
 * 色调精灵类
 * Tone sprite class
 *
 * @class ToneSprite
 * @extends PIXI.Container
 * @description 在2D canvas模式下改变屏幕颜色的精灵
 * The sprite which changes the screen color in 2D canvas mode
 */
function ToneSprite() {
	this.initialize.apply(this, arguments);
}

ToneSprite.prototype = Object.create(PIXI.Container.prototype);
ToneSprite.prototype.constructor = ToneSprite;

/**
 * 初始化色调精灵
 * Initializes the tone sprite
 *
 * @memberof ToneSprite
 * @method initialize
 * @description 初始化色调精灵对象
 * Initializes the tone sprite object
 */
ToneSprite.prototype.initialize = function () {
	PIXI.Container.call(this);
	this.clear();
};

/**
 * 清除色调
 * Clears the tone
 *
 * @memberof ToneSprite
 * @method clear
 * @description 清除色调设置，重置所有颜色通道
 * Clears the tone settings and resets all color channels
 */
ToneSprite.prototype.clear = function () {
	this._red = 0;
	this._green = 0;
	this._blue = 0;
	this._gray = 0;
};

/**
 * 设置色调
 * Sets the tone
 *
 * @memberof ToneSprite
 * @method setTone
 * @param {number} r - 红色强度，范围(-255, 255) - Red strength in the range (-255, 255)
 * @param {number} g - 绿色强度，范围(-255, 255) - Green strength in the range (-255, 255)
 * @param {number} b - 蓝色强度，范围(-255, 255) - Blue strength in the range (-255, 255)
 * @param {number} gray - 灰度级别，范围(0, 255) - Grayscale level in the range (0, 255)
 * @description 设置精灵的色调参数，包括RGB颜色通道和灰度
 * Sets the tone parameters of the sprite, including RGB color channels and grayscale
 */
ToneSprite.prototype.setTone = function (r, g, b, gray) {
	this._red = Math.round(r || 0).clamp(-255, 255);
	this._green = Math.round(g || 0).clamp(-255, 255);
	this._blue = Math.round(b || 0).clamp(-255, 255);
	this._gray = Math.round(gray || 0).clamp(0, 255);
};

/**
 * Canvas渲染色调精灵
 * Renders the tone sprite with Canvas
 *
 * @memberof ToneSprite
 * @method _renderCanvas
 * @param {Object} renderer - 渲染器 - The renderer
 * @description 使用Canvas渲染器渲染色调精灵
 * Renders the tone sprite using Canvas renderer
 * @private
 */
ToneSprite.prototype._renderCanvas = function (renderer) {
	if (this.visible) {
		var context = renderer.context;
		var t = this.worldTransform;
		var r = renderer.resolution;
		var width = Graphics.width;
		var height = Graphics.height;
		context.save();
		context.setTransform(t.a, t.b, t.c, t.d, t.tx * r, t.ty * r);
		if (Graphics.canUseSaturationBlend() && this._gray > 0) {
			context.globalCompositeOperation = "saturation";
			context.globalAlpha = this._gray / 255;
			context.fillStyle = "#ffffff";
			context.fillRect(0, 0, width, height);
		}
		context.globalAlpha = 1;
		var r1 = Math.max(0, this._red);
		var g1 = Math.max(0, this._green);
		var b1 = Math.max(0, this._blue);
		if (r1 || g1 || b1) {
			context.globalCompositeOperation = "lighter";
			context.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
			context.fillRect(0, 0, width, height);
		}
		if (Graphics.canUseDifferenceBlend()) {
			var r2 = Math.max(0, -this._red);
			var g2 = Math.max(0, -this._green);
			var b2 = Math.max(0, -this._blue);
			if (r2 || g2 || b2) {
				context.globalCompositeOperation = "difference";
				context.fillStyle = "#ffffff";
				context.fillRect(0, 0, width, height);
				context.globalCompositeOperation = "lighter";
				context.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
				context.fillRect(0, 0, width, height);
				context.globalCompositeOperation = "difference";
				context.fillStyle = "#ffffff";
				context.fillRect(0, 0, width, height);
			}
		}
		context.restore();
	}
};

/**
 * WebGL渲染色调精灵（不支持）
 * Renders the tone sprite with WebGL (not supported)
 *
 * @memberof ToneSprite
 * @method _renderWebGL
 * @param {Object} renderer - 渲染器 - The renderer
 * @description 使用WebGL渲染器渲染色调精灵（当前不支持）
 * Renders the tone sprite using WebGL renderer (currently not supported)
 * @private
 */
ToneSprite.prototype._renderWebGL = function (renderer) {
	// Not supported
};

//-----------------------------------------------------------------------------
