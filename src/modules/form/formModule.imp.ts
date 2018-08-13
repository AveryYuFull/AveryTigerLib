import { BaseAbstract } from '../../library/basic/base.abstrat';
import { IFormModule } from './interface/form'
import { IKeyValue } from '../../library/helpers/IKeyValue'
import { IInitFormControlData, IFormFilter, IFormControlDataMap, IFormControlDataItem, IFormControlOptions } from './interface/formConfig'

export class FormModule extends BaseAbstract<null> implements IFormModule {
    /**
     * 初始化表单列表生成表单项的对象数组
     * 
     * @param {IInitFormControlData[][]} formList 表单基础数据列表
     * @param {IKeyValue[]} defaultData 表单列表的初始值
     * @param {IFormFilter} callback 表单的回调函数
     * @returns {FormArray}
     */
    public initFormArray(
        formList: IInitFormControlData[][],
        defaultData?: IKeyValue[],
        callback?: IFormFilter
    ): FormArray {

    }

    public eachValid (
        valid,
        cb?: (p: IValidFunction) => void
    ) {
        if (valid && cb instanceof Function) {
            if (Array.isArray(valid)) {
                valid.forEach(validItem => {
                    cb(validItem)
                })
            } else {
                cb(valid)
            }
        }
    }

    public setValidFun (
        controlData: IFormControlDataItem | IFormControlOptions
    ) {
        let _valid: IValidFunction = []
        eachValid(controlData && controlData.valid, (validItem) => {
            if (validItem instanceof Function) {
                _valid.push(validItem)
            } else {
                let validParam = Object.assign({}, {
                    name: controlData.nameText
                }, {
                    valid: validItem.valid
                })
                _valid.push(generateValidFun(validParam))
            }
        })
        return _valid
    }

    public initFormControl (
        controlData: IFormControlDataItem | IFormControlOptions
    ) {
        let _controlsOptions = {}
        let _valid: IValidFunction[] = this.setValidFun(controlData);
        if (controlData.defaultValue) {
            _controlsOptions.defaultValue = controlData.defaultValue;
        }
        if (_valid && _valid.length) {
            _controlsOptions.valid = _valid;
        }
        return new FormControl(_controlsOptions);
    }

    /**
     * 初始化表单列表生成表单项的对象数组
     * 
     * @param {IFormControlDataMap} formData 表单基础数据列表
     * @param {IKeyValue} defaultData 表单列表的初始值
     * @param {IFormFilter} callback 表单的回调函数
     * @returns {FormArray}
     */
    public initFormGroup(
        formData: IFormControlDataMap,
        defaultData?: IKeyValue,
        callback?: IFormFilter
    ): FormGroup {
        const _that = this;
        let _conMap: IFormControlDataMap = formData || {};
        let _data = {};
        for (let key in _conMap) {
            if (_conMap.hasOwnProperty(key)) {
                const _conItem = _conMap[key];
                _that.initFormControl(_conItem)
            }
        }

    }

   /**
    * 初始化表单列表生成表单项的对象数组
    * 
    * @param {IInitFormControlData[]} formList 表单基础数据列表
    * @param {IKeyValue} defaultData 表单列表的初始值
    * @param {IFormFilter} callback 表单的回调函数
    * @returns {FormArray}
    */
    public initFormData(
        formList: IInitFormControlData[],
        defaultData?: IKeyValue,
        callback?: IFormFilter
    ): FormGroup {
        const _that = this
        const _formList: IInitFormControlData[] = formList || [];
        let _conMap: IFormControlDataMap = {};
        flattenedArray(_conMap, _formList);
        if (defaultData) {
            for (const key in defaultData) {
                if (defaultData.hasOwnProperty(key)) {
                    if (_conMap[key]) {
                        _conMap[key].defaultValue = defaultData[key]
                    } else {
                        _conMap[key] = {
                            controlName: key,
                            defaultValue: defaultData[key]
                        }
                    }
                }
            }
        }
        return _that.initFormGroup(_conMap, defaultData, callback)

        function flattenedArray (conMap: IFormControlDataMap, formList: any[]) {
            formList.forEach(item => {
                if (item && item.formControl && item.formControl.length > 0) {
                    flattenedArray(conMap, item.formControl);
                } else {
                    conMap[item.controlName] = item;
                }
            })
        }
   }
}