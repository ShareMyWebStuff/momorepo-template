import {newSendMsg} from '@utils/sendMsg'
import { getBase64FromUrl } from '@utils/media-upload-utils'

/**
 * Interface 
 */
export interface ISignedFile {
    userId: number
    mediaId: number
    mediaTypeId: number
    fileSuffix: string
}

/**
 * Return data from the get signed url
 */
interface ISignedURL extends Object {
    url: string
}


// 

/**
 * 
 * @param sd 
 * @param cb 
 */
const readUrlFile = async ( signal: AbortSignal, media: ISignedFile, cb : (result: string | null) => void ) => {

    const signedURL = await newSendMsg <{}, ISignedURL>('get', `/user/media-upload/signed/${process.env.NEXT_PUBLIC_BUCKET_DOMAIN}/${media.mediaTypeId}/${media.mediaId}/${media.fileSuffix}/${media.userId}`, signal, {});

    const base64 = await getBase64FromUrl(signedURL.data.url!)

    let reader = new FileReader();
    reader.readAsDataURL(base64);
    reader.onload = function () {
        console.log ('OnLoad ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        if (reader.result !== null){
            console.log ('String')
            console.log ('UpdateImg')
            console.log (reader.result.toString().substring(0, 50))

            const base64String = reader.result.toString();
            cb(base64String)
        }
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

}

/** 
 * Load into canvas
 */
export const loadToCanvas = async (signal: AbortSignal, media: ISignedFile, canvas: any ) => {

    try {
        console.log(media.userId)
        console.log(media.mediaId)
        console.log(media.mediaTypeId)
        console.log(media.fileSuffix)
        let img = new Image()

        await readUrlFile ( signal, media, (result: string | null) => {
            console.log ('SAUSAGES 1')
            if (result !== null ) {
                console.log ('EY UP CHUCK 3 -------')
                console.log (result.substring(0, 30))
                // console.log ('SAUSAGES 2')
                // console.log (result)
                img.src =  result// URL.createObjectURL(uploadFile);
                console.log ('EY UP CHUCK 4 -------')
            }
        })

        img.onload = function() {
            console.log ('1 OnLoad ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            // const canvas = previewCanvasRef.current;
            console.log ('2 OnLoad ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            if (canvas !== null && img){
                console.log ('3 OnLoad ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                const largest = ( img.width > img.height ? img.width : img.height )
                const canvasWidth = (largest > 1000 ? img.width * 1000 / largest : img.width)
                const canvasHeight = (largest > 1000 ? img.height * 1000 / largest : img.height)
                // const canvasWidth = 600
                // const canvasHeight = Math.round( canvasWidth * (imgSrc.height / imgSrc.width))
                canvas.width = canvasWidth
                canvas.height = canvasHeight
                const ctx = canvas.getContext('2d')!
                ctx.imageSmoothingQuality = 'low'
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasWidth, canvasHeight);
                // canvas
            }
            console.log ('Revoke')
            URL.revokeObjectURL(img.src)
    
        } 

    } catch (err) {
        
    }

}

