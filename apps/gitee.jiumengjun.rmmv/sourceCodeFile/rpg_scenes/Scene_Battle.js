/**
 * @fileoverview 战斗场景类，战斗画面的场景类，处理战斗中的所有界面和交互。
 * Battle scene class, the scene class of the battle screen, handles all UI and interactions during battle.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

//-----------------------------------------------------------------------------
/**
 * Scene_Battle - 战斗场景类
 *
 * 战斗画面的场景类。
 * 负责战斗中的用户界面、输入处理、窗口管理和战斗流程控制。
 *
 * The scene class of the battle screen.
 * Responsible for battle UI, input handling, window management and battle flow control.
 *
 * @class Scene_Battle
 * @extends Scene_Base
 */
function Scene_Battle() {
	this.initialize.apply(this, arguments);
}

Scene_Battle.prototype = Object.create(Scene_Base.prototype);
Scene_Battle.prototype.constructor = Scene_Battle;

/**
 * 初始化战斗场景
 * Initialize battle scene
 *
 * @memberof Scene_Battle
 * @method initialize
 * @description 初始化战斗场景对象。
 * Initializes the battle scene object.
 * @returns {void} 无返回值 No return value
 */
Scene_Battle.prototype.initialize = function () {
	Scene_Base.prototype.initialize.call(this);
};

/**
 * 创建场景
 * Create scene
 *
 * @memberof Scene_Battle
 * @method create
 * @description 创建战斗场景的显示对象。
 * Creates the display objects for the battle scene.
 * @returns {void} 无返回值 No return value
 */
Scene_Battle.prototype.create = function () {
	Scene_Base.prototype.create.call(this);
	this.createDisplayObjects();
};

/**
 * 开始场景
 * Start scene
 *
 * @memberof Scene_Battle
 * @method start
 * @description 开始战斗场景，播放战斗BGM并开始战斗。
 * Starts the battle scene, plays battle BGM and starts the battle.
 * @returns {void} 无返回值 No return value
 */
Scene_Battle.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	this.startFadeIn(this.fadeSpeed(), false);
	BattleManager.playBattleBgm();
	BattleManager.startBattle();
};

/**
 * 更新场景
 * Update scene
 *
 * @memberof Scene_Battle
 * @method update
 * @description 每帧更新战斗场景状态。
 * Updates the battle scene state each frame.
 * @returns {void} 无返回值 No return value
 */
Scene_Battle.prototype.update = function () {
	var active = this.isActive();
	$gameTimer.update(active);
	$gameScreen.update();
	this.updateStatusWindow();
	this.updateWindowPositions();
	if (active && !this.isBusy()) {
		this.updateBattleProcess();
	}
	Scene_Base.prototype.update.call(this);
};

/**
 * 更新战斗流程
 * Update battle process
 *
 * @memberof Scene_Battle
 * @method updateBattleProcess
 * @description 更新战斗管理器的状态。
 * Updates the battle manager state.
 * @returns {void} 无返回值 No return value
 */
Scene_Battle.prototype.updateBattleProcess = function () {
	if (!this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
		BattleManager.update();
		this.changeInputWindow();
	}
};

/**
 * 检查是否有任何输入窗口处于活动状态
 * Check if any input window is active
 *
 * @memberof Scene_Battle
 * @method isAnyInputWindowActive
 * @returns {Boolean} 是否有活动的输入窗口 - Whether any input window is active
 */
Scene_Battle.prototype.isAnyInputWindowActive = function () {
	return (
		this._partyCommandWindow.active ||
		this._actorCommandWindow.active ||
		this._skillWindow.active ||
		this._itemWindow.active ||
		this._actorWindow.active ||
		this._enemyWindow.active
	);
};

/**
 * 改变输入窗口
 * Change input window
 *
 * @memberof Scene_Battle
 * @method changeInputWindow
 * @description 根据战斗状态改变当前活动的输入窗口。
 * Changes the current active input window based on battle state.
 * @returns {void} 无返回值 No return value
 */
Scene_Battle.prototype.changeInputWindow = function () {
	if (BattleManager.isInputting()) {
		if (BattleManager.actor()) {
			this.startActorCommandSelection();
		} else {
			this.startPartyCommandSelection();
		}
	} else {
		this.endCommandSelection();
	}
};

/**
 * 停止场景
 * Stop scene
 *
 * @memberof Scene_Battle
 * @method stop
 * @description 停止战斗场景，关闭窗口并开始淡出。
 * Stops the battle scene, closes windows and starts fade out.
 * @returns {void} 无返回值 No return value
 */
Scene_Battle.prototype.stop = function () {
	Scene_Base.prototype.stop.call(this);
	if (this.needsSlowFadeOut()) {
		this.startFadeOut(this.slowFadeSpeed(), false);
	} else {
		this.startFadeOut(this.fadeSpeed(), false);
	}
	this._statusWindow.close();
	this._partyCommandWindow.close();
	this._actorCommandWindow.close();
};

/**
 * 结束场景
 * Terminate scene
 *
 * @memberof Scene_Battle
 * @method terminate
 * @description 终止战斗场景，处理战斗结束逻辑。
 * Terminates the battle scene, handles battle end logic.
 * @returns {void} 无返回值 No return value
 */
Scene_Battle.prototype.terminate = function () {
	Scene_Base.prototype.terminate.call(this);
	$gameParty.onBattleEnd();
	$gameTroop.onBattleEnd();
	AudioManager.stopMe();

	ImageManager.clearRequest();
};

/**
 * 检查是否需要缓慢淡出
 * Check if needs slow fade out
 *
 * @memberof Scene_Battle
 * @method needsSlowFadeOut
 * @returns {Boolean} 是否需要缓慢淡出 - Whether needs slow fade out
 */
Scene_Battle.prototype.needsSlowFadeOut = function () {
	return SceneManager.isNextScene(Scene_Title) || SceneManager.isNextScene(Scene_Gameover);
};

/**
 * 更新状态窗口
 * Update status window
 *
 * @memberof Scene_Battle
 * @method updateStatusWindow
 * @description 根据消息状态更新状态窗口的显示。
 * Updates the status window display based on message state.
 * @returns {void} 无返回值 No return value
 */
Scene_Battle.prototype.updateStatusWindow = function () {
	if ($gameMessage.isBusy()) {
		this._statusWindow.close();
		this._partyCommandWindow.close();
		this._actorCommandWindow.close();
	} else if (this.isActive() && !this._messageWindow.isClosing()) {
		this._statusWindow.open();
	}
};

/**
 * 更新窗口位置
 * Update window positions
 *
 * @memberof Scene_Battle
 * @method updateWindowPositions
 * @description 根据战斗输入状态动态调整状态窗口的水平位置，实现平滑过渡效果。
 * Dynamically adjusts the horizontal position of the status window based on battle input state, implementing smooth transition effects.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.updateWindowPositions = function () {
	var statusX = 0;
	if (BattleManager.isInputting()) {
		statusX = this._partyCommandWindow.width;
	} else {
		statusX = this._partyCommandWindow.width / 2;
	}
	if (this._statusWindow.x < statusX) {
		this._statusWindow.x += 16;
		if (this._statusWindow.x > statusX) {
			this._statusWindow.x = statusX;
		}
	}
	if (this._statusWindow.x > statusX) {
		this._statusWindow.x -= 16;
		if (this._statusWindow.x < statusX) {
			this._statusWindow.x = statusX;
		}
	}
};

/**
 * 创建显示对象
 * Create display objects
 *
 * @memberof Scene_Battle
 * @method createDisplayObjects
 * @description 创建战斗场景所需的所有显示对象，包括精灵组、窗口层和各种窗口，并设置战斗管理器的相关引用。
 * Creates all display objects needed for the battle scene, including spriteset, window layer and various windows, and sets up battle manager references.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createDisplayObjects = function () {
	this.createSpriteset();
	this.createWindowLayer();
	this.createAllWindows();
	BattleManager.setLogWindow(this._logWindow);
	BattleManager.setStatusWindow(this._statusWindow);
	BattleManager.setSpriteset(this._spriteset);
	this._logWindow.setSpriteset(this._spriteset);
};

/**
 * 创建精灵组
 * Create spriteset
 *
 * @memberof Scene_Battle
 * @method createSpriteset
 * @description 创建战斗精灵组并添加到场景中，精灵组负责显示战斗背景、敌人和角色。
 * Creates the battle spriteset and adds it to the scene, the spriteset is responsible for displaying battle background, enemies and actors.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createSpriteset = function () {
	this._spriteset = new Spriteset_Battle();
	this.addChild(this._spriteset);
};

/**
 * 创建所有窗口
 * Create all windows
 *
 * @memberof Scene_Battle
 * @method createAllWindows
 * @description 创建战斗场景中所需的所有用户界面窗口，包括日志、状态、指令和选择窗口等。
 * Creates all user interface windows needed in the battle scene, including log, status, command and selection windows.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createAllWindows = function () {
	this.createLogWindow();
	this.createStatusWindow();
	this.createPartyCommandWindow();
	this.createActorCommandWindow();
	this.createHelpWindow();
	this.createSkillWindow();
	this.createItemWindow();
	this.createActorWindow();
	this.createEnemyWindow();
	this.createMessageWindow();
	this.createScrollTextWindow();
};

/**
 * 创建日志窗口
 * Create log window
 *
 * @memberof Scene_Battle
 * @method createLogWindow
 * @description 创建战斗日志窗口实例并添加到场景中，用于显示战斗过程中的文本信息。
 * Creates the battle log window instance and adds it to the scene, used for displaying text information during battle.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createLogWindow = function () {
	this._logWindow = new Window_BattleLog();
	this.addWindow(this._logWindow);
};

/**
 * 创建状态窗口
 * Create status window
 *
 * @memberof Scene_Battle
 * @method createStatusWindow
 * @description 创建战斗状态窗口实例并添加到场景中，用于显示队伍成员的HP、MP等状态信息。
 * Creates the battle status window instance and adds it to the scene, used for displaying HP, MP and other status information of party members.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createStatusWindow = function () {
	this._statusWindow = new Window_BattleStatus();
	this.addWindow(this._statusWindow);
};

/**
 * 创建队伍指令窗口
 * Create party command window
 *
 * @memberof Scene_Battle
 * @method createPartyCommandWindow
 * @description 创建队伍指令窗口实例并设置战斗和逃跑指令的事件处理器，用于选择队伍整体行动。
 * Creates the party command window instance and sets up event handlers for fight and escape commands, used for selecting overall party actions.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createPartyCommandWindow = function () {
	this._partyCommandWindow = new Window_PartyCommand();
	this._partyCommandWindow.setHandler("fight", this.commandFight.bind(this));
	this._partyCommandWindow.setHandler("escape", this.commandEscape.bind(this));
	this._partyCommandWindow.deselect();
	this.addWindow(this._partyCommandWindow);
};

/**
 * 创建角色指令窗口
 * Create actor command window
 *
 * @memberof Scene_Battle
 * @method createActorCommandWindow
 * @description 创建角色指令窗口实例并设置攻击、技能、防御、物品等指令的事件处理器，用于选择单个角色的行动。
 * Creates the actor command window instance and sets up event handlers for attack, skill, guard, item and other commands, used for selecting individual actor actions.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createActorCommandWindow = function () {
	this._actorCommandWindow = new Window_ActorCommand();
	this._actorCommandWindow.setHandler("attack", this.commandAttack.bind(this));
	this._actorCommandWindow.setHandler("skill", this.commandSkill.bind(this));
	this._actorCommandWindow.setHandler("guard", this.commandGuard.bind(this));
	this._actorCommandWindow.setHandler("item", this.commandItem.bind(this));
	this._actorCommandWindow.setHandler("cancel", this.selectPreviousCommand.bind(this));
	this.addWindow(this._actorCommandWindow);
};

/**
 * 创建帮助窗口
 * Create help window
 *
 * @memberof Scene_Battle
 * @method createHelpWindow
 * @description 创建帮助窗口实例并设置为默认隐藏状态，用于显示技能、物品等的详细说明信息。
 * Creates the help window instance and sets it to hidden state by default, used for displaying detailed description information of skills, items, etc.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createHelpWindow = function () {
	this._helpWindow = new Window_Help();
	this._helpWindow.visible = false;
	this.addWindow(this._helpWindow);
};

/**
 * 创建技能窗口
 * Create skill window
 *
 * @memberof Scene_Battle
 * @method createSkillWindow
 * @description 创建技能选择窗口实例并设置相关的事件处理器，用于在战斗中选择和使用技能。
 * Creates the skill selection window instance and sets up related event handlers, used for selecting and using skills in battle.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createSkillWindow = function () {
	var wy = this._helpWindow.y + this._helpWindow.height;
	var wh = this._statusWindow.y - wy;
	this._skillWindow = new Window_BattleSkill(0, wy, Graphics.boxWidth, wh);
	this._skillWindow.setHelpWindow(this._helpWindow);
	this._skillWindow.setHandler("ok", this.onSkillOk.bind(this));
	this._skillWindow.setHandler("cancel", this.onSkillCancel.bind(this));
	this.addWindow(this._skillWindow);
};

/**
 * 创建物品窗口
 * Create item window
 *
 * @memberof Scene_Battle
 * @method createItemWindow
 * @description 创建物品选择窗口实例并设置相关的事件处理器，用于在战斗中选择和使用物品。
 * Creates the item selection window instance and sets up related event handlers, used for selecting and using items in battle.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createItemWindow = function () {
	var wy = this._helpWindow.y + this._helpWindow.height;
	var wh = this._statusWindow.y - wy;
	this._itemWindow = new Window_BattleItem(0, wy, Graphics.boxWidth, wh);
	this._itemWindow.setHelpWindow(this._helpWindow);
	this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
	this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
	this.addWindow(this._itemWindow);
};

/**
 * 创建角色窗口
 * Create actor window
 *
 * @memberof Scene_Battle
 * @method createActorWindow
 * @description 创建角色选择窗口实例并设置事件处理器，用于选择技能或物品的使用目标角色。
 * Creates the actor selection window instance and sets up event handlers, used for selecting target actors for skill or item usage.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createActorWindow = function () {
	this._actorWindow = new Window_BattleActor(0, this._statusWindow.y);
	this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
	this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
	this.addWindow(this._actorWindow);
};

/**
 * 创建敌人窗口
 * Create enemy window
 *
 * @memberof Scene_Battle
 * @method createEnemyWindow
 * @description 创建敌人选择窗口实例并设置事件处理器，用于选择攻击或技能的目标敌人。
 * Creates the enemy selection window instance and sets up event handlers, used for selecting target enemies for attacks or skills.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createEnemyWindow = function () {
	this._enemyWindow = new Window_BattleEnemy(0, this._statusWindow.y);
	this._enemyWindow.x = Graphics.boxWidth - this._enemyWindow.width;
	this._enemyWindow.setHandler("ok", this.onEnemyOk.bind(this));
	this._enemyWindow.setHandler("cancel", this.onEnemyCancel.bind(this));
	this.addWindow(this._enemyWindow);
};

/**
 * 创建信息窗口
 * Create message window
 *
 * @memberof Scene_Battle
 * @method createMessageWindow
 * @description 创建消息窗口实例并添加其子窗口到场景中，用于显示战斗中的对话和系统消息。
 * Creates the message window instance and adds its sub-windows to the scene, used for displaying dialogue and system messages during battle.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createMessageWindow = function () {
	this._messageWindow = new Window_Message();
	this.addWindow(this._messageWindow);
	this._messageWindow.subWindows().forEach(function (window) {
		this.addWindow(window);
	}, this);
};

/**
 * 创建滚动文本窗口
 * Create scroll text window
 *
 * @memberof Scene_Battle
 * @method createScrollTextWindow
 * @description 创建滚动文本窗口实例并添加到场景中，用于显示战斗开始或结束时的滚动文本效果。
 * Creates the scrolling text window instance and adds it to the scene, used for displaying scrolling text effects at battle start or end.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.createScrollTextWindow = function () {
	this._scrollTextWindow = new Window_ScrollText();
	this.addWindow(this._scrollTextWindow);
};

/**
 * 刷新状态
 * Refresh status
 *
 * @memberof Scene_Battle
 * @method refreshStatus
 * @description 刷新状态窗口的显示内容，更新队伍成员的状态信息。
 * Refreshes the display content of the status window, updating the status information of party members.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.refreshStatus = function () {
	this._statusWindow.refresh();
};

/**
 * 开始队伍指令选择
 * Start party command selection
 *
 * @memberof Scene_Battle
 * @method startPartyCommandSelection
 * @description 开始队伍指令选择模式，刷新状态并打开队伍指令窗口，让玩家选择战斗或逃跑。
 * Starts party command selection mode, refreshes status and opens the party command window, allowing player to choose fight or escape.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.startPartyCommandSelection = function () {
	this.refreshStatus();
	this._statusWindow.deselect();
	this._statusWindow.open();
	this._actorCommandWindow.close();
	this._partyCommandWindow.setup();
};

/**
 * 战斗指令
 * Fight command
 *
 * @memberof Scene_Battle
 * @method commandFight
 * @description 处理玩家选择战斗指令，进入下一个角色的指令选择状态。
 * Handles player selecting the fight command, proceeding to the next character's command selection state.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.commandFight = function () {
	this.selectNextCommand();
};

/**
 * 逃跑指令
 * Escape command
 *
 * @memberof Scene_Battle
 * @method commandEscape
 * @description 处理玩家选择逃跑指令，触发战斗管理器的逃跑处理流程。
 * Handles player selecting the escape command, triggering the battle manager's escape handling process.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.commandEscape = function () {
	BattleManager.processEscape();
	this.changeInputWindow();
};

/**
 * 开始角色指令选择
 * Start actor command selection
 *
 * @memberof Scene_Battle
 * @method startActorCommandSelection
 * @description 开始角色指令选择模式，选择当前行动角色并打开角色指令窗口。
 * Starts actor command selection mode, selects the current acting character and opens the actor command window.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.startActorCommandSelection = function () {
	this._statusWindow.select(BattleManager.actor().index());
	this._partyCommandWindow.close();
	this._actorCommandWindow.setup(BattleManager.actor());
};

/**
 * 攻击指令
 * Attack command
 *
 * @memberof Scene_Battle
 * @method commandAttack
 * @description 处理玩家选择攻击指令，设置当前行动为普通攻击并进入敌人选择状态。
 * Handles player selecting the attack command, sets the current action to normal attack and enters enemy selection state.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.commandAttack = function () {
	BattleManager.inputtingAction().setAttack();
	this.selectEnemySelection();
};

/**
 * 技能指令
 * Skill command
 *
 * @memberof Scene_Battle
 * @method commandSkill
 * @description 处理玩家选择技能指令，打开技能选择窗口并显示当前角色的可用技能。
 * Handles player selecting the skill command, opens the skill selection window and displays the current character's available skills.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.commandSkill = function () {
	this._skillWindow.setActor(BattleManager.actor());
	this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
	this._skillWindow.refresh();
	this._skillWindow.show();
	this._skillWindow.activate();
};

/**
 * 防御指令
 * Guard command
 *
 * @memberof Scene_Battle
 * @method commandGuard
 * @description 处理玩家选择防御指令，设置当前行动为防御并进入下一个角色的指令选择。
 * Handles player selecting the guard command, sets the current action to guard and proceeds to the next character's command selection.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.commandGuard = function () {
	BattleManager.inputtingAction().setGuard();
	this.selectNextCommand();
};

/**
 * 物品指令
 * Item command
 *
 * @memberof Scene_Battle
 * @method commandItem
 * @description 处理玩家选择物品指令，打开物品选择窗口并显示背包中的可用物品。
 * Handles player selecting the item command, opens the item selection window and displays available items in the inventory.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.commandItem = function () {
	this._itemWindow.refresh();
	this._itemWindow.show();
	this._itemWindow.activate();
};

/**
 * 选择下一个指令
 * Select next command
 *
 * @memberof Scene_Battle
 * @method selectNextCommand
 * @description 切换到下一个角色的指令输入状态，更新战斗管理器并改变当前输入窗口。
 * Switches to the next character's command input state, updates the battle manager and changes the current input window.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.selectNextCommand = function () {
	BattleManager.selectNextCommand();
	this.changeInputWindow();
};

/**
 * 选择上一个指令
 * Select previous command
 *
 * @memberof Scene_Battle
 * @method selectPreviousCommand
 * @description 切换到上一个角色的指令输入状态，更新战斗管理器并改变当前输入窗口。
 * Switches to the previous character's command input state, updates the battle manager and changes the current input window.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.selectPreviousCommand = function () {
	BattleManager.selectPreviousCommand();
	this.changeInputWindow();
};

/**
 * 选择角色
 * Select actor selection
 *
 * @memberof Scene_Battle
 * @method selectActorSelection
 * @description 进入角色选择状态，显示角色窗口供玩家选择技能或物品的目标角色。
 * Enters actor selection state, displays the actor window for player to select target characters for skills or items.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.selectActorSelection = function () {
	this._actorWindow.refresh();
	this._actorWindow.show();
	this._actorWindow.activate();
};

/**
 * 当角色确定
 * On actor ok
 *
 * @memberof Scene_Battle
 * @method onActorOk
 * @description 处理角色选择窗口的确定事件，设置当前行动的目标角色并隐藏相关选择窗口。
 * Handles the ok event of the actor selection window, sets the target character for the current action and hides related selection windows.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.onActorOk = function () {
	var action = BattleManager.inputtingAction();
	action.setTarget(this._actorWindow.index());
	this._actorWindow.hide();
	this._skillWindow.hide();
	this._itemWindow.hide();
	this.selectNextCommand();
};

/**
 * 当角色取消
 * On actor cancel
 *
 * @memberof Scene_Battle
 * @method onActorCancel
 * @description 处理角色选择窗口的取消事件，根据当前指令类型返回到相应的选择窗口。
 * Handles the cancel event of the actor selection window, returns to the corresponding selection window based on the current command type.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.onActorCancel = function () {
	this._actorWindow.hide();
	switch (this._actorCommandWindow.currentSymbol()) {
		case "skill":
			this._skillWindow.show();
			this._skillWindow.activate();
			break;
		case "item":
			this._itemWindow.show();
			this._itemWindow.activate();
			break;
	}
};

/**
 * 选择敌人
 * Select enemy selection
 *
 * @memberof Scene_Battle
 * @method selectEnemySelection
 * @description 进入敌人选择状态，显示敌人窗口供玩家选择攻击或技能的目标敌人。
 * Enters enemy selection state, displays the enemy window for player to select target enemies for attacks or skills.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.selectEnemySelection = function () {
	this._enemyWindow.refresh();
	this._enemyWindow.show();
	this._enemyWindow.select(0);
	this._enemyWindow.activate();
};

/**
 * 当敌人确定
 * On enemy ok
 *
 * @memberof Scene_Battle
 * @method onEnemyOk
 * @description 处理敌人选择窗口的确定事件，设置当前行动的目标敌人并隐藏相关选择窗口。
 * Handles the ok event of the enemy selection window, sets the target enemy for the current action and hides related selection windows.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.onEnemyOk = function () {
	var action = BattleManager.inputtingAction();
	action.setTarget(this._enemyWindow.enemyIndex());
	this._enemyWindow.hide();
	this._skillWindow.hide();
	this._itemWindow.hide();
	this.selectNextCommand();
};

/**
 * 当敌人取消
 * On enemy cancel
 *
 * @memberof Scene_Battle
 * @method onEnemyCancel
 * @description 处理敌人选择窗口的取消事件，根据当前指令类型返回到相应的选择窗口。
 * Handles the cancel event of the enemy selection window, returns to the corresponding selection window based on the current command type.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.onEnemyCancel = function () {
	this._enemyWindow.hide();
	switch (this._actorCommandWindow.currentSymbol()) {
		case "attack":
			this._actorCommandWindow.activate();
			break;
		case "skill":
			this._skillWindow.show();
			this._skillWindow.activate();
			break;
		case "item":
			this._itemWindow.show();
			this._itemWindow.activate();
			break;
	}
};

/**
 * 当技能确定
 * On skill ok
 *
 * @memberof Scene_Battle
 * @method onSkillOk
 * @description 处理技能选择窗口的确定事件，设置当前行动为选定的技能并记录最后使用的技能。
 * Handles the ok event of the skill selection window, sets the current action to the selected skill and records the last used skill.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.onSkillOk = function () {
	var skill = this._skillWindow.item();
	var action = BattleManager.inputtingAction();
	action.setSkill(skill.id);
	BattleManager.actor().setLastBattleSkill(skill);
	this.onSelectAction();
};

/**
 * 当技能取消
 * On skill cancel
 *
 * @memberof Scene_Battle
 * @method onSkillCancel
 * @description 处理技能选择窗口的取消事件，隐藏技能窗口并返回到角色指令窗口。
 * Handles the cancel event of the skill selection window, hides the skill window and returns to the actor command window.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.onSkillCancel = function () {
	this._skillWindow.hide();
	this._actorCommandWindow.activate();
};

/**
 * 当物品确定
 * On item ok
 *
 * @memberof Scene_Battle
 * @method onItemOk
 * @description 处理物品选择窗口的确定事件，设置当前行动为选定的物品并记录最后使用的物品。
 * Handles the ok event of the item selection window, sets the current action to the selected item and records the last used item.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.onItemOk = function () {
	var item = this._itemWindow.item();
	var action = BattleManager.inputtingAction();
	action.setItem(item.id);
	$gameParty.setLastItem(item);
	this.onSelectAction();
};

/**
 * 当物品取消
 * On item cancel
 *
 * @memberof Scene_Battle
 * @method onItemCancel
 * @description 处理物品选择窗口的取消事件，隐藏物品窗口并返回到角色指令窗口。
 * Handles the cancel event of the item selection window, hides the item window and returns to the actor command window.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.onItemCancel = function () {
	this._itemWindow.hide();
	this._actorCommandWindow.activate();
};

/**
 * 当选择行动
 * On select action
 *
 * @memberof Scene_Battle
 * @method onSelectAction
 * @description 处理技能或物品选择完成后的行动处理，根据行动类型决定是否需要目标选择。
 * Handles action processing after skill or item selection is completed, determines whether target selection is needed based on action type.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.onSelectAction = function () {
	var action = BattleManager.inputtingAction();
	this._skillWindow.hide();
	this._itemWindow.hide();
	if (!action.needsSelection()) {
		this.selectNextCommand();
	} else if (action.isForOpponent()) {
		this.selectEnemySelection();
	} else {
		this.selectActorSelection();
	}
};

/**
 * 结束指令选择
 * End command selection
 *
 * @memberof Scene_Battle
 * @method endCommandSelection
 * @description 结束当前回合的指令选择模式，关闭所有指令窗口并取消状态窗口的选择状态。
 * Ends the current turn's command selection mode, closes all command windows and cancels the status window's selection state.
 * @returns {void} 无返回值 - No return value
 */
Scene_Battle.prototype.endCommandSelection = function () {
	this._partyCommandWindow.close();
	this._actorCommandWindow.close();
	this._statusWindow.deselect();
};

//-----------------------------------------------------------------------------
// 场景_游戏结束
