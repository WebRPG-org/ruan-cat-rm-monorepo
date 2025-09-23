//=============================================================================
// Window_PartyCommand.js
//=============================================================================

/**
 * 战斗画面上的队伍指令窗口，用于选择战斗或逃跑
 * Window for selecting whether to fight or escape on the battle screen
 * @class
 * @extends Window_Command
 */
function Window_PartyCommand() {
	this.initialize.apply(this, arguments);
}

Window_PartyCommand.prototype = Object.create(Window_Command.prototype);
Window_PartyCommand.prototype.constructor = Window_PartyCommand;

/**
 * 初始化队伍指令窗口
 * Initialize the party command window
 */
Window_PartyCommand.prototype.initialize = function () {
	var y = Graphics.boxHeight - this.windowHeight();
	Window_Command.prototype.initialize.call(this, 0, y);
	this.openness = 0;
	this.deactivate();
};

/**
 * 获取窗口宽度
 * Get window width
 * @returns {number} 窗口宽度 - Window width
 */
Window_PartyCommand.prototype.windowWidth = function () {
	return 192;
};

/**
 * 获取可见行数
 * Get number of visible rows
 * @returns {number} 可见行数 - Number of visible rows
 */
Window_PartyCommand.prototype.numVisibleRows = function () {
	return 4;
};

/**
 * 制作指令列表
 * Make command list
 */
Window_PartyCommand.prototype.makeCommandList = function () {
	this.addCommand(TextManager.fight, "fight");
	this.addCommand(TextManager.escape, "escape", BattleManager.canEscape());
};

/**
 * 设置窗口
 * Setup window
 */
Window_PartyCommand.prototype.setup = function () {
	this.clearCommandList();
	this.makeCommandList();
	this.refresh();
	this.select(0);
	this.activate();
	this.open();
};
