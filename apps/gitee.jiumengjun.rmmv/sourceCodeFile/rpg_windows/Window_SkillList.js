//=============================================================================
// Window_SkillList.js
//=============================================================================

/**
 * 窗口_技能列表 / Window_SkillList
 * 在技能画面上的选择技能的窗口 / The window for selecting a skill on the skill screen.
 * @class
 * @extends Window_Selectable
 */
function Window_SkillList() {
	this.initialize.apply(this, arguments);
}

Window_SkillList.prototype = Object.create(Window_Selectable.prototype);
Window_SkillList.prototype.constructor = Window_SkillList;

/**
 * 初始化 / Initialize
 * @param {number} x - 窗口的 x 坐标 / The x coordinate of the window
 * @param {number} y - 窗口的 y 坐标 / The y coordinate of the window
 * @param {number} width - 窗口的宽度 / The width of the window
 * @param {number} height - 窗口的高度 / The height of the window
 */
Window_SkillList.prototype.initialize = function (x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._actor = null;
	this._stypeId = 0;
	this._data = [];
};

/**
 * 设置角色 / Set Actor
 * @param {Game_Actor} actor - 要设置的角色对象 / The actor object to set
 */
Window_SkillList.prototype.setActor = function (actor) {
	if (this._actor !== actor) {
		this._actor = actor;
		this.refresh();
		this.resetScroll();
	}
};

/**
 * 设置技能类型 ID / Set Skill Type ID
 * @param {number} stypeId - 技能类型 ID / The skill type ID
 */
Window_SkillList.prototype.setStypeId = function (stypeId) {
	if (this._stypeId !== stypeId) {
		this._stypeId = stypeId;
		this.refresh();
		this.resetScroll();
	}
};

/**
 * 最大列数 / Maximum Columns
 * @returns {number} 最大列数 / The maximum number of columns
 */
Window_SkillList.prototype.maxCols = function () {
	return 2;
};

/**
 * 间距 / Spacing
 * @returns {number} 项目间距 / The spacing between items
 */
Window_SkillList.prototype.spacing = function () {
	return 48;
};

/**
 * 最大项目数 / Maximum Items
 * @returns {number} 最大项目数 / The maximum number of items
 */
Window_SkillList.prototype.maxItems = function () {
	return this._data ? this._data.length : 1;
};

/**
 * 项目 / Item
 * @returns {RPG.Skill|null} 当前选中的技能对象或 null / The currently selected skill object or null
 */
Window_SkillList.prototype.item = function () {
	return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

/**
 * 是否当前项目启用 / Is Current Item Enabled
 * @returns {boolean} 当前项目是否可用 / Whether the current item is enabled
 */
Window_SkillList.prototype.isCurrentItemEnabled = function () {
	return this.isEnabled(this._data[this.index()]);
};

/**
 * 包含 / Includes
 * @param {RPG.Skill} item - 要检查的技能 / The skill to check
 * @returns {boolean} 是否包含该技能 / Whether the skill is included
 */
Window_SkillList.prototype.includes = function (item) {
	return item && item.stypeId === this._stypeId;
};

/**
 * 是否启用 / Is Enabled
 * @param {RPG.Skill} item - 要检查的技能 / The skill to check
 * @returns {boolean} 技能是否可用 / Whether the skill is enabled
 */
Window_SkillList.prototype.isEnabled = function (item) {
	return this._actor && this._actor.canUse(item);
};

/**
 * 制作项目列表 / Make Item List
 */
Window_SkillList.prototype.makeItemList = function () {
	if (this._actor) {
		this._data = this._actor.skills().filter(function (item) {
			return this.includes(item);
		}, this);
	} else {
		this._data = [];
	}
};

/**
 * 选择上一个 / Select Last
 */
Window_SkillList.prototype.selectLast = function () {
	var skill;
	if ($gameParty.inBattle()) {
		skill = this._actor.lastBattleSkill();
	} else {
		skill = this._actor.lastMenuSkill();
	}
	var index = this._data.indexOf(skill);
	this.select(index >= 0 ? index : 0);
};

/**
 * 绘制项目 / Draw Item
 * @param {number} index - 项目索引 / The item index
 */
Window_SkillList.prototype.drawItem = function (index) {
	var skill = this._data[index];
	if (skill) {
		var costWidth = this.costWidth();
		var rect = this.itemRect(index);
		rect.width -= this.textPadding();
		this.changePaintOpacity(this.isEnabled(skill));
		this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
		this.drawSkillCost(skill, rect.x, rect.y, rect.width);
		this.changePaintOpacity(1);
	}
};

/**
 * 消耗的宽度 / Cost Width
 * @returns {number} 消耗文本的宽度 / The width of the cost text
 */
Window_SkillList.prototype.costWidth = function () {
	return this.textWidth("000");
};

/**
 * 绘制技能消耗 / Draw Skill Cost
 * @param {RPG.Skill} skill - 技能对象 / The skill object
 * @param {number} x - x 坐标 / The x coordinate
 * @param {number} y - y 坐标 / The y coordinate
 * @param {number} width - 宽度 / The width
 */
Window_SkillList.prototype.drawSkillCost = function (skill, x, y, width) {
	if (this._actor.skillTpCost(skill) > 0) {
		this.changeTextColor(this.tpCostColor());
		this.drawText(this._actor.skillTpCost(skill), x, y, width, "right");
	} else if (this._actor.skillMpCost(skill) > 0) {
		this.changeTextColor(this.mpCostColor());
		this.drawText(this._actor.skillMpCost(skill), x, y, width, "right");
	}
};

/**
 * 更新帮助 / Update Help
 */
Window_SkillList.prototype.updateHelp = function () {
	this.setHelpWindowItem(this.item());
};

/**
 * 刷新 / Refresh
 */
Window_SkillList.prototype.refresh = function () {
	this.makeItemList();
	this.createContents();
	this.drawAllItems();
};
