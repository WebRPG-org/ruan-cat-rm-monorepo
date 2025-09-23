//=============================================================================
// Window_TitleCommand.js
//=============================================================================

/**
 * 窗口_标题指令 / Window_TitleCommand
 * 在标题画面上的选择新游戏/继续的窗口 / The window for selecting New Game/Continue on the title screen.
 * @class
 * @extends Window_Command
 */
function Window_TitleCommand() {
	this.initialize.apply(this, arguments);
}

Window_TitleCommand.prototype = Object.create(Window_Command.prototype);
Window_TitleCommand.prototype.constructor = Window_TitleCommand;

/**
 * 初始化 / Initialize
 */
Window_TitleCommand.prototype.initialize = function () {
	Window_Command.prototype.initialize.call(this, 0, 0);
	this.updatePlacement();
	this.openness = 0;
	this.selectLast();
};

/**
 * 上一次选择的指令标识 / Last selected command symbol
 * @static
 * @type {string|null}
 */
Window_TitleCommand._lastCommandSymbol = null;

/**
 * 初始化指令位置 / Initialize Command Position
 * @static
 */
Window_TitleCommand.initCommandPosition = function () {
	this._lastCommandSymbol = null;
};

/**
 * 窗口宽度 / Window Width
 * @returns {number} 窗口宽度 / The window width
 */
Window_TitleCommand.prototype.windowWidth = function () {
	return 240;
};

/**
 * 更新位置 / Update Placement
 */
Window_TitleCommand.prototype.updatePlacement = function () {
	this.x = (Graphics.boxWidth - this.width) / 2;
	this.y = Graphics.boxHeight - this.height - 96;
};

/**
 * 制作指令列表 / Make Command List
 */
Window_TitleCommand.prototype.makeCommandList = function () {
	this.addCommand(TextManager.newGame, "newGame");
	this.addCommand(TextManager.continue_, "continue", this.isContinueEnabled());
	this.addCommand(TextManager.options, "options");
};

/**
 * 是否继续游戏启用 / Is Continue Enabled
 * @returns {boolean} 继续游戏是否可用 / Whether continue is enabled
 */
Window_TitleCommand.prototype.isContinueEnabled = function () {
	return DataManager.isAnySavefileExists();
};

/**
 * 处理确定 / Process Ok
 */
Window_TitleCommand.prototype.processOk = function () {
	Window_TitleCommand._lastCommandSymbol = this.currentSymbol();
	Window_Command.prototype.processOk.call(this);
};

/**
 * 选择上一次 / Select Last
 */
Window_TitleCommand.prototype.selectLast = function () {
	if (Window_TitleCommand._lastCommandSymbol) {
		this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
	} else if (this.isContinueEnabled()) {
		this.selectSymbol("continue");
	}
};
