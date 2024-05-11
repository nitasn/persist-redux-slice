/**
 * Dark TypeScript Sorcery.
 * 
 * To be used by a function that takes a single-key object.
 * 
 * Example:
 * ```
 * const logKeyValue = <K extends string, V extends number>(keyValue: SingleKeyRecord<K, V>) => {
 *   const [key, value] = Object.entries(keyValue)[0];
 *   console.log(key, value);
 * }
 * 
 * logKeyValue({ meow: 33 });
 * ```
 */
export type SingleKeyRecord<K extends keyof any, V = number> =
  IsNever<K> extends true ? never :
  IsUnion<K> extends true ? never :
  Record<K, V>;

type IsNever<T> = [T] extends [never] ? true : false;
type IsUnion<T, U = T> = IsNever<T> extends true ? false :
  T extends U ? IsNever<Exclude<U, T>> extends true ? false : true : false;
