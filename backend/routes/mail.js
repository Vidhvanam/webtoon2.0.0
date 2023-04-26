import nodemailer from "nodemailer"
import express from 'express'

const router = express.Router()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zalaksonani50@gmail.com',
        pass: 'pffs llxl rfvi hqns'
    }
});

router.post("/contactUs", (req, res) => {
    const { name, subject, message, email } = req.body
    let mailOptions = {
        from: 'zalaksonani50@gmail.com',
        to: 'zalaksonani50@gmail.com',
        subject: subject,
        text: `${message} \n ${name} mail : ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send({ message: "Message is not send", type: "error", error })
        } else {
            res.send({ message: "Message send succesfully", type: "success", error })
            console.log('Email sent: ' + info);
        }
    });
})

export const sendEmail = async (email, subject, text) => {
    try {


        await transporter.sendMail({
            from: 'zalaksonani50@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent sucessfully");
        return true
    } catch (error) {
        console.log(error, "email not sent");
        return false

    }
};


export default router   