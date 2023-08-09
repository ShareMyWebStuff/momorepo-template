import React from "react";
import {FieldValidationMsg} from '@general/ErrorMsg'

// 'button'|'checkbox'|'color'|'date'|'datetime-local'|'email'|'file'|'hidden'|'image'|'month'|'number'|'password'|'radio'|'range'|'reset'|'search'|'submit'|'tel'|'text'|'time'|'url' |'week'
interface InputFieldProps {
    inputType: 'text' | 'color' | 'date' | 'email' | 'password' | 'number'
    loading: boolean
    disabled: boolean
    placeholder: string
    name: string
    label?: string
    value: string | number
    InputFieldClass?: string
    min?: (number | string)
    max?: (number | string)
    step?: number
    minLength?: number
    maxLength?: number
    autoComplete?: boolean
    multiple?: any
    readonly?: any
    size?: number
    required?: any
    errorMsg?: string
    errorType?: 'fatal'|'warning'|'info'
    errorClass?: string

    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    // onFocusHandler: (e: React.FocusEvent<HTMLSelectElement>) => void

}

type AttrsType = {
    type: 'text' | 'color' | 'date' | 'email' | 'password' | 'number'
    id: string
    name: string
    placeholder: string
    autoComplete?: 'on' | 'off'
    className?: string
    value: string | number
    required?: any
    disabled?: boolean
    minLength?: number
    maxLength?: number
    min?: (number | string)
    max?: (number | string)
    step?: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type ValidationComp = {
    className?: string
    msgType: 'fatal'|'warning'|'info'
    msg: string
}

//
// InputField
//
// This is a component that creates an input element on the page. The following are passed as props
//
//  inputtype           text / password - this is the html element type
//  InputFieldClass   
//  dataTest            The data-test name for testing
//  name                name of the element
//  label               The label name
//  value               The value of the field
//  placeholder         The fields placeholder text
//  onChangeHandler     This is the onchange function
//  required            Set to true if the element is mandatory
//  disabled            Set to true if the element is disabled
//  minLength           If the field only accepts numeric this is the minimum value.
//  validationError     This is where the element field validation error is placed
//  systemError         This is where a second error with the field input can be placed
//
// eslint-disable-next-line react/display-name
export const InputField: React.FC<InputFieldProps> = React.memo(({ inputType, loading, disabled, placeholder, name, label, InputFieldClass, value
, min, max, step, minLength, maxLength, onChangeHandler, autoComplete, required, errorMsg, errorClass, errorType='info'
}) => {

    const inputId = `InputField_${name}`;
    const cursor = ( loading  || disabled ? 'cursor-wait': ( !disabled ? 'cursor-pointer': '' ));
    let validationMsg = null

    const divAttrs = { className: `${(InputFieldClass ? InputFieldClass : '' )}`,
        'data-cy': `InputField${ '-' + name }`,
    };
    const attrs: AttrsType  = {
        onChange: onChangeHandler,
        type: inputType,
        name: name,
        className: `form__input ${cursor}`,
        value: value,
        placeholder: placeholder,
        id: inputId
    };

    if ( autoComplete !== undefined ) { attrs['autoComplete'] = ( autoComplete ? "on" :"off" )}
    // if ( autoComplete ) { attrs['autoComplete'] = "off"  }
    if ( required ) { attrs['required'] = ""  }
    if ( disabled ) { attrs['disabled'] = true }
    if ( minLength ) { attrs['minLength'] = minLength  }
    if ( maxLength ) { attrs['maxLength'] = maxLength  }
    if ( min ) { attrs['min'] = min }
    if ( max ) { attrs['max'] = max }
    if ( step ) { attrs['step'] = step }

    console.log ('RERENDER INPUT FIELD: ' + name)

    // Show the error component if there is an error
    if (typeof errorMsg === 'string' && errorMsg.length > 0) {
        let params:ValidationComp={msg: errorMsg, msgType: (['info','warning','fatal'].includes(errorType)?errorType:'info'), className: (!errorClass?'mt-1':errorClass)}
        validationMsg=<FieldValidationMsg {...params} />
    }

    return (
        <div {...divAttrs}>
            {(label?<label htmlFor={inputId} className={"form__label " + cursor}>{label}</label>: null)}
            <input {...attrs}/>
            {validationMsg}
        </div>
    );
})

