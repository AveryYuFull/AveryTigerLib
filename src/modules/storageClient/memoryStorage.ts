export class MemoryStorage {
    _paramCache = {};
    // tslint:disable-next-line:member-ordering
    static _paramCache: any;
    /**
     * 已存数据的个数
     *
     * @readonly
     * @memberof MemoryStorage
     */
    get length() {
        let keys = Object.keys(this._paramCache['_' + this._key + '_']);
        return keys && keys.length || 0;
    }
    /**
     * 内存储存数据
     * @param {*} key Storage的key
     * @memberof MemoryStorage
     */
    constructor(private _key: string) {
        this._paramCache = MemoryStorage._paramCache = MemoryStorage._paramCache || {};
        this._paramCache['_' + this._key + '_'] = this._paramCache['_' + this._key + '_'] || {};
    }
    /**
     * 获取保存的key
     *
     * @param {number} [index=0]
     * @returns
     * @memberof MemoryStorage
     */
    key(index = 0) {
        let keys = Object.keys(this._paramCache['_' + this._key + '_']);
        return keys && keys[index];
    }

    /**
     * 储存数据
     * @param {String} key 参数的Key名
     * @param {*} value 值
     */
    setItem(key: string, value: any) {
        if (key) {
            this._paramCache['_' + this._key + '_']['_' + key] = value;
        }
    }

    /**
     * 获取登录时的报文体
     * @param {String} key 参数的Key名
     * @returns {type}
     */
    getItem(key: string) {
        let res;
        if (key) {
            res = this._paramCache['_' + this._key + '_']['_' + key];
        }
        return res;
    }

    /**
     * 移除指定Key的数据
     * @param {type} key
     */
    removeItem(key: string) {
        if (key) {
            this._paramCache['_' + this._key + '_']['_' + key] = undefined;
            delete this._paramCache['_' + this._key + '_']['_' + key];
        }
    }

    /**
     * 清除所有数据
     */
    clear() {
        this._paramCache['_' + this._key + '_'] = {};
    }
}
