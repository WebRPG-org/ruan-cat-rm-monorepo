//=============================================================================
// Window_ShopStatus.js
//=============================================================================

/**
 * 在商店画面上的显示物品持有数和角色装备的窗口
 * The window for displaying number of items in possession and the actor's
 * equipment on the shop screen
 * @class
 * @extends Window_Base
 */
function Window_ShopStatus() {
	this.initialize.apply(this, arguments);
}

Window_ShopStatus.prototype = Object.create(Window_Base.prototype);
Window_ShopStatus.prototype.constructor = Window_ShopStatus;

/**
 * 初始化商店状态窗口
 * Initialize the shop status window
 * @param {number} x - 窗口的X坐标 - The x-coordinate of the window
 * @param {number} y - 窗口的Y坐标 - The y-coordinate of the window
 * @param {number} width - 窗口的宽度 - The width of the window
 * @param {number} height - 窗口的高度 - The height of the window
 */
Window_ShopStatus.prototype.initialize = function (x, y, width, height) {
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._item = null;
	this._pageIndex = 0;
	this.refresh();
};

/**
 * 刷新窗口内容
 * Refresh the window contents
 * @returns {void}
 */
Window_ShopStatus.prototype.refresh = function () {
	this.contents.clear();
	if (this._item) {
		var x = this.textPadding();
		this.drawPossession(x, 0);
		if (this.isEquipItem()) {
			this.drawEquipInfo(x, this.lineHeight() * 2);
		}
	}
};

/**
 * 设置要显示的物品
 * Set the item to display
 * @param {RPG_Item} item - 物品对象 - The item object
 * @returns {void}
 */
Window_ShopStatus.prototype.setItem = function (item) {
	this._item = item;
	this.refresh();
};

/**
 * 检查是否为装备物品
 * Check if the item is equipment
 * @returns {boolean} 如果是装备物品则返回true - Returns true if the item is equipment
 */
Window_ShopStatus.prototype.isEquipItem = function () {
	return DataManager.isWeapon(this._item) || DataManager.isArmor(this._item);
};

/**
 * 绘制物品持有数
 * Draw the number of items in possession
 * @param {number} x - 绘制的X坐标 - The x-coordinate to draw
 * @param {number} y - 绘制的Y坐标 - The y-coordinate to draw
 * @returns {void}
 */
Window_ShopStatus.prototype.drawPossession = function (x, y) {
	var width = this.contents.width - this.textPadding() - x;
	var possessionWidth = this.textWidth("0000");
	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.possession, x, y, width - possessionWidth);
	this.resetTextColor();
	this.drawText($gameParty.numItems(this._item), x, y, width, "right");
};

/**
 * 绘制装备信息
 * Draw the equipment information
 * @param {number} x - 绘制的X坐标 - The x-coordinate to draw
 * @param {number} y - 绘制的Y坐标 - The y-coordinate to draw
 * @returns {void}
 */
Window_ShopStatus.prototype.drawEquipInfo = function (x, y) {
	var members = this.statusMembers();
	for (var i = 0; i < members.length; i++) {
		this.drawActorEquipInfo(x, y + this.lineHeight() * (i * 2.4), members[i]);
	}
};

/**
 * 获取状态显示成员
 * Get the status display members
 * @returns {Array<Game_Actor>} 状态成员数组 - Array of status members
 */
Window_ShopStatus.prototype.statusMembers = function () {
	var start = this._pageIndex * this.pageSize();
	var end = start + this.pageSize();
	return $gameParty.members().slice(start, end);
};

/**
 * 获取页面大小
 * Get the page size
 * @description 指一页显示几个成员的装备信息。
 * Refers to how many members' equipment information is displayed on one page.
 * @returns {number} 页面大小 - Page size
 */
Window_ShopStatus.prototype.pageSize = function () {
	return 4;
};

/**
 * 获取最大页数
 * Get the maximum number of pages
 * @returns {number} 最大页数 - Maximum number of pages
 */
Window_ShopStatus.prototype.maxPages = function () {
	return Math.floor(($gameParty.size() + this.pageSize() - 1) / this.pageSize());
};

/**
 * 绘制角色装备信息
 * Draw the actor's equipment information
 * @param {number} x - 绘制的X坐标 - The x-coordinate to draw
 * @param {number} y - 绘制的Y坐标 - The y-coordinate to draw
 * @param {Game_Actor} actor - 角色对象 - The actor object
 * @returns {void}
 */
Window_ShopStatus.prototype.drawActorEquipInfo = function (x, y, actor) {
	var enabled = actor.canEquip(this._item);
	this.changePaintOpacity(enabled);
	this.resetTextColor();
	this.drawText(actor.name(), x, y, 168);
	var item1 = this.currentEquippedItem(actor, this._item.etypeId);
	if (enabled) {
		this.drawActorParamChange(x, y, actor, item1);
	}
	this.drawItemName(item1, x, y + this.lineHeight());
	this.changePaintOpacity(true);
};

/**
 * 绘制角色能力值变化
 * Draw the actor's parameter change
 * @param {number} x - 绘制的X坐标 - The x-coordinate to draw
 * @param {number} y - 绘制的Y坐标 - The y-coordinate to draw
 * @param {Game_Actor} actor - 角色对象 - The actor object
 * @param {RPG_EquipItem} item1 - 当前装备物品 - The currently equipped item
 * @returns {void}
 */
Window_ShopStatus.prototype.drawActorParamChange = function (x, y, actor, item1) {
	var width = this.contents.width - this.textPadding() - x;
	var paramId = this.paramId();
	var change = this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
	this.changeTextColor(this.paramchangeTextColor(change));
	this.drawText((change > 0 ? "+" : "") + change, x, y, width, "right");
};

/**
 * 获取能力值ID
 * Get the parameter ID
 * @returns {number} 能力值ID（2=攻击力，3=防御力） - Parameter ID (2=Attack, 3=Defense)
 */
Window_ShopStatus.prototype.paramId = function () {
	return DataManager.isWeapon(this._item) ? 2 : 3;
};

/**
 * 获取当前装备的物品
 * Get the currently equipped item
 * @param {Game_Actor} actor - 角色对象 - The actor object
 * @param {number} etypeId - 装备类型ID - The equipment type ID
 * @returns {RPG_EquipItem|null} 当前装备的物品或null - The currently equipped item or null
 */
Window_ShopStatus.prototype.currentEquippedItem = function (actor, etypeId) {
	var list = [];
	var equips = actor.equips();
	var slots = actor.equipSlots();
	for (var i = 0; i < slots.length; i++) {
		if (slots[i] === etypeId) {
			list.push(equips[i]);
		}
	}
	var paramId = this.paramId();
	var worstParam = Number.MAX_VALUE;
	var worstItem = null;
	for (var j = 0; j < list.length; j++) {
		if (list[j] && list[j].params[paramId] < worstParam) {
			worstParam = list[j].params[paramId];
			worstItem = list[j];
		}
	}
	return worstItem;
};

/**
 * 更新窗口
 * Update the window
 * @returns {void}
 */
Window_ShopStatus.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	this.updatePage();
};

/**
 * 更新页面
 * Update the page
 * @returns {void}
 */
Window_ShopStatus.prototype.updatePage = function () {
	if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
		this.changePage();
	}
};

/**
 * 检查是否启用页面更改
 * Check if page change is enabled
 * @returns {boolean} 如果启用页面更改则返回true - Returns true if page change is enabled
 */
Window_ShopStatus.prototype.isPageChangeEnabled = function () {
	return this.visible && this.maxPages() >= 2;
};

/**
 * 检查是否有页面更改请求
 * Check if page change is requested
 * @returns {boolean} 如果有页面更改请求则返回true - Returns true if page change is requested
 */
Window_ShopStatus.prototype.isPageChangeRequested = function () {
	if (Input.isTriggered("shift")) {
		return true;
	}
	if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
		return true;
	}
	return false;
};

/**
 * 检查是否触摸在窗口框架内
 * Check if touched inside the window frame
 * @returns {boolean} 如果触摸在窗口框架内则返回true - Returns true if touched inside the window frame
 */
Window_ShopStatus.prototype.isTouchedInsideFrame = function () {
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

/**
 * 更改页面
 * Change the page
 * @returns {void}
 */
Window_ShopStatus.prototype.changePage = function () {
	this._pageIndex = (this._pageIndex + 1) % this.maxPages();
	this.refresh();
	SoundManager.playCursor();
};
