
import FormModule, { IInitControlData, IFormControlDataMap, FormControl, IValidetorData } from '../src/modules/form';

// 表单demo--------------------------------------------------------------------------------------
let sForm = FormModule({
    validate: {
        rules: {
            vNumber: {
                reg: /^\s*[0-9]+\s*$/,
                infoTxt: '格式不正确'
            }
        }
    }
});

let formList: IInitControlData[] = [{
    nameText: '图片:',
    formControl: [{
        nameText: '图片1:',
        controlName: 'tp1',
        list: [{
            type: 'button',
            nameText: '上传图片'
        }]
    }, {
        nameText: '图片2:',
        controlName: 'tp2',
    }]
}, {
    nameText: '图片:',
    controlName: 'tp',
    defaultValue: 'pen@qq.com',
    list: [{
        type: 'button',
        nameText: '上传图片'
    }],
    valid: {
        format: ['vEmail']
    }
}, {
    nameText: 'AE动效:',
    controlName: 'dx',
    defaultValue: 'vvvvvvvvv',
    list: [{
        type: 'button',
        nameText: '上传AE图片'
    }, {
        nameText: '（每个页面最多只支持1个动图）'
    }],
    valid: {
        format: ['vEmail']
    }
}, {
    nameText: '浮层标题:',
    controlName: 'bt',
    placeholder: '例如"活动规则“、”中奖名单“',
    list: [{
        nameText: '（限20个字）'
    }],
    valid: {
        format: ['vEmail']
    }
}, {
    nameText: '浮层文案：',
    controlName: 'wa',
    valid: {
        required: true
    }
}];

let formList1: IFormControlDataMap = {
    bt: {
        nameText: '数字',
        placeholder: '例如"活动规则“、”中奖名单“',
        defaultValue: 'vvvvvvvvvbbbbbtttttt',
        list: [{
            nameText: '（限20个字）'
        }],
        valid: {
            format: ['vNumber']
        }
    },
    wa: {
        nameText: '浮层文案：',
        controlName: 'wa',
        defaultValue: 'vvvvvvvvvwwwwwwwaaaaaaaaaa',
        valid: {
            format: ['vNumber1'],
            required: true
        }
    }
};

let formList2: IInitControlData[] = [{
    nameText: '浮层标题:',
    controlName: 'userErrBt',
    placeholder: '例如"活动规则“、”中奖名单“',
    list: [{
        nameText: '（限20个字）'
    }],
    valid: [{
        format: ['vEmail']
    }, function(control: FormControl) {
        console.log('userValidErrInfo:', control);
        return {
            errInfo: {
                desc: '不管怎么样都是错的',
                type: '自定义错误'
            }
        };
    }]
}, {
    nameText: '浮层标题:',
    controlName: 'userErrBt',
    placeholder: '例如"活动规则“、”中奖名单“',
    list: [{
        nameText: '（限20个字）'
    }],
    valid: [{
        format: ['vEmail']
    }, (control: FormControl) => {
        console.log('userPromiseValidErrInfo:', control);
        let _promise = new Promise<IValidetorData|null>((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    errInfo: {
                        desc: '不管怎么样都是错的',
                        type: '自定义错误'
                    }
                });
            }, 4000);
        });

        return _promise;
    }]
}, {
    nameText: '浮层标题:',
    controlName: 'userErrBtNull',
    placeholder: '例如"活动规则“、”中奖名单“',
    list: [{
        nameText: '（限20个字）'
    }],
    valid: [{
        format: ['vEmail']
    }, (control: FormControl) => {
        console.log('userPromiseValidErrInfo:', control);
        let _promise = new Promise<IValidetorData|null>((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, 4000);
        });

        return _promise;
    }]
}];

let formMod = sForm.initFormData(formList); // 结果是对象 （Controls）formMod === formModGroup1
formMod.setItem(sForm.initFormControl(formList1.bt), 'setItemBt'); // 动态增加一项key为setItemBt

let formModArr = sForm.initFormArray([formList, formList]); // 结果是数组（GroupList）
formModArr.setItem(sForm.initFormData(formList)); // 动态增加一项到尾部
formModArr.setItem(sForm.initFormGroup(formList1), 1); // 动态增加一项到第二项


let formModGroup = sForm.initFormGroup(formList); // 结果是数组（ControlList）
formModGroup.setItem(sForm.initFormControl(formList1.bt), 2); // 动态增加一项到第三项

let formModGroup1 = sForm.initFormGroup(formList1); // 结果是对象 （Controls）

let formMod1 = sForm.initFormData(formList2); // 结果是对象 （Controls）

console.log('\n\ninitFormData：');
console.log(formMod);
console.log('value:', formMod.value); // 结果是对象
console.log('validError:', formMod.valid);

console.log('\n\ninitFormArray：');
console.log(formModArr);
console.log('value:', formModArr.value); // 结果是数组
console.log('validError:', formModArr.valid);

console.log('\n\ninitFormGroup：');
console.log(formModGroup);
console.log('value:', formModGroup.value); // 结果是数组
console.log('validError:', formModGroup.valid);

console.log('\n\ninitFormGroup1：');
console.log(formModGroup1);
console.log('value:', formModGroup1.value); // 结果是对象
console.log('validError:', formModGroup1.valid);

console.log('\n\nformMod1：');
console.log(formMod1);
console.log('value:', formMod1.value); // 结果是对象
console.log('0000validError:', formMod1.valid);
setTimeout(() => {
    console.log('3000validError:start');
    console.log('3000validError:', formMod1.valid);
}, 3000);

setTimeout(() => {
    console.log('6000validError:start');
    console.log('6000validError:', formMod1.valid);
}, 6000);

console.log(sForm.validate.getRegExp()); // 正则
