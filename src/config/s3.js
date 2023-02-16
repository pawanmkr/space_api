import aws from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config() 

aws.config.update ({
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
    region: 'ap-south-1'
})

export default aws