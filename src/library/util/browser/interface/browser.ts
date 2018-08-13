import { IBaseInterface } from '../../../basic/base.interface';

/**
 * 浏览器内核版本
 *
 * @export
 * @interface IBrowser
 */
export interface IBrowser extends IBaseInterface {
    trident: Boolean; // IE内核
    presto: Boolean; // opera内核
    webKit: Boolean; // 苹果、谷歌内核
    gecko: Boolean; // 火狐内核
    mobile: Boolean; // 是否为移动终端
    ios: Boolean; // ios终端
    android: Boolean; // android终端或者uc浏览器
    iPhone: Boolean; // 是否为iPhone或者QQHD浏览器
    iPad: Boolean; // 是否iPad
    weixin: Boolean; // 微信
}



/**
 * 浏览器设备
 *
 * @export
 * @interface IDevice
 */
export interface IDevice extends IBaseInterface {
    mobile: Boolean; // 移动端
    pc: Boolean; // pc端
    ios: Boolean; // ios
    weixin: Boolean; // 微信
    iPad: Boolean; // 是否iPad
}
