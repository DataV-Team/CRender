import _typeof from "@babel/runtime/helpers/typeof";
// eslint-disable-next-line
export function deepClone(obj) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map([]);
  if (obj === null || _typeof(obj) !== 'object') return obj;
  if (cache.has(obj)) return cache.get(obj); // eslint-disable-next-line

  var clone = Array.isArray(obj) ? [] : {};
  cache.set(obj, clone); // @ts-ignore

  Object.keys(obj).forEach(function (key) {
    return clone[key] = deepClone(obj[key], cache);
  });
  return clone;
}
export function debounce(callback) {
  var _this = this;

  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var timer = undefined;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timer) clearTimeout(timer);
    timer = window.setTimeout(function () {
      // @ts-ignore
      callback.call.apply(callback, [_this].concat(args));
    }, delay);
  };
}