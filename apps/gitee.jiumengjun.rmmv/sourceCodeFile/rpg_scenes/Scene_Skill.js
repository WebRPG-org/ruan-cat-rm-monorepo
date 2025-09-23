/**
 * 场景_技能
 * 技能画面的场景类。
 * Scene_Skill
 * The scene class of the skill screen.
 */

function Scene_Skill() {
	this.initialize.apply(this, arguments);
}

Scene_Skill.prototype = Object.create(Scene_ItemBase.prototype);
Scene_Skill.prototype.constructor = Scene_Skill;

/**
 * 初始化
 * Initialize
 */
Scene_Skill.prototype.initialize = function () {
	Scene_ItemBase.prototype.initialize.call(this);
};

/**
 * 创建
 * Create
 */
Scene_Skill.prototype.create = function () {
	Scene_ItemBase.prototype.create.call(this);
	this.createHelpWindow();
	this.createSkillTypeWindow();
	this.createStatusWindow();
	this.createItemWindow();
	this.createActorWindow();
};

/**
 * 开始
 * Start
 */
Scene_Skill.prototype.start = function () {
	Scene_ItemBase.prototype.start.call(this);
	this.refreshActor();
};

/**
 * 创建技能类型窗口
 * Create skill type window
 */
Scene_Skill.prototype.createSkillTypeWindow = function () {
	var wy = this._helpWindow.height;
	this._skillTypeWindow = new Window_SkillType(0, wy);
	this._skillTypeWindow.setHelpWindow(this._helpWindow);
	this._skillTypeWindow.setHandler("skill", this.commandSkill.bind(this));
	this._skillTypeWindow.setHandler("cancel", this.popScene.bind(this));
	this._skillTypeWindow.setHandler("pagedown", this.nextActor.bind(this));
	this._skillTypeWindow.setHandler("pageup", this.previousActor.bind(this));
	this.addWindow(this._skillTypeWindow);
};

/**
 * 创建状态窗口
 * Create status window
 */
Scene_Skill.prototype.createStatusWindow = function () {
	var wx = this._skillTypeWindow.width;
	var wy = this._helpWindow.height;
	var ww = Graphics.boxWidth - wx;
	var wh = this._skillTypeWindow.height;
	this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
	this._statusWindow.reserveFaceImages();
	this.addWindow(this._statusWindow);
};

/**
 * 创建项目窗口
 * Create item window
 */
Scene_Skill.prototype.createItemWindow = function () {
	var wx = 0;
	var wy = this._statusWindow.y + this._statusWindow.height;
	var ww = Graphics.boxWidth;
	var wh = Graphics.boxHeight - wy;
	this._itemWindow = new Window_SkillList(wx, wy, ww, wh);
	this._itemWindow.setHelpWindow(this._helpWindow);
	this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
	this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
	this._skillTypeWindow.setSkillWindow(this._itemWindow);
	this.addWindow(this._itemWindow);
};

/**
 * 刷新角色
 * Refresh actor
 */
Scene_Skill.prototype.refreshActor = function () {
	var actor = this.actor();
	this._skillTypeWindow.setActor(actor);
	this._statusWindow.setActor(actor);
	this._itemWindow.setActor(actor);
};

/**
 * 使用者
 * @returns {Game_Actor} 使用者角色 - User actor
 * User
 */
Scene_Skill.prototype.user = function () {
	return this.actor();
};

/**
 * 技能的指令
 * Command skill
 */
Scene_Skill.prototype.commandSkill = function () {
	this._itemWindow.activate();
	this._itemWindow.selectLast();
};

/**
 * 当项目确定
 * When item ok
 */
Scene_Skill.prototype.onItemOk = function () {
	this.actor().setLastMenuSkill(this.item());
	this.determineItem();
};

/**
 * 当项目取消
 * When item cancel
 */
Scene_Skill.prototype.onItemCancel = function () {
	this._itemWindow.deselect();
	this._skillTypeWindow.activate();
};

/**
 * 播放项目的音效
 * Play sound effect for item
 */
Scene_Skill.prototype.playSeForItem = function () {
	SoundManager.playUseSkill();
};

/**
 * 使用项目
 * Use item
 */
Scene_Skill.prototype.useItem = function () {
	Scene_ItemBase.prototype.useItem.call(this);
	this._statusWindow.refresh();
	this._itemWindow.refresh();
};

/**
 * 当角色改变
 * When actor change
 */
Scene_Skill.prototype.onActorChange = function () {
	this.refreshActor();
	this._skillTypeWindow.activate();
};

//-----------------------------------------------------------------------------
