/**
 * @fileoverview Game_Vehicle - 游戏载具对象类
 * @description 负责管理游戏中的载具功能，包括小舟、大船和飞艇
 * @author 原作者未知
 * @since 1.0.0
 */

/**
 * 游戏载具类
 * Game_Vehicle
 *
 * 载具的游戏对象类。
 * The game object class for a vehicle.
 *
 * @class Game_Vehicle
 * @extends Game_Character
 * @description 管理游戏中的载具，包括小舟、大船和飞艇的移动和状态
 */
function Game_Vehicle() {
	this.initialize.apply(this, arguments);
}

Game_Vehicle.prototype = Object.create(Game_Character.prototype);
Game_Vehicle.prototype.constructor = Game_Vehicle;

/**
 * 初始化
 * Initialize the Game_Vehicle object
 *
 * @memberof Game_Vehicle
 * @method initialize
 * @param {string} type - 载具类型（boat/ship/airship）
 * @description 初始化载具对象并设置基本属性
 */
Game_Vehicle.prototype.initialize = function (type) {
	Game_Character.prototype.initialize.call(this);
	this._type = type;
	this.resetDirection();
	this.initMoveSpeed();
	this.loadSystemSettings();
};

/**
 * 初始化成员
 * Initialize members
 *
 * @memberof Game_Vehicle
 * @method initMembers
 * @description 初始化载具的所有成员变量
 */
Game_Vehicle.prototype.initMembers = function () {
	Game_Character.prototype.initMembers.call(this);
	this._type = "";
	this._mapId = 0;
	this._altitude = 0;
	this._driving = false;
	this._bgm = null;
};

/**
 * 是否是小舟
 * Check if vehicle is boat
 *
 * @memberof Game_Vehicle
 * @method isBoat
 * @returns {boolean} 如果是小舟返回true
 * @description 检查载具是否为小舟
 */
Game_Vehicle.prototype.isBoat = function () {
	return this._type === "boat";
};

/**
 * 是否是大船
 * Check if vehicle is ship
 *
 * @memberof Game_Vehicle
 * @method isShip
 * @returns {boolean} 如果是大船返回true
 * @description 检查载具是否为大船
 */
Game_Vehicle.prototype.isShip = function () {
	return this._type === "ship";
};

/**
 * 是否是飞艇
 * Check if vehicle is airship
 *
 * @memberof Game_Vehicle
 * @method isAirship
 * @returns {boolean} 如果是飞艇返回true
 * @description 检查载具是否为飞艇
 */
Game_Vehicle.prototype.isAirship = function () {
	return this._type === "airship";
};

/**
 * 重置方向
 * Reset direction
 *
 * @memberof Game_Vehicle
 * @method resetDirection
 * @description 重置载具的朝向为默认方向
 */
Game_Vehicle.prototype.resetDirection = function () {
	this.setDirection(4);
};

/**
 * 初始化移动速度
 * Initialize move speed
 *
 * @memberof Game_Vehicle
 * @method initMoveSpeed
 * @description 根据载具类型初始化移动速度
 */
Game_Vehicle.prototype.initMoveSpeed = function () {
	if (this.isBoat()) {
		this.setMoveSpeed(4);
	} else if (this.isShip()) {
		this.setMoveSpeed(5);
	} else if (this.isAirship()) {
		this.setMoveSpeed(6);
	}
};

/**
 * 获取载具
 * Get vehicle
 *
 * @memberof Game_Vehicle
 * @method vehicle
 * @returns {object|null} 载具系统数据对象
 * @description 获取当前载具的系统数据
 */
Game_Vehicle.prototype.vehicle = function () {
	if (this.isBoat()) {
		return $dataSystem.boat;
	} else if (this.isShip()) {
		return $dataSystem.ship;
	} else if (this.isAirship()) {
		return $dataSystem.airship;
	} else {
		return null;
	}
};

/**
 * 读取系统设置
 * Load system settings
 *
 * @memberof Game_Vehicle
 * @method loadSystemSettings
 * @description 从系统数据中加载载具的初始设置
 */
Game_Vehicle.prototype.loadSystemSettings = function () {
	var vehicle = this.vehicle();
	this._mapId = vehicle.startMapId;
	this.setPosition(vehicle.startX, vehicle.startY);
	this.setImage(vehicle.characterName, vehicle.characterIndex);
};

/**
 * 刷新
 * Refresh vehicle
 *
 * @memberof Game_Vehicle
 * @method refresh
 * @description 刷新载具的状态和显示属性
 */
Game_Vehicle.prototype.refresh = function () {
	if (this._driving) {
		this._mapId = $gameMap.mapId();
		this.syncWithPlayer();
	} else if (this._mapId === $gameMap.mapId()) {
		this.locate(this.x, this.y);
	}
	if (this.isAirship()) {
		this.setPriorityType(this._driving ? 2 : 0);
	} else {
		this.setPriorityType(1);
	}
	this.setWalkAnime(this._driving);
	this.setStepAnime(this._driving);
	this.setTransparent(this._mapId !== $gameMap.mapId());
};

/**
 * 设置位置
 * Set location
 *
 * @memberof Game_Vehicle
 * @method setLocation
 * @param {number} mapId - 地图ID
 * @param {number} x - X坐标
 * @param {number} y - Y坐标
 * @description 设置载具的位置并刷新状态
 */
Game_Vehicle.prototype.setLocation = function (mapId, x, y) {
	this._mapId = mapId;
	this.setPosition(x, y);
	this.refresh();
};

/**
 * 检查位置
 * Check position
 *
 * @memberof Game_Vehicle
 * @method pos
 * @param {number} x - X坐标
 * @param {number} y - Y坐标
 * @returns {boolean} 是否在指定位置
 * @description 检查载具是否在指定位置（仅在同一地图时有效）
 */
Game_Vehicle.prototype.pos = function (x, y) {
	if (this._mapId === $gameMap.mapId()) {
		return Game_Character.prototype.pos.call(this, x, y);
	} else {
		return false;
	}
};

/**
 * 是否地图可通行
 * Check if map is passable
 *
 * @memberof Game_Vehicle
 * @method isMapPassable
 * @param {number} x - X坐标
 * @param {number} y - Y坐标
 * @param {number} d - 方向
 * @returns {boolean} 是否可通行
 * @description 检查载具是否可以在指定方向通行
 */
Game_Vehicle.prototype.isMapPassable = function (x, y, d) {
	var x2 = $gameMap.roundXWithDirection(x, d);
	var y2 = $gameMap.roundYWithDirection(y, d);
	if (this.isBoat()) {
		return $gameMap.isBoatPassable(x2, y2);
	} else if (this.isShip()) {
		return $gameMap.isShipPassable(x2, y2);
	} else if (this.isAirship()) {
		return true;
	} else {
		return false;
	}
};

/**
 * 上载具
 * Get on vehicle
 *
 * @memberof Game_Vehicle
 * @method getOn
 * @description 玩家登上载具时的处理
 */
Game_Vehicle.prototype.getOn = function () {
	this._driving = true;
	this.setWalkAnime(true);
	this.setStepAnime(true);
	$gameSystem.saveWalkingBgm();
	this.playBgm();
};

/**
 * 下载具
 * Get off vehicle
 *
 * @memberof Game_Vehicle
 * @method getOff
 * @description 玩家离开载具时的处理
 */
Game_Vehicle.prototype.getOff = function () {
	this._driving = false;
	this.setWalkAnime(false);
	this.setStepAnime(false);
	this.resetDirection();
	$gameSystem.replayWalkingBgm();
};

/**
 * 设置 BGM
 * Set BGM
 *
 * @memberof Game_Vehicle
 * @method setBgm
 * @param {object} bgm - 背景音乐对象
 * @description 设置载具的背景音乐
 */
Game_Vehicle.prototype.setBgm = function (bgm) {
	this._bgm = bgm;
};

/**
 * 播放 BGM
 * Play BGM
 *
 * @memberof Game_Vehicle
 * @method playBgm
 * @description 播放载具的背景音乐
 */
Game_Vehicle.prototype.playBgm = function () {
	AudioManager.playBgm(this._bgm || this.vehicle().bgm);
};

/**
 * 同步玩家
 * Sync with player
 *
 * @memberof Game_Vehicle
 * @method syncWithPlayer
 * @description 将载具位置与玩家同步
 */
Game_Vehicle.prototype.syncWithPlayer = function () {
	this.copyPosition($gamePlayer);
	this.refreshBushDepth();
};

/**
 * 画面 Y 坐标
 * Screen Y coordinate
 *
 * @memberof Game_Vehicle
 * @method screenY
 * @returns {number} 画面Y坐标
 * @description 获取载具的屏幕Y坐标（减去高度）
 */
Game_Vehicle.prototype.screenY = function () {
	return Game_Character.prototype.screenY.call(this) - this._altitude;
};

/**
 * 影子 X 坐标
 * Shadow X coordinate
 *
 * @memberof Game_Vehicle
 * @method shadowX
 * @returns {number} 影子X坐标
 * @description 获取载具影子的屏幕X坐标
 */
Game_Vehicle.prototype.shadowX = function () {
	return this.screenX();
};

/**
 * 影子 Y 坐标
 * Shadow Y coordinate
 *
 * @memberof Game_Vehicle
 * @method shadowY
 * @returns {number} 影子Y坐标
 * @description 获取载具影子的屏幕Y坐标
 */
Game_Vehicle.prototype.shadowY = function () {
	return this.screenY() + this._altitude;
};

/**
 * 影子不透明度
 * Shadow opacity
 *
 * @memberof Game_Vehicle
 * @method shadowOpacity
 * @returns {number} 影子不透明度
 * @description 根据高度计算影子的不透明度
 */
Game_Vehicle.prototype.shadowOpacity = function () {
	return (255 * this._altitude) / this.maxAltitude();
};

/**
 * 是否可移动
 * Check if can move
 *
 * @memberof Game_Vehicle
 * @method canMove
 * @returns {boolean} 是否可移动
 * @description 检查载具是否可以移动（飞艇需要达到最高高度）
 */
Game_Vehicle.prototype.canMove = function () {
	if (this.isAirship()) {
		return this.isHighest();
	} else {
		return true;
	}
};

/**
 * 更新
 * Update vehicle
 *
 * @memberof Game_Vehicle
 * @method update
 * @description 更新载具的状态
 */
Game_Vehicle.prototype.update = function () {
	Game_Character.prototype.update.call(this);
	if (this.isAirship()) {
		this.updateAirship();
	}
};

/**
 * 更新飞艇
 * Update airship
 *
 * @memberof Game_Vehicle
 * @method updateAirship
 * @description 更新飞艇的特殊状态
 */
Game_Vehicle.prototype.updateAirship = function () {
	this.updateAirshipAltitude();
	this.setStepAnime(this.isHighest());
	this.setPriorityType(this.isLowest() ? 0 : 2);
};

/**
 * 更新飞艇高度
 * Update airship altitude
 *
 * @memberof Game_Vehicle
 * @method updateAirshipAltitude
 * @description 更新飞艇的飞行高度
 */
Game_Vehicle.prototype.updateAirshipAltitude = function () {
	if (this._driving && !this.isHighest()) {
		this._altitude++;
	}
	if (!this._driving && !this.isLowest()) {
		this._altitude--;
	}
};

/**
 * 最大高度
 * Max altitude
 *
 * @memberof Game_Vehicle
 * @method maxAltitude
 * @returns {number} 最大高度
 * @description 获取飞艇的最大飞行高度
 */
Game_Vehicle.prototype.maxAltitude = function () {
	return 48;
};

/**
 * 是否最低
 * Check if lowest
 *
 * @memberof Game_Vehicle
 * @method isLowest
 * @returns {boolean} 是否在最低高度
 * @description 检查飞艇是否在最低高度
 */
Game_Vehicle.prototype.isLowest = function () {
	return this._altitude <= 0;
};

/**
 * 是否最高
 * Check if highest
 *
 * @memberof Game_Vehicle
 * @method isHighest
 * @returns {boolean} 是否在最高高度
 * @description 检查飞艇是否在最高高度
 */
Game_Vehicle.prototype.isHighest = function () {
	return this._altitude >= this.maxAltitude();
};

/**
 * 是否可以起飞
 * Check if takeoff is ok
 *
 * @memberof Game_Vehicle
 * @method isTakeoffOk
 * @returns {boolean} 是否可以起飞
 * @description 检查飞艇是否可以起飞（需要跟随者集合）
 */
Game_Vehicle.prototype.isTakeoffOk = function () {
	return $gamePlayer.areFollowersGathered();
};

/**
 * 是否陆地可下载具
 * Check if land is ok
 *
 * @memberof Game_Vehicle
 * @method isLandOk
 * @param {number} x - X坐标
 * @param {number} y - Y坐标
 * @param {number} d - 方向
 * @returns {boolean} 是否可以着陆
 * @description 检查载具是否可以在指定位置着陆
 */
Game_Vehicle.prototype.isLandOk = function (x, y, d) {
	if (this.isAirship()) {
		if (!$gameMap.isAirshipLandOk(x, y)) {
			return false;
		}
		if ($gameMap.eventsXy(x, y).length > 0) {
			return false;
		}
	} else {
		var x2 = $gameMap.roundXWithDirection(x, d);
		var y2 = $gameMap.roundYWithDirection(y, d);
		if (!$gameMap.isValid(x2, y2)) {
			return false;
		}
		if (!$gameMap.isPassable(x2, y2, this.reverseDir(d))) {
			return false;
		}
		if (this.isCollidedWithCharacters(x2, y2)) {
			return false;
		}
	}
	return true;
};
