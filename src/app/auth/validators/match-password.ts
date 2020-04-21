import { Validator, FormGroup } from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root'})
export class MatchPassword implements Validator {
    validate( formGroup: FormGroup ) { // type AbstractControl for eith formGroup or form control
        const { password, passwordConfirmation } = formGroup.value;
        if ( password === passwordConfirmation) {
            return null;
        } else {
            return { passwordsDontMatch: true};
        }
    }
}
