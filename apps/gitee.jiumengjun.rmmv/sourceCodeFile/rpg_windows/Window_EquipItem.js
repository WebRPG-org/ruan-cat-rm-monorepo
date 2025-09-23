//=============================================================================
// Window_EquipItem.js
//=============================================================================

//-----------------------------------------------------------------------------
// 窗口_装备物品
// Window_EquipItem
//
// 在装备画面上选择的装备物品的窗口。
// The window for selecting an equipment item on the equipment screen.

function Window_EquipItem() {
	this.initialize.apply(this, arguments);
}

Window_EquipItem.prototype = Object.create(Window_ItemList.prototype);
Window_EquipItem.prototype.constructor = Window_EquipItem;

/**
 * 初始化
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 * @param {number} width - 宽度 - Width
 * @param {number} height - 高度 - Height
 * Initialize
 */
Window_EquipItem.prototype.initialize = function (x, y, width, height) {
	Window_ItemList.prototype.initialize.call(this, x, y, width, height);
	this._actor = null;
	this._slotId = 0;
};

/**
 * 设置角色
 * @param {Game_Actor} actor - 角色对象 - Actor object
 * Set actor
 */
Window_EquipItem.prototype.setActor = function (actor) {
	if (this._actor !== actor) {
		this._actor = actor;
		this.refresh();
		this.resetScroll();
	}
};

/**
 * 设置槽 ID
 * @param {number} slotId - 槽ID - Slot ID
 * Set slot ID
 */
Window_EquipItem.prototype.setSlotId = function (slotId) {
	if (this._slotId !== slotId) {
		this._slotId = slotId;
		this.refresh();
		this.resetScroll();
	}
};

/**
 * 包含
 * @param {RPG_EquipItem} item - 物品对象 - Item object
 * @returns {boolean} 是否包含 - Whether to include
 * Includes
 */
Window_EquipItem.prototype.includes = function (item) {
	if (item === null) {
		return true;
	}
	if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
		return false;
	}
	return this._actor.canEquip(item);
};

/**
 * 是否启用
 * @param {RPG_EquipItem} item - 物品对象 - Item object
 * @returns {boolean} 是否启用 - Whether enabled
 * Is enabled
 */
Window_EquipItem.prototype.isEnabled = function (item) {
	return true;
};

/**
 * 选择上一个
 * Select last
 */
Window_EquipItem.prototype.selectLast = function () {};

/**
 * 设置状态窗口
 * @param {Window_EquipStatus} statusWindow - 状态窗口对象 - Status window object
 * Set status window
 */
Window_EquipItem.prototype.setStatusWindow = function (statusWindow) {
	this._statusWindow = statusWindow;
	this.callUpdateHelp();
};

/**
 * 更新帮助
 * Update help
 */
Window_EquipItem.prototype.updateHelp = function () {
	Window_ItemList.prototype.updateHelp.call(this);
	if (this._actor && this._statusWindow) {
		var actor = JsonEx.makeDeepCopy(this._actor);
		actor.forceChangeEquip(this._slotId, this.item());
		this._statusWindow.setTempActor(actor);
	}
};

/**
 * 播放确定声音
 * Play OK sound
 */
Window_EquipItem.prototype.playOkSound = function () {};
