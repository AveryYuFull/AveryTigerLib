import { IBaseInterface } from '../../../library/basic/base.interface';
import { IShareOptions, IShareBack } from './config';
/**
 * wechat constructor
 */
export interface IWeChatContructor<T, P> extends IBaseInterface {

    new(config: T): IWeChatInterface<T, P>;
}

/**
 * wechat interface function
 */
export interface IWeChatInterface<T, P> extends IBaseInterface {

    share(options: IShareOptions, resolve?: IShareBack): void;
}
