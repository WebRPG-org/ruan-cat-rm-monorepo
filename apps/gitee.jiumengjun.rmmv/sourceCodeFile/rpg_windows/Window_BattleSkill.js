//=============================================================================
// Window_BattleSkill.js
//=============================================================================

/**
 * 战斗画面上的技能选择窗口类
 * Window for selecting a skill to use on the battle screen
 * @class
 * @extends Window_SkillList
 */
function Window_BattleSkill() {
	this.initialize.apply(this, arguments);
}

Window_BattleSkill.prototype = Object.create(Window_SkillList.prototype);
Window_BattleSkill.prototype.constructor = Window_BattleSkill;

/**
 * 初始化战斗技能窗口
 * Initialize the battle skill window
 * @param {number} x - 窗口的X坐标 - The x-coordinate of the window
 * @param {number} y - 窗口的Y坐标 - The y-coordinate of the window
 * @param {number} width - 窗口的宽度 - The width of the window
 * @param {number} height - 窗口的高度 - The height of the window
 */
Window_BattleSkill.prototype.initialize = function (x, y, width, height) {
	Window_SkillList.prototype.initialize.call(this, x, y, width, height);
	this.hide();
};

/**
 * 显示战斗技能窗口
 * Show the battle skill window
 */
Window_BattleSkill.prototype.show = function () {
	this.selectLast();
	this.showHelpWindow();
	Window_SkillList.prototype.show.call(this);
};

/**
 * 隐藏战斗技能窗口
 * Hide the battle skill window
 */
Window_BattleSkill.prototype.hide = function () {
	this.hideHelpWindow();
	Window_SkillList.prototype.hide.call(this);
};
