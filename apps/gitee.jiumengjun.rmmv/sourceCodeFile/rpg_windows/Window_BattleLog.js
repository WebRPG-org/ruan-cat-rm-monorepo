//=============================================================================
// Window_BattleLog.js
//=============================================================================

//-----------------------------------------------------------------------------
// 窗口_战斗日志
// Window_BattleLog
//
// 显示战斗过程的窗口。没有边框显示，但为了方便起见，将其作为窗口处理。
// The window for displaying battle progress. No frame is displayed, but it is
// handled as a window for convenience.

function Window_BattleLog() {
	this.initialize.apply(this, arguments);
}

Window_BattleLog.prototype = Object.create(Window_Selectable.prototype);
Window_BattleLog.prototype.constructor = Window_BattleLog;

/**
 * 初始化
 * Initialize
 */
Window_BattleLog.prototype.initialize = function () {
	var width = this.windowWidth();
	var height = this.windowHeight();
	Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
	this.opacity = 0;
	this._lines = [];
	this._methods = [];
	this._waitCount = 0;
	this._waitMode = "";
	this._baseLineStack = [];
	this._spriteset = null;
	this.createBackBitmap();
	this.createBackSprite();
	this.refresh();
};

/**
 * 设置精灵组
 * @param {Spriteset_Battle} spriteset - 精灵组对象 - Spriteset object
 * Set spriteset
 */
Window_BattleLog.prototype.setSpriteset = function (spriteset) {
	this._spriteset = spriteset;
};

/**
 * 窗口宽度
 * @returns {number} 窗口宽度 - Window width
 * Window width
 */
Window_BattleLog.prototype.windowWidth = function () {
	return Graphics.boxWidth;
};

/**
 * 窗口高度
 * @returns {number} 窗口高度 - Window height
 * Window height
 */
Window_BattleLog.prototype.windowHeight = function () {
	return this.fittingHeight(this.maxLines());
};

/**
 * 最大行数
 * @returns {number} 最大行数 - Maximum lines
 * Maximum lines
 */
Window_BattleLog.prototype.maxLines = function () {
	return 10;
};

/**
 * 创建背景位图
 * Create back bitmap
 */
Window_BattleLog.prototype.createBackBitmap = function () {
	this._backBitmap = new Bitmap(this.width, this.height);
};

/**
 * 创建背景精灵
 * Create back sprite
 */
Window_BattleLog.prototype.createBackSprite = function () {
	this._backSprite = new Sprite();
	this._backSprite.bitmap = this._backBitmap;
	this._backSprite.y = this.y;
	this.addChildToBack(this._backSprite);
};

/**
 * 行数
 * @returns {number} 行数 - Number of lines
 * Number of lines
 */
Window_BattleLog.prototype.numLines = function () {
	return this._lines.length;
};

/**
 * 信息速度
 * @returns {number} 信息速度 - Message speed
 * Message speed
 */
Window_BattleLog.prototype.messageSpeed = function () {
	return 16;
};

/**
 * 是否繁忙
 * @returns {boolean} 是否繁忙 - Whether is busy
 * Is busy
 */
Window_BattleLog.prototype.isBusy = function () {
	return this._waitCount > 0 || this._waitMode || this._methods.length > 0;
};

/**
 * 更新
 * Update
 */
Window_BattleLog.prototype.update = function () {
	if (!this.updateWait()) {
		this.callNextMethod();
	}
};

/**
 * 更新等待
 * @returns {boolean} 是否在等待 - Whether is waiting
 * Update wait
 */
Window_BattleLog.prototype.updateWait = function () {
	return this.updateWaitCount() || this.updateWaitMode();
};

/**
 * 更新等待计数
 * @returns {boolean} 是否在等待计数 - Whether is waiting count
 * Update wait count
 */
Window_BattleLog.prototype.updateWaitCount = function () {
	if (this._waitCount > 0) {
		this._waitCount -= this.isFastForward() ? 3 : 1;
		if (this._waitCount < 0) {
			this._waitCount = 0;
		}
		return true;
	}
	return false;
};

/**
 * 更新等待模式
 * @returns {boolean} 是否在等待模式 - Whether is waiting mode
 * Update wait mode
 */
Window_BattleLog.prototype.updateWaitMode = function () {
	var waiting = false;
	switch (this._waitMode) {
		case "effect":
			waiting = this._spriteset.isEffecting();
			break;
		case "movement":
			waiting = this._spriteset.isAnyoneMoving();
			break;
	}
	if (!waiting) {
		this._waitMode = "";
	}
	return waiting;
};

/**
 * 设置等待模式
 * @param {string} waitMode - 等待模式 - Wait mode
 * Set wait mode
 */
Window_BattleLog.prototype.setWaitMode = function (waitMode) {
	this._waitMode = waitMode;
};

/**
 * 呼叫下一个方法
 * Call next method
 */
Window_BattleLog.prototype.callNextMethod = function () {
	if (this._methods.length > 0) {
		var method = this._methods.shift();
		if (method.name && this[method.name]) {
			this[method.name].apply(this, method.params);
		} else {
			throw new Error("Method not found: " + method.name);
		}
	}
};

/**
 * 是否快进
 * @returns {boolean} 是否快进 - Whether is fast forward
 * Is fast forward
 */
Window_BattleLog.prototype.isFastForward = function () {
	return Input.isLongPressed("ok") || Input.isPressed("shift") || TouchInput.isLongPressed();
};

/**
 * 入栈
 * @param {string} methodName - 方法名 - Method name
 * Push
 */
Window_BattleLog.prototype.push = function (methodName) {
	var methodArgs = Array.prototype.slice.call(arguments, 1);
	this._methods.push({ name: methodName, params: methodArgs });
};

/**
 * 清空
 * Clear
 */
Window_BattleLog.prototype.clear = function () {
	this._lines = [];
	this._baseLineStack = [];
	this.refresh();
};

/**
 * 等待
 * Wait
 */
Window_BattleLog.prototype.wait = function () {
	this._waitCount = this.messageSpeed();
};

/**
 * 等待效果
 * Wait for effect
 */
Window_BattleLog.prototype.waitForEffect = function () {
	this.setWaitMode("effect");
};

/**
 * 等待移动
 * Wait for movement
 */
Window_BattleLog.prototype.waitForMovement = function () {
	this.setWaitMode("movement");
};

/**
 * 增加文本
 * @param {string} text - 文本内容 - Text content
 * Add text
 */
Window_BattleLog.prototype.addText = function (text) {
	this._lines.push(text);
	this.refresh();
	this.wait();
};

/**
 * 增加基础行
 * Push base line
 */
Window_BattleLog.prototype.pushBaseLine = function () {
	this._baseLineStack.push(this._lines.length);
};

/**
 * 移除基础行
 * Pop base line
 */
Window_BattleLog.prototype.popBaseLine = function () {
	var baseLine = this._baseLineStack.pop();
	while (this._lines.length > baseLine) {
		this._lines.pop();
	}
};

/**
 * 等待新行
 * Wait for new line
 */
Window_BattleLog.prototype.waitForNewLine = function () {
	var baseLine = 0;
	if (this._baseLineStack.length > 0) {
		baseLine = this._baseLineStack[this._baseLineStack.length - 1];
	}
	if (this._lines.length > baseLine) {
		this.wait();
	}
};

/**
 * 弹出伤害
 * @param {Game_Battler} target - 目标对象 - Target object
 * Popup damage
 */
Window_BattleLog.prototype.popupDamage = function (target) {
	target.startDamagePopup();
};

/**
 * 表现行动开始
 * @param {Game_Battler} subject - 行动者 - Subject
 * @param {Game_Action} action - 行动 - Action
 * Perform action start
 */
Window_BattleLog.prototype.performActionStart = function (subject, action) {
	subject.performActionStart(action);
};

/**
 * 表现行动
 * @param {Game_Battler} subject - 行动者 - Subject
 * @param {Game_Action} action - 行动 - Action
 * Perform action
 */
Window_BattleLog.prototype.performAction = function (subject, action) {
	subject.performAction(action);
};

/**
 * 表现行动结束
 * @param {Game_Battler} subject - 行动者 - Subject
 * Perform action end
 */
Window_BattleLog.prototype.performActionEnd = function (subject) {
	subject.performActionEnd();
};

/**
 * 表现伤害
 * @param {Game_Battler} target - 目标对象 - Target object
 * Perform damage
 */
Window_BattleLog.prototype.performDamage = function (target) {
	target.performDamage();
};

/**
 * 表现未命中
 * @param {Game_Battler} target - 目标对象 - Target object
 * Perform miss
 */
Window_BattleLog.prototype.performMiss = function (target) {
	target.performMiss();
};

/**
 * 表现恢复
 * @param {Game_Battler} target - 目标对象 - Target object
 * Perform recovery
 */
Window_BattleLog.prototype.performRecovery = function (target) {
	target.performRecovery();
};

/**
 * 表现闪避
 * @param {Game_Battler} target - 目标对象 - Target object
 * Perform evasion
 */
Window_BattleLog.prototype.performEvasion = function (target) {
	target.performEvasion();
};

/**
 * 表现魔法闪避
 * @param {Game_Battler} target - 目标对象 - Target object
 * Perform magic evasion
 */
Window_BattleLog.prototype.performMagicEvasion = function (target) {
	target.performMagicEvasion();
};

/**
 * 表现反击
 * @param {Game_Battler} target - 目标对象 - Target object
 * Perform counter
 */
Window_BattleLog.prototype.performCounter = function (target) {
	target.performCounter();
};

/**
 * 表现魔法反射
 * @param {Game_Battler} target - 目标对象 - Target object
 * Perform reflection
 */
Window_BattleLog.prototype.performReflection = function (target) {
	target.performReflection();
};

/**
 * 表现掩护
 * @param {Game_Battler} substitute - 掩护者 - Substitute
 * @param {Game_Battler} target - 目标对象 - Target object
 * Perform substitute
 */
Window_BattleLog.prototype.performSubstitute = function (substitute, target) {
	substitute.performSubstitute(target);
};

/**
 * 表现倒下（死亡后的消失效果）
 * @param {Game_Battler} target - 目标对象 - Target object
 * Perform collapse
 */
Window_BattleLog.prototype.performCollapse = function (target) {
	target.performCollapse();
};

/**
 * 显示动画
 * @param {Game_Battler} subject - 行动者 - Subject
 * @param {Array} targets - 目标数组 - Target array
 * @param {number} animationId - 动画ID - Animation ID
 * Show animation
 */
Window_BattleLog.prototype.showAnimation = function (subject, targets, animationId) {
	if (animationId < 0) {
		this.showAttackAnimation(subject, targets);
	} else {
		this.showNormalAnimation(targets, animationId);
	}
};

/**
 * 显示攻击动画
 * @param {Game_Battler} subject - 行动者 - Subject
 * @param {Array} targets - 目标数组 - Target array
 * Show attack animation
 */
Window_BattleLog.prototype.showAttackAnimation = function (subject, targets) {
	if (subject.isActor()) {
		this.showActorAttackAnimation(subject, targets);
	} else {
		this.showEnemyAttackAnimation(subject, targets);
	}
};

/**
 * 显示角色攻击动画
 * @param {Game_Actor} subject - 行动者 - Subject
 * @param {Array} targets - 目标数组 - Target array
 * Show actor attack animation
 */
Window_BattleLog.prototype.showActorAttackAnimation = function (subject, targets) {
	this.showNormalAnimation(targets, subject.attackAnimationId1(), false);
	this.showNormalAnimation(targets, subject.attackAnimationId2(), true);
};

/**
 * 显示敌人攻击动画
 * @param {Game_Enemy} subject - 行动者 - Subject
 * @param {Array} targets - 目标数组 - Target array
 * Show enemy attack animation
 */
Window_BattleLog.prototype.showEnemyAttackAnimation = function (subject, targets) {
	SoundManager.playEnemyAttack();
};

/**
 * 显示普通动画
 * @param {Array} targets - 目标数组 - Target array
 * @param {number} animationId - 动画ID - Animation ID
 * @param {boolean} mirror - 是否镜像 - Whether mirror
 * Show normal animation
 */
Window_BattleLog.prototype.showNormalAnimation = function (targets, animationId, mirror) {
	var animation = $dataAnimations[animationId];
	if (animation) {
		var delay = this.animationBaseDelay();
		var nextDelay = this.animationNextDelay();
		targets.forEach(function (target) {
			target.startAnimation(animationId, mirror, delay);
			delay += nextDelay;
		});
	}
};

/**
 * 动画基础延迟
 * @returns {number} 基础延迟 - Base delay
 * Animation base delay
 */
Window_BattleLog.prototype.animationBaseDelay = function () {
	return 8;
};

/**
 * 动画下一个延迟
 * @returns {number} 下一个延迟 - Next delay
 * Animation next delay
 */
Window_BattleLog.prototype.animationNextDelay = function () {
	return 12;
};

/**
 * 刷新
 * Refresh
 */
Window_BattleLog.prototype.refresh = function () {
	this.drawBackground();
	this.contents.clear();
	for (var i = 0; i < this._lines.length; i++) {
		this.drawLineText(i);
	}
};

/**
 * 绘制背景
 * Draw background
 */
Window_BattleLog.prototype.drawBackground = function () {
	var rect = this.backRect();
	var color = this.backColor();
	this._backBitmap.clear();
	this._backBitmap.paintOpacity = this.backPaintOpacity();
	this._backBitmap.fillRect(rect.x, rect.y, rect.width, rect.height, color);
	this._backBitmap.paintOpacity = 255;
};

/**
 * 背景矩形区域
 * @returns {Object} 背景矩形区域对象 - Back rectangle object
 * Back rectangle
 */
Window_BattleLog.prototype.backRect = function () {
	return {
		x: 0,
		y: this.padding,
		width: this.width,
		height: this.numLines() * this.lineHeight(),
	};
};

/**
 * 背景颜色
 * @returns {string} 背景颜色 - Back color
 * Back color
 */
Window_BattleLog.prototype.backColor = function () {
	return "#000000";
};

/**
 * 背景绘画不透明度
 * @returns {number} 背景绘画不透明度 - Back paint opacity
 * Back paint opacity
 */
Window_BattleLog.prototype.backPaintOpacity = function () {
	return 64;
};

/**
 * 绘制行文本
 * @param {number} index - 索引 - Index
 * Draw line text
 */
Window_BattleLog.prototype.drawLineText = function (index) {
	var rect = this.itemRectForText(index);
	this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
	this.drawTextEx(this._lines[index], rect.x, rect.y, rect.width);
};

/**
 * 开始回合
 * Start turn
 */
Window_BattleLog.prototype.startTurn = function () {
	this.push("wait");
};

/**
 * 开始行动
 * @param {Game_Battler} subject - 行动者 - Subject
 * @param {Game_Action} action - 行动 - Action
 * @param {Array} targets - 目标数组 - Target array
 * Start action
 */
Window_BattleLog.prototype.startAction = function (subject, action, targets) {
	var item = action.item();
	this.push("performActionStart", subject, action);
	this.push("waitForMovement");
	this.push("performAction", subject, action);
	this.push("showAnimation", subject, targets.clone(), item.animationId);
	this.displayAction(subject, item);
};

/**
 * 结束行动
 * @param {Game_Battler} subject - 行动者 - Subject
 * End action
 */
Window_BattleLog.prototype.endAction = function (subject) {
	this.push("waitForNewLine");
	this.push("clear");
	this.push("performActionEnd", subject);
};

/**
 * 显示当前状态
 * @param {Game_Battler} subject - 行动者 - Subject
 * Display current state
 */
Window_BattleLog.prototype.displayCurrentState = function (subject) {
	var stateText = subject.mostImportantStateText();
	if (stateText) {
		this.push("addText", subject.name() + stateText);
		this.push("wait");
		this.push("clear");
	}
};

/**
 * 显示恢复
 * @param {Game_Battler} subject - 行动者 - Subject
 * Display regeneration
 */
Window_BattleLog.prototype.displayRegeneration = function (subject) {
	this.push("popupDamage", subject);
};

/**
 * 显示行动
 * @param {Game_Battler} subject - 行动者 - Subject
 * @param {Game_Item} item - 物品 - Item
 * Display action
 */
Window_BattleLog.prototype.displayAction = function (subject, item) {
	var numMethods = this._methods.length;
	if (DataManager.isSkill(item)) {
		if (item.message1) {
			this.push("addText", subject.name() + item.message1.format(item.name));
		}
		if (item.message2) {
			this.push("addText", item.message2.format(item.name));
		}
	} else {
		this.push("addText", TextManager.useItem.format(subject.name(), item.name));
	}
	if (this._methods.length === numMethods) {
		this.push("wait");
	}
};

/**
 * 显示反击
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display counter
 */
Window_BattleLog.prototype.displayCounter = function (target) {
	this.push("performCounter", target);
	this.push("addText", TextManager.counterAttack.format(target.name()));
};

/**
 * 显示反射
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display reflection
 */
Window_BattleLog.prototype.displayReflection = function (target) {
	this.push("performReflection", target);
	this.push("addText", TextManager.magicReflection.format(target.name()));
};

/**
 * 显示掩护
 * @param {Game_Battler} substitute - 掩护者 - Substitute
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display substitute
 */
Window_BattleLog.prototype.displaySubstitute = function (substitute, target) {
	var substName = substitute.name();
	this.push("performSubstitute", substitute, target);
	this.push("addText", TextManager.substitute.format(substName, target.name()));
};

/**
 * 显示行动结果
 * @param {Game_Battler} subject - 行动者 - Subject
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display action results
 */
Window_BattleLog.prototype.displayActionResults = function (subject, target) {
	if (target.result().used) {
		this.push("pushBaseLine");
		this.displayCritical(target);
		this.push("popupDamage", target);
		this.push("popupDamage", subject);
		this.displayDamage(target);
		this.displayAffectedStatus(target);
		this.displayFailure(target);
		this.push("waitForNewLine");
		this.push("popBaseLine");
	}
};

/**
 * 显示失败
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display failure
 */
Window_BattleLog.prototype.displayFailure = function (target) {
	if (target.result().isHit() && !target.result().success) {
		this.push("addText", TextManager.actionFailure.format(target.name()));
	}
};

/**
 * 显示暴击
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display critical
 */
Window_BattleLog.prototype.displayCritical = function (target) {
	if (target.result().critical) {
		if (target.isActor()) {
			this.push("addText", TextManager.criticalToActor);
		} else {
			this.push("addText", TextManager.criticalToEnemy);
		}
	}
};

/**
 * 显示伤害
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display damage
 */
Window_BattleLog.prototype.displayDamage = function (target) {
	if (target.result().missed) {
		this.displayMiss(target);
	} else if (target.result().evaded) {
		this.displayEvasion(target);
	} else {
		this.displayHpDamage(target);
		this.displayMpDamage(target);
		this.displayTpDamage(target);
	}
};

/**
 * 显示未命中
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display miss
 */
Window_BattleLog.prototype.displayMiss = function (target) {
	var fmt;
	if (target.result().physical) {
		fmt = target.isActor() ? TextManager.actorNoHit : TextManager.enemyNoHit;
		this.push("performMiss", target);
	} else {
		fmt = TextManager.actionFailure;
	}
	this.push("addText", fmt.format(target.name()));
};

/**
 * 显示闪避
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display evasion
 */
Window_BattleLog.prototype.displayEvasion = function (target) {
	var fmt;
	if (target.result().physical) {
		fmt = TextManager.evasion;
		this.push("performEvasion", target);
	} else {
		fmt = TextManager.magicEvasion;
		this.push("performMagicEvasion", target);
	}
	this.push("addText", fmt.format(target.name()));
};

/**
 * 显示 HP 伤害
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display HP damage
 */
Window_BattleLog.prototype.displayHpDamage = function (target) {
	if (target.result().hpAffected) {
		if (target.result().hpDamage > 0 && !target.result().drain) {
			this.push("performDamage", target);
		}
		if (target.result().hpDamage < 0) {
			this.push("performRecovery", target);
		}
		this.push("addText", this.makeHpDamageText(target));
	}
};

/**
 * 显示 MP 伤害
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display MP damage
 */
Window_BattleLog.prototype.displayMpDamage = function (target) {
	if (target.isAlive() && target.result().mpDamage !== 0) {
		if (target.result().mpDamage < 0) {
			this.push("performRecovery", target);
		}
		this.push("addText", this.makeMpDamageText(target));
	}
};

/**
 * 显示 TP 伤害
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display TP damage
 */
Window_BattleLog.prototype.displayTpDamage = function (target) {
	if (target.isAlive() && target.result().tpDamage !== 0) {
		if (target.result().tpDamage < 0) {
			this.push("performRecovery", target);
		}
		this.push("addText", this.makeTpDamageText(target));
	}
};

/**
 * 显示受影响的状态
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display affected status
 */
Window_BattleLog.prototype.displayAffectedStatus = function (target) {
	if (target.result().isStatusAffected()) {
		this.push("pushBaseLine");
		this.displayChangedStates(target);
		this.displayChangedBuffs(target);
		this.push("waitForNewLine");
		this.push("popBaseLine");
	}
};

/**
 * 自动显示受影响的状态
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display auto affected status
 */
Window_BattleLog.prototype.displayAutoAffectedStatus = function (target) {
	if (target.result().isStatusAffected()) {
		this.displayAffectedStatus(target, null);
		this.push("clear");
	}
};

/**
 * 显示改变的状态
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display changed states
 */
Window_BattleLog.prototype.displayChangedStates = function (target) {
	this.displayAddedStates(target);
	this.displayRemovedStates(target);
};

/**
 * 显示附加的状态
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display added states
 */
Window_BattleLog.prototype.displayAddedStates = function (target) {
	target
		.result()
		.addedStateObjects()
		.forEach(function (state) {
			var stateMsg = target.isActor() ? state.message1 : state.message2;
			if (state.id === target.deathStateId()) {
				this.push("performCollapse", target);
			}
			if (stateMsg) {
				this.push("popBaseLine");
				this.push("pushBaseLine");
				this.push("addText", target.name() + stateMsg);
				this.push("waitForEffect");
			}
		}, this);
};

/**
 * 显示解除的状态
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display removed states
 */
Window_BattleLog.prototype.displayRemovedStates = function (target) {
	target
		.result()
		.removedStateObjects()
		.forEach(function (state) {
			if (state.message4) {
				this.push("popBaseLine");
				this.push("pushBaseLine");
				this.push("addText", target.name() + state.message4);
			}
		}, this);
};

/**
 * 显示改变的强化/弱化效果
 * @param {Game_Battler} target - 目标对象 - Target object
 * Display changed buffs
 */
Window_BattleLog.prototype.displayChangedBuffs = function (target) {
	var result = target.result();
	this.displayBuffs(target, result.addedBuffs, TextManager.buffAdd);
	this.displayBuffs(target, result.addedDebuffs, TextManager.debuffAdd);
	this.displayBuffs(target, result.removedBuffs, TextManager.buffRemove);
};

/**
 * 显示强化/弱化效果
 * @param {Game_Battler} target - 目标对象 - Target object
 * @param {Array} buffs - 强化/弱化数组 - Buff array
 * @param {string} fmt - 格式字符串 - Format string
 * Display buffs
 */
Window_BattleLog.prototype.displayBuffs = function (target, buffs, fmt) {
	buffs.forEach(function (paramId) {
		this.push("popBaseLine");
		this.push("pushBaseLine");
		this.push("addText", fmt.format(target.name(), TextManager.param(paramId)));
	}, this);
};

/**
 * 制作 HP 伤害文本
 * @param {Game_Battler} target - 目标对象 - Target object
 * @returns {string} HP伤害文本 - HP damage text
 * Make HP damage text
 */
Window_BattleLog.prototype.makeHpDamageText = function (target) {
	var result = target.result();
	var damage = result.hpDamage;
	var isActor = target.isActor();
	var fmt;
	if (damage > 0 && result.drain) {
		fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
		return fmt.format(target.name(), TextManager.hp, damage);
	} else if (damage > 0) {
		fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
		return fmt.format(target.name(), damage);
	} else if (damage < 0) {
		fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
		return fmt.format(target.name(), TextManager.hp, -damage);
	} else {
		fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
		return fmt.format(target.name());
	}
};

/**
 * 制作 MP 伤害文本
 * @param {Game_Battler} target - 目标对象 - Target object
 * @returns {string} MP伤害文本 - MP damage text
 * Make MP damage text
 */
Window_BattleLog.prototype.makeMpDamageText = function (target) {
	var result = target.result();
	var damage = result.mpDamage;
	var isActor = target.isActor();
	var fmt;
	if (damage > 0 && result.drain) {
		fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
		return fmt.format(target.name(), TextManager.mp, damage);
	} else if (damage > 0) {
		fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
		return fmt.format(target.name(), TextManager.mp, damage);
	} else if (damage < 0) {
		fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
		return fmt.format(target.name(), TextManager.mp, -damage);
	} else {
		return "";
	}
};

/**
 * 制作 TP 伤害文本
 * @param {Game_Battler} target - 目标对象 - Target object
 * @returns {string} TP伤害文本 - TP damage text
 * Make TP damage text
 */
Window_BattleLog.prototype.makeTpDamageText = function (target) {
	var result = target.result();
	var damage = result.tpDamage;
	var isActor = target.isActor();
	var fmt;
	if (damage > 0) {
		fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
		return fmt.format(target.name(), TextManager.tp, damage);
	} else if (damage < 0) {
		fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
		return fmt.format(target.name(), TextManager.tp, -damage);
	} else {
		return "";
	}
};
