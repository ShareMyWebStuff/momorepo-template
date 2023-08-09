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
    focused: boolean
}

export const InputDropDown: React.FC<InputDropDownProps> = ( {  name, 
                                                                placeholder, 
                                                                dropdownMinLength, 
                                                                listItems, 
                                                                InputDropDownClass, 
                                                                label, 
                                                                value, 
                                                                setMatchedValue, 
                                                                valueMatched, 
                                                                onChangeHandler, 
                                                                disabled, loading}):JSX.Element => {
            
    // console.log ('listItems')
    // console.log (listItems)

    const [dropdownList, setDropdownList] = useState<ListItemType[]>([])
    const [selectedItem, setSelectedItem] = useState(-1)
    const [focused, setFocused] = useState(false)


    // 
    // Set the dropdownList
    // 
    useEffect (() => {
        if (!valueMatched){
            const valLen = value.length
            if ( valLen > 0) {
                if ( value.length >= dropdownMinLength){
                    const list = listItems.filter( item => {
                        return item.lookup.toLowerCase().indexOf(value.toLowerCase()) !== -1
                    })
                    setDropdownList(list)
                    setFocused(true)
                    setSelectedItem(-1)
                } else if (dropdownList.length > 0) {
                    setFocused(false)
                }
            }
        }
    }, [value])

    //
    // Add event listener, this handles the up arrow (38), down arrow (40) and the enter key
    //
    useEffect( () => {

        const onKeydown = (event: KeyboardEvent) => {
            // console.log ('ONKEYDOWN FN ................................')
            // const { keyCode } = event;
            const { key } = event;

            const noDropdowns = dropdownList.length;

            if (key === 'ArrowDown') {
                event.preventDefault();
                if (selectedItem < (noDropdowns -1)){
                    setSelectedItem ( prev => prev + 1);
                }
            } else if (key === 'ArrowUp') {
                event.preventDefault();
                if ( selectedItem > 0){
                    setSelectedItem ( prev => prev - 1);
                }
            } else if (key === 'Enter'){
                event.preventDefault();

                if (selectedItem !== -1) {
                    if ( !dropdownList[selectedItem].disabled) {
                        setMatchedValue(name, dropdownList[selectedItem].lookup);
                        setDropdownList([])
                        setSelectedItem(-1)
                    }
                }
            }
        }

        window.addEventListener('keydown', onKeydown);

        return () => {
            window.removeEventListener('keydown', onKeydown);
        }
    }, [dropdownList, selectedItem, setMatchedValue, setDropdownList, setSelectedItem] )
    

    //
    // Add listener for creating the dropdown list. If InputDropdown has focus and value not matched then show options.
    //
    useEffect( () => {

        const onInput = (e: any) => {

            const myElem = document.querySelector(`#InputDropDownDiv_${name}`)

            if (!(myElem !== null && myElem.contains(e.target))) {
                setFocused(false)
            }
        }

        window.addEventListener('click', onInput);

        return () => {
            window.removeEventListener('click', onInput);
        }
    }, [] )

    // 
    // When the input dropdown receives focus. Check to the entered lookup data is one of the lookups. 
    // 
    const focusFn = (event: React.FocusEvent) => {
        // console.log ('FOCUS FN ................................')
        if (!valueMatched){
            if (value.length >= dropdownMinLength) {
                setFocused(true)
            }
        }
    }


    const inputId = `InputDropDown_${name}`;
    const cursor = ( loading ? 'cursor-wait': ( !disabled ? 'cursor-pointer': '' ));
    const divAttrs = { 
        className: `${styles.inputDropdown} ${(InputDropDownClass ? InputDropDownClass : '' )}`,
        id: `InputDropDownDiv_${name}`,
        "data-cy": `InputDropDown${ '-' + name }`,
    };

    const attrs = {
        id: inputId,
        name,
        placeholder,
        type: 'text',
        className: `form__input ${cursor}`,
        onChange: onChangeHandler,
        onFocus: focusFn,
        value,
        autoComplete: "off",
        disabled: false
    };

    if ( disabled ) { attrs['disabled'] = true }

    const dropdownClick = (name: string, value: string, disabled: boolean ) => {

        console.log (`dropdownClick  ${name} ${value} ${disabled}`)

        if ( !disabled ){
            setMatchedValue(name, value);
            setFocused(false)
            setSelectedItem(-1)
        }

    }

// console.log ('dropdownList')
// console.log (dropdownList)
// console.log (`selectedItem ${selectedItem}`)
    const itemLength = value.length;
    let dropdown: (JSX.Element | null) = <div id='subjectDropdownID' className={styles.inputDropdownItems} data-cy={`InputDropDown${ '-' + name + '-items' }`}>
        {
            dropdownList.map( (item, idx) => {
                const className = (idx === selectedItem ? styles.active : '') +  (item.disabled ? ` ${styles.disabled}` : '');
                const prefixPos = item.lookup.toLowerCase().indexOf(value.toLowerCase());
                const subjectLen = item.lookup.length;

            return <div className={className} 
                    onMouseEnter={ (e) => {setSelectedItem(idx)} }
                        onClick={e => {e.preventDefault(); dropdownClick(name, item.lookup, (item.disabled === true))}} 
                        key={idx}>
                    {(prefixPos > 0 ? item.lookup.substring(0, prefixPos) : '' )}
                    <strong>{item.lookup.substring(prefixPos, prefixPos+itemLength)}</strong>
                    {( (prefixPos + itemLength) < subjectLen ? item.lookup.substring(prefixPos + itemLength) : '')}
                    {( item.disabled ? ' (selected)': '')}
                    <input type="hidden" value={item.lookup} /></div>
            })
        }
    </div>

    if (dropdownList.length === 0 ){
        dropdown=null;
    }

    return (
        <div {...divAttrs}>
            {(label?<label htmlFor={inputId} className={"form__label " + cursor}>{label}</label>: null)}
            <input {...attrs}/>
            { ( focused ? dropdown : null ) }
        </div>
    );
}

export default InputDropDown;