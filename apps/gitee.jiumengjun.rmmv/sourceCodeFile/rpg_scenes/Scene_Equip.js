/**
 * @fileoverview 装备场景类，用于角色装备管理界面。
 * Equipment scene class for character equipment management interface.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_装备
// Scene_Equip
//
// 装备画面的场景类。
// The scene class of the equipment screen.

/**
 * 装备场景类
 * Equipment scene class
 *
 * @class Scene_Equip
 * @description 角色装备管理界面的场景类，提供装备更换、优化和清空功能。
 * The scene class of the character equipment management interface, providing equipment change, optimization and clear functions.
 * @extends Scene_MenuBase
 */
function Scene_Equip() {
	this.initialize.apply(this, arguments);
}

Scene_Equip.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Equip.prototype.constructor = Scene_Equip;

/**
 * 初始化装备场景
 * Initialize equipment scene
 *
 * @memberof Scene_Equip
 * @method initialize
 * @description 初始化装备场景对象。
 * Initializes the equipment scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Equip
 * @method create
 * @description 创建装备场景的显示对象，包括状态窗口、指令窗口、插槽窗口和物品窗口。
 * Creates the display objects for the equipment scene, including status window, command window, slot window and item window.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
	this.createHelpWindow();
	this.createStatusWindow();
	this.createCommandWindow();
	this.createSlotWindow();
	this.createItemWindow();
	this.refreshActor();
};

/**
 * 创建状态窗口
 * Create status window
 *
 * @memberof Scene_Equip
 * @method createStatusWindow
 * @description 创建显示角色装备状态信息的窗口。
 * Creates the window for displaying character equipment status information.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.createStatusWindow = function () {
	this._statusWindow = new Window_EquipStatus(0, this._helpWindow.height);
	this.addWindow(this._statusWindow);
};

/**
 * 创建指令窗口
 * Create command window
 *
 * @memberof Scene_Equip
 * @method createCommandWindow
 * @description 创建装备操作指令窗口，包括装备、优化、清空等选项。
 * Creates the equipment operation command window, including equipment, optimization, clear and other options.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.createCommandWindow = function () {
	var wx = this._statusWindow.width;
	var wy = this._helpWindow.height;
	var ww = Graphics.boxWidth - this._statusWindow.width;
	this._commandWindow = new Window_EquipCommand(wx, wy, ww);
	this._commandWindow.setHelpWindow(this._helpWindow);
	this._commandWindow.setHandler("equip", this.commandEquip.bind(this));
	this._commandWindow.setHandler("optimize", this.commandOptimize.bind(this));
	this._commandWindow.setHandler("clear", this.commandClear.bind(this));
	this._commandWindow.setHandler("cancel", this.popScene.bind(this));
	this._commandWindow.setHandler("pagedown", this.nextActor.bind(this));
	this._commandWindow.setHandler("pageup", this.previousActor.bind(this));
	this.addWindow(this._commandWindow);
};

/**
 * 创建插槽窗口
 * Create slot window
 *
 * @memberof Scene_Equip
 * @method createSlotWindow
 * @description 创建显示装备插槽位置的窗口。
 * Creates the window for displaying equipment slot positions.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.createSlotWindow = function () {
	var wx = this._statusWindow.width;
	var wy = this._commandWindow.y + this._commandWindow.height;
	var ww = Graphics.boxWidth - this._statusWindow.width;
	var wh = this._statusWindow.height - this._commandWindow.height;
	this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
	this._slotWindow.setHelpWindow(this._helpWindow);
	this._slotWindow.setStatusWindow(this._statusWindow);
	this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
	this._slotWindow.setHandler("cancel", this.onSlotCancel.bind(this));
	this.addWindow(this._slotWindow);
};

/**
 * 创建物品窗口
 * Create item window
 *
 * @memberof Scene_Equip
 * @method createItemWindow
 * @description 创建显示可装备物品列表的窗口。
 * Creates the window for displaying the list of equippable items.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.createItemWindow = function () {
	var wx = 0;
	var wy = this._statusWindow.y + this._statusWindow.height;
	var ww = Graphics.boxWidth;
	var wh = Graphics.boxHeight - wy;
	this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
	this._itemWindow.setHelpWindow(this._helpWindow);
	this._itemWindow.setStatusWindow(this._statusWindow);
	this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
	this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
	this._slotWindow.setItemWindow(this._itemWindow);
	this.addWindow(this._itemWindow);
};

/**
 * 刷新角色
 * Refresh actor
 *
 * @memberof Scene_Equip
 * @method refreshActor
 * @description 刷新所有窗口中显示的角色信息。
 * Refreshes the character information displayed in all windows.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.refreshActor = function () {
	var actor = this.actor();
	this._statusWindow.setActor(actor);
	this._slotWindow.setActor(actor);
	this._itemWindow.setActor(actor);
};

/**
 * 装备指令
 * Equipment command
 *
 * @memberof Scene_Equip
 * @method commandEquip
 * @description 执行装备指令，激活插槽窗口。
 * Executes the equipment command, activates the slot window.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.commandEquip = function () {
	this._slotWindow.activate();
	this._slotWindow.select(0);
};

/**
 * 最强装备指令
 * Optimize equipment command
 *
 * @memberof Scene_Equip
 * @method commandOptimize
 * @description 执行最优装备指令，自动为角色装备最佳装备。
 * Executes the optimal equipment command, automatically equips the best equipment for the character.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.commandOptimize = function () {
	SoundManager.playEquip();
	this.actor().optimizeEquipments();
	this._statusWindow.refresh();
	this._slotWindow.refresh();
	this._commandWindow.activate();
};

/**
 * 清空装备指令
 * Clear equipment command
 *
 * @memberof Scene_Equip
 * @method commandClear
 * @description 执行清空装备指令，移除角色所有装备。
 * Executes the clear equipment command, removes all equipment from the character.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.commandClear = function () {
	SoundManager.playEquip();
	this.actor().clearEquipments();
	this._statusWindow.refresh();
	this._slotWindow.refresh();
	this._commandWindow.activate();
};

/**
 * 当插槽确定时
 * When slot is confirmed
 *
 * @memberof Scene_Equip
 * @method onSlotOk
 * @description 当插槽窗口确定时激活物品窗口。
 * Activates the item window when the slot window is confirmed.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.onSlotOk = function () {
	this._itemWindow.activate();
	this._itemWindow.select(0);
};

/**
 * 当插槽取消时
 * When slot is cancelled
 *
 * @memberof Scene_Equip
 * @method onSlotCancel
 * @description 当插槽窗口取消时激活指令窗口。
 * Activates the command window when the slot window is cancelled.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.onSlotCancel = function () {
	this._slotWindow.deselect();
	this._commandWindow.activate();
};

/**
 * 当物品确定时
 * When item is confirmed
 *
 * @memberof Scene_Equip
 * @method onItemOk
 * @description 当物品窗口确定时更换装备并刷新相关窗口。
 * Changes equipment and refreshes related windows when the item window is confirmed.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.onItemOk = function () {
	SoundManager.playEquip();
	this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
	this._slotWindow.activate();
	this._slotWindow.refresh();
	this._itemWindow.deselect();
	this._itemWindow.refresh();
	this._statusWindow.refresh();
};

/**
 * 当物品取消时
 * When item is cancelled
 *
 * @memberof Scene_Equip
 * @method onItemCancel
 * @description 当物品窗口取消时激活插槽窗口。
 * Activates the slot window when the item window is cancelled.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.onItemCancel = function () {
	this._slotWindow.activate();
	this._itemWindow.deselect();
};

/**
 * 当角色改变时
 * When actor changes
 *
 * @memberof Scene_Equip
 * @method onActorChange
 * @description 当角色改变时刷新角色信息。
 * Refreshes the character information when the character changes.
 * @returns {void} 无返回值 No return value
 */
Scene_Equip.prototype.onActorChange = function () {
	this.refreshActor();
	this._commandWindow.activate();
};

//-----------------------------------------------------------------------------
// 场景_状态
