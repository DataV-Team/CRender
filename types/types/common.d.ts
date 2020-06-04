export declare type Optional<T> = {
  [P in keyof T]?: T[P]
}
