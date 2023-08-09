import { useState, useEffect } from 'react'

export const useLocalStorageSync = ( key: any, initialValue: any ) => {

    console.log ('useLocalStorageSync')
    console.log (key, initialValue)

    // Setup state to hold the localstorage value
    const [storedValue, setStoredValue] = useState(() => {
        try {
          const item = window.localStorage.getItem(key);
          return item ? JSON.parse(item) : initialValue;
        } catch (err) {
          console.error(err);
          return initialValue;
        }
    });
    
    const setValue = (value: any) => {
        console.log ('1 - SYNC STORAGE SET VALUE')
        console.log (value)
        try {
            console.log ('2 - SYNC STORAGE SET VALUE')
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            console.log ('3 - SYNC STORAGE SET VALUE')
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            console.error(err);
        }
    };

    // create localstorage on initial request
    useEffect ( () => {
        const item = window.localStorage.getItem(key);
        console.log ('ITEM')
        console.log (item)
        if ( !item ) {
            setValue(initialValue)            
        }
    }, [])

    // Setup event listener for when the 
    useEffect(() => {
        const listener = (e: any) => {
            console.log ('SYNC STORAGE')
            console.log (e)
            console.log (localStorage)
            if (e.storageArea === localStorage && e.key === key) {
                setValue(JSON.parse(e.newValue));
            }
        };
        window.addEventListener("storage", listener);
    
        return () => {
          window.removeEventListener("storage", listener);
        };
    }, [key]);
    
    return [ storedValue, setValue]

}