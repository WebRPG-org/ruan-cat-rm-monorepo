//=============================================================================
// Window_SavefileList.js
//=============================================================================

/**
 * 存档和读档画面上的存档选择窗口
 * Window for selecting a save file on the save and load screens
 * @class
 * @extends Window_Selectable
 */
function Window_SavefileList() {
	this.initialize.apply(this, arguments);
}

Window_SavefileList.prototype = Object.create(Window_Selectable.prototype);
Window_SavefileList.prototype.constructor = Window_SavefileList;

/**
 * 初始化存档列表窗口
 * Initialize the savefile list window
 * @param {number} x - 窗口的X坐标 - The x-coordinate of the window
 * @param {number} y - 窗口的Y坐标 - The y-coordinate of the window
 * @param {number} width - 窗口的宽度 - The width of the window
 * @param {number} height - 窗口的高度 - The height of the window
 */
Window_SavefileList.prototype.initialize = function (x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.activate();
	this._mode = null;
};

/**
 * 设置窗口模式
 * Set window mode
 * @param {string} mode - 模式（save：保存，load：读取） - Mode (save: save, load: load)
 */
Window_SavefileList.prototype.setMode = function (mode) {
	this._mode = mode;
};

/**
 * 获取最大项目数
 * Get maximum number of items
 * @returns {number} 最大项目数 - Maximum number of items
 */
Window_SavefileList.prototype.maxItems = function () {
	return DataManager.maxSavefiles();
};

/**
 * 获取最大可见项目数
 * Get maximum number of visible items
 * @returns {number} 最大可见项目数 - Maximum number of visible items
 */
Window_SavefileList.prototype.maxVisibleItems = function () {
	return 5;
};

/**
 * 获取项目高度
 * Get item height
 * @returns {number} 项目高度 - Item height
 */
Window_SavefileList.prototype.itemHeight = function () {
	var innerHeight = this.height - this.padding * 2;
	return Math.floor(innerHeight / this.maxVisibleItems());
};

/**
 * 绘制项目
 * Draw item
 * @param {number} index - 项目索引 - Item index
 */
Window_SavefileList.prototype.drawItem = function (index) {
	var id = index + 1;
	var valid = DataManager.isThisGameFile(id);
	var info = DataManager.loadSavefileInfo(id);
	var rect = this.itemRectForText(index);
	this.resetTextColor();
	if (this._mode === "load") {
		this.changePaintOpacity(valid);
	}
	this.drawFileId(id, rect.x, rect.y);
	if (info) {
		this.changePaintOpacity(valid);
		this.drawContents(info, rect, valid);
		this.changePaintOpacity(true);
	}
};

/**
 * 绘制文件ID
 * Draw file ID
 * @param {number} id - 文件ID - File ID
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 */
Window_SavefileList.prototype.drawFileId = function (id, x, y) {
	this.drawText(TextManager.file + " " + id, x, y, 180);
};

/**
 * 绘制内容
 * Draw contents
 * @param {Object} info - 存档信息 - Savefile information
 * @param {Rectangle} rect - 矩形区域 - Rectangle area
 * @param {boolean} valid - 是否有效 - Whether valid
 */
Window_SavefileList.prototype.drawContents = function (info, rect, valid) {
	var bottom = rect.y + rect.height;
	if (rect.width >= 420) {
		this.drawGameTitle(info, rect.x + 192, rect.y, rect.width - 192);
		if (valid) {
			this.drawPartyCharacters(info, rect.x + 220, bottom - 4);
		}
	}
	var lineHeight = this.lineHeight();
	var y2 = bottom - lineHeight;
	if (y2 >= lineHeight) {
		this.drawPlaytime(info, rect.x, y2, rect.width);
	}
};

/**
 * 绘制游戏标题
 * Draw game title
 * @param {Object} info - 存档信息 - Savefile information
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 * @param {number} width - 宽度 - Width
 */
Window_SavefileList.prototype.drawGameTitle = function (info, x, y, width) {
	if (info.title) {
		this.drawText(info.title, x, y, width);
	}
};

/**
 * 绘制队伍行走图
 * Draw party characters
 * @param {Object} info - 存档信息 - Savefile information
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 */
Window_SavefileList.prototype.drawPartyCharacters = function (info, x, y) {
	if (info.characters) {
		for (var i = 0; i < info.characters.length; i++) {
			var data = info.characters[i];
			this.drawCharacter(data[0], data[1], x + i * 48, y);
		}
	}
};

/**
 * 绘制游戏时间
 * Draw playtime
 * @param {Object} info - 存档信息 - Savefile information
 * @param {number} x - X坐标 - X coordinate
 * @param {number} y - Y坐标 - Y coordinate
 * @param {number} width - 宽度 - Width
 */
Window_SavefileList.prototype.drawPlaytime = function (info, x, y, width) {
	if (info.playtime) {
		this.drawText(info.playtime, x, y, width, "right");
	}
};

/**
 * 播放确定声音
 * Play OK sound
 */
Window_SavefileList.prototype.playOkSound = function () {};
