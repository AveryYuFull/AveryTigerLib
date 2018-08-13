import { IBaseInterface } from './base.interface';
import { extend } from '../util/extend';

export class BaseAbstract<T> implements IBaseInterface {
    name: string = '';

    protected defaultOption: T = <T>{};

    constructor(options?: T) {
        this.setDefaultOptions(options);
    }

    /**
     * 实例化
     *
     * @static
     * @param {{[key: string]: any}} [options] 实例化参数
     * @returns
     * @memberof BaseAbstract
     */
    static instance<U>(options?: any): U {
        let res: any = new this(options);
        return res;
    }

    /**
     * 设置默认参数
     *
     * @protected
     * @param {T} [options]
     * @memberof BaseAbstract
     */
    protected setDefaultOptions(options?: T): void {
        if (options) {
            this.defaultOption = extend(this.defaultOption, options);
        }
    }

    /**
     * 获取参数
     *
     * @protected
     * @param {...T[]} args
     * @memberof BaseAbstract
     */
    protected getOptions(...args: T[]): T {
        let _that = this;
        let _options = [<T>{}, _that.defaultOption];
        if (args && args.length > 0) {
            _options = _options.concat(args);
        }
        return extend.apply(null, _options);
    }
}
