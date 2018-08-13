
import { MemoryStorage } from './memoryStorage';
import { storageJudge, StorageJudge } from '../../library/util/storageJudge/storageJudge';
import { BaseAbstract } from '../../library/basic/base.abstrat';
import { IStorageInterface } from './interface/storage';
import { IStorageInitConfig, IStorageHandleOptions, IMemoryStorageHandleOptions, IStorageItem } from './interface/config';
import { getBLen } from '../../library/util/getBLen';

abstract class StorageCore extends BaseAbstract<any> implements IStorageInterface {
    /**
     * 是否支持sessionStorage
     *
     * @static
     * @type {(Boolean|undefined)}
     * @memberof StorageCore
     */
    static isSess: Boolean|undefined;
    /**
     * 是否支持localStorage
     *
     * @static
     * @type {(Boolean|undefined)}
     * @memberof StorageCore
     */
    static isLocal: Boolean|undefined;

    /**
     * 存储缓存Storage对象
     *
     * @static
     * @type {(MemoryStorage|undefined)}
     * @memberof StorageCore
     */
    static _cacheStorage: MemoryStorage|undefined;

    /**
     * 判断浏览是否支持storage
     *
     * @private
     * @type {StorageJudge}
     * @memberof StorageCore
     */
    private storageJudge: StorageJudge = storageJudge;
    /**
     * 默认选项
     *
     * @protected
     * @type {IStorageInitConfig}
     * @memberof StorageCore
     */
    protected defaultOption: IStorageInitConfig = {};

    constructor(config: IStorageInitConfig) {
        super(config);
        this.setDefaultOptions(config);
    }
    /**
     * 获取Storage对象(对Storage做兼容和缓存处理)
     *
     * @private
     * @param {string} key 存储类型的KEY
     * @param {string} isStorageType 存放的类型（s存session；l存local；其它为暂存）
     * @returns {SStorage}
     * @memberof SStorageService 返回HttpStorage对象
     */
    private getStorage<T>(key: string, isStorageType?: string): T {
        let res;
        let _that = this;
        let _cacheKey = key;
        let _objKey = _cacheKey + '_' + (isStorageType || 'd');
        let _cacheStorage = StorageCore._cacheStorage = StorageCore._cacheStorage || new MemoryStorage('_get-new-storage_');

        res = _cacheStorage.getItem(_objKey);
        if (!res) {
            if (isStorageType === 's') {// 存session
                StorageCore.isSess = _that.storageJudge.isSessionStorage();
                if (StorageCore.isSess) {
                    res = window.sessionStorage;
                }
            } else if (isStorageType === 'l') {// 存local
                StorageCore.isLocal = _that.storageJudge.isLocalStorage();
                if (StorageCore.isLocal) {
                    res = window.localStorage;
                }
            } else {// 暂存
                res = new MemoryStorage(_cacheKey);
            }
            if (!res) {
                res = new MemoryStorage(_cacheKey);
            }
            _cacheStorage.setItem(_objKey, res);
        }
        return res;
    }
    /**
     * 更新数据
     *
     * @private
     * @param {(MemoryStorage|Storage)} storage SStorage|Storage类型
     * @param {string} key 缓存的Key名
     * @param {*} value 存储的值
     * @param {string} [isStorageType] 存放的类型（s存session；l存local；其它为暂存）
     * @memberof StorageCore
     */
    private updateStorageItem(
        storage: MemoryStorage|Storage,
        key: string,
        value: any,
        isStorageType?: string
    ) {
        if (value instanceof Object) {
            if (!(storage instanceof MemoryStorage) &&
                (isStorageType === 's' && StorageCore.isSess || isStorageType === 'l' && StorageCore.isLocal)) {
                storage.setItem(key, JSON.stringify(value));
            } else if (storage instanceof MemoryStorage) {
                storage.setItem(key, value);
            }
        }
    }
    /**
     * 保存数据
     *
     * @protected
     * @template T
     * @param {T} storage SStorage|Storage类型
     * @param {string} key 缓存的Key名
     * @param {*} value 存储的值
     * @param {string} [isStorageType] 存放的类型（s存session；l存local；其它为暂存）
     * @memberof SStorageCore
     */
    protected setStorageItem(
        storage: MemoryStorage|Storage,
        key: string,
        value: any,
        isStorageType?: string,
        options?: IStorageHandleOptions
    ): void {
        let _that = this;
        let config = _that.getOptions(options);
        if (!key || !storage) {
            return;
        }
        let obj: IStorageItem  = {
            size: 0
        };
        if (typeof value !== 'undefined') {
            obj['_key_'] = value;
            if (config.isSetTime || typeof config.timeout === 'number') {
                obj.ctime = (new Date()).getTime();
                obj.atime = (new Date()).getTime();
                if (typeof config.timeout === 'number' && config.timeout > -1) {
                    obj.timeout = config.timeout;
                }
            }
            try {
                obj.size = getBLen(JSON.stringify(value)); // 记录字符串长度
            } catch (error) {
            }
        }
        _that.updateStorageItem(storage, key, obj, isStorageType);
    }
    /**
     * 读取StorageItem的值
     *
     * @private
     * @param {(MemoryStorage|Storage)} storage
     * @param {string} key
     * @param {string} [isStorageType]
     * @returns {(IStorageItem | undefined)}
     * @memberof StorageCore
     */
    private readStorageItem(storage: MemoryStorage|Storage,
        key: string,
        isStorageType?: string
    ): IStorageItem | undefined {
        let _that = this;
        if (!storage) {
            return undefined;
        }
        let _data: any;

        // 存储的类型
        if (isStorageType === 's' && StorageCore.isSess || isStorageType === 'l' && StorageCore.isLocal) {
            _data = storage.getItem(key);
            if (_data) {
                try {
                    _data = JSON.parse(_data);
                } catch (error) {
                    _that.removeStorageItem(storage, key);
                    _data = undefined;
                }
            }
        } else {
            _data = storage.getItem(key);
        }
        return _data;
    }
    /**
     * 获取数据
     *
     * @protected
     * @param {(SStorage|Storage)} storage Storage对象
     * @param {string} key 获的Key名
     * @param {boolean} isDel 获取后是否删除
     * @param {string} isStorageType 获取的类型（s取session；l取local；其它为存临时）
     * @returns {any} 返回获取的值
     * @memberof SStorageService
     */
    protected getStorageItem<T>(storage: MemoryStorage|Storage,
        key: string,
        isDel?: boolean,
        isStorageType?: string
    ): T|any {
        let _that = this;
        let _data = _that.readStorageItem(storage, key, isStorageType);

        // 取完后删除
        if (isDel && _data) {
            _that.removeStorageItem(storage, key);

        // 设置时间
        } else if (_data && _data.ctime) {
            let nowTime = (new Date()).getTime();

            // 超时移除
            if (typeof _data.timeout === 'number' && (_data.timeout < (nowTime - _data.ctime))) {
                _data = undefined;
                _that.removeStorageItem(storage, key);

                // 更新读取时间
            } else {
                _data.atime = (new Date()).getTime();
                _that.updateStorageItem(storage, key, _data, isStorageType);
            }
        }
        return _data && _data['_key_'] || undefined;
    }

    /**
     * 移除对应Key的数据
     *
     * @protected
     * @param {*} storage storage Storage对象
     * @param {string} key 删除的Key名
     * @memberof SStorageService
     */
    protected removeStorageItem(storage: any, key: string) {
        if (!key ) {
            return;
        }
        storage.removeItem(key);
    }

    /**
     * 清空Storage对象
     *
     * @protected
     * @param {*} storage storage Storage对象
     * @memberof SStorageCore
     */
    protected clearStorage(storage: any) {
        try {
            storage && storage.clear();
        } catch (error) {

        }
    }

    /**
     * 获取sessionStorage对象
     *
     * @protected
     * @returns {sessionStorage} 返回sessionStorage对象
     * @memberof SStorageService
     */
    protected getSessionStorage(): Storage {
        let _session = this.getStorage<Storage>('_session_', 's');
        this.getSessionStorage = () => {
            return _session;
        };
        return _session;
    }
    /**
     * 获取localStorage对象
     *
     * @protected
     * @returns {localStorage} 返回localStorage对象
     * @memberof SStorageService
     */
    protected getLocalStorage(): Storage {
        let _local = this.getStorage<Storage>('_local_', 'l');
        this.getLocalStorage = () => {
            return _local;
        };
        return _local;
    }
    /**
     * 获取MemoryStorage对象
     *
     * @protected
     * @returns {localStorage} 返回localStorage对象
     * @memberof SStorageService
     */
    protected getMemoryStorage(options?: IMemoryStorageHandleOptions): MemoryStorage {
        let storageKey = options && options.storageKey || '';
        let _local = this.getStorage<MemoryStorage>('_data_' + storageKey, 'd');
        return _local;
    }
}

export {
    MemoryStorage,
    StorageCore,
    IStorageInitConfig,
    IStorageInterface,
    IStorageHandleOptions,
    IMemoryStorageHandleOptions
// tslint:disable-next-line:max-file-line-count
};
