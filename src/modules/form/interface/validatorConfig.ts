import { FormControl } from '../formControl';

/**
 * 验证的出错信息的对象数据结构
 * @export
 * @interface IValidatorErrorInfo
 */
export interface IValidatorErrorInfo {
    type?: string; // 错误类型
    desc?: any; // 错误的描述信息
}

/**
 * 验证的出错信息对象数据结构
 * @export
 * @interface IValidatorData
 */
export interface IValidatorData {
    errInfo: IValidatorErrorInfo;
}

/**
 * 验证方法
 * @export
 * @interface IValidFunction
 */
export interface IValidFunction {
    (params: FormControl): boolean | IValidatorData | Promise<IValidatorData | null>;
}
