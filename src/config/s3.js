import handleError from '../utils/handleError.js'
import aws from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config() 
import crypto from 'crypto'

aws.config.update ({
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
    region: 'ap-south-1'
})

async function savetoS3(file) {
    const s3 = new aws.S3()
    const key = crypto.randomBytes(5).toString('hex').slice(0, 6) // for naming the file

    let params = {
        Bucket: "spaces-chatroom-app",
        Body: file.actualFile,
        Key: key
    }
    try {
        const result = await s3.upload(params).promise();
        return {
            attachmentId: result.Key, 
            url: result.Location
        }
    } catch (err) {
        handleError(err, "failed uploading to s3")
    }
}

async function downloadFromS3(attachmentId) {
    const s3 = new aws.S3()
    let params = {
        Bucket: "spaces-chatroom-app",
        Key: attachmentId
    }
    const result = await s3.getObject(params, (err, data) => {
        if (err) handleError(err, "failed to download the file from bucket")
        console.log(data)
    }).promise()
    return result
}

export {
    savetoS3,
    downloadFromS3
}