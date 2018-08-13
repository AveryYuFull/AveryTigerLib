import { IWeChatInterface, IWeChatContructor } from './interface/wechat';
import { IWeChatInitConfig, ISign, ISignDataConfig, IShareOptions, IShareBack } from './interface/config';
import { Device } from '../../library/util/browser/browser';
import { BaseAbstract } from '../../library/basic/base.abstrat';

abstract class WeChatCore

    extends BaseAbstract<IWeChatInitConfig>

    implements IWeChatInterface<IWeChatInitConfig, ICheckJsApiBackParams> {

    private wxConfigData?: Promise<ICheckJsApiBackParams>;

    protected defaultOption: IWeChatInitConfig = { // 默认配置
        jsApiList: [
            'checkJsApi',
            'hideOptionMenu'
        ],
        shareJsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    };

    /**
     * constructor
     *
     * @param {IWeChatInitConfig} options
     * @memberof WeChatCore
     */
    constructor(config: IWeChatInitConfig) {
        super(config);
        this.setDefaultOptions(config);
    }

    /**
     * init wx config
     *
     * @returns {Promise<ICheckJsApiBackParams>}
     * @memberof WeChatCore
     */
    private wxConfig(): Promise<ICheckJsApiBackParams> {
        let self = this;
        let config = self.getOptions();

        let _jsApiList: jsApi[] = config.jsApiList || [];
        let _shareJsApiList: jsApi[] = config.shareJsApiList || [];
        let jsApiList = Array.from(new Set(_jsApiList.concat(_shareJsApiList)));

        return new Promise<ICheckJsApiBackParams>((resolve, reject) => {
            if (jsApiList && jsApiList.length > 0) {
                self.getSign(config)
                    .then((data: ISign) => {
                        if (typeof wx !== 'undefined') {
                            wx.config({
                                debug: config.debug || false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                appId: data.appid, // 必填，公众号的唯一标识
                                timestamp: data.timestamp, // 必填，生成签名的时间戳
                                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                                signature: data.signature, // 必填，签名，见附录1
                                jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            });
                            wx.ready(() => {
                                wx.checkJsApi({
                                    jsApiList: config.jsApiList || [],
                                    success: function (res) {
                                        resolve(res);
                                    }
                                });
                            });
                            wx.error((back) => {
                                reject(back);
                            });
                        } else {
                            console.error('请先引入jweixin.js文件');
                        }
                    });
            }
        });
    }

    /**
     * get sign
     *
     * @param {ISignDataConfig} config
     * @returns {Promise<ISign>}
     * @memberof WeChatCore
     */
    private getSign(config: ISignDataConfig): Promise<ISign> {

        return new Promise<ISign>((resolve, reject) => {

            let { signData } = config;

            /* function instance */
            if (signData instanceof Function) {
                signData = signData();
            }

            /* promise instance */
            if (signData instanceof Promise) {
                signData.then((data) => {
                    if (data && typeof data === 'string') {
                        try {
                            data = JSON.parse(data);
                        } catch (error) {
                        }
                    }
                    resolve(data);
                });
            } else {
                reject('signData is not Promise');
            }

        });
    }

    /**
     * init config
     *
     * @private
     * @param {IWxConfig} [options]
     * @param {boolean} [isReset=false]
     * @memberof WeChatCore
     */
    protected initConfig(isReset: boolean = false): Promise<ICheckJsApiBackParams> {

        if (Device.weixin) {
            if (isReset || !this.wxConfigData) {

                this.wxConfigData = this.wxConfig();
            }
        }
        return this.wxConfigData || new Promise<ICheckJsApiBackParams>(
            (resolve, reject) => {
                // resolve();
            });
    }

    /**
     * set wx share
     *
     * @param {IShareOptions} options 分享选项
     * @param {jsApi|jsApi[]} type jsApi 分享的jsapi
     * @param {IShareBack} resolve resolve 分享完成的回调
     */
    protected setShare(options: IShareOptions, type: jsApi|jsApi[], resolve?: IShareBack) {

        // const link = (options.link || '').replace(/\{/g, '%7B').replace(/\}/g, '%7D');
        const link = (options.link || '').replace(/(\{)|(\})/g, ($0, $1, $2) => {
            let res = '';
            if ($1) {
                res = '%7B';
            } else if ($2) {
                res = '%7D';
            }
            return res;
        });

        this.handlerWxApi(type, _type => { // 调用微信api
            return {
                title: options.title,
                desc: options.desc,
                link: link,
                imgUrl: options.imgUrl,
                success: function () {
                    if (resolve instanceof Function) {
                        resolve({
                            type: _type
                        });
                    }
                },
                cancel: function () {
                    if (resolve instanceof Function) {
                        resolve({
                            type: 'cancel'
                        });
                    }
                },
                fail: function () {
                    if (resolve instanceof Function) {
                        resolve({
                            type: 'fail'
                        });
                    }
                },
            };
        }, options && options.isReset);
    }
    /**
     * 调用微信api
     *
     * @param {(jsApi| jsApi[])} apis 微信api或微信api列表
     * @param {object} [wxApiParam] api需要的参数
     * @param {boolean} [isReset=false] 是否重新初始化config
     * @memberof WeChatCore
     */
    public handlerWxApi(apis: jsApi| jsApi[], wxApiParam?: object| ((type: jsApi) => object), isReset: boolean = false) {
        let self = this;

        return self.initConfig(isReset)
            .then(() => {
                eachApi(apis, (type: jsApi) => {
                    if (wxApiParam) {
                        if (wxApiParam instanceof Function) {
                            wxApiParam = wxApiParam(type);
                        }
                        type && wx[type] && wx[type](wxApiParam);
                    } else {
                        type && wx[type] && wx[type]();
                    }
                });
            });

        /**
         * 遍历api
         *
         * @param {(jsApi|jsApi[])} api 微信api或微信api列表
         * @param {Function} cb 回调
         */
        function eachApi(api: jsApi|jsApi[], cb: Function) {
            if (api && typeof api === 'string') {

                api = [api];
            }

            if (api instanceof Array) {
                api.forEach(item => {
                    if (item && cb instanceof Function) {
                        cb(item);
                    }
                });
            }
        }
    }
    /**
     * 分享
     *
     * @param {IShareOptions} options 分享参数
     * @param {IShareBack} resolve 分享完成后的回调
     * @returns
     * @memberof Weixin
     */
    abstract share(options: IShareOptions, resolve: IShareBack): void;
}



export {
    ISign,
    IWeChatInitConfig,
    ISignDataConfig,
    IShareOptions,
    IShareBack,
    IWeChatContructor,
    WeChatCore
};
