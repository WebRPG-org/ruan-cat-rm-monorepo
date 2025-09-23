/**
 * @fileoverview 姓名输入场景类，用于角色姓名输入界面。
 * Name input scene class for character name input interface.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_姓名
// Scene_Name
//
// 姓名输入画面的场景类。
// The scene class of the name input screen.

/**
 * 姓名输入场景类
 * Name input scene class
 *
 * @class Scene_Name
 * @description 姓名输入画面的场景类，用于输入和修改角色姓名。
 * The scene class of the name input screen, used for inputting and modifying character names.
 * @extends Scene_MenuBase
 */
function Scene_Name() {
	this.initialize.apply(this, arguments);
}

Scene_Name.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Name.prototype.constructor = Scene_Name;

/**
 * 初始化姓名输入场景
 * Initialize name input scene
 *
 * @memberof Scene_Name
 * @method initialize
 * @description 初始化姓名输入场景对象。
 * Initializes the name input scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_Name.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * 准备场景
 * Prepare scene
 *
 * @memberof Scene_Name
 * @method prepare
 * @description 准备姓名输入场景，设置目标角色和最大长度。
 * Prepares the name input scene, sets the target actor and maximum length.
 * @param {number} actorId - 角色ID Actor ID
 * @param {number} maxLength - 最大姓名长度 Maximum name length
 * @returns {void} 无返回值 No return value
 */
Scene_Name.prototype.prepare = function (actorId, maxLength) {
	this._actorId = actorId;
	this._maxLength = maxLength;
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Name
 * @method create
 * @description 创建姓名输入场景的各个窗口组件。
 * Creates various window components for the name input scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Name.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
	this._actor = $gameActors.actor(this._actorId);
	this.createEditWindow();
	this.createInputWindow();
};

/**
 * 开始场景
 * Start scene
 *
 * @memberof Scene_Name
 * @method start
 * @description 开始姓名输入场景，刷新编辑窗口。
 * Starts the name input scene, refreshes the edit window.
 * @returns {void} 无返回值 No return value
 */
Scene_Name.prototype.start = function () {
	Scene_MenuBase.prototype.start.call(this);
	this._editWindow.refresh();
};

/**
 * 创建编辑窗口
 * Create edit window
 *
 * @memberof Scene_Name
 * @method createEditWindow
 * @description 创建显示和编辑姓名的窗口。
 * Creates the window for displaying and editing the name.
 * @returns {void} 无返回值 No return value
 */
Scene_Name.prototype.createEditWindow = function () {
	this._editWindow = new Window_NameEdit(this._actor, this._maxLength);
	this.addWindow(this._editWindow);
};

/**
 * 创建输入窗口
 * Create input window
 *
 * @memberof Scene_Name
 * @method createInputWindow
 * @description 创建用于输入姓名的键盘窗口。
 * Creates the keyboard window for inputting the name.
 * @returns {void} 无返回值 No return value
 */
Scene_Name.prototype.createInputWindow = function () {
	this._inputWindow = new Window_NameInput(this._editWindow);
	this._inputWindow.setHandler("ok", this.onInputOk.bind(this));
	this.addWindow(this._inputWindow);
};

/**
 * 输入确定时
 * When input is confirmed
 *
 * @memberof Scene_Name
 * @method onInputOk
 * @description 当姓名输入确定时，设置角色姓名并返回上一场景。
 * When name input is confirmed, sets the character name and returns to the previous scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Name.prototype.onInputOk = function () {
	this._actor.setName(this._editWindow.name());
	this.popScene();
};

//-----------------------------------------------------------------------------
// 场景_调试
