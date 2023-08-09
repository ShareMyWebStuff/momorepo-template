
// 
// Function : stringBreakdown
//
// This function takes a string 
//
// ReturnValues :
//  True        The username is valid
//  False       The username is invalid
//  
const stringBreakdown = ( userStr: string ) => {
    let noDigits = 0;
    let noUppercase = 0;
    let noLowercase = 0;
    let noSpecial = 0;
    let incorrectChar = false;
    let strLen = userStr.length;

    for ( let letter of userStr ) {
        if  ( letter >= '0' && letter <= '9' ) noDigits++;
        else if ( letter >= 'A' && letter <= 'Z' ) noUppercase++;
        else if ( letter >= 'a' && letter <= 'z' ) noLowercase++;
        else if (
            //  ! # $ % & ' * + - / = ? ^ _ ` { | } ~ .   ( ) , : ; < > @ [ \ ]
            letter === '!' ||
            letter === '#' ||
            letter === '$' ||
            letter === '%' ||
            letter === '&' ||
            letter === "'" ||
            letter === '*' ||
            letter === '+' ||
            letter === '-' ||
            letter === '/' ||
            letter === '=' ||
            letter === '?' ||
            letter === '^' ||
            letter === '_' ||
            letter === '`' ||
            letter === '{' ||
            letter === '|' ||
            letter === '}' ||
            letter === '~' ||
            letter === '.' ||
            letter === ' ' ||
            letter === '(' ||
            letter === ')' ||
            letter === ',' ||
            letter === ':' ||
            letter === ';' ||
            letter === '<' ||
            letter === '>' ||
            letter === '@' ||
            letter === '[' ||
            letter === '\\' ||
            letter === ']'
        ) noSpecial++;
        else incorrectChar = true;
    }

    return {
        strLen,
        noDigits,
        noUppercase,
        noLowercase,
        noSpecial,
        incorrectChar
    }
}

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


export const validatePassword = (pwd: string) => {
    if (!pwd) return false;

    const { strLen, noDigits, incorrectChar } = stringBreakdown(pwd);

    if ( strLen < 6 || strLen > 20 || noDigits === 0 || incorrectChar ) {
        return false;
    }
    return true;
}