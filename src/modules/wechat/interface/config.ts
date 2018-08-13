import { IBaseInterface } from '../../../library/basic/base.interface';

// import './jweixin.d';

/**
 * 分享的默认配置
 *
 * @export
 * @interface IWeChatInitConfig
 * @extends {IWxConfig}
 * @extends {ISignDataConfig}
 * @extends {IBase}
 */
export interface IWeChatInitConfig extends IWxConfig, ISignDataConfig, IBaseInterface {
    shareJsApiList?: jsApi[]; // 分享的jsApi
}

/**
 * 微信分签名数据
 *
 * @export
 * @interface ISign
 */
export interface ISign {
    appid: string; // 必填，公众号的唯一标识
    timestamp: string; // 必填，生成签名的时间戳
    nonceStr: string; // 必填，生成签名的随机串
    signature: string; // 必填，签名，见附录1
}

/**
 * 获取签名的后端请求Promise
 *
 * @export
 * @interface ISignDataBack
 */
export type ISignDataBack = () => Promise<ISign>;

/**
 * 获取签名的配置
 *
 * @export
 * @interface ISignDataConfig
 */
export interface ISignDataConfig {
    signData?: Promise<ISign>|ISignDataBack|string;
}











/**
 * 分享参数
 *
 * @export
 * @interface IShareOptions
 */
export interface IShareOptions extends IWeixinShareParams {
    isReset?: boolean; // 是否重置初始化配置
    shareType?: jsApi | jsApi[]; // 分享的Api
}

/**
 * 分享完成后的回调
 *
 * @export
 * @interface IShareBack
 */
export interface IShareBack {
    // tslint:disable-next-line:callable-types
    (data: IShareBackType): void;
}

export interface IShareBackType {
    type: jsApi | 'cancel' | 'fail'; // 回调的类型
}
