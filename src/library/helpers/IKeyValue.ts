/**
 * 键值对
 *
 * @export
 * @interface IKeyValue
 * @template T
 */
export interface IKeyValue<T= any> {
    [key: string]: T;
}
