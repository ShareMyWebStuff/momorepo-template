import styles from './ToggleSelector.module.scss'

/*
Function    : ToggleSelector

Description : ToggleSelector is a component that has two radio buttons next to each other where each radio button looks like a button.
              One item is always selected.
              Used on the landing page for search (Face To Face / Online).

Props
        toggleSelectorClass     An optional class that can be used to override the default style
        groupName               The group name of the radio buttons. Used to create the id.
        label1                  The label shown in place of the first radio button
        label2                  The label shown in place of the second radio button
        selectorValue1          The value of the first radio button if checked.
        selectorValue2          The value of the second radio button if checked
        value                   The current radio button that is set.
        onChangeHandler         Function Handler that sets the state where the component is called from

Usage

    <ToggleSelector groupName="tuitionLocation" label1="Face To Face" label2="Online" selectorValue1='Face' selectorValue2='Online' value={tuitionLocation} handler={setTuitionLocation} />
 */

type ToggleSelectorProps = {
    groupName: string
    label1: string
    label2: string
    selectorValue1: string
    selectorValue2: string
    value: string
    onChangeHandler: ( e: React.ChangeEvent<HTMLInputElement>) => void
    toggleSelectorClass?: string
    disabled: boolean
    type?: ["formToggleSelectCol"|"formToggleSelectTabs"]
}

export const ToggleSelector: React.FC<ToggleSelectorProps> = (props) => {

    const selectorId1 = `${props.groupName}_${props.selectorValue1}`;
    const selectorId2 = `${props.groupName}_${props.selectorValue2}`;
    const selectorChecked1 = (props.value === props.selectorValue1);
    const selectorChecked2 = (props.value === props.selectorValue2);

    // console.log (`${styles['formToggleSelectCol']}`)
    // console.log (`${styles['formToggleSelectTabs']}`)
    // if ( props.toggleSelectorClass !== undefined ) {
    //     console.log (`${styles[props.toggleSelectorClass]}`)
    // }
    // console.log (props.toggleSelectorClass);

    const divAttrs = { className: `${styles.formToggleSelect} ${(!props.toggleSelectorClass || props.toggleSelectorClass === '' ? '' : styles[props.toggleSelectorClass] )}`,
        "data-cy": `ToggleSelectorTest`
     };

    const attrs1 = {
        type: "radio",
        id: selectorId1,
        name: props.groupName,
        onChange: props.onChangeHandler,
        value: props.selectorValue1,
        checked: selectorChecked1,
        disabled: props.disabled
    };

    const attrs2 = {
        type: "radio",
        id: selectorId2,
        name: props.groupName,
        onChange: props.onChangeHandler,
        value: props.selectorValue2,
        checked: selectorChecked2,
        disabled: props.disabled
    };

    return (
        <div {...divAttrs} >
            <input  {...attrs1} />
            <label htmlFor={selectorId1}>{props.label1}</label>
            <input {...attrs2} />
            <label htmlFor={selectorId2}>{props.label2}</label>

        </div>
    )

}

export default ToggleSelector
