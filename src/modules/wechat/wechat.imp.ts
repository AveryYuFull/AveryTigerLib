import {
    ISign,
    IWeChatInitConfig,
    ISignDataConfig,
    IShareOptions,
    IShareBack,
    WeChatCore,
    IWeChatContructor
} from './wechat.core';

class WeChat extends WeChatCore {
    name: string = 'Weixin';


    /**
     * 配置参数
     *
     * @param {IWeChatInitConfig} options
     * @memberof WeixinCore
     */
    constructor(config: IWeChatInitConfig) {

        super(config);
    }

    /**
     * 分享
     *
     * @param {IShareOptions} options 分享参数
     * @param {IShareBack} resolve 分享完成后的回调
     * @returns
     * @memberof Weixin
     */
    public share(options: IShareOptions, resolve?: IShareBack): void { // 不能使用返回Promise的形式返回分享完成后的回调
        let self = this;
        let config = self.getOptions();
        let shareType = options.shareType;

        if (shareType && typeof shareType === 'string') {

            shareType = [shareType];
        }
        if (!(shareType instanceof Array) && config.shareJsApiList instanceof Array) {

            shareType = config.shareJsApiList;
        }
        shareType && self.setShare(options, shareType, resolve);

        // if (shareType instanceof Array) {
        //     shareType.forEach(item => {
        //         if (item) {
        //             self.setShare(options, item, resolve);
        //         }
        //     });
        // }
        // this.initConfig(options && options.isReset)
        //     .then(() => {
        //         let config = self.getOptions();
        //         let shareType = options.shareType;

        //         if (shareType && typeof shareType === 'string') {

        //             shareType = [shareType];
        //         }
        //         if (!(shareType instanceof Array) && config.shareJsApiList instanceof Array) {

        //             shareType = config.shareJsApiList;
        //         }

        //         if (shareType instanceof Array) {
        //             shareType.forEach(item => {
        //                 if (item) {
        //                     self.setShare(options, item, resolve);
        //                 }
        //             });
        //         }
        //     });

    }
}

/**
 * 实例化工厂方法
 *
 * @export
 * @param {IWeChatInitConfig} options 配置选项
 * @returns {WeChat}
 */
export default function (options: IWeChatInitConfig): WeChat {

    return WeChat.instance<WeChat>(options);
}

export {
    ISign,
    IWeChatInitConfig,
    ISignDataConfig,
    IShareOptions,
    IShareBack,
    IWeChatContructor,
    WeChat
};
