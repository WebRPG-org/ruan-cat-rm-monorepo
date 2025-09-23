//=============================================================================
// WebAudio.js
//=============================================================================

/**
 * @fileoverview Web Audio API音频处理类，用于加载和播放音频文件。
 * Web Audio API audio processing class for loading and playing audio files.
 *
 * @author RPG Maker MV
 * @version 1.6.2
 * @since 2015
 */

/**
 * Web Audio API的音频对象。
 * The audio object of Web Audio API.
 *
 * @class WebAudio
 * @description Web Audio API音频处理类，提供音频加载、播放和控制功能。
 * Web Audio API audio processing class providing audio loading, playback and control functionality.
 * @param {String} url - 音频文件的URL The url of the audio file
 */
function WebAudio() {
	this.initialize.apply(this, arguments);
}

WebAudio._standAlone = (function (top) {
	return !top.ResourceHandler;
})(this);

WebAudio.prototype.initialize = function (url) {
	if (!WebAudio._initialized) {
		WebAudio.initialize();
	}
	this.clear();

	if (!WebAudio._standAlone) {
		this._loader = ResourceHandler.createLoader(
			url,
			this._load.bind(this, url),
			function () {
				this._hasError = true;
			}.bind(this),
		);
	}
	this._load(url);
	this._url = url;
};

/**
 * 初始化WebAudio对象。
 * Initializes the WebAudio object.
 *
 * @memberof WebAudio
 * @method initialize
 * @description 初始化WebAudio对象，设置音频系统并加载音频文件。
 * Initializes the WebAudio object, sets up the audio system and loads the audio file.
 * @param {String} url - 音频文件的URL The url of the audio file
 * @returns {void} 无返回值 No return value
 */

WebAudio._masterVolume = 1;
WebAudio._context = null;
WebAudio._masterGainNode = null;
WebAudio._initialized = false;
WebAudio._unlocked = false;

/**
 * 初始化音频系统。
 * Initializes the audio system.
 *
 * @static
 * @method initialize
 * @param {Boolean} noAudio 无音频模式的标志 Flag for the no-audio mode
 * @return {Boolean} 如果音频系统可用则返回true True if the audio system is available
 */
WebAudio.initialize = function (noAudio) {
	if (!this._initialized) {
		if (!noAudio) {
			this._createContext();
			this._detectCodecs();
			this._createMasterGainNode();
			this._setupEventHandlers();
		}
		this._initialized = true;
	}
	return !!this._context;
};

/**
 * 检查浏览器是否可以播放ogg文件。
 * Checks whether the browser can play ogg files.
 *
 * @static
 * @method canPlayOgg
 * @return {Boolean} 如果浏览器可以播放ogg文件则返回true True if the browser can play ogg files
 */
WebAudio.canPlayOgg = function () {
	if (!this._initialized) {
		this.initialize();
	}
	return !!this._canPlayOgg;
};

/**
 * 检查浏览器是否可以播放m4a文件。
 * Checks whether the browser can play m4a files.
 *
 * @static
 * @method canPlayM4a
 * @return {Boolean} 如果浏览器可以播放m4a文件则返回true True if the browser can play m4a files
 */
WebAudio.canPlayM4a = function () {
	if (!this._initialized) {
		this.initialize();
	}
	return !!this._canPlayM4a;
};

/**
 * 设置所有音频的主音量。
 * Sets the master volume of the all audio.
 *
 * @static
 * @method setMasterVolume
 * @param {Number} value 主音量 (最小值: 0, 最大值: 1) Master volume (min: 0, max: 1)
 */
WebAudio.setMasterVolume = function (value) {
	this._masterVolume = value;
	if (this._masterGainNode) {
		this._masterGainNode.gain.setValueAtTime(this._masterVolume, this._context.currentTime);
	}
};

/**
 * 创建音频上下文。
 * Creates the audio context.
 *
 * @static
 * @method _createContext
 * @private
 */
WebAudio._createContext = function () {
	try {
		if (typeof AudioContext !== "undefined") {
			this._context = new AudioContext();
		} else if (typeof webkitAudioContext !== "undefined") {
			this._context = new webkitAudioContext();
		}
	} catch (e) {
		this._context = null;
	}
};

/**
 * 检测音频编解码器。
 * Detects audio codecs.
 *
 * @static
 * @method _detectCodecs
 * @private
 */
WebAudio._detectCodecs = function () {
	var audio = document.createElement("audio");
	if (audio.canPlayType) {
		this._canPlayOgg = audio.canPlayType("audio/ogg");
		this._canPlayM4a = audio.canPlayType("audio/mp4");
	}
};

/**
 * 创建主音量增益节点。
 * Creates the master gain node.
 *
 * @static
 * @method _createMasterGainNode
 * @private
 */
WebAudio._createMasterGainNode = function () {
	var context = WebAudio._context;
	if (context) {
		this._masterGainNode = context.createGain();
		this._masterGainNode.gain.setValueAtTime(this._masterVolume, context.currentTime);
		this._masterGainNode.connect(context.destination);
	}
};

/**
 * 设置事件处理程序。
 * Sets up event handlers.
 *
 * @static
 * @method _setupEventHandlers
 * @private
 */
WebAudio._setupEventHandlers = function () {
	var resumeHandler = function () {
		var context = WebAudio._context;
		if (context && context.state === "suspended" && typeof context.resume === "function") {
			context.resume().then(function () {
				WebAudio._onTouchStart();
			});
		} else {
			WebAudio._onTouchStart();
		}
	};
	document.addEventListener("keydown", resumeHandler);
	document.addEventListener("mousedown", resumeHandler);
	document.addEventListener("touchend", resumeHandler);
	document.addEventListener("touchstart", this._onTouchStart.bind(this));
	document.addEventListener("visibilitychange", this._onVisibilityChange.bind(this));
};

/**
 * 触摸开始事件处理。
 * Handles touch start event.
 *
 * @static
 * @method _onTouchStart
 * @private
 */
WebAudio._onTouchStart = function () {
	var context = WebAudio._context;
	if (context && !this._unlocked) {
		// Unlock Web Audio on iOS
		var node = context.createBufferSource();
		node.start(0);
		this._unlocked = true;
	}
};

/**
 * 可见性变化事件处理。
 * Handles visibility change event.
 *
 * @static
 * @method _onVisibilityChange
 * @private
 */
WebAudio._onVisibilityChange = function () {
	if (document.visibilityState === "hidden") {
		this._onHide();
	} else {
		this._onShow();
	}
};

/**
 * 隐藏事件处理。
 * Handles hide event.
 *
 * @static
 * @method _onHide
 * @private
 */
WebAudio._onHide = function () {
	if (this._shouldMuteOnHide()) {
		this._fadeOut(1);
	}
};

/**
 * 显示事件处理。
 * Handles show event.
 *
 * @static
 * @method _onShow
 * @private
 */
WebAudio._onShow = function () {
	if (this._shouldMuteOnHide()) {
		this._fadeIn(0.5);
	}
};

/**
 * 检查是否应在隐藏时静音。
 * Checks whether should mute on hide.
 *
 * @static
 * @method _shouldMuteOnHide
 * @private
 */
WebAudio._shouldMuteOnHide = function () {
	return Utils.isMobileDevice();
};

/**
 * 淡入效果。
 * Performs fade-in effect.
 *
 * @static
 * @method _fadeIn
 * @param {Number} duration 持续时间 The duration
 * @private
 */
WebAudio._fadeIn = function (duration) {
	if (this._masterGainNode) {
		var gain = this._masterGainNode.gain;
		var currentTime = WebAudio._context.currentTime;
		gain.setValueAtTime(0, currentTime);
		gain.linearRampToValueAtTime(this._masterVolume, currentTime + duration);
	}
};

/**
 * 淡出效果。
 * Performs fade-out effect.
 *
 * @static
 * @method _fadeOut
 * @param {Number} duration 持续时间 The duration
 * @private
 */
WebAudio._fadeOut = function (duration) {
	if (this._masterGainNode) {
		var gain = this._masterGainNode.gain;
		var currentTime = WebAudio._context.currentTime;
		gain.setValueAtTime(this._masterVolume, currentTime);
		gain.linearRampToValueAtTime(0, currentTime + duration);
	}
};

/**
 * 清除音频数据。
 * Clears the audio data.
 *
 * @memberof WebAudio
 * @method clear
 * @description 清除音频数据，停止播放并重置所有音频相关属性。
 * Clears the audio data, stops playback and resets all audio-related properties.
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype.clear = function () {
	this.stop();
	this._buffer = null;
	this._sourceNode = null;
	this._gainNode = null;
	this._pannerNode = null;
	this._totalTime = 0;
	this._sampleRate = 0;
	this._loopStart = 0;
	this._loopLength = 0;
	this._startTime = 0;
	this._volume = 1;
	this._pitch = 1;
	this._pan = 0;
	this._endTimer = null;
	this._loadListeners = [];
	this._stopListeners = [];
	this._hasError = false;
	this._autoPlay = false;
};

/**
 * [只读] 音频文件的URL。
 * [read-only] The url of the audio file.
 *
 * @memberof WebAudio
 * @property {String} url - 音频文件的URL The url of the audio file
 * @description 音频文件的只读URL属性。
 * Read-only URL property of the audio file.
 */
Object.defineProperty(WebAudio.prototype, "url", {
	get: function () {
		return this._url;
	},
	configurable: true,
});

/**
 * 音频的音量。
 * The volume of the audio.
 *
 * @memberof WebAudio
 * @property {Number} volume - 音频的音量 The volume of the audio
 * @description 音频的音量属性，用于控制音频播放的音量大小。
 * Volume property of the audio for controlling the playback volume.
 */
Object.defineProperty(WebAudio.prototype, "volume", {
	get: function () {
		return this._volume;
	},
	set: function (value) {
		this._volume = value;
		if (this._gainNode) {
			this._gainNode.gain.setValueAtTime(this._volume, WebAudio._context.currentTime);
		}
	},
	configurable: true,
});

/**
 * 音频的音调。
 * The pitch of the audio.
 *
 * @memberof WebAudio
 * @property {Number} pitch - 音频的音调 The pitch of the audio
 * @description 音频的音调属性，用于控制音频播放的音调高低。
 * Pitch property of the audio for controlling the playback pitch.
 */
Object.defineProperty(WebAudio.prototype, "pitch", {
	get: function () {
		return this._pitch;
	},
	set: function (value) {
		if (this._pitch !== value) {
			this._pitch = value;
			if (this.isPlaying()) {
				this.play(this._sourceNode.loop, 0);
			}
		}
	},
	configurable: true,
});

/**
 * 音频的声像。
 * The pan of the audio.
 *
 * @memberof WebAudio
 * @property {Number} pan - 音频的声像 The pan of the audio
 * @description 音频的声像属性，用于控制音频在立体声场中的位置。
 * Pan property of the audio for controlling the position in stereo field.
 */
Object.defineProperty(WebAudio.prototype, "pan", {
	get: function () {
		return this._pan;
	},
	set: function (value) {
		this._pan = value;
		this._updatePanner();
	},
	configurable: true,
});

/**
 * 检查音频数据是否准备好播放。
 * Checks whether the audio data is ready to play.
 *
 * @method isReady
 * @return {Boolean} 如果音频数据准备好播放则返回true True if the audio data is ready to play
 */
WebAudio.prototype.isReady = function () {
	return !!this._buffer;
};

/**
 * 检查是否发生了加载错误。
 * Checks whether a loading error has occurred.
 *
 * @method isError
 * @return {Boolean} 如果发生了加载错误则返回true True if a loading error has occurred
 */
WebAudio.prototype.isError = function () {
	return this._hasError;
};

/**
 * 检查音频是否正在播放。
 * Checks whether the audio is playing.
 *
 * @method isPlaying
 * @return {Boolean} 如果音频正在播放则返回true True if the audio is playing
 */
WebAudio.prototype.isPlaying = function () {
	return !!this._sourceNode;
};

/**
 * 播放音频。
 * Plays the audio.
 *
 * @method play
 * @param {Boolean} loop 音频数据是否循环播放 Whether the audio data play in a loop
 * @param {Number} offset 播放的起始位置（秒） The start position to play in seconds
 */
WebAudio.prototype.play = function (loop, offset) {
	if (this.isReady()) {
		offset = offset || 0;
		this._startPlaying(loop, offset);
	} else if (WebAudio._context) {
		this._autoPlay = true;
		this.addLoadListener(
			function () {
				if (this._autoPlay) {
					this.play(loop, offset);
				}
			}.bind(this),
		);
	}
};

/**
 * 停止音频。
 * Stops the audio.
 *
 * @method stop
 */
WebAudio.prototype.stop = function () {
	this._autoPlay = false;
	this._removeEndTimer();
	this._removeNodes();
	if (this._stopListeners) {
		while (this._stopListeners.length > 0) {
			var listner = this._stopListeners.shift();
			listner();
		}
	}
};

/**
 * 执行音频淡入。
 * Performs the audio fade-in.
 *
 * @method fadeIn
 * @param {Number} duration 淡入时间（秒） Fade-in time in seconds
 */
WebAudio.prototype.fadeIn = function (duration) {
	if (this.isReady()) {
		if (this._gainNode) {
			var gain = this._gainNode.gain;
			var currentTime = WebAudio._context.currentTime;
			gain.setValueAtTime(0, currentTime);
			gain.linearRampToValueAtTime(this._volume, currentTime + duration);
		}
	} else if (this._autoPlay) {
		this.addLoadListener(
			function () {
				this.fadeIn(duration);
			}.bind(this),
		);
	}
};

/**
 * 执行音频淡出。
 * Performs the audio fade-out.
 *
 * @method fadeOut
 * @param {Number} duration 淡出时间（秒） Fade-out time in seconds
 */
WebAudio.prototype.fadeOut = function (duration) {
	if (this._gainNode) {
		var gain = this._gainNode.gain;
		var currentTime = WebAudio._context.currentTime;
		gain.setValueAtTime(this._volume, currentTime);
		gain.linearRampToValueAtTime(0, currentTime + duration);
	}
	this._autoPlay = false;
};

/**
 * 获取音频的搜索位置。
 * Gets the seek position of the audio.
 *
 * @memberof WebAudio
 * @method seek
 * @description 获取当前音频播放的位置。
 * Gets the current playback position of the audio.
 * @returns {Number} 当前播放位置（秒） Current playback position in seconds
 */
WebAudio.prototype.seek = function () {
	if (WebAudio._context) {
		var pos = (WebAudio._context.currentTime - this._startTime) * this._pitch;
		if (this._loopLength > 0) {
			while (pos >= this._loopStart + this._loopLength) {
				pos -= this._loopLength;
			}
		}
		return pos;
	} else {
		return 0;
	}
};

/**
 * 添加音频数据加载时调用的回调函数。
 * Add a callback function that will be called when the audio data is loaded.
 *
 * @memberof WebAudio
 * @method addLoadListener
 * @description 添加音频数据加载完成时的回调函数监听器。
 * Adds a callback function listener for when audio data loading is complete.
 * @param {Function} listner - 回调函数 The callback function
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype.addLoadListener = function (listner) {
	this._loadListeners.push(listner);
};

/**
 * 添加播放停止时调用的回调函数。
 * Add a callback function that will be called when the playback is stopped.
 *
 * @memberof WebAudio
 * @method addStopListener
 * @description 添加音频播放停止时的回调函数监听器。
 * Adds a callback function listener for when audio playback is stopped.
 * @param {Function} listner - 回调函数 The callback function
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype.addStopListener = function (listner) {
	this._stopListeners.push(listner);
};

/**
 * 加载音频文件。
 * Loads the audio file.
 *
 * @memberof WebAudio
 * @method _load
 * @private
 * @description 通过XMLHttpRequest加载音频文件数据。
 * Loads audio file data via XMLHttpRequest.
 * @param {String} url - 音频文件URL The audio file URL
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._load = function (url) {
	if (WebAudio._context) {
		var xhr = new XMLHttpRequest();
		if (Decrypter.hasEncryptedAudio) url = Decrypter.extToEncryptExt(url);
		xhr.open("GET", url);
		xhr.responseType = "arraybuffer";
		xhr.onload = function () {
			if (xhr.status < 400) {
				this._onXhrLoad(xhr);
			}
		}.bind(this);
		xhr.onerror =
			this._loader ||
			function () {
				this._hasError = true;
			}.bind(this);
		xhr.send();
	}
};

/**
 * XHR加载完成事件处理。
 * Handles XHR load completion event.
 *
 * @memberof WebAudio
 * @method _onXhrLoad
 * @private
 * @description 处理XMLHttpRequest加载完成事件，解密并解码音频数据。
 * Handles XMLHttpRequest load completion event, decrypts and decodes audio data.
 * @param {XMLHttpRequest} xhr - XMLHttpRequest对象 The XMLHttpRequest object
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._onXhrLoad = function (xhr) {
	var array = xhr.response;
	if (Decrypter.hasEncryptedAudio) array = Decrypter.decryptArrayBuffer(array);
	this._readLoopComments(new Uint8Array(array));
	WebAudio._context.decodeAudioData(
		array,
		function (buffer) {
			this._buffer = buffer;
			this._totalTime = buffer.duration;
			if (this._loopLength > 0 && this._sampleRate > 0) {
				this._loopStart /= this._sampleRate;
				this._loopLength /= this._sampleRate;
			} else {
				this._loopStart = 0;
				this._loopLength = this._totalTime;
			}
			this._onLoad();
		}.bind(this),
	);
};

/**
 * 开始播放音频。
 * Starts playing the audio.
 *
 * @memberof WebAudio
 * @method _startPlaying
 * @private
 * @description 开始播放音频，设置循环和偏移量。
 * Starts playing the audio, sets up loop and offset.
 * @param {Boolean} loop - 是否循环 Whether to loop
 * @param {Number} offset - 偏移量 The offset
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._startPlaying = function (loop, offset) {
	if (this._loopLength > 0) {
		while (offset >= this._loopStart + this._loopLength) {
			offset -= this._loopLength;
		}
	}
	this._removeEndTimer();
	this._removeNodes();
	this._createNodes();
	this._connectNodes();
	this._sourceNode.loop = loop;
	this._sourceNode.start(0, offset);
	this._startTime = WebAudio._context.currentTime - offset / this._pitch;
	this._createEndTimer();
};

/**
 * 创建音频节点。
 * Creates audio nodes.
 *
 * @memberof WebAudio
 * @method _createNodes
 * @private
 * @description 创建Web Audio API所需的音频节点。
 * Creates the audio nodes required for Web Audio API.
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._createNodes = function () {
	var context = WebAudio._context;
	this._sourceNode = context.createBufferSource();
	this._sourceNode.buffer = this._buffer;
	this._sourceNode.loopStart = this._loopStart;
	this._sourceNode.loopEnd = this._loopStart + this._loopLength;
	this._sourceNode.playbackRate.setValueAtTime(this._pitch, context.currentTime);
	this._gainNode = context.createGain();
	this._gainNode.gain.setValueAtTime(this._volume, context.currentTime);
	this._pannerNode = context.createPanner();
	this._pannerNode.panningModel = "equalpower";
	this._updatePanner();
};

/**
 * 连接音频节点。
 * Connects audio nodes.
 *
 * @memberof WebAudio
 * @method _connectNodes
 * @private
 * @description 连接音频节点以建立音频处理链。
 * Connects audio nodes to establish the audio processing chain.
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._connectNodes = function () {
	this._sourceNode.connect(this._gainNode);
	this._gainNode.connect(this._pannerNode);
	this._pannerNode.connect(WebAudio._masterGainNode);
};

/**
 * 移除音频节点。
 * Removes audio nodes.
 *
 * @memberof WebAudio
 * @method _removeNodes
 * @private
 * @description 移除并清理音频节点。
 * Removes and cleans up audio nodes.
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._removeNodes = function () {
	if (this._sourceNode) {
		this._sourceNode.stop(0);
		this._sourceNode = null;
		this._gainNode = null;
		this._pannerNode = null;
	}
};

/**
 * 创建结束定时器。
 * Creates end timer.
 *
 * @memberof WebAudio
 * @method _createEndTimer
 * @private
 * @description 为非循环音频创建结束定时器。
 * Creates end timer for non-looping audio.
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._createEndTimer = function () {
	if (this._sourceNode && !this._sourceNode.loop) {
		var endTime = this._startTime + this._totalTime / this._pitch;
		var delay = endTime - WebAudio._context.currentTime;
		this._endTimer = setTimeout(
			function () {
				this.stop();
			}.bind(this),
			delay * 1000,
		);
	}
};

/**
 * 移除结束定时器。
 * Removes end timer.
 *
 * @memberof WebAudio
 * @method _removeEndTimer
 * @private
 * @description 移除音频结束定时器。
 * Removes the audio end timer.
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._removeEndTimer = function () {
	if (this._endTimer) {
		clearTimeout(this._endTimer);
		this._endTimer = null;
	}
};

/**
 * 更新声像器。
 * Updates the panner.
 *
 * @memberof WebAudio
 * @method _updatePanner
 * @private
 * @description 根据声像值更新声像器的位置。
 * Updates the panner position based on the pan value.
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._updatePanner = function () {
	if (this._pannerNode) {
		var x = this._pan;
		var z = 1 - Math.abs(x);
		this._pannerNode.setPosition(x, 0, z);
	}
};

/**
 * 加载完成事件处理。
 * Handles load completion event.
 *
 * @memberof WebAudio
 * @method _onLoad
 * @private
 * @description 处理音频加载完成事件，调用所有加载监听器。
 * Handles audio load completion event, calls all load listeners.
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._onLoad = function () {
	while (this._loadListeners.length > 0) {
		var listner = this._loadListeners.shift();
		listner();
	}
};

/**
 * 读取循环注释。
 * Reads loop comments.
 *
 * @memberof WebAudio
 * @method _readLoopComments
 * @private
 * @description 从音频文件中读取循环注释信息。
 * Reads loop comment information from the audio file.
 * @param {Uint8Array} array - 字节数组 The byte array
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._readLoopComments = function (array) {
	this._readOgg(array);
	this._readMp4(array);
};

/**
 * 读取Ogg文件。
 * Reads Ogg file.
 *
 * @memberof WebAudio
 * @method _readOgg
 * @private
 * @description 解析Ogg格式的音频文件以提取循环信息。
 * Parses Ogg format audio file to extract loop information.
 * @param {Uint8Array} array - 字节数组 The byte array
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._readOgg = function (array) {
	var index = 0;
	while (index < array.length) {
		if (this._readFourCharacters(array, index) === "OggS") {
			index += 26;
			var vorbisHeaderFound = false;
			var numSegments = array[index++];
			var segments = [];
			for (var i = 0; i < numSegments; i++) {
				segments.push(array[index++]);
			}
			for (i = 0; i < numSegments; i++) {
				if (this._readFourCharacters(array, index + 1) === "vorb") {
					var headerType = array[index];
					if (headerType === 1) {
						this._sampleRate = this._readLittleEndian(array, index + 12);
					} else if (headerType === 3) {
						this._readMetaData(array, index, segments[i]);
					}
					vorbisHeaderFound = true;
				}
				index += segments[i];
			}
			if (!vorbisHeaderFound) {
				break;
			}
		} else {
			break;
		}
	}
};

/**
 * 读取MP4文件。
 * Reads MP4 file.
 *
 * @memberof WebAudio
 * @method _readMp4
 * @private
 * @description 解析MP4格式的音频文件以提取循环信息。
 * Parses MP4 format audio file to extract loop information.
 * @param {Uint8Array} array - 字节数组 The byte array
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._readMp4 = function (array) {
	if (this._readFourCharacters(array, 4) === "ftyp") {
		var index = 0;
		while (index < array.length) {
			var size = this._readBigEndian(array, index);
			var name = this._readFourCharacters(array, index + 4);
			if (name === "moov") {
				index += 8;
			} else {
				if (name === "mvhd") {
					this._sampleRate = this._readBigEndian(array, index + 20);
				}
				if (name === "udta" || name === "meta") {
					this._readMetaData(array, index, size);
				}
				index += size;
				if (size <= 1) {
					break;
				}
			}
		}
	}
};

/**
 * 读取元数据。
 * Reads metadata.
 *
 * @memberof WebAudio
 * @method _readMetaData
 * @private
 * @description 从音频文件中读取元数据，提取循环开始和长度信息。
 * Reads metadata from audio file, extracts loop start and length information.
 * @param {Uint8Array} array - 字节数组 The byte array
 * @param {Number} index - 索引 The index
 * @param {Number} size - 大小 The size
 * @returns {void} 无返回值 No return value
 */
WebAudio.prototype._readMetaData = function (array, index, size) {
	for (var i = index; i < index + size - 10; i++) {
		if (this._readFourCharacters(array, i) === "LOOP") {
			var text = "";
			while (array[i] > 0) {
				text += String.fromCharCode(array[i++]);
			}
			if (text.match(/LOOPSTART=([0-9]+)/)) {
				this._loopStart = parseInt(RegExp.$1);
			}
			if (text.match(/LOOPLENGTH=([0-9]+)/)) {
				this._loopLength = parseInt(RegExp.$1);
			}
			if (text == "LOOPSTART" || text == "LOOPLENGTH") {
				var text2 = "";
				i += 16;
				while (array[i] > 0) {
					text2 += String.fromCharCode(array[i++]);
				}
				if (text == "LOOPSTART") {
					this._loopStart = parseInt(text2);
				} else {
					this._loopLength = parseInt(text2);
				}
			}
		}
	}
};

/**
 * 读取小端字节序。
 * Reads little endian.
 *
 * @memberof WebAudio
 * @method _readLittleEndian
 * @private
 * @description 从字节数组中读取小端字节序的32位整数。
 * Reads 32-bit integer in little endian format from byte array.
 * @param {Uint8Array} array - 字节数组 The byte array
 * @param {Number} index - 索引 The index
 * @returns {Number} 32位整数值 32-bit integer value
 */
WebAudio.prototype._readLittleEndian = function (array, index) {
	return array[index + 3] * 0x1000000 + array[index + 2] * 0x10000 + array[index + 1] * 0x100 + array[index + 0];
};

/**
 * 读取大端字节序。
 * Reads big endian.
 *
 * @memberof WebAudio
 * @method _readBigEndian
 * @private
 * @description 从字节数组中读取大端字节序的32位整数。
 * Reads 32-bit integer in big endian format from byte array.
 * @param {Uint8Array} array - 字节数组 The byte array
 * @param {Number} index - 索引 The index
 * @returns {Number} 32位整数值 32-bit integer value
 */
WebAudio.prototype._readBigEndian = function (array, index) {
	return array[index + 0] * 0x1000000 + array[index + 1] * 0x10000 + array[index + 2] * 0x100 + array[index + 3];
};

/**
 * 读取四个字符。
 * Reads four characters.
 *
 * @memberof WebAudio
 * @method _readFourCharacters
 * @private
 * @description 从字节数组中读取四个字符并转换为字符串。
 * Reads four characters from byte array and converts to string.
 * @param {Uint8Array} array - 字节数组 The byte array
 * @param {Number} index - 索引 The index
 * @returns {String} 四个字符的字符串 String of four characters
 */
WebAudio.prototype._readFourCharacters = function (array, index) {
	var string = "";
	for (var i = 0; i < 4; i++) {
		string += String.fromCharCode(array[index + i]);
	}
	return string;
};

//-----------------------------------------------------------------------------
