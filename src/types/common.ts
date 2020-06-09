export type Optional<T> = {
  [P in keyof T]?: T[P]
}

export type LiteralUnion<T extends U, U> = T | (U & {})
