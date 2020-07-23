export function bound(
  // eslint-disable-next-line
  target: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: false,
    // eslint-disable-next-line
    get(): any {
      Object.defineProperty(target, name, {
        enumerable: false,
        writable: true,
        configurable: true,
        // @ts-ignore
        value: (descriptor.value || descriptor.initializer.call(this)).bind(this),
      })

      // @ts-ignore
      return this[name]
    },
    set(): void {
      throw new Error('Reassign able not after bound!')
    },
  }
}
