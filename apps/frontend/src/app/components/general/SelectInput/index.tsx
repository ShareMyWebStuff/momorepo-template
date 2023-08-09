import React from "react";
import {FieldValidationMsg} from '@general/ErrorMsg'

export type OptionsGroup = {
    type: 'group'
    key: number;
    groupName: string;
    disabled?: boolean
    groupDesc: {
        key: number;
        value: string;
        disabled?: boolean
    }[]; 
}

export type OptionsValue = {
    type: 'value'
    key: number;
    value: string;
    disabled?: boolean
}

export type OptionsType = ( OptionsGroup | OptionsValue)


interface SelectInputProps {
    name: string
    title: string
    label?: string
    options: OptionsType[]

    selectInputClass?: string
    loading: boolean
    disabled: boolean
    selectedValue: string
    size?: number
    notSelectedValue?: string
    required?: boolean

    border?: boolean
    onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
    // Error field
    errorMsg?: string
    errorType?: 'fatal'|'warning'|'info'
    errorClass?: string
}

type AttrsType = {
    className: string
    id: string,
    name: string,
    title: string,
    value?: string
    size?: number
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    // onFocus: (e: React.FocusEvent<HTMLSelectElement>) => void,
    disabled?: boolean
    required?: boolean
}

type ValidationComp = {
    className?: string
    msgType: 'fatal'|'warning'|'info'
    msg: string
}

//
// SelectInput
//
// This is a component that creates an select element on the page. The following are passed as props
//
//  
//  dataTest            The data-test name for testing
//  id                  element id value
//  name                name of the element
//  disabled            Sets the select field to read only - when data is loading.
//  onChangeHandler     This is the onchange function
//  onFocusHandler      This is the onfocus function
//  value               The value of the field
//  size                Display size
//  required            Set to true if the element is mandatory
//  notSelectedValue    This is the value shown if nothing has been selected yet
//  options             This is the set of items to be shown in the select field
//  optionKey           This contains the name of the key in the options structure
//  optionValue         This contains the value to be displayed (linked to the optionKey)
//  selectInputClass    This is a class to position the element
//  label               The label name
//
const SelectInput: React.FC<SelectInputProps> = ( { name, title, selectInputClass, border, loading, disabled, onChangeHandler, /* onFocusHandler, */ selectedValue, size, notSelectedValue, required, label, options, errorMsg, errorClass, errorType='info' }) => {

    const inputId = `SelectInput_${name}`;
    // const cursor = ( loading || disabled ? 'cursor-wait': ( !disabled ? 'cursor-pointer': '' ));
    const cursor = ( loading ? 'cursor-wait' : ( disabled ? 'cursor-not-allowed' : 'cursor-pointer'))

    const divAttrs = { className: `form-group ${(selectInputClass ? selectInputClass : '' )}`,
        "data-cy": `SelectInput${ '-' + name }`,
    };
    let validationMsg = null

    const attrs: AttrsType = {
        className: `form__input form__select ${cursor}` + ( border ? ' form-element-border' : ''),
        id: inputId,
        name,
        title,
        onChange: onChangeHandler,
        // onFocus: onFocusHandler,
    };

    if (selectedValue) {attrs['value'] = selectedValue }
    if (disabled) {attrs['disabled'] = true }
    if ( size ) { attrs['size'] = size }
    if ( required ) { attrs['required'] = true  }

    let selectOptions: JSX.Element[] = [];
    if (options !== undefined && options !== null ){
        selectOptions = options.map ( opt => {

            if (opt.type === 'group'  ) {
                const opts = opt.groupDesc.map ( op => {
                    return (<option disabled={(disabled? disabled: false )} key={op['key']} value={op['value']}>{op['value']}</option>)
                });

                return (
                    <optgroup key ={opt.key} label={opt.groupName}>
                        {opts}
                    </optgroup>
                )
            }
            return (
                <option disabled={(disabled? disabled: false )} key={opt['key']} value={opt['value']}>{opt['value']}</option>
            );
        })
    }
    if (!(notSelectedValue === undefined)) {
        selectOptions.unshift (<option key="0" value={notSelectedValue}>{notSelectedValue}</option>);
    }

    if (typeof errorMsg === 'string' && errorMsg.length > 0) {
        let params:ValidationComp={msg: errorMsg, msgType: (['info','warning','fatal'].includes(errorType)?errorType:'info'), className: (!errorClass?'mt-1':errorClass)}
        validationMsg=<FieldValidationMsg {...params} />
    }

    return ( 
        <div {...divAttrs}>
            {(label?<label htmlFor={inputId} className={"form__label "+cursor}>{label}</label>: null)}

            <select {...attrs} >
                {selectOptions}
            </select>
            {validationMsg}

        </div>
     );
}
 
export default SelectInput;