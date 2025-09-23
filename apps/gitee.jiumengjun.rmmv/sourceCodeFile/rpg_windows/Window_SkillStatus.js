//=============================================================================
// Window_SkillStatus.js
//=============================================================================

/**
 * 窗口_技能状态 / Window_SkillStatus
 * 在技能画面上的显示技能使用者状态的窗口 / The window for displaying the skill user's status on the skill screen.
 * @class
 * @extends Window_Base
 */
function Window_SkillStatus() {
	this.initialize.apply(this, arguments);
}

Window_SkillStatus.prototype = Object.create(Window_Base.prototype);
Window_SkillStatus.prototype.constructor = Window_SkillStatus;

/**
 * 初始化 / Initialize
 * @param {number} x - 窗口的 x 坐标 / The x coordinate of the window
 * @param {number} y - 窗口的 y 坐标 / The y coordinate of the window
 * @param {number} width - 窗口的宽度 / The width of the window
 * @param {number} height - 窗口的高度 / The height of the window
 */
Window_SkillStatus.prototype.initialize = function (x, y, width, height) {
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._actor = null;
};

/**
 * 设置角色 / Set Actor
 * @param {Game_Actor} actor - 要设置的角色对象 / The actor object to set
 */
Window_SkillStatus.prototype.setActor = function (actor) {
	if (this._actor !== actor) {
		this._actor = actor;
		this.refresh();
	}
};

/**
 * 刷新 / Refresh
 */
Window_SkillStatus.prototype.refresh = function () {
	this.contents.clear();
	if (this._actor) {
		var w = this.width - this.padding * 2;
		var h = this.height - this.padding * 2;
		var y = h / 2 - this.lineHeight() * 1.5;
		var width = w - 162 - this.textPadding();
		this.drawActorFace(this._actor, 0, 0, 144, h);
		this.drawActorSimpleStatus(this._actor, 162, y, width);
	}
};
