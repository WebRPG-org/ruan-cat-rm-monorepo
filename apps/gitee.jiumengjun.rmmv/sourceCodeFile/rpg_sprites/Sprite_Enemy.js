//=============================================================================
// Sprite_Enemy.js
//=============================================================================

/**
 * 精灵_敌人
 * 显示敌人的精灵。
 * Sprite_Enemy
 * The sprite for displaying an enemy.
 */
function Sprite_Enemy() {
	this.initialize.apply(this, arguments);
}
Sprite_Enemy.prototype = Object.create(Sprite_Battler.prototype);
Sprite_Enemy.prototype.constructor = Sprite_Enemy;
/**
 * 初始化
 * @param {Object} battler - 战斗者对象 - Battler object
 * Initialize
 */
Sprite_Enemy.prototype.initialize = function (battler) {
	Sprite_Battler.prototype.initialize.call(this, battler);
};
/**
 * 初始化成员
 * Initialize members
 */
Sprite_Enemy.prototype.initMembers = function () {
	Sprite_Battler.prototype.initMembers.call(this);
	this._enemy = null;
	this._appeared = false;
	this._battlerName = "";
	this._battlerHue = 0;
	this._effectType = null;
	this._effectDuration = 0;
	this._shake = 0;
	this.createStateIconSprite();
};
/**
 * 创建状态图标精灵
 * Create state icon sprite
 */
Sprite_Enemy.prototype.createStateIconSprite = function () {
	this._stateIconSprite = new Sprite_StateIcon();
	this.addChild(this._stateIconSprite);
};
/**
 * 设置战斗者
 * @param {Object} battler - 战斗者对象 - Battler object
 * Set battler
 */
Sprite_Enemy.prototype.setBattler = function (battler) {
	Sprite_Battler.prototype.setBattler.call(this, battler);
	this._enemy = battler;
	this.setHome(battler.screenX(), battler.screenY());
	this._stateIconSprite.setup(battler);
};
/**
 * 更新
 * Update
 */
Sprite_Enemy.prototype.update = function () {
	Sprite_Battler.prototype.update.call(this);
	if (this._enemy) {
		this.updateEffect();
		this.updateStateSprite();
	}
};
/**
 * 更新位图
 * Update bitmap
 */
Sprite_Enemy.prototype.updateBitmap = function () {
	Sprite_Battler.prototype.updateBitmap.call(this);
	var name = this._enemy.battlerName();
	var hue = this._enemy.battlerHue();
	if (this._battlerName !== name || this._battlerHue !== hue) {
		this._battlerName = name;
		this._battlerHue = hue;
		this.loadBitmap(name, hue);
		this.initVisibility();
	}
};
/**
 * 加载位图
 * @param {string} name - 名称 - Name
 * @param {number} hue - 色调 - Hue
 * Load bitmap
 */
Sprite_Enemy.prototype.loadBitmap = function (name, hue) {
	if ($gameSystem.isSideView()) {
		this.bitmap = ImageManager.loadSvEnemy(name, hue);
	} else {
		this.bitmap = ImageManager.loadEnemy(name, hue);
	}
};
/**
 * 更新帧
 * Update frame
 */
Sprite_Enemy.prototype.updateFrame = function () {
	Sprite_Battler.prototype.updateFrame.call(this);
	var frameHeight = this.bitmap.height;
	if (this._effectType === "bossCollapse") {
		frameHeight = this._effectDuration;
	}
	this.setFrame(0, 0, this.bitmap.width, frameHeight);
};
/**
 * 更新位置
 * Update position
 */
Sprite_Enemy.prototype.updatePosition = function () {
	Sprite_Battler.prototype.updatePosition.call(this);
	this.x += this._shake;
};
/**
 * 更新状态精灵
 * Update state sprite
 */
Sprite_Enemy.prototype.updateStateSprite = function () {
	this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
	if (this._stateIconSprite.y < 20 - this.y) {
		this._stateIconSprite.y = 20 - this.y;
	}
};
/**
 * 初始化可见性
 * Initialize visibility
 */
Sprite_Enemy.prototype.initVisibility = function () {
	this._appeared = this._enemy.isAlive();
	if (!this._appeared) {
		this.opacity = 0;
	}
};
/**
 * 设置效果
 * Setup effect
 */
Sprite_Enemy.prototype.setupEffect = function () {
	if (this._appeared && this._enemy.isEffectRequested()) {
		this.startEffect(this._enemy.effectType());
		this._enemy.clearEffect();
	}
	if (!this._appeared && this._enemy.isAlive()) {
		this.startEffect("appear");
	} else if (this._appeared && this._enemy.isHidden()) {
		this.startEffect("disappear");
	}
};
/**
 * 开始效果
 * @param {string} effectType - 效果类型 - Effect type
 * Start effect
 */
Sprite_Enemy.prototype.startEffect = function (effectType) {
	this._effectType = effectType;
	switch (this._effectType) {
		case "appear": // 出现
			this.startAppear();
			break;
		case "disappear": // 消失
			this.startDisappear();
			break;
		case "whiten": // 变白
			this.startWhiten();
			break;
		case "blink": // 闪烁
			this.startBlink();
			break;
		case "collapse": // 倒下（消失效果-正常）
			this.startCollapse();
			break;
		case "bossCollapse": // BOSS倒下（消失效果-BOSS）
			this.startBossCollapse();
			break;
		case "instantCollapse": // 瞬间倒下（消失效果-瞬间消失）
			this.startInstantCollapse();
			break;
	}
	this.revertToNormal();
};
/**
 * 开始出现
 * Start appear
 */
Sprite_Enemy.prototype.startAppear = function () {
	this._effectDuration = 16;
	this._appeared = true;
};
/**
 * 开始消失
 * Start disappear
 */
Sprite_Enemy.prototype.startDisappear = function () {
	this._effectDuration = 32;
	this._appeared = false;
};
/**
 * 开始变白
 * Start whiten
 */
Sprite_Enemy.prototype.startWhiten = function () {
	this._effectDuration = 16;
};
/**
 * 开始闪烁
 * Start blink
 */
Sprite_Enemy.prototype.startBlink = function () {
	this._effectDuration = 20;
};
/**
 * 开始倒下
 * Start collapse
 */
Sprite_Enemy.prototype.startCollapse = function () {
	this._effectDuration = 32;
	this._appeared = false;
};
/**
 * 开始 BOSS 倒下
 * Start boss collapse
 */
Sprite_Enemy.prototype.startBossCollapse = function () {
	this._effectDuration = this.bitmap.height;
	this._appeared = false;
};
/**
 * 开始瞬间倒下
 * Start instant collapse
 */
Sprite_Enemy.prototype.startInstantCollapse = function () {
	this._effectDuration = 16;
	this._appeared = false;
};
/**
 * 更新效果
 * Update effect
 */
Sprite_Enemy.prototype.updateEffect = function () {
	this.setupEffect();
	if (this._effectDuration > 0) {
		this._effectDuration--;
		switch (this._effectType) {
			case "whiten":
				this.updateWhiten();
				break;
			case "blink":
				this.updateBlink();
				break;
			case "appear":
				this.updateAppear();
				break;
			case "disappear":
				this.updateDisappear();
				break;
			case "collapse":
				this.updateCollapse();
				break;
			case "bossCollapse":
				this.updateBossCollapse();
				break;
			case "instantCollapse":
				this.updateInstantCollapse();
				break;
		}
		if (this._effectDuration === 0) {
			this._effectType = null;
		}
	}
};
/**
 * 是否效果中
 * @returns {boolean} 是否正在效果中 - Whether is effecting
 * Is effecting
 */
Sprite_Enemy.prototype.isEffecting = function () {
	return this._effectType !== null;
};
/**
 * 回到普通
 * Revert to normal
 */
Sprite_Enemy.prototype.revertToNormal = function () {
	this._shake = 0;
	this.blendMode = 0;
	this.opacity = 255;
	this.setBlendColor([0, 0, 0, 0]);
};
/**
 * 更新变白
 * Update whiten
 */
Sprite_Enemy.prototype.updateWhiten = function () {
	var alpha = 128 - (16 - this._effectDuration) * 10;
	this.setBlendColor([255, 255, 255, alpha]);
};
/**
 * 更新闪烁
 * Update blink
 */
Sprite_Enemy.prototype.updateBlink = function () {
	this.opacity = this._effectDuration % 10 < 5 ? 255 : 0;
};
/**
 * 更新出现
 * Update appear
 */
Sprite_Enemy.prototype.updateAppear = function () {
	this.opacity = (16 - this._effectDuration) * 16;
};
/**
 * 更新消失
 * Update disappear
 */
Sprite_Enemy.prototype.updateDisappear = function () {
	this.opacity = 256 - (32 - this._effectDuration) * 10;
};
/**
 * 更新倒下
 * Update collapse
 */
Sprite_Enemy.prototype.updateCollapse = function () {
	this.blendMode = Graphics.BLEND_ADD;
	this.setBlendColor([255, 128, 128, 128]);
	this.opacity *= this._effectDuration / (this._effectDuration + 1);
};
/**
 * 更新 BOSS 倒下
 * Update boss collapse
 */
Sprite_Enemy.prototype.updateBossCollapse = function () {
	this._shake = (this._effectDuration % 2) * 4 - 2;
	this.blendMode = Graphics.BLEND_ADD;
	this.opacity *= this._effectDuration / (this._effectDuration + 1);
	this.setBlendColor([255, 255, 255, 255 - this.opacity]);
	if (this._effectDuration % 20 === 19) {
		SoundManager.playBossCollapse2();
	}
};
/**
 * 更新瞬间倒下
 * Update instant collapse
 */
Sprite_Enemy.prototype.updateInstantCollapse = function () {
	this.opacity = 0;
};
/**
 * 伤害的偏移坐标 X
 * @returns {number} 伤害的偏移坐标X - Damage offset X
 * Damage offset X
 */
Sprite_Enemy.prototype.damageOffsetX = function () {
	return 0;
};
/**
 * 伤害的偏移坐标 Y
 * @returns {number} 伤害的偏移坐标Y - Damage offset Y
 * Damage offset Y
 */
Sprite_Enemy.prototype.damageOffsetY = function () {
	return -8;
};
