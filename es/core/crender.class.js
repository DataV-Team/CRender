import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";

var _class, _temp;

import { Status } from '../types/core/graph';
import { debounce } from '../utils/common';
import { getRotatePointPos, getScalePointPos, getTranslatePointPos, checkPointIsInRect } from '../utils/graph';
import { bound } from '../utils/decorator';
var CRender = (_class = (_temp = /*#__PURE__*/function () {
  /**
   * @description Device Pixel Ratio
   */

  /**
   * @description Off Screen Rendering
   */

  /**
   * @description Canvas Element
   */

  /**
   * @description Off Screen Canvas Element
   */

  /**
   * @description Ctx for current rendering
   */

  /**
   * @description Actual Canvas Context
   */

  /**
   * @description Off Screen Canvas Context
   */

  /**
   * @description Width and height of the canvas
   */

  /**
   * @description Whether render is in animation rendering
   */

  /**
   * @description Added graph
   */
  function CRender(canvas) {
    var offScreenRendering = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, CRender);

    _defineProperty(this, "dpr", 1);

    _defineProperty(this, "offScreenRendering", false);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "osCanvas", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "actualCtx", void 0);

    _defineProperty(this, "osCtx", void 0);

    _defineProperty(this, "area", [0, 0]);

    _defineProperty(this, "animationStatus", false);

    _defineProperty(this, "graphs", []);

    _defineProperty(this, "drawAllGraphDebounced", debounce(this.drawAllGraphImmediately, 0));

    if (!canvas) throw new Error('CRender: Missing parameters!');
    var dpr = devicePixelRatio || 1;
    var ctx = canvas.getContext('2d');
    var clientWidth = canvas.clientWidth,
        clientHeight = canvas.clientHeight;
    var width = clientWidth * dpr;
    var height = clientHeight * dpr;
    var area = [clientWidth, clientHeight];
    canvas.setAttribute('width', width + '');
    canvas.setAttribute('height', height + '');
    Object.assign(this, {
      dpr: dpr,
      area: area,
      canvas: canvas,
      ctx: ctx,
      actualCtx: ctx
    });
    canvas.addEventListener('mousedown', this.mouseDown.bind(this));
    canvas.addEventListener('mousemove', this.mouseMove.bind(this));
    canvas.addEventListener('mouseup', this.mouseUp.bind(this));
    if (!offScreenRendering) return; // Off Screen Canvas

    if (!OffscreenCanvas) {
      Object.assign(this, {
        offScreenRendering: false
      });
      console.warn('CRender: Your browser does not support off-screen rendering!');
      return;
    }

    var osCanvas = new OffscreenCanvas(width, height);
    var osCtx = osCanvas.getContext('2d');
    Object.assign(this, {
      osCanvas: osCanvas,
      osCtx: osCtx,
      offScreenRendering: offScreenRendering
    });
  }

  _createClass(CRender, [{
    key: "clearArea",
    value: function clearArea() {
      var canvas = this.canvas,
          osCanvas = this.osCanvas,
          area = this.area,
          offScreenRendering = this.offScreenRendering;
      var width = area[0] * this.dpr;
      canvas.width = width;
      if (offScreenRendering) osCanvas.width = width;
    }
    /**
     * @description Sort the graphs by index
     * Give priority to index high graph in rendering
     */

  }, {
    key: "sortGraphsByIndex",
    value: function sortGraphsByIndex() {
      var graphs = this.graphs;
      graphs.sort(function (_ref, _ref2) {
        var a = _ref.index;
        var b = _ref2.index;
        return a - b;
      });
    }
  }, {
    key: "drawAllGraph",
    value: function drawAllGraph() {
      var immediately = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (immediately) {
        this.drawAllGraphImmediately();
      } else {
        this.drawAllGraphDebounced();
      }
    }
  }, {
    key: "drawAllGraphImmediately",
    value: function drawAllGraphImmediately() {
      var offScreenRendering = this.offScreenRendering,
          actualCtx = this.actualCtx,
          osCtx = this.osCtx,
          osCanvas = this.osCanvas;
      this.clearArea();
      this.ctx = offScreenRendering ? osCtx : actualCtx;
      this.graphs.filter(function (graph) {
        return graph.visible;
      }).forEach(this.drawGraphProcessor);
      if (offScreenRendering) actualCtx.drawImage(osCanvas, 0, 0);
    }
  }, {
    key: "drawGraphProcessor",
    value: function drawGraphProcessor(graph) {
      var _graph$beforeDraw, _graph$drawed;

      graph.style.setCtx(this);
      (_graph$beforeDraw = graph.beforeDraw) === null || _graph$beforeDraw === void 0 ? void 0 : _graph$beforeDraw.call(graph, graph);
      graph.draw();
      (_graph$drawed = graph.drawed) === null || _graph$drawed === void 0 ? void 0 : _graph$drawed.call(graph, graph);
      graph.style.restoreCtx(this);
    }
  }, {
    key: "add",
    value: function add(graph) {
      var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (Array.isArray(graph)) {
        graph.forEach(this.graphAddProcessor);
      } else {
        this.graphAddProcessor(graph);
      }

      if (!wait) this.drawAllGraph();
    }
  }, {
    key: "graphAddProcessor",
    value: function graphAddProcessor(graph) {
      var _graph$beforeAdd, _graph$added;

      (_graph$beforeAdd = graph.beforeAdd) === null || _graph$beforeAdd === void 0 ? void 0 : _graph$beforeAdd.call(graph, graph);
      graph.render = this;
      graph.setGraphCenter();
      this.graphs.push(graph);
      this.sortGraphsByIndex();
      (_graph$added = graph.added) === null || _graph$added === void 0 ? void 0 : _graph$added.call(graph, graph);
    }
  }, {
    key: "delGraph",
    value: function delGraph(graph) {
      var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (Array.isArray(graph)) {
        ;

        _toConsumableArray(graph).forEach(this.graphDelProcessor);
      } else {
        this.graphDelProcessor(graph);
      }

      if (!wait) this.drawAllGraph();
    }
  }, {
    key: "graphDelProcessor",
    value: function graphDelProcessor(graph) {
      var _graph$beforeDelete, _graph$deleted;

      var graphs = this.graphs;
      var index = graphs.findIndex(function (_) {
        return _ === graph;
      });
      if (index === -1) return;
      (_graph$beforeDelete = graph.beforeDelete) === null || _graph$beforeDelete === void 0 ? void 0 : _graph$beforeDelete.call(graph, graph);
      graphs.splice(index, 1);
      (_graph$deleted = graph.deleted) === null || _graph$deleted === void 0 ? void 0 : _graph$deleted.call(graph, graph);
    }
  }, {
    key: "delAllGraph",
    value: function delAllGraph() {
      this.delGraph(this.graphs);
      this.clearArea();
    }
    /**
     * @description Animate the graph whose animation queue is not empty
     * and the animationPause is false
     */

  }, {
    key: "launchAnimation",
    value: function launchAnimation() {
      var _this = this;

      var animationStatus = this.animationStatus;
      if (animationStatus) return;
      this.animationStatus = true;
      return new Promise(function (resolve) {
        _this.animate(function () {
          _this.animationStatus = false;
          resolve();
        }, Date.now());
      });
    }
  }, {
    key: "animate",
    value: function animate(callback, timeStamp) {
      var _this2 = this;

      var graphs = this.graphs;

      if (!this.animateAble()) {
        callback();
        return;
      }

      graphs.forEach(function (graph) {
        return _this2.graphTrunNextAnimationFrame(graph, timeStamp);
      });
      this.drawAllGraph();
      requestAnimationFrame(this.animate.bind(this, callback, timeStamp));
    }
    /**
     * @description Extract the next frame of data from the animation queue
     * and update the graph state
     * @param timeStamp {number} Animation start timestamp
     */

  }, {
    key: "graphTrunNextAnimationFrame",
    value: function graphTrunNextAnimationFrame(graph, timeStamp) {
      var animationPause = graph.animationPause,
          animationDelay = graph.animationDelay,
          animationQueue = graph.animationQueue;
      if (animationPause || Date.now() - timeStamp < animationDelay) return;
      graph.animationQueue = animationQueue.reduce(function (queue, _ref3) {
        var key = _ref3.key,
            frameState = _ref3.frameState;
        Object.assign(graph[key], frameState.shift());

        if (frameState.length) {
          return [].concat(_toConsumableArray(queue), [{
            key: key,
            frameState: frameState
          }]);
        } else {
          return queue;
        }
      }, []);
    }
  }, {
    key: "animateAble",
    value: function animateAble() {
      var graphs = this.graphs;
      return !!graphs.find(function (graph) {
        return !graph.animationPause && graph.animationQueue.length;
      });
    }
    /**
     * @description Handler of CRender mousedown event
     */

  }, {
    key: "mouseDown",
    value: function mouseDown() {
      var graphs = this.graphs;
      var hoverGraph = graphs.find(function (graph) {
        return graph.status === Status.HOVER;
      });
      if (!hoverGraph) return;
      hoverGraph.status = Status.ACTIVE;
    }
    /**
     * @description Handler of CRender mousemove event
     */

  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var _this3 = this,
          _onMouseOuter,
          _ref4,
          _onMouseEnter,
          _ref5;

      var offsetX = e.offsetX,
          offsetY = e.offsetY;
      var position = [offsetX, offsetY];
      var graphs = this.graphs;
      var activeGraph = graphs.find(function (graph) {
        return graph.status === Status.ACTIVE || graph.status === Status.DRAG;
      }); // Active Graph | Drag Able | Move Able

      if (activeGraph && activeGraph.drag && activeGraph.move) {
        this.graphMoveProcessor(activeGraph, e);
        activeGraph.status = Status.DRAG;
        return;
      }

      var hoverGraph = graphs.find(function (graph) {
        return graph.status === Status.HOVER;
      });
      var hoverAbleGraphs = graphs.filter(function (graph) {
        return graph.hover && (graph.hoverCheck || graph.hoverRect);
      });
      var hoveredGraph = hoverAbleGraphs.find(function (graph) {
        return _this3.graphHoverCheckProcessor(graph, position);
      }); // Hover Graph

      if (hoveredGraph) {
        document.body.style.cursor = hoveredGraph.style.hoverCursor;
      } else {
        document.body.style.cursor = 'default';
      } // No hover graph


      if (!hoveredGraph && !hoverGraph) return; // Same hover graph

      if (hoveredGraph === hoverGraph) return; // No hoverd graph But before had

      if (!hoveredGraph && hoverGraph) {
        var _hoverGraph$onMouseOu;

        (_hoverGraph$onMouseOu = hoverGraph.onMouseOuter) === null || _hoverGraph$onMouseOu === void 0 ? void 0 : _hoverGraph$onMouseOu.call(hoverGraph, e);
        hoverGraph.status = Status.STATIC;
        return;
      } // Only has hovered graph


      if (hoveredGraph && !hoverGraph) {
        var _hoveredGraph$onMouse;

        (_hoveredGraph$onMouse = hoveredGraph.onMouseEnter) === null || _hoveredGraph$onMouse === void 0 ? void 0 : _hoveredGraph$onMouse.call(hoveredGraph, e);
        hoveredGraph.status = Status.HOVER;
        return;
      } // Not a same graph


      (_onMouseOuter = (_ref4 = hoverGraph).onMouseOuter) === null || _onMouseOuter === void 0 ? void 0 : _onMouseOuter.call(_ref4, e);
      hoverGraph.status = Status.STATIC;
      (_onMouseEnter = (_ref5 = hoveredGraph).onMouseEnter) === null || _onMouseEnter === void 0 ? void 0 : _onMouseEnter.call(_ref5, e);
      hoveredGraph.status = Status.HOVER;
    }
  }, {
    key: "graphMoveProcessor",
    value: function graphMoveProcessor(graph, e) {
      var _graph$beforeMove, _graph$moved;

      if (!graph.move) return;
      (_graph$beforeMove = graph.beforeMove) === null || _graph$beforeMove === void 0 ? void 0 : _graph$beforeMove.call(graph, e, graph);
      graph.move(e);
      (_graph$moved = graph.moved) === null || _graph$moved === void 0 ? void 0 : _graph$moved.call(graph, e, graph);
      graph.setGraphCenter(e);
    }
  }, {
    key: "graphHoverCheckProcessor",
    value: function graphHoverCheckProcessor(graph, point) {
      var hoverRect = graph.hoverRect,
          style = graph.style;
      var graphCenter = style.graphCenter,
          rotate = style.rotate,
          scale = style.scale,
          translate = style.translate;
      if (!graph.hoverCheck) return false;

      if (graphCenter) {
        if (rotate) point = getRotatePointPos(-rotate, point, graphCenter);
        if (scale) point = getScalePointPos(scale.map(function (s) {
          return 1 / s;
        }), point, graphCenter);
        if (translate) point = getTranslatePointPos(translate.map(function (v) {
          return v * -1;
        }), point);
      }

      if (hoverRect) return checkPointIsInRect.apply(void 0, [point].concat(_toConsumableArray(hoverRect)));
      return graph.hoverCheck(point);
    }
    /**
     * @description Handler of CRender mouseup event
     */

  }, {
    key: "mouseUp",
    value: function mouseUp(e) {
      var _activeGraph$onClick;

      var graphs = this.graphs;
      var activeGraph = graphs.find(function (graph) {
        return graph.status === Status.ACTIVE;
      });
      var dragGraph = graphs.find(function (graph) {
        return graph.status === Status.DRAG;
      });
      activeGraph === null || activeGraph === void 0 ? void 0 : (_activeGraph$onClick = activeGraph.onClick) === null || _activeGraph$onClick === void 0 ? void 0 : _activeGraph$onClick.call(activeGraph, e);
      graphs.forEach(function (graph) {
        return graph.status = Status.STATIC;
      });
      if (activeGraph) activeGraph.status = Status.HOVER;
      if (dragGraph) dragGraph.status = Status.HOVER;
    }
  }]);

  return CRender;
}(), _temp), (_applyDecoratedDescriptor(_class.prototype, "drawAllGraphImmediately", [bound], Object.getOwnPropertyDescriptor(_class.prototype, "drawAllGraphImmediately"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "drawGraphProcessor", [bound], Object.getOwnPropertyDescriptor(_class.prototype, "drawGraphProcessor"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "graphAddProcessor", [bound], Object.getOwnPropertyDescriptor(_class.prototype, "graphAddProcessor"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "graphDelProcessor", [bound], Object.getOwnPropertyDescriptor(_class.prototype, "graphDelProcessor"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "launchAnimation", [bound], Object.getOwnPropertyDescriptor(_class.prototype, "launchAnimation"), _class.prototype)), _class);
export { CRender as default };