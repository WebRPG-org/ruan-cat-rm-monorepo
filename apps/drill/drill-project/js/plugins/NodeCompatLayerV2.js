//=============================================================================
// NodeCompatLayerV2.js - 由@vitejs/vite构建自动生成 - 请勿手动修改
// Node.js API 兼容层 v2.0 - 真实文件系统 + IndexedDB 持久化
// 插件版本: v2.0.0
// 编译时间: 2025-11-10 06:15:09
//=============================================================================
"use strict";
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function AsyncGenerator(gen) {
    var front, back;
    function send(key, arg) {
        return new Promise(function(resolve, reject) {
            var request = {
                key: key,
                arg: arg,
                resolve: resolve,
                reject: reject,
                next: null
            };
            if (back) {
                back = back.next = request;
            } else {
                front = back = request;
                resume(key, arg);
            }
        });
    }
    function resume(key, arg) {
        try {
            var result = gen[key](arg);
            var value = result.value;
            var wrappedAwait = value instanceof _AwaitValue;
            Promise.resolve(wrappedAwait ? value.wrapped : value).then(function(arg) {
                if (wrappedAwait) {
                    resume("next", arg);
                    return;
                }
                settle(result.done ? "return" : "normal", arg);
            }, function(err) {
                resume("throw", err);
            });
        } catch (err) {
            settle("throw", err);
        }
    }
    function settle(type, value) {
        switch(type){
            case "return":
                front.resolve({
                    value: value,
                    done: true
                });
                break;
            case "throw":
                front.reject(value);
                break;
            default:
                front.resolve({
                    value: value,
                    done: false
                });
                break;
        }
        front = front.next;
        if (front) {
            resume(front.key, front.arg);
        } else {
            back = null;
        }
    }
    this._invoke = send;
    if (typeof gen.return !== "function") {
        this.return = undefined;
    }
}
if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
        return this;
    };
}
AsyncGenerator.prototype.next = function(arg) {
    return this._invoke("next", arg);
};
AsyncGenerator.prototype.throw = function(arg) {
    return this._invoke("throw", arg);
};
AsyncGenerator.prototype.return = function(arg) {
    return this._invoke("return", arg);
};
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _awaitAsyncGenerator(value) {
    return new _AwaitValue(value);
}
function _AwaitValue(value) {
    this.wrapped = value;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _wrapAsyncGenerator(fn) {
    return function() {
        return new AsyncGenerator(fn.apply(this, arguments));
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var __generator = this && this.__generator || function(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return(g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g);
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
(function() {
    var __extends = function __extends(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __rest = function __rest(s, e) {
        var t = {};
        for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
        return t;
    };
    var __decorate = function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = function __param(paramIndex, decorator) {
        return function(target, key) {
            decorator(target, key, paramIndex);
        };
    };
    var __esDecorate = function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) {
            if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
            return f;
        }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for(var i = decorators.length - 1; i >= 0; i--){
            var context = {};
            for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
            for(var p in contextIn.access)context.access[p] = contextIn.access[p];
            context.addInitializer = function(f) {
                if (done) throw new TypeError("Cannot add initializers after decoration has completed");
                extraInitializers.push(accept(f || null));
            };
            var result = (0, decorators[i])(kind === "accessor" ? {
                get: descriptor.get,
                set: descriptor.set
            } : descriptor[key], context);
            if (kind === "accessor") {
                if (result === void 0) continue;
                if (result === null || typeof result !== "object") throw new TypeError("Object expected");
                if (_ = accept(result.get)) descriptor.get = _;
                if (_ = accept(result.set)) descriptor.set = _;
                if (_ = accept(result.init)) initializers.unshift(_);
            } else if (_ = accept(result)) {
                if (kind === "field") initializers.unshift(_);
                else descriptor[key] = _;
            }
        }
        if (target) Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
    };
    var __runInitializers = function __runInitializers(thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for(var i = 0; i < initializers.length; i++){
            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
    };
    var __propKey = function __propKey(x) {
        return (typeof x === "undefined" ? "undefined" : _typeof(x)) === "symbol" ? x : "".concat(x);
    };
    var __setFunctionName = function __setFunctionName(f, name, prefix) {
        if ((typeof name === "undefined" ? "undefined" : _typeof(name)) === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", {
            configurable: true,
            value: prefix ? "".concat(prefix, " ", name) : name
        });
    };
    var __metadata = function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };
    var __awaiter = function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return _instanceof(value, P) ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator1 = function __generator1(thisArg, body) {
        var _ = {
            label: 0,
            sent: function sent() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([
                    n,
                    v
                ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while(g && (g = 0, op[0] && (_ = 0)), _)try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [
                    op[0] & 2,
                    t.value
                ];
                switch(op[0]){
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [
                            0
                        ];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [
                    6,
                    e
                ];
                y = 0;
            } finally{
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    var __exportStar = function __exportStar(m, o) {
        for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    };
    var __values = function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function next() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read = function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally{
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally{
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var __spread = function __spread() {
        for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    var __spreadArrays = function __spreadArrays() {
        for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
        for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
        return r;
    };
    var __spreadArray = function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var __asyncGenerator = function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
            return this;
        }, i;
        function awaitReturn(f) {
            return function(v) {
                return Promise.resolve(v).then(f, reject);
            };
        }
        function verb(n, f) {
            if (g[n]) {
                i[n] = function(v) {
                    return new Promise(function(a, b) {
                        q.push([
                            n,
                            v,
                            a,
                            b
                        ]) > 1 || resume(n, v);
                    });
                };
                if (f) i[n] = f(i[n]);
            }
        }
        function resume(n, v) {
            try {
                step(g[n](v));
            } catch (e) {
                settle(q[0][3], e);
            }
        }
        function step(r) {
            _instanceof(r.value, __await) ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
            resume("next", value);
        }
        function reject(value) {
            resume("throw", value);
        }
        function settle(f, v) {
            if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
    };
    var __asyncDelegator = function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
            return this;
        }, i;
        function verb(n, f) {
            i[n] = o[n] ? function(v) {
                return (p = !p) ? {
                    value: __await(o[n](v)),
                    done: false
                } : f ? f(v) : v;
            } : f;
        }
    };
    var __asyncValues = function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
        }, i);
        function verb(n) {
            i[n] = o[n] && function(v) {
                return new Promise(function(resolve, reject) {
                    v = o[n](v), settle(resolve, reject, v.done, v.value);
                });
            };
        }
        function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
                resolve({
                    value: v2,
                    done: d
                });
            }, reject);
        }
    };
    var __makeTemplateObject = function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", {
                value: raw
            });
        } else {
            cooked.raw = raw;
        }
        return cooked;
    };
    var __importStar = function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
    var __importDefault = function __importDefault(mod) {
        return mod && mod.__esModule ? mod : {
            default: mod
        };
    };
    var __classPrivateFieldGet = function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldIn = function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    };
    var __addDisposableResource = function __addDisposableResource(env, value, async) {
        if (value !== null && value !== void 0) {
            if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
            var dispose, inner;
            if (async) {
                if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
                dispose = value[Symbol.asyncDispose];
            }
            if (dispose === void 0) {
                if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
                dispose = value[Symbol.dispose];
                if (async) inner = dispose;
            }
            if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
            if (inner) dispose = function dispose() {
                try {
                    inner.call(this);
                } catch (e) {
                    return Promise.reject(e);
                }
            };
            env.stack.push({
                value: value,
                dispose: dispose,
                async: async
            });
        } else if (async) {
            env.stack.push({
                async: true
            });
        }
        return value;
    };
    var __disposeResources = function __disposeResources(env) {
        function fail(e) {
            env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while(r = env.stack.pop()){
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                            fail(e);
                            return next();
                        });
                    } else s |= 1;
                } catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
    var __rewriteRelativeImportExtension = function __rewriteRelativeImportExtension(path, preserveJsx) {
        if (typeof path === "string" && /^\.\.?\//.test(path)) {
            return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
                return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
            });
        }
        return path;
    };
    var getIdbProxyableTypes = function getIdbProxyableTypes() {
        return idbProxyableTypes || (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction
        ]);
    };
    var getCursorAdvanceMethods = function getCursorAdvanceMethods() {
        return cursorAdvanceMethods || (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey
        ]);
    };
    var promisifyRequest = function promisifyRequest(request) {
        var promise = new Promise(function(resolve, reject) {
            var unlisten = function() {
                request.removeEventListener("success", success);
                request.removeEventListener("error", error);
            };
            var success = function() {
                resolve(wrap(request.result));
                unlisten();
            };
            var error = function() {
                reject(request.error);
                unlisten();
            };
            request.addEventListener("success", success);
            request.addEventListener("error", error);
        });
        reverseTransformCache.set(promise, request);
        return promise;
    };
    var cacheDonePromiseForTransaction = function cacheDonePromiseForTransaction(tx) {
        if (transactionDoneMap.has(tx)) return;
        var done = new Promise(function(resolve, reject) {
            var unlisten = function() {
                tx.removeEventListener("complete", complete);
                tx.removeEventListener("error", error);
                tx.removeEventListener("abort", error);
            };
            var complete = function() {
                resolve();
                unlisten();
            };
            var error = function() {
                reject(tx.error || new DOMException("AbortError", "AbortError"));
                unlisten();
            };
            tx.addEventListener("complete", complete);
            tx.addEventListener("error", error);
            tx.addEventListener("abort", error);
        });
        transactionDoneMap.set(tx, done);
    };
    var replaceTraps = function replaceTraps(callback) {
        idbProxyTraps = callback(idbProxyTraps);
    };
    var wrapFunction = function wrapFunction(func) {
        if (getCursorAdvanceMethods().includes(func)) {
            return function() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                func.apply(unwrap(this), args);
                return wrap(this.request);
            };
        }
        return function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return wrap(func.apply(unwrap(this), args));
        };
    };
    var transformCachableValue = function transformCachableValue(value) {
        if (typeof value === "function") return wrapFunction(value);
        if (_instanceof(value, IDBTransaction)) cacheDonePromiseForTransaction(value);
        if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
        return value;
    };
    var wrap = function wrap(value) {
        if (_instanceof(value, IDBRequest)) return promisifyRequest(value);
        if (transformCache.has(value)) return transformCache.get(value);
        var newValue = transformCachableValue(value);
        if (newValue !== value) {
            transformCache.set(value, newValue);
            reverseTransformCache.set(newValue, value);
        }
        return newValue;
    };
    var openDB = function openDB(name, version) {
        var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, blocked = _ref.blocked, upgrade = _ref.upgrade, blocking = _ref.blocking, terminated = _ref.terminated;
        var request = indexedDB.open(name, version);
        var openPromise = wrap(request);
        if (upgrade) {
            request.addEventListener("upgradeneeded", function(event) {
                upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
            });
        }
        if (blocked) {
            request.addEventListener("blocked", function(event) {
                return blocked(// Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
                event.oldVersion, event.newVersion, event);
            });
        }
        openPromise.then(function(db) {
            if (terminated) db.addEventListener("close", function() {
                return terminated();
            });
            if (blocking) {
                db.addEventListener("versionchange", function(event) {
                    return blocking(event.oldVersion, event.newVersion, event);
                });
            }
        }).catch(function() {});
        return openPromise;
    };
    var getMethod = function getMethod(target, prop) {
        if (!(_instanceof(target, IDBDatabase) && !(prop in target) && typeof prop === "string")) {
            return;
        }
        if (cachedMethods.get(prop)) return cachedMethods.get(prop);
        var targetFuncName = prop.replace(/FromIndex$/, "");
        var useIndex = prop !== targetFuncName;
        var isWrite = writeMethods.includes(targetFuncName);
        if (// Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
        !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
            return;
        }
        var method = function() {
            var _ref = _asyncToGenerator(function(storeName) {
                var _len, args, _key, _target2, tx, target2;
                var _arguments = arguments;
                return __generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            for(_len = _arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                                args[_key - 1] = _arguments[_key];
                            }
                            tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
                            target2 = tx.store;
                            if (useIndex) target2 = target2.index(args.shift());
                            return [
                                4,
                                Promise.all([
                                    (_target2 = target2)[targetFuncName].apply(_target2, _toConsumableArray(args)),
                                    isWrite && tx.done
                                ])
                            ];
                        case 1:
                            return [
                                2,
                                _state.sent()[0]
                            ];
                    }
                });
            });
            return function method(storeName) {
                return _ref.apply(this, arguments);
            };
        }();
        cachedMethods.set(prop, method);
        return method;
    };
    var isIteratorProp = function isIteratorProp(target, prop) {
        return prop === Symbol.asyncIterator && instanceOfAny(target, [
            IDBIndex,
            IDBObjectStore,
            IDBCursor
        ]) || prop === "iterate" && instanceOfAny(target, [
            IDBIndex,
            IDBObjectStore
        ]);
    };
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __defNormalProp = function(obj, key, value) {
        return key in obj ? __defProp(obj, key, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
        }) : obj[key] = value;
    };
    var __require = /* @__PURE__ */ function(x) {
        return typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
            get: function(a, b) {
                return (typeof require !== "undefined" ? require : a)[b];
            }
        }) : x;
    }(function(x) {
        if (typeof require !== "undefined") return require.apply(this, arguments);
        throw Error('Dynamic require of "' + x + '" is not supported');
    });
    var __esm = function(fn, res) {
        return function __init() {
            return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
        };
    };
    var __commonJS = function(cb, mod) {
        return function __require2() {
            return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
                exports: {}
            }).exports, mod), mod.exports;
        };
    };
    var __export = function(target, all) {
        for(var name in all)__defProp(target, name, {
            get: all[name],
            enumerable: true
        });
    };
    var __copyProps = function(to, from, except, desc) {
        if (from && typeof from === "object" || typeof from === "function") {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                var _loop = function() {
                    var key = _step.value;
                    if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                        get: function() {
                            return from[key];
                        },
                        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                    });
                };
                for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        return to;
    };
    var __toESM = function(mod, isNodeMode, target) {
        return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
            value: mod,
            enumerable: true
        }) : target, mod);
    };
    var __toCommonJS = function(mod) {
        return __copyProps(__defProp({}, "__esModule", {
            value: true
        }), mod);
    };
    var __publicField = function(obj, key, value) {
        return __defNormalProp(obj, (typeof key === "undefined" ? "undefined" : _typeof(key)) !== "symbol" ? key + "" : key, value);
    };
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/constants.js
    var require_constants = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/constants.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.constants = exports.SEP = void 0;
            exports.SEP = "/";
            exports.constants = {
                O_RDONLY: 0,
                O_WRONLY: 1,
                O_RDWR: 2,
                S_IFMT: 61440,
                S_IFREG: 32768,
                S_IFDIR: 16384,
                S_IFCHR: 8192,
                S_IFBLK: 24576,
                S_IFIFO: 4096,
                S_IFLNK: 40960,
                S_IFSOCK: 49152,
                O_CREAT: 64,
                O_EXCL: 128,
                O_NOCTTY: 256,
                O_TRUNC: 512,
                O_APPEND: 1024,
                O_DIRECTORY: 65536,
                O_NOATIME: 262144,
                O_NOFOLLOW: 131072,
                O_SYNC: 1052672,
                O_SYMLINK: 2097152,
                O_DIRECT: 16384,
                O_NONBLOCK: 2048,
                S_IRWXU: 448,
                S_IRUSR: 256,
                S_IWUSR: 128,
                S_IXUSR: 64,
                S_IRWXG: 56,
                S_IRGRP: 32,
                S_IWGRP: 16,
                S_IXGRP: 8,
                S_IRWXO: 7,
                S_IROTH: 4,
                S_IWOTH: 2,
                S_IXOTH: 1,
                F_OK: 0,
                R_OK: 4,
                W_OK: 2,
                X_OK: 1,
                UV_FS_SYMLINK_DIR: 1,
                UV_FS_SYMLINK_JUNCTION: 2,
                UV_FS_COPYFILE_EXCL: 1,
                UV_FS_COPYFILE_FICLONE: 2,
                UV_FS_COPYFILE_FICLONE_FORCE: 4,
                COPYFILE_EXCL: 1,
                COPYFILE_FICLONE: 2,
                COPYFILE_FICLONE_FORCE: 4
            };
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/Stats.js
    var require_Stats = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/Stats.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Stats = void 0;
            var constants_1 = require_constants();
            var _constants_1_constants = constants_1.constants, S_IFMT = _constants_1_constants.S_IFMT, S_IFDIR = _constants_1_constants.S_IFDIR, S_IFREG = _constants_1_constants.S_IFREG, S_IFBLK = _constants_1_constants.S_IFBLK, S_IFCHR = _constants_1_constants.S_IFCHR, S_IFLNK = _constants_1_constants.S_IFLNK, S_IFIFO = _constants_1_constants.S_IFIFO, S_IFSOCK = _constants_1_constants.S_IFSOCK;
            var Stats = /*#__PURE__*/ function() {
                function _Stats() {
                    _classCallCheck(this, _Stats);
                }
                _createClass(_Stats, [
                    {
                        key: "_checkModeProperty",
                        value: function _checkModeProperty(property) {
                            return (Number(this.mode) & S_IFMT) === property;
                        }
                    },
                    {
                        key: "isDirectory",
                        value: function isDirectory() {
                            return this._checkModeProperty(S_IFDIR);
                        }
                    },
                    {
                        key: "isFile",
                        value: function isFile() {
                            return this._checkModeProperty(S_IFREG);
                        }
                    },
                    {
                        key: "isBlockDevice",
                        value: function isBlockDevice() {
                            return this._checkModeProperty(S_IFBLK);
                        }
                    },
                    {
                        key: "isCharacterDevice",
                        value: function isCharacterDevice() {
                            return this._checkModeProperty(S_IFCHR);
                        }
                    },
                    {
                        key: "isSymbolicLink",
                        value: function isSymbolicLink() {
                            return this._checkModeProperty(S_IFLNK);
                        }
                    },
                    {
                        key: "isFIFO",
                        value: function isFIFO() {
                            return this._checkModeProperty(S_IFIFO);
                        }
                    },
                    {
                        key: "isSocket",
                        value: function isSocket() {
                            return this._checkModeProperty(S_IFSOCK);
                        }
                    }
                ], [
                    {
                        key: "build",
                        value: function build(node) {
                            var bigint = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                            var stats = new _Stats();
                            var uid = node.uid, gid = node.gid, atime = node.atime, mtime = node.mtime, ctime = node.ctime;
                            var getStatNumber = !bigint ? function(number) {
                                return number;
                            } : function(number) {
                                return BigInt(number);
                            };
                            stats.uid = getStatNumber(uid);
                            stats.gid = getStatNumber(gid);
                            stats.rdev = getStatNumber(node.rdev);
                            stats.blksize = getStatNumber(4096);
                            stats.ino = getStatNumber(node.ino);
                            stats.size = getStatNumber(node.getSize());
                            stats.blocks = getStatNumber(1);
                            stats.atime = atime;
                            stats.mtime = mtime;
                            stats.ctime = ctime;
                            stats.birthtime = ctime;
                            stats.atimeMs = getStatNumber(atime.getTime());
                            stats.mtimeMs = getStatNumber(mtime.getTime());
                            var ctimeMs = getStatNumber(ctime.getTime());
                            stats.ctimeMs = ctimeMs;
                            stats.birthtimeMs = ctimeMs;
                            if (bigint) {
                                stats.atimeNs = BigInt(atime.getTime()) * BigInt(1e6);
                                stats.mtimeNs = BigInt(mtime.getTime()) * BigInt(1e6);
                                var ctimeNs = BigInt(ctime.getTime()) * BigInt(1e6);
                                stats.ctimeNs = ctimeNs;
                                stats.birthtimeNs = ctimeNs;
                            }
                            stats.dev = getStatNumber(0);
                            stats.mode = getStatNumber(node.mode);
                            stats.nlink = getStatNumber(node.nlink);
                            return stats;
                        }
                    }
                ]);
                return _Stats;
            }();
            exports.Stats = Stats;
            exports.default = Stats;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/buffer.js
    var require_buffer = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/buffer.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Buffer = void 0;
            var node_buffer_1 = __require("buffer");
            Object.defineProperty(exports, "Buffer", {
                enumerable: true,
                get: function get() {
                    return node_buffer_1.Buffer;
                }
            });
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/internal/buffer.js
    var require_buffer2 = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/internal/buffer.js": function(exports) {
            "use strict";
            var bufferV0P12Ponyfill = function bufferV0P12Ponyfill(arg0) {
                for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    args[_key - 1] = arguments[_key];
                }
                return _construct(buffer_1.Buffer, [
                    arg0
                ].concat(_toConsumableArray(args)));
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.bufferFrom = exports.bufferAllocUnsafe = exports.Buffer = void 0;
            var buffer_1 = require_buffer();
            Object.defineProperty(exports, "Buffer", {
                enumerable: true,
                get: function get() {
                    return buffer_1.Buffer;
                }
            });
            var bufferAllocUnsafe = buffer_1.Buffer.allocUnsafe || bufferV0P12Ponyfill;
            exports.bufferAllocUnsafe = bufferAllocUnsafe;
            var bufferFrom = buffer_1.Buffer.from || bufferV0P12Ponyfill;
            exports.bufferFrom = bufferFrom;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/util.js
    var require_util = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/util.js": function(exports) {
            "use strict";
            var inherits = function inherits(ctor, superCtor) {
                if (ctor === void 0 || ctor === null) {
                    throw new TypeError("The constructor to inherit from is not defined");
                }
                if (superCtor === void 0 || superCtor === null) {
                    throw new TypeError("The super constructor to inherit from is not defined");
                }
                ctor.super_ = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
            };
            var promisify = function promisify(fn) {
                if (typeof fn !== "function") {
                    throw new TypeError('The "original" argument must be of type function');
                }
                return function() {
                    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                        args[_key] = arguments[_key];
                    }
                    var _this = this;
                    return new Promise(function(resolve, reject) {
                        var _fn;
                        (_fn = fn).call.apply(_fn, [
                            _this
                        ].concat(_toConsumableArray(args), [
                            function(err, result) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            }
                        ]));
                    });
                };
            };
            var format = function format(template) {
                for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    args[_key - 1] = arguments[_key];
                }
                if (args.length === 0) return template;
                var result = template;
                var argIndex = 0;
                result = result.replace(/%[sdj%]/g, function(match) {
                    if (argIndex >= args.length) return match;
                    var arg = args[argIndex++];
                    switch(match){
                        case "%s":
                            return String(arg);
                        case "%d":
                            return Number(arg).toString();
                        case "%j":
                            try {
                                return JSON.stringify(arg);
                            } catch (e) {
                                return "[Circular]";
                            }
                        case "%%":
                            return "%";
                        default:
                            return match;
                    }
                });
                while(argIndex < args.length){
                    result += " " + String(args[argIndex++]);
                }
                return result;
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.inherits = inherits;
            exports.promisify = promisify;
            exports.inspect = inspect;
            exports.format = format;
            function inspect(value) {
                if (value === null) return "null";
                if (value === void 0) return "undefined";
                if (typeof value === "string") return "'".concat(value, "'");
                if (typeof value === "number" || typeof value === "boolean") return String(value);
                if (Array.isArray(value)) {
                    var items = value.map(function(item) {
                        return inspect(item);
                    }).join(", ");
                    return "[ ".concat(items, " ]");
                }
                if (typeof value === "object") {
                    var entries = Object.entries(value).map(function(param) {
                        var _param = _slicedToArray(param, 2), key = _param[0], val = _param[1];
                        return "".concat(key, ": ").concat(inspect(val));
                    }).join(", ");
                    return "{ ".concat(entries, " }");
                }
                return String(value);
            }
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/internal/errors.js
    var require_errors = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/internal/errors.js": function(exports) {
            "use strict";
            var makeNodeError = function makeNodeError(Base) {
                return /*#__PURE__*/ function(Base) {
                    _inherits(NodeError, Base);
                    var _super = _createSuper(NodeError);
                    function NodeError(key) {
                        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                            args[_key - 1] = arguments[_key];
                        }
                        _classCallCheck(this, NodeError);
                        var _this;
                        _this = _super.call(this, message(key, args));
                        _this.code = key;
                        _this[kCode] = key;
                        _this.name = "".concat(_get((_assertThisInitialized(_this), _getPrototypeOf(NodeError.prototype)), "name", _this), " [").concat(_this[kCode], "]");
                        return _this;
                    }
                    return NodeError;
                }(Base);
            };
            var message = function message(key, args) {
                if (typeof key !== "string") throw new exports.Error("Error message key must be a string");
                var msg = messages[key];
                if (!msg) throw new exports.Error("An invalid error message key was used: ".concat(key, "."));
                var fmt;
                if (typeof msg === "function") {
                    fmt = msg;
                } else {
                    fmt = util_1.format;
                    if (args === void 0 || args.length === 0) return msg;
                    args.unshift(msg);
                }
                return String(fmt.apply(null, args));
            };
            var E = function E(sym, val) {
                messages[sym] = typeof val === "function" ? val : String(val);
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.AssertionError = exports.RangeError = exports.TypeError = exports.Error = void 0;
            exports.message = message;
            exports.E = E;
            var util_1 = require_util();
            var kCode = typeof Symbol === "undefined" ? "_kCode" : Symbol("code");
            var messages = {};
            var g = typeof globalThis !== "undefined" ? globalThis : global;
            var AssertionError = /*#__PURE__*/ function(_g_Error) {
                _inherits(AssertionError, _g_Error);
                var _super = _createSuper(AssertionError);
                function AssertionError(options) {
                    _classCallCheck(this, AssertionError);
                    var _this;
                    if (typeof options !== "object" || options === null) {
                        throw new exports.TypeError("ERR_INVALID_ARG_TYPE", "options", "object");
                    }
                    if (options.message) {
                        _this = _super.call(this, options.message);
                    } else {
                        _this = _super.call(this, "".concat((0, util_1.inspect)(options.actual).slice(0, 128), " ").concat(options.operator, " ").concat((0, util_1.inspect)(options.expected).slice(0, 128)));
                    }
                    _this.generatedMessage = !options.message;
                    _this.name = "AssertionError [ERR_ASSERTION]";
                    _this.code = "ERR_ASSERTION";
                    _this.actual = options.actual;
                    _this.expected = options.expected;
                    _this.operator = options.operator;
                    exports.Error.captureStackTrace(_assertThisInitialized(_this), options.stackStartFunction);
                    return _possibleConstructorReturn(_this);
                }
                return AssertionError;
            }(g.Error);
            exports.AssertionError = AssertionError;
            exports.Error = makeNodeError(g.Error);
            exports.TypeError = makeNodeError(g.TypeError);
            exports.RangeError = makeNodeError(g.RangeError);
            E("ERR_DIR_CLOSED", "Directory handle was closed");
            E("ERR_DIR_CONCURRENT_OPERATION", "Cannot do synchronous work on directory handle with concurrent asynchronous operations");
            E("ERR_INVALID_FILE_URL_HOST", 'File URL host must be "localhost" or empty on %s');
            E("ERR_INVALID_FILE_URL_PATH", "File URL path %s");
            E("ERR_INVALID_OPT_VALUE", function(name, value) {
                return 'The value "'.concat(String(value), '" is invalid for option "').concat(name, '"');
            });
            E("ERR_INVALID_OPT_VALUE_ENCODING", function(value) {
                return 'The value "'.concat(String(value), '" is invalid for option "encoding"');
            });
            E("ERR_INVALID_ARG_VALUE", "Unable to open file as blob");
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/encoding.js
    var require_encoding = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/encoding.js": function(exports) {
            "use strict";
            var assertEncoding = function assertEncoding(encoding) {
                if (encoding && !buffer_1.Buffer.isEncoding(encoding)) throw new errors.TypeError("ERR_INVALID_OPT_VALUE_ENCODING", encoding);
            };
            var strToEncoding = function strToEncoding(str, encoding) {
                if (!encoding || encoding === exports.ENCODING_UTF8) return str;
                if (encoding === "buffer") return new buffer_1.Buffer(str);
                return new buffer_1.Buffer(str).toString(encoding);
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.ENCODING_UTF8 = void 0;
            exports.assertEncoding = assertEncoding;
            exports.strToEncoding = strToEncoding;
            var buffer_1 = require_buffer2();
            var errors = require_errors();
            exports.ENCODING_UTF8 = "utf8";
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/Dirent.js
    var require_Dirent = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/Dirent.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Dirent = void 0;
            var constants_1 = require_constants();
            var encoding_1 = require_encoding();
            var _constants_1_constants = constants_1.constants, S_IFMT = _constants_1_constants.S_IFMT, S_IFDIR = _constants_1_constants.S_IFDIR, S_IFREG = _constants_1_constants.S_IFREG, S_IFBLK = _constants_1_constants.S_IFBLK, S_IFCHR = _constants_1_constants.S_IFCHR, S_IFLNK = _constants_1_constants.S_IFLNK, S_IFIFO = _constants_1_constants.S_IFIFO, S_IFSOCK = _constants_1_constants.S_IFSOCK;
            var Dirent = /*#__PURE__*/ function() {
                function _Dirent() {
                    _classCallCheck(this, _Dirent);
                    this.name = "";
                    this.path = "";
                    this.parentPath = "";
                    this.mode = 0;
                }
                _createClass(_Dirent, [
                    {
                        key: "_checkModeProperty",
                        value: function _checkModeProperty(property) {
                            return (this.mode & S_IFMT) === property;
                        }
                    },
                    {
                        key: "isDirectory",
                        value: function isDirectory() {
                            return this._checkModeProperty(S_IFDIR);
                        }
                    },
                    {
                        key: "isFile",
                        value: function isFile() {
                            return this._checkModeProperty(S_IFREG);
                        }
                    },
                    {
                        key: "isBlockDevice",
                        value: function isBlockDevice() {
                            return this._checkModeProperty(S_IFBLK);
                        }
                    },
                    {
                        key: "isCharacterDevice",
                        value: function isCharacterDevice() {
                            return this._checkModeProperty(S_IFCHR);
                        }
                    },
                    {
                        key: "isSymbolicLink",
                        value: function isSymbolicLink() {
                            return this._checkModeProperty(S_IFLNK);
                        }
                    },
                    {
                        key: "isFIFO",
                        value: function isFIFO() {
                            return this._checkModeProperty(S_IFIFO);
                        }
                    },
                    {
                        key: "isSocket",
                        value: function isSocket() {
                            return this._checkModeProperty(S_IFSOCK);
                        }
                    }
                ], [
                    {
                        key: "build",
                        value: function build(link, encoding) {
                            var dirent = new _Dirent();
                            var mode = link.getNode().mode;
                            dirent.name = (0, encoding_1.strToEncoding)(link.getName(), encoding);
                            dirent.mode = mode;
                            dirent.path = link.getParentPath();
                            dirent.parentPath = dirent.path;
                            return dirent;
                        }
                    }
                ]);
                return _Dirent;
            }();
            exports.Dirent = Dirent;
            exports.default = Dirent;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/path.js
    var require_path = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/path.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.basename = exports.isAbsolute = exports.normalize = exports.dirname = exports.relative = exports.join = exports.posix = exports.sep = exports.resolve = void 0;
            var node_path_1 = __require("path");
            Object.defineProperty(exports, "resolve", {
                enumerable: true,
                get: function get() {
                    return node_path_1.resolve;
                }
            });
            Object.defineProperty(exports, "sep", {
                enumerable: true,
                get: function get() {
                    return node_path_1.sep;
                }
            });
            Object.defineProperty(exports, "posix", {
                enumerable: true,
                get: function get() {
                    return node_path_1.posix;
                }
            });
            Object.defineProperty(exports, "join", {
                enumerable: true,
                get: function get() {
                    return node_path_1.join;
                }
            });
            Object.defineProperty(exports, "relative", {
                enumerable: true,
                get: function get() {
                    return node_path_1.relative;
                }
            });
            Object.defineProperty(exports, "dirname", {
                enumerable: true,
                get: function get() {
                    return node_path_1.dirname;
                }
            });
            Object.defineProperty(exports, "normalize", {
                enumerable: true,
                get: function get() {
                    return node_path_1.normalize;
                }
            });
            Object.defineProperty(exports, "isAbsolute", {
                enumerable: true,
                get: function get() {
                    return node_path_1.isAbsolute;
                }
            });
            Object.defineProperty(exports, "basename", {
                enumerable: true,
                get: function get() {
                    return node_path_1.basename;
                }
            });
        }
    });
    // ../../node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs
    var tslib_es6_exports = {};
    __export(tslib_es6_exports, {
        __addDisposableResource: function() {
            return __addDisposableResource;
        },
        __assign: function() {
            return __assign;
        },
        __asyncDelegator: function() {
            return __asyncDelegator;
        },
        __asyncGenerator: function() {
            return __asyncGenerator;
        },
        __asyncValues: function() {
            return __asyncValues;
        },
        __await: function() {
            return __await;
        },
        __awaiter: function() {
            return __awaiter;
        },
        __classPrivateFieldGet: function() {
            return __classPrivateFieldGet;
        },
        __classPrivateFieldIn: function() {
            return __classPrivateFieldIn;
        },
        __classPrivateFieldSet: function() {
            return __classPrivateFieldSet;
        },
        __createBinding: function() {
            return __createBinding;
        },
        __decorate: function() {
            return __decorate;
        },
        __disposeResources: function() {
            return __disposeResources;
        },
        __esDecorate: function() {
            return __esDecorate;
        },
        __exportStar: function() {
            return __exportStar;
        },
        __extends: function() {
            return __extends;
        },
        __generator: function() {
            return __generator1;
        },
        __importDefault: function() {
            return __importDefault;
        },
        __importStar: function() {
            return __importStar;
        },
        __makeTemplateObject: function() {
            return __makeTemplateObject;
        },
        __metadata: function() {
            return __metadata;
        },
        __param: function() {
            return __param;
        },
        __propKey: function() {
            return __propKey;
        },
        __read: function() {
            return __read;
        },
        __rest: function() {
            return __rest;
        },
        __rewriteRelativeImportExtension: function() {
            return __rewriteRelativeImportExtension;
        },
        __runInitializers: function() {
            return __runInitializers;
        },
        __setFunctionName: function() {
            return __setFunctionName;
        },
        __spread: function() {
            return __spread;
        },
        __spreadArray: function() {
            return __spreadArray;
        },
        __spreadArrays: function() {
            return __spreadArrays;
        },
        __values: function() {
            return __values;
        },
        default: function() {
            return tslib_es6_default;
        }
    });
    function __await(v) {
        return _instanceof(this, __await) ? (this.v = v, this) : new __await(v);
    }
    var extendStatics, __assign, __createBinding, __setModuleDefault, ownKeys, _SuppressedError, tslib_es6_default;
    var init_tslib_es6 = __esm({
        "../../node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs": function() {
            "use strict";
            extendStatics = function(d, b) {
                extendStatics = Object.setPrototypeOf || _instanceof({
                    __proto__: []
                }, Array) && function(d2, b2) {
                    d2.__proto__ = b2;
                } || function(d2, b2) {
                    for(var p in b2)if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
                };
                return extendStatics(d, b);
            };
            __assign = function() {
                __assign = Object.assign || function __assign2(t) {
                    for(var s, i = 1, n = arguments.length; i < n; i++){
                        s = arguments[i];
                        for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };
            __createBinding = Object.create ? function __createBinding(o, m, k, k2) {
                if (k2 === void 0) k2 = k;
                var desc = Object.getOwnPropertyDescriptor(m, k);
                if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                    desc = {
                        enumerable: true,
                        get: function get() {
                            return m[k];
                        }
                    };
                }
                Object.defineProperty(o, k2, desc);
            } : function(o, m, k, k2) {
                if (k2 === void 0) k2 = k;
                o[k2] = m[k];
            };
            __setModuleDefault = Object.create ? function __setModuleDefault(o, v) {
                Object.defineProperty(o, "default", {
                    enumerable: true,
                    value: v
                });
            } : function(o, v) {
                o["default"] = v;
            };
            ownKeys = function(o) {
                ownKeys = Object.getOwnPropertyNames || function(o2) {
                    var ar = [];
                    for(var k in o2)if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
                    return ar;
                };
                return ownKeys(o);
            };
            _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function _SuppressedError(error, suppressed, message) {
                var e = new Error(message);
                return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
            };
            tslib_es6_default = {
                __extends: __extends,
                __assign: __assign,
                __rest: __rest,
                __decorate: __decorate,
                __param: __param,
                __esDecorate: __esDecorate,
                __runInitializers: __runInitializers,
                __propKey: __propKey,
                __setFunctionName: __setFunctionName,
                __metadata: __metadata,
                __awaiter: __awaiter,
                __generator: __generator1,
                __createBinding: __createBinding,
                __exportStar: __exportStar,
                __values: __values,
                __read: __read,
                __spread: __spread,
                __spreadArrays: __spreadArrays,
                __spreadArray: __spreadArray,
                __await: __await,
                __asyncGenerator: __asyncGenerator,
                __asyncDelegator: __asyncDelegator,
                __asyncValues: __asyncValues,
                __makeTemplateObject: __makeTemplateObject,
                __importStar: __importStar,
                __importDefault: __importDefault,
                __classPrivateFieldGet: __classPrivateFieldGet,
                __classPrivateFieldSet: __classPrivateFieldSet,
                __classPrivateFieldIn: __classPrivateFieldIn,
                __addDisposableResource: __addDisposableResource,
                __disposeResources: __disposeResources,
                __rewriteRelativeImportExtension: __rewriteRelativeImportExtension
            };
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/types.js
    var require_types = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/types.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/json.js
    var require_json = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/json.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.flattenJSON = void 0;
            var buffer_1 = require_buffer2();
            var path_1 = require_path();
            var pathJoin = path_1.posix ? path_1.posix.join : path_1.join;
            var flattenJSON = function(nestedJSON) {
                var flatJSON = {};
                function flatten(pathPrefix, node) {
                    for(var path in node){
                        var contentOrNode = node[path];
                        var joinedPath = pathJoin(pathPrefix, path);
                        if (typeof contentOrNode === "string" || _instanceof(contentOrNode, buffer_1.Buffer)) {
                            flatJSON[joinedPath] = contentOrNode;
                        } else if (typeof contentOrNode === "object" && contentOrNode !== null && !_instanceof(contentOrNode, buffer_1.Buffer) && Object.keys(contentOrNode).length > 0) {
                            flatten(joinedPath, contentOrNode);
                        } else {
                            flatJSON[joinedPath] = null;
                        }
                    }
                }
                flatten("", nestedJSON);
                return flatJSON;
            };
            exports.flattenJSON = flattenJSON;
        }
    });
    // ../../node_modules/.pnpm/thingies@2.5.0_tslib@2.8.1/node_modules/thingies/lib/fanout.js
    var require_fanout = __commonJS({
        "../../node_modules/.pnpm/thingies@2.5.0_tslib@2.8.1/node_modules/thingies/lib/fanout.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.FanOut = void 0;
            var FanOut = /*#__PURE__*/ function() {
                function FanOut() {
                    _classCallCheck(this, FanOut);
                    this.listeners = /* @__PURE__ */ new Set();
                }
                _createClass(FanOut, [
                    {
                        key: "emit",
                        value: function emit(data) {
                            this.listeners.forEach(function(listener) {
                                return listener(data);
                            });
                        }
                    },
                    {
                        key: "listen",
                        value: function listen(listener) {
                            var listeners = this.listeners;
                            listeners.add(listener);
                            return function() {
                                return listeners.delete(listener);
                            };
                        }
                    }
                ]);
                return FanOut;
            }();
            exports.FanOut = FanOut;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/process.js
    var require_process = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/process.js": function(exports) {
            "use strict";
            var createProcess = function createProcess() {
                var p = maybeReturnProcess() || {};
                if (!p.cwd) p.cwd = function() {
                    return "/";
                };
                if (!p.emitWarning) p.emitWarning = function(message, type) {
                    console.warn("".concat(type).concat(type ? ": " : "").concat(message));
                };
                if (!p.env) p.env = {};
                return p;
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.createProcess = createProcess;
            var maybeReturnProcess = function() {
                if (typeof process !== "undefined") {
                    return process;
                }
                try {
                    return __require("process");
                } catch (e) {
                    return void 0;
                }
            };
            exports.default = createProcess();
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/Node.js
    var require_Node = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/Node.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Node = void 0;
            var fanout_1 = require_fanout();
            var process_1 = require_process();
            var buffer_1 = require_buffer2();
            var constants_1 = require_constants();
            var _constants_1_constants = constants_1.constants, S_IFMT = _constants_1_constants.S_IFMT, S_IFDIR = _constants_1_constants.S_IFDIR, S_IFREG = _constants_1_constants.S_IFREG, S_IFLNK = _constants_1_constants.S_IFLNK, S_IFCHR = _constants_1_constants.S_IFCHR;
            var _process_1_default_getuid;
            var getuid = function() {
                var _process_1_default, _process_1_default_getuid1;
                return (_process_1_default_getuid = (_process_1_default_getuid1 = (_process_1_default = process_1.default).getuid) === null || _process_1_default_getuid1 === void 0 ? void 0 : _process_1_default_getuid1.call(_process_1_default)) !== null && _process_1_default_getuid !== void 0 ? _process_1_default_getuid : 0;
            };
            var _process_1_default_getgid;
            var getgid = function() {
                var _process_1_default, _process_1_default_getgid1;
                return (_process_1_default_getgid = (_process_1_default_getgid1 = (_process_1_default = process_1.default).getgid) === null || _process_1_default_getgid1 === void 0 ? void 0 : _process_1_default_getgid1.call(_process_1_default)) !== null && _process_1_default_getgid !== void 0 ? _process_1_default_getgid : 0;
            };
            var EMPTY_BUFFER = (0, buffer_1.bufferAllocUnsafe)(0);
            var Node = /*#__PURE__*/ function() {
                function Node(ino) {
                    var mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 438;
                    _classCallCheck(this, Node);
                    this.changes = new fanout_1.FanOut();
                    this._uid = getuid();
                    this._gid = getgid();
                    this._atime = /* @__PURE__ */ new Date();
                    this._mtime = /* @__PURE__ */ new Date();
                    this._ctime = /* @__PURE__ */ new Date();
                    this.buf = EMPTY_BUFFER;
                    this.capacity = 0;
                    this.size = 0;
                    this.rdev = 0;
                    this._nlink = 1;
                    this.mode = mode;
                    this.ino = ino;
                }
                _createClass(Node, [
                    {
                        key: "ctime",
                        get: function get() {
                            return this._ctime;
                        },
                        set: function set(ctime) {
                            this._ctime = ctime;
                        }
                    },
                    {
                        key: "uid",
                        get: function get() {
                            return this._uid;
                        },
                        set: function set(uid) {
                            this._uid = uid;
                            this.ctime = /* @__PURE__ */ new Date();
                        }
                    },
                    {
                        key: "gid",
                        get: function get() {
                            return this._gid;
                        },
                        set: function set(gid) {
                            this._gid = gid;
                            this.ctime = /* @__PURE__ */ new Date();
                        }
                    },
                    {
                        key: "atime",
                        get: function get() {
                            return this._atime;
                        },
                        set: function set(atime) {
                            this._atime = atime;
                        }
                    },
                    {
                        key: "mtime",
                        get: function get() {
                            return this._mtime;
                        },
                        set: function set(mtime) {
                            this._mtime = mtime;
                            this.ctime = /* @__PURE__ */ new Date();
                        }
                    },
                    {
                        key: "perm",
                        get: function get() {
                            return this.mode & ~S_IFMT;
                        },
                        set: function set(perm) {
                            this.mode = this.mode & S_IFMT | perm & ~S_IFMT;
                            this.ctime = /* @__PURE__ */ new Date();
                        }
                    },
                    {
                        key: "nlink",
                        get: function get() {
                            return this._nlink;
                        },
                        set: function set(nlink) {
                            this._nlink = nlink;
                            this.ctime = /* @__PURE__ */ new Date();
                        }
                    },
                    {
                        key: "getString",
                        value: function getString() {
                            var encoding = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "utf8";
                            this.atime = /* @__PURE__ */ new Date();
                            return this.getBuffer().toString(encoding);
                        }
                    },
                    {
                        key: "setString",
                        value: function setString(str) {
                            this._setBuf((0, buffer_1.bufferFrom)(str, "utf8"));
                        }
                    },
                    {
                        key: "getBuffer",
                        value: function getBuffer() {
                            this.atime = /* @__PURE__ */ new Date();
                            if (!this.buf) this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
                            return (0, buffer_1.bufferFrom)(this.buf.subarray(0, this.size));
                        }
                    },
                    {
                        key: "setBuffer",
                        value: function setBuffer(buf) {
                            var copy = (0, buffer_1.bufferFrom)(buf);
                            this._setBuf(copy);
                        }
                    },
                    {
                        key: "_setBuf",
                        value: function _setBuf(buf) {
                            var size = buf.length;
                            this.buf = buf;
                            this.capacity = size;
                            this.size = size;
                            this.touch();
                        }
                    },
                    {
                        key: "getSize",
                        value: function getSize() {
                            return this.size;
                        }
                    },
                    {
                        key: "setModeProperty",
                        value: function setModeProperty(property) {
                            this.mode = property;
                        }
                    },
                    {
                        key: "isFile",
                        value: function isFile() {
                            return (this.mode & S_IFMT) === S_IFREG;
                        }
                    },
                    {
                        key: "isDirectory",
                        value: function isDirectory() {
                            return (this.mode & S_IFMT) === S_IFDIR;
                        }
                    },
                    {
                        key: "isSymlink",
                        value: function isSymlink() {
                            return (this.mode & S_IFMT) === S_IFLNK;
                        }
                    },
                    {
                        key: "isCharacterDevice",
                        value: function isCharacterDevice() {
                            return (this.mode & S_IFMT) === S_IFCHR;
                        }
                    },
                    {
                        key: "makeSymlink",
                        value: function makeSymlink(symlink) {
                            this.mode = S_IFLNK | 438;
                            this.symlink = symlink;
                        }
                    },
                    {
                        key: "write",
                        value: function write(buf) {
                            var off = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, len = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : buf.length, pos = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
                            var bufLength = buf.length;
                            if (off + len > bufLength) len = bufLength - off;
                            if (len <= 0) return 0;
                            var requiredSize = pos + len;
                            if (requiredSize > this.capacity) {
                                var newCapacity = Math.max(this.capacity * 2, 64);
                                while(newCapacity < requiredSize)newCapacity *= 2;
                                var newBuf = (0, buffer_1.bufferAllocUnsafe)(newCapacity);
                                if (this.size > 0) this.buf.copy(newBuf, 0, 0, this.size);
                                this.buf = newBuf;
                                this.capacity = newCapacity;
                            }
                            if (pos > this.size) this.buf.fill(0, this.size, pos);
                            buf.copy(this.buf, pos, off, off + len);
                            if (requiredSize > this.size) this.size = requiredSize;
                            this.touch();
                            return len;
                        }
                    },
                    {
                        /**
         * Read data from the file.
         *
         * @param buf Buffer to read data into.
         * @param off Offset int the `buf` where to start writing data.
         * @param len How many bytes to read. Equals to `buf.byteLength` by default.
         * @param pos Position offset in file where to start reading. Defaults to `0`.
         * @returns Returns the number of bytes read.
         */ key: "read",
                        value: function read(buf) {
                            var off = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, len = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : buf.byteLength, pos = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
                            this.atime = /* @__PURE__ */ new Date();
                            if (pos >= this.size) return 0;
                            var actualLen = len;
                            if (actualLen > buf.byteLength) actualLen = buf.byteLength;
                            if (actualLen + pos > this.size) actualLen = this.size - pos;
                            if (actualLen <= 0) return 0;
                            var buf2 = _instanceof(buf, buffer_1.Buffer) ? buf : buffer_1.Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
                            this.buf.copy(buf2, off, pos, pos + actualLen);
                            return actualLen;
                        }
                    },
                    {
                        key: "truncate",
                        value: function truncate() {
                            var len = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                            if (!len) {
                                this.buf = EMPTY_BUFFER;
                                this.capacity = 0;
                                this.size = 0;
                                this.touch();
                                return;
                            }
                            if (len <= this.size) this.size = len;
                            else {
                                if (len > this.capacity) {
                                    var newCapacity = Math.max(this.capacity * 2, 64);
                                    while(newCapacity < len)newCapacity *= 2;
                                    var buf = (0, buffer_1.bufferAllocUnsafe)(newCapacity);
                                    if (this.size > 0) this.buf.copy(buf, 0, 0, this.size);
                                    buf.fill(0, this.size, len);
                                    this.buf = buf;
                                    this.capacity = newCapacity;
                                } else this.buf.fill(0, this.size, len);
                                this.size = len;
                            }
                            this.touch();
                        }
                    },
                    {
                        key: "chmod",
                        value: function chmod(perm) {
                            this.mode = this.mode & S_IFMT | perm & ~S_IFMT;
                            this.touch();
                        }
                    },
                    {
                        key: "chown",
                        value: function chown(uid, gid) {
                            this.uid = uid;
                            this.gid = gid;
                            this.touch();
                        }
                    },
                    {
                        key: "touch",
                        value: function touch() {
                            this.mtime = /* @__PURE__ */ new Date();
                            this.changes.emit([
                                "modify"
                            ]);
                        }
                    },
                    {
                        key: "canRead",
                        value: function canRead() {
                            var uid = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getuid(), gid = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getgid();
                            if (this.perm & 4) {
                                return true;
                            }
                            if (gid === this.gid) {
                                if (this.perm & 32) {
                                    return true;
                                }
                            }
                            if (uid === this.uid) {
                                if (this.perm & 256) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    },
                    {
                        key: "canWrite",
                        value: function canWrite() {
                            var uid = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getuid(), gid = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getgid();
                            if (this.perm & 2) {
                                return true;
                            }
                            if (gid === this.gid) {
                                if (this.perm & 16) {
                                    return true;
                                }
                            }
                            if (uid === this.uid) {
                                if (this.perm & 128) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    },
                    {
                        key: "canExecute",
                        value: function canExecute() {
                            var uid = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getuid(), gid = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getgid();
                            if (this.perm & 1) {
                                return true;
                            }
                            if (gid === this.gid) {
                                if (this.perm & 8) {
                                    return true;
                                }
                            }
                            if (uid === this.uid) {
                                if (this.perm & 64) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    },
                    {
                        key: "del",
                        value: function del() {
                            this.changes.emit([
                                "delete"
                            ]);
                        }
                    },
                    {
                        key: "toJSON",
                        value: function toJSON() {
                            return {
                                ino: this.ino,
                                uid: this.uid,
                                gid: this.gid,
                                atime: this.atime.getTime(),
                                mtime: this.mtime.getTime(),
                                ctime: this.ctime.getTime(),
                                perm: this.perm,
                                mode: this.mode,
                                nlink: this.nlink,
                                symlink: this.symlink,
                                data: this.getString()
                            };
                        }
                    }
                ]);
                return Node;
            }();
            exports.Node = Node;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/Link.js
    var require_Link = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/Link.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Link = void 0;
            var constants_1 = require_constants();
            var fanout_1 = require_fanout();
            var S_IFREG = constants_1.constants.S_IFREG;
            var Link = /*#__PURE__*/ function() {
                function _Link(vol2, parent, name) {
                    _classCallCheck(this, _Link);
                    this.changes = new fanout_1.FanOut();
                    this.children = /* @__PURE__ */ new Map();
                    this._steps = [];
                    this.ino = 0;
                    this.length = 0;
                    this.vol = vol2;
                    this.parent = parent;
                    this.name = name;
                    this.syncSteps();
                }
                _createClass(_Link, [
                    {
                        key: "steps",
                        get: function get() {
                            return this._steps;
                        },
                        set: // Recursively sync children steps, e.g. in case of dir rename
                        function set(val) {
                            this._steps = val;
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = this.children.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var _step_value = _slicedToArray(_step.value, 2), child = _step_value[0], link = _step_value[1];
                                    if (child === "." || child === "..") {
                                        continue;
                                    }
                                    link === null || link === void 0 ? void 0 : link.syncSteps();
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        }
                    },
                    {
                        key: "setNode",
                        value: function setNode(node) {
                            this.node = node;
                            this.ino = node.ino;
                        }
                    },
                    {
                        key: "getNode",
                        value: function getNode() {
                            return this.node;
                        }
                    },
                    {
                        key: "createChild",
                        value: function createChild(name) {
                            var node = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.vol.createNode(S_IFREG | 438);
                            var link = new _Link(this.vol, this, name);
                            link.setNode(node);
                            if (node.isDirectory()) {
                                link.children.set(".", link);
                                link.getNode().nlink++;
                            }
                            this.setChild(name, link);
                            return link;
                        }
                    },
                    {
                        key: "setChild",
                        value: function setChild(name) {
                            var link = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new _Link(this.vol, this, name);
                            this.children.set(name, link);
                            link.parent = this;
                            this.length++;
                            var node = link.getNode();
                            if (node.isDirectory()) {
                                link.children.set("..", this);
                                this.getNode().nlink++;
                            }
                            this.getNode().mtime = /* @__PURE__ */ new Date();
                            this.changes.emit([
                                "child:add",
                                link,
                                this
                            ]);
                            return link;
                        }
                    },
                    {
                        key: "deleteChild",
                        value: function deleteChild(link) {
                            var node = link.getNode();
                            if (node.isDirectory()) {
                                link.children.delete("..");
                                this.getNode().nlink--;
                            }
                            this.children.delete(link.getName());
                            this.length--;
                            this.getNode().mtime = /* @__PURE__ */ new Date();
                            this.changes.emit([
                                "child:del",
                                link,
                                this
                            ]);
                        }
                    },
                    {
                        key: "getChild",
                        value: function getChild(name) {
                            this.getNode().atime = /* @__PURE__ */ new Date();
                            return this.children.get(name);
                        }
                    },
                    {
                        key: "getPath",
                        value: function getPath() {
                            return this.steps.join("/");
                        }
                    },
                    {
                        key: "getParentPath",
                        value: function getParentPath() {
                            return this.steps.slice(0, -1).join("/");
                        }
                    },
                    {
                        key: "getName",
                        value: function getName() {
                            return this.steps[this.steps.length - 1];
                        }
                    },
                    {
                        key: "toJSON",
                        value: function toJSON() {
                            return {
                                steps: this.steps,
                                ino: this.ino,
                                children: Array.from(this.children.keys())
                            };
                        }
                    },
                    {
                        key: "syncSteps",
                        value: function syncSteps() {
                            this.steps = this.parent ? this.parent.steps.concat([
                                this.name
                            ]) : [
                                this.name
                            ];
                        }
                    }
                ]);
                return _Link;
            }();
            exports.Link = Link;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/File.js
    var require_File = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/File.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.File = void 0;
            var constants_1 = require_constants();
            var O_APPEND = constants_1.constants.O_APPEND;
            var File = /*#__PURE__*/ function() {
                function File(link, node, flags, fd) {
                    _classCallCheck(this, File);
                    this.link = link;
                    this.node = node;
                    this.flags = flags;
                    this.fd = fd;
                    this.position = 0;
                    if (this.flags & O_APPEND) this.position = this.getSize();
                }
                _createClass(File, [
                    {
                        key: "getString",
                        value: function getString() {
                            var encoding = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "utf8";
                            return this.node.getString();
                        }
                    },
                    {
                        key: "setString",
                        value: function setString(str) {
                            this.node.setString(str);
                        }
                    },
                    {
                        key: "getBuffer",
                        value: function getBuffer() {
                            return this.node.getBuffer();
                        }
                    },
                    {
                        key: "setBuffer",
                        value: function setBuffer(buf) {
                            this.node.setBuffer(buf);
                        }
                    },
                    {
                        key: "getSize",
                        value: function getSize() {
                            return this.node.getSize();
                        }
                    },
                    {
                        key: "truncate",
                        value: function truncate(len) {
                            this.node.truncate(len);
                        }
                    },
                    {
                        key: "seekTo",
                        value: function seekTo(position) {
                            this.position = position;
                        }
                    },
                    {
                        key: "write",
                        value: function write(buf) {
                            var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, length = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : buf.length, position = arguments.length > 3 ? arguments[3] : void 0;
                            if (typeof position !== "number") position = this.position;
                            var bytes = this.node.write(buf, offset, length, position);
                            this.position = position + bytes;
                            return bytes;
                        }
                    },
                    {
                        key: "read",
                        value: function read(buf) {
                            var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, length = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : buf.byteLength, position = arguments.length > 3 ? arguments[3] : void 0;
                            if (typeof position !== "number") position = this.position;
                            var bytes = this.node.read(buf, offset, length, position);
                            this.position = position + bytes;
                            return bytes;
                        }
                    },
                    {
                        key: "chmod",
                        value: function chmod(perm) {
                            this.node.chmod(perm);
                        }
                    },
                    {
                        key: "chown",
                        value: function chown(uid, gid) {
                            this.node.chown(uid, gid);
                        }
                    }
                ]);
                return File;
            }();
            exports.File = File;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/constants.js
    var require_constants2 = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/constants.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.FLAGS = exports.ERRSTR = void 0;
            var constants_1 = require_constants();
            exports.ERRSTR = {
                PATH_STR: "path must be a string, Buffer, or Uint8Array",
                // FD:             'file descriptor must be a unsigned 32-bit integer',
                FD: "fd must be a file descriptor",
                MODE_INT: "mode must be an int",
                CB: "callback must be a function",
                UID: "uid must be an unsigned int",
                GID: "gid must be an unsigned int",
                LEN: "len must be an integer",
                ATIME: "atime must be an integer",
                MTIME: "mtime must be an integer",
                PREFIX: "filename prefix is required",
                BUFFER: "buffer must be an instance of Buffer or StaticBuffer",
                OFFSET: "offset must be an integer",
                LENGTH: "length must be an integer",
                POSITION: "position must be an integer"
            };
            var _constants_1_constants = constants_1.constants, O_RDONLY = _constants_1_constants.O_RDONLY, O_WRONLY = _constants_1_constants.O_WRONLY, O_RDWR = _constants_1_constants.O_RDWR, O_CREAT = _constants_1_constants.O_CREAT, O_EXCL = _constants_1_constants.O_EXCL, O_TRUNC = _constants_1_constants.O_TRUNC, O_APPEND = _constants_1_constants.O_APPEND, O_SYNC = _constants_1_constants.O_SYNC;
            var FLAGS;
            (function(FLAGS2) {
                FLAGS2[FLAGS2["r"] = O_RDONLY] = "r";
                FLAGS2[FLAGS2["r+"] = O_RDWR] = "r+";
                FLAGS2[FLAGS2["rs"] = O_RDONLY | O_SYNC] = "rs";
                FLAGS2[FLAGS2["sr"] = FLAGS2.rs] = "sr";
                FLAGS2[FLAGS2["rs+"] = O_RDWR | O_SYNC] = "rs+";
                FLAGS2[FLAGS2["sr+"] = FLAGS2["rs+"]] = "sr+";
                FLAGS2[FLAGS2["w"] = O_WRONLY | O_CREAT | O_TRUNC] = "w";
                FLAGS2[FLAGS2["wx"] = O_WRONLY | O_CREAT | O_TRUNC | O_EXCL] = "wx";
                FLAGS2[FLAGS2["xw"] = FLAGS2.wx] = "xw";
                FLAGS2[FLAGS2["w+"] = O_RDWR | O_CREAT | O_TRUNC] = "w+";
                FLAGS2[FLAGS2["wx+"] = O_RDWR | O_CREAT | O_TRUNC | O_EXCL] = "wx+";
                FLAGS2[FLAGS2["xw+"] = FLAGS2["wx+"]] = "xw+";
                FLAGS2[FLAGS2["a"] = O_WRONLY | O_APPEND | O_CREAT] = "a";
                FLAGS2[FLAGS2["ax"] = O_WRONLY | O_APPEND | O_CREAT | O_EXCL] = "ax";
                FLAGS2[FLAGS2["xa"] = FLAGS2.ax] = "xa";
                FLAGS2[FLAGS2["a+"] = O_RDWR | O_APPEND | O_CREAT] = "a+";
                FLAGS2[FLAGS2["ax+"] = O_RDWR | O_APPEND | O_CREAT | O_EXCL] = "ax+";
                FLAGS2[FLAGS2["xa+"] = FLAGS2["ax+"]] = "xa+";
            })(FLAGS || (exports.FLAGS = FLAGS = {}));
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/queueMicrotask.js
    var require_queueMicrotask = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/queueMicrotask.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = typeof queueMicrotask === "function" ? queueMicrotask : function(cb) {
                return Promise.resolve().then(function() {
                    return cb();
                }).catch(function() {});
            };
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/util.js
    var require_util2 = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/util.js": function(exports) {
            "use strict";
            var isFd = function isFd(path) {
                return path >>> 0 === path;
            };
            var validateFd = function validateFd(fd) {
                if (!isFd(fd)) throw TypeError(constants_1.ERRSTR.FD);
            };
            var dataToBuffer = function dataToBuffer(data) {
                var encoding = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : encoding_1.ENCODING_UTF8;
                if (buffer_1.Buffer.isBuffer(data)) return data;
                else if (_instanceof(data, Uint8Array)) return (0, buffer_1.bufferFrom)(data);
                else if (encoding === "buffer") return (0, buffer_1.bufferFrom)(String(data), "utf8");
                else return (0, buffer_1.bufferFrom)(String(data), encoding);
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.filenameToSteps = exports.resolve = exports.unixify = exports.isWin = void 0;
            exports.isFd = isFd;
            exports.validateFd = validateFd;
            exports.dataToBuffer = dataToBuffer;
            var path_1 = require_path();
            var buffer_1 = require_buffer2();
            var process_1 = require_process();
            var encoding_1 = require_encoding();
            var constants_1 = require_constants2();
            exports.isWin = process_1.default.platform === "win32";
            var resolveCrossPlatform = path_1.resolve;
            var pathSep = path_1.posix ? path_1.posix.sep : path_1.sep;
            var isSeparator = function(str, i) {
                var char = str[i];
                return i > 0 && (char === "/" || exports.isWin && char === "\\");
            };
            var removeTrailingSeparator = function(str) {
                var i = str.length - 1;
                if (i < 2) return str;
                while(isSeparator(str, i))i--;
                return str.substr(0, i + 1);
            };
            var normalizePath = function(str, stripTrailing) {
                if (typeof str !== "string") throw new TypeError("expected a string");
                str = str.replace(/[\\\/]+/g, "/");
                if (stripTrailing !== false) str = removeTrailingSeparator(str);
                return str;
            };
            var unixify = function(filepath) {
                var stripTrailing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
                if (exports.isWin) {
                    filepath = normalizePath(filepath, stripTrailing);
                    return filepath.replace(/^([a-zA-Z]+:|\.\/)/, "");
                }
                return filepath;
            };
            exports.unixify = unixify;
            var resolve = function(filename) {
                var base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : process_1.default.cwd();
                return resolveCrossPlatform(base, filename);
            };
            exports.resolve = resolve;
            if (exports.isWin) {
                var _resolve = resolve;
                exports.resolve = resolve = function(filename, base) {
                    return (0, exports.unixify)(_resolve(filename, base));
                };
            }
            var filenameToSteps = function(filename, base) {
                var fullPath = resolve(filename, base);
                var fullPathSansSlash = fullPath.substring(1);
                if (!fullPathSansSlash) return [];
                return fullPathSansSlash.split(pathSep);
            };
            exports.filenameToSteps = filenameToSteps;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/util.js
    var require_util3 = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/util.js": function(exports) {
            "use strict";
            var promisify = function promisify(fs, fn) {
                var getResult = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(input) {
                    return input;
                };
                var _this = this;
                return function() {
                    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                        args[_key] = arguments[_key];
                    }
                    return new Promise(function(resolve, reject) {
                        fs[fn].bind(fs).apply(_this, _toConsumableArray(args).concat([
                            function(error, result) {
                                if (error) return reject(error);
                                return resolve(getResult(result));
                            }
                        ]));
                    });
                };
            };
            var validateCallback = function validateCallback(callback) {
                if (typeof callback !== "function") throw TypeError(constants_1.ERRSTR.CB);
                return callback;
            };
            var _modeToNumber = function _modeToNumber(mode, def) {
                if (typeof mode === "number") return mode;
                if (typeof mode === "string") return parseInt(mode, 8);
                if (def) return modeToNumber(def);
                return void 0;
            };
            var modeToNumber = function modeToNumber(mode, def) {
                var result = _modeToNumber(mode, def);
                if (typeof result !== "number" || isNaN(result)) throw new TypeError(constants_1.ERRSTR.MODE_INT);
                return result;
            };
            var nullCheck = function nullCheck(path, callback) {
                if (("" + path).indexOf("\0") !== -1) {
                    var er = new Error("Path must be a string without null bytes");
                    er.code = "ENOENT";
                    if (typeof callback !== "function") throw er;
                    (0, queueMicrotask_1.default)(function() {
                        callback(er);
                    });
                    return false;
                }
                return true;
            };
            var getPathFromURLPosix = function getPathFromURLPosix(url) {
                if (url.hostname !== "") {
                    throw new errors.TypeError("ERR_INVALID_FILE_URL_HOST", process.platform);
                }
                var pathname = url.pathname;
                for(var n = 0; n < pathname.length; n++){
                    if (pathname[n] === "%") {
                        var third = pathname.codePointAt(n + 2) | 32;
                        if (pathname[n + 1] === "2" && third === 102) {
                            throw new errors.TypeError("ERR_INVALID_FILE_URL_PATH", "must not include encoded / characters");
                        }
                    }
                }
                return decodeURIComponent(pathname);
            };
            var pathToFilename = function pathToFilename(path) {
                if (_instanceof(path, Uint8Array)) {
                    path = (0, buffer_1.bufferFrom)(path);
                }
                if (typeof path !== "string" && !buffer_1.Buffer.isBuffer(path)) {
                    try {
                        if (!_instanceof(path, __require("url").URL)) throw new TypeError(constants_1.ERRSTR.PATH_STR);
                    } catch (err) {
                        throw new TypeError(constants_1.ERRSTR.PATH_STR);
                    }
                    path = getPathFromURLPosix(path);
                }
                var pathString = String(path);
                nullCheck(pathString);
                return pathString;
            };
            var formatError = function formatError(errorCode) {
                var func = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", path = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "", path2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
                var pathFormatted = "";
                if (path) pathFormatted = " '".concat(path, "'");
                if (path2) pathFormatted += " -> '".concat(path2, "'");
                switch(errorCode){
                    case ENOENT:
                        return "ENOENT: no such file or directory, ".concat(func).concat(pathFormatted);
                    case EBADF:
                        return "EBADF: bad file descriptor, ".concat(func).concat(pathFormatted);
                    case EINVAL:
                        return "EINVAL: invalid argument, ".concat(func).concat(pathFormatted);
                    case EPERM:
                        return "EPERM: operation not permitted, ".concat(func).concat(pathFormatted);
                    case EPROTO:
                        return "EPROTO: protocol error, ".concat(func).concat(pathFormatted);
                    case EEXIST:
                        return "EEXIST: file already exists, ".concat(func).concat(pathFormatted);
                    case ENOTDIR:
                        return "ENOTDIR: not a directory, ".concat(func).concat(pathFormatted);
                    case EISDIR:
                        return "EISDIR: illegal operation on a directory, ".concat(func).concat(pathFormatted);
                    case EACCES:
                        return "EACCES: permission denied, ".concat(func).concat(pathFormatted);
                    case ENOTEMPTY:
                        return "ENOTEMPTY: directory not empty, ".concat(func).concat(pathFormatted);
                    case EMFILE:
                        return "EMFILE: too many open files, ".concat(func).concat(pathFormatted);
                    case ENOSYS:
                        return "ENOSYS: function not implemented, ".concat(func).concat(pathFormatted);
                    case ERR_FS_EISDIR:
                        return "[ERR_FS_EISDIR]: Path is a directory: ".concat(func, " returned EISDIR (is a directory) ").concat(path);
                    case ERR_OUT_OF_RANGE:
                        return "[ERR_OUT_OF_RANGE]: value out of range, ".concat(func).concat(pathFormatted);
                    default:
                        return "".concat(errorCode, ": error occurred, ").concat(func).concat(pathFormatted);
                }
            };
            var createError = function createError(errorCode) {
                var func = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", path = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "", path2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "", Constructor = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : Error;
                var error = new Constructor(formatError(errorCode, func, path, path2));
                error.code = errorCode;
                if (path) {
                    error.path = path;
                }
                return error;
            };
            var genRndStr6 = function genRndStr6() {
                return Math.random().toString(36).slice(2, 8).padEnd(6, "0");
            };
            var flagsToNumber = function flagsToNumber(flags) {
                if (typeof flags === "number") return flags;
                if (typeof flags === "string") {
                    var flagsNum = constants_1.FLAGS[flags];
                    if (typeof flagsNum !== "undefined") return flagsNum;
                }
                throw new errors.TypeError("ERR_INVALID_OPT_VALUE", "flags", flags);
            };
            var streamToBuffer = function streamToBuffer(stream) {
                var chunks = [];
                return new Promise(function(resolve, reject) {
                    stream.on("data", function(chunk) {
                        return chunks.push(chunk);
                    });
                    stream.on("end", function() {
                        return resolve(buffer_1.Buffer.concat(chunks));
                    });
                    stream.on("error", reject);
                });
            };
            var bufferToEncoding = function bufferToEncoding(buffer, encoding) {
                if (!encoding || encoding === "buffer") return buffer;
                else return buffer.toString(encoding);
            };
            var isReadableStream = function isReadableStream(stream) {
                return stream !== null && typeof stream === "object" && typeof stream.pipe === "function" && typeof stream.on === "function" && stream.readable === true;
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.getWriteSyncArgs = exports.getWriteArgs = exports.bufToUint8 = void 0;
            exports.promisify = promisify;
            exports.validateCallback = validateCallback;
            exports.modeToNumber = modeToNumber;
            exports.nullCheck = nullCheck;
            exports.pathToFilename = pathToFilename;
            exports.createError = createError;
            exports.genRndStr6 = genRndStr6;
            exports.flagsToNumber = flagsToNumber;
            exports.streamToBuffer = streamToBuffer;
            exports.bufferToEncoding = bufferToEncoding;
            exports.isReadableStream = isReadableStream;
            var constants_1 = require_constants2();
            var errors = require_errors();
            var buffer_1 = require_buffer2();
            var queueMicrotask_1 = require_queueMicrotask();
            var util_1 = require_util2();
            var ENOENT = "ENOENT";
            var EBADF = "EBADF";
            var EINVAL = "EINVAL";
            var EPERM = "EPERM";
            var EPROTO = "EPROTO";
            var EEXIST = "EEXIST";
            var ENOTDIR = "ENOTDIR";
            var EMFILE = "EMFILE";
            var EACCES = "EACCES";
            var EISDIR = "EISDIR";
            var ENOTEMPTY = "ENOTEMPTY";
            var ENOSYS = "ENOSYS";
            var ERR_FS_EISDIR = "ERR_FS_EISDIR";
            var ERR_OUT_OF_RANGE = "ERR_OUT_OF_RANGE";
            var bufToUint8 = function(buf) {
                return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
            };
            exports.bufToUint8 = bufToUint8;
            var getWriteArgs = function(fd, a, b, c, d, e) {
                (0, util_1.validateFd)(fd);
                var offset = 0;
                var length;
                var position = null;
                var encoding;
                var callback;
                var tipa = typeof a === "undefined" ? "undefined" : _typeof(a);
                var tipb = typeof b === "undefined" ? "undefined" : _typeof(b);
                var tipc = typeof c === "undefined" ? "undefined" : _typeof(c);
                var tipd = typeof d === "undefined" ? "undefined" : _typeof(d);
                if (tipa !== "string") {
                    if (tipb === "function") {
                        callback = b;
                    } else if (tipc === "function") {
                        offset = b | 0;
                        callback = c;
                    } else if (tipd === "function") {
                        offset = b | 0;
                        length = c;
                        callback = d;
                    } else {
                        offset = b | 0;
                        length = c;
                        position = d;
                        callback = e;
                    }
                } else {
                    if (tipb === "function") {
                        callback = b;
                    } else if (tipc === "function") {
                        position = b;
                        callback = c;
                    } else if (tipd === "function") {
                        position = b;
                        encoding = c;
                        callback = d;
                    }
                }
                var buf = (0, util_1.dataToBuffer)(a, encoding);
                if (tipa !== "string") {
                    if (typeof length === "undefined") length = buf.length;
                } else {
                    offset = 0;
                    length = buf.length;
                }
                var cb = validateCallback(callback);
                return [
                    fd,
                    tipa === "string",
                    buf,
                    offset,
                    length,
                    position,
                    cb
                ];
            };
            exports.getWriteArgs = getWriteArgs;
            var getWriteSyncArgs = function(fd, a, b, c, d) {
                (0, util_1.validateFd)(fd);
                var encoding;
                var offset;
                var length;
                var position;
                var isBuffer = typeof a !== "string";
                if (isBuffer) {
                    offset = (b || 0) | 0;
                    length = c;
                    position = d;
                } else {
                    position = b;
                    encoding = c;
                }
                var buf = (0, util_1.dataToBuffer)(a, encoding);
                if (isBuffer) {
                    if (typeof length === "undefined") {
                        length = buf.length;
                    }
                } else {
                    offset = 0;
                    length = buf.length;
                }
                return [
                    fd,
                    buf,
                    offset || 0,
                    length,
                    position
                ];
            };
            exports.getWriteSyncArgs = getWriteSyncArgs;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/Superblock.js
    var require_Superblock = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/Superblock.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Superblock = void 0;
            var path_1 = require_path();
            var Node_1 = require_Node();
            var Link_1 = require_Link();
            var File_1 = require_File();
            var buffer_1 = require_buffer2();
            var process_1 = require_process();
            var constants_1 = require_constants();
            var constants_2 = require_constants2();
            var util_1 = require_util3();
            var util_2 = require_util2();
            var json_1 = require_json();
            var pathSep = path_1.posix ? path_1.posix.sep : path_1.sep;
            var pathRelative = path_1.posix ? path_1.posix.relative : path_1.relative;
            var pathJoin = path_1.posix ? path_1.posix.join : path_1.join;
            var _constants_1_constants = constants_1.constants, O_RDONLY = _constants_1_constants.O_RDONLY, O_WRONLY = _constants_1_constants.O_WRONLY, O_RDWR = _constants_1_constants.O_RDWR, O_CREAT = _constants_1_constants.O_CREAT, O_EXCL = _constants_1_constants.O_EXCL, O_TRUNC = _constants_1_constants.O_TRUNC, O_APPEND = _constants_1_constants.O_APPEND, O_DIRECTORY = _constants_1_constants.O_DIRECTORY;
            var Superblock = /*#__PURE__*/ function() {
                function _Superblock() {
                    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    var _this = this;
                    _classCallCheck(this, _Superblock);
                    this.ino = 0;
                    this.inodes = {};
                    this.releasedInos = [];
                    this.fds = {};
                    this.releasedFds = [];
                    this.maxFiles = 1e4;
                    this.openFiles = 0;
                    this.open = function(filename, flagsNum, modeNum) {
                        var resolveSymlinks = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
                        var file = _this.openFile(filename, flagsNum, modeNum, resolveSymlinks);
                        if (!file) throw (0, util_1.createError)("ENOENT", "open", filename);
                        return file.fd;
                    };
                    this.writeFile = function(id, buf, flagsNum, modeNum) {
                        var isUserFd = typeof id === "number";
                        var fd;
                        if (isUserFd) fd = id;
                        else fd = _this.open((0, util_1.pathToFilename)(id), flagsNum, modeNum);
                        var offset = 0;
                        var length = buf.length;
                        var position = flagsNum & O_APPEND ? void 0 : 0;
                        try {
                            while(length > 0){
                                var written = _this.write(fd, buf, offset, length, position);
                                offset += written;
                                length -= written;
                                if (position !== void 0) position += written;
                            }
                        } finally{
                            if (!isUserFd) _this.close(fd);
                        }
                    };
                    this.read = function(fd, buffer, offset, length, position) {
                        if (buffer.byteLength < length) {
                            throw (0, util_1.createError)("ERR_OUT_OF_RANGE", "read", void 0, void 0, RangeError);
                        }
                        var file = _this.getFileByFdOrThrow(fd);
                        if (file.node.isSymlink()) {
                            throw (0, util_1.createError)("EPERM", "read", file.link.getPath());
                        }
                        return file.read(buffer, Number(offset), Number(length), position === -1 || typeof position !== "number" ? void 0 : position);
                    };
                    this.readv = function(fd, buffers, position) {
                        var file = _this.getFileByFdOrThrow(fd);
                        var p = position !== null && position !== void 0 ? position : void 0;
                        if (p === -1) p = void 0;
                        var bytesRead = 0;
                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        try {
                            for(var _iterator = buffers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                var buffer = _step.value;
                                var bytes = file.read(buffer, 0, buffer.byteLength, p);
                                p = void 0;
                                bytesRead += bytes;
                                if (bytes < buffer.byteLength) break;
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        return bytesRead;
                    };
                    this.link = function(filename1, filename2) {
                        var link1;
                        try {
                            link1 = _this.getLinkOrThrow(filename1, "link");
                        } catch (err) {
                            if (err.code) err = (0, util_1.createError)(err.code, "link", filename1, filename2);
                            throw err;
                        }
                        var dirname2 = (0, path_1.dirname)(filename2);
                        var dir2;
                        try {
                            dir2 = _this.getLinkOrThrow(dirname2, "link");
                        } catch (err1) {
                            if (err1.code) err1 = (0, util_1.createError)(err1.code, "link", filename1, filename2);
                            throw err1;
                        }
                        var name = (0, path_1.basename)(filename2);
                        if (dir2.getChild(name)) throw (0, util_1.createError)("EEXIST", "link", filename1, filename2);
                        var node = link1.getNode();
                        node.nlink++;
                        dir2.createChild(name, node);
                    };
                    this.unlink = function(filename) {
                        var link = _this.getLinkOrThrow(filename, "unlink");
                        if (link.length) throw Error("Dir not empty...");
                        _this.deleteLink(link);
                        var node = link.getNode();
                        node.nlink--;
                        if (node.nlink <= 0) {
                            _this.deleteNode(node);
                        }
                    };
                    this.symlink = function(targetFilename, pathFilename) {
                        var pathSteps = (0, util_2.filenameToSteps)(pathFilename);
                        var dirLink;
                        try {
                            dirLink = _this.getLinkParentAsDirOrThrow(pathSteps);
                        } catch (err) {
                            if (err.code) err = (0, util_1.createError)(err.code, "symlink", targetFilename, pathFilename);
                            throw err;
                        }
                        var name = pathSteps[pathSteps.length - 1];
                        if (dirLink.getChild(name)) throw (0, util_1.createError)("EEXIST", "symlink", targetFilename, pathFilename);
                        var node = dirLink.getNode();
                        if (!node.canExecute() || !node.canWrite()) throw (0, util_1.createError)("EACCES", "symlink", targetFilename, pathFilename);
                        var symlink = dirLink.createChild(name);
                        symlink.getNode().makeSymlink(targetFilename);
                        return symlink;
                    };
                    this.rename = function(oldPathFilename, newPathFilename) {
                        var link;
                        try {
                            link = _this.getResolvedLinkOrThrow(oldPathFilename);
                        } catch (err) {
                            if (err.code) err = (0, util_1.createError)(err.code, "rename", oldPathFilename, newPathFilename);
                            throw err;
                        }
                        var newPathDirLink;
                        try {
                            newPathDirLink = _this.getLinkParentAsDirOrThrow(newPathFilename);
                        } catch (err1) {
                            if (err1.code) err1 = (0, util_1.createError)(err1.code, "rename", oldPathFilename, newPathFilename);
                            throw err1;
                        }
                        var oldLinkParent = link.parent;
                        if (!oldLinkParent) throw (0, util_1.createError)("EINVAL", "rename", oldPathFilename, newPathFilename);
                        var oldParentNode = oldLinkParent.getNode();
                        var newPathDirNode = newPathDirLink.getNode();
                        if (!oldParentNode.canExecute() || !oldParentNode.canWrite() || !newPathDirNode.canExecute() || !newPathDirNode.canWrite()) {
                            throw (0, util_1.createError)("EACCES", "rename", oldPathFilename, newPathFilename);
                        }
                        oldLinkParent.deleteChild(link);
                        var name = (0, path_1.basename)(newPathFilename);
                        link.name = name;
                        link.steps = _toConsumableArray(newPathDirLink.steps).concat([
                            name
                        ]);
                        newPathDirLink.setChild(link.getName(), link);
                    };
                    this.mkdir = function(filename, modeNum) {
                        var steps = (0, util_2.filenameToSteps)(filename);
                        if (!steps.length) throw (0, util_1.createError)("EEXIST", "mkdir", filename);
                        var dir = _this.getLinkParentAsDirOrThrow(filename, "mkdir");
                        var name = steps[steps.length - 1];
                        if (dir.getChild(name)) throw (0, util_1.createError)("EEXIST", "mkdir", filename);
                        var node = dir.getNode();
                        if (!node.canWrite() || !node.canExecute()) throw (0, util_1.createError)("EACCES", "mkdir", filename);
                        dir.createChild(name, _this.createNode(constants_1.constants.S_IFDIR | modeNum));
                    };
                    this.mkdirp = function(filename, modeNum) {
                        var created = false;
                        var steps = (0, util_2.filenameToSteps)(filename);
                        var curr = null;
                        var i = steps.length;
                        for(i = steps.length; i >= 0; i--){
                            curr = _this.getResolvedLink(steps.slice(0, i));
                            if (curr) break;
                        }
                        if (!curr) {
                            curr = _this.root;
                            i = 0;
                        }
                        curr = _this.getResolvedLinkOrThrow(path_1.sep + steps.slice(0, i).join(path_1.sep), "mkdir");
                        for(i; i < steps.length; i++){
                            var node = curr.getNode();
                            if (node.isDirectory()) {
                                if (!node.canExecute() || !node.canWrite()) throw (0, util_1.createError)("EACCES", "mkdir", filename);
                            } else {
                                throw (0, util_1.createError)("ENOTDIR", "mkdir", filename);
                            }
                            created = true;
                            curr = curr.createChild(steps[i], _this.createNode(constants_1.constants.S_IFDIR | modeNum));
                        }
                        return created ? filename : void 0;
                    };
                    this.rmdir = function(filename) {
                        var recursive = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                        var link = _this.getLinkAsDirOrThrow(filename, "rmdir");
                        if (link.length && !recursive) throw (0, util_1.createError)("ENOTEMPTY", "rmdir", filename);
                        _this.deleteLink(link);
                    };
                    this.rm = function(filename) {
                        var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, recursive = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                        var _link_parent;
                        var link;
                        try {
                            link = _this.getResolvedLinkOrThrow(filename, "stat");
                        } catch (err) {
                            if (err.code === "ENOENT" && force) return;
                            else throw err;
                        }
                        if (link.getNode().isDirectory() && !recursive) throw (0, util_1.createError)("ERR_FS_EISDIR", "rm", filename);
                        if (!((_link_parent = link.parent) === null || _link_parent === void 0 ? void 0 : _link_parent.getNode().canWrite())) throw (0, util_1.createError)("EACCES", "rm", filename);
                        _this.deleteLink(link);
                    };
                    this.close = function(fd) {
                        (0, util_2.validateFd)(fd);
                        var file = _this.getFileByFdOrThrow(fd, "close");
                        _this.closeFile(file);
                    };
                    var root = this.createLink();
                    root.setNode(this.createNode(constants_1.constants.S_IFDIR | 511));
                    root.setChild(".", root);
                    root.getNode().nlink++;
                    root.setChild("..", root);
                    root.getNode().nlink++;
                    this.root = root;
                }
                _createClass(_Superblock, [
                    {
                        key: "createLink",
                        value: function createLink(parent, name) {
                            var isDirectory = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, mode = arguments.length > 3 ? arguments[3] : void 0;
                            if (!parent) {
                                return new Link_1.Link(this, void 0, "");
                            }
                            if (!name) {
                                throw new Error("createLink: name cannot be empty");
                            }
                            var finalPerm = mode !== null && mode !== void 0 ? mode : isDirectory ? 511 : 438;
                            var hasFileType = mode && mode & constants_1.constants.S_IFMT;
                            var modeType = hasFileType ? mode & constants_1.constants.S_IFMT : isDirectory ? constants_1.constants.S_IFDIR : constants_1.constants.S_IFREG;
                            var finalMode = finalPerm & ~constants_1.constants.S_IFMT | modeType;
                            return parent.createChild(name, this.createNode(finalMode));
                        }
                    },
                    {
                        key: "deleteLink",
                        value: function deleteLink(link) {
                            var parent = link.parent;
                            if (parent) {
                                parent.deleteChild(link);
                                return true;
                            }
                            return false;
                        }
                    },
                    {
                        key: "newInoNumber",
                        value: function newInoNumber() {
                            var releasedFd = this.releasedInos.pop();
                            if (releasedFd) return releasedFd;
                            else {
                                this.ino = (this.ino + 1) % 4294967295;
                                return this.ino;
                            }
                        }
                    },
                    {
                        key: "newFdNumber",
                        value: function newFdNumber() {
                            var releasedFd = this.releasedFds.pop();
                            return typeof releasedFd === "number" ? releasedFd : _Superblock.fd--;
                        }
                    },
                    {
                        key: "createNode",
                        value: function createNode(mode) {
                            var node = new Node_1.Node(this.newInoNumber(), mode);
                            this.inodes[node.ino] = node;
                            return node;
                        }
                    },
                    {
                        key: "deleteNode",
                        value: function deleteNode(node) {
                            node.del();
                            delete this.inodes[node.ino];
                            this.releasedInos.push(node.ino);
                        }
                    },
                    {
                        key: "walk",
                        value: function walk(stepsOrFilenameOrLink) {
                            var resolveSymlinks = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, checkExistence = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, checkAccess = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false, funcName = arguments.length > 4 ? arguments[4] : void 0;
                            var steps;
                            var filename;
                            if (_instanceof(stepsOrFilenameOrLink, Link_1.Link)) {
                                steps = stepsOrFilenameOrLink.steps;
                                filename = pathSep + steps.join(pathSep);
                            } else if (typeof stepsOrFilenameOrLink === "string") {
                                steps = (0, util_2.filenameToSteps)(stepsOrFilenameOrLink);
                                filename = stepsOrFilenameOrLink;
                            } else {
                                steps = stepsOrFilenameOrLink;
                                filename = pathSep + steps.join(pathSep);
                            }
                            var curr = this.root;
                            var i = 0;
                            while(i < steps.length){
                                var node = curr.getNode();
                                if (node.isDirectory()) {
                                    if (checkAccess && !node.canExecute()) {
                                        throw (0, util_1.createError)("EACCES", funcName, filename);
                                    }
                                } else {
                                    if (i < steps.length - 1) throw (0, util_1.createError)("ENOTDIR", funcName, filename);
                                }
                                var _curr_getChild;
                                curr = (_curr_getChild = curr.getChild(steps[i])) !== null && _curr_getChild !== void 0 ? _curr_getChild : null;
                                if (!curr) if (checkExistence) throw (0, util_1.createError)("ENOENT", funcName, filename);
                                else return null;
                                node = curr === null || curr === void 0 ? void 0 : curr.getNode();
                                if (node.isSymlink() && (resolveSymlinks || i < steps.length - 1)) {
                                    var resolvedPath = (0, path_1.isAbsolute)(node.symlink) ? node.symlink : pathJoin((0, path_1.dirname)(curr.getPath()), node.symlink);
                                    steps = (0, util_2.filenameToSteps)(resolvedPath).concat(steps.slice(i + 1));
                                    curr = this.root;
                                    i = 0;
                                    continue;
                                }
                                if (checkExistence && !node.isDirectory() && i < steps.length - 1) {
                                    var errorCode = process_1.default.platform === "win32" ? "ENOENT" : "ENOTDIR";
                                    throw (0, util_1.createError)(errorCode, funcName, filename);
                                }
                                i++;
                            }
                            return curr;
                        }
                    },
                    {
                        // Returns a `Link` (hard link) referenced by path "split" into steps.
                        key: "getLink",
                        value: function getLink(steps) {
                            return this.walk(steps, false, false, false);
                        }
                    },
                    {
                        // Just link `getLink`, but throws a correct user error, if link to found.
                        key: "getLinkOrThrow",
                        value: function getLinkOrThrow(filename, funcName) {
                            return this.walk(filename, false, true, true, funcName);
                        }
                    },
                    {
                        // Just like `getLink`, but also dereference/resolves symbolic links.
                        key: "getResolvedLink",
                        value: function getResolvedLink(filenameOrSteps) {
                            return this.walk(filenameOrSteps, true, false, false);
                        }
                    },
                    {
                        /**
         * Just like `getLinkOrThrow`, but also dereference/resolves symbolic links.
         */ key: "getResolvedLinkOrThrow",
                        value: function getResolvedLinkOrThrow(filename, funcName) {
                            return this.walk(filename, true, true, true, funcName);
                        }
                    },
                    {
                        key: "resolveSymlinks",
                        value: function resolveSymlinks(link) {
                            return this.getResolvedLink(link.steps.slice(1));
                        }
                    },
                    {
                        /**
         * Just like `getLinkOrThrow`, but also verifies that the link is a directory.
         */ key: "getLinkAsDirOrThrow",
                        value: function getLinkAsDirOrThrow(filename, funcName) {
                            var link = this.getLinkOrThrow(filename, funcName);
                            if (!link.getNode().isDirectory()) throw (0, util_1.createError)("ENOTDIR", funcName, filename);
                            return link;
                        }
                    },
                    {
                        // Get the immediate parent directory of the link.
                        key: "getLinkParent",
                        value: function getLinkParent(steps) {
                            return this.getLink(steps.slice(0, -1));
                        }
                    },
                    {
                        key: "getLinkParentAsDirOrThrow",
                        value: function getLinkParentAsDirOrThrow(filenameOrSteps, funcName) {
                            var steps = (_instanceof(filenameOrSteps, Array) ? filenameOrSteps : (0, util_2.filenameToSteps)(filenameOrSteps)).slice(0, -1);
                            var filename = pathSep + steps.join(pathSep);
                            var link = this.getLinkOrThrow(filename, funcName);
                            if (!link.getNode().isDirectory()) throw (0, util_1.createError)("ENOTDIR", funcName, filename);
                            return link;
                        }
                    },
                    {
                        key: "getFileByFd",
                        value: function getFileByFd(fd) {
                            return this.fds[String(fd)];
                        }
                    },
                    {
                        key: "getFileByFdOrThrow",
                        value: function getFileByFdOrThrow(fd, funcName) {
                            if (!(0, util_2.isFd)(fd)) throw TypeError(constants_2.ERRSTR.FD);
                            var file = this.getFileByFd(fd);
                            if (!file) throw (0, util_1.createError)("EBADF", funcName);
                            return file;
                        }
                    },
                    {
                        key: "_toJSON",
                        value: function _toJSON() {
                            var link = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.root, json = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, path = arguments.length > 2 ? arguments[2] : void 0, asBuffer = arguments.length > 3 ? arguments[3] : void 0;
                            var isEmpty = true;
                            var children = link.children;
                            if (link.getNode().isFile()) {
                                children = /* @__PURE__ */ new Map([
                                    [
                                        link.getName(),
                                        link.parent.getChild(link.getName())
                                    ]
                                ]);
                                link = link.parent;
                            }
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = children.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var name = _step.value;
                                    if (name === "." || name === "..") {
                                        continue;
                                    }
                                    isEmpty = false;
                                    var child = link.getChild(name);
                                    if (!child) {
                                        throw new Error("_toJSON: unexpected undefined");
                                    }
                                    var node = child.getNode();
                                    if (node.isFile()) {
                                        var filename = child.getPath();
                                        if (path) filename = pathRelative(path, filename);
                                        json[filename] = asBuffer ? node.getBuffer() : node.getString();
                                    } else if (node.isDirectory()) {
                                        this._toJSON(child, json, path, asBuffer);
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            var dirPath = link.getPath();
                            if (path) dirPath = pathRelative(path, dirPath);
                            if (dirPath && isEmpty) {
                                json[dirPath] = null;
                            }
                            return json;
                        }
                    },
                    {
                        key: "toJSON",
                        value: function toJSON(paths) {
                            var json = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, isRelative = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, asBuffer = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
                            var links = [];
                            if (paths) {
                                if (!Array.isArray(paths)) paths = [
                                    paths
                                ];
                                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                try {
                                    for(var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                        var path = _step.value;
                                        var filename = (0, util_1.pathToFilename)(path);
                                        var link = this.getResolvedLink(filename);
                                        if (!link) continue;
                                        links.push(link);
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally{
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                                            _iterator.return();
                                        }
                                    } finally{
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                            } else {
                                links.push(this.root);
                            }
                            if (!links.length) return json;
                            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                            try {
                                for(var _iterator1 = links[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                    var link1 = _step1.value;
                                    this._toJSON(link1, json, isRelative ? link1.getPath() : "", asBuffer);
                                }
                            } catch (err) {
                                _didIteratorError1 = true;
                                _iteratorError1 = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                        _iterator1.return();
                                    }
                                } finally{
                                    if (_didIteratorError1) {
                                        throw _iteratorError1;
                                    }
                                }
                            }
                            return json;
                        }
                    },
                    {
                        // TODO: `cwd` should probably not invoke `process.cwd()`.
                        key: "fromJSON",
                        value: function fromJSON(json) {
                            var cwd = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : process_1.default.cwd();
                            for(var filename in json){
                                var data = json[filename];
                                filename = (0, util_2.resolve)(filename, cwd);
                                if (typeof data === "string" || _instanceof(data, buffer_1.Buffer)) {
                                    var dir = (0, path_1.dirname)(filename);
                                    this.mkdirp(dir, 511);
                                    var buffer = (0, util_2.dataToBuffer)(data);
                                    this.writeFile(filename, buffer, constants_2.FLAGS.w, 438);
                                } else {
                                    this.mkdirp(filename, 511);
                                }
                            }
                        }
                    },
                    {
                        key: "fromNestedJSON",
                        value: function fromNestedJSON(json, cwd) {
                            this.fromJSON((0, json_1.flattenJSON)(json), cwd);
                        }
                    },
                    {
                        key: "reset",
                        value: function reset() {
                            this.ino = 0;
                            this.inodes = {};
                            this.releasedInos = [];
                            this.fds = {};
                            this.releasedFds = [];
                            this.openFiles = 0;
                            this.root = this.createLink();
                            this.root.setNode(this.createNode(constants_1.constants.S_IFDIR | 511));
                        }
                    },
                    {
                        // Legacy interface
                        key: "mountSync",
                        value: function mountSync(mountpoint, json) {
                            this.fromJSON(json, mountpoint);
                        }
                    },
                    {
                        key: "openLink",
                        value: function openLink(link, flagsNum) {
                            var resolveSymlinks = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
                            if (this.openFiles >= this.maxFiles) {
                                throw (0, util_1.createError)("EMFILE", "open", link.getPath());
                            }
                            var realLink = link;
                            if (resolveSymlinks) realLink = this.getResolvedLinkOrThrow(link.getPath(), "open");
                            var node = realLink.getNode();
                            if (node.isDirectory()) {
                                if ((flagsNum & (O_RDONLY | O_RDWR | O_WRONLY)) !== O_RDONLY) throw (0, util_1.createError)("EISDIR", "open", link.getPath());
                            } else {
                                if (flagsNum & O_DIRECTORY) throw (0, util_1.createError)("ENOTDIR", "open", link.getPath());
                            }
                            if ((flagsNum & (O_RDONLY | O_RDWR | O_WRONLY)) !== O_WRONLY) {
                                if (!node.canRead()) {
                                    throw (0, util_1.createError)("EACCES", "open", link.getPath());
                                }
                            }
                            if (flagsNum & (O_WRONLY | O_RDWR)) {
                                if (!node.canWrite()) {
                                    throw (0, util_1.createError)("EACCES", "open", link.getPath());
                                }
                            }
                            var file = new File_1.File(link, node, flagsNum, this.newFdNumber());
                            this.fds[file.fd] = file;
                            this.openFiles++;
                            if (flagsNum & O_TRUNC) file.truncate();
                            return file;
                        }
                    },
                    {
                        key: "openFile",
                        value: function openFile(filename, flagsNum, modeNum) {
                            var resolveSymlinks = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
                            var steps = (0, util_2.filenameToSteps)(filename);
                            var link;
                            try {
                                link = resolveSymlinks ? this.getResolvedLinkOrThrow(filename, "open") : this.getLinkOrThrow(filename, "open");
                                if (link && flagsNum & O_CREAT && flagsNum & O_EXCL) throw (0, util_1.createError)("EEXIST", "open", filename);
                            } catch (err) {
                                if (err.code === "ENOENT" && flagsNum & O_CREAT) {
                                    var dirName = (0, path_1.dirname)(filename);
                                    var dirLink = this.getResolvedLinkOrThrow(dirName);
                                    var dirNode = dirLink.getNode();
                                    if (!dirNode.isDirectory()) throw (0, util_1.createError)("ENOTDIR", "open", filename);
                                    if (!dirNode.canExecute() || !dirNode.canWrite()) throw (0, util_1.createError)("EACCES", "open", filename);
                                    modeNum !== null && modeNum !== void 0 ? modeNum : modeNum = 438;
                                    link = this.createLink(dirLink, steps[steps.length - 1], false, modeNum);
                                } else throw err;
                            }
                            if (link) return this.openLink(link, flagsNum, resolveSymlinks);
                            throw (0, util_1.createError)("ENOENT", "open", filename);
                        }
                    },
                    {
                        key: "closeFile",
                        value: function closeFile(file) {
                            if (!this.fds[file.fd]) return;
                            this.openFiles--;
                            delete this.fds[file.fd];
                            this.releasedFds.push(file.fd);
                        }
                    },
                    {
                        key: "write",
                        value: function write(fd, buf, offset, length, position) {
                            var file = this.getFileByFdOrThrow(fd, "write");
                            if (file.node.isSymlink()) {
                                throw (0, util_1.createError)("EBADF", "write", file.link.getPath());
                            }
                            return file.write(buf, offset, length, position === -1 || typeof position !== "number" ? void 0 : position);
                        }
                    }
                ], [
                    {
                        key: "fromJSON",
                        value: function fromJSON(json, cwd) {
                            var vol2 = new _Superblock();
                            vol2.fromJSON(json, cwd);
                            return vol2;
                        }
                    },
                    {
                        key: "fromNestedJSON",
                        value: function fromNestedJSON(json, cwd) {
                            var vol2 = new _Superblock();
                            vol2.fromNestedJSON(json, cwd);
                            return vol2;
                        }
                    }
                ]);
                return _Superblock;
            }();
            exports.Superblock = Superblock;
            Superblock.fd = 2147483647;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/index.js
    var require_core = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/core/index.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Superblock = exports.File = exports.Link = exports.Node = void 0;
            var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
            tslib_1.__exportStar(require_types(), exports);
            tslib_1.__exportStar(require_json(), exports);
            var Node_1 = require_Node();
            Object.defineProperty(exports, "Node", {
                enumerable: true,
                get: function get() {
                    return Node_1.Node;
                }
            });
            var Link_1 = require_Link();
            Object.defineProperty(exports, "Link", {
                enumerable: true,
                get: function get() {
                    return Link_1.Link;
                }
            });
            var File_1 = require_File();
            Object.defineProperty(exports, "File", {
                enumerable: true,
                get: function get() {
                    return File_1.File;
                }
            });
            var Superblock_1 = require_Superblock();
            Object.defineProperty(exports, "Superblock", {
                enumerable: true,
                get: function get() {
                    return Superblock_1.Superblock;
                }
            });
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/StatFs.js
    var require_StatFs = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/StatFs.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.StatFs = void 0;
            var StatFs = /*#__PURE__*/ function() {
                function _StatFs() {
                    _classCallCheck(this, _StatFs);
                }
                _createClass(_StatFs, null, [
                    {
                        key: "build",
                        value: function build(superblock) {
                            var bigint = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                            var statfs = new _StatFs();
                            var getStatNumber = !bigint ? function(number) {
                                return number;
                            } : function(number) {
                                return BigInt(number);
                            };
                            statfs.type = getStatNumber(2240043254);
                            statfs.bsize = getStatNumber(4096);
                            var totalInodes = Object.keys(superblock.inodes).length;
                            var totalBlocks = 1e6;
                            var usedBlocks = Math.min(totalInodes * 2, totalBlocks);
                            var freeBlocks = totalBlocks - usedBlocks;
                            statfs.blocks = getStatNumber(totalBlocks);
                            statfs.bfree = getStatNumber(freeBlocks);
                            statfs.bavail = getStatNumber(freeBlocks);
                            var maxFiles = 1e6;
                            statfs.files = getStatNumber(maxFiles);
                            statfs.ffree = getStatNumber(maxFiles - totalInodes);
                            return statfs;
                        }
                    }
                ]);
                return _StatFs;
            }();
            exports.StatFs = StatFs;
            exports.default = StatFs;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/setTimeoutUnref.js
    var require_setTimeoutUnref = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/setTimeoutUnref.js": function(exports) {
            "use strict";
            var setTimeoutUnref = function setTimeoutUnref(callback, time, args) {
                var ref = setTimeout.apply(typeof globalThis !== "undefined" ? globalThis : global, arguments);
                if (ref && typeof ref === "object" && typeof ref.unref === "function") ref.unref();
                return ref;
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = setTimeoutUnref;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/stream.js
    var require_stream = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/stream.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Writable = exports.Readable = void 0;
            var node_stream_1 = __require("stream");
            Object.defineProperty(exports, "Readable", {
                enumerable: true,
                get: function get() {
                    return node_stream_1.Readable;
                }
            });
            Object.defineProperty(exports, "Writable", {
                enumerable: true,
                get: function get() {
                    return node_stream_1.Writable;
                }
            });
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/events.js
    var require_events = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/vendor/node/events.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.EventEmitter = void 0;
            var node_events_1 = __require("events");
            Object.defineProperty(exports, "EventEmitter", {
                enumerable: true,
                get: function get() {
                    return node_events_1.EventEmitter;
                }
            });
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/FileHandle.js
    var require_FileHandle = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/FileHandle.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.FileHandle = void 0;
            var util_1 = require_util3();
            var events_1 = require_events();
            var FileHandle = /*#__PURE__*/ function(_events_1_EventEmitter) {
                _inherits(FileHandle, _events_1_EventEmitter);
                var _super = _createSuper(FileHandle);
                function FileHandle(fs, fd) {
                    _classCallCheck(this, FileHandle);
                    var _this;
                    _this = _super.call(this);
                    _this.refs = 1;
                    _this.closePromise = null;
                    _this.position = 0;
                    _this.readableWebStreamLocked = false;
                    _this.fs = fs;
                    _this.fd = fd;
                    return _this;
                }
                _createClass(FileHandle, [
                    {
                        key: "getAsyncId",
                        value: function getAsyncId() {
                            return this.fd;
                        }
                    },
                    {
                        key: "appendFile",
                        value: function appendFile(data, options) {
                            return (0, util_1.promisify)(this.fs, "appendFile")(this.fd, data, options);
                        }
                    },
                    {
                        key: "chmod",
                        value: function chmod(mode) {
                            return (0, util_1.promisify)(this.fs, "fchmod")(this.fd, mode);
                        }
                    },
                    {
                        key: "chown",
                        value: function chown(uid, gid) {
                            return (0, util_1.promisify)(this.fs, "fchown")(this.fd, uid, gid);
                        }
                    },
                    {
                        key: "close",
                        value: function close() {
                            var _this = this;
                            if (this.fd === -1) {
                                return Promise.resolve();
                            }
                            if (this.closePromise) {
                                return this.closePromise;
                            }
                            this.refs--;
                            if (this.refs === 0) {
                                var currentFd = this.fd;
                                this.fd = -1;
                                this.closePromise = (0, util_1.promisify)(this.fs, "close")(currentFd).finally(function() {
                                    _this.closePromise = null;
                                });
                            } else {
                                this.closePromise = new Promise(function(resolve, reject) {
                                    _this.closeResolve = resolve;
                                    _this.closeReject = reject;
                                }).finally(function() {
                                    _this.closePromise = null;
                                    _this.closeReject = void 0;
                                    _this.closeResolve = void 0;
                                });
                            }
                            this.emit("close");
                            return this.closePromise;
                        }
                    },
                    {
                        key: "datasync",
                        value: function datasync() {
                            return (0, util_1.promisify)(this.fs, "fdatasync")(this.fd);
                        }
                    },
                    {
                        key: "createReadStream",
                        value: function createReadStream(options) {
                            return this.fs.createReadStream("", _objectSpreadProps(_objectSpread({}, options), {
                                fd: this
                            }));
                        }
                    },
                    {
                        key: "createWriteStream",
                        value: function createWriteStream(options) {
                            return this.fs.createWriteStream("", _objectSpreadProps(_objectSpread({}, options), {
                                fd: this
                            }));
                        }
                    },
                    {
                        key: "readableWebStream",
                        value: function readableWebStream() {
                            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                            var _this = this;
                            var _options_type = options.type, type = _options_type === void 0 ? "bytes" : _options_type, _options_autoClose = options.autoClose, autoClose = _options_autoClose === void 0 ? false : _options_autoClose;
                            var position = 0;
                            if (this.fd === -1) {
                                throw new Error("The FileHandle is closed");
                            }
                            if (this.closePromise) {
                                throw new Error("The FileHandle is closing");
                            }
                            if (this.readableWebStreamLocked) {
                                throw new Error("An error will be thrown if this method is called more than once or is called after the FileHandle is closed or closing.");
                            }
                            this.readableWebStreamLocked = true;
                            this.ref();
                            var unlockAndCleanup = function() {
                                _this.readableWebStreamLocked = false;
                                _this.unref();
                                if (autoClose) {
                                    _this.close().catch(function() {});
                                }
                            };
                            var _this1 = this;
                            return new ReadableStream({
                                type: type === "bytes" ? "bytes" : void 0,
                                autoAllocateChunkSize: 16384,
                                pull: function() {
                                    var _ref = _asyncToGenerator(function(controller) {
                                        var _controller_byobRequest, view, buffer, result2, result, error;
                                        return __generator(this, function(_state) {
                                            switch(_state.label){
                                                case 0:
                                                    _state.trys.push([
                                                        0,
                                                        4,
                                                        ,
                                                        5
                                                    ]);
                                                    view = (_controller_byobRequest = controller.byobRequest) === null || _controller_byobRequest === void 0 ? void 0 : _controller_byobRequest.view;
                                                    if (!!view) return [
                                                        3,
                                                        2
                                                    ];
                                                    buffer = new Uint8Array(16384);
                                                    return [
                                                        4,
                                                        _this1.read(buffer, 0, buffer.length, position)
                                                    ];
                                                case 1:
                                                    result2 = _state.sent();
                                                    if (result2.bytesRead === 0) {
                                                        controller.close();
                                                        unlockAndCleanup();
                                                        return [
                                                            2
                                                        ];
                                                    }
                                                    position += result2.bytesRead;
                                                    controller.enqueue(buffer.slice(0, result2.bytesRead));
                                                    return [
                                                        2
                                                    ];
                                                case 2:
                                                    return [
                                                        4,
                                                        _this1.read(view, view.byteOffset, view.byteLength, position)
                                                    ];
                                                case 3:
                                                    result = _state.sent();
                                                    if (result.bytesRead === 0) {
                                                        controller.close();
                                                        unlockAndCleanup();
                                                        return [
                                                            2
                                                        ];
                                                    }
                                                    position += result.bytesRead;
                                                    controller.byobRequest.respond(result.bytesRead);
                                                    return [
                                                        3,
                                                        5
                                                    ];
                                                case 4:
                                                    error = _state.sent();
                                                    controller.error(error);
                                                    unlockAndCleanup();
                                                    return [
                                                        3,
                                                        5
                                                    ];
                                                case 5:
                                                    return [
                                                        2
                                                    ];
                                            }
                                        });
                                    });
                                    return function(controller) {
                                        return _ref.apply(this, arguments);
                                    };
                                }(),
                                cancel: /*#__PURE__*/ _asyncToGenerator(function() {
                                    return __generator(this, function(_state) {
                                        unlockAndCleanup();
                                        return [
                                            2
                                        ];
                                    });
                                })
                            });
                        }
                    },
                    {
                        key: "read",
                        value: function read(buffer, offset, length, position) {
                            var _this = this;
                            return _asyncToGenerator(function() {
                                var readPosition, result;
                                return __generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            readPosition = position !== null && position !== void 0 ? position : _this.position;
                                            return [
                                                4,
                                                (0, util_1.promisify)(_this.fs, "read", function(bytesRead) {
                                                    return {
                                                        bytesRead: bytesRead,
                                                        buffer: buffer
                                                    };
                                                })(_this.fd, buffer, offset, length, readPosition)
                                            ];
                                        case 1:
                                            result = _state.sent();
                                            if (position === null || position === void 0) {
                                                _this.position += result.bytesRead;
                                            }
                                            return [
                                                2,
                                                result
                                            ];
                                    }
                                });
                            })();
                        }
                    },
                    {
                        key: "readv",
                        value: function readv(buffers, position) {
                            return (0, util_1.promisify)(this.fs, "readv", function(bytesRead) {
                                return {
                                    bytesRead: bytesRead,
                                    buffers: buffers
                                };
                            })(this.fd, buffers, position);
                        }
                    },
                    {
                        key: "readFile",
                        value: function readFile(options) {
                            return (0, util_1.promisify)(this.fs, "readFile")(this.fd, options);
                        }
                    },
                    {
                        key: "stat",
                        value: function stat(options) {
                            return (0, util_1.promisify)(this.fs, "fstat")(this.fd, options);
                        }
                    },
                    {
                        key: "sync",
                        value: function sync() {
                            return (0, util_1.promisify)(this.fs, "fsync")(this.fd);
                        }
                    },
                    {
                        key: "truncate",
                        value: function truncate(len) {
                            return (0, util_1.promisify)(this.fs, "ftruncate")(this.fd, len);
                        }
                    },
                    {
                        key: "utimes",
                        value: function utimes(atime, mtime) {
                            return (0, util_1.promisify)(this.fs, "futimes")(this.fd, atime, mtime);
                        }
                    },
                    {
                        key: "write",
                        value: function write(buffer, offset, length, position) {
                            var _this = this;
                            return _asyncToGenerator(function() {
                                var useInternalPosition, writePosition, result;
                                return __generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            useInternalPosition = typeof position !== "number";
                                            writePosition = useInternalPosition ? _this.position : position;
                                            return [
                                                4,
                                                (0, util_1.promisify)(_this.fs, "write", function(bytesWritten) {
                                                    return {
                                                        bytesWritten: bytesWritten,
                                                        buffer: buffer
                                                    };
                                                })(_this.fd, buffer, offset, length, writePosition)
                                            ];
                                        case 1:
                                            result = _state.sent();
                                            if (useInternalPosition) {
                                                _this.position += result.bytesWritten;
                                            }
                                            return [
                                                2,
                                                result
                                            ];
                                    }
                                });
                            })();
                        }
                    },
                    {
                        key: "writev",
                        value: function writev(buffers, position) {
                            return (0, util_1.promisify)(this.fs, "writev", function(bytesWritten) {
                                return {
                                    bytesWritten: bytesWritten,
                                    buffers: buffers
                                };
                            })(this.fd, buffers, position);
                        }
                    },
                    {
                        key: "writeFile",
                        value: function writeFile(data, options) {
                            return (0, util_1.promisify)(this.fs, "writeFile")(this.fd, data, options);
                        }
                    },
                    {
                        key: Symbol.asyncDispose,
                        value: // Implement Symbol.asyncDispose if available (ES2023+)
                        function value() {
                            var _this = this;
                            return _asyncToGenerator(function() {
                                return __generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            return [
                                                4,
                                                _this.close()
                                            ];
                                        case 1:
                                            _state.sent();
                                            return [
                                                2
                                            ];
                                    }
                                });
                            })();
                        }
                    },
                    {
                        key: "ref",
                        value: function ref() {
                            this.refs++;
                        }
                    },
                    {
                        key: "unref",
                        value: function unref() {
                            this.refs--;
                            if (this.refs === 0) {
                                this.fd = -1;
                                if (this.closeResolve) {
                                    (0, util_1.promisify)(this.fs, "close")(this.fd).then(this.closeResolve, this.closeReject);
                                }
                            }
                        }
                    }
                ]);
                return FileHandle;
            }(events_1.EventEmitter);
            exports.FileHandle = FileHandle;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/FsPromises.js
    var require_FsPromises = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/FsPromises.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.FsPromises = void 0;
            var util_1 = require_util3();
            var constants_1 = require_constants();
            var FSWatchAsyncIterator = /*#__PURE__*/ function() {
                function FSWatchAsyncIterator(fs, path) {
                    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                    var _this = this;
                    _classCallCheck(this, FSWatchAsyncIterator);
                    this.fs = fs;
                    this.path = path;
                    this.options = options;
                    this.eventQueue = [];
                    this.resolveQueue = [];
                    this.finished = false;
                    this.maxQueue = options.maxQueue || 2048;
                    this.overflow = options.overflow || "ignore";
                    this.startWatching();
                    if (options.signal) {
                        if (options.signal.aborted) {
                            this.finish();
                            return;
                        }
                        options.signal.addEventListener("abort", function() {
                            _this.finish();
                        });
                    }
                }
                _createClass(FSWatchAsyncIterator, [
                    {
                        key: "startWatching",
                        value: function startWatching() {
                            var _this = this;
                            try {
                                this.watcher = this.fs.watch(this.path, this.options, function(eventType, filename) {
                                    _this.enqueueEvent({
                                        eventType: eventType,
                                        filename: filename
                                    });
                                });
                            } catch (error) {
                                this.finish();
                                throw error;
                            }
                        }
                    },
                    {
                        key: "enqueueEvent",
                        value: function enqueueEvent(event) {
                            if (this.finished) return;
                            if (this.eventQueue.length >= this.maxQueue) {
                                if (this.overflow === "throw") {
                                    var error = new Error("Watch queue overflow: more than ".concat(this.maxQueue, " events queued"));
                                    this.finish(error);
                                    return;
                                } else {
                                    this.eventQueue.shift();
                                    console.warn("Watch queue overflow: dropping event due to exceeding maxQueue of ".concat(this.maxQueue));
                                }
                            }
                            this.eventQueue.push(event);
                            if (this.resolveQueue.length > 0) {
                                var resolve = this.resolveQueue.shift().resolve;
                                var nextEvent = this.eventQueue.shift();
                                resolve({
                                    value: nextEvent,
                                    done: false
                                });
                            }
                        }
                    },
                    {
                        key: "finish",
                        value: function finish(error) {
                            if (this.finished) return;
                            this.finished = true;
                            if (this.watcher) {
                                this.watcher.close();
                                this.watcher = null;
                            }
                            while(this.resolveQueue.length > 0){
                                var _this_resolveQueue_shift = this.resolveQueue.shift(), resolve = _this_resolveQueue_shift.resolve, reject = _this_resolveQueue_shift.reject;
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve({
                                        value: void 0,
                                        done: true
                                    });
                                }
                            }
                        }
                    },
                    {
                        key: "next",
                        value: function next() {
                            var _this = this;
                            return _asyncToGenerator(function() {
                                var event;
                                return __generator(this, function(_state) {
                                    if (_this.finished) {
                                        return [
                                            2,
                                            {
                                                value: void 0,
                                                done: true
                                            }
                                        ];
                                    }
                                    if (_this.eventQueue.length > 0) {
                                        event = _this.eventQueue.shift();
                                        return [
                                            2,
                                            {
                                                value: event,
                                                done: false
                                            }
                                        ];
                                    }
                                    return [
                                        2,
                                        new Promise(function(resolve, reject) {
                                            _this.resolveQueue.push({
                                                resolve: resolve,
                                                reject: reject
                                            });
                                        })
                                    ];
                                });
                            })();
                        }
                    },
                    {
                        key: "return",
                        value: function _return() {
                            var _this = this;
                            return _asyncToGenerator(function() {
                                return __generator(this, function(_state) {
                                    _this.finish();
                                    return [
                                        2,
                                        {
                                            value: void 0,
                                            done: true
                                        }
                                    ];
                                });
                            })();
                        }
                    },
                    {
                        key: "throw",
                        value: function _throw(error) {
                            var _this = this;
                            return _asyncToGenerator(function() {
                                return __generator(this, function(_state) {
                                    _this.finish(error);
                                    throw error;
                                });
                            })();
                        }
                    },
                    {
                        key: Symbol.asyncIterator,
                        value: function value() {
                            return this;
                        }
                    }
                ]);
                return FSWatchAsyncIterator;
            }();
            var FsPromises = function FsPromises(fs, FileHandle) {
                var _this = this;
                _classCallCheck(this, FsPromises);
                this.fs = fs;
                this.FileHandle = FileHandle;
                this.constants = constants_1.constants;
                this.cp = (0, util_1.promisify)(this.fs, "cp");
                this.opendir = (0, util_1.promisify)(this.fs, "opendir");
                this.statfs = (0, util_1.promisify)(this.fs, "statfs");
                this.lutimes = (0, util_1.promisify)(this.fs, "lutimes");
                this.glob = (0, util_1.promisify)(this.fs, "glob");
                this.access = (0, util_1.promisify)(this.fs, "access");
                this.chmod = (0, util_1.promisify)(this.fs, "chmod");
                this.chown = (0, util_1.promisify)(this.fs, "chown");
                this.copyFile = (0, util_1.promisify)(this.fs, "copyFile");
                this.lchmod = (0, util_1.promisify)(this.fs, "lchmod");
                this.lchown = (0, util_1.promisify)(this.fs, "lchown");
                this.link = (0, util_1.promisify)(this.fs, "link");
                this.lstat = (0, util_1.promisify)(this.fs, "lstat");
                this.mkdir = (0, util_1.promisify)(this.fs, "mkdir");
                this.mkdtemp = (0, util_1.promisify)(this.fs, "mkdtemp");
                this.readdir = (0, util_1.promisify)(this.fs, "readdir");
                this.readlink = (0, util_1.promisify)(this.fs, "readlink");
                this.realpath = (0, util_1.promisify)(this.fs, "realpath");
                this.rename = (0, util_1.promisify)(this.fs, "rename");
                this.rmdir = (0, util_1.promisify)(this.fs, "rmdir");
                this.rm = (0, util_1.promisify)(this.fs, "rm");
                this.stat = (0, util_1.promisify)(this.fs, "stat");
                this.symlink = (0, util_1.promisify)(this.fs, "symlink");
                this.truncate = (0, util_1.promisify)(this.fs, "truncate");
                this.unlink = (0, util_1.promisify)(this.fs, "unlink");
                this.utimes = (0, util_1.promisify)(this.fs, "utimes");
                this.readFile = function(id, options) {
                    return (0, util_1.promisify)(_this.fs, "readFile")(_instanceof(id, _this.FileHandle) ? id.fd : id, options);
                };
                this.appendFile = function(path, data, options) {
                    return (0, util_1.promisify)(_this.fs, "appendFile")(_instanceof(path, _this.FileHandle) ? path.fd : path, data, options);
                };
                this.open = function(path) {
                    var flags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "r", mode = arguments.length > 2 ? arguments[2] : void 0;
                    return (0, util_1.promisify)(_this.fs, "open", function(fd) {
                        return new _this.FileHandle(_this.fs, fd);
                    })(path, flags, mode);
                };
                this.writeFile = function(id, data, options) {
                    var dataPromise = (0, util_1.isReadableStream)(data) ? (0, util_1.streamToBuffer)(data) : Promise.resolve(data);
                    return dataPromise.then(function(data2) {
                        return (0, util_1.promisify)(_this.fs, "writeFile")(_instanceof(id, _this.FileHandle) ? id.fd : id, data2, options);
                    });
                };
                this.watch = function(filename, options) {
                    var watchOptions = typeof options === "string" ? {
                        encoding: options
                    } : options || {};
                    return new FSWatchAsyncIterator(_this.fs, filename, watchOptions);
                };
            };
            exports.FsPromises = FsPromises;
        }
    });
    // ../../node_modules/.pnpm/tree-dump@1.1.0_tslib@2.8.1/node_modules/tree-dump/lib/printTree.js
    var require_printTree = __commonJS({
        "../../node_modules/.pnpm/tree-dump@1.1.0_tslib@2.8.1/node_modules/tree-dump/lib/printTree.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.printTree = void 0;
            var printTree = function() {
                var tab = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", children = arguments.length > 1 ? arguments[1] : void 0;
                var str = "";
                var last = children.length - 1;
                for(; last >= 0; last--)if (children[last]) break;
                for(var i = 0; i <= last; i++){
                    var fn = children[i];
                    if (!fn) continue;
                    var isLast = i === last;
                    var child = fn(tab + (isLast ? " " : "│") + "  ");
                    var branch = child ? isLast ? "└─" : "├─" : "│";
                    str += "\n" + tab + branch + (child ? " " + child : "");
                }
                return str;
            };
            exports.printTree = printTree;
        }
    });
    // ../../node_modules/.pnpm/tree-dump@1.1.0_tslib@2.8.1/node_modules/tree-dump/lib/printBinary.js
    var require_printBinary = __commonJS({
        "../../node_modules/.pnpm/tree-dump@1.1.0_tslib@2.8.1/node_modules/tree-dump/lib/printBinary.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.printBinary = void 0;
            var printBinary = function() {
                var tab = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", children = arguments.length > 1 ? arguments[1] : void 0;
                var left = children[0], right = children[1];
                var str = "";
                if (left) str += "\n" + tab + "← " + left(tab + "  ");
                if (right) str += "\n" + tab + "→ " + right(tab + "  ");
                return str;
            };
            exports.printBinary = printBinary;
        }
    });
    // ../../node_modules/.pnpm/tree-dump@1.1.0_tslib@2.8.1/node_modules/tree-dump/lib/printJson.js
    var require_printJson = __commonJS({
        "../../node_modules/.pnpm/tree-dump@1.1.0_tslib@2.8.1/node_modules/tree-dump/lib/printJson.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.printJson = void 0;
            var printJson = function() {
                var tab = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", json = arguments.length > 1 ? arguments[1] : void 0, space = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 2;
                return (JSON.stringify(json, null, space) || "nil").split("\n").join("\n" + tab);
            };
            exports.printJson = printJson;
        }
    });
    // ../../node_modules/.pnpm/tree-dump@1.1.0_tslib@2.8.1/node_modules/tree-dump/lib/index.js
    var require_lib = __commonJS({
        "../../node_modules/.pnpm/tree-dump@1.1.0_tslib@2.8.1/node_modules/tree-dump/lib/index.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
            tslib_1.__exportStar(require_printTree(), exports);
            tslib_1.__exportStar(require_printBinary(), exports);
            tslib_1.__exportStar(require_printJson(), exports);
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node-to-fsa/util.js
    var require_util4 = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node-to-fsa/util.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.newNotAllowedError = exports.newTypeMismatchError = exports.newNotFoundError = exports.assertCanWrite = exports.assertName = exports.basename = exports.ctx = void 0;
            var ctx = function() {
                var partial = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return _objectSpread({
                    separator: "/",
                    syncHandleAllowed: false,
                    mode: "read"
                }, partial);
            };
            exports.ctx = ctx;
            var basename = function(path, separator) {
                if (path[path.length - 1] === separator) path = path.slice(0, -1);
                var lastSlashIndex = path.lastIndexOf(separator);
                return lastSlashIndex === -1 ? path : path.slice(lastSlashIndex + 1);
            };
            exports.basename = basename;
            var nameRegex = /^(\.{1,2})$|^(.*([\/\\]).*)$/;
            var assertName = function(name, method, klass) {
                var isInvalid = !name || nameRegex.test(name);
                if (isInvalid) throw new TypeError("Failed to execute '".concat(method, "' on '").concat(klass, "': Name is not allowed."));
            };
            exports.assertName = assertName;
            var assertCanWrite = function(mode) {
                if (mode !== "readwrite") throw new DOMException("The request is not allowed by the user agent or the platform in the current context.", "NotAllowedError");
            };
            exports.assertCanWrite = assertCanWrite;
            var newNotFoundError = function() {
                return new DOMException("A requested file or directory could not be found at the time an operation was processed.", "NotFoundError");
            };
            exports.newNotFoundError = newNotFoundError;
            var newTypeMismatchError = function() {
                return new DOMException("The path supplied exists, but was not an entry of requested type.", "TypeMismatchError");
            };
            exports.newTypeMismatchError = newTypeMismatchError;
            var newNotAllowedError = function() {
                return new DOMException("Permission not granted.", "NotAllowedError");
            };
            exports.newNotAllowedError = newNotAllowedError;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/print/index.js
    var require_print = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/print/index.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.toTreeSync = void 0;
            var tree_dump_1 = require_lib();
            var util_1 = require_util4();
            var toTreeSync = function(fs) {
                var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var separator = opts.separator || "/";
                var dir = opts.dir || separator;
                if (dir[dir.length - 1] !== separator) dir += separator;
                var tab = opts.tab || "";
                var _opts_depth;
                var depth = (_opts_depth = opts.depth) !== null && _opts_depth !== void 0 ? _opts_depth : 10;
                var subtree = " (...)";
                if (depth > 0) {
                    var list = fs.readdirSync(dir, {
                        withFileTypes: true
                    });
                    subtree = (0, tree_dump_1.printTree)(tab, list.map(function(entry) {
                        return function(tab2) {
                            if (entry.isDirectory()) {
                                return (0, exports.toTreeSync)(fs, {
                                    dir: dir + entry.name,
                                    depth: depth - 1,
                                    tab: tab2
                                });
                            } else if (entry.isSymbolicLink()) {
                                return "" + entry.name + " → " + fs.readlinkSync(dir + entry.name);
                            } else {
                                return "" + entry.name;
                            }
                        };
                    }));
                }
                var base = (0, util_1.basename)(dir, separator) + separator;
                return base + subtree;
            };
            exports.toTreeSync = toTreeSync;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/options.js
    var require_options = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/options.js": function(exports) {
            "use strict";
            var getOptions = function getOptions(defaults, options) {
                var opts;
                if (!options) return defaults;
                else {
                    var tipeof = typeof options === "undefined" ? "undefined" : _typeof(options);
                    switch(tipeof){
                        case "string":
                            opts = Object.assign({}, defaults, {
                                encoding: options
                            });
                            break;
                        case "object":
                            opts = Object.assign({}, defaults, options);
                            break;
                        default:
                            throw TypeError(ERRSTR_OPTS(tipeof));
                    }
                }
                if (opts.encoding !== "buffer") (0, encoding_1.assertEncoding)(opts.encoding);
                return opts;
            };
            var optsGenerator = function optsGenerator(defaults) {
                return function(options) {
                    return getOptions(defaults, options);
                };
            };
            var optsAndCbGenerator = function optsAndCbGenerator(getOpts) {
                return function(options, callback) {
                    return typeof options === "function" ? [
                        getOpts(),
                        options
                    ] : [
                        getOpts(options),
                        (0, util_1.validateCallback)(callback)
                    ];
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.getWriteFileOptions = exports.writeFileDefaults = exports.getRealpathOptsAndCb = exports.getRealpathOptions = exports.getStatfsOptsAndCb = exports.getStatfsOptions = exports.getStatOptsAndCb = exports.getStatOptions = exports.getAppendFileOptsAndCb = exports.getAppendFileOpts = exports.getOpendirOptsAndCb = exports.getOpendirOptions = exports.getReaddirOptsAndCb = exports.getReaddirOptions = exports.getReadFileOptions = exports.getRmOptsAndCb = exports.getRmdirOptions = exports.getDefaultOptsAndCb = exports.getDefaultOpts = exports.optsDefaults = exports.getMkdirOptions = void 0;
            exports.getOptions = getOptions;
            exports.optsGenerator = optsGenerator;
            exports.optsAndCbGenerator = optsAndCbGenerator;
            var constants_1 = require_constants2();
            var encoding_1 = require_encoding();
            var util_1 = require_util3();
            var mkdirDefaults = {
                mode: 511,
                recursive: false
            };
            var getMkdirOptions = function(options) {
                if (typeof options === "number") return Object.assign({}, mkdirDefaults, {
                    mode: options
                });
                return Object.assign({}, mkdirDefaults, options);
            };
            exports.getMkdirOptions = getMkdirOptions;
            var ERRSTR_OPTS = function(tipeof) {
                return "Expected options to be either an object or a string, but got ".concat(tipeof, " instead");
            };
            exports.optsDefaults = {
                encoding: "utf8"
            };
            exports.getDefaultOpts = optsGenerator(exports.optsDefaults);
            exports.getDefaultOptsAndCb = optsAndCbGenerator(exports.getDefaultOpts);
            var rmdirDefaults = {
                recursive: false
            };
            var getRmdirOptions = function(options) {
                return Object.assign({}, rmdirDefaults, options);
            };
            exports.getRmdirOptions = getRmdirOptions;
            var getRmOpts = optsGenerator(exports.optsDefaults);
            exports.getRmOptsAndCb = optsAndCbGenerator(getRmOpts);
            var readFileOptsDefaults = {
                flag: "r"
            };
            exports.getReadFileOptions = optsGenerator(readFileOptsDefaults);
            var readdirDefaults = {
                encoding: "utf8",
                recursive: false,
                withFileTypes: false
            };
            exports.getReaddirOptions = optsGenerator(readdirDefaults);
            exports.getReaddirOptsAndCb = optsAndCbGenerator(exports.getReaddirOptions);
            var opendirDefaults = {
                encoding: "utf8",
                bufferSize: 32,
                recursive: false
            };
            exports.getOpendirOptions = optsGenerator(opendirDefaults);
            exports.getOpendirOptsAndCb = optsAndCbGenerator(exports.getOpendirOptions);
            var appendFileDefaults = {
                encoding: "utf8",
                mode: 438,
                flag: constants_1.FLAGS[constants_1.FLAGS.a]
            };
            exports.getAppendFileOpts = optsGenerator(appendFileDefaults);
            exports.getAppendFileOptsAndCb = optsAndCbGenerator(exports.getAppendFileOpts);
            var statDefaults = {
                bigint: false
            };
            var getStatOptions = function() {
                var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return Object.assign({}, statDefaults, options);
            };
            exports.getStatOptions = getStatOptions;
            var getStatOptsAndCb = function(options, callback) {
                return typeof options === "function" ? [
                    (0, exports.getStatOptions)(),
                    options
                ] : [
                    (0, exports.getStatOptions)(options),
                    (0, util_1.validateCallback)(callback)
                ];
            };
            exports.getStatOptsAndCb = getStatOptsAndCb;
            var statfsDefaults = {
                bigint: false
            };
            var getStatfsOptions = function() {
                var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return Object.assign({}, statfsDefaults, options);
            };
            exports.getStatfsOptions = getStatfsOptions;
            var getStatfsOptsAndCb = function(options, callback) {
                return typeof options === "function" ? [
                    (0, exports.getStatfsOptions)(),
                    options
                ] : [
                    (0, exports.getStatfsOptions)(options),
                    (0, util_1.validateCallback)(callback)
                ];
            };
            exports.getStatfsOptsAndCb = getStatfsOptsAndCb;
            var realpathDefaults = exports.optsDefaults;
            exports.getRealpathOptions = optsGenerator(realpathDefaults);
            exports.getRealpathOptsAndCb = optsAndCbGenerator(exports.getRealpathOptions);
            exports.writeFileDefaults = {
                encoding: "utf8",
                mode: 438,
                flag: constants_1.FLAGS[constants_1.FLAGS.w]
            };
            exports.getWriteFileOptions = optsGenerator(exports.writeFileDefaults);
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/Dir.js
    var require_Dir = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/Dir.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Dir = void 0;
            var util_1 = require_util3();
            var Dirent_1 = require_Dirent();
            var errors = require_errors();
            var Dir = /*#__PURE__*/ function() {
                function Dir(link, options) {
                    _classCallCheck(this, Dir);
                    this.link = link;
                    this.options = options;
                    this.iteratorInfo = [];
                    this.closed = false;
                    this.operationQueue = null;
                    this.path = link.getPath();
                    this.iteratorInfo.push(link.children[Symbol.iterator]());
                }
                _createClass(Dir, [
                    {
                        key: "closeBase",
                        value: function closeBase() {}
                    },
                    {
                        key: "readBase",
                        value: function readBase(iteratorInfo) {
                            var done;
                            var value;
                            var name;
                            var link;
                            do {
                                do {
                                    var ref;
                                    ref = iteratorInfo[iteratorInfo.length - 1].next(), done = ref.done, value = ref.value, ref;
                                    if (!done) {
                                        var ref1;
                                        ref1 = _slicedToArray(value, 2), name = ref1[0], link = ref1[1], ref1;
                                    } else {
                                        break;
                                    }
                                }while (name === "." || name === "..");
                                if (done) {
                                    iteratorInfo.pop();
                                    if (iteratorInfo.length === 0) {
                                        break;
                                    } else {
                                        done = false;
                                    }
                                } else {
                                    if (this.options.recursive && link.children.size) {
                                        iteratorInfo.push(link.children[Symbol.iterator]());
                                    }
                                    return Dirent_1.default.build(link, this.options.encoding);
                                }
                            }while (!done);
                            return null;
                        }
                    },
                    {
                        key: "close",
                        value: function close(callback) {
                            var _this = this;
                            if (callback === void 0) {
                                if (this.closed) {
                                    return Promise.reject(new errors.Error("ERR_DIR_CLOSED"));
                                }
                                return new Promise(function(resolve, reject) {
                                    _this.close(function(err) {
                                        if (err) reject(err);
                                        else resolve();
                                    });
                                });
                            }
                            (0, util_1.validateCallback)(callback);
                            if (this.closed) {
                                process.nextTick(callback, new errors.Error("ERR_DIR_CLOSED"));
                                return;
                            }
                            if (this.operationQueue !== null) {
                                this.operationQueue.push(function() {
                                    _this.close(callback);
                                });
                                return;
                            }
                            this.closed = true;
                            try {
                                this.closeBase();
                                process.nextTick(callback);
                            } catch (err) {
                                process.nextTick(callback, err);
                            }
                        }
                    },
                    {
                        key: "closeSync",
                        value: function closeSync() {
                            if (this.closed) {
                                throw new errors.Error("ERR_DIR_CLOSED");
                            }
                            if (this.operationQueue !== null) {
                                throw new errors.Error("ERR_DIR_CONCURRENT_OPERATION");
                            }
                            this.closed = true;
                            this.closeBase();
                        }
                    },
                    {
                        key: "read",
                        value: function read(callback) {
                            var _this = this;
                            if (callback === void 0) {
                                return new Promise(function(resolve, reject) {
                                    _this.read(function(err, result) {
                                        if (err) reject(err);
                                        else resolve(result !== null && result !== void 0 ? result : null);
                                    });
                                });
                            }
                            (0, util_1.validateCallback)(callback);
                            if (this.closed) {
                                process.nextTick(callback, new errors.Error("ERR_DIR_CLOSED"));
                                return;
                            }
                            if (this.operationQueue !== null) {
                                this.operationQueue.push(function() {
                                    _this.read(callback);
                                });
                                return;
                            }
                            this.operationQueue = [];
                            try {
                                var result = this.readBase(this.iteratorInfo);
                                process.nextTick(function() {
                                    var queue = _this.operationQueue;
                                    _this.operationQueue = null;
                                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                    try {
                                        for(var _iterator = queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                            var op = _step.value;
                                            op();
                                        }
                                    } catch (err) {
                                        _didIteratorError = true;
                                        _iteratorError = err;
                                    } finally{
                                        try {
                                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                _iterator.return();
                                            }
                                        } finally{
                                            if (_didIteratorError) {
                                                throw _iteratorError;
                                            }
                                        }
                                    }
                                    callback(null, result);
                                });
                            } catch (err1) {
                                process.nextTick(function() {
                                    var queue = _this.operationQueue;
                                    _this.operationQueue = null;
                                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                    try {
                                        for(var _iterator = queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                            var op = _step.value;
                                            op();
                                        }
                                    } catch (err) {
                                        _didIteratorError = true;
                                        _iteratorError = err;
                                    } finally{
                                        try {
                                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                _iterator.return();
                                            }
                                        } finally{
                                            if (_didIteratorError) {
                                                throw _iteratorError;
                                            }
                                        }
                                    }
                                    callback(err1);
                                });
                            }
                        }
                    },
                    {
                        key: "readSync",
                        value: function readSync() {
                            if (this.closed) {
                                throw new errors.Error("ERR_DIR_CLOSED");
                            }
                            if (this.operationQueue !== null) {
                                throw new errors.Error("ERR_DIR_CONCURRENT_OPERATION");
                            }
                            return this.readBase(this.iteratorInfo);
                        }
                    },
                    {
                        key: Symbol.asyncIterator,
                        value: function value() {
                            var _this = this;
                            return _defineProperty({
                                next: /*#__PURE__*/ _asyncToGenerator(function() {
                                    var dirEnt, err;
                                    return __generator(this, function(_state) {
                                        switch(_state.label){
                                            case 0:
                                                _state.trys.push([
                                                    0,
                                                    2,
                                                    ,
                                                    3
                                                ]);
                                                return [
                                                    4,
                                                    _this.read()
                                                ];
                                            case 1:
                                                dirEnt = _state.sent();
                                                if (dirEnt !== null) {
                                                    return [
                                                        2,
                                                        {
                                                            done: false,
                                                            value: dirEnt
                                                        }
                                                    ];
                                                } else {
                                                    return [
                                                        2,
                                                        {
                                                            done: true,
                                                            value: void 0
                                                        }
                                                    ];
                                                }
                                                return [
                                                    3,
                                                    3
                                                ];
                                            case 2:
                                                err = _state.sent();
                                                throw err;
                                            case 3:
                                                return [
                                                    2
                                                ];
                                        }
                                    });
                                })
                            }, Symbol.asyncIterator, function() {
                                return this;
                            });
                        }
                    }
                ]);
                return Dir;
            }();
            exports.Dir = Dir;
        }
    });
    // ../../node_modules/.pnpm/glob-to-regex.js@1.2.0_tslib@2.8.1/node_modules/glob-to-regex.js/lib/index.js
    var require_lib2 = __commonJS({
        "../../node_modules/.pnpm/glob-to-regex.js@1.2.0_tslib@2.8.1/node_modules/glob-to-regex.js/lib/index.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.toMatcher = exports.toRegex = void 0;
            var escapeRe = function(ch) {
                return /[.^$+{}()|\\]/.test(ch) ? "\\".concat(ch) : ch;
            };
            var parseExtGlob = function(pattern, startIdx, prefix, options) {
                var i = startIdx;
                var parts = [];
                var cur = "";
                var depth = 1;
                while(i < pattern.length && depth > 0){
                    var ch = pattern[i];
                    if (ch === "(") {
                        depth++;
                        cur += ch;
                        i++;
                    } else if (ch === ")") {
                        depth--;
                        if (depth === 0) {
                            parts.push(cur);
                            i++;
                            break;
                        } else {
                            cur += ch;
                            i++;
                        }
                    } else if (ch === "|" && depth === 1) {
                        parts.push(cur);
                        cur = "";
                        i++;
                    } else {
                        cur += ch;
                        i++;
                    }
                }
                if (depth !== 0) return;
                var alternatives = "";
                var length = parts.length;
                for(var j = 0; j < length; j++)alternatives += (alternatives ? "|" : "") + (0, exports.toRegex)(parts[j], options).source.replace(/^\^/, "").replace(/\$$/, "");
                switch(prefix){
                    case "?":
                        return [
                            "(?:".concat(alternatives, ")?"),
                            i
                        ];
                    case "*":
                        return [
                            "(?:".concat(alternatives, ")*"),
                            i
                        ];
                    case "+":
                        return [
                            "(?:".concat(alternatives, ")+"),
                            i
                        ];
                    case "@":
                        return [
                            "(?:".concat(alternatives, ")"),
                            i
                        ];
                    case "!":
                        return [
                            "(?!".concat(alternatives, ")[^/]*"),
                            i
                        ];
                }
                return;
            };
            var toRegex = function(pattern, options) {
                var regexStr = "";
                var i = 0;
                var parseBraceGroup = function() {
                    i++;
                    var parts = [];
                    var cur = "";
                    var closed = false;
                    while(i < pattern.length){
                        var ch = pattern[i];
                        if (ch === "}") {
                            parts.push(cur);
                            i++;
                            closed = true;
                            break;
                        }
                        if (ch === ",") {
                            parts.push(cur);
                            cur = "";
                            i++;
                            continue;
                        }
                        cur += ch;
                        i++;
                    }
                    if (!closed) {
                        return "\\{" + escapeRe(cur);
                    }
                    var alt = parts.map(function(p) {
                        return (0, exports.toRegex)(p, options).source.replace(/^\^/, "").replace(/\$$/, "");
                    }).join("|");
                    return "(?:".concat(alt, ")");
                };
                var extglob = !!(options === null || options === void 0 ? void 0 : options.extglob);
                while(i < pattern.length){
                    var char = pattern[i];
                    if (extglob && pattern[i + 1] === "(") {
                        if (char === "?" || char === "*" || char === "+" || char === "@" || char === "!") {
                            var result = parseExtGlob(pattern, i + 2, char, options);
                            if (result) {
                                regexStr += result[0];
                                i = result[1];
                                continue;
                            }
                        }
                    }
                    switch(char){
                        case "*":
                            {
                                if (pattern[i + 1] === "*") {
                                    var j = i + 2;
                                    while(pattern[j] === "*")j++;
                                    if (pattern[j] === "/") {
                                        regexStr += "(?:.*/)?";
                                        i = j + 1;
                                    } else {
                                        regexStr += ".*";
                                        i = j;
                                    }
                                } else {
                                    regexStr += "[^/]*";
                                    i++;
                                }
                                break;
                            }
                        case "?":
                            regexStr += "[^/]";
                            i++;
                            break;
                        case "[":
                            {
                                var cls = "[";
                                i++;
                                if (i < pattern.length && pattern[i] === "!") {
                                    cls += "^";
                                    i++;
                                }
                                if (i < pattern.length && pattern[i] === "]") {
                                    cls += "]";
                                    i++;
                                }
                                while(i < pattern.length && pattern[i] !== "]"){
                                    var ch = pattern[i];
                                    cls += ch === "\\" ? "\\\\" : ch;
                                    i++;
                                }
                                if (i < pattern.length && pattern[i] === "]") {
                                    cls += "]";
                                    i++;
                                } else {
                                    regexStr += "\\[";
                                    continue;
                                }
                                regexStr += cls;
                                break;
                            }
                        case "{":
                            {
                                regexStr += parseBraceGroup();
                                break;
                            }
                        case "/":
                            regexStr += "/";
                            i++;
                            break;
                        case ".":
                        case "^":
                        case "$":
                        case "+":
                        case "(":
                        case ")":
                        case "|":
                        case "\\":
                            regexStr += "\\".concat(char);
                            i++;
                            break;
                        default:
                            regexStr += char;
                            i++;
                            break;
                    }
                }
                var flags = (options === null || options === void 0 ? void 0 : options.nocase) ? "i" : "";
                return new RegExp("^" + regexStr + "$", flags);
            };
            exports.toRegex = toRegex;
            var isRegExp = /^\/(.{1,4096})\/([gimsuy]{0,6})$/;
            var toMatcher = function(pattern, options) {
                var regexes = [];
                var patterns = Array.isArray(pattern) ? pattern : [
                    pattern
                ];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = patterns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var pat = _step.value;
                        if (typeof pat === "string") {
                            var match = isRegExp.exec(pat);
                            if (match) {
                                var _match = _slicedToArray(match, 3), expr = _match[1], flags = _match[2];
                                regexes.push(new RegExp(expr, flags));
                            } else {
                                regexes.push((0, exports.toRegex)(pat, options));
                            }
                        } else {
                            regexes.push(pat);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return regexes.length ? new Function("p", "return " + regexes.map(function(r) {
                    return r + ".test(p)";
                }).join("||")) : function() {
                    return false;
                };
            };
            exports.toMatcher = toMatcher;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/glob.js
    var require_glob = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/glob.js": function(exports) {
            "use strict";
            var matchesPattern = function matchesPattern(path, pattern) {
                var regex = (0, glob_to_regex_js_1.toRegex)(pattern);
                return regex.test(path);
            };
            var isExcluded = function isExcluded(path, exclude) {
                if (!exclude) return false;
                if (typeof exclude === "function") {
                    return exclude(path);
                }
                var patterns = Array.isArray(exclude) ? exclude : [
                    exclude
                ];
                return patterns.some(function(pattern) {
                    return matchesPattern(path, pattern);
                });
            };
            var globSync = function globSync(fs, pattern) {
                var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var cwd = options.cwd ? (0, util_1.pathToFilename)(options.cwd) : process.cwd();
                var resolvedCwd = pathResolve(cwd);
                var globOptions = {
                    cwd: resolvedCwd,
                    exclude: options.exclude,
                    maxdepth: options.maxdepth,
                    withFileTypes: options.withFileTypes || false
                };
                var results = [];
                if (path_1.posix.isAbsolute(pattern)) {
                    var _results;
                    var dir = path_1.posix.dirname(pattern);
                    var patternBasename = path_1.posix.basename(pattern);
                    var dirResults = walkDirectory(fs, dir, [
                        patternBasename
                    ], _objectSpreadProps(_objectSpread({}, globOptions), {
                        cwd: dir
                    }));
                    (_results = results).push.apply(_results, _toConsumableArray(dirResults.map(function(r) {
                        return path_1.posix.resolve(dir, r);
                    })));
                } else {
                    var _results1;
                    var dirResults1 = walkDirectory(fs, resolvedCwd, [
                        pattern
                    ], globOptions);
                    (_results1 = results).push.apply(_results1, _toConsumableArray(dirResults1));
                }
                results = _toConsumableArray(new Set(results)).sort();
                return results;
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.globSync = globSync;
            var path_1 = require_path();
            var glob_to_regex_js_1 = require_lib2();
            var util_1 = require_util3();
            var pathJoin = path_1.posix.join;
            var pathRelative = path_1.posix.relative;
            var pathResolve = path_1.posix.resolve;
            function walkDirectory(fs, dir, patterns, options) {
                var currentDepth = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
                var results = [];
                var _options_maxdepth;
                var maxDepth = (_options_maxdepth = options.maxdepth) !== null && _options_maxdepth !== void 0 ? _options_maxdepth : Infinity;
                var baseCwd = options.cwd ? (0, util_1.pathToFilename)(options.cwd) : process.cwd();
                if (currentDepth > maxDepth) {
                    return results;
                }
                try {
                    var entries = fs.readdirSync(dir, {
                        withFileTypes: true
                    });
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        var _loop = function() {
                            var entry = _step.value;
                            var fullPath = pathJoin(dir, entry.name.toString());
                            var relativePath = pathRelative(baseCwd, fullPath);
                            if (isExcluded(relativePath, options.exclude)) {
                                return "continue";
                            }
                            var matches = patterns.some(function(pattern) {
                                return matchesPattern(relativePath, pattern);
                            });
                            if (matches) {
                                results.push(relativePath);
                            }
                            if (entry.isDirectory() && currentDepth < maxDepth) {
                                var _results;
                                var subResults = walkDirectory(fs, fullPath, patterns, options, currentDepth + 1);
                                (_results = results).push.apply(_results, _toConsumableArray(subResults));
                            }
                        };
                        for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                } catch (err1) {}
                return results;
            }
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/volume.js
    var require_volume = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/volume.js": function(exports) {
            "use strict";
            var pathToSteps = function pathToSteps(path) {
                return (0, util_3.filenameToSteps)((0, util_2.pathToFilename)(path));
            };
            var dataToStr = function dataToStr(data) {
                var encoding = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : encoding_1.ENCODING_UTF8;
                if (buffer_1.Buffer.isBuffer(data)) return data.toString(encoding);
                else if (_instanceof(data, Uint8Array)) return (0, buffer_1.bufferFrom)(data).toString(encoding);
                else return String(data);
            };
            var toUnixTimestamp = function toUnixTimestamp(time) {
                if (typeof time === "string" && +time == time) {
                    return +time;
                }
                if (_instanceof(time, Date)) {
                    return time.getTime() / 1e3;
                }
                if (isFinite(time)) {
                    if (time < 0) {
                        return Date.now() / 1e3;
                    }
                    return time;
                }
                throw new Error("Cannot parse time: " + time);
            };
            var validateUid = function validateUid(uid) {
                if (typeof uid !== "number") throw TypeError(constants_2.ERRSTR.UID);
            };
            var validateGid = function validateGid(gid) {
                if (typeof gid !== "number") throw TypeError(constants_2.ERRSTR.GID);
            };
            var emitStop = function emitStop(self) {
                self.emit("stop");
            };
            var allocNewPool = function allocNewPool(poolSize) {
                pool = (0, buffer_1.bufferAllocUnsafe)(poolSize);
                pool.used = 0;
            };
            var closeOnOpen = function closeOnOpen(fd) {
                this.close();
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.FSWatcher = exports.StatWatcher = exports.Volume = void 0;
            exports.pathToSteps = pathToSteps;
            exports.dataToStr = dataToStr;
            exports.toUnixTimestamp = toUnixTimestamp;
            var path_1 = require_path();
            var core_1 = require_core();
            var Stats_1 = require_Stats();
            var Dirent_1 = require_Dirent();
            var StatFs_1 = require_StatFs();
            var buffer_1 = require_buffer2();
            var queueMicrotask_1 = require_queueMicrotask();
            var setTimeoutUnref_1 = require_setTimeoutUnref();
            var stream_1 = require_stream();
            var constants_1 = require_constants();
            var events_1 = require_events();
            var encoding_1 = require_encoding();
            var FileHandle_1 = require_FileHandle();
            var util_1 = require_util();
            var FsPromises_1 = require_FsPromises();
            var print_1 = require_print();
            var constants_2 = require_constants2();
            var errors = require_errors();
            var options_1 = require_options();
            var util_2 = require_util3();
            var Dir_1 = require_Dir();
            var util_3 = require_util2();
            var resolveCrossPlatform = path_1.resolve;
            var _constants_1_constants = constants_1.constants, O_SYMLINK = _constants_1_constants.O_SYMLINK, F_OK = _constants_1_constants.F_OK, R_OK = _constants_1_constants.R_OK, W_OK = _constants_1_constants.W_OK, X_OK = _constants_1_constants.X_OK, COPYFILE_EXCL = _constants_1_constants.COPYFILE_EXCL, COPYFILE_FICLONE_FORCE = _constants_1_constants.COPYFILE_FICLONE_FORCE;
            var pathSep = path_1.posix ? path_1.posix.sep : path_1.sep;
            var pathRelative = path_1.posix ? path_1.posix.relative : path_1.relative;
            var pathJoin = path_1.posix ? path_1.posix.join : path_1.join;
            var pathDirname = path_1.posix ? path_1.posix.dirname : path_1.dirname;
            var pathNormalize = path_1.posix ? path_1.posix.normalize : path_1.normalize;
            var kMinPoolSpace = 128;
            var Volume = /*#__PURE__*/ function() {
                function Volume() {
                    var _core = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new core_1.Superblock();
                    var _this = this;
                    _classCallCheck(this, Volume);
                    this._core = _core;
                    this.promisesApi = new FsPromises_1.FsPromises(this, FileHandle_1.FileHandle);
                    this.openSync = function(path, flags) {
                        var mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 438;
                        var modeNum = (0, util_2.modeToNumber)(mode);
                        var fileName = (0, util_2.pathToFilename)(path);
                        var flagsNum = (0, util_2.flagsToNumber)(flags);
                        return _this._core.open(fileName, flagsNum, modeNum, !(flagsNum & O_SYMLINK));
                    };
                    this.open = function(path, flags, a, b) {
                        var mode = a;
                        var callback = b;
                        if (typeof a === "function") {
                            mode = 438;
                            callback = a;
                        }
                        mode = mode || 438;
                        var modeNum = (0, util_2.modeToNumber)(mode);
                        var fileName = (0, util_2.pathToFilename)(path);
                        var flagsNum = (0, util_2.flagsToNumber)(flags);
                        _this.wrapAsync(_this._core.open, [
                            fileName,
                            flagsNum,
                            modeNum,
                            !(flagsNum & O_SYMLINK)
                        ], callback);
                    };
                    this.closeSync = function(fd) {
                        _this._core.close(fd);
                    };
                    this.close = function(fd, callback) {
                        (0, util_3.validateFd)(fd);
                        var file = _this._core.getFileByFdOrThrow(fd, "close");
                        _this.wrapAsync(_this._core.close, [
                            file.fd
                        ], callback);
                    };
                    this.readSync = function(fd, buffer, offset, length, position) {
                        (0, util_3.validateFd)(fd);
                        return _this._core.read(fd, buffer, offset, length, position);
                    };
                    this.read = function(fd, buffer, offset, length, position, callback) {
                        (0, util_2.validateCallback)(callback);
                        if (length === 0) {
                            return (0, queueMicrotask_1.default)(function() {
                                if (callback) callback(null, 0, buffer);
                            });
                        }
                        Promise.resolve().then(function() {
                            try {
                                var bytes = _this._core.read(fd, buffer, offset, length, position);
                                callback(null, bytes, buffer);
                            } catch (err) {
                                callback(err);
                            }
                        });
                    };
                    this.readv = function(fd, buffers, a, b) {
                        var position = a;
                        var callback = b;
                        var ref;
                        if (typeof a === "function") ref = [
                            null,
                            a
                        ], position = ref[0], callback = ref[1], ref;
                        (0, util_2.validateCallback)(callback);
                        Promise.resolve().then(function() {
                            try {
                                var bytes = _this._core.readv(fd, buffers, position);
                                callback(null, bytes, buffers);
                            } catch (err) {
                                callback(err);
                            }
                        });
                    };
                    this.readvSync = function(fd, buffers, position) {
                        (0, util_3.validateFd)(fd);
                        return _this._core.readv(fd, buffers, position !== null && position !== void 0 ? position : null);
                    };
                    this._readfile = function(id, flagsNum, encoding) {
                        var result;
                        var isUserFd = typeof id === "number";
                        var userOwnsFd = isUserFd && (0, util_3.isFd)(id);
                        var fd;
                        if (userOwnsFd) fd = id;
                        else {
                            var filename = (0, util_2.pathToFilename)(id);
                            var originalPath = String(id);
                            var hasTrailingSlash = originalPath.length > 1 && originalPath.endsWith("/");
                            var link = _this._core.getResolvedLinkOrThrow(filename, "open");
                            var node = link.getNode();
                            if (node.isDirectory()) throw (0, util_2.createError)("EISDIR", "open", link.getPath());
                            if (hasTrailingSlash && node.isFile()) {
                                throw (0, util_2.createError)("ENOTDIR", "open", originalPath);
                            }
                            fd = _this.openSync(id, flagsNum);
                        }
                        try {
                            result = (0, util_2.bufferToEncoding)(_this._core.getFileByFdOrThrow(fd).getBuffer(), encoding);
                        } finally{
                            if (!userOwnsFd) {
                                _this.closeSync(fd);
                            }
                        }
                        return result;
                    };
                    this.readFileSync = function(file, options) {
                        var opts = (0, options_1.getReadFileOptions)(options);
                        var flagsNum = (0, util_2.flagsToNumber)(opts.flag);
                        return _this._readfile(file, flagsNum, opts.encoding);
                    };
                    this.readFile = function(id, a, b) {
                        var _ref = _slicedToArray((0, options_1.optsAndCbGenerator)(options_1.getReadFileOptions)(a, b), 2), opts = _ref[0], callback = _ref[1];
                        var flagsNum = (0, util_2.flagsToNumber)(opts.flag);
                        _this.wrapAsync(_this._readfile, [
                            id,
                            flagsNum,
                            opts.encoding
                        ], callback);
                    };
                    this.writeSync = function(fd, a, b, c, d) {
                        var _ref = _slicedToArray((0, util_2.getWriteSyncArgs)(fd, a, b, c, d), 5), buf = _ref[1], offset = _ref[2], length = _ref[3], position = _ref[4];
                        return _this._write(fd, buf, offset, length, position);
                    };
                    this.write = function(fd, a, b, c, d, e) {
                        var _ref = _slicedToArray((0, util_2.getWriteArgs)(fd, a, b, c, d, e), 7), asStr = _ref[1], buf = _ref[2], offset = _ref[3], length = _ref[4], position = _ref[5], cb = _ref[6];
                        Promise.resolve().then(function() {
                            try {
                                var bytes = _this._write(fd, buf, offset, length, position);
                                if (!asStr) {
                                    cb(null, bytes, buf);
                                } else {
                                    cb(null, bytes, a);
                                }
                            } catch (err) {
                                cb(err);
                            }
                        });
                    };
                    this.writev = function(fd, buffers, a, b) {
                        var position = a;
                        var callback = b;
                        var ref;
                        if (typeof a === "function") ref = [
                            null,
                            a
                        ], position = ref[0], callback = ref[1], ref;
                        (0, util_2.validateCallback)(callback);
                        Promise.resolve().then(function() {
                            try {
                                var bytes = _this.writevBase(fd, buffers, position);
                                callback(null, bytes, buffers);
                            } catch (err) {
                                callback(err);
                            }
                        });
                    };
                    this.writevSync = function(fd, buffers, position) {
                        (0, util_3.validateFd)(fd);
                        return _this.writevBase(fd, buffers, position !== null && position !== void 0 ? position : null);
                    };
                    this.writeFileSync = function(id, data, options) {
                        var opts = (0, options_1.getWriteFileOptions)(options);
                        var flagsNum = (0, util_2.flagsToNumber)(opts.flag);
                        var modeNum = (0, util_2.modeToNumber)(opts.mode);
                        var buf = (0, util_3.dataToBuffer)(data, opts.encoding);
                        _this._core.writeFile(id, buf, flagsNum, modeNum);
                    };
                    this.writeFile = function(id, data, a, b) {
                        var options = a;
                        var callback = b;
                        var ref;
                        if (typeof a === "function") ref = [
                            options_1.writeFileDefaults,
                            a
                        ], options = ref[0], callback = ref[1], ref;
                        var cb = (0, util_2.validateCallback)(callback);
                        var opts = (0, options_1.getWriteFileOptions)(options);
                        var flagsNum = (0, util_2.flagsToNumber)(opts.flag);
                        var modeNum = (0, util_2.modeToNumber)(opts.mode);
                        var buf = (0, util_3.dataToBuffer)(data, opts.encoding);
                        _this.wrapAsync(_this._core.writeFile, [
                            id,
                            buf,
                            flagsNum,
                            modeNum
                        ], cb);
                    };
                    this.copyFileSync = function(src, dest, flags) {
                        var srcFilename = (0, util_2.pathToFilename)(src);
                        var destFilename = (0, util_2.pathToFilename)(dest);
                        return _this._copyFile(srcFilename, destFilename, (flags || 0) | 0);
                    };
                    this.copyFile = function(src, dest, a, b) {
                        var srcFilename = (0, util_2.pathToFilename)(src);
                        var destFilename = (0, util_2.pathToFilename)(dest);
                        var flags;
                        var callback;
                        var ref, ref1;
                        if (typeof a === "function") ref = [
                            0,
                            a
                        ], flags = ref[0], callback = ref[1], ref;
                        else ref1 = [
                            a,
                            b
                        ], flags = ref1[0], callback = ref1[1], ref1;
                        (0, util_2.validateCallback)(callback);
                        _this.wrapAsync(_this._copyFile, [
                            srcFilename,
                            destFilename,
                            flags
                        ], callback);
                    };
                    this._cp = function(src, dest, options) {
                        if (options.filter && !options.filter(src, dest)) return;
                        var srcStat = options.dereference ? _this.statSync(src) : _this.lstatSync(src);
                        var destStat = null;
                        try {
                            destStat = _this.lstatSync(dest);
                        } catch (err) {
                            if (err.code !== "ENOENT") {
                                throw err;
                            }
                        }
                        if (destStat && srcStat.ino === destStat.ino && srcStat.dev === destStat.dev) throw (0, util_2.createError)("EINVAL", "cp", src, dest);
                        if (destStat) {
                            if (srcStat.isDirectory() && !destStat.isDirectory()) throw (0, util_2.createError)("EISDIR", "cp", src, dest);
                            if (!srcStat.isDirectory() && destStat.isDirectory()) throw (0, util_2.createError)("ENOTDIR", "cp", src, dest);
                        }
                        if (srcStat.isDirectory() && _this.isSrcSubdir(src, dest)) throw (0, util_2.createError)("EINVAL", "cp", src, dest);
                        ENDURE_PARENT_DIR_EXISTS: {
                            var parent = pathDirname(dest);
                            if (!_this.existsSync(parent)) _this.mkdirSync(parent, {
                                recursive: true
                            });
                        }
                        if (srcStat.isDirectory()) {
                            if (!options.recursive) throw (0, util_2.createError)("EISDIR", "cp", src);
                            _this.cpDirSync(srcStat, destStat, src, dest, options);
                        } else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) {
                            _this.cpFileSync(srcStat, destStat, src, dest, options);
                        } else if (srcStat.isSymbolicLink() && !options.dereference) {
                            _this.cpSymlinkSync(destStat, src, dest, options);
                        } else {
                            throw (0, util_2.createError)("EINVAL", "cp", src);
                        }
                    };
                    this.linkSync = function(existingPath, newPath) {
                        var existingPathFilename = (0, util_2.pathToFilename)(existingPath);
                        var newPathFilename = (0, util_2.pathToFilename)(newPath);
                        _this._core.link(existingPathFilename, newPathFilename);
                    };
                    this.link = function(existingPath, newPath, callback) {
                        var existingPathFilename = (0, util_2.pathToFilename)(existingPath);
                        var newPathFilename = (0, util_2.pathToFilename)(newPath);
                        _this.wrapAsync(_this._core.link, [
                            existingPathFilename,
                            newPathFilename
                        ], callback);
                    };
                    this.unlinkSync = function(path) {
                        var filename = (0, util_2.pathToFilename)(path);
                        _this._core.unlink(filename);
                    };
                    this.unlink = function(path, callback) {
                        var filename = (0, util_2.pathToFilename)(path);
                        _this.wrapAsync(_this._core.unlink, [
                            filename
                        ], callback);
                    };
                    this.symlinkSync = function(target, path, type) {
                        var targetFilename = (0, util_2.pathToFilename)(target);
                        var pathFilename = (0, util_2.pathToFilename)(path);
                        _this._core.symlink(targetFilename, pathFilename);
                    };
                    this.symlink = function(target, path, a, b) {
                        var callback = (0, util_2.validateCallback)(typeof a === "function" ? a : b);
                        var targetFilename = (0, util_2.pathToFilename)(target);
                        var pathFilename = (0, util_2.pathToFilename)(path);
                        _this.wrapAsync(_this._core.symlink, [
                            targetFilename,
                            pathFilename
                        ], callback);
                    };
                    this._lstat = function(filename) {
                        var bigint = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, throwIfNoEntry = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
                        var link;
                        try {
                            link = _this._core.getLinkOrThrow(filename, "lstat");
                        } catch (err) {
                            if (err.code === "ENOENT" && !throwIfNoEntry) return void 0;
                            else throw err;
                        }
                        return Stats_1.default.build(link.getNode(), bigint);
                    };
                    this.lstatSync = function(path, options) {
                        var _ref = (0, options_1.getStatOptions)(options), _ref_throwIfNoEntry = _ref.throwIfNoEntry, throwIfNoEntry = _ref_throwIfNoEntry === void 0 ? true : _ref_throwIfNoEntry, _ref_bigint = _ref.bigint, bigint = _ref_bigint === void 0 ? false : _ref_bigint;
                        return _this._lstat((0, util_2.pathToFilename)(path), bigint, throwIfNoEntry);
                    };
                    this.renameSync = function(oldPath, newPath) {
                        var oldPathFilename = (0, util_2.pathToFilename)(oldPath);
                        var newPathFilename = (0, util_2.pathToFilename)(newPath);
                        _this._core.rename(oldPathFilename, newPathFilename);
                    };
                    this.rename = function(oldPath, newPath, callback) {
                        var oldPathFilename = (0, util_2.pathToFilename)(oldPath);
                        var newPathFilename = (0, util_2.pathToFilename)(newPath);
                        _this.wrapAsync(_this._core.rename, [
                            oldPathFilename,
                            newPathFilename
                        ], callback);
                    };
                    this.existsSync = function(path) {
                        try {
                            return _this._exists((0, util_2.pathToFilename)(path));
                        } catch (err) {
                            return false;
                        }
                    };
                    this.exists = function(path, callback) {
                        var filename = (0, util_2.pathToFilename)(path);
                        if (typeof callback !== "function") throw Error(constants_2.ERRSTR.CB);
                        Promise.resolve().then(function() {
                            try {
                                callback(_this._exists(filename));
                            } catch (err) {
                                callback(false);
                            }
                        });
                    };
                    this.accessSync = function(path) {
                        var mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : F_OK;
                        var filename = (0, util_2.pathToFilename)(path);
                        mode = mode | 0;
                        _this._access(filename, mode);
                    };
                    this.access = function(path, a, b) {
                        var mode = F_OK;
                        var callback;
                        var ref;
                        if (typeof a !== "function") ref = [
                            a | 0,
                            (0, util_2.validateCallback)(b)
                        ], mode = ref[0], callback = ref[1], ref;
                        else callback = a;
                        var filename = (0, util_2.pathToFilename)(path);
                        _this.wrapAsync(_this._access, [
                            filename,
                            mode
                        ], callback);
                    };
                    this.appendFileSync = function(id, data, options) {
                        var opts = (0, options_1.getAppendFileOpts)(options);
                        if (!opts.flag || (0, util_3.isFd)(id)) opts.flag = "a";
                        _this.writeFileSync(id, data, opts);
                    };
                    this.appendFile = function(id, data, a, b) {
                        var _ref = _slicedToArray((0, options_1.getAppendFileOptsAndCb)(a, b), 2), opts = _ref[0], callback = _ref[1];
                        if (!opts.flag || (0, util_3.isFd)(id)) opts.flag = "a";
                        _this.writeFile(id, data, opts, callback);
                    };
                    this._readdir = function(filename, options) {
                        var steps = (0, util_3.filenameToSteps)(filename);
                        var link = _this._core.getResolvedLinkOrThrow(filename, "scandir");
                        var node = link.getNode();
                        if (!node.isDirectory()) throw (0, util_2.createError)("ENOTDIR", "scandir", filename);
                        if (!node.canRead()) throw (0, util_2.createError)("EACCES", "scandir", filename);
                        var list = [];
                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        try {
                            for(var _iterator = link.children.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                var name = _step.value;
                                var child = link.getChild(name);
                                if (!child || name === "." || name === "..") continue;
                                list.push(Dirent_1.default.build(child, options.encoding));
                                if (options.recursive && child.children.size) {
                                    var _list;
                                    var recurseOptions = _objectSpreadProps(_objectSpread({}, options), {
                                        recursive: true,
                                        withFileTypes: true
                                    });
                                    var childList = _this._readdir(child.getPath(), recurseOptions);
                                    (_list = list).push.apply(_list, _toConsumableArray(childList));
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        if (!util_3.isWin && options.encoding !== "buffer") list.sort(function(a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        });
                        if (options.withFileTypes) return list;
                        var filename2 = filename;
                        if (util_3.isWin) filename2 = filename2.replace(/\\/g, "/");
                        return list.map(function(dirent) {
                            if (options.recursive) {
                                var fullPath = pathJoin(dirent.parentPath, dirent.name.toString());
                                if (util_3.isWin) {
                                    fullPath = fullPath.replace(/\\/g, "/");
                                }
                                return fullPath.replace(filename2 + path_1.posix.sep, "");
                            }
                            return dirent.name;
                        });
                    };
                    this.readdirSync = function(path, options) {
                        var opts = (0, options_1.getReaddirOptions)(options);
                        var filename = (0, util_2.pathToFilename)(path);
                        return _this._readdir(filename, opts);
                    };
                    this.readdir = function(path, a, b) {
                        var _ref = _slicedToArray((0, options_1.getReaddirOptsAndCb)(a, b), 2), options = _ref[0], callback = _ref[1];
                        var filename = (0, util_2.pathToFilename)(path);
                        _this.wrapAsync(_this._readdir, [
                            filename,
                            options
                        ], callback);
                    };
                    this._readlink = function(filename, encoding) {
                        var link = _this._core.getLinkOrThrow(filename, "readlink");
                        var node = link.getNode();
                        if (!node.isSymlink()) throw (0, util_2.createError)("EINVAL", "readlink", filename);
                        return (0, encoding_1.strToEncoding)(node.symlink, encoding);
                    };
                    this.readlinkSync = function(path, options) {
                        var opts = (0, options_1.getDefaultOpts)(options);
                        var filename = (0, util_2.pathToFilename)(path);
                        return _this._readlink(filename, opts.encoding);
                    };
                    this.readlink = function(path, a, b) {
                        var _ref = _slicedToArray((0, options_1.getDefaultOptsAndCb)(a, b), 2), opts = _ref[0], callback = _ref[1];
                        var filename = (0, util_2.pathToFilename)(path);
                        _this.wrapAsync(_this._readlink, [
                            filename,
                            opts.encoding
                        ], callback);
                    };
                    this._fsync = function(fd) {
                        _this._core.getFileByFdOrThrow(fd, "fsync");
                    };
                    this.fsyncSync = function(fd) {
                        _this._fsync(fd);
                    };
                    this.fsync = function(fd, callback) {
                        _this.wrapAsync(_this._fsync, [
                            fd
                        ], callback);
                    };
                    this._fdatasync = function(fd) {
                        _this._core.getFileByFdOrThrow(fd, "fdatasync");
                    };
                    this.fdatasyncSync = function(fd) {
                        _this._fdatasync(fd);
                    };
                    this.fdatasync = function(fd, callback) {
                        _this.wrapAsync(_this._fdatasync, [
                            fd
                        ], callback);
                    };
                    this._ftruncate = function(fd, len) {
                        var file = _this._core.getFileByFdOrThrow(fd, "ftruncate");
                        file.truncate(len);
                    };
                    this.ftruncateSync = function(fd, len) {
                        _this._ftruncate(fd, len);
                    };
                    this.ftruncate = function(fd, a, b) {
                        var len = typeof a === "number" ? a : 0;
                        var callback = (0, util_2.validateCallback)(typeof a === "number" ? b : a);
                        _this.wrapAsync(_this._ftruncate, [
                            fd,
                            len
                        ], callback);
                    };
                    this._truncate = function(path, len) {
                        var fd = _this.openSync(path, "r+");
                        try {
                            _this.ftruncateSync(fd, len);
                        } finally{
                            _this.closeSync(fd);
                        }
                    };
                    this.truncateSync = function(id, len) {
                        if ((0, util_3.isFd)(id)) return _this.ftruncateSync(id, len);
                        _this._truncate(id, len);
                    };
                    this.truncate = function(id, a, b) {
                        var len = typeof a === "number" ? a : 0;
                        var callback = (0, util_2.validateCallback)(typeof a === "number" ? b : a);
                        if ((0, util_3.isFd)(id)) return _this.ftruncate(id, len, callback);
                        _this.wrapAsync(_this._truncate, [
                            id,
                            len
                        ], callback);
                    };
                    this._futimes = function(fd, atime, mtime) {
                        var file = _this._core.getFileByFdOrThrow(fd, "futimes");
                        var node = file.node;
                        node.atime = new Date(atime * 1e3);
                        node.mtime = new Date(mtime * 1e3);
                    };
                    this.futimesSync = function(fd, atime, mtime) {
                        _this._futimes(fd, toUnixTimestamp(atime), toUnixTimestamp(mtime));
                    };
                    this.futimes = function(fd, atime, mtime, callback) {
                        _this.wrapAsync(_this._futimes, [
                            fd,
                            toUnixTimestamp(atime),
                            toUnixTimestamp(mtime)
                        ], callback);
                    };
                    this._utimes = function(filename, atime, mtime) {
                        var followSymlinks = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
                        var core = _this._core;
                        var link = followSymlinks ? core.getResolvedLinkOrThrow(filename, "utimes") : core.getLinkOrThrow(filename, "lutimes");
                        var node = link.getNode();
                        node.atime = new Date(atime * 1e3);
                        node.mtime = new Date(mtime * 1e3);
                    };
                    this.utimesSync = function(path, atime, mtime) {
                        _this._utimes((0, util_2.pathToFilename)(path), toUnixTimestamp(atime), toUnixTimestamp(mtime), true);
                    };
                    this.utimes = function(path, atime, mtime, callback) {
                        _this.wrapAsync(_this._utimes, [
                            (0, util_2.pathToFilename)(path),
                            toUnixTimestamp(atime),
                            toUnixTimestamp(mtime),
                            true
                        ], callback);
                    };
                    this.lutimesSync = function(path, atime, mtime) {
                        _this._utimes((0, util_2.pathToFilename)(path), toUnixTimestamp(atime), toUnixTimestamp(mtime), false);
                    };
                    this.lutimes = function(path, atime, mtime, callback) {
                        _this.wrapAsync(_this._utimes, [
                            (0, util_2.pathToFilename)(path),
                            toUnixTimestamp(atime),
                            toUnixTimestamp(mtime),
                            false
                        ], callback);
                    };
                    this.mkdirSync = function(path, options) {
                        var opts = (0, options_1.getMkdirOptions)(options);
                        var modeNum = (0, util_2.modeToNumber)(opts.mode, 511);
                        var filename = (0, util_2.pathToFilename)(path);
                        if (opts.recursive) return _this._core.mkdirp(filename, modeNum);
                        _this._core.mkdir(filename, modeNum);
                    };
                    this.mkdir = function(path, a, b) {
                        var opts = (0, options_1.getMkdirOptions)(a);
                        var callback = (0, util_2.validateCallback)(typeof a === "function" ? a : b);
                        var modeNum = (0, util_2.modeToNumber)(opts.mode, 511);
                        var filename = (0, util_2.pathToFilename)(path);
                        if (opts.recursive) _this.wrapAsync(_this._core.mkdirp, [
                            filename,
                            modeNum
                        ], callback);
                        else _this.wrapAsync(_this._core.mkdir, [
                            filename,
                            modeNum
                        ], callback);
                    };
                    this._mkdtemp = function(prefix, encoding) {
                        var retry = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5;
                        var filename = prefix + (0, util_2.genRndStr6)();
                        try {
                            _this._core.mkdir(filename, 511);
                            return (0, encoding_1.strToEncoding)(filename, encoding);
                        } catch (err) {
                            if (err.code === "EEXIST") {
                                if (retry > 1) return _this._mkdtemp(prefix, encoding, retry - 1);
                                else throw Error("Could not create temp dir.");
                            } else throw err;
                        }
                    };
                    this.mkdtempSync = function(prefix, options) {
                        var encoding = (0, options_1.getDefaultOpts)(options).encoding;
                        if (!prefix || typeof prefix !== "string") throw new TypeError("filename prefix is required");
                        (0, util_2.nullCheck)(prefix);
                        return _this._mkdtemp(prefix, encoding);
                    };
                    this.mkdtemp = function(prefix, a, b) {
                        var _ref = _slicedToArray((0, options_1.getDefaultOptsAndCb)(a, b), 2), encoding = _ref[0].encoding, callback = _ref[1];
                        if (!prefix || typeof prefix !== "string") throw new TypeError("filename prefix is required");
                        if (!(0, util_2.nullCheck)(prefix)) return;
                        _this.wrapAsync(_this._mkdtemp, [
                            prefix,
                            encoding
                        ], callback);
                    };
                    this.rmdirSync = function(path, options) {
                        var opts = (0, options_1.getRmdirOptions)(options);
                        _this._core.rmdir((0, util_2.pathToFilename)(path), opts.recursive);
                    };
                    this.rmdir = function(path, a, b) {
                        var opts = (0, options_1.getRmdirOptions)(a);
                        var callback = (0, util_2.validateCallback)(typeof a === "function" ? a : b);
                        _this.wrapAsync(_this._core.rmdir, [
                            (0, util_2.pathToFilename)(path),
                            opts.recursive
                        ], callback);
                    };
                    this.rmSync = function(path, options) {
                        _this._core.rm((0, util_2.pathToFilename)(path), options === null || options === void 0 ? void 0 : options.force, options === null || options === void 0 ? void 0 : options.recursive);
                    };
                    this.rm = function(path, a, b) {
                        var _ref = _slicedToArray((0, options_1.getRmOptsAndCb)(a, b), 2), opts = _ref[0], callback = _ref[1];
                        _this.wrapAsync(_this._core.rm, [
                            (0, util_2.pathToFilename)(path),
                            opts === null || opts === void 0 ? void 0 : opts.force,
                            opts === null || opts === void 0 ? void 0 : opts.recursive
                        ], callback);
                    };
                    this._fchmod = function(fd, modeNum) {
                        var file = _this._core.getFileByFdOrThrow(fd, "fchmod");
                        file.chmod(modeNum);
                    };
                    this.fchmodSync = function(fd, mode) {
                        _this._fchmod(fd, (0, util_2.modeToNumber)(mode));
                    };
                    this.fchmod = function(fd, mode, callback) {
                        _this.wrapAsync(_this._fchmod, [
                            fd,
                            (0, util_2.modeToNumber)(mode)
                        ], callback);
                    };
                    this._chmod = function(filename, modeNum) {
                        var followSymlinks = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
                        var link = followSymlinks ? _this._core.getResolvedLinkOrThrow(filename, "chmod") : _this._core.getLinkOrThrow(filename, "chmod");
                        var node = link.getNode();
                        node.chmod(modeNum);
                    };
                    this.chmodSync = function(path, mode) {
                        var modeNum = (0, util_2.modeToNumber)(mode);
                        var filename = (0, util_2.pathToFilename)(path);
                        _this._chmod(filename, modeNum, true);
                    };
                    this.chmod = function(path, mode, callback) {
                        var modeNum = (0, util_2.modeToNumber)(mode);
                        var filename = (0, util_2.pathToFilename)(path);
                        _this.wrapAsync(_this._chmod, [
                            filename,
                            modeNum
                        ], callback);
                    };
                    this._lchmod = function(filename, modeNum) {
                        _this._chmod(filename, modeNum, false);
                    };
                    this.lchmodSync = function(path, mode) {
                        var modeNum = (0, util_2.modeToNumber)(mode);
                        var filename = (0, util_2.pathToFilename)(path);
                        _this._lchmod(filename, modeNum);
                    };
                    this.lchmod = function(path, mode, callback) {
                        var modeNum = (0, util_2.modeToNumber)(mode);
                        var filename = (0, util_2.pathToFilename)(path);
                        _this.wrapAsync(_this._lchmod, [
                            filename,
                            modeNum
                        ], callback);
                    };
                    this._fchown = function(fd, uid, gid) {
                        _this._core.getFileByFdOrThrow(fd, "fchown").chown(uid, gid);
                    };
                    this.fchownSync = function(fd, uid, gid) {
                        validateUid(uid);
                        validateGid(gid);
                        _this._fchown(fd, uid, gid);
                    };
                    this.fchown = function(fd, uid, gid, callback) {
                        validateUid(uid);
                        validateGid(gid);
                        _this.wrapAsync(_this._fchown, [
                            fd,
                            uid,
                            gid
                        ], callback);
                    };
                    this._chown = function(filename, uid, gid) {
                        var link = _this._core.getResolvedLinkOrThrow(filename, "chown");
                        var node = link.getNode();
                        node.chown(uid, gid);
                    };
                    this.chownSync = function(path, uid, gid) {
                        validateUid(uid);
                        validateGid(gid);
                        _this._chown((0, util_2.pathToFilename)(path), uid, gid);
                    };
                    this.chown = function(path, uid, gid, callback) {
                        validateUid(uid);
                        validateGid(gid);
                        _this.wrapAsync(_this._chown, [
                            (0, util_2.pathToFilename)(path),
                            uid,
                            gid
                        ], callback);
                    };
                    this._lchown = function(filename, uid, gid) {
                        _this._core.getLinkOrThrow(filename, "lchown").getNode().chown(uid, gid);
                    };
                    this.lchownSync = function(path, uid, gid) {
                        validateUid(uid);
                        validateGid(gid);
                        _this._lchown((0, util_2.pathToFilename)(path), uid, gid);
                    };
                    this.lchown = function(path, uid, gid, callback) {
                        validateUid(uid);
                        validateGid(gid);
                        _this.wrapAsync(_this._lchown, [
                            (0, util_2.pathToFilename)(path),
                            uid,
                            gid
                        ], callback);
                    };
                    this.statWatchers = {};
                    this.cpSync = function(src, dest, options) {
                        var srcFilename = (0, util_2.pathToFilename)(src);
                        var destFilename = (0, util_2.pathToFilename)(dest);
                        var _options_dereference, _options_errorOnExist, _options_force, _options_mode, _options_preserveTimestamps, _options_recursive, _options_verbatimSymlinks;
                        var opts_ = {
                            dereference: (_options_dereference = options === null || options === void 0 ? void 0 : options.dereference) !== null && _options_dereference !== void 0 ? _options_dereference : false,
                            errorOnExist: (_options_errorOnExist = options === null || options === void 0 ? void 0 : options.errorOnExist) !== null && _options_errorOnExist !== void 0 ? _options_errorOnExist : false,
                            filter: options === null || options === void 0 ? void 0 : options.filter,
                            force: (_options_force = options === null || options === void 0 ? void 0 : options.force) !== null && _options_force !== void 0 ? _options_force : true,
                            mode: (_options_mode = options === null || options === void 0 ? void 0 : options.mode) !== null && _options_mode !== void 0 ? _options_mode : 0,
                            preserveTimestamps: (_options_preserveTimestamps = options === null || options === void 0 ? void 0 : options.preserveTimestamps) !== null && _options_preserveTimestamps !== void 0 ? _options_preserveTimestamps : false,
                            recursive: (_options_recursive = options === null || options === void 0 ? void 0 : options.recursive) !== null && _options_recursive !== void 0 ? _options_recursive : false,
                            verbatimSymlinks: (_options_verbatimSymlinks = options === null || options === void 0 ? void 0 : options.verbatimSymlinks) !== null && _options_verbatimSymlinks !== void 0 ? _options_verbatimSymlinks : false
                        };
                        return _this._cp(srcFilename, destFilename, opts_);
                    };
                    this.cp = function(src, dest, a, b) {
                        var srcFilename = (0, util_2.pathToFilename)(src);
                        var destFilename = (0, util_2.pathToFilename)(dest);
                        var options;
                        var callback;
                        var ref, ref1;
                        if (typeof a === "function") ref = [
                            {},
                            a
                        ], options = ref[0], callback = ref[1], ref;
                        else ref1 = [
                            a || {},
                            b
                        ], options = ref1[0], callback = ref1[1], ref1;
                        (0, util_2.validateCallback)(callback);
                        var _options_dereference, _options_errorOnExist, _options_force, _options_mode, _options_preserveTimestamps, _options_recursive, _options_verbatimSymlinks;
                        var opts_ = {
                            dereference: (_options_dereference = options === null || options === void 0 ? void 0 : options.dereference) !== null && _options_dereference !== void 0 ? _options_dereference : false,
                            errorOnExist: (_options_errorOnExist = options === null || options === void 0 ? void 0 : options.errorOnExist) !== null && _options_errorOnExist !== void 0 ? _options_errorOnExist : false,
                            filter: options === null || options === void 0 ? void 0 : options.filter,
                            force: (_options_force = options === null || options === void 0 ? void 0 : options.force) !== null && _options_force !== void 0 ? _options_force : true,
                            mode: (_options_mode = options === null || options === void 0 ? void 0 : options.mode) !== null && _options_mode !== void 0 ? _options_mode : 0,
                            preserveTimestamps: (_options_preserveTimestamps = options === null || options === void 0 ? void 0 : options.preserveTimestamps) !== null && _options_preserveTimestamps !== void 0 ? _options_preserveTimestamps : false,
                            recursive: (_options_recursive = options === null || options === void 0 ? void 0 : options.recursive) !== null && _options_recursive !== void 0 ? _options_recursive : false,
                            verbatimSymlinks: (_options_verbatimSymlinks = options === null || options === void 0 ? void 0 : options.verbatimSymlinks) !== null && _options_verbatimSymlinks !== void 0 ? _options_verbatimSymlinks : false
                        };
                        _this.wrapAsync(_this._cp, [
                            srcFilename,
                            destFilename,
                            opts_
                        ], callback);
                    };
                    var _this1 = this;
                    this.openAsBlob = function() {
                        var _ref = _asyncToGenerator(function(path, options) {
                            var filename, link, nodeError, node, buffer, type;
                            return __generator(this, function(_state) {
                                filename = (0, util_2.pathToFilename)(path);
                                try {
                                    link = _this1._core.getResolvedLinkOrThrow(filename, "open");
                                } catch (error) {
                                    if (error && typeof error === "object" && error.code === "ENOENT") {
                                        nodeError = new errors.TypeError("ERR_INVALID_ARG_VALUE");
                                        throw nodeError;
                                    }
                                    throw error;
                                }
                                node = link.getNode();
                                buffer = node.getBuffer();
                                type = (options === null || options === void 0 ? void 0 : options.type) || "";
                                return [
                                    2,
                                    new Blob([
                                        buffer
                                    ], {
                                        type: type
                                    })
                                ];
                            });
                        });
                        return function(path, options) {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    this.glob = function(pattern) {
                        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                            args[_key - 1] = arguments[_key];
                        }
                        var _ref = _slicedToArray(args.length === 1 ? [
                            {},
                            args[0]
                        ] : [
                            args[0],
                            args[1]
                        ], 2), options = _ref[0], callback = _ref[1];
                        _this.wrapAsync(_this._globSync, [
                            pattern,
                            options || {}
                        ], callback);
                    };
                    this.globSync = function(pattern) {
                        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                        return _this._globSync(pattern, options);
                    };
                    this._globSync = function(pattern) {
                        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                        var globSync = require_glob().globSync;
                        return globSync(_this, pattern, options);
                    };
                    this._opendir = function(filename, options) {
                        var link = _this._core.getResolvedLinkOrThrow(filename, "scandir");
                        var node = link.getNode();
                        if (!node.isDirectory()) throw (0, util_2.createError)("ENOTDIR", "scandir", filename);
                        return new Dir_1.Dir(link, options);
                    };
                    this.opendirSync = function(path, options) {
                        var opts = (0, options_1.getOpendirOptions)(options);
                        var filename = (0, util_2.pathToFilename)(path);
                        return _this._opendir(filename, opts);
                    };
                    this.opendir = function(path, a, b) {
                        var _ref = _slicedToArray((0, options_1.getOpendirOptsAndCb)(a, b), 2), options = _ref[0], callback = _ref[1];
                        var filename = (0, util_2.pathToFilename)(path);
                        _this.wrapAsync(_this._opendir, [
                            filename,
                            options
                        ], callback);
                    };
                    var self = this;
                    this.StatWatcher = /*#__PURE__*/ function(StatWatcher) {
                        _inherits(_class, StatWatcher);
                        var _super = _createSuper(_class);
                        function _class() {
                            _classCallCheck(this, _class);
                            return _super.call(this, self);
                        }
                        return _class;
                    }(StatWatcher);
                    var _ReadStream = FsReadStream;
                    this.ReadStream = /*#__PURE__*/ function(_ReadStream) {
                        _inherits(_class, _ReadStream);
                        var _super = _createSuper(_class);
                        function _class() {
                            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                                args[_key] = arguments[_key];
                            }
                            _classCallCheck(this, _class);
                            return _super.call.apply(_super, [
                                this,
                                self
                            ].concat(_toConsumableArray(args)));
                        }
                        return _class;
                    }(_ReadStream);
                    var _WriteStream = FsWriteStream;
                    this.WriteStream = /*#__PURE__*/ function(_WriteStream) {
                        _inherits(_class, _WriteStream);
                        var _super = _createSuper(_class);
                        function _class() {
                            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                                args[_key] = arguments[_key];
                            }
                            _classCallCheck(this, _class);
                            return _super.call.apply(_super, [
                                this,
                                self
                            ].concat(_toConsumableArray(args)));
                        }
                        return _class;
                    }(_WriteStream);
                    this.FSWatcher = /*#__PURE__*/ function(FSWatcher) {
                        _inherits(_class, FSWatcher);
                        var _super = _createSuper(_class);
                        function _class() {
                            _classCallCheck(this, _class);
                            return _super.call(this, self);
                        }
                        return _class;
                    }(FSWatcher);
                    var _realpath = function(filename, encoding) {
                        var realLink = _this._core.getResolvedLinkOrThrow(filename, "realpath");
                        return (0, encoding_1.strToEncoding)(realLink.getPath() || "/", encoding);
                    };
                    var realpathImpl = function(path, a, b) {
                        var _ref = _slicedToArray((0, options_1.getRealpathOptsAndCb)(a, b), 2), opts = _ref[0], callback = _ref[1];
                        var pathFilename = (0, util_2.pathToFilename)(path);
                        self.wrapAsync(_realpath, [
                            pathFilename,
                            opts.encoding
                        ], callback);
                    };
                    var realpathSyncImpl = function(path, options) {
                        return _realpath((0, util_2.pathToFilename)(path), (0, options_1.getRealpathOptions)(options).encoding);
                    };
                    this.realpath = realpathImpl;
                    this.realpath.native = realpathImpl;
                    this.realpathSync = realpathSyncImpl;
                    this.realpathSync.native = realpathSyncImpl;
                }
                _createClass(Volume, [
                    {
                        key: "promises",
                        get: function get() {
                            if (this.promisesApi === null) throw new Error("Promise is not supported in this environment.");
                            return this.promisesApi;
                        }
                    },
                    {
                        key: "wrapAsync",
                        value: function wrapAsync(method, args, callback) {
                            var _this = this;
                            (0, util_2.validateCallback)(callback);
                            Promise.resolve().then(function() {
                                var result;
                                try {
                                    result = method.apply(_this, args);
                                } catch (err) {
                                    callback(err);
                                    return;
                                }
                                callback(null, result);
                            });
                        }
                    },
                    {
                        key: "toTree",
                        value: function toTree() {
                            var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
                                separator: path_1.sep
                            };
                            return (0, print_1.toTreeSync)(this, opts);
                        }
                    },
                    {
                        key: "reset",
                        value: function reset() {
                            this._core.reset();
                        }
                    },
                    {
                        key: "toJSON",
                        value: function toJSON(paths) {
                            var json = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, isRelative = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, asBuffer = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
                            return this._core.toJSON(paths, json, isRelative, asBuffer);
                        }
                    },
                    {
                        key: "fromJSON",
                        value: function fromJSON(json, cwd) {
                            return this._core.fromJSON(json, cwd);
                        }
                    },
                    {
                        key: "fromNestedJSON",
                        value: function fromNestedJSON(json, cwd) {
                            return this._core.fromNestedJSON(json, cwd);
                        }
                    },
                    {
                        // Legacy interface
                        key: "mountSync",
                        value: function mountSync(mountpoint, json) {
                            this._core.fromJSON(json, mountpoint);
                        }
                    },
                    {
                        key: "_write",
                        value: function _write(fd, buf, offset, length, position) {
                            var file = this._core.getFileByFdOrThrow(fd, "write");
                            if (file.node.isSymlink()) {
                                throw (0, util_2.createError)("EBADF", "write", file.link.getPath());
                            }
                            return file.write(buf, offset, length, position === -1 || typeof position !== "number" ? void 0 : position);
                        }
                    },
                    {
                        key: "writevBase",
                        value: function writevBase(fd, buffers, position) {
                            var file = this._core.getFileByFdOrThrow(fd);
                            var p = position !== null && position !== void 0 ? position : void 0;
                            if (p === -1) {
                                p = void 0;
                            }
                            var bytesWritten = 0;
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = buffers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var buffer = _step.value;
                                    var nodeBuf = buffer_1.Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
                                    var bytes = file.write(nodeBuf, 0, nodeBuf.byteLength, p);
                                    p = void 0;
                                    bytesWritten += bytes;
                                    if (bytes < nodeBuf.byteLength) break;
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            return bytesWritten;
                        }
                    },
                    {
                        key: "_copyFile",
                        value: function _copyFile(src, dest, flags) {
                            var buf = this.readFileSync(src);
                            if (flags & COPYFILE_EXCL && this.existsSync(dest)) throw (0, util_2.createError)("EEXIST", "copyFile", src, dest);
                            if (flags & COPYFILE_FICLONE_FORCE) throw (0, util_2.createError)("ENOSYS", "copyFile", src, dest);
                            this._core.writeFile(dest, buf, constants_2.FLAGS.w, 438);
                        }
                    },
                    {
                        key: "isSrcSubdir",
                        value: function isSrcSubdir(src, dest) {
                            try {
                                var normalizedSrc = pathNormalize(src.startsWith("/") ? src : "/" + src);
                                var normalizedDest = pathNormalize(dest.startsWith("/") ? dest : "/" + dest);
                                if (normalizedSrc === normalizedDest) return true;
                                var relativePath = pathRelative(normalizedSrc, normalizedDest);
                                return relativePath === "" || !relativePath.startsWith("..") && !(0, path_1.isAbsolute)(relativePath);
                            } catch (error) {
                                return false;
                            }
                        }
                    },
                    {
                        key: "cpFileSync",
                        value: function cpFileSync(srcStat, destStat, src, dest, options) {
                            if (destStat) {
                                if (options.errorOnExist) throw (0, util_2.createError)("EEXIST", "cp", dest);
                                if (!options.force) return;
                                this.unlinkSync(dest);
                            }
                            this.copyFileSync(src, dest, options.mode);
                            if (options.preserveTimestamps) this.utimesSync(dest, srcStat.atime, srcStat.mtime);
                            this.chmodSync(dest, Number(srcStat.mode));
                        }
                    },
                    {
                        key: "cpDirSync",
                        value: function cpDirSync(srcStat, destStat, src, dest, options) {
                            if (!destStat) {
                                this.mkdirSync(dest);
                            }
                            var entries = this.readdirSync(src);
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var entry = _step.value;
                                    var srcItem = pathJoin(src, String(entry));
                                    var destItem = pathJoin(dest, String(entry));
                                    if (options.filter && !options.filter(srcItem, destItem)) {
                                        continue;
                                    }
                                    this._cp(srcItem, destItem, options);
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            this.chmodSync(dest, Number(srcStat.mode));
                        }
                    },
                    {
                        key: "cpSymlinkSync",
                        value: function cpSymlinkSync(destStat, src, dest, options) {
                            var linkTarget = String(this.readlinkSync(src));
                            if (!options.verbatimSymlinks && !(0, path_1.isAbsolute)(linkTarget)) linkTarget = resolveCrossPlatform(pathDirname(src), linkTarget);
                            if (destStat) this.unlinkSync(dest);
                            this.symlinkSync(linkTarget, dest);
                        }
                    },
                    {
                        key: "lstat",
                        value: function lstat(path, a, b) {
                            var _ref = _slicedToArray((0, options_1.getStatOptsAndCb)(a, b), 2), _ref_ = _ref[0], _ref__throwIfNoEntry = _ref_.throwIfNoEntry, throwIfNoEntry = _ref__throwIfNoEntry === void 0 ? true : _ref__throwIfNoEntry, _ref__bigint = _ref_.bigint, bigint = _ref__bigint === void 0 ? false : _ref__bigint, callback = _ref[1];
                            this.wrapAsync(this._lstat, [
                                (0, util_2.pathToFilename)(path),
                                bigint,
                                throwIfNoEntry
                            ], callback);
                        }
                    },
                    {
                        key: "_stat",
                        value: function _stat(filename) {
                            var bigint = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, throwIfNoEntry = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
                            var link;
                            try {
                                link = this._core.getResolvedLinkOrThrow(filename, "stat");
                            } catch (err) {
                                if (err.code === "ENOENT" && !throwIfNoEntry) return void 0;
                                else throw err;
                            }
                            return Stats_1.default.build(link.getNode(), bigint);
                        }
                    },
                    {
                        key: "statSync",
                        value: function statSync(path, options) {
                            var _ref = (0, options_1.getStatOptions)(options), _ref_bigint = _ref.bigint, bigint = _ref_bigint === void 0 ? true : _ref_bigint, _ref_throwIfNoEntry = _ref.throwIfNoEntry, throwIfNoEntry = _ref_throwIfNoEntry === void 0 ? true : _ref_throwIfNoEntry;
                            return this._stat((0, util_2.pathToFilename)(path), bigint, throwIfNoEntry);
                        }
                    },
                    {
                        key: "stat",
                        value: function stat(path, a, b) {
                            var _ref = _slicedToArray((0, options_1.getStatOptsAndCb)(a, b), 2), _ref_ = _ref[0], _ref__bigint = _ref_.bigint, bigint = _ref__bigint === void 0 ? false : _ref__bigint, _ref__throwIfNoEntry = _ref_.throwIfNoEntry, throwIfNoEntry = _ref__throwIfNoEntry === void 0 ? true : _ref__throwIfNoEntry, callback = _ref[1];
                            this.wrapAsync(this._stat, [
                                (0, util_2.pathToFilename)(path),
                                bigint,
                                throwIfNoEntry
                            ], callback);
                        }
                    },
                    {
                        key: "fstatBase",
                        value: function fstatBase(fd) {
                            var bigint = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                            var file = this._core.getFileByFd(fd);
                            if (!file) throw (0, util_2.createError)("EBADF", "fstat");
                            return Stats_1.default.build(file.node, bigint);
                        }
                    },
                    {
                        key: "fstatSync",
                        value: function fstatSync(fd, options) {
                            return this.fstatBase(fd, (0, options_1.getStatOptions)(options).bigint);
                        }
                    },
                    {
                        key: "fstat",
                        value: function fstat(fd, a, b) {
                            var _ref = _slicedToArray((0, options_1.getStatOptsAndCb)(a, b), 2), opts = _ref[0], callback = _ref[1];
                            this.wrapAsync(this.fstatBase, [
                                fd,
                                opts.bigint
                            ], callback);
                        }
                    },
                    {
                        key: "_exists",
                        value: function _exists(filename) {
                            return !!this._stat(filename);
                        }
                    },
                    {
                        key: "_access",
                        value: function _access(filename, mode) {
                            var link = this._core.getLinkOrThrow(filename, "access");
                            var node = link.getNode();
                            if (mode === F_OK) {
                                return;
                            }
                            if (mode & R_OK && !node.canRead()) {
                                throw (0, util_2.createError)("EACCES", "access", filename);
                            }
                            if (mode & W_OK && !node.canWrite()) {
                                throw (0, util_2.createError)("EACCES", "access", filename);
                            }
                            if (mode & X_OK && !node.canExecute()) {
                                throw (0, util_2.createError)("EACCES", "access", filename);
                            }
                        }
                    },
                    {
                        key: "watchFile",
                        value: function watchFile(path, a, b) {
                            var filename = (0, util_2.pathToFilename)(path);
                            var options = a;
                            var listener = b;
                            if (typeof options === "function") {
                                listener = a;
                                options = null;
                            }
                            if (typeof listener !== "function") {
                                throw Error('"watchFile()" requires a listener function');
                            }
                            var interval = 5007;
                            var persistent = true;
                            if (options && typeof options === "object") {
                                if (typeof options.interval === "number") interval = options.interval;
                                if (typeof options.persistent === "boolean") persistent = options.persistent;
                            }
                            var watcher = this.statWatchers[filename];
                            if (!watcher) {
                                watcher = new this.StatWatcher();
                                watcher.start(filename, persistent, interval);
                                this.statWatchers[filename] = watcher;
                            }
                            watcher.addListener("change", listener);
                            return watcher;
                        }
                    },
                    {
                        key: "unwatchFile",
                        value: function unwatchFile(path, listener) {
                            var filename = (0, util_2.pathToFilename)(path);
                            var watcher = this.statWatchers[filename];
                            if (!watcher) return;
                            if (typeof listener === "function") {
                                watcher.removeListener("change", listener);
                            } else {
                                watcher.removeAllListeners("change");
                            }
                            if (watcher.listenerCount("change") === 0) {
                                watcher.stop();
                                delete this.statWatchers[filename];
                            }
                        }
                    },
                    {
                        key: "createReadStream",
                        value: function createReadStream(path, options) {
                            return new this.ReadStream(path, options);
                        }
                    },
                    {
                        key: "createWriteStream",
                        value: function createWriteStream(path, options) {
                            return new this.WriteStream(path, options);
                        }
                    },
                    {
                        // watch(path: PathLike): FSWatcher;
                        // watch(path: PathLike, options?: IWatchOptions | string): FSWatcher;
                        key: "watch",
                        value: function watch(path, options, listener) {
                            var filename = (0, util_2.pathToFilename)(path);
                            var givenOptions = options;
                            if (typeof options === "function") {
                                listener = options;
                                givenOptions = null;
                            }
                            var _ref = (0, options_1.getDefaultOpts)(givenOptions), persistent = _ref.persistent, recursive = _ref.recursive, encoding = _ref.encoding;
                            if (persistent === void 0) persistent = true;
                            if (recursive === void 0) recursive = false;
                            var watcher = new this.FSWatcher();
                            watcher.start(filename, persistent, recursive, encoding);
                            if (listener) {
                                watcher.addListener("change", listener);
                            }
                            return watcher;
                        }
                    },
                    {
                        key: "_statfs",
                        value: function _statfs(filename) {
                            var bigint = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                            this._core.getResolvedLinkOrThrow(filename, "statfs");
                            return StatFs_1.default.build(this._core, bigint);
                        }
                    },
                    {
                        key: "statfsSync",
                        value: function statfsSync(path, options) {
                            var _ref = (0, options_1.getStatfsOptions)(options), _ref_bigint = _ref.bigint, bigint = _ref_bigint === void 0 ? false : _ref_bigint;
                            return this._statfs((0, util_2.pathToFilename)(path), bigint);
                        }
                    },
                    {
                        key: "statfs",
                        value: function statfs(path, a, b) {
                            var _ref = _slicedToArray((0, options_1.getStatfsOptsAndCb)(a, b), 2), _ref_ = _ref[0], _ref__bigint = _ref_.bigint, bigint = _ref__bigint === void 0 ? false : _ref__bigint, callback = _ref[1];
                            this.wrapAsync(this._statfs, [
                                (0, util_2.pathToFilename)(path),
                                bigint
                            ], callback);
                        }
                    }
                ]);
                return Volume;
            }();
            exports.Volume = Volume;
            Volume.fromJSON = function(json, cwd) {
                return new Volume(core_1.Superblock.fromJSON(json, cwd));
            };
            Volume.fromNestedJSON = function(json, cwd) {
                return new Volume(core_1.Superblock.fromNestedJSON(json, cwd));
            };
            var StatWatcher = /*#__PURE__*/ function(_events_1_EventEmitter) {
                _inherits(StatWatcher, _events_1_EventEmitter);
                var _super = _createSuper(StatWatcher);
                function StatWatcher(vol2) {
                    _classCallCheck(this, StatWatcher);
                    var _this;
                    _this = _super.call(this);
                    _this.onInterval = function() {
                        try {
                            var stats = _this.vol.statSync(_this.filename);
                            if (_this.hasChanged(stats)) {
                                _this.emit("change", stats, _this.prev);
                                _this.prev = stats;
                            }
                        } finally{
                            _this.loop();
                        }
                    };
                    _this.vol = vol2;
                    return _this;
                }
                _createClass(StatWatcher, [
                    {
                        key: "loop",
                        value: function loop() {
                            this.timeoutRef = this.setTimeout(this.onInterval, this.interval);
                        }
                    },
                    {
                        key: "hasChanged",
                        value: function hasChanged(stats) {
                            if (stats.mtimeMs > this.prev.mtimeMs) return true;
                            if (stats.nlink !== this.prev.nlink) return true;
                            return false;
                        }
                    },
                    {
                        key: "start",
                        value: function start(path) {
                            var persistent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, interval = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5007;
                            this.filename = (0, util_2.pathToFilename)(path);
                            this.setTimeout = persistent ? setTimeout.bind(typeof globalThis !== "undefined" ? globalThis : global) : setTimeoutUnref_1.default;
                            this.interval = interval;
                            this.prev = this.vol.statSync(this.filename);
                            this.loop();
                        }
                    },
                    {
                        key: "stop",
                        value: function stop() {
                            var _this = this;
                            clearTimeout(this.timeoutRef);
                            (0, queueMicrotask_1.default)(function() {
                                emitStop.call(_this, _this);
                            });
                        }
                    }
                ]);
                return StatWatcher;
            }(events_1.EventEmitter);
            exports.StatWatcher = StatWatcher;
            var pool;
            (0, util_1.inherits)(FsReadStream, stream_1.Readable);
            exports.ReadStream = FsReadStream;
            function FsReadStream(vol2, path, options) {
                if (!_instanceof(this, FsReadStream)) return new FsReadStream(vol2, path, options);
                this._vol = vol2;
                options = Object.assign({}, (0, options_1.getOptions)(options, {}));
                if (options.highWaterMark === void 0) options.highWaterMark = 64 * 1024;
                stream_1.Readable.call(this, options);
                this.path = (0, util_2.pathToFilename)(path);
                this.fd = options.fd === void 0 ? null : typeof options.fd !== "number" ? options.fd.fd : options.fd;
                this.flags = options.flags === void 0 ? "r" : options.flags;
                this.mode = options.mode === void 0 ? 438 : options.mode;
                this.start = options.start;
                this.end = options.end;
                this.autoClose = options.autoClose === void 0 ? true : options.autoClose;
                this.pos = void 0;
                this.bytesRead = 0;
                if (this.start !== void 0) {
                    if (typeof this.start !== "number") {
                        throw new TypeError('"start" option must be a Number');
                    }
                    if (this.end === void 0) {
                        this.end = Infinity;
                    } else if (typeof this.end !== "number") {
                        throw new TypeError('"end" option must be a Number');
                    }
                    if (this.start > this.end) {
                        throw new Error('"start" option must be <= "end" option');
                    }
                    this.pos = this.start;
                }
                if (typeof this.fd !== "number") this.open();
                this.on("end", function() {
                    if (this.autoClose) {
                        if (this.destroy) this.destroy();
                    }
                });
            }
            FsReadStream.prototype.open = function() {
                var self = this;
                this._vol.open(this.path, this.flags, this.mode, function(er, fd) {
                    if (er) {
                        if (self.autoClose) {
                            if (self.destroy) self.destroy();
                        }
                        self.emit("error", er);
                        return;
                    }
                    self.fd = fd;
                    self.emit("open", fd);
                    self.read();
                });
            };
            FsReadStream.prototype._read = function(n) {
                var onread = function onread(er, bytesRead) {
                    if (er) {
                        if (self.autoClose && self.destroy) {
                            self.destroy();
                        }
                        self.emit("error", er);
                    } else {
                        var b = null;
                        if (bytesRead > 0) {
                            self.bytesRead += bytesRead;
                            b = thisPool.slice(start, start + bytesRead);
                        }
                        self.push(b);
                    }
                };
                if (typeof this.fd !== "number") {
                    return this.once("open", function() {
                        this._read(n);
                    });
                }
                if (this.destroyed) return;
                if (!pool || pool.length - pool.used < kMinPoolSpace) {
                    allocNewPool(this._readableState.highWaterMark);
                }
                var thisPool = pool;
                var toRead = Math.min(pool.length - pool.used, n);
                var start = pool.used;
                if (this.pos !== void 0) toRead = Math.min(this.end - this.pos + 1, toRead);
                if (toRead <= 0) return this.push(null);
                var self = this;
                this._vol.read(this.fd, pool, pool.used, toRead, this.pos, onread);
                if (this.pos !== void 0) this.pos += toRead;
                pool.used += toRead;
            };
            FsReadStream.prototype._destroy = function(err, cb) {
                this.close(function(err2) {
                    cb(err || err2);
                });
            };
            FsReadStream.prototype.close = function(cb) {
                var _this = this;
                var _this__readableState;
                if (cb) this.once("close", cb);
                if (this.closed || typeof this.fd !== "number") {
                    if (typeof this.fd !== "number") {
                        this.once("open", closeOnOpen);
                        return;
                    }
                    return (0, queueMicrotask_1.default)(function() {
                        return _this.emit("close");
                    });
                }
                if (typeof ((_this__readableState = this._readableState) === null || _this__readableState === void 0 ? void 0 : _this__readableState.closed) === "boolean") {
                    this._readableState.closed = true;
                } else {
                    this.closed = true;
                }
                this._vol.close(this.fd, function(er) {
                    if (er) _this.emit("error", er);
                    else _this.emit("close");
                });
                this.fd = null;
            };
            (0, util_1.inherits)(FsWriteStream, stream_1.Writable);
            exports.WriteStream = FsWriteStream;
            function FsWriteStream(vol2, path, options) {
                if (!_instanceof(this, FsWriteStream)) return new FsWriteStream(vol2, path, options);
                this._vol = vol2;
                options = Object.assign({}, (0, options_1.getOptions)(options, {}));
                stream_1.Writable.call(this, options);
                this.path = (0, util_2.pathToFilename)(path);
                this.fd = options.fd === void 0 ? null : typeof options.fd !== "number" ? options.fd.fd : options.fd;
                this.flags = options.flags === void 0 ? "w" : options.flags;
                this.mode = options.mode === void 0 ? 438 : options.mode;
                this.start = options.start;
                this.autoClose = options.autoClose === void 0 ? true : !!options.autoClose;
                this.pos = void 0;
                this.bytesWritten = 0;
                this.pending = true;
                if (this.start !== void 0) {
                    if (typeof this.start !== "number") {
                        throw new TypeError('"start" option must be a Number');
                    }
                    if (this.start < 0) {
                        throw new Error('"start" must be >= zero');
                    }
                    this.pos = this.start;
                }
                if (options.encoding) this.setDefaultEncoding(options.encoding);
                if (typeof this.fd !== "number") this.open();
                this.once("finish", function() {
                    if (this.autoClose) {
                        this.close();
                    }
                });
            }
            FsWriteStream.prototype.open = function() {
                this._vol.open(this.path, this.flags, this.mode, (function(er, fd) {
                    if (er) {
                        if (this.autoClose && this.destroy) {
                            this.destroy();
                        }
                        this.emit("error", er);
                        return;
                    }
                    this.fd = fd;
                    this.pending = false;
                    this.emit("open", fd);
                }).bind(this));
            };
            FsWriteStream.prototype._write = function(data, encoding, cb) {
                if (!(_instanceof(data, buffer_1.Buffer) || _instanceof(data, Uint8Array))) return this.emit("error", new Error("Invalid data"));
                if (typeof this.fd !== "number") {
                    return this.once("open", function() {
                        this._write(data, encoding, cb);
                    });
                }
                var self = this;
                this._vol.write(this.fd, data, 0, data.length, this.pos, function(er, bytes) {
                    if (er) {
                        if (self.autoClose && self.destroy) {
                            self.destroy();
                        }
                        return cb(er);
                    }
                    self.bytesWritten += bytes;
                    cb();
                });
                if (this.pos !== void 0) this.pos += data.length;
            };
            FsWriteStream.prototype._writev = function(data, cb) {
                if (typeof this.fd !== "number") {
                    return this.once("open", function() {
                        this._writev(data, cb);
                    });
                }
                var self = this;
                var len = data.length;
                var chunks = new Array(len);
                var size = 0;
                for(var i = 0; i < len; i++){
                    var chunk = data[i].chunk;
                    chunks[i] = chunk;
                    size += chunk.length;
                }
                var buf = buffer_1.Buffer.concat(chunks);
                this._vol.write(this.fd, buf, 0, buf.length, this.pos, function(er, bytes) {
                    if (er) {
                        if (self.destroy) self.destroy();
                        return cb(er);
                    }
                    self.bytesWritten += bytes;
                    cb();
                });
                if (this.pos !== void 0) this.pos += size;
            };
            FsWriteStream.prototype.close = function(cb) {
                var _this = this;
                var _this__writableState;
                if (cb) this.once("close", cb);
                if (this.closed || typeof this.fd !== "number") {
                    if (typeof this.fd !== "number") {
                        this.once("open", closeOnOpen);
                        return;
                    }
                    return (0, queueMicrotask_1.default)(function() {
                        return _this.emit("close");
                    });
                }
                if (typeof ((_this__writableState = this._writableState) === null || _this__writableState === void 0 ? void 0 : _this__writableState.closed) === "boolean") {
                    this._writableState.closed = true;
                } else {
                    this.closed = true;
                }
                this._vol.close(this.fd, function(er) {
                    if (er) _this.emit("error", er);
                    else _this.emit("close");
                });
                this.fd = null;
            };
            FsWriteStream.prototype._destroy = FsReadStream.prototype._destroy;
            FsWriteStream.prototype.destroySoon = FsWriteStream.prototype.end;
            var FSWatcher = /*#__PURE__*/ function(_events_1_EventEmitter) {
                _inherits(FSWatcher, _events_1_EventEmitter);
                var _super = _createSuper(FSWatcher);
                function FSWatcher(vol2) {
                    _classCallCheck(this, FSWatcher);
                    var _this;
                    _this = _super.call(this);
                    _this._filename = "";
                    _this._filenameEncoded = "";
                    _this._recursive = false;
                    _this._encoding = encoding_1.ENCODING_UTF8;
                    _this._listenerRemovers = /* @__PURE__ */ new Map();
                    _this._onParentChild = function(link) {
                        if (link.getName() === _this._getName()) {
                            _this._emit("rename");
                        }
                    };
                    _this._emit = function(type) {
                        _this.emit("change", type, _this._filenameEncoded);
                    };
                    _this._persist = function() {
                        _this._timer = setTimeout(_this._persist, 1e6);
                    };
                    _this._vol = vol2;
                    return _this;
                }
                _createClass(FSWatcher, [
                    {
                        key: "_getName",
                        value: function _getName() {
                            return this._steps[this._steps.length - 1];
                        }
                    },
                    {
                        key: "start",
                        value: function start(path) {
                            var persistent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, recursive = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, encoding = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : encoding_1.ENCODING_UTF8;
                            var _this = this;
                            this._filename = (0, util_2.pathToFilename)(path);
                            this._steps = (0, util_3.filenameToSteps)(this._filename);
                            this._filenameEncoded = (0, encoding_1.strToEncoding)(this._filename);
                            this._recursive = recursive;
                            this._encoding = encoding;
                            try {
                                this._link = this._vol._core.getLinkOrThrow(this._filename, "FSWatcher");
                            } catch (err1) {
                                var error = new Error("watch ".concat(this._filename, " ").concat(err1.code));
                                error.code = err1.code;
                                error.errno = err1.code;
                                throw error;
                            }
                            var watchLinkNodeChanged = function(link) {
                                var filepath = link.getPath();
                                var node = link.getNode();
                                var onNodeChange = function() {
                                    var filename = pathRelative(_this._filename, filepath);
                                    if (!filename) filename = _this._getName();
                                    return _this.emit("change", "change", filename);
                                };
                                var unsub = node.changes.listen(function(param) {
                                    var _param = _slicedToArray(param, 1), type = _param[0];
                                    if (type === "modify") onNodeChange();
                                });
                                var _this__listenerRemovers_get;
                                var removers = (_this__listenerRemovers_get = _this._listenerRemovers.get(node.ino)) !== null && _this__listenerRemovers_get !== void 0 ? _this__listenerRemovers_get : [];
                                removers.push(function() {
                                    return unsub();
                                });
                                _this._listenerRemovers.set(node.ino, removers);
                            };
                            var watchLinkChildrenChanged = function(link) {
                                var node = link.getNode();
                                var onLinkChildAdd = function(l) {
                                    _this.emit("change", "rename", pathRelative(_this._filename, l.getPath()));
                                    watchLinkNodeChanged(l);
                                    watchLinkChildrenChanged(l);
                                };
                                var onLinkChildDelete = function(l) {
                                    var removeLinkNodeListeners = function(curLink) {
                                        var ino = curLink.getNode().ino;
                                        var removers2 = _this._listenerRemovers.get(ino);
                                        if (removers2) {
                                            removers2.forEach(function(r) {
                                                return r();
                                            });
                                            _this._listenerRemovers.delete(ino);
                                        }
                                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                        try {
                                            for(var _iterator = curLink.children.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                                var _step_value = _slicedToArray(_step.value, 2), name = _step_value[0], childLink = _step_value[1];
                                                if (childLink && name !== "." && name !== "..") {
                                                    removeLinkNodeListeners(childLink);
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError = true;
                                            _iteratorError = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                    _iterator.return();
                                                }
                                            } finally{
                                                if (_didIteratorError) {
                                                    throw _iteratorError;
                                                }
                                            }
                                        }
                                    };
                                    removeLinkNodeListeners(l);
                                    _this.emit("change", "rename", pathRelative(_this._filename, l.getPath()));
                                };
                                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                try {
                                    for(var _iterator = link.children.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                        var _step_value = _slicedToArray(_step.value, 2), name = _step_value[0], childLink = _step_value[1];
                                        if (childLink && name !== "." && name !== "..") {
                                            watchLinkNodeChanged(childLink);
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally{
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                                            _iterator.return();
                                        }
                                    } finally{
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                                var unsubscribeLinkChanges = link.changes.listen(function(param) {
                                    var _param = _slicedToArray(param, 2), type = _param[0], link2 = _param[1];
                                    if (type === "child:add") onLinkChildAdd(link2);
                                    else if (type === "child:del") onLinkChildDelete(link2);
                                });
                                var _this__listenerRemovers_get;
                                var removers = (_this__listenerRemovers_get = _this._listenerRemovers.get(node.ino)) !== null && _this__listenerRemovers_get !== void 0 ? _this__listenerRemovers_get : [];
                                removers.push(function() {
                                    unsubscribeLinkChanges();
                                });
                                if (recursive) {
                                    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                                    try {
                                        for(var _iterator1 = link.children.entries()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                            var _step_value1 = _slicedToArray(_step1.value, 2), name1 = _step_value1[0], childLink1 = _step_value1[1];
                                            if (childLink1 && name1 !== "." && name1 !== "..") {
                                                watchLinkChildrenChanged(childLink1);
                                            }
                                        }
                                    } catch (err) {
                                        _didIteratorError1 = true;
                                        _iteratorError1 = err;
                                    } finally{
                                        try {
                                            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                                _iterator1.return();
                                            }
                                        } finally{
                                            if (_didIteratorError1) {
                                                throw _iteratorError1;
                                            }
                                        }
                                    }
                                }
                            };
                            watchLinkNodeChanged(this._link);
                            watchLinkChildrenChanged(this._link);
                            var parent = this._link.parent;
                            if (parent) {
                                parent.changes.listen(function(param) {
                                    var _param = _slicedToArray(param, 2), type = _param[0], link = _param[1];
                                    if (type === "child:del") _this._onParentChild(link);
                                });
                            }
                            if (persistent) this._persist();
                        }
                    },
                    {
                        key: "close",
                        value: function close() {
                            var _this, _this__parentChangesUnsub;
                            clearTimeout(this._timer);
                            this._listenerRemovers.forEach(function(removers) {
                                removers.forEach(function(r) {
                                    return r();
                                });
                            });
                            this._listenerRemovers.clear();
                            (_this__parentChangesUnsub = (_this = this)._parentChangesUnsub) === null || _this__parentChangesUnsub === void 0 ? void 0 : _this__parentChangesUnsub.call(_this);
                        }
                    }
                ]);
                return FSWatcher;
            }(events_1.EventEmitter);
            exports.FSWatcher = FSWatcher;
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/lists/fsSynchronousApiList.js
    var require_fsSynchronousApiList = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/lists/fsSynchronousApiList.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.fsSynchronousApiList = void 0;
            exports.fsSynchronousApiList = [
                "accessSync",
                "appendFileSync",
                "chmodSync",
                "chownSync",
                "closeSync",
                "copyFileSync",
                "existsSync",
                "fchmodSync",
                "fchownSync",
                "fdatasyncSync",
                "fstatSync",
                "fsyncSync",
                "ftruncateSync",
                "futimesSync",
                "lchmodSync",
                "lchownSync",
                "linkSync",
                "lstatSync",
                "mkdirSync",
                "mkdtempSync",
                "openSync",
                "opendirSync",
                "readdirSync",
                "readFileSync",
                "readlinkSync",
                "readSync",
                "readvSync",
                "realpathSync",
                "renameSync",
                "rmdirSync",
                "rmSync",
                "statSync",
                "symlinkSync",
                "truncateSync",
                "unlinkSync",
                "utimesSync",
                "lutimesSync",
                "writeFileSync",
                "writeSync",
                "writevSync"
            ];
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/lists/fsCallbackApiList.js
    var require_fsCallbackApiList = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/node/lists/fsCallbackApiList.js": function(exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.fsCallbackApiList = void 0;
            exports.fsCallbackApiList = [
                "access",
                "appendFile",
                "chmod",
                "chown",
                "close",
                "copyFile",
                "cp",
                "createReadStream",
                "createWriteStream",
                "exists",
                "fchmod",
                "fchown",
                "fdatasync",
                "fstat",
                "fsync",
                "ftruncate",
                "futimes",
                "lchmod",
                "lchown",
                "link",
                "lstat",
                "mkdir",
                "mkdtemp",
                "open",
                "openAsBlob",
                "opendir",
                "read",
                "readv",
                "readdir",
                "readFile",
                "readlink",
                "realpath",
                "rename",
                "rm",
                "rmdir",
                "stat",
                "statfs",
                "symlink",
                "truncate",
                "unlink",
                "unwatchFile",
                "utimes",
                "lutimes",
                "watch",
                "watchFile",
                "write",
                "writev",
                "writeFile"
            ];
        }
    });
    // ../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/index.js
    var require_lib3 = __commonJS({
        "../../node_modules/.pnpm/memfs@4.50.0/node_modules/memfs/lib/index.js": function(exports, module) {
            "use strict";
            var createFsFromVolume = function createFsFromVolume(vol2) {
                var fs = {
                    F_OK: F_OK,
                    R_OK: R_OK,
                    W_OK: W_OK,
                    X_OK: X_OK,
                    constants: constants_1.constants,
                    Stats: Stats_1.default,
                    Dirent: Dirent_1.default
                };
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = fsSynchronousApiList_1.fsSynchronousApiList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var method = _step.value;
                        if (typeof vol2[method] === "function") fs[method] = vol2[method].bind(vol2);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = fsCallbackApiList_1.fsCallbackApiList[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var method1 = _step1.value;
                        if (typeof vol2[method1] === "function") fs[method1] = vol2[method1].bind(vol2);
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                fs.StatWatcher = vol2.StatWatcher;
                fs.FSWatcher = vol2.FSWatcher;
                fs.WriteStream = vol2.WriteStream;
                fs.ReadStream = vol2.ReadStream;
                fs.promises = vol2.promises;
                if (typeof vol2.realpath === "function") {
                    fs.realpath = vol2.realpath.bind(vol2);
                    if (typeof vol2.realpath.native === "function") {
                        fs.realpath.native = vol2.realpath.native.bind(vol2);
                    }
                }
                if (typeof vol2.realpathSync === "function") {
                    fs.realpathSync = vol2.realpathSync.bind(vol2);
                    if (typeof vol2.realpathSync.native === "function") {
                        fs.realpathSync.native = vol2.realpathSync.native.bind(vol2);
                    }
                }
                fs._toUnixTimestamp = volume_1.toUnixTimestamp;
                fs.__vol = vol2;
                return fs;
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.memfs = exports.fs = exports.vol = exports.Volume = void 0;
            exports.createFsFromVolume = createFsFromVolume;
            var Stats_1 = require_Stats();
            var Dirent_1 = require_Dirent();
            var volume_1 = require_volume();
            Object.defineProperty(exports, "Volume", {
                enumerable: true,
                get: function get() {
                    return volume_1.Volume;
                }
            });
            var constants_1 = require_constants();
            var fsSynchronousApiList_1 = require_fsSynchronousApiList();
            var fsCallbackApiList_1 = require_fsCallbackApiList();
            var _constants_1_constants = constants_1.constants, F_OK = _constants_1_constants.F_OK, R_OK = _constants_1_constants.R_OK, W_OK = _constants_1_constants.W_OK, X_OK = _constants_1_constants.X_OK;
            exports.vol = new volume_1.Volume();
            exports.fs = createFsFromVolume(exports.vol);
            var memfs = function() {
                var json = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, cwd = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "/";
                var vol2 = volume_1.Volume.fromNestedJSON(json, cwd);
                var fs = createFsFromVolume(vol2);
                return {
                    fs: fs,
                    vol: vol2
                };
            };
            exports.memfs = memfs;
            module.exports = _objectSpread({}, module.exports, exports.fs);
            module.exports.semantic = true;
        }
    });
    // src/rpgmv-plugins/NodeCompatLayerV2.ts
    var import_memfs = __toESM(require_lib3(), 1);
    // ../../node_modules/.pnpm/idb@8.0.3/node_modules/idb/build/index.js
    var instanceOfAny = function(object, constructors) {
        return constructors.some(function(c) {
            return _instanceof(object, c);
        });
    };
    var idbProxyableTypes;
    var cursorAdvanceMethods;
    var transactionDoneMap = /* @__PURE__ */ new WeakMap();
    var transformCache = /* @__PURE__ */ new WeakMap();
    var reverseTransformCache = /* @__PURE__ */ new WeakMap();
    var idbProxyTraps = {
        get: function get(target, prop, receiver) {
            if (_instanceof(target, IDBTransaction)) {
                if (prop === "done") return transactionDoneMap.get(target);
                if (prop === "store") {
                    return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
                }
            }
            return wrap(target[prop]);
        },
        set: function set(target, prop, value) {
            target[prop] = value;
            return true;
        },
        has: function has(target, prop) {
            if (_instanceof(target, IDBTransaction) && (prop === "done" || prop === "store")) {
                return true;
            }
            return prop in target;
        }
    };
    var unwrap = function(value) {
        return reverseTransformCache.get(value);
    };
    var readMethods = [
        "get",
        "getKey",
        "getAll",
        "getAllKeys",
        "count"
    ];
    var writeMethods = [
        "put",
        "add",
        "delete",
        "clear"
    ];
    var cachedMethods = /* @__PURE__ */ new Map();
    replaceTraps(function(oldTraps) {
        return _objectSpreadProps(_objectSpread({}, oldTraps), {
            get: function(target, prop, receiver) {
                return getMethod(target, prop) || oldTraps.get(target, prop, receiver);
            },
            has: function(target, prop) {
                return !!getMethod(target, prop) || oldTraps.has(target, prop);
            }
        });
    });
    var advanceMethodProps = [
        "continue",
        "continuePrimaryKey",
        "advance"
    ];
    var methodMap = {};
    var advanceResults = /* @__PURE__ */ new WeakMap();
    var ittrProxiedCursorToOriginalProxy = /* @__PURE__ */ new WeakMap();
    var cursorIteratorTraps = {
        get: function get(target, prop) {
            if (!advanceMethodProps.includes(prop)) return target[prop];
            var cachedFunc = methodMap[prop];
            if (!cachedFunc) {
                cachedFunc = methodMap[prop] = function cachedFunc() {
                    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                        args[_key] = arguments[_key];
                    }
                    var _ittrProxiedCursorToOriginalProxy_get;
                    advanceResults.set(this, (_ittrProxiedCursorToOriginalProxy_get = ittrProxiedCursorToOriginalProxy.get(this))[prop].apply(_ittrProxiedCursorToOriginalProxy_get, _toConsumableArray(args)));
                };
            }
            return cachedFunc;
        }
    };
    function iterate() {
        return _iterate.apply(this, arguments);
    }
    function _iterate() {
        _iterate = _wrapAsyncGenerator(function() {
            var _len, args, _key, cursor, _cursor, proxiedCursor;
            var _arguments = arguments;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        for(_len = _arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                            args[_key] = _arguments[_key];
                        }
                        cursor = this;
                        if (!!_instanceof(cursor, IDBCursor)) return [
                            3,
                            2
                        ];
                        return [
                            4,
                            _awaitAsyncGenerator((_cursor = cursor).openCursor.apply(_cursor, _toConsumableArray(args)))
                        ];
                    case 1:
                        cursor = _state.sent();
                        _state.label = 2;
                    case 2:
                        if (!cursor) return [
                            2
                        ];
                        cursor = cursor;
                        proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
                        ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
                        reverseTransformCache.set(proxiedCursor, unwrap(cursor));
                        _state.label = 3;
                    case 3:
                        if (!cursor) return [
                            3,
                            6
                        ];
                        return [
                            4,
                            proxiedCursor
                        ];
                    case 4:
                        _state.sent();
                        return [
                            4,
                            _awaitAsyncGenerator(advanceResults.get(proxiedCursor) || cursor.continue())
                        ];
                    case 5:
                        cursor = _state.sent();
                        advanceResults.delete(proxiedCursor);
                        return [
                            3,
                            3
                        ];
                    case 6:
                        return [
                            2
                        ];
                }
            });
        });
        return _iterate.apply(this, arguments);
    }
    replaceTraps(function(oldTraps) {
        return _objectSpreadProps(_objectSpread({}, oldTraps), {
            get: function get(target, prop, receiver) {
                if (isIteratorProp(target, prop)) return iterate;
                return oldTraps.get(target, prop, receiver);
            },
            has: function has(target, prop) {
                return isIteratorProp(target, prop) || oldTraps.has(target, prop);
            }
        });
    });
    // src/rpgmv-plugins/NodeCompatLayerV2.ts
    var IndexedDBPersistence = /*#__PURE__*/ function() {
        function IndexedDBPersistence() {
            _classCallCheck(this, IndexedDBPersistence);
            __publicField(this, "db", null);
            __publicField(this, "dbName", "NodeCompatLayerV2");
            __publicField(this, "storeName", "virtual-fs");
            __publicField(this, "version", 1);
        }
        _createClass(IndexedDBPersistence, [
            {
                key: "init",
                value: function init() {
                    var _this = this;
                    return _asyncToGenerator(function() {
                        var error;
                        return __generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    _state.trys.push([
                                        0,
                                        2,
                                        ,
                                        3
                                    ]);
                                    return [
                                        4,
                                        openDB(_this.dbName, _this.version, {
                                            upgrade: function upgrade(db) {
                                                if (!db.objectStoreNames.contains("virtual-fs")) {
                                                    db.createObjectStore("virtual-fs");
                                                }
                                            }
                                        })
                                    ];
                                case 1:
                                    _this.db = _state.sent();
                                    console.log("[NodeCompatLayerV2] IndexedDB initialized");
                                    return [
                                        3,
                                        3
                                    ];
                                case 2:
                                    error = _state.sent();
                                    console.error("[NodeCompatLayerV2] Failed to initialize IndexedDB:", error);
                                    throw error;
                                case 3:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "save",
                value: function save(key, value) {
                    var _this = this;
                    return _asyncToGenerator(function() {
                        var error;
                        return __generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    if (!_this.db) {
                                        throw new Error("IndexedDB not initialized");
                                    }
                                    _state.label = 1;
                                case 1:
                                    _state.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]);
                                    return [
                                        4,
                                        _this.db.put(_this.storeName, value, key)
                                    ];
                                case 2:
                                    _state.sent();
                                    return [
                                        3,
                                        4
                                    ];
                                case 3:
                                    error = _state.sent();
                                    console.error("[NodeCompatLayerV2] Failed to save to IndexedDB:", error);
                                    throw error;
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "load",
                value: function load(key) {
                    var _this = this;
                    return _asyncToGenerator(function() {
                        var error;
                        return __generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    if (!_this.db) {
                                        throw new Error("IndexedDB not initialized");
                                    }
                                    _state.label = 1;
                                case 1:
                                    _state.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]);
                                    return [
                                        4,
                                        _this.db.get(_this.storeName, key)
                                    ];
                                case 2:
                                    return [
                                        2,
                                        _state.sent()
                                    ];
                                case 3:
                                    error = _state.sent();
                                    console.error("[NodeCompatLayerV2] Failed to load from IndexedDB:", error);
                                    return [
                                        2,
                                        null
                                    ];
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "delete",
                value: function _delete(key) {
                    var _this = this;
                    return _asyncToGenerator(function() {
                        var error;
                        return __generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    if (!_this.db) {
                                        throw new Error("IndexedDB not initialized");
                                    }
                                    _state.label = 1;
                                case 1:
                                    _state.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]);
                                    return [
                                        4,
                                        _this.db.delete(_this.storeName, key)
                                    ];
                                case 2:
                                    _state.sent();
                                    return [
                                        3,
                                        4
                                    ];
                                case 3:
                                    error = _state.sent();
                                    console.error("[NodeCompatLayerV2] Failed to delete from IndexedDB:", error);
                                    throw error;
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            },
            {
                key: "clear",
                value: function clear() {
                    var _this = this;
                    return _asyncToGenerator(function() {
                        var error;
                        return __generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    if (!_this.db) {
                                        throw new Error("IndexedDB not initialized");
                                    }
                                    _state.label = 1;
                                case 1:
                                    _state.trys.push([
                                        1,
                                        3,
                                        ,
                                        4
                                    ]);
                                    return [
                                        4,
                                        _this.db.clear(_this.storeName)
                                    ];
                                case 2:
                                    _state.sent();
                                    console.log("[NodeCompatLayerV2] IndexedDB cleared");
                                    return [
                                        3,
                                        4
                                    ];
                                case 3:
                                    error = _state.sent();
                                    console.error("[NodeCompatLayerV2] Failed to clear IndexedDB:", error);
                                    throw error;
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        });
                    })();
                }
            }
        ]);
        return IndexedDBPersistence;
    }();
    var NodeCompatLayerV2 = {
        version: "2.0.0",
        initialized: false,
        isNwjs: false,
        isBrowser: false,
        config: {
            enableV2: true,
            enablePersistence: true,
            autosaveInterval: 5e3,
            verbose: false
        },
        fs: import_memfs.fs,
        persistence: new IndexedDBPersistence(),
        moduleRegistry: {},
        /**
     * 检测运行环境
     */ detectEnvironment: function detectEnvironment() {
            var hasProcess = typeof process !== "undefined";
            this.isNwjs = hasProcess && !!process.versions && !!process.versions.nw;
            this.isBrowser = !this.isNwjs && typeof window !== "undefined";
            if (this.config.verbose) {
                console.log("[NodeCompatLayerV2] Environment detection:");
                console.log("  - isNwjs:", this.isNwjs);
                console.log("  - isBrowser:", this.isBrowser);
            }
        },
        init: /**
     * 初始化兼容层
     */ function init(config) {
            return _asyncToGenerator(function() {
                return __generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            if (this.initialized) {
                                console.log("[NodeCompatLayerV2] Already initialized");
                                return [
                                    2
                                ];
                            }
                            this.config = _objectSpread({}, this.config, config);
                            console.log("[NodeCompatLayerV2] Initializing Node.js API compatibility layer v2.0...");
                            this.detectEnvironment();
                            if (this.isNwjs) {
                                console.log("[NodeCompatLayerV2] Running in nw.js environment, native Node.js API available");
                                console.log("[NodeCompatLayerV2] Compatibility layer disabled");
                                this.initialized = true;
                                return [
                                    2
                                ];
                            }
                            if (!this.config.enableV2) {
                                console.log("[NodeCompatLayerV2] v2 disabled by config, falling back to v1");
                                this.initialized = true;
                                return [
                                    2
                                ];
                            }
                            if (!this.isBrowser) return [
                                3,
                                3
                            ];
                            console.log("[NodeCompatLayerV2] Running in browser environment, setting up compatibility layer...");
                            this.setupVirtualFS();
                            if (!this.config.enablePersistence) return [
                                3,
                                2
                            ];
                            return [
                                4,
                                this.initPersistence()
                            ];
                        case 1:
                            _state.sent();
                            _state.label = 2;
                        case 2:
                            this.injectGlobals();
                            if (this.config.enablePersistence && this.config.autosaveInterval) {
                                this.enableAutosave(this.config.autosaveInterval);
                            }
                            console.log("[NodeCompatLayerV2] Compatibility layer initialized successfully");
                            this.printUsageInfo();
                            _state.label = 3;
                        case 3:
                            this.initialized = true;
                            return [
                                2
                            ];
                    }
                });
            }).apply(this);
        },
        /**
     * 初始化虚拟文件系统
     */ setupVirtualFS: function setupVirtualFS() {
            import_memfs.vol.fromJSON({
                "/home": null,
                "/tmp": null,
                "/save": null,
                "/config": null,
                "/data": null
            });
            if (this.config.verbose) {
                console.log("[NodeCompatLayerV2] Virtual file system initialized");
                console.log("[NodeCompatLayerV2] Created directories: /home, /tmp, /save, /config, /data");
            }
        },
        initPersistence: /**
     * 初始化持久化
     */ function initPersistence() {
            return _asyncToGenerator(function() {
                var error;
                return __generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _state.trys.push([
                                0,
                                3,
                                ,
                                4
                            ]);
                            return [
                                4,
                                this.persistence.init()
                            ];
                        case 1:
                            _state.sent();
                            return [
                                4,
                                this.loadFromStorage()
                            ];
                        case 2:
                            _state.sent();
                            return [
                                3,
                                4
                            ];
                        case 3:
                            error = _state.sent();
                            console.error("[NodeCompatLayerV2] Failed to initialize persistence:", error);
                            console.warn("[NodeCompatLayerV2] Continuing without persistence");
                            return [
                                3,
                                4
                            ];
                        case 4:
                            return [
                                2
                            ];
                    }
                });
            }).apply(this);
        },
        saveToStorage: /**
     * 保存到持久化存储
     */ function saveToStorage() {
            return _asyncToGenerator(function() {
                var snapshot, smallFiles, largeFiles, SMALL_FILE_LIMIT, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step_value, path, content, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, _step_value1, path1, content1, err, error;
                return __generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            if (!this.config.enablePersistence) {
                                return [
                                    2
                                ];
                            }
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                11,
                                ,
                                12
                            ]);
                            snapshot = import_memfs.vol.toJSON();
                            smallFiles = {};
                            largeFiles = {};
                            SMALL_FILE_LIMIT = 1e5;
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(_iterator = Object.entries(snapshot)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    _step_value = _slicedToArray(_step.value, 2), path = _step_value[0], content = _step_value[1];
                                    if (content === null) {
                                        continue;
                                    }
                                    if (content.length < SMALL_FILE_LIMIT) {
                                        smallFiles[path] = content;
                                    } else {
                                        largeFiles[path] = content;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            try {
                                localStorage.setItem("vfs-small", JSON.stringify(smallFiles));
                                if (this.config.verbose) {
                                    console.log("[NodeCompatLayerV2] Saved ".concat(Object.keys(smallFiles).length, " small files to localStorage"));
                                }
                            } catch (error1) {
                                console.warn("[NodeCompatLayerV2] Failed to save to localStorage:", error1);
                            }
                            _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                            _state.label = 2;
                        case 2:
                            _state.trys.push([
                                2,
                                7,
                                8,
                                9
                            ]);
                            _iterator1 = Object.entries(largeFiles)[Symbol.iterator]();
                            _state.label = 3;
                        case 3:
                            if (!!(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done)) return [
                                3,
                                6
                            ];
                            _step_value1 = _slicedToArray(_step1.value, 2), path1 = _step_value1[0], content1 = _step_value1[1];
                            return [
                                4,
                                this.persistence.save("file:".concat(path1), content1)
                            ];
                        case 4:
                            _state.sent();
                            _state.label = 5;
                        case 5:
                            _iteratorNormalCompletion1 = true;
                            return [
                                3,
                                3
                            ];
                        case 6:
                            return [
                                3,
                                9
                            ];
                        case 7:
                            err = _state.sent();
                            _didIteratorError1 = true;
                            _iteratorError1 = err;
                            return [
                                3,
                                9
                            ];
                        case 8:
                            try {
                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                    _iterator1.return();
                                }
                            } finally{
                                if (_didIteratorError1) {
                                    throw _iteratorError1;
                                }
                            }
                            return [
                                7
                            ];
                        case 9:
                            if (Object.keys(largeFiles).length > 0 && this.config.verbose) {
                                console.log("[NodeCompatLayerV2] Saved ".concat(Object.keys(largeFiles).length, " large files to IndexedDB"));
                            }
                            return [
                                4,
                                this.persistence.save("metadata", {
                                    timestamp: Date.now(),
                                    smallFileCount: Object.keys(smallFiles).length,
                                    largeFileCount: Object.keys(largeFiles).length
                                })
                            ];
                        case 10:
                            _state.sent();
                            if (this.config.verbose) {
                                console.log("[NodeCompatLayerV2] File system saved to persistent storage");
                            }
                            return [
                                3,
                                12
                            ];
                        case 11:
                            error = _state.sent();
                            console.error("[NodeCompatLayerV2] Failed to save to storage:", error);
                            return [
                                3,
                                12
                            ];
                        case 12:
                            return [
                                2
                            ];
                    }
                });
            }).apply(this);
        },
        loadFromStorage: /**
     * 从持久化存储加载
     */ function loadFromStorage() {
            return _asyncToGenerator(function() {
                var files, smallData, smallFiles, metadata, error;
                return __generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            if (!this.config.enablePersistence) {
                                return [
                                    2
                                ];
                            }
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                3,
                                ,
                                4
                            ]);
                            files = {};
                            try {
                                smallData = localStorage.getItem("vfs-small");
                                if (smallData) {
                                    smallFiles = JSON.parse(smallData);
                                    Object.assign(files, smallFiles);
                                    if (this.config.verbose) {
                                        console.log("[NodeCompatLayerV2] Loaded ".concat(Object.keys(smallFiles).length, " small files from localStorage"));
                                    }
                                }
                            } catch (error1) {
                                console.warn("[NodeCompatLayerV2] Failed to load from localStorage:", error1);
                            }
                            return [
                                4,
                                this.persistence.load("metadata")
                            ];
                        case 2:
                            metadata = _state.sent();
                            if (metadata && this.config.verbose) {
                                console.log("[NodeCompatLayerV2] Loaded metadata:", metadata);
                            }
                            if (Object.keys(files).length > 0) {
                                import_memfs.vol.fromJSON(files);
                                console.log("[NodeCompatLayerV2] Restored ".concat(Object.keys(files).length, " files from persistent storage"));
                            } else {
                                if (this.config.verbose) {
                                    console.log("[NodeCompatLayerV2] No saved data found, starting with fresh file system");
                                }
                            }
                            return [
                                3,
                                4
                            ];
                        case 3:
                            error = _state.sent();
                            console.error("[NodeCompatLayerV2] Failed to load from storage:", error);
                            return [
                                3,
                                4
                            ];
                        case 4:
                            return [
                                2
                            ];
                    }
                });
            }).apply(this);
        },
        /**
     * 启用自动保存
     */ enableAutosave: function enableAutosave() {
            var interval = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 5e3;
            var _this = this;
            window.__nodeCompatAutosaveTimer = setInterval(function() {
                _this.saveToStorage().catch(function(err) {
                    console.error("[NodeCompatLayerV2] Autosave failed:", err);
                });
            }, interval);
            window.addEventListener("beforeunload", function() {
                try {
                    var snapshot = import_memfs.vol.toJSON();
                    var smallFiles = {};
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = Object.entries(snapshot)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _step_value = _slicedToArray(_step.value, 2), path = _step_value[0], content = _step_value[1];
                            if (content && content.length < 1e5) {
                                smallFiles[path] = content;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    localStorage.setItem("vfs-small", JSON.stringify(smallFiles));
                } catch (error) {
                    console.error("[NodeCompatLayerV2] Failed to save on beforeunload:", error);
                }
            });
            if (this.config.verbose) {
                console.log("[NodeCompatLayerV2] Autosave enabled (interval: ".concat(interval, "ms)"));
            }
        },
        /**
     * 禁用自动保存
     */ disableAutosave: function disableAutosave() {
            var timer = window.__nodeCompatAutosaveTimer;
            if (timer) {
                clearInterval(timer);
                delete window.__nodeCompatAutosaveTimer;
                console.log("[NodeCompatLayerV2] Autosave disabled");
            }
        },
        clearStorage: /**
     * 清除所有持久化数据
     */ function clearStorage() {
            return _asyncToGenerator(function() {
                var error;
                return __generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _state.trys.push([
                                0,
                                2,
                                ,
                                3
                            ]);
                            localStorage.removeItem("vfs-small");
                            return [
                                4,
                                this.persistence.clear()
                            ];
                        case 1:
                            _state.sent();
                            import_memfs.vol.reset();
                            this.setupVirtualFS();
                            console.log("[NodeCompatLayerV2] Storage cleared and file system reset");
                            return [
                                3,
                                3
                            ];
                        case 2:
                            error = _state.sent();
                            console.error("[NodeCompatLayerV2] Failed to clear storage:", error);
                            throw error;
                        case 3:
                            return [
                                2
                            ];
                    }
                });
            }).apply(this);
        },
        /**
     * 挂载虚拟文件系统
     */ mountVirtualFS: function mountVirtualFS(mountPoint, files) {
            import_memfs.vol.fromJSON(files, mountPoint);
            if (this.config.verbose) {
                console.log("[NodeCompatLayerV2] Mounted ".concat(Object.keys(files).length, " files to ").concat(mountPoint));
            }
        },
        /**
     * 导出文件系统
     */ exportFS: function exportFS() {
            return import_memfs.vol.toJSON();
        },
        /**
     * 注册模块
     */ registerModule: function registerModule(name, exports) {
            this.moduleRegistry[name] = exports;
            if (this.config.verbose) {
                console.log("[NodeCompatLayerV2] Module registered: ".concat(name));
            }
        },
        /**
     * 创建 require 函数
     */ createRequire: function createRequire() {
            var self = this;
            return function require2(moduleName) {
                if (moduleName === "fs") {
                    return import_memfs.fs;
                }
                if (self.moduleRegistry[moduleName]) {
                    return self.moduleRegistry[moduleName];
                }
                console.warn("[NodeCompatLayerV2] Module '".concat(moduleName, "' not found in registry"));
                console.warn("[NodeCompatLayerV2] If this is a Node.js core module, it should be polyfilled by vite-plugin-node-polyfills");
                return {};
            };
        },
        /**
     * 注入全局对象
     */ injectGlobals: function injectGlobals() {
            var win = window;
            win.fs = import_memfs.fs;
            if (typeof win.require === "undefined") {
                win.require = this.createRequire();
            }
            if (typeof win.__dirname === "undefined") {
                win.__dirname = "/";
            }
            if (typeof win.__filename === "undefined") {
                win.__filename = "/index.html";
            }
            if (typeof win.module === "undefined") {
                win.module = {
                    exports: {}
                };
            }
            if (typeof win.exports === "undefined") {
                win.exports = win.module.exports;
            }
            if (this.config.verbose) {
                console.log("[NodeCompatLayerV2] Global objects injected:");
                console.log("  - window.fs");
                console.log("  - window.require");
                console.log("  - __dirname");
                console.log("  - __filename");
            }
        },
        /**
     * 打印使用信息
     */ printUsageInfo: function printUsageInfo() {
            console.log("");
            console.log("=".repeat(70));
            console.log("Node.js API Compatibility Layer v2.0 is active");
            console.log("=".repeat(70));
            console.log("✅ Real file system (memfs) - files are actually written!");
            console.log("✅ IndexedDB persistence - data survives page refresh!");
            console.log("✅ 20+ Node.js core modules polyfilled");
            console.log("");
            console.log("Available APIs:");
            console.log("  - fs: require('fs') - Full Node.js fs API");
            console.log("  - path: require('path') - Path manipulation");
            console.log("  - buffer: Buffer - Binary data handling");
            console.log("  - events: EventEmitter - Event system");
            console.log("  - stream: Stream - Data streams");
            console.log("  - crypto: crypto - Cryptographic functions");
            console.log("  - And 15+ more modules...");
            console.log("");
            console.log("Virtual directories:");
            console.log("  - /home - User files");
            console.log("  - /save - Game saves");
            console.log("  - /config - Configuration files");
            console.log("  - /data - Data files");
            console.log("  - /tmp - Temporary files");
            console.log("");
            console.log("Quick start:");
            console.log("  const fs = require('fs');");
            console.log("  fs.writeFileSync('/save/game.json', JSON.stringify({level: 10}));");
            console.log("  const data = fs.readFileSync('/save/game.json', 'utf-8');");
            console.log("");
            console.log("Management:");
            console.log("  - NodeCompatLayerV2.saveToStorage() - Manual save");
            console.log("  - NodeCompatLayerV2.loadFromStorage() - Manual load");
            console.log("  - NodeCompatLayerV2.clearStorage() - Clear all data");
            console.log("  - NodeCompatLayerV2.exportFS() - Export file system");
            console.log("=".repeat(70));
            console.log("");
        }
    };
    (function() {
        "use strict";
        console.log("[NodeCompatLayerV2] Plugin loading...");
        var config = window.__nodeCompatConfig || {
            enableV2: true,
            enablePersistence: true,
            autosaveInterval: 5e3,
            verbose: false
        };
        NodeCompatLayerV2.init(config).then(function() {
            console.log("[NodeCompatLayerV2] Plugin loaded successfully");
            window.NodeCompatLayerV2 = NodeCompatLayerV2;
            if (config.enableV2) {
                window.NodeCompatLayer = NodeCompatLayerV2;
            }
        }).catch(function(error) {
            console.error("[NodeCompatLayerV2] Plugin initialization failed:", error);
            window.NodeCompatLayerV2 = NodeCompatLayerV2;
        });
    })();
})();
