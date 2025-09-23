//=============================================================================
// Weather.js
//=============================================================================

/**
 * @fileoverview 天气效果类，用于显示雨、暴风雨或雪的天气效果。
 * Weather effect class for displaying rain, storm, or snow effects.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

/**
 * 显示雨、暴风雨或雪的天气效果。
 * The weather effect which displays rain, storm, or snow.
 *
 * @class Weather
 * @extends PIXI.Container
 * @memberof RPG
 * @description 天气效果类，用于显示雨、暴风雨或雪的天气效果。继承自 PIXI.Container。
 * Weather effect class for displaying rain, storm, or snow effects. Inherits from PIXI.Container.
 */
function Weather() {
	this.initialize.apply(this, arguments);
}

Weather.prototype = Object.create(PIXI.Container.prototype);
Weather.prototype.constructor = Weather;

/**
 * 初始化天气效果。
 * Initializes the weather effect.
 *
 * @memberof Weather
 * @method initialize
 * @description 初始化天气效果，创建所需的位图和调光精灵，设置默认属性值。
 * Initializes the weather effect, creates required bitmaps and dimmer sprite, sets default property values.
 */
Weather.prototype.initialize = function () {
	PIXI.Container.call(this);

	this._width = Graphics.width;
	this._height = Graphics.height;
	this._sprites = [];

	this._createBitmaps();
	this._createDimmer();

	/**
	 * 天气类型，可选值为 ['none', 'rain', 'storm', 'snow']。
	 * The type of the weather in ['none', 'rain', 'storm', 'snow'].
	 *
	 * @memberof Weather
	 * @property {String} type - 天气类型 Weather type
	 * @description 天气类型属性，用于设置当前显示的天气效果类型。
	 * Weather type property for setting the current weather effect type.
	 */
	this.type = "none";

	/**
	 * 天气强度，范围为 (0, 9)。
	 * The power of the weather in the range (0, 9).
	 *
	 * @memberof Weather
	 * @property {Number} power - 天气强度 Weather power
	 * @description 天气强度属性，用于控制天气效果的强度，值越大效果越明显。
	 * Weather power property for controlling the intensity of weather effects, larger values result in more pronounced effects.
	 */
	this.power = 0;

	/**
	 * 天气滚动的原点。
	 * The origin point of the weather for scrolling.
	 *
	 * @memberof Weather
	 * @property {Point} origin - 天气滚动原点 Weather scrolling origin
	 * @description 天气滚动原点属性，用于控制天气效果的滚动起点。
	 * Weather scrolling origin property for controlling the starting point of weather effect scrolling.
	 */
	this.origin = new Point();
};

/**
 * 每帧更新天气。
 * Updates the weather for each frame.
 *
 * @memberof Weather
 * @method update
 * @description 每帧更新天气效果，包括更新调光精灵和所有天气精灵。
 * Updates the weather effect for each frame, including updating the dimmer sprite and all weather sprites.
 * @returns {void} 无返回值 No return value
 */
Weather.prototype.update = function () {
	this._updateDimmer();
	this._updateAllSprites();
};

/**
 * 创建位图。
 * Creates the bitmaps.
 *
 * @memberof Weather
 * @method _createBitmaps
 * @private
 * @description 创建雨、暴风雨和雪的位图，用于渲染不同的天气效果。
 * Creates bitmaps for rain, storm, and snow effects for rendering different weather effects.
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._createBitmaps = function () {
	this._rainBitmap = new Bitmap(1, 60);
	this._rainBitmap.fillAll("white");
	this._stormBitmap = new Bitmap(2, 100);
	this._stormBitmap.fillAll("white");
	this._snowBitmap = new Bitmap(9, 9);
	this._snowBitmap.drawCircle(4, 4, 4, "white");
};

/**
 * 创建调光精灵。
 * Creates the dimmer sprite.
 *
 * @memberof Weather
 * @method _createDimmer
 * @private
 * @description 创建调光精灵，用于在天气效果中添加暗色调。
 * Creates a dimmer sprite for adding dark tones to weather effects.
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._createDimmer = function () {
	this._dimmerSprite = new ScreenSprite();
	this._dimmerSprite.setColor(80, 80, 80);
	this.addChild(this._dimmerSprite);
};

/**
 * 更新调光精灵。
 * Updates the dimmer sprite.
 *
 * @memberof Weather
 * @method _updateDimmer
 * @private
 * @description 更新调光精灵的透明度，根据天气强度调整暗色调的强度。
 * Updates the opacity of the dimmer sprite, adjusting the intensity of dark tones based on weather power.
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._updateDimmer = function () {
	this._dimmerSprite.opacity = Math.floor(this.power * 6);
};

/**
 * 更新所有精灵。
 * Updates all sprites.
 *
 * @memberof Weather
 * @method _updateAllSprites
 * @private
 * @description 更新所有天气精灵，根据天气强度调整精灵数量，更新每个精灵的位置和状态。
 * Updates all weather sprites, adjusts the number of sprites based on weather power, updates position and state of each sprite.
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._updateAllSprites = function () {
	var maxSprites = Math.floor(this.power * 10);
	while (this._sprites.length < maxSprites) {
		this._addSprite();
	}
	while (this._sprites.length > maxSprites) {
		this._removeSprite();
	}
	this._sprites.forEach(function (sprite) {
		this._updateSprite(sprite);
		sprite.x = sprite.ax - this.origin.x;
		sprite.y = sprite.ay - this.origin.y;
	}, this);
};

/**
 * 添加精灵。
 * Adds a sprite.
 *
 * @memberof Weather
 * @method _addSprite
 * @private
 * @description 添加一个新的天气精灵到精灵数组中，并设置初始透明度为0。
 * Adds a new weather sprite to the sprite array with initial opacity set to 0.
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._addSprite = function () {
	var sprite = new Sprite(this.viewport);
	sprite.opacity = 0;
	this._sprites.push(sprite);
	this.addChild(sprite);
};

/**
 * 移除精灵。
 * Removes a sprite.
 *
 * @memberof Weather
 * @method _removeSprite
 * @private
 * @description 从精灵数组中移除最后一个精灵，并从显示列表中删除。
 * Removes the last sprite from the sprite array and removes it from the display list.
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._removeSprite = function () {
	this.removeChild(this._sprites.pop());
};

/**
 * 更新精灵。
 * Updates a sprite.
 *
 * @memberof Weather
 * @method _updateSprite
 * @private
 * @description 根据当前天气类型更新精灵的状态和行为，当精灵透明度过低时重新生成。
 * Updates the sprite's state and behavior based on current weather type, rebirths the sprite when opacity is too low.
 * @param {Sprite} sprite - 要更新的精灵 The sprite to update
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._updateSprite = function (sprite) {
	switch (this.type) {
		case "rain":
			this._updateRainSprite(sprite);
			break;
		case "storm":
			this._updateStormSprite(sprite);
			break;
		case "snow":
			this._updateSnowSprite(sprite);
			break;
	}
	if (sprite.opacity < 40) {
		this._rebornSprite(sprite);
	}
};

/**
 * 更新雨精灵。
 * Updates a rain sprite.
 *
 * @memberof Weather
 * @method _updateRainSprite
 * @private
 * @description 更新雨精灵的位图、旋转角度、位置和透明度，模拟雨滴下落效果。
 * Updates the rain sprite's bitmap, rotation angle, position and opacity to simulate raindrop falling effect.
 * @param {Sprite} sprite - 要更新的雨精灵 The rain sprite to update
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._updateRainSprite = function (sprite) {
	sprite.bitmap = this._rainBitmap;
	sprite.rotation = Math.PI / 16;
	sprite.ax -= 6 * Math.sin(sprite.rotation);
	sprite.ay += 6 * Math.cos(sprite.rotation);
	sprite.opacity -= 6;
};

/**
 * 更新暴风雨精灵。
 * Updates a storm sprite.
 *
 * @memberof Weather
 * @method _updateStormSprite
 * @private
 * @description 更新暴风雨精灵的位图、旋转角度、位置和透明度，模拟暴风雨效果。
 * Updates the storm sprite's bitmap, rotation angle, position and opacity to simulate storm effect.
 * @param {Sprite} sprite - 要更新的暴风雨精灵 The storm sprite to update
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._updateStormSprite = function (sprite) {
	sprite.bitmap = this._stormBitmap;
	sprite.rotation = Math.PI / 8;
	sprite.ax -= 8 * Math.sin(sprite.rotation);
	sprite.ay += 8 * Math.cos(sprite.rotation);
	sprite.opacity -= 8;
};

/**
 * 更新雪精灵。
 * Updates a snow sprite.
 *
 * @memberof Weather
 * @method _updateSnowSprite
 * @private
 * @description 更新雪精灵的位图、旋转角度、位置和透明度，模拟雪花飘落效果。
 * Updates the snow sprite's bitmap, rotation angle, position and opacity to simulate snowflake falling effect.
 * @param {Sprite} sprite - 要更新的雪精灵 The snow sprite to update
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._updateSnowSprite = function (sprite) {
	sprite.bitmap = this._snowBitmap;
	sprite.rotation = Math.PI / 16;
	sprite.ax -= 3 * Math.sin(sprite.rotation);
	sprite.ay += 3 * Math.cos(sprite.rotation);
	sprite.opacity -= 3;
};

/**
 * 重生精灵。
 * Rebirths a sprite.
 *
 * @memberof Weather
 * @method _rebornSprite
 * @private
 * @description 重生精灵，重新设置精灵的位置和透明度，使其重新开始天气效果动画。
 * Rebirths the sprite, resets the sprite's position and opacity to restart the weather effect animation.
 * @param {Sprite} sprite - 要重生的精灵 The sprite to rebirth
 * @returns {void} 无返回值 No return value
 */
Weather.prototype._rebornSprite = function (sprite) {
	sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
	sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
	sprite.opacity = 160 + Math.randomInt(60);
};

//-----------------------------------------------------------------------------
