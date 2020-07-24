import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { getColorFromRgbValue, getRgbaValue } from '@jiaminghi/color';

/**
 * reverse: false | string    -> RgbaValue
 * reverse: true  | RgbaValue -> string
 */
export function transformColor(reverse) {
  return function (color) {
    var isString = typeof color === 'string';
    var isArray = Array.isArray(color);
    if (isString && reverse) return color;
    if (isArray && !reverse) return _toConsumableArray(color);
    if (isString && !reverse) return getRgbaValue(color);
    if (isArray && reverse) return getColorFromRgbValue(color);
    throw new Error('CRender Style transformColor: Unexpected color!');
  };
}
export function getCtxRealColorWithOpacity(opacity) {
  return function (color) {
    var _color = _toConsumableArray(color);

    _color[3] *= opacity;
    return getColorFromRgbValue(_color);
  };
}
export function gradientColorValidator(style) {
  var gradientColor = style.gradientColor,
      gradientParams = style.gradientParams,
      gradientType = style.gradientType,
      gradientWith = style.gradientWith,
      gradientStops = style.gradientStops;
  if (!gradientColor || !gradientParams) return false;

  if (gradientColor.length === 1) {
    console.warn('CRender Style: The gradient needs to provide at least two colors');
    return false;
  }

  if (gradientType !== 'linear' && gradientType !== 'radial') {
    console.warn("CRender Style: GradientType only supports linear or radial, current value is ".concat(gradientType));
    return false;
  }

  var gradientParamsLength = gradientParams.length;

  if (gradientType === 'linear' && gradientParamsLength !== 4 || gradientType === 'radial' && gradientParamsLength !== 6) {
    console.warn("CRender Style: The expected length of gradientParams is ".concat(gradientType === 'linear' ? '4' : '6'));
    return false;
  }

  if (gradientWith !== 'fill' && gradientWith !== 'stroke') {
    console.warn("CRender Style: GradientWith only supports fill or stroke, current value is ".concat(gradientWith));
    return false;
  }

  if (gradientStops !== 'auto' && !(gradientStops instanceof Array)) {
    console.warn("CRender Style: gradientStops only supports 'auto' or Number Array ([0, .5, 1]), current value is ".concat(gradientStops));
    return false;
  }

  return true;
}
export function getAutoColorStops(color) {
  var stopGap = 1 / (color.length - 1);
  return color.map(function (foo, i) {
    return stopGap * i;
  });
}