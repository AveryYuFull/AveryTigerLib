import { IBaseInterface } from '../../../library/basic/base.interface';

/**
 * 分享的默认配置
 *
 * @export
 * @interface IStorageInitConfig
 * @extends {IBaseInterface}
 */
export interface IStorageInitConfig extends IStorageHandleOptions, IBaseInterface {

}
/**
 * 操作Storage的选项
 *
 * @export
 * @interface IStorageHandleOptions
 */
export interface IStorageHandleOptions {
    isSetTime?: boolean; // 是否记录当前更新访问时间
    timeout?: number; // 超时时间
}

/**
 * 操作MemoryStorage的选项
 *
 * @export
 * @interface IMemoryStorageHandleOptions
 * @extends {IStorageHandleOptions}
 */
export interface IMemoryStorageHandleOptions extends IStorageHandleOptions {
    storageKey?: string; // 创建MemoryStorage分类的key
}

export interface IStorageItem {
    size: number; // 数据的大小
    _key_?: any; // 储存的数据
    atime?: number; // 读取时间
    ctime?: number; // 写入时间
    timeout?: number; // 超时时间
}
