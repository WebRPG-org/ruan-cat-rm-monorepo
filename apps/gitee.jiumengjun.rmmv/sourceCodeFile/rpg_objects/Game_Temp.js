/**
 * @fileoverview Game_Temp - 游戏临时数据对象类
 * @description 负责管理游戏中不包含在存档数据中的临时数据
 * @author 原作者未知
 * @since 1.0.0
 */

/**
 * 游戏_临时
 * Game_Temp
 *
 * 临时数据（不包含存档数据）的游戏对象类。
 * The game object class for temporary data that is not included in save data.
 *
 * @class Game_Temp
 * @description 管理游戏中的临时数据，包括测试模式、公共事件、目的地坐标等
 */

/**
 * Game_Temp constructor
 * @constructor
 */
function Game_Temp() {
	this.initialize.apply(this, arguments);
}

/**
 * 初始化
 * Initialize the Game_Temp object
 *
 * @memberof Game_Temp
 * @method initialize
 * @description 初始化临时数据对象的所有属性
 */
Game_Temp.prototype.initialize = function () {
	this._isPlaytest = Utils.isOptionValid("test"); // 是否玩家测试 | Whether in playtest mode
	this._commonEventId = 0; // 公共事件 ID | Common event ID
	this._destinationX = null; // 目的地 X 坐标 | Destination X coordinate
	this._destinationY = null; // 目的地 Y 坐标 | Destination Y coordinate
};

/**
 * 是否玩家测试
 * Check if in playtest mode
 *
 * @memberof Game_Temp
 * @method isPlaytest
 * @returns {boolean} 如果是玩家测试模式返回true - True if in playtest mode
 * @description 检查当前是否为玩家测试模式
 */
Game_Temp.prototype.isPlaytest = function () {
	return this._isPlaytest;
};

/**
 * 储存公共事件
 * Reserve a common event
 *
 * @memberof Game_Temp
 * @method reserveCommonEvent
 * @param {number} commonEventId - 公共事件ID - Common event ID
 * @description 储存指定ID的公共事件
 */
Game_Temp.prototype.reserveCommonEvent = function (commonEventId) {
	this._commonEventId = commonEventId;
};

/**
 * 清除公共事件
 * Clear the reserved common event
 *
 * @memberof Game_Temp
 * @method clearCommonEvent
 * @description 清除已储存的公共事件
 */
Game_Temp.prototype.clearCommonEvent = function () {
	this._commonEventId = 0;
};

/**
 * 是否有公共事件储存
 * Check if a common event is reserved
 *
 * @memberof Game_Temp
 * @method isCommonEventReserved
 * @returns {boolean} 如果有公共事件被储存返回true - True if a common event is reserved
 * @description 检查是否有公共事件被储存
 */
Game_Temp.prototype.isCommonEventReserved = function () {
	return this._commonEventId > 0;
};

/**
 * 储存的公共事件
 * Get the reserved common event
 *
 * @memberof Game_Temp
 * @method reservedCommonEvent
 * @returns {Object} 储存的公共事件数据 - The reserved common event data
 * @description 获取已储存的公共事件数据
 */
Game_Temp.prototype.reservedCommonEvent = function () {
	return $dataCommonEvents[this._commonEventId];
};

/**
 * 设置目的地
 * Set the destination coordinates
 *
 * @memberof Game_Temp
 * @method setDestination
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 * @description 设置目的地坐标
 */
Game_Temp.prototype.setDestination = function (x, y) {
	this._destinationX = x;
	this._destinationY = y;
};

/**
 * 清除目的地
 * Clear the destination
 *
 * @memberof Game_Temp
 * @method clearDestination
 * @description 清除目的地坐标
 */
Game_Temp.prototype.clearDestination = function () {
	this._destinationX = null;
	this._destinationY = null;
};

/**
 * 是否目的地有效
 * Check if the destination is valid
 *
 * @memberof Game_Temp
 * @method isDestinationValid
 * @returns {boolean} 如果目的地有效返回true - True if destination is valid
 * @description 检查目的地是否有效
 */
Game_Temp.prototype.isDestinationValid = function () {
	return this._destinationX !== null;
};

/**
 * 目的地 X 坐标
 * Get destination X coordinate
 *
 * @memberof Game_Temp
 * @method destinationX
 * @returns {number|null} 目的地X坐标 - The destination X coordinate
 * @description 获取目的地X坐标
 */
Game_Temp.prototype.destinationX = function () {
	return this._destinationX;
};

/**
 * 目的地 Y 坐标
 * Get destination Y coordinate
 *
 * @memberof Game_Temp
 * @method destinationY
 * @returns {number|null} 目的地Y坐标 - The destination Y coordinate
 * @description 获取目的地Y坐标
 */
Game_Temp.prototype.destinationY = function () {
	return this._destinationY;
};
