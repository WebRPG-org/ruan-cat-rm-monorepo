/**
 * @fileoverview 文件场景基类，存档和读档场景的父类。
 * File scene base class, the superclass of save and load scenes.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_文件
// Scene_File
//
// Scene_Save 和 Scene_Load 的父类。
// The superclass of Scene_Save and Scene_Load.

/**
 * 文件场景基类
 * File scene base class
 *
 * @class Scene_File
 * @description 存档和读档场景的父类，提供文件操作的基础功能。
 * The superclass of save and load scenes, providing basic functionality for file operations.
 * @extends Scene_MenuBase
 */
function Scene_File() {
	this.initialize.apply(this, arguments);
}

Scene_File.prototype = Object.create(Scene_MenuBase.prototype);
Scene_File.prototype.constructor = Scene_File;

/**
 * 初始化文件场景
 * Initialize file scene
 *
 * @memberof Scene_File
 * @method initialize
 * @description 初始化文件场景对象。
 * Initializes the file scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_File.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_File
 * @method create
 * @description 创建文件场景的显示对象，由子类实现具体功能。
 * Creates the display objects for the file scene, implemented by subclasses.
 * @returns {void} 无返回值 No return value
 */
Scene_File.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
};

/**
 * 终止场景
 * Terminate scene
 *
 * @memberof Scene_File
 * @method terminate
 * @description 终止文件场景，由子类实现具体功能。
 * Terminates the file scene, implemented by subclasses.
 * @returns {void} 无返回值 No return value
 */
Scene_File.prototype.terminate = function () {
	Scene_MenuBase.prototype.terminate.call(this);
};
