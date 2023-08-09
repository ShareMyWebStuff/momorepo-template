import React, { useState, useEffect } from 'react'
import styles from './ErrorMsg.module.scss'

//
// NewErrorMsg
//
// This is a component that displays an overall error message
//
//  msg         This is the message to be shown
//  msgFormat   This is the display type for the message
//  displayTime This is the display time the message will be shown for, if null then message is permanent
//  dataTest    The data-test name for testing

interface IErrorMsgProps {
    msg?: string | null
    msgFormat?: string | null
    displayTime?: number | null
}

interface IShowMsg {
    msg: string | null
    msgFormat: string | null
}

export const ErrorMsg = ( {msg, msgFormat, displayTime }: IErrorMsgProps ) => {

    const [showMsg, setShowMsg] = useState<IShowMsg> ({
        msg: null,
        msgFormat: null
    });

    // console.log ('NewErrorMsg +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    // console.log (msg, msgFormat, displayTime);
    // console.log ('showMsg');
    // console.log (showMsg);

    // useEffect ( () => {

    //     console.log ( {msg: (msg === undefined || msg === null ? null : msg), msgFormat: ( !msgFormat ? 'warning-msg' : msgFormat)})
    //     // setShowMsg ( prevMsg => { return {...prevMsg, msg: (msg === undefined || msg === null ? null : msg), msgFormat: ( !msgFormat ? 'warning-msg' : msgFormat) } } )
    //     setShowMsg ( { msg: (msg === undefined || msg === null ? null : msg), msgFormat: ( !msgFormat ? 'warning-msg' : msgFormat) } })

    //     let timeoutId: NodeJS.Timeout | null = null;

    //     if ( typeof displayTime === 'number' ) {
    //         console.log ('Timeout');
    //         timeoutId = setTimeout ( () => {
    //             // setShowMsg ( prevMsg => { return {...prevMsg, msg: null, msgFormat: null } } )
    //             setShowMsg ( {msg: null, msgFormat: null})
    //         }, displayTime)
    //     }

    //     return () => {
    //         if (timeoutId !== null ) {
    //             clearTimeout (timeoutId);
    //         }
    //     }

    // }, [msg, msgFormat, displayTime])

    useEffect ( () => {
        console.log (msg, msgFormat, displayTime)
        const newMsg = (msg === undefined || msg === null ? null : msg)
        const newMsgFormat = (!msgFormat ? 'warning' : msgFormat)
        setShowMsg ( { msg: (msg === undefined || msg === null ? null : msg), msgFormat: ( !msgFormat ? 'warning' : msgFormat) } )

        let timeoutId: NodeJS.Timeout | null = null;

        if ( typeof displayTime === 'number' ) {
            timeoutId = setTimeout ( () => {
                setShowMsg ( {msg: null, msgFormat: null})
            }, displayTime)
        }

        return () => {
            if (timeoutId !== null ) {
                clearTimeout (timeoutId);
            }
        }

    }, [msg, msgFormat, displayTime])


    return (

        <>
            { showMsg.msg && showMsg.msgFormat &&
            <div className='form-group mt-2 p-1'>
                <p className={styles[showMsg.msgFormat]}>{showMsg.msg}</p>
            </div>
            }
        </>

    );

}

interface IFieldValidationMsgProps {
    className?: string
    msg: string | null | undefined
    msgType: 'fatal' | 'warning' | 'info'
}
export const FieldValidationMsg = ( { className, msg, msgType}: IFieldValidationMsgProps ) => {
    console.log ('Rendering - FieldValidationMsg')
    const msgStyles=styles[`${msgType}Msg`]
    const classNames = `${styles.msg} ${msgStyles} small-text ` + (!className ? '' : className)
    return <>
        { (msg ? <p className={classNames}>{msg}</p> : null )}
    </>

}


