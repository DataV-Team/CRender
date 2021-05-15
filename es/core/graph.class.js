import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Status } from '../types/core/graph';
import Style from './style.class';
import { delay } from '../utils/graph';
import { deepClone } from '../utils/common';
import transition from '@jiaminghi/transition';

// eslint-disable-next-line
var Graph = /*#__PURE__*/function () {
  _createClass(Graph, [{
    key: "draw",

    /**
     * @description Graph Name
     */

    /**
     * @description Graph Render
     */

    /**
     * @description Graph shape
     */

    /**
     * @description Graph style
     */

    /**
     * @description Weather to render graph
     */

    /**
     * @description Whether to enable drag
     */

    /**
     * @description Whether to enable hover
     */

    /**
     * @description Graph rendering index
     *  Give priority to index high graph in rendering
     */

    /**
     * @description Animation delay time(ms)
     */

    /**
     * @description Number of animation frames
     */

    /**
     * @description Animation dynamic curve (Supported by transition)
     * @link https://github.com/jiaming743/Transition
     */

    /**
     * @description Weather to pause graph animation
     */

    /**
     * @description Rectangular hover detection zone
     *  Use this method for hover detection first
     * @example hoverRect = [0, 0, 100, 100] // [Rect start x, y, Rect width, height]
     */

    /**
     * @description Mouse enter event handler
     */
    // eslint-disable-next-line

    /**
     * @description Mouse outer event handler
     */
    // eslint-disable-next-line

    /**
     * @description Mouse click event handler
     */
    // eslint-disable-next-line

    /**
     * @description Graph current status
     */

    /**
     * @description Graph animation frame state
     */

    /**
     * @description Funciton of draw graph
     */
    // eslint-disable-next-line
    value: function draw() {}
    /**
     * @description Function of set Graph center
     */
    // eslint-disable-next-line

  }, {
    key: "setGraphCenter",
    value: function setGraphCenter(_e) {}
    /**
     * @description Funciton of check graph is hovered
     */

  }, {
    key: "hoverCheck",
    value: function hoverCheck(_point) {
      return false;
    }
    /**
     * @description Function of Graph move
     */
    // eslint-disable-next-line

  }, {
    key: "move",
    value: function move(_e) {}
    /**
     * @LifeCyle
     * @description Life Cycle hooks, will all be called in render
     */

    /**
     * @description Life Cycle when graph before add
     */
    // eslint-disable-next-line

  }]);

  function Graph(config) {
    _classCallCheck(this, Graph);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "render", void 0);

    _defineProperty(this, "shape", void 0);

    _defineProperty(this, "style", void 0);

    _defineProperty(this, "visible", true);

    _defineProperty(this, "drag", false);

    _defineProperty(this, "hover", false);

    _defineProperty(this, "index", 1);

    _defineProperty(this, "animationDelay", 0);

    _defineProperty(this, "animationFrame", 30);

    _defineProperty(this, "animationCurve", 'linear');

    _defineProperty(this, "animationPause", false);

    _defineProperty(this, "hoverRect", void 0);

    _defineProperty(this, "onMouseEnter", void 0);

    _defineProperty(this, "onMouseOuter", void 0);

    _defineProperty(this, "onClick", void 0);

    _defineProperty(this, "status", Status.STATIC);

    _defineProperty(this, "animationQueue", []);

    _defineProperty(this, "beforeAdd", void 0);

    _defineProperty(this, "added", void 0);

    _defineProperty(this, "beforeDraw", void 0);

    _defineProperty(this, "drawed", void 0);

    _defineProperty(this, "beforeMove", void 0);

    _defineProperty(this, "moved", void 0);

    _defineProperty(this, "beforeDelete", void 0);

    _defineProperty(this, "deleted", void 0);

    config = deepClone(config);
    var style = new Style(config.style);
    Object.assign(this, config, {
      status: Status.STATIC,
      animationRoot: [],
      animationKeys: [],
      animationFrameState: [],
      style: style
    });
  }

  _createClass(Graph, [{
    key: "checkRender",
    value: function checkRender() {
      if (!this.render) throw new Error('Graph has not been pushed into render!');
    }
    /**
     * @description Update graph attribute
     */

  }, {
    key: "attr",
    value: function attr(key, value) {
      var reDraw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      this.checkRender();
      var isObject = _typeof(this[key]) === 'object';
      if (isObject) value = deepClone(value);
      var render = this.render;

      if (key === 'style') {
        this.style.update(value);
      } else if (isObject) {
        Object.assign(this[key], value);
      } else {
        // @ts-ignore
        this[key] = value;
      }

      if (key === 'index') render.sortGraphsByIndex();
      if (reDraw) render.drawAllGraph();
    }
    /**
     * @description Update graphics state (with animation)
     * Only shape and style attributes are supported
     */

  }, {
    key: "animation",
    value: function () {
      var _animation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(key, value) {
        var wait,
            valueRoot,
            valueKeys,
            beforeValue,
            animationFrame,
            animationCurve,
            animationDelay,
            frameState,
            render,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                wait = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : false;
                this.checkRender();

                if (!(key !== 'shape' && key !== 'style')) {
                  _context2.next = 4;
                  break;
                }

                throw new Error('Graph animation: Only supported shape and style animation!');

              case 4:
                if (!(_typeof(value) !== 'object')) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('Graph animation: Shape or style must be an object!');

              case 6:
                value = deepClone(value);
                if (key === 'style') value = Style.colorProcessor(value);
                valueRoot = this[key];
                valueKeys = Object.keys(value);
                beforeValue = valueKeys.reduce(function (state, currentKey) {
                  return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, currentKey, valueRoot[currentKey]));
                }, Object.create(null));
                animationFrame = this.animationFrame, animationCurve = this.animationCurve, animationDelay = this.animationDelay;
                frameState = transition(animationCurve, beforeValue, value, animationFrame, true);
                this.animationQueue.push({
                  key: key,
                  frameState: frameState
                });

                if (!wait) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return");

              case 16:
                if (!(animationDelay > 0)) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 19;
                return delay(animationDelay);

              case 19:
                render = this.render;
                return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(resolve) {
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return render.launchAnimation();

                          case 2:
                            resolve();

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function animation(_x, _x2) {
        return _animation.apply(this, arguments);
      }

      return animation;
    }()
    /**
     * @description Skip to the last frame of animation
     */

  }, {
    key: "animationEnd",
    value: function animationEnd() {
      var _this = this;

      this.checkRender();
      var animationQueue = this.animationQueue,
          render = this.render;
      animationQueue.forEach(function (_ref2) {
        var key = _ref2.key,
            frameState = _ref2.frameState;
        return Object.assign(_this[key], frameState.pop());
      });
      this.animationQueue = [];
      return render.drawAllGraph();
    }
    /**
     * @description Pause animation behavior
     */

  }, {
    key: "pauseAnimation",
    value: function pauseAnimation() {
      this.checkRender();
      this.attr('animationPause', true);
    }
    /**
     * @description Try animate
     */

  }, {
    key: "playAnimation",
    value: function playAnimation() {
      this.checkRender();
      var render = this.render;
      this.attr('animationPause', false);
      return new Promise( /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(resolve) {
          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return render.launchAnimation();

                case 2:
                  resolve();

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x4) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "clone",
    value: function clone() {
      var add = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.checkRender();
      var render = this.render; // @ts-ignore

      var Constructor = this.__proto__.constructor;

      var config = _objectSpread({}, this);

      delete config.render;
      var graph = new Constructor(config);
      if (add) render.add(graph);
      return graph;
    }
  }], [{
    key: "mergeDefaultShape",
    value: function mergeDefaultShape(defaultShape, config, checker) {
      var mergedConfig = _objectSpread(_objectSpread({}, config), {}, {
        shape: Object.assign(defaultShape, config.shape || {})
      });

      checker === null || checker === void 0 ? void 0 : checker(mergedConfig);
      return mergedConfig;
    }
  }]);

  return Graph;
}();

export { Graph as default };