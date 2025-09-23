/**
 * @fileoverview 菜单场景类，用于游戏菜单界面的显示和交互。
 * Menu scene class for displaying and interacting with the game menu interface.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_菜单
// Scene_Menu
//
// 菜单画面的场景类。
// The scene class of the menu screen.

/**
 * 菜单场景类
 * Menu scene class
 *
 * @class Scene_Menu
 * @description 游戏菜单画面的场景类，提供物品、技能、装备、状态等菜单选项。
 * The scene class of the game menu screen, providing menu options such as items, skills, equipment, status, etc.
 * @extends Scene_MenuBase
 */
function Scene_Menu() {
	this.initialize.apply(this, arguments);
}

Scene_Menu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Menu.prototype.constructor = Scene_Menu;

/**
 * 初始化菜单场景
 * Initialize menu scene
 *
 * @memberof Scene_Menu
 * @method initialize
 * @description 初始化菜单场景对象。
 * Initializes the menu scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Menu
 * @method create
 * @description 创建菜单场景的各个窗口组件。
 * Creates various window components for the menu scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
	this.createCommandWindow();
	this.createGoldWindow();
	this.createStatusWindow();
};

/**
 * 开始场景
 * Start scene
 *
 * @memberof Scene_Menu
 * @method start
 * @description 开始菜单场景，刷新状态窗口。
 * Starts the menu scene, refreshes the status window.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.start = function () {
	Scene_MenuBase.prototype.start.call(this);
	this._statusWindow.refresh();
};

/**
 * 创建指令窗口
 * Create command window
 *
 * @memberof Scene_Menu
 * @method createCommandWindow
 * @description 创建菜单的主指令窗口，设置各种指令的处理函数。
 * Creates the main command window of the menu, sets up handlers for various commands.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.createCommandWindow = function () {
	this._commandWindow = new Window_MenuCommand(0, 0);
	this._commandWindow.setHandler("item", this.commandItem.bind(this));
	this._commandWindow.setHandler("skill", this.commandPersonal.bind(this));
	this._commandWindow.setHandler("equip", this.commandPersonal.bind(this));
	this._commandWindow.setHandler("status", this.commandPersonal.bind(this));
	this._commandWindow.setHandler("formation", this.commandFormation.bind(this));
	this._commandWindow.setHandler("options", this.commandOptions.bind(this));
	this._commandWindow.setHandler("save", this.commandSave.bind(this));
	this._commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
	this._commandWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};

/**
 * 创建金钱窗口
 * Create gold window
 *
 * @memberof Scene_Menu
 * @method createGoldWindow
 * @description 创建显示队伍金钱的窗口。
 * Creates the window for displaying party gold.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.createGoldWindow = function () {
	this._goldWindow = new Window_Gold(0, 0);
	this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
	this.addWindow(this._goldWindow);
};

/**
 * 创建状态窗口
 * Create status window
 *
 * @memberof Scene_Menu
 * @method createStatusWindow
 * @description 创建显示队伍成员状态的窗口。
 * Creates the window for displaying party member status.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.createStatusWindow = function () {
	this._statusWindow = new Window_MenuStatus(this._commandWindow.width, 0);
	this._statusWindow.reserveFaceImages();
	this.addWindow(this._statusWindow);
};

/**
 * 物品指令
 * Item command
 *
 * @memberof Scene_Menu
 * @method commandItem
 * @description 执行物品指令，打开物品场景。
 * Executes the item command, opens the item scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.commandItem = function () {
	SceneManager.push(Scene_Item);
};

/**
 * 个人指令
 * Personal command
 *
 * @memberof Scene_Menu
 * @method commandPersonal
 * @description 执行需要选择角色的个人指令（技能、装备、状态）。
 * Executes personal commands that require character selection (skills, equipment, status).
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.commandPersonal = function () {
	this._statusWindow.setFormationMode(false);
	this._statusWindow.selectLast();
	this._statusWindow.activate();
	this._statusWindow.setHandler("ok", this.onPersonalOk.bind(this));
	this._statusWindow.setHandler("cancel", this.onPersonalCancel.bind(this));
};

/**
 * 整队指令
 * Formation command
 *
 * @memberof Scene_Menu
 * @method commandFormation
 * @description 执行整队指令，调整队伍成员的排列顺序。
 * Executes the formation command, adjusts the arrangement order of party members.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.commandFormation = function () {
	this._statusWindow.setFormationMode(true);
	this._statusWindow.selectLast();
	this._statusWindow.activate();
	this._statusWindow.setHandler("ok", this.onFormationOk.bind(this));
	this._statusWindow.setHandler("cancel", this.onFormationCancel.bind(this));
};

/**
 * 选项指令
 * Options command
 *
 * @memberof Scene_Menu
 * @method commandOptions
 * @description 执行选项指令，打开选项设置场景。
 * Executes the options command, opens the options settings scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.commandOptions = function () {
	SceneManager.push(Scene_Options);
};

/**
 * 存档指令
 * Save command
 *
 * @memberof Scene_Menu
 * @method commandSave
 * @description 执行存档指令，打开存档场景。
 * Executes the save command, opens the save scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.commandSave = function () {
	SceneManager.push(Scene_Save);
};

/**
 * 游戏结束指令
 * Game end command
 *
 * @memberof Scene_Menu
 * @method commandGameEnd
 * @description 执行游戏结束指令，打开游戏结束场景。
 * Executes the game end command, opens the game end scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.commandGameEnd = function () {
	SceneManager.push(Scene_GameEnd);
};

/**
 * 个人指令确定时
 * When personal command is confirmed
 *
 * @memberof Scene_Menu
 * @method onPersonalOk
 * @description 当选择角色后确认时，根据当前指令类型打开相应场景。
 * When confirmed after selecting a character, opens the corresponding scene based on the current command type.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.onPersonalOk = function () {
	switch (this._commandWindow.currentSymbol()) {
		case "skill":
			SceneManager.push(Scene_Skill);
			break;
		case "equip":
			SceneManager.push(Scene_Equip);
			break;
		case "status":
			SceneManager.push(Scene_Status);
			break;
	}
};

/**
 * 个人指令取消时
 * When personal command is cancelled
 *
 * @memberof Scene_Menu
 * @method onPersonalCancel
 * @description 当个人指令取消时，返回指令窗口。
 * When personal command is cancelled, returns to the command window.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.onPersonalCancel = function () {
	this._statusWindow.deselect();
	this._commandWindow.activate();
};

/**
 * 整队指令确定时
 * When formation command is confirmed
 *
 * @memberof Scene_Menu
 * @method onFormationOk
 * @description 当整队指令确认时，交换队伍成员位置或设置待交换位置。
 * When formation command is confirmed, swaps party member positions or sets pending swap position.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.onFormationOk = function () {
	var index = this._statusWindow.index();
	var actor = $gameParty.members()[index];
	var pendingIndex = this._statusWindow.pendingIndex();
	if (pendingIndex >= 0) {
		$gameParty.swapOrder(index, pendingIndex);
		this._statusWindow.setPendingIndex(-1);
		this._statusWindow.redrawItem(index);
	} else {
		this._statusWindow.setPendingIndex(index);
	}
	this._statusWindow.activate();
};

/**
 * 整队指令取消时
 * When formation command is cancelled
 *
 * @memberof Scene_Menu
 * @method onFormationCancel
 * @description 当整队指令取消时，清除待交换位置或返回指令窗口。
 * When formation command is cancelled, clears pending swap position or returns to command window.
 * @returns {void} 无返回值 No return value
 */
Scene_Menu.prototype.onFormationCancel = function () {
	if (this._statusWindow.pendingIndex() >= 0) {
		this._statusWindow.setPendingIndex(-1);
		this._statusWindow.activate();
	} else {
		this._statusWindow.deselect();
		this._commandWindow.activate();
	}
};

//-----------------------------------------------------------------------------
// 场景_项目基础
