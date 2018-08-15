import { BaseAbstract } from "library/basic/base.abstrat";
import { IControlsOptions } from "./interface/formControlConfig";
import { IFormInterface } from "./interface/form";
import { IValidatorData, IValidFunction } from "./interface/validatorConfig";
import { VmBind } from "library/util/vmBind";

class FormControl extends BaseAbstract<IControlsOptions> implements IFormInterface<any, IValidatorData | boolean | null> {
    /**
     * 默认值
     */
    protected defaultOption: IControlsOptions = {
        asyncAwaitInfo: { // 异步验证等待信息
            errInfo: {
                type: 'asyncWaitErr',
                desc: '正在验证中。。。'
            }
        },
        asyncErrorInfo: null // 异步验证出错信息
    }

    /**
     * 是否更新value值
     * @private
     * @type {(0|1)}
     * @memberof FormControl
     */
    private isDirtyStatus: 0 | 1 = 1;

    /**
     * 是否正在验证中
     * @private
     * @type {(0|1)}
     * @memberof FormControl
     */
    private isWaitStatus: 0 | 1 = 0;

    /**
     * 控制验证数据的节流时间
     * @private
     * @type {NodeJS.Timer | undefined}
     * @memberof FormControl
     */
    private _timeout: NodeJS.Timer | undefined;

    /**
     * 存取当前表单控件的值
     * @private
     * @type {any}
     * @memberof FormControl
     */
    @VmBind({
        set (val: any) {
            const _that:any = this;
            _that.isDirtyStatus = 1;
            _that.stopTimeout();
            _that._timeout = setTimeout(() => {
                _that.getValid();
            }, 300);
        }
    })
    private value: any = null;

    /**
     * 存取当前表单控件的验证结果
     * @private 
     * @type {IValidatorData | null | boolean}
     * @memberof FormControl
     */
    @VmBind({
        get () {
            const _that:any = this;
            let _res = null;
            if (_that.isWaitStatus !== 1 && _that.isDirtyStatus !== 0) {
                _res = _that.getValid();
            }
            return _res;
        }
    })
    private valid: IValidatorData | null | boolean = null;

    constructor (options?: IControlsOptions) {
        super(options);
        if (options && options.defaultValue) {
            this.setValue(options.defaultValue);
        } else {
            this.getValid();
        }
    }

    /**
     * 获取验证结果
     */
    public getValid (): IValidatorData | null | boolean | undefined {
        const _that = this;
        if (_that.isDirtyStatus === 0 || _that.isWaitStatus === 1) {
            return;
        }

        const options = _that.getOptions();
        return eachValids(options && options.valid, 0);

        function eachValids (validFunc: Array<IValidFunction> | IValidFunction, index: number = 0, length: number = 0) {
            let res: IValidatorData | boolean | null = null;
            let _valid: IValidatorData | Promise<IValidatorData> | null = null;

            // 开始调用验证方法
            if (validFunc) {
                if (Array.isArray(validFunc)) {
                    length = validFunc.length;
                    for (let i = index; i < length; i++) {
                        index++;
                        const func = validFunc[i];
                        if (func && func instanceof Function) {
                            _valid = _that.callFunc(func);
                        }
                        if (_valid) {
                            break;
                        }
                    }
                } else {
                    _valid = _that.callFunc(validFunc);
                }
            }

            // 收取验证结果
            if (_valid instanceof Promise) {
                _that.isWaitStatus = 1;
                res = options.asyncErrorInfo || null;
                _valid.then ((info) => {
                    _that.isWaitStatus = 0;
                    if (info || index >= length) {
                        _that.valid = info || null;
                        _that.getValid();
                    } else {
                        res = eachValids(validFunc, index);
                    }
                }, () => {
                    _that.valid = options.asyncErrorInfo || null;
                    _that.isWaitStatus = 0;
                    _that.getValid();
                })
            } else {
                _that.isWaitStatus = 0;
                res = _valid || null;
            }
            _that.valid = res;
            return res;



            // 开始调用验证方法
            // if (Array.isArray(validFunc)) {
            //     length = validFunc.length;
            //     for (let i = index; i < length; i++) {
            //         const func = validFunc[i];
            //         ++index;
            //         if (func && func instanceof Function) {
            //             _res = _that.callFunc(func);
            //             if (_res) {
            //                 break;
            //             }
            //         }
            //     }
            // } else {
            //     _that.isWaitStatus = 0;
            //     _res = _that.callFunc(validFunc);
            // }
            // _that.valid = res;
            // return res;

            // // 收取验证结果
            // if (_res && _res instanceof Promise) {
            //     _that.isWaitStatus = 1;
            //     _res.then(info => {
            //         if (info || index + 1 > length) {
            //             _that.valid = info;
            //             _that.isWaitStatus = 0;
            //             _that.getValid();
            //         } else {
            //             _that.isWaitStatus = 0;
            //             eachValids(validFunc, index);
            //         }
            //     }, () => {
            //         _that.valid = _that.defaultOption.asyncErrorInfo;
            //         _that.isWaitStatus = 0;
            //         eachValids(validFunc, index);
            //     });
            // } else {
            //     _that.valid = _res;
            // }
        }
    }

    /**
     * 调用验证方法的回调
     */
    public callFunc (func: Function): IValidatorData | boolean | null {
        let _res = null;
        _res = func(this);
        return _res;
    }

    public get () {
        return this;
    }

    public getValue (): any | null {
        return this.value;
    }

    /**
     * 设置值
     * @param val {any} 要设置的值
     * @memberof FormControl
     */
    public setValue (val: any): void {
        if (this.value != val) {
            this.value = val;
        }
    }

    /**
     * 停止数据验证的数据节流间隔
     * @memberof FormControl
     */
    public stopTimeout () {
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
    }
}

export {
    FormControl
};