import React, { useState, useEffect, useRef } from 'react'
import styles from './InputDropdown.module.scss'

//
// InputDropDown
//
// This component displays a dropdown if the entered text does not specifically match.
//
//  name                name of the element
//  disabled            Set to true if the element is disabled
//  loading             Set to true if the elements data is loading
//  dataTest            The data-test name for testing
//  InputDropDownClass   
//  placeholder         The fields placeholder text
//  label               The label name
//  dropdownMinLength   This is the minimum number of characters entered before the dropdown is displayed
//  arrayList           This si the list of allowed values
//  value               The current entered text
//  setMatchedValue     A function to allow the text to be set if the dropdown is clicked on
//  valueMatched        If the value matches an item in the array
//  onChangeHandler     
//
// interface InputDropDownProps<T> {

//     name: string
//     placeholder: string
//     dropdownMinLength: string

//     listItems: T,
//     listKey: string,

//     InputDropDownClass: string,

//     label?: string,

//     value: string,
//     setMatchedValue: ( name: string, value: string) => void,
//     valueMatched: boolean,

//     onChangehandler: ( e: React.ChangeEvent<HTMLInputElement>) => void

//     disabled: boolean,
//     loading: boolean

// }

interface ListItemType {
    lookupId: number
    lookup: string
    disabled?: boolean
}



interface InputDropDownProps {

    name: string
    placeholder: string
    label?: string,
    InputDropDownClass?: string
    dropdownMinLength: number

    listItems: ListItemType[],
    value: string,
    setMatchedValue: ( name: string, value: string) => void
    valueMatched: boolean,

    onChangeHandler: ( e: React.ChangeEvent<HTMLInputElement>) => void

    disabled: boolean,
    loading: boolean
}

interface dropdownState {
    dropdownList: ListItemType[],
    selectedItem: number,
    focused: boolean,
    disabledClick: boolean
}

export const InputDropDown: React.FC<InputDropDownProps> = (
    {name, placeholder, dropdownMinLength, listItems, InputDropDownClass, label, value, setMatchedValue, valueMatched, onChangeHandler, disabled, loading}):JSX.Element => {
        console.log ('listItems')
        console.log (listItems)
        const [ dropdownState, setDropdownState ] = useState<dropdownState> ({
        dropdownList: [],
        selectedItem: -1,
        focused: false,
        disabledClick: false
    });

    const subRef = useRef<HTMLInputElement>(null)

    //
    // Add listener for creating the dropdown list. If InputDropdown has focus and value not matched then show options.
    //
    useEffect( () => {

        const onInput = () => {
            console.log ('ONINPUT ................................')

            let list = [];
            if (dropdownState.focused && !valueMatched){

                if (value.length === 0) {
                    console.log ('1 - setDropdownState')
                    setDropdownState ({...dropdownState, dropdownList: [], selectedItem: -1, disabledClick: false});
                    return false;
                }
                const valueLength = value.length;
    
                if ( dropdownMinLength !== undefined && dropdownMinLength <= valueLength ) {

                    list = listItems.filter( item => {
                        return item.lookup.toLowerCase().indexOf(value.toLowerCase()) !== -1
                    })
                    console.log ('2 - setDropdownState')
                    setDropdownState ({...dropdownState, dropdownList: list, selectedItem: -1, disabledClick: false});
                } else if (dropdownState.dropdownList.length > 0) {
                    console.log ('3 - setDropdownState')
                    setDropdownState ({...dropdownState, dropdownList: [], selectedItem: -1, disabledClick: false});
                }
            }else {
                console.log ('4 - setDropdownState')
                setDropdownState ({...dropdownState, dropdownList: [], selectedItem: -1, disabledClick: false});
            }
        }

        window.addEventListener('input', onInput);

        return () => {
            window.removeEventListener('input', onInput);
        }
    }, [value, dropdownState, dropdownMinLength, listItems, value, valueMatched] )
    
    //
    // Add event listener, this handles the up arrow (38), down arrow (40) and the enter key
    //
    useEffect( () => {

        const onKeydown = (event: KeyboardEvent) => {
            console.log ('ONKEYDOWN FN ................................')

            // const { keyCode } = event;
            const { key } = event;

            const noDropdowns = dropdownState.dropdownList.length;

            if (key === 'ArrowDown') {
                event.preventDefault();
                console.log ('5 - setDropdownState')
                console.log (dropdownState)
                if (dropdownState.selectedItem < (noDropdowns -1)){
                    setDropdownState ({...dropdownState, selectedItem: dropdownState.selectedItem + 1, disabledClick: false});
                }
            } else if (key === 'ArrowUp') {
                event.preventDefault();
                console.log ('6 - setDropdownState')
                console.log (dropdownState)
                if ( dropdownState.selectedItem > 0){
                    setDropdownState ({...dropdownState, selectedItem: dropdownState.selectedItem - 1, disabledClick: false});
                }
            } else if (key === 'Enter'){
                event.preventDefault();

                if (dropdownState.selectedItem !== -1) {
                    if ( !dropdownState.dropdownList[dropdownState.selectedItem].disabled) {
                        setMatchedValue(name, dropdownState.dropdownList[dropdownState.selectedItem].lookup);
                        console.log ('7 - setDropdownState')
                        console.log (dropdownState.dropdownList[dropdownState.selectedItem])
                        setDropdownState ({...dropdownState, dropdownList: [], selectedItem: -1, disabledClick: false});
                    }
                }
            }
        }

        window.addEventListener('keydown', onKeydown);

        return () => {
            window.removeEventListener('keydown', onKeydown);
        }
    }, [dropdownState, name, setMatchedValue] )
    

    //
    // This detects is a click is outside the input dropdown, the surrounding div needs the tabIndex set to "0" for this to work
    // 
    const blurFn = (event: React.FocusEvent<HTMLInputElement>) => {
        console.log ('BLUR FN  ................................')
        console.log (event)
        console.log (event.relatedTarget)

        if (event.relatedTarget === null) {
            setTimeout ( () => {
                console.log ('dropdownState')
                console.log (dropdownState)
                console.log ('8 - setDropdownState')
                setDropdownState ({...dropdownState, dropdownList: [], focused: false, selectedItem: -1, disabledClick: false});
            }, 100)
        }
    }

    // 
    // When the input dropdown receives focus. Check to the entered lookup data is one of the lookups. 
    // 
    const focusFn = (event: React.FocusEvent) => {
        console.log ('FOCUS FN ................................')
        const valueLength = value.length;
        let list:ListItemType [] = [];

        const subjectFound = listItems.find( item => item.lookup === value);

        if ( subjectFound === undefined && dropdownMinLength !== undefined && dropdownMinLength <= valueLength ) {

            list = listItems.filter( item => {
                const a = item.lookup.toLowerCase().indexOf(value.toLowerCase());
                return item.lookup.toLowerCase().indexOf(value.toLowerCase()) !== -1
            })

            if ( list.length === 1 && list[0].lookup === value) {
                list = [];
            }
        } 
        console.log ('9 - setDropdownState')
        setDropdownState ({...dropdownState, dropdownList: list, selectedItem: -1, focused: true, disabledClick: false});
    }


    const inputId = `InputDropDown_${name}`;
    const cursor = ( loading ? 'cursor-wait': ( !disabled ? 'cursor-pointer': '' ));
    const divAttrs = { 
        className: `${styles.inputDropdown} ${(InputDropDownClass ? InputDropDownClass : '' )}`,
        "data-cy": `InputDropDown${ '-' + name }`,
        // tabIndex: "0"
    };

    const attrs = {
        id: inputId,
        name,
        placeholder,
        type: 'text',
        className: `form__input ${cursor}`,
        onChange: onChangeHandler,
        onBlur: blurFn,
        onFocus: focusFn,
        value,
        autoComplete: "off",
        disabled: false
    };

    if ( disabled ) { attrs['disabled'] = true }

    const dropdownClick = (name: string, value: string, disabled: boolean ) => {
        if ( !disabled) {
            setMatchedValue(name, value);
        }
        console.log ('10 - setDropdownState')
        console.log (dropdownState)
        console.log (disabled)
        console.log (subRef.current)
        if (!disabled && subRef.current!== null) {
            subRef.current.focus();
        }
        setDropdownState ({...dropdownState, dropdownList: [], selectedItem: -1, focused: false, disabledClick: disabled});
    }

console.log ('dropdownState.dropdownList')
console.log (dropdownState.dropdownList)
    const itemLength = value.length;
    let dropdown: (JSX.Element | null) = <div className={styles.inputDropdownItems} data-cy={`InputDropDown${ '-' + name + '-items' }`}>
        {
            dropdownState.dropdownList.map( (item, idx) => {
                const className = (idx === dropdownState.selectedItem ? styles.active : '') + (item.disabled ? styles.disabled : '');
                const prefixPos = item.lookup.toLowerCase().indexOf(value.toLowerCase());
                const subjectLen = item.lookup.length;

            return <div className={className} onClick={e => {e.preventDefault(); dropdownClick(name, item.lookup, (item.disabled === true))}} key={idx}>
                    {(prefixPos > 0 ? item.lookup.substring(0, prefixPos) : '' )}
                    <strong>{item.lookup.substring(prefixPos, prefixPos+itemLength)}</strong>
                    {( (prefixPos + itemLength) < subjectLen ? item.lookup.substring(prefixPos + itemLength) : '')}
                    {( item.disabled ? ' (selected)': '')}
                    <input type="hidden" value={item.lookup} /></div>
            })
        }
    </div>

    if (dropdownState.dropdownList.length === 0 ){
        dropdown=null;
    }

    return (
        <div {...divAttrs}>
            {(label?<label htmlFor={inputId} className={"form__label " + cursor}>{label}</label>: null)}
            <input ref={subRef} {...attrs}/>
            { ( dropdownState.focused ? dropdown : null ) }
        </div>
    );
}

export default InputDropDown;