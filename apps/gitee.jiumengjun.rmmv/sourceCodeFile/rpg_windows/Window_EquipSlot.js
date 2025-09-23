//=============================================================================
// Window_EquipSlot.js
//=============================================================================

//-----------------------------------------------------------------------------
// 窗口_装备槽
// Window_EquipSlot
//
// 在装备画面上的选择装备槽的窗口。
// The window for selecting an equipment slot on the equipment screen.

function Window_EquipSlot() {
	this.initialize.apply(this, arguments);
}

Window_EquipSlot.prototype = Object.create(Window_Selectable.prototype);
Window_EquipSlot.prototype.constructor = Window_EquipSlot;

/**
 * 初始化
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 * @param {number} width - 宽度 - Width
 * @param {number} height - 高度 - Height
 * Initialize
 */
Window_EquipSlot.prototype.initialize = function (x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._actor = null;
	this.refresh();
};

/**
 * 设置角色
 * @param {Game_Actor} actor - 角色对象 - Actor object
 * Set actor
 */
Window_EquipSlot.prototype.setActor = function (actor) {
	if (this._actor !== actor) {
		this._actor = actor;
		this.refresh();
	}
};

/**
 * 更新
 * Update
 */
Window_EquipSlot.prototype.update = function () {
	Window_Selectable.prototype.update.call(this);
	if (this._itemWindow) {
		this._itemWindow.setSlotId(this.index());
	}
};

/**
 * 最大项目数
 * @returns {number} 最大项目数 - Maximum items
 * Maximum items
 */
Window_EquipSlot.prototype.maxItems = function () {
	return this._actor ? this._actor.equipSlots().length : 0;
};

/**
 * 项目
 * @returns {RPG_EquipItem|null} 物品对象 - Item object
 * Item
 */
Window_EquipSlot.prototype.item = function () {
	return this._actor ? this._actor.equips()[this.index()] : null;
};

/**
 * 绘制项目
 * @param {number} index - 索引 - Index
 * Draw item
 */
Window_EquipSlot.prototype.drawItem = function (index) {
	if (this._actor) {
		var rect = this.itemRectForText(index);
		this.changeTextColor(this.systemColor());
		this.changePaintOpacity(this.isEnabled(index));
		this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
		this.drawItemName(this._actor.equips()[index], rect.x + 138, rect.y);
		this.changePaintOpacity(true);
	}
};

/**
 * 槽名
 * @param {number} index - 索引 - Index
 * @returns {string} 槽名称 - Slot name
 * Slot name
 */
Window_EquipSlot.prototype.slotName = function (index) {
	var slots = this._actor.equipSlots();
	return this._actor ? $dataSystem.equipTypes[slots[index]] : "";
};

/**
 * 是否启用
 * @param {number} index - 索引 - Index
 * @returns {boolean} 是否启用 - Whether enabled
 * Is enabled
 */
Window_EquipSlot.prototype.isEnabled = function (index) {
	return this._actor ? this._actor.isEquipChangeOk(index) : false;
};

/**
 * 是否当前项目启用
 * @returns {boolean} 是否当前项目启用 - Whether current item is enabled
 * Is current item enabled
 */
Window_EquipSlot.prototype.isCurrentItemEnabled = function () {
	return this.isEnabled(this.index());
};

/**
 * 设置状态窗口
 * @param {Window_EquipStatus} statusWindow - 状态窗口对象 - Status window object
 * Set status window
 */
Window_EquipSlot.prototype.setStatusWindow = function (statusWindow) {
	this._statusWindow = statusWindow;
	this.callUpdateHelp();
};

/**
 * 设置项目窗口
 * @param {Window_EquipItem} itemWindow - 物品窗口对象 - Item window object
 * Set item window
 */
Window_EquipSlot.prototype.setItemWindow = function (itemWindow) {
	this._itemWindow = itemWindow;
};

/**
 * 更新帮助
 * Update help
 */
Window_EquipSlot.prototype.updateHelp = function () {
	Window_Selectable.prototype.updateHelp.call(this);
	this.setHelpWindowItem(this.item());
	if (this._statusWindow) {
		this._statusWindow.setTempActor(null);
	}
};
