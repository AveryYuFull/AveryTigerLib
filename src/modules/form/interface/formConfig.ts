import { IBaseInterface } from '../../../library/basic/base.interface'

export interface IControlGroupItem {
    type?: string; // 列表类型
    nameText?: string; // 列表名字
    value?: any; // 值
}

/**
 * 表单项的参数
 * 
 * @export
 * @interface IFormControlOptions
 */
export interface IFormControlOptions {
    type?: string; // 表单项类型    
    nameText?: string; // 名称
    defaultValue?: any; // 表单项的默认值
    valid?: false; // 校验数据参数
    placeholder?: string; // 表单的底纹
    readonly?: true; // 是否只读
    isChecked?: true; // 是否为选项
    list?: IControlGroupItem[]; // 输入项组的列表
}

/**
 * 表单项的数据类型
 * 
 * @interface IFormControlDataItem
 * @extends IFormControlOptions
 */
export interface IFormControlDataItem extends IFormControlOptions, IBaseInterface {
    controlName?: string; // 表单控件的字段名
}

/**
 * 表单项的数据类型
 * 
 * @interface IFormControlDataList
 */
export interface IFormControlDataList extends IBaseInterface {
    nameText?: string; // 名称
    formControl?: IInitFormControlData[]; // 控件列表
}

export type IInitFormControlData = IFormControlDataItem | IFormControlDataList;

/**
 * 数据过滤器(返回当前项的默认值)
 */
export interface IFormFilter {
    (params: IFormControlOptions, val: any): any
}

/**
 * 表单项数据的map(包含controlName)
 */
export interface IFormControlDataMap {
    [controlName: string]: IFormControlOptions | IFormControlDataItem;
}