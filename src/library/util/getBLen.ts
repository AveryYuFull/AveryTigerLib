
/**
 * 获取字符串长度(中文为两个字节)
 *
 * @param {string} [str=''] 默认为空
 * @returns {number}
 * @memberof StorageCore
 */
export function getBLen(str: string = ''): number {
    let bLen = 0;
    str = (str || '') + '';
    str = str.replace(/[^\x00-\xff]+/g, $1 => {
        bLen += $1.length;
        return '';
    });
    return str.length + ((bLen * 2) || 0);
}

