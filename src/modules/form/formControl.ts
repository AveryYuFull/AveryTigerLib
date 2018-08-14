import { BaseAbstract } from "library/basic/base.abstrat";
import { IControlsOptions } from "./interface/formControlConfig";
import { IFormInterface } from "./interface/form";
import { IValidatorData } from "./interface/validatorConfig";

class FormControl extends BaseAbstract<IControlsOptions> implements IFormInterface<any | null, IValidatorData | boolean | null> {

    
    private value: any = null;

    private valid: IValidatorData | null | boolean = null;
}

export {
    FormControl
};