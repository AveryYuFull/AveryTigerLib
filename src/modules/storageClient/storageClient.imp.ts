import {
    MemoryStorage,
    StorageCore,
    IStorageInitConfig,
    IStorageInterface,
    IStorageHandleOptions,
    IMemoryStorageHandleOptions
} from './storageClient.core';

/**
 * 本地数据存储
 *
 * @export
 * @class StorageClient
 */
class StorageClient extends StorageCore {// 存储

    constructor(config: IStorageInitConfig) {
        super(config);
    }

    /**
     * 设置临时变量
     *
     * @param {String} key 存储的Key名
     * @param {any} value 存储的值
     * @memberof StorageClient
     */
    setMemory(key: string, value: any, options?: IMemoryStorageHandleOptions): void {
        let _that = this;
        this.setStorageItem(_that.getMemoryStorage(options), key, value, '', options);
    }

    /**
     * 获取临时变量
     *
     * @param {String} key 获取的Key名
     * @param {boolean} isDel 获取后是否删除
     * @returns {any} 返回存储的值
     * @memberof StorageClient
     */
    getMemory<T>(key: string, isDel?: boolean, options?: IMemoryStorageHandleOptions): T {
        let _that = this;
        return this.getStorageItem<T>(_that.getMemoryStorage(options), key, isDel, '');
    }

    /**
     * 移除指定Key的临时变量
     *
     * @param {String} key 移除的Key名
     * @memberof StorageClient
     */
    removeMemory(key: string, options?: IMemoryStorageHandleOptions): void {
        let _that = this;
        _that.removeStorageItem(_that.getMemoryStorage(options), key);
    }

    /**
     * 清除缓存的Data
     *
     * @memberof StorageClient
     */
    clearMemory(options?: IMemoryStorageHandleOptions) {
        let _that = this;
        return _that.clearStorage(_that.getMemoryStorage(options));
    }


    /**
     * 设置Session
     *
     * @param {String} key 存储的Key名
     * @param {any} value 存储的值
     * @memberof StorageClient
     */
    setSession(key: string, value: any, options?: IStorageHandleOptions): void {
        let _that = this;
        this.setStorageItem(_that.getSessionStorage(), key, value, 's', options);
    }

    /**
     * 获取session
     *
     * @param {String} key 获取的Key名
     * @param {Boolean} isDel 获取后是否删除
     * @returns {T} 返回存储的值
     * @memberof StorageClient
     */
    getSession<T>(key: string, isDel?: boolean): T {
        let _that = this;
        return this.getStorageItem<T>(_that.getSessionStorage(), key, isDel, 's');
    }

    /**
     * 移除指定Key的Session
     *
     * @param {String} key 移除的Key名
     * @memberof StorageClient
     */
    removeSession(key: string): void {
        let _that = this;
        this.removeStorageItem(_that.getSessionStorage(), key);
    }

    /**
     * 清除缓存的Session
     *
     * @memberof StorageClient
     */
    clearSession(): void {
        let _that = this;
        return _that.clearStorage(_that.getSessionStorage());
    }

    /**
     * 设置local存储的值
     *
     * @param {String} key 存储的Key名
     * @param {any} value 存储的Key值
     * @memberof StorageClient
     */
    setLocal(key: string, value: any, options?: IStorageHandleOptions): void {
        let _that = this;
        this.setStorageItem(_that.getLocalStorage(), key, value, 'l', options);
    }

    /**
     * 获取local存储的值
     *
     * @param {String} key 获取的Key名
     * @param {Boolean} [isDel]
     * @returns {*}
     * @memberof StorageClient
     */
    getLocal<T>(key: string, isDel ?: boolean): T {
        let _that = this;
        return this.getStorageItem<T>(_that.getLocalStorage(), key, isDel, 'l');
    }

    /**
     * 移除指定Key的local的值
     *
     * @param {String} key 移除的Key名
     * @memberof StorageClient
     */
    removeLocal(key: string): void {
        let _that = this;
        this.removeStorageItem(_that.getLocalStorage(), key);
    }


    /**
     * 清除缓存的Local
     *
     * @memberof StorageClient
     */
    clearLocal(): void {
        let _that = this;
        return _that.clearStorage(_that.getLocalStorage());
    }

    /**
     * 设置Cookie
     *
     * @param {string} key 设置的Cookie名称
     * @param {string} value 设置的Cookie值
     * @param {number} time 设置Cookie失效时间
     * @memberof StorageClient
     */
    setCookie(key: string, value: string, time ?: number): void {
        let expires = '';
        if (typeof value === 'undefined') {
            value = '';
        }

        if (!key) {
            return;
        }
        if (time) {
            let date = new Date();
            date.setTime(date.getTime() + time); // (days * 24 * 60 * 60 * 1000)
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = key + '=' + value + expires + '; path=/';
    }

    /**
     * 获取cookie的值
     *
     * @param {string} key 设置的Cookie名称
     * @returns {string|Null} 返回对应Key的值或null
     * @memberof StorageClient
     */
    getCookie(key: string): string|null {
        let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
        let _cookie = document.cookie;
        let arr = _cookie && _cookie.match(reg);
        if (arr) {
            return decodeURI(arr[2] || '') || '';
        } else {
            return null;
        }
    }


    /**
     * 移除cookie对应key的值
     *
     * @param {string} key 移除的Cookie的名称
     * @memberof StorageClient
     */
    removeCookie(key: string): void {
        let val = this.getCookie(key);
        if (val !== null) {
            this.setCookie(key, '', -1);
        }
    }

    /**
     * 清除所有Cookie
     */
    clearCookie(): void {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (let i = 0; i < keys.length; i++) {
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
            }
        }
    }
    /**
     * 清除全部缓存
     *
     * @memberof StorageClient
     */
    clearAll(options?: IStorageHandleOptions): void {
        let _that = this;
        _that.clearMemory(options);
        _that.clearSession();
        _that.clearLocal();
        _that.clearCookie();
    }
}

/**
 * 实例化工厂方法
 *
 * @export
 * @param {IStorageInitConfig} options 配置选项
 * @returns {StorageClient}
 */
export default function (options: IStorageInitConfig): StorageClient {

    return StorageClient.instance<StorageClient>(options);
}

export {
    StorageClient,
    MemoryStorage,
    StorageCore,
    IStorageInitConfig,
    IStorageInterface,
    IStorageHandleOptions,
    IMemoryStorageHandleOptions
};
