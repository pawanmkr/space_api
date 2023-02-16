import aws from "../config/s3.js";
import handleError from "../utils/handleError.js";
import stream from 'stream'

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

const downloadFromS3 = async (id, res) => {
    const s3 = new aws.S3()
    let params = {
        Bucket: "spaces-chatroom-app",
        Key: id
    }
    try {
        s3.getObject(params, (err, data) => {
            console.log(data)
            if (err) handleError(err, "failed to download the file from bucket")
            return data
        }).on('httpUploadProgress', (progress) => {
            console.log(progress)
        })
    } catch(error) {
        handleError(error, "download failed")
    }
}

export { 
    savetoS3,
    downloadFromS3
}