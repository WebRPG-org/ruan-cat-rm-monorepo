//=============================================================================
// Sprite_Balloon.js
//=============================================================================

/**
 * 精灵_气泡
 * 显示气泡图标的精灵。
 * Sprite_Balloon
 * The sprite for displaying a balloon icon.
 */
function Sprite_Balloon() {
	this.initialize.apply(this, arguments);
}
Sprite_Balloon.prototype = Object.create(Sprite_Base.prototype);
Sprite_Balloon.prototype.constructor = Sprite_Balloon;
/**
 * 初始化
 * Initialize
 */
Sprite_Balloon.prototype.initialize = function () {
	Sprite_Base.prototype.initialize.call(this);
	this.initMembers();
	this.loadBitmap();
};
/**
 * 初始化成员
 * Initialize members
 */
Sprite_Balloon.prototype.initMembers = function () {
	this._balloonId = 0;
	this._duration = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 1;
	this.z = 7;
};
/**
 * 加载位图
 * Load bitmap
 */
Sprite_Balloon.prototype.loadBitmap = function () {
	this.bitmap = ImageManager.loadSystem("Balloon");
	this.setFrame(0, 0, 0, 0);
};
/**
 * 设置
 * @param {number} balloonId - 气泡ID - Balloon ID
 * Setup
 */
Sprite_Balloon.prototype.setup = function (balloonId) {
	this._balloonId = balloonId;
	this._duration = 8 * this.speed() + this.waitTime();
};
/**
 * 更新
 * Update
 */
Sprite_Balloon.prototype.update = function () {
	Sprite_Base.prototype.update.call(this);
	if (this._duration > 0) {
		this._duration--;
		if (this._duration > 0) {
			this.updateFrame();
		}
	}
};
/**
 * 更新帧
 * Update frame
 */
Sprite_Balloon.prototype.updateFrame = function () {
	var w = 48;
	var h = 48;
	var sx = this.frameIndex() * w;
	var sy = (this._balloonId - 1) * h;
	this.setFrame(sx, sy, w, h);
};
/**
 * 速度
 * @returns {number} 速度 - Speed
 * Speed
 */
Sprite_Balloon.prototype.speed = function () {
	return 8;
};
/**
 * 等待时间
 * @returns {number} 等待时间 - Wait time
 * Wait time
 */
Sprite_Balloon.prototype.waitTime = function () {
	return 12;
};
/**
 * 帧索引
 * @returns {number} 帧索引 - Frame index
 * Frame index
 */
Sprite_Balloon.prototype.frameIndex = function () {
	var index = (this._duration - this.waitTime()) / this.speed();
	return 7 - Math.max(Math.floor(index), 0);
};
/**
 * 是否播放中
 * @returns {boolean} 是否正在播放 - Whether is playing
 * Is playing
 */
Sprite_Balloon.prototype.isPlaying = function () {
	return this._duration > 0;
};
