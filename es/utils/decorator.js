export function bound( // eslint-disable-next-line
target, name, descriptor) {
  return {
    configurable: true,
    enumerable: false,
    // eslint-disable-next-line
    get: function get() {
      Object.defineProperty(target, name, {
        enumerable: false,
        writable: true,
        configurable: true,
        // @ts-ignore
        value: (descriptor.value || descriptor.initializer.call(this)).bind(this)
      }); // @ts-ignore

      return this[name];
    },
    set: function set() {
      throw new Error('Reassign able not after bound!');
    }
  };
}