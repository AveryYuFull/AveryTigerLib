export function VmBind(options?: {get?: Function, set?: Function}) : Function {
    return function (target: any, propertyKey: string) {
        const _that = target;
        Object.defineProperty(target, propertyKey, {
            get () {
                const _vmb = _that['__vmb__'] = _that['__vmb__'] || {};
                let _val = null;
                if (options && options.get && options.get instanceof Function) {
                    _val = options.get.call(_that);
                }
                if (typeof _val !== 'undefined') {
                    _vmb[propertyKey] = _val;
                } else {
                    _val = _vmb[propertyKey];
                }
                return _val;
            },
            set (val: any) {
                const _vmb = _that['__vmb__'] = _that['__vmb__'] || {};
                let _setVal = null;
                if (options && options.set && options.set instanceof Function) {
                    _setVal = options.set.apply(_that, val);
                }
                if (typeof _setVal !== 'undefined') {
                    _vmb[propertyKey] = _setVal;
                } else {
                    _vmb[propertyKey] = val;
                }
            }
        })
    }
}