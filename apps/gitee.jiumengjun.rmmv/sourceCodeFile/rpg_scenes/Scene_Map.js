/**
 * @fileoverview 地图场景类，用于游戏地图画面的显示和交互。
 * Map scene class for displaying and interacting with the game map screen.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//=============================================================================
// 场景_地图
// Scene_Map
//
// 地图场景的场景类。
// The scene class of the map screen.

/**
 * 地图场景类
 * Map scene class
 *
 * @class Scene_Map
 * @description 游戏地图画面的场景类，处理地图显示、角色移动、事件触发等功能。
 * The scene class of the game map screen, handling map display, character movement, event triggering and other functions.
 * @extends Scene_Base
 */
function Scene_Map() {
	this.initialize.apply(this, arguments);
}

Scene_Map.prototype = Object.create(Scene_Base.prototype);
Scene_Map.prototype.constructor = Scene_Map;

/**
 * 初始化地图场景
 * Initialize map scene
 *
 * @memberof Scene_Map
 * @method initialize
 * @description 初始化地图场景对象，设置各种计数器和状态标志。
 * Initializes the map scene object, sets up various counters and status flags.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.initialize = function () {
	Scene_Base.prototype.initialize.call(this);
	this._waitCount = 0;
	this._encounterEffectDuration = 0;
	this._mapLoaded = false;
	this._touchCount = 0;
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Map
 * @method create
 * @description 创建地图场景的基础设置，处理地图数据加载。
 * Creates the basic settings for the map scene, handles map data loading.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.create = function () {
	Scene_Base.prototype.create.call(this);
	this._transfer = $gamePlayer.isTransferring();
	var mapId = this._transfer ? $gamePlayer.newMapId() : $gameMap.mapId();
	DataManager.loadMapData(mapId);
};

/**
 * 检查场景是否准备就绪
 * Check if scene is ready
 *
 * @memberof Scene_Map
 * @method isReady
 * @description 检查地图数据是否加载完成，场景是否准备就绪。
 * Checks if map data is loaded and if the scene is ready.
 * @returns {boolean} 场景是否准备就绪 Whether the scene is ready
 */
Scene_Map.prototype.isReady = function () {
	if (!this._mapLoaded && DataManager.isMapLoaded()) {
		this.onMapLoaded();
		this._mapLoaded = true;
	}
	return this._mapLoaded && Scene_Base.prototype.isReady.call(this);
};

/**
 * 地图加载完成时的处理
 * Processing when map loading is completed
 *
 * @memberof Scene_Map
 * @method onMapLoaded
 * @description 地图数据加载完成后的处理，创建显示对象。
 * Processing after map data loading is completed, creates display objects.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.onMapLoaded = function () {
	if (this._transfer) {
		$gamePlayer.performTransfer();
	}
	this.createDisplayObjects();
};

/**
 * 开始场景
 * Start scene
 *
 * @memberof Scene_Map
 * @method start
 * @description 开始地图场景，处理传送效果和淡入效果。
 * Starts the map scene, handles transfer effects and fade-in effects.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	SceneManager.clearStack();
	if (this._transfer) {
		this.fadeInForTransfer();
		this._mapNameWindow.open();
		$gameMap.autoplay();
	} else if (this.needsFadeIn()) {
		this.startFadeIn(this.fadeSpeed(), false);
	}
	this.menuCalling = false;
};

/**
 * 更新场景
 * Update scene
 *
 * @memberof Scene_Map
 * @method update
 * @description 更新地图场景的各个组件。
 * Updates various components of the map scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.update = function () {
	this.updateDestination();
	this.updateMainMultiply();
	if (this.isSceneChangeOk()) {
		this.updateScene();
	} else if (SceneManager.isNextScene(Scene_Battle)) {
		this.updateEncounterEffect();
	}
	this.updateWaitCount();
	Scene_Base.prototype.update.call(this);
};

/**
 * 加倍更新主函数
 * Update main function with multiply
 *
 * @memberof Scene_Map
 * @method updateMainMultiply
 * @description 在一帧内执行两次主更新函数，实现帧率翻倍效果。
 * Executes the main update function twice in one frame, achieving double frame rate effect.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.updateMainMultiply = function () {
	this.updateMain();
	if (this.isFastForward()) {
		this.updateMain();
	}
};

/**
 * 更新主函数
 * Update main function
 *
 * @memberof Scene_Map
 * @method updateMain
 * @description 更新地图、玩家、计时器和屏幕的主要逻辑。
 * Updates the main logic for map, player, timer and screen.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.updateMain = function () {
	var active = this.isActive();
	$gameMap.update(active);
	$gamePlayer.update(active);
	$gameTimer.update(active);
	$gameScreen.update();
};

/**
 * 检查是否快进
 * Check if fast forward
 *
 * @memberof Scene_Map
 * @method isFastForward
 * @description 检查是否满足快进条件（事件运行中且长按确定键）。
 * Checks if fast forward conditions are met (event running and long press ok button).
 * @returns {boolean} 是否快进 Whether to fast forward
 */
Scene_Map.prototype.isFastForward = function () {
	return (
		$gameMap.isEventRunning() &&
		!SceneManager.isSceneChanging() &&
		(Input.isLongPressed("ok") || TouchInput.isLongPressed())
	);
};

/**
 * 停止场景
 * Stop scene
 *
 * @memberof Scene_Map
 * @method stop
 * @description 停止地图场景，处理场景切换和战斗开始。
 * Stops the map scene, handles scene switching and battle start.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.stop = function () {
	Scene_Base.prototype.stop.call(this);
	$gamePlayer.straighten();
	this._mapNameWindow.close();
	if (this.needsSlowFadeOut()) {
		this.startFadeOut(this.slowFadeSpeed(), false);
	} else if (SceneManager.isNextScene(Scene_Map)) {
		this.fadeOutForTransfer();
	} else if (SceneManager.isNextScene(Scene_Battle)) {
		this.launchBattle();
	}
};

/**
 * 检查场景是否繁忙
 * Check if scene is busy
 *
 * @memberof Scene_Map
 * @method isBusy
 * @description 检查场景是否正在处理其他操作（如消息窗口关闭、等待计数等）。
 * Checks if the scene is processing other operations (such as message window closing, wait count, etc.).
 * @returns {boolean} 场景是否繁忙 Whether the scene is busy
 */
Scene_Map.prototype.isBusy = function () {
	return (
		(this._messageWindow && this._messageWindow.isClosing()) ||
		this._waitCount > 0 ||
		this._encounterEffectDuration > 0 ||
		Scene_Base.prototype.isBusy.call(this)
	);
};

/**
 * 终止场景
 * Terminate scene
 *
 * @memberof Scene_Map
 * @method terminate
 * @description 终止地图场景，清理资源并准备场景切换。
 * Terminates the map scene, cleans up resources and prepares for scene switching.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.terminate = function () {
	Scene_Base.prototype.terminate.call(this);
	if (!SceneManager.isNextScene(Scene_Battle)) {
		this._spriteset.update();
		this._mapNameWindow.hide();
		SceneManager.snapForBackground();
	} else {
		ImageManager.clearRequest();
	}

	if (SceneManager.isNextScene(Scene_Map)) {
		ImageManager.clearRequest();
	}

	$gameScreen.clearZoom();

	this.removeChild(this._fadeSprite);
	this.removeChild(this._mapNameWindow);
	this.removeChild(this._windowLayer);
	this.removeChild(this._spriteset);
};

/**
 * 检查是否需要淡入
 * Check if fade in is needed
 *
 * @memberof Scene_Map
 * @method needsFadeIn
 * @description 检查是否需要执行淡入效果（从战斗或读档场景返回时）。
 * Checks if fade-in effect is needed (when returning from battle or load scene).
 * @returns {boolean} 是否需要淡入 Whether fade in is needed
 */
Scene_Map.prototype.needsFadeIn = function () {
	return SceneManager.isPreviousScene(Scene_Battle) || SceneManager.isPreviousScene(Scene_Load);
};

/**
 * 检查是否需要缓慢淡出
 * Check if slow fade out is needed
 *
 * @memberof Scene_Map
 * @method needsSlowFadeOut
 * @description 检查是否需要执行缓慢淡出效果（切换到标题或游戏结束画面时）。
 * Checks if slow fade-out effect is needed (when switching to title or game over screen).
 * @returns {boolean} 是否需要缓慢淡出 Whether slow fade out is needed
 */
Scene_Map.prototype.needsSlowFadeOut = function () {
	return SceneManager.isNextScene(Scene_Title) || SceneManager.isNextScene(Scene_Gameover);
};

/**
 * 更新等待计数
 * Update wait count
 *
 * @memberof Scene_Map
 * @method updateWaitCount
 * @description 更新并递减等待计数，控制场景操作的时序。
 * Updates and decrements the wait count, controls the timing of scene operations.
 * @returns {boolean} 是否仍在等待 Whether still waiting
 */
Scene_Map.prototype.updateWaitCount = function () {
	if (this._waitCount > 0) {
		this._waitCount--;
		return true;
	}
	return false;
};

/**
 * 更新目的地
 * Update destination
 *
 * @memberof Scene_Map
 * @method updateDestination
 * @description 更新玩家触摸移动的目的地。
 * Updates the destination for player touch movement.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.updateDestination = function () {
	if (this.isMapTouchOk()) {
		this.processMapTouch();
	} else {
		$gameTemp.clearDestination();
		this._touchCount = 0;
	}
};

/**
 * 检查地图是否可以触摸
 * Check if map can be touched
 *
 * @memberof Scene_Map
 * @method isMapTouchOk
 * @description 检查地图是否处于可触摸状态（场景激活且玩家可以移动）。
 * Checks if the map is in a touchable state (scene active and player can move).
 * @returns {boolean} 地图是否可以触摸 Whether the map can be touched
 */
Scene_Map.prototype.isMapTouchOk = function () {
	return this.isActive() && $gamePlayer.canMove();
};

/**
 * 处理地图触摸
 * Process map touch
 *
 * @memberof Scene_Map
 * @method processMapTouch
 * @description 处理玩家对地图的触摸操作，设置移动目的地。
 * Processes player's touch operations on the map, sets movement destination.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.processMapTouch = function () {
	if (TouchInput.isTriggered() || this._touchCount > 0) {
		if (TouchInput.isPressed()) {
			if (this._touchCount === 0 || this._touchCount >= 15) {
				var x = $gameMap.canvasToMapX(TouchInput.x);
				var y = $gameMap.canvasToMapY(TouchInput.y);
				$gameTemp.setDestination(x, y);
			}
			this._touchCount++;
		} else {
			this._touchCount = 0;
		}
	}
};

/**
 * 检查场景切换是否准备就绪
 * Check if scene change is ready
 *
 * @memberof Scene_Map
 * @method isSceneChangeOk
 * @description 检查是否可以进行场景切换（场景激活且消息系统不繁忙）。
 * Checks if scene change can be performed (scene active and message system not busy).
 * @returns {boolean} 场景切换是否准备就绪 Whether scene change is ready
 */
Scene_Map.prototype.isSceneChangeOk = function () {
	return this.isActive() && !$gameMessage.isBusy();
};

/**
 * 更新场景
 * Update scene
 *
 * @memberof Scene_Map
 * @method updateScene
 * @description 更新场景相关的各种检查（游戏结束、传送、遇敌、菜单等）。
 * Updates various scene-related checks (game over, transfer, encounter, menu, etc.).
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.updateScene = function () {
	this.checkGameover();
	if (!SceneManager.isSceneChanging()) {
		this.updateTransferPlayer();
	}
	if (!SceneManager.isSceneChanging()) {
		this.updateEncounter();
	}
	if (!SceneManager.isSceneChanging()) {
		this.updateCallMenu();
	}
	if (!SceneManager.isSceneChanging()) {
		this.updateCallDebug();
	}
};

/**
 * 创建显示对象
 * Create display objects
 *
 * @memberof Scene_Map
 * @method createDisplayObjects
 * @description 创建地图场景所需的各种显示对象。
 * Creates various display objects needed for the map scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.createDisplayObjects = function () {
	this.createSpriteset();
	this.createMapNameWindow();
	this.createWindowLayer();
	this.createAllWindows();
};

/**
 * 创建精灵组
 * Create spriteset
 *
 * @memberof Scene_Map
 * @method createSpriteset
 * @description 创建地图精灵组，包含地图、角色等各种精灵。
 * Creates the map spriteset, containing various sprites such as map, characters, etc.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.createSpriteset = function () {
	this._spriteset = new Spriteset_Map();
	this.addChild(this._spriteset);
};

/**
 * 创建所有窗口
 * Create all windows
 *
 * @memberof Scene_Map
 * @method createAllWindows
 * @description 创建地图场景需要的所有窗口。
 * Creates all windows needed for the map scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.createAllWindows = function () {
	this.createMessageWindow();
	this.createScrollTextWindow();
};

/**
 * 创建地图名字窗口
 * Create map name window
 *
 * @memberof Scene_Map
 * @method createMapNameWindow
 * @description 创建显示地图名称的窗口。
 * Creates the window for displaying the map name.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.createMapNameWindow = function () {
	this._mapNameWindow = new Window_MapName();
	this.addChild(this._mapNameWindow);
};

/**
 * 创建消息窗口
 * Create message window
 *
 * @memberof Scene_Map
 * @method createMessageWindow
 * @description 创建显示对话和消息的窗口。
 * Creates the window for displaying dialogue and messages.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.createMessageWindow = function () {
	this._messageWindow = new Window_Message();
	this.addWindow(this._messageWindow);
	this._messageWindow.subWindows().forEach(function (window) {
		this.addWindow(window);
	}, this);
};

/**
 * 创建滚动文字窗口
 * Create scroll text window
 *
 * @memberof Scene_Map
 * @method createScrollTextWindow
 * @description 创建显示滚动文字的窗口。
 * Creates the window for displaying scrolling text.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.createScrollTextWindow = function () {
	this._scrollTextWindow = new Window_ScrollText();
	this.addWindow(this._scrollTextWindow);
};

/**
 * 更新传送玩家
 * Update transfer player
 *
 * @memberof Scene_Map
 * @method updateTransferPlayer
 * @description 检查并处理玩家传送请求。
 * Checks and handles player transfer requests.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.updateTransferPlayer = function () {
	if ($gamePlayer.isTransferring()) {
		SceneManager.goto(Scene_Map);
	}
};

/**
 * 更新遇敌
 * Update encounter
 *
 * @memberof Scene_Map
 * @method updateEncounter
 * @description 检查并处理随机遇敌事件。
 * Checks and handles random encounter events.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.updateEncounter = function () {
	if ($gamePlayer.executeEncounter()) {
		SceneManager.push(Scene_Battle);
	}
};

/**
 * 更新呼叫菜单
 * Update call menu
 *
 * @memberof Scene_Map
 * @method updateCallMenu
 * @description 检查并处理菜单呼叫请求。
 * Checks and handles menu call requests.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.updateCallMenu = function () {
	if (this.isMenuEnabled()) {
		if (this.isMenuCalled()) {
			this.menuCalling = true;
		}
		if (this.menuCalling && !$gamePlayer.isMoving()) {
			this.callMenu();
		}
	} else {
		this.menuCalling = false;
	}
};

/**
 * 检查菜单是否启用
 * Check if menu is enabled
 *
 * @memberof Scene_Map
 * @method isMenuEnabled
 * @description 检查菜单是否可以启用（系统菜单启用且没有事件运行）。
 * Checks if the menu can be enabled (system menu enabled and no event running).
 * @returns {boolean} 菜单是否启用 Whether the menu is enabled
 */
Scene_Map.prototype.isMenuEnabled = function () {
	return $gameSystem.isMenuEnabled() && !$gameMap.isEventRunning();
};

/**
 * 检查菜单是否被呼叫
 * Check if menu is called
 *
 * @memberof Scene_Map
 * @method isMenuCalled
 * @description 检查玩家是否按下了菜单键。
 * Checks if the player pressed the menu button.
 * @returns {boolean} 菜单是否被呼叫 Whether the menu is called
 */
Scene_Map.prototype.isMenuCalled = function () {
	return Input.isTriggered("menu") || TouchInput.isCancelled();
};

/**
 * 呼叫菜单
 * Call menu
 *
 * @memberof Scene_Map
 * @method callMenu
 * @description 执行菜单呼叫，打开菜单场景。
 * Executes menu call, opens the menu scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.callMenu = function () {
	SoundManager.playOk();
	SceneManager.push(Scene_Menu);
	Window_MenuCommand.initCommandPosition();
	$gameTemp.clearDestination();
	this._mapNameWindow.hide();
	this._waitCount = 2;
};

/**
 * 更新呼叫调试
 * Update call debug
 *
 * @memberof Scene_Map
 * @method updateCallDebug
 * @description 检查并处理调试模式呼叫。
 * Checks and handles debug mode calls.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.updateCallDebug = function () {
	if (this.isDebugCalled()) {
		SceneManager.push(Scene_Debug);
	}
};

/**
 * 检查调试是否被呼叫
 * Check if debug is called
 *
 * @memberof Scene_Map
 * @method isDebugCalled
 * @description 检查是否按下了调试键（仅在测试模式下有效）。
 * Checks if the debug button is pressed (only effective in test mode).
 * @returns {boolean} 调试是否被呼叫 Whether debug is called
 */
Scene_Map.prototype.isDebugCalled = function () {
	return Input.isTriggered("debug") && $gameTemp.isPlaytest();
};

/**
 * 传送淡入效果
 * Fade in for transfer
 *
 * @memberof Scene_Map
 * @method fadeInForTransfer
 * @description 执行传送时的淡入效果。
 * Executes fade-in effect for transfer.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.fadeInForTransfer = function () {
	var fadeType = $gamePlayer.fadeType();
	switch (fadeType) {
		case 0:
		case 1:
			this.startFadeIn(this.fadeSpeed(), fadeType === 1);
			break;
	}
};

/**
 * 传送淡出效果
 * Fade out for transfer
 *
 * @memberof Scene_Map
 * @method fadeOutForTransfer
 * @description 执行传送时的淡出效果。
 * Executes fade-out effect for transfer.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.fadeOutForTransfer = function () {
	var fadeType = $gamePlayer.fadeType();
	switch (fadeType) {
		case 0:
		case 1:
			this.startFadeOut(this.fadeSpeed(), fadeType === 1);
			break;
	}
};

/**
 * 发起战斗
 * Launch battle
 *
 * @memberof Scene_Map
 * @method launchBattle
 * @description 准备并开始战斗。
 * Prepares and starts battle.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.launchBattle = function () {
	BattleManager.saveBgmAndBgs();
	this.stopAudioOnBattleStart();
	SoundManager.playBattleStart();
	this.startEncounterEffect();
	this._mapNameWindow.hide();
};

/**
 * 战斗开始时停止音频
 * Stop audio on battle start
 *
 * @memberof Scene_Map
 * @method stopAudioOnBattleStart
 * @description 战斗开始时停止背景音乐和音效。
 * Stops background music and sound effects when battle starts.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.stopAudioOnBattleStart = function () {
	if (!AudioManager.isCurrentBgm($gameSystem.battleBgm())) {
		AudioManager.stopBgm();
	}
	AudioManager.stopBgs();
	AudioManager.stopMe();
	AudioManager.stopSe();
};

/**
 * 开始遇敌效果
 * Start encounter effect
 *
 * @memberof Scene_Map
 * @method startEncounterEffect
 * @description 开始遇敌时的视觉效果。
 * Starts the visual effect when encountering enemies.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.startEncounterEffect = function () {
	this._spriteset.hideCharacters();
	this._encounterEffectDuration = this.encounterEffectSpeed();
};

/**
 * 更新遇敌效果
 * Update encounter effect
 *
 * @memberof Scene_Map
 * @method updateEncounterEffect
 * @description 更新遇敌时的缩放和闪烁效果。
 * Updates the zoom and flash effects during encounter.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.updateEncounterEffect = function () {
	if (this._encounterEffectDuration > 0) {
		this._encounterEffectDuration--;
		var speed = this.encounterEffectSpeed();
		var n = speed - this._encounterEffectDuration;
		var p = n / speed;
		var q = ((p - 1) * 20 * p + 5) * p + 1;
		var zoomX = $gamePlayer.screenX();
		var zoomY = $gamePlayer.screenY() - 24;
		if (n === 2) {
			$gameScreen.setZoom(zoomX, zoomY, 1);
			this.snapForBattleBackground();
			this.startFlashForEncounter(speed / 2);
		}
		$gameScreen.setZoom(zoomX, zoomY, q);
		if (n === Math.floor(speed / 6)) {
			this.startFlashForEncounter(speed / 2);
		}
		if (n === Math.floor(speed / 2)) {
			BattleManager.playBattleBgm();
			this.startFadeOut(this.fadeSpeed());
		}
	}
};

/**
 * 为战斗背景拍摄快照
 * Snap for battle background
 *
 * @memberof Scene_Map
 * @method snapForBattleBackground
 * @description 为战斗背景拍摄当前地图的快照。
 * Takes a snapshot of the current map for battle background.
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.snapForBattleBackground = function () {
	this._windowLayer.visible = false;
	SceneManager.snapForBackground();
	this._windowLayer.visible = true;
};

/**
 * 开始遇敌闪烁效果
 * Start flash for encounter
 *
 * @memberof Scene_Map
 * @method startFlashForEncounter
 * @description 开始遇敌时的屏幕闪烁效果。
 * Starts the screen flash effect for encounter.
 * @param {number} duration - 持续时间 Duration
 * @returns {void} 无返回值 No return value
 */
Scene_Map.prototype.startFlashForEncounter = function (duration) {
	var color = [255, 255, 255, 255];
	$gameScreen.startFlash(color, duration);
};

/**
 * 获取遇敌效果速度
 * Get encounter effect speed
 *
 * @memberof Scene_Map
 * @method encounterEffectSpeed
 * @description 获取遇敌效果的持续帧数。
 * Gets the duration frames for the encounter effect.
 * @returns {number} 遇敌效果速度 Encounter effect speed
 */
Scene_Map.prototype.encounterEffectSpeed = function () {
	return 60;
};
