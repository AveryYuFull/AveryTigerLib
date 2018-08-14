import { IInitFormControlData, IFormFilter, IFormControlDataMap } from './formConfig'
import { IKeyValue } from '../../../library/helpers/IKeyValue'
import { IBaseInterface } from 'library/basic/base.interface';
import { IValidatorData } from './validatorConfig';

export interface IFormModule {
    /**
     * 初始化表单列表生成表单项的对象数组
     * 
     * @param {IInitFormControlData[][]} formList 表单基础数据列表
     * @param {IKeyValue[]} defaultData 表单列表的初始值
     * @param {IFormFilter} callback 表单的回调函数
     * @returns {FormArray}
     */
    initFormArray(
        formList: IInitFormControlData[][],
        defaultData?: IKeyValue[],
        callback?: IFormFilter
    ): FormArray;

    /**
     * 初始化表单列表生成表单项的对象数组
     * 
     * @param {IInitFormControlData[]} formList 表单基础数据列表
     * @param {IKeyValue} defaultData 表单列表的初始值
     * @param {IFormFilter} callback 表单的回调函数
     * @returns {FormArray}
     */
    initFormData(
        formList: IInitFormControlData[],
        defaultData?: IKeyValue,
        callback?: IFormFilter
    ): FormGroup;

    /**
     * 初始化表单列表生成表单项的对象数组
     * 
     * @param {IFormControlDataMap} formData 表单基础数据列表
     * @param {IKeyValue} defaultData 表单列表的初始值
     * @param {IFormFilter} callback 表单的回调函数
     * @returns {FormArray}
     */
    initFormGroup(
        formData: IFormControlDataMap,
        defaultData?: IKeyValue,
        callback?: IFormFilter
    ): FormGroup
}

/**
 * form interface function
 */
export interface IFormInterface<T = any, V = any> extends IBaseInterface {
    value: T;
    valid: V;
    get(key?: string | number): FormGroup | FormControl | FormArray | null;
    getValid(): V;
    getValue(): T;
    setValue(defaultData: any, callback?: IFormFilter): any;
}
