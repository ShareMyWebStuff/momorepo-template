"use client";
import React, { useState, useEffect } from 'react'
import ToggleSelector from '@general/ToggleSelector'
import InputDropDown from '@general/InputDropdown'
import SelectInput, { OptionsType } from '@general/SelectInput';
import { InputField } from '@general/InputField';
import { tuitionSubjects, tuitionLevels } from '@constants/constantsSubjects';

import styles from './LandingBanner.module.scss'

// 
// Interface for the useState formData
// 
interface IFormData {
    tuitionLocation: string
    listItems:{lookupId: number; lookup: string}[]
    subject: string
    subjectMatched: boolean
    level: string
    levelOptionsSet: boolean
    levelOptions: OptionsType[]
    location: string
    disabled: boolean
}

 
const LandingBanner: React.FC = ( ) => {

    const [formData, setFormData] = useState<IFormData> ({
        tuitionLocation: 'Face',
        listItems: [ {lookupId: 1, lookup: 'Maths'} ],
        subject: '',
        subjectMatched: false,
        level: 'All levels',
        levelOptionsSet: false,
        levelOptions: [],
        location: '',
        disabled: false
    });

    const [formErrors, setFormErrors] = useState ( {errors: false, errorMsgs: {}});

    // 
    // On initial load create subject list for the dropdown
    // 
    useEffect ( () => {
        const listItemsLookup = tuitionSubjects.map ( subject => {
            return {lookupId: subject.subjectId, lookup: subject.subject}
        })

        setFormData ( (prev: IFormData): IFormData => { return {...prev, listItems: listItemsLookup } })
    }, [])

    // 
    // When the choosen subject changes, create the subject level list.
    // If the user selects Maths -> set the level dopdown to show the academic levels
    // 
    useEffect ( () => {

        if (formData.subjectMatched) {

            const levelOptions: OptionsType[] = [];
            let levelOption: OptionsType = { type: 'group', key: 1, groupName: "", groupDesc: [] }

            // Get the subject
            const foundSubjects = tuitionSubjects.find ( sub => sub.subject === formData.subject )

            if ( !foundSubjects) {
                setFormData ( (prev: IFormData): IFormData => { return {...prev, levelOptions: [] } })
            } else {

                // Get the categories the subject is held in
                foundSubjects.categories.forEach ( (cat, idx) => {

                    // Look up the subjects levels
                    const foundLevel = tuitionLevels[cat.level]

                    if ( foundLevel && foundLevel.type === 'value') {
                        levelOptions.push ({type: foundLevel.type, key: foundLevel.key, value: foundLevel.name });
                    } else if (foundLevel && foundLevel.type === 'group'){
                        levelOption = {type: foundLevel.type, key: foundLevel.key, groupName: foundLevel.name, groupDesc: [] }

                        for ( let item of foundLevel.items) {
                            levelOption.groupDesc.push ({key: item.subjectLevelItemId + 10000, value: item.levelItem })
                        }
                        levelOptions.push (levelOption)

                    } else {
                        setFormData ( (prev: IFormData): IFormData => { return {...prev, levelOptions: [] } })
                        return
                    }
                } )
                setFormData ( (prev: IFormData): IFormData => { return {...prev, levelOptions: levelOptions } })
            }
        } else {
            setFormData ( (prev: IFormData): IFormData => { return {...prev, levelOptions: [] } })
        }

    }, [formData.subject, formData.subjectMatched, tuitionSubjects, tuitionLevels])

    const lvlDisabled = !formData.subjectMatched;
    const btnDisabled = !((formData.tuitionLocation === 'Face' && formData.subjectMatched && formData.location.length >= 2) || (formData.tuitionLocation === 'Online' && formData.subjectMatched ))

    // The levels handler for its selection
    const onChangeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setFormData ({...formData, [event.target.name]: event.target.value });
    }

    // The handler for the location entry
    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData ({...formData, [e.target.name]: e.target.value });
    }

    // The dropdown handler for the subject selection
    const onDropdownHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const matchField = `${event.target.name}Matched`
        if ( formErrors.errors ) {
            setFormErrors ( {errors: false, errorMsgs: {} });
        }
        setFormData ({...formData, [event.target.name]: event.target.value, [matchField]: false });
    }

    // 
    // Sets the matched value
    // 
    const setMatchedValue = (name: string, value: string) => {
        const matchField = `${name}Matched`
        if ( formErrors.errors ) {
            setFormErrors ( {errors: false, errorMsgs: {} });
        }
        setFormData ({...formData, [name]: value, [matchField]: true, levelOptionsSet: false });
    }

    const onSearch = () => {
        const errorMsgs:{[key: string]: string } = {};

        if (!formData.subjectMatched) {
            errorMsgs['subject'] = 'Please enter a valid subject.';
        }
        if (formData.level === 'Choose a Level') {
            errorMsgs['level'] = 'Please enter a valid level.';
        }
        if ( ( formData.tuitionLocation === 'Face' && formData.location.length < 2 ) ){
            errorMsgs['location'] = 'Please enter a valid postcode.';
        }

        if (Object.keys(errorMsgs).length > 0) {
            setFormErrors({ errors: true, errorMsgs });
        // } else {
        //     history.push(  { pathname: '/tutor-search', search: '', state:{ tuitionLocation, subject, level, location } })
        }
    }



    return (
        <section className={styles.landingBanner}  data-cy="landingBannerSection">
                <div className={styles.landingHeader}>
                    <div className={styles.landingHeaderQuote}>
                        <div>
                            <h2>Challenges are what makes life interesting.</h2>
                            <h2>Overcoming them is what makes life meaningful.</h2>
                        </div>
                    </div>

                    <div className={styles.landingHeaderSearch}>
                        <h4>Search Our Tutors</h4>
                        <form autoComplete="new-password" className="form">

                            <ToggleSelector 
                                groupName="tuitionLocation" 
                                label1="Face To Face" 
                                label2="Online" 
                                selectorValue1='Face' 
                                selectorValue2='Online' 
                                value={formData.tuitionLocation} 
                                onChangeHandler={onChangeInputHandler} 
                                disabled={false}
                            />

                            <InputDropDown 
                                name="subject"
                                placeholder="Choose a Subject"
                                InputDropDownClass="mt-2"
                                dropdownMinLength={3}
                                disabled={formData.disabled}
                                loading={false}
                                listItems={formData.listItems}
                                value={formData.subject}
                                valueMatched={formData.subjectMatched}
                                setMatchedValue={setMatchedValue}
                                onChangeHandler={onDropdownHandler} 
                            />
                            {/* { (formErrors.errorMsgs.subject ? <p className="text-yellow small-text mt-1">{formErrors.errorMsgs.subject}</p> : null )} */}

                            <SelectInput	name="level"
                                            title="Select subject level"
                                            selectInputClass="mt-2"
                                            onChangeHandler={onChangeSelectHandler}
                                            notSelectedValue="All levels" 
                                            selectedValue={formData.level}
                                            disabled={lvlDisabled}
                                            loading={formData.disabled}
                                            options={formData.levelOptions} />
                            {/* { (formErrors.errorMsgs.level ? <p className="text-yellow small-text mt-1">{formErrors.errorMsgs.level}</p> : null )} */}


{/* https://www.w3schools.com/howto/howto_js_autocomplete.asp */}
{/* <div class="autocomplete" style="width:300px;">
    <input id="myInput" type="text" name="myCountry" placeholder="Country" />
</div> */}



                            { (formData.tuitionLocation === 'Face') ? <InputField    inputType="text"
                                                                            InputFieldClass="mt-2"
                                                                            name="location"
                                                                            placeholder="Location e.g. GU22 / G131AA"
                                                                            value={formData.location}
                                                                            disabled={formData.disabled}
                                                                            loading={formData.disabled}
                                                                            onChangeHandler={onChangeInputHandler} /> : null }
                             {/* { (formErrors.errorMsgs.location ? <p className="text-yellow small-text mt-1">{formErrors.errorMsgs.location}</p> : null )} */}


{/* <button type="button" onClick={onSearch} className={`btn btn-search mt-2` + (btnDisabled ? ' btnDisabled': '') }>Search</button> */}
                            <button type="button" onClick={onSearch} disabled={btnDisabled} className={`btn ${styles.btnSearch} mt-2` + (btnDisabled ? ' btnDisabled': '') }>Search</button>

                            {/* { (formErrors.errorMsgs.search ? <p className="text-yellow small-text">{formErrors.errorMsgs.search}</p> : null )} */}

                        </form>
                    </div>
                </div>
            {/* </div> */}
        </section>    );
}
 
export default LandingBanner;