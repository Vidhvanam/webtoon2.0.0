import express from 'express'
import users from '../modules/user.js'
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv'
import { sendEmail } from "./mail.js";
dotenv.config()
const router = express.Router()

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    // console.log('email' , password)
    users.findOne({ email: email }, (err, user) => {
        if (user) {
            var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (password === originalText) {
                const { password, ...info } = user
                res.send({ message: "Login Sucessfully", user: info, type: "success" })
            } else {
                res.send({ message: "Wrong email or password", type: 'error' })
            }
            // console.log('user does not exists')
        } else {
            res.send({ message: "Not registered", type: "info" })
        }
    })
});

router.post("/register", (req, res) => {
    // console.log(req.body) 
    const { userName, phone, email, password } = req.body;
    var ciphertext = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    users.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "user already exist", type: "info" })
        } else {
            const user = new users({ userName, email, phone, password: ciphertext, subscribes: [] })
            user.save(err => {
                if (err) {
                    res.send({ message: "Error try again leter", type: "error", err })
                } else {
                    console.log(user)
                    res.send({ message: "Registered sucessfully", type: "success" })
                }
            })
        }
    })


})

router.post("/forgotPassword", async (req, res) => {
    // console.log(req.body) 
    const user = await users.findOne({ email: req.body.email });
    if (!user)
        return res.send({ message: "user with given email doesn't exist", type: "error" });

    const link = `${process.env.APP_URL}/password-reset/${user._id}`;
    const send = await sendEmail(user.email, "Password reset", link);
    if (send) {
        return res.send({ message: "Check email to reset password", type: "info" });

    } else {
        return res.send({ message: "Sorry try again later", type: "error" });

    }
})

router.post("/resetPassword", async (req, res) => {
    try {
        const { password, id } = req.body
        var ciphertext = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

        const Ures = await users.updateOne({ _id: id }, { password: ciphertext })
        console.log(Ures);
        res.send({ message: 'Reset password successfully', type: "success" })
    } catch (err) {
        res.send({ message: 'Sorry try again later ', type: "error", err })
    }
})
export default router