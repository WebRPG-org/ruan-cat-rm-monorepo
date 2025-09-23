//=============================================================================
// Window_BattleStatus.js
//=============================================================================

//-----------------------------------------------------------------------------
// 窗口_战斗状态
// Window_BattleStatus
//
// 在战斗画面上的显示队伍成员状态的窗口。
// The window for displaying the status of party members on the battle screen.

function Window_BattleStatus() {
	this.initialize.apply(this, arguments);
}

Window_BattleStatus.prototype = Object.create(Window_Selectable.prototype);
Window_BattleStatus.prototype.constructor = Window_BattleStatus;

/**
 * 初始化
 * Initialize
 */
Window_BattleStatus.prototype.initialize = function () {
	var width = this.windowWidth();
	var height = this.windowHeight();
	var x = Graphics.boxWidth - width;
	var y = Graphics.boxHeight - height;
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.openness = 0;
};

/**
 * 窗口宽度
 * @returns {number} 窗口宽度 - Window width
 * Window width
 */
Window_BattleStatus.prototype.windowWidth = function () {
	return Graphics.boxWidth - 192;
};

/**
 * 窗口高度
 * @returns {number} 窗口高度 - Window height
 * Window height
 */
Window_BattleStatus.prototype.windowHeight = function () {
	return this.fittingHeight(this.numVisibleRows());
};

/**
 * 可见的行数
 * @returns {number} 可见行数 - Number of visible rows
 * Number of visible rows
 */
Window_BattleStatus.prototype.numVisibleRows = function () {
	return 4;
};

/**
 * 最大项目数
 * @returns {number} 最大项目数 - Maximum items
 * Maximum items
 */
Window_BattleStatus.prototype.maxItems = function () {
	return $gameParty.battleMembers().length;
};

/**
 * 刷新
 * Refresh
 */
Window_BattleStatus.prototype.refresh = function () {
	this.contents.clear();
	this.drawAllItems();
};

/**
 * 绘制项目
 * @param {number} index - 索引 - Index
 * Draw item
 */
Window_BattleStatus.prototype.drawItem = function (index) {
	var actor = $gameParty.battleMembers()[index];
	this.drawBasicArea(this.basicAreaRect(index), actor);
	this.drawGaugeArea(this.gaugeAreaRect(index), actor);
};

/**
 * 基础区域矩形
 * @param {number} index - 索引 - Index
 * @returns {Object} 基础区域矩形对象 - Basic area rectangle object
 * Basic area rectangle
 */
Window_BattleStatus.prototype.basicAreaRect = function (index) {
	var rect = this.itemRectForText(index);
	rect.width -= this.gaugeAreaWidth() + 15;
	return rect;
};

/**
 * 计量区域矩形
 * @param {number} index - 索引 - Index
 * @returns {Object} 计量区域矩形对象 - Gauge area rectangle object
 * Gauge area rectangle
 */
Window_BattleStatus.prototype.gaugeAreaRect = function (index) {
	var rect = this.itemRectForText(index);
	rect.x += rect.width - this.gaugeAreaWidth();
	rect.width = this.gaugeAreaWidth();
	return rect;
};

/**
 * 计量区域宽
 * @returns {number} 计量区域宽度 - Gauge area width
 * Gauge area width
 */
Window_BattleStatus.prototype.gaugeAreaWidth = function () {
	return 330;
};

/**
 * 绘制基础区域
 * @param {Object} rect - 矩形区域对象 - Rectangle object
 * @param {Game_Actor} actor - 角色对象 - Actor object
 * Draw basic area
 */
Window_BattleStatus.prototype.drawBasicArea = function (rect, actor) {
	this.drawActorName(actor, rect.x + 0, rect.y, 150);
	this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 156);
};

/**
 * 绘制计量区域
 * @param {Object} rect - 矩形区域对象 - Rectangle object
 * @param {Game_Actor} actor - 角色对象 - Actor object
 * Draw gauge area
 */
Window_BattleStatus.prototype.drawGaugeArea = function (rect, actor) {
	if ($dataSystem.optDisplayTp) {
		this.drawGaugeAreaWithTp(rect, actor);
	} else {
		this.drawGaugeAreaWithoutTp(rect, actor);
	}
};

/**
 * 绘制有 TP 的计量区域
 * @param {Object} rect - 矩形区域对象 - Rectangle object
 * @param {Game_Actor} actor - 角色对象 - Actor object
 * Draw gauge area with TP
 */
Window_BattleStatus.prototype.drawGaugeAreaWithTp = function (rect, actor) {
	this.drawActorHp(actor, rect.x + 0, rect.y, 108);
	this.drawActorMp(actor, rect.x + 123, rect.y, 96);
	this.drawActorTp(actor, rect.x + 234, rect.y, 96);
};

/**
 * 绘制没有 TP 的计量区域
 * @param {Object} rect - 矩形区域对象 - Rectangle object
 * @param {Game_Actor} actor - 角色对象 - Actor object
 * Draw gauge area without TP
 */
Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function (rect, actor) {
	this.drawActorHp(actor, rect.x + 0, rect.y, 201);
	this.drawActorMp(actor, rect.x + 216, rect.y, 114);
};
