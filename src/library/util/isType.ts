/**
 * 判断类型
 *
 * @export
 * @param {*} obj
 * @param {string} str
 * @returns
 */
export function isType(obj: any, str: string): boolean {
    let res = false;
    try {
        res = Object.prototype.toString.call(obj) === '[object ' + str + ']';
    } catch (error) {}

    return res;
}
