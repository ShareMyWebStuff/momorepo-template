import axios, { AxiosResponse } from 'axios';

// function mergeA<T, U>(objA: T, objB: U ) {
//     return Object.assign(objA, objB)
// }


// const merge = <T, U>(objA: T, objB: U ) => {
//     return Object.assign(objA, objB)
// }

// interface ISendMsgRtn {
//     method: string
//     url: string
// }

const sendMsg = async <T extends object, U extends object>( method: string, url: string, data: T ): Promise<AxiosResponse<U>> => {

    let res 


    try {
        console.log ('HERE 1')
        axios.defaults.withCredentials = true;
        console.log ('HERE 2')

        const config = {
            url,
            method,
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            validateStatus: function (status: number) {
                return true
            }
            , crossDomain: true
            , withCredentials: true
            // withCredentials: false
        }

        console.log ('SEND MSG CONFIG')
console.log (config)
        res = await axios (config);

        console.log ('SEND MSG')
        console.log (res)
        
        return res;

    } catch (err) {
        console.log ('SendMsg ERROR')
        console.log ('#################################################')

        const retErr: AxiosResponse<any, any> = {
            status: 500,
            statusText: 'ERROR',
            data: { msg: 'Network error.' },
            config: {},
            request: {},
            headers: {}
        }
        return retErr;
    }
}

export default sendMsg;

/**
 * Connects to a backend route
 * 
 * @param method 
 * @param url 
 * @param signal 
 * @param data 
 * @returns 
 */
export const newSendMsg = async <T extends object, U extends object>( method: string, url: string, signal: AbortSignal, data: T ): Promise<AxiosResponse<U>> => {

    let res 


    try {
        console.log ('HERE 1')
        axios.defaults.withCredentials = true;
        console.log ('HERE 2')

        const config = {
            url,
            method,
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal,
            data: JSON.stringify(data),
            validateStatus: function (status: number) {
                return true
            }
            , crossDomain: true
            , withCredentials: true
            // withCredentials: false
        }

        console.log ('SEND MSG CONFIG')
console.log (config)
        res = await axios (config);

        console.log ('SEND MSG')
        console.log (res)
        
        return res;

    } catch (err) {
        console.log ('SendMsg ERROR')
        console.log ('#################################################')

        const retErr: AxiosResponse<any, any> = {
            status: 500,
            statusText: 'ERROR',
            data: { msg: 'Network error.' },
            config: {},
            request: {},
            headers: {}
        }
        return retErr;
    }
}
