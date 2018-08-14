import { IValidatorData, IValidFunction } from './validatorConfig';

/**
 * 一个表单项的映射对象的结构
 * @export
 * @interface IControlsOptions
 */
export interface IControlsOptions {
    asyncAwaitInfo?: IValidatorData | null; // 异步验证等待的提示信息
    asyncErrorInfo?: IValidatorData | null; // 异步验证的出错提示信息
    defaultValue?: any; // 表单的默认值
    valid?: IValidFunction | IValidFunction[]; // 异步验证的函数
}
