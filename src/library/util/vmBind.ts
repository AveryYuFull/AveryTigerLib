/**
 * 双向绑定值的装饰器
 */
export function VmBind(options?: {get?: Function; set?: Function}): Function {
    return function (target: any, propertyKey: string) {
        let _key = propertyKey;
        Object.defineProperty(target, propertyKey, {
            set(val: any) {
                let _that = this;
                let _setValue;
                let _vmb = _that['__vmb__'] = _that['__vmb__'] || {};
                if (options && options.set instanceof Function) {
                    _setValue = options.set.call(_that, val);
                }
                if (typeof _setValue !== 'undefined') {
                    _vmb[_key] = _setValue;
                } else {
                    _vmb[_key] = val;
                }
            },
            get() {
                let _that = this;
                let _vmb = _that['__vmb__'] || {};
                let _getValue: any;
                if (options && options.get instanceof Function) {
                    _getValue = options.get.call(_that, _vmb[_key]);
                }
                if (typeof _getValue !== 'undefined') {
                    _vmb[_key] = _getValue;
                }
                return _vmb[_key];
            }
        });
    };
}
