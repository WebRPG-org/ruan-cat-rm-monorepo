//=============================================================================
// Sprite_Picture.js
//=============================================================================

/**
 * 精灵_图片
 * 显示图片的精灵。
 * Sprite_Picture
 * The sprite for displaying a picture.
 */
function Sprite_Picture() {
	this.initialize.apply(this, arguments);
}
Sprite_Picture.prototype = Object.create(Sprite.prototype);
Sprite_Picture.prototype.constructor = Sprite_Picture;
/**
 * 初始化
 * @param {number} pictureId - 图片ID - Picture ID
 * Initialize
 */
Sprite_Picture.prototype.initialize = function (pictureId) {
	Sprite.prototype.initialize.call(this);
	this._pictureId = pictureId;
	this._pictureName = "";
	this._isPicture = true;
	this.update();
};
/**
 * 图片
 * @returns {Object} 图片对象 - Picture object
 * Picture
 */
Sprite_Picture.prototype.picture = function () {
	return $gameScreen.picture(this._pictureId);
};
/**
 * 更新
 * Update
 */
Sprite_Picture.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.updateBitmap();
	if (this.visible) {
		this.updateOrigin();
		this.updatePosition();
		this.updateScale();
		this.updateTone();
		this.updateOther();
	}
};
/**
 * 更新位图
 * Update bitmap
 */
Sprite_Picture.prototype.updateBitmap = function () {
	var picture = this.picture();
	if (picture) {
		var pictureName = picture.name();
		if (this._pictureName !== pictureName) {
			this._pictureName = pictureName;
			this.loadBitmap();
		}
		this.visible = true;
	} else {
		this._pictureName = "";
		this.bitmap = null;
		this.visible = false;
	}
};
/**
 * 更新起始
 * Update origin
 */
Sprite_Picture.prototype.updateOrigin = function () {
	var picture = this.picture();
	if (picture.origin() === 0) {
		this.anchor.x = 0;
		this.anchor.y = 0;
	} else {
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
	}
};
/**
 * 更新位置
 * Update position
 */
Sprite_Picture.prototype.updatePosition = function () {
	var picture = this.picture();
	this.x = Math.floor(picture.x());
	this.y = Math.floor(picture.y());
};
/**
 * 更新缩放
 * Update scale
 */
Sprite_Picture.prototype.updateScale = function () {
	var picture = this.picture();
	this.scale.x = picture.scaleX() / 100;
	this.scale.y = picture.scaleY() / 100;
};
/**
 * 更新色调
 * Update tone
 */
Sprite_Picture.prototype.updateTone = function () {
	var picture = this.picture();
	if (picture.tone()) {
		this.setColorTone(picture.tone());
	} else {
		this.setColorTone([0, 0, 0, 0]);
	}
};
/**
 * 更新其它
 * Update other
 */
Sprite_Picture.prototype.updateOther = function () {
	var picture = this.picture();
	this.opacity = picture.opacity();
	this.blendMode = picture.blendMode();
	this.rotation = (picture.angle() * Math.PI) / 180;
};
/**
 * 加载位图
 * Load bitmap
 */
Sprite_Picture.prototype.loadBitmap = function () {
	this.bitmap = ImageManager.loadPicture(this._pictureName);
};
