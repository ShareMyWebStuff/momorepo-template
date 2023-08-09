// 
// Saves an image to a signed S3 url.
// 
export const sendImageToS3 = async (signedURL: string, filetype: string, file: string) => {
let fetchRes: any;
    try {

        // const base64Data = file.replace(/^data:image\/jpeg;base64,/, "");
        const baseFile = file.replace(/^.+?,/, '');
        let base64Data: string = baseFile

        const buf = Buffer.from(base64Data,'base64')

        const config = {
            headers: {
                'Content-Type': `image/${filetype}`,
                'Content-Encoding': 'base64',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization", 
            },
            method: "PUT",
            body: buf
        }

        // const fetchRes = await fetch(signedURL, config)
        fetchRes = await fetch(signedURL, config)

        return {status: fetchRes.status}

    } catch (err) {
        console.log('sendImageToS3 error');
        console.log (err);
        throw err;
    }
}

// 
// Copies a file to a signed S3 url.
// 
export const copyFileToS3 = async (signedURL: string, file: File) => {

    try {

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            },
            method: "PUT",
            body: file
        }

        const fetchRes = await fetch(signedURL, config)

        return {status: fetchRes.status}

    } catch (err) {
        console.log('copyFileToS3 error');
        console.log (err);
        throw err;
    }
}

// 
// Copies a file to a signed S3 url.
// 
export const deleteS3Object = async (signedURL: string) => {

    try {
console.log ('deleteS3Object -2')

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            },
            method: "DELETE",
            // body: file
        }

        const fetchRes = await fetch(signedURL, config)

        return {status: fetchRes.status}

    } catch (err) {
        console.log('deleteS3Object error');
        console.log (err);
        throw err;
    }
}




// 
// Retrieves a files details (photo) from a url (typically s3) and returns a file.
// 
export const getBase64FromUrl = async (url: string) => {
    const data = await fetch(url, {
        mode: 'cors',
        headers: { },
    } );
    console.log ('data')
    console.log (data)
    // await new Promise(resolve => setTimeout(resolve, 1000))
    const blob = await data.blob();
    // Convert blob into a file type for the system to use
    let file = new File([blob], url);
    console.log ('Waiting ....')
    // await new Promise(resolve => setTimeout(resolve, 1000))
    console.log ('Finished Waiting ....')

    return file
}

