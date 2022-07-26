import dotenv from 'dotenv'
dotenv.config()

const nodemailer = require('nodemailer')
const {google} = require('googleapis')

 const CLIENT_ID = process.env.CLIENT_ID
 const CLIENT_SECRET = process.env.CLIENT_SECRET
 const REDIRECT_URI = process.env.REDIRECT_URI
 const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

export async function postMail(UserMail){

    try{
        console.log("Inside Post Mail ---->>>>",UserMail);
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:process.env.USER_ID,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })

        const mailOptions = {
            from: process.env.USER_ID,
            to: UserMail,
            subject: 'Hello',
            text: 'Hello User registered succesfully',
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    }catch(error){
        return error
    }
}