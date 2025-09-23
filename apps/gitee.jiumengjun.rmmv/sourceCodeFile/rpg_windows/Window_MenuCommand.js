//=============================================================================
// Window_MenuCommand.js
//=============================================================================

//-----------------------------------------------------------------------------
// 窗口_菜单指令
// Window_MenuCommand
//
// 在菜单画面上的选择指令的窗口。
// The window for selecting a command on the menu screen.

function Window_MenuCommand() {
	this.initialize.apply(this, arguments);
}

Window_MenuCommand.prototype = Object.create(Window_Command.prototype);
Window_MenuCommand.prototype.constructor = Window_MenuCommand;

/**
 * 初始化
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 * Initialize
 */
Window_MenuCommand.prototype.initialize = function (x, y) {
	Window_Command.prototype.initialize.call(this, x, y);
	this.selectLast();
};

Window_MenuCommand._lastCommandSymbol = null; // 上次选择的指令标识 - Last command symbol

/**
 * 初始化指令位置
 * Initialize command position
 */
Window_MenuCommand.initCommandPosition = function () {
	this._lastCommandSymbol = null;
};

/**
 * 窗口宽度
 * @returns {number} 窗口宽度 - Window width
 * Window width
 */
Window_MenuCommand.prototype.windowWidth = function () {
	return 240;
};

/**
 * 可见的行数
 * @returns {number} 可见行数 - Number of visible rows
 * Number of visible rows
 */
Window_MenuCommand.prototype.numVisibleRows = function () {
	return this.maxItems();
};

/**
 * 制作指令列表
 * Make command list
 */
Window_MenuCommand.prototype.makeCommandList = function () {
	this.addMainCommands();
	this.addFormationCommand();
	this.addOriginalCommands();
	this.addOptionsCommand();
	this.addSaveCommand();
	this.addGameEndCommand();
};

/**
 * 增加主指令
 * Add main commands
 */
Window_MenuCommand.prototype.addMainCommands = function () {
	var enabled = this.areMainCommandsEnabled();
	if (this.needsCommand("item")) {
		this.addCommand(TextManager.item, "item", enabled);
	}
	if (this.needsCommand("skill")) {
		this.addCommand(TextManager.skill, "skill", enabled);
	}
	if (this.needsCommand("equip")) {
		this.addCommand(TextManager.equip, "equip", enabled);
	}
	if (this.needsCommand("status")) {
		this.addCommand(TextManager.status, "status", enabled);
	}
};

/**
 * 增加整队指令
 * Add formation command
 */
Window_MenuCommand.prototype.addFormationCommand = function () {
	if (this.needsCommand("formation")) {
		var enabled = this.isFormationEnabled();
		this.addCommand(TextManager.formation, "formation", enabled);
	}
};

/**
 * 增加初始指令
 * Add original commands
 */
Window_MenuCommand.prototype.addOriginalCommands = function () {};

/**
 * 增加设置指令
 * Add options command
 */
Window_MenuCommand.prototype.addOptionsCommand = function () {
	if (this.needsCommand("options")) {
		var enabled = this.isOptionsEnabled();
		this.addCommand(TextManager.options, "options", enabled);
	}
};

/**
 * 增加保存指令
 * Add save command
 */
Window_MenuCommand.prototype.addSaveCommand = function () {
	if (this.needsCommand("save")) {
		var enabled = this.isSaveEnabled();
		this.addCommand(TextManager.save, "save", enabled);
	}
};

/**
 * 增加游戏结束指令
 * Add game end command
 */
Window_MenuCommand.prototype.addGameEndCommand = function () {
	var enabled = this.isGameEndEnabled();
	this.addCommand(TextManager.gameEnd, "gameEnd", enabled);
};

/**
 * 是否需要该指令
 * @param {string} name - 指令名称 - Command name
 * @returns {boolean} 是否需要 - Whether needed
 * Needs command
 */
Window_MenuCommand.prototype.needsCommand = function (name) {
	var flags = $dataSystem.menuCommands;
	if (flags) {
		switch (name) {
			case "item":
				return flags[0];
			case "skill":
				return flags[1];
			case "equip":
				return flags[2];
			case "status":
				return flags[3];
			case "formation":
				return flags[4];
			case "save":
				return flags[5];
		}
	}
	return true;
};

/**
 * 是否主指令启用
 * @returns {boolean} 是否启用 - Whether enabled
 * Are main commands enabled
 */
Window_MenuCommand.prototype.areMainCommandsEnabled = function () {
	return $gameParty.exists();
};

/**
 * 是否整队启用
 * @returns {boolean} 是否启用 - Whether enabled
 * Is formation enabled
 */
Window_MenuCommand.prototype.isFormationEnabled = function () {
	return $gameParty.size() >= 2 && $gameSystem.isFormationEnabled();
};

/**
 * 是否设置启用
 * @returns {boolean} 是否启用 - Whether enabled
 * Is options enabled
 */
Window_MenuCommand.prototype.isOptionsEnabled = function () {
	return true;
};

/**
 * 是否保存启用
 * @returns {boolean} 是否启用 - Whether enabled
 * Is save enabled
 */
Window_MenuCommand.prototype.isSaveEnabled = function () {
	return !DataManager.isEventTest() && $gameSystem.isSaveEnabled();
};

/**
 * 是否游戏结束启用
 * @returns {boolean} 是否启用 - Whether enabled
 * Is game end enabled
 */
Window_MenuCommand.prototype.isGameEndEnabled = function () {
	return true;
};

/**
 * 处理确定
 * Process OK
 */
Window_MenuCommand.prototype.processOk = function () {
	Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
	Window_Command.prototype.processOk.call(this);
};

/**
 * 选择上一个
 * Select last
 */
Window_MenuCommand.prototype.selectLast = function () {
	this.selectSymbol(Window_MenuCommand._lastCommandSymbol);
};
