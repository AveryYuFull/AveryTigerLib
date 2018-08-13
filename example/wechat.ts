import Wechat from '../src/modules/wechat';
// import Tiger from '../src/modules';
// let tiger = Tiger.init({});
// console.log(tiger);
// console.log(tiger.Weixin.defaultOption);
// console.log(tiger.Weixin1.defaultOption);
// console.log('ssssssssssss');
// tiger.Weixin.share({});

let wechat = Wechat({});
// {
//     jsApiList: [
//         'onMenuShareAppMessage', // 分享给朋友
//         'onMenuShareTimeline' // 分享到朋友圈
//     ],
//     signData() {
//         return new Promise((resolve, reject) => {
//             fetch('//wx.tuhu.cn/home/GetWxJsApiParams?url=' + encodeURIComponent(location.href.split('#')[0])).then(res => {
//                 res.json().then(data => {
//                     resolve({
//                         appid: 'string;', // 必填，公众号的唯一标识
//                         timestamp: 'string;', // 必填，生成签名的时间戳
//                         nonceStr: 'string;', // 必填，生成签名的随机串
//                         signature: 'string' // 必填，签名，见附录1
//                     });
//                 });
//             });
//         });
//     }
// });

wechat.share({});

