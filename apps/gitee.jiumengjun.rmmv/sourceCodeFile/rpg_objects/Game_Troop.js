/**
 * @fileoverview Game_Troop - 游戏敌群对象类
 * @description 负责管理游戏中的敌人群组和战斗相关数据
 * @author 原作者未知
 * @since 1.0.0
 */

/**
 * 游戏敌群类
 * Game_Troop
 *
 * 敌群和战斗相关数据的游戏对象类。
 * The game object class for a troop and the battle-related data.
 *
 * @class Game_Troop
 * @extends Game_Unit
 * @description 管理敌人群组和战斗相关的数据，包括敌人成员、回合数、事件等
 */
function Game_Troop() {
	this.initialize.apply(this, arguments);
}

Game_Troop.prototype = Object.create(Game_Unit.prototype);
Game_Troop.prototype.constructor = Game_Troop;

/**
 * 半角字母表
 * Half-width letter table
 *
 * @memberof Game_Troop
 * @constant {Array} LETTER_TABLE_HALF
 * @description 用于为敌人命名的半角字母表
 */
Game_Troop.LETTER_TABLE_HALF = [
	" A",
	" B",
	" C",
	" D",
	" E",
	" F",
	" G",
	" H",
	" I",
	" J",
	" K",
	" L",
	" M",
	" N",
	" O",
	" P",
	" Q",
	" R",
	" S",
	" T",
	" U",
	" V",
	" W",
	" X",
	" Y",
	" Z",
];

/**
 * 全角字母表
 * Full-width letter table
 *
 * @memberof Game_Troop
 * @constant {Array} LETTER_TABLE_FULL
 * @description 用于为敌人命名的全角字母表
 */
Game_Troop.LETTER_TABLE_FULL = [
	"Ａ",
	"Ｂ",
	"Ｃ",
	"Ｄ",
	"Ｅ",
	"Ｆ",
	"Ｇ",
	"Ｈ",
	"Ｉ",
	"Ｊ",
	"Ｋ",
	"Ｌ",
	"Ｍ",
	"Ｎ",
	"Ｏ",
	"Ｐ",
	"Ｑ",
	"Ｒ",
	"Ｓ",
	"Ｔ",
	"Ｕ",
	"Ｖ",
	"Ｗ",
	"Ｘ",
	"Ｙ",
	"Ｚ",
];

/**
 * 初始化敌群
 * Initialize troop
 *
 * @memberof Game_Troop
 * @method initialize
 * @description 初始化敌群对象并清空所有数据
 */
Game_Troop.prototype.initialize = function () {
	Game_Unit.prototype.initialize.call(this);
	this._interpreter = new Game_Interpreter();
	this.clear();
};

/**
 * 检查事件是否运行中
 * Check if event is running
 *
 * @memberof Game_Troop
 * @method isEventRunning
 * @returns {boolean} 事件是否运行中 - Whether event is running
 * @description 检查战斗事件是否正在运行
 */
Game_Troop.prototype.isEventRunning = function () {
	return this._interpreter.isRunning();
};

/**
 * 更新解释器
 * Update interpreter
 *
 * @memberof Game_Troop
 * @method updateInterpreter
 * @description 更新战斗事件解释器
 */
Game_Troop.prototype.updateInterpreter = function () {
	this._interpreter.update();
};

/**
 * 获取回合计数
 * Get turn count
 *
 * @memberof Game_Troop
 * @method turnCount
 * @returns {number} 回合计数 - Turn count
 * @description 获取当前战斗的回合计数
 */
Game_Troop.prototype.turnCount = function () {
	return this._turnCount;
};

/**
 * 获取敌群成员
 * Get troop members
 *
 * @memberof Game_Troop
 * @method members
 * @returns {Array} 敌群成员数组 - Troop members array
 * @description 获取敌群中的所有敌人成员
 */
Game_Troop.prototype.members = function () {
	return this._enemies;
};

/**
 * 清除敌群数据
 * Clear troop data
 *
 * @memberof Game_Troop
 * @method clear
 * @description 清空敌群的所有数据
 */
Game_Troop.prototype.clear = function () {
	this._interpreter.clear();
	this._troopId = 0;
	this._eventFlags = {};
	this._enemies = [];
	this._turnCount = 0;
	this._namesCount = {};
};

/**
 * 获取敌群数据
 * Get troop data
 *
 * @memberof Game_Troop
 * @method troop
 * @returns {object} 敌群数据 - Troop data
 * @description 获取当前敌群的数据对象
 */
Game_Troop.prototype.troop = function () {
	return $dataTroops[this._troopId];
};

/**
 * 设置敌群
 * Setup troop
 *
 * @memberof Game_Troop
 * @method setup
 * @param {number} troopId - 敌群ID - Troop ID
 * @description 设置敌群并初始化敌人成员
 */
Game_Troop.prototype.setup = function (troopId) {
	this.clear();
	this._troopId = troopId;
	this._enemies = [];
	this.troop().members.forEach(function (member) {
		if ($dataEnemies[member.enemyId]) {
			var enemyId = member.enemyId;
			var x = member.x;
			var y = member.y;
			var enemy = new Game_Enemy(enemyId, x, y);
			if (member.hidden) {
				enemy.hide();
			}
			this._enemies.push(enemy);
		}
	}, this);
	this.makeUniqueNames();
};

/**
 * 制作唯一的名称
 * Make unique names
 *
 * @memberof Game_Troop
 * @method makeUniqueNames
 * @description 为同名敌人制作唯一的名称标识
 */
Game_Troop.prototype.makeUniqueNames = function () {
	var table = this.letterTable();
	this.members().forEach(function (enemy) {
		if (enemy.isAlive() && enemy.isLetterEmpty()) {
			var name = enemy.originalName();
			var n = this._namesCount[name] || 0;
			enemy.setLetter(table[n % table.length]);
			this._namesCount[name] = n + 1;
		}
	}, this);
	this.members().forEach(function (enemy) {
		var name = enemy.originalName();
		if (this._namesCount[name] >= 2) {
			enemy.setPlural(true);
		}
	}, this);
};

/**
 * 获取字母表
 * Get letter table
 *
 * @memberof Game_Troop
 * @method letterTable
 * @returns {Array} 字母表 - Letter table
 * @description 根据语言环境获取相应的字母表
 */
Game_Troop.prototype.letterTable = function () {
	return $gameSystem.isCJK() ? Game_Troop.LETTER_TABLE_FULL : Game_Troop.LETTER_TABLE_HALF;
};

/**
 * 获取敌人名称列表
 * Get enemy names list
 *
 * @memberof Game_Troop
 * @method enemyNames
 * @returns {Array} 敌人名称数组 - Enemy names array
 * @description 获取存活的敌人名称列表
 */
Game_Troop.prototype.enemyNames = function () {
	var names = [];
	this.members().forEach(function (enemy) {
		var name = enemy.originalName();
		if (enemy.isAlive() && !names.contains(name)) {
			names.push(name);
		}
	});
	return names;
};

/**
 * 检查是否满足事件页条件
 * Check if meets event page conditions
 *
 * @memberof Game_Troop
 * @method meetsConditions
 * @param {object} page - 事件页 - Event page
 * @returns {boolean} 是否满足条件 - Whether meets conditions
 * @description 检查是否满足战斗事件页的触发条件
 */
Game_Troop.prototype.meetsConditions = function (page) {
	var c = page.conditions;
	if (!c.turnEnding && !c.turnValid && !c.enemyValid && !c.actorValid && !c.switchValid) {
		return false; // Conditions not set
	}
	if (c.turnEnding) {
		if (!BattleManager.isTurnEnd()) {
			return false;
		}
	}
	if (c.turnValid) {
		var n = this._turnCount;
		var a = c.turnA;
		var b = c.turnB;
		if (b === 0 && n !== a) {
			return false;
		}
		if (b > 0 && (n < 1 || n < a || n % b !== a % b)) {
			return false;
		}
	}
	if (c.enemyValid) {
		var enemy = $gameTroop.members()[c.enemyIndex];
		if (!enemy || enemy.hpRate() * 100 > c.enemyHp) {
			return false;
		}
	}
	if (c.actorValid) {
		var actor = $gameActors.actor(c.actorId);
		if (!actor || actor.hpRate() * 100 > c.actorHp) {
			return false;
		}
	}
	if (c.switchValid) {
		if (!$gameSwitches.value(c.switchId)) {
			return false;
		}
	}
	return true;
};

/**
 * 设置战斗事件
 * Setup battle event
 *
 * @memberof Game_Troop
 * @method setupBattleEvent
 * @description 设置并执行符合条件的战斗事件
 */
Game_Troop.prototype.setupBattleEvent = function () {
	if (!this._interpreter.isRunning()) {
		if (this._interpreter.setupReservedCommonEvent()) {
			return;
		}
		var pages = this.troop().pages;
		for (var i = 0; i < pages.length; i++) {
			var page = pages[i];
			if (this.meetsConditions(page) && !this._eventFlags[i]) {
				this._interpreter.setup(page.list);
				if (page.span <= 1) {
					this._eventFlags[i] = true;
				}
				break;
			}
		}
	}
};

/**
 * 增加回合数
 * Increase turn count
 *
 * @memberof Game_Troop
 * @method increaseTurn
 * @description 增加战斗回合计数并重置事件标志
 */
Game_Troop.prototype.increaseTurn = function () {
	var pages = this.troop().pages;
	for (var i = 0; i < pages.length; i++) {
		var page = pages[i];
		if (page.span === 1) {
			this._eventFlags[i] = false;
		}
	}
	this._turnCount++;
};

/**
 * 计算总经验值
 * Calculate total experience
 *
 * @memberof Game_Troop
 * @method expTotal
 * @returns {number} 总经验值 - Total experience
 * @description 计算击败所有敌人获得的总经验值
 */
Game_Troop.prototype.expTotal = function () {
	return this.deadMembers().reduce(function (r, enemy) {
		return r + enemy.exp();
	}, 0);
};

/**
 * 计算总金钱
 * Calculate total gold
 *
 * @memberof Game_Troop
 * @method goldTotal
 * @returns {number} 总金钱 - Total gold
 * @description 计算击败所有敌人获得的总金钱
 */
Game_Troop.prototype.goldTotal = function () {
	return (
		this.deadMembers().reduce(function (r, enemy) {
			return r + enemy.gold();
		}, 0) * this.goldRate()
	);
};

/**
 * 获取金钱倍率
 * Get gold rate
 *
 * @memberof Game_Troop
 * @method goldRate
 * @returns {number} 金钱倍率 - Gold rate
 * @description 获取金钱获得的倍率（双倍金钱效果）
 */
Game_Troop.prototype.goldRate = function () {
	return $gameParty.hasGoldDouble() ? 2 : 1;
};

/**
 * 制作掉落物品
 * Make drop items
 *
 * @memberof Game_Troop
 * @method makeDropItems
 * @returns {Array} 掉落物品数组 - Drop items array
 * @description 生成所有敌人的掉落物品列表
 */
Game_Troop.prototype.makeDropItems = function () {
	return this.deadMembers().reduce(function (r, enemy) {
		return r.concat(enemy.makeDropItems());
	}, []);
};
