/**
 * @fileoverview 启动场景类，负责游戏的初始化和系统资源加载。
 * Boot scene class, responsible for game initialization and system resource loading.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_启动
// Scene_Boot
//
// 启动画面的场景类。
// The scene class of the boot screen.

/**
 * 启动场景类
 * Boot scene class
 *
 * @class Scene_Boot
 * @description 游戏启动时的场景类，负责初始化游戏系统、加载数据库和系统资源。
 * The scene class when the game starts, responsible for initializing the game system, loading database and system resources.
 * @extends Scene_Base
 */
function Scene_Boot() {
	this.initialize.apply(this, arguments);
}

Scene_Boot.prototype = Object.create(Scene_Base.prototype);
Scene_Boot.prototype.constructor = Scene_Boot;

/**
 * 初始化启动场景
 * Initialize boot scene
 *
 * @memberof Scene_Boot
 * @method initialize
 * @description 初始化启动场景对象，记录启动时间。
 * Initializes the boot scene object, records the start time.
 * @returns {void} 无返回值 No return value
 */
Scene_Boot.prototype.initialize = function () {
	Scene_Base.prototype.initialize.call(this);
	this._startDate = Date.now();
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Boot
 * @method create
 * @description 创建启动场景的显示对象，加载数据库和配置。
 * Creates the display objects for the boot scene, loads database and configuration.
 * @returns {void} 无返回值 No return value
 */
Scene_Boot.prototype.create = function () {
	Scene_Base.prototype.create.call(this);
	DataManager.loadDatabase();
	ConfigManager.load();
	this.loadSystemWindowImage();
};

/**
 * 加载系统窗口图像
 * Load system window image
 *
 * @memberof Scene_Boot
 * @method loadSystemWindowImage
 * @description 预留系统窗口图像资源。
 * Reserves the system window image resource.
 * @returns {void} 无返回值 No return value
 */
Scene_Boot.prototype.loadSystemWindowImage = function () {
	ImageManager.reserveSystem("Window");
};

/**
 * 加载系统图像
 * Load system images
 *
 * @memberof Scene_Boot
 * @method loadSystemImages
 * @static
 * @description 预留所有系统图像资源，包括图标、对话框、阴影等。
 * Reserves all system image resources, including icons, dialog boxes, shadows, etc.
 * @returns {void} 无返回值 No return value
 */
Scene_Boot.loadSystemImages = function () {
	ImageManager.reserveSystem("IconSet");
	ImageManager.reserveSystem("Balloon");
	ImageManager.reserveSystem("Shadow1");
	ImageManager.reserveSystem("Shadow2");
	ImageManager.reserveSystem("Damage");
	ImageManager.reserveSystem("States");
	ImageManager.reserveSystem("Weapons1");
	ImageManager.reserveSystem("Weapons2");
	ImageManager.reserveSystem("Weapons3");
	ImageManager.reserveSystem("ButtonSet");
};

/**
 * 检查是否准备就绪
 * Check if ready
 *
 * @memberof Scene_Boot
 * @method isReady
 * @description 检查数据库和游戏字体是否加载完成。
 * Checks whether the database and game font are loaded.
 * @returns {Boolean} 如果准备就绪则返回true - Returns true if ready
 */
Scene_Boot.prototype.isReady = function () {
	if (Scene_Base.prototype.isReady.call(this)) {
		return DataManager.isDatabaseLoaded() && this.isGameFontLoaded();
	} else {
		return false;
	}
};

/**
 * 检查游戏字体是否加载
 * Check if game font is loaded
 *
 * @memberof Scene_Boot
 * @method isGameFontLoaded
 * @description 检查游戏字体是否加载完成，如果超过60秒未加载则抛出错误。
 * Checks whether the game font is loaded, throws an error if not loaded after 60 seconds.
 * @returns {Boolean|undefined} 如果字体加载则返回true，超时则抛出错误 - Returns true if font is loaded, throws error on timeout
 */
Scene_Boot.prototype.isGameFontLoaded = function () {
	if (Graphics.isFontLoaded("GameFont")) {
		return true;
	} else if (!Graphics.canUseCssFontLoading()) {
		var elapsed = Date.now() - this._startDate;
		if (elapsed >= 60000) {
			throw new Error("Failed to load GameFont");
		}
	}
};

/**
 * 开始场景
 * Start scene
 *
 * @memberof Scene_Boot
 * @method start
 * @description 开始启动场景，预加载重要音效并根据测试模式跳转到相应场景。
 * Starts the boot scene, preloads important sounds and jumps to appropriate scene based on test mode.
 * @returns {void} 无返回值 No return value
 */
Scene_Boot.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	SoundManager.preloadImportantSounds();
	if (DataManager.isBattleTest()) {
		DataManager.setupBattleTest();
		SceneManager.goto(Scene_Battle);
	} else if (DataManager.isEventTest()) {
		DataManager.setupEventTest();
		SceneManager.goto(Scene_Map);
	} else {
		this.checkPlayerLocation();
		DataManager.setupNewGame();
		SceneManager.goto(Scene_Title);
		Window_TitleCommand.initCommandPosition();
	}
	this.updateDocumentTitle();
};

/**
 * 更新文档标题
 * Update document title
 *
 * @memberof Scene_Boot
 * @method updateDocumentTitle
 * @description 更新浏览器文档标题为游戏标题。
 * Updates the browser document title to the game title.
 * @returns {void} 无返回值 No return value
 */
Scene_Boot.prototype.updateDocumentTitle = function () {
	document.title = $dataSystem.gameTitle;
};

/**
 * 检查玩家位置
 * Check player location
 *
 * @memberof Scene_Boot
 * @method checkPlayerLocation
 * @description 检查玩家的起始位置是否设置，如果未设置则抛出错误。
 * Checks whether the player's starting position is set, throws an error if not set.
 * @returns {void} 无返回值 No return value
 */
Scene_Boot.prototype.checkPlayerLocation = function () {
	if ($dataSystem.startMapId === 0) {
		throw new Error("Player's starting position is not set");
	}
};
