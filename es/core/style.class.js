import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { getCtxRealColorWithOpacity, gradientColorValidator, transformColor, getAutoColorStops } from '../utils/style';

var Style = /*#__PURE__*/function () {
  /**
   * @description Rgba value of graph fill color
   */

  /**
   * @description Rgba value of graph stroke color
   */

  /**
   * @description Opacity of graph
   */

  /**
   * @description LineCap of Ctx
   */

  /**
   * @description Linejoin of Ctx
   */

  /**
   * @description LineDash of Ctx
   */

  /**
   * @description LineDashOffset of Ctx
   */

  /**
   * @description ShadowBlur of Ctx
   */

  /**
   * @description Rgba value of graph shadow color
   */

  /**
   * @description ShadowOffsetX of Ctx
   */

  /**
   * @description ShadowOffsetY of Ctx
   */

  /**
   * @description LineWidth of Ctx
   */

  /**
   * @description Center point of the graph
   */

  /**
   * @description Graph scale
   */

  /**
   * @description Graph rotation degree
   */

  /**
   * @description Graph translate distance
   */

  /**
   * @description Cursor status when hover
   */

  /**
   * @description Font style of Ctx
   */

  /**
   * @description Font varient of Ctx
   */

  /**
   * @description Font weight of Ctx
   */

  /**
   * @description Font size of Ctx
   */

  /**
   * @description Font family of Ctx
   */

  /**
   * @description TextAlign of Ctx
   */

  /**
   * @description TextBaseline of Ctx
   */

  /**
   * @description The color used to create the gradient
   */

  /**
   * @description Gradient type
   */

  /**
   * @description Gradient params
   */

  /**
   * @description When to use gradients
   */

  /**
   * @description Gradient color stops
   */
  function Style(style) {
    _classCallCheck(this, Style);

    _defineProperty(this, "fill", [0, 0, 0, 1]);

    _defineProperty(this, "stroke", [0, 0, 0, 0]);

    _defineProperty(this, "opacity", 1);

    _defineProperty(this, "lineCap", 'butt');

    _defineProperty(this, "lineJoin", 'miter');

    _defineProperty(this, "lineDash", []);

    _defineProperty(this, "lineDashOffset", 0);

    _defineProperty(this, "shadowBlur", 0);

    _defineProperty(this, "shadowColor", [0, 0, 0, 0]);

    _defineProperty(this, "shadowOffsetX", 0);

    _defineProperty(this, "shadowOffsetY", 0);

    _defineProperty(this, "lineWidth", 1);

    _defineProperty(this, "graphCenter", void 0);

    _defineProperty(this, "scale", void 0);

    _defineProperty(this, "rotate", void 0);

    _defineProperty(this, "translate", void 0);

    _defineProperty(this, "hoverCursor", 'pointer');

    _defineProperty(this, "fontStyle", 'normal');

    _defineProperty(this, "fontVarient", 'normal');

    _defineProperty(this, "fontWeight", 'normal');

    _defineProperty(this, "fontSize", 10);

    _defineProperty(this, "fontFamily", 'Arial');

    _defineProperty(this, "textAlign", 'center');

    _defineProperty(this, "textBaseline", 'middle');

    _defineProperty(this, "gradientColor", void 0);

    _defineProperty(this, "gradientType", 'linear');

    _defineProperty(this, "gradientParams", void 0);

    _defineProperty(this, "gradientWith", 'stroke');

    _defineProperty(this, "gradientStops", 'auto');

    if (style) this.update(style);
  }

  _createClass(Style, [{
    key: "update",
    value: function update(style) {
      Object.assign(this, Style.colorProcessor(style));
    }
  }, {
    key: "setCtx",
    value: function setCtx(render) {
      Style.setCtxTransform(this, render);
      Style.setCtxStyle(render, this);
      Style.setCtxGradientColor(render, this);
    }
  }, {
    key: "restoreCtx",
    value: function restoreCtx(_ref) {
      var ctx = _ref.ctx;
      ctx.restore();
    }
  }], [{
    key: "colorProcessor",
    value: function colorProcessor(style, reverse) {
      var processedStyle = _objectSpread({}, style);

      var transform = transformColor(reverse);
      if (processedStyle.fill) processedStyle.fill = transform(processedStyle.fill);
      if (processedStyle.stroke) processedStyle.stroke = transform(processedStyle.stroke);
      if (processedStyle.shadowColor) processedStyle.shadowColor = transform(processedStyle.shadowColor);
      processedStyle.gradientColor = (processedStyle.gradientColor || []).map(transform);

      if (reverse) {
        return processedStyle;
      } else {
        return processedStyle;
      }
    }
  }, {
    key: "setCtxTransform",
    value: function setCtxTransform(style, _ref2) {
      var ctx = _ref2.ctx,
          dpr = _ref2.dpr;
      ctx.save();
      var graphCenter = style.graphCenter,
          rotate = style.rotate,
          _style$scale = style.scale;
      _style$scale = _style$scale === void 0 ? [1, 1] : _style$scale;

      var _style$scale2 = _slicedToArray(_style$scale, 2),
          sx = _style$scale2[0],
          sy = _style$scale2[1],
          _style$translate = style.translate;

      _style$translate = _style$translate === void 0 ? [0, 0] : _style$translate;

      var _style$translate2 = _slicedToArray(_style$translate, 2),
          x = _style$translate2[0],
          y = _style$translate2[1];

      if (!graphCenter) return;

      var _graphCenter = _slicedToArray(graphCenter, 2),
          ox = _graphCenter[0],
          oy = _graphCenter[1];

      ctx.translate((ox + x) * dpr, (oy + y) * dpr);
      if (rotate) ctx.rotate(rotate * Math.PI / 180);
      if (sx !== 1 || sy !== 1 || dpr !== 1) ctx.scale(sx * dpr, sy * dpr);
      ctx.translate(-ox, -oy);
    }
  }, {
    key: "setCtxStyle",
    value: function setCtxStyle(_ref3, style) {
      var ctx = _ref3.ctx;
      // Set directly
      ctx.lineCap = style.lineCap;
      ctx.lineJoin = style.lineJoin;
      ctx.lineDashOffset = style.lineDashOffset;
      ctx.shadowOffsetX = style.shadowOffsetX;
      ctx.shadowOffsetY = style.shadowOffsetY;
      ctx.lineWidth = style.lineWidth;
      ctx.textAlign = style.textAlign;
      ctx.textBaseline = style.textBaseline; // Merge global opacity into colors

      var fill = style.fill,
          stroke = style.stroke,
          shadowColor = style.shadowColor,
          opacity = style.opacity;
      var getCtxRealColor = getCtxRealColorWithOpacity(opacity);
      ctx.fillStyle = getCtxRealColor(fill);
      ctx.strokeStyle = getCtxRealColor(stroke);
      ctx.shadowColor = getCtxRealColor(shadowColor);
      var lineDash = style.lineDash,
          shadowBlur = style.shadowBlur; // Avoid negative values

      if (lineDash) ctx.setLineDash(lineDash.map(function (v) {
        return v >= 0 ? v : 0;
      }));
      if (typeof shadowBlur === 'number') ctx.shadowBlur = shadowBlur > 0 ? shadowBlur : 0.001; // Set Ctx font

      var fontStyle = style.fontStyle,
          fontVarient = style.fontVarient,
          fontWeight = style.fontWeight,
          fontSize = style.fontSize,
          fontFamily = style.fontFamily;
      ctx.font = "".concat(fontStyle, " ").concat(fontVarient, " ").concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily);
    }
  }, {
    key: "setCtxGradientColor",
    value: function setCtxGradientColor(_ref4, style) {
      var ctx = _ref4.ctx;
      if (!gradientColorValidator(style)) return;
      var gradientColor = style.gradientColor,
          gradientParams = style.gradientParams,
          gradientType = style.gradientType,
          gradientWith = style.gradientWith,
          gradientStops = style.gradientStops,
          opacity = style.opacity;
      var getCtxRealColor = getCtxRealColorWithOpacity(opacity);

      var _gradientColor = gradientColor.map(getCtxRealColor);

      var _gradientStops = gradientStops === 'auto' ? getAutoColorStops(_gradientColor) : gradientStops;

      var gradient;

      if (gradientType === 'linear') {
        gradient = ctx.createLinearGradient.apply(ctx, _toConsumableArray(gradientParams));
      } else {
        gradient = ctx.createRadialGradient.apply(ctx, _toConsumableArray(gradientParams));
      }

      _gradientStops.forEach(function (stop, i) {
        return gradient.addColorStop(stop, _gradientColor[i]);
      });

      ctx[gradientWith === 'fill' ? 'fillStyle' : 'strokeStyle'] = gradient;
    }
  }]);

  return Style;
}();

export { Style as default };