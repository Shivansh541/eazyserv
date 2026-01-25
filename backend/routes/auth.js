const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');
const Otp = require("../models/Otp");
const nodemailer = require("nodemailer")
const JWT_SECRET = process.env.JWT_SECRET;

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"HomeHelp" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });
};


router.post(
    "/signup",
    [
        body("name").notEmpty().withMessage("Name is required"),

        body("email").isEmail().withMessage("Enter a valid email"),

        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters"),

        body("phone")
            .notEmpty()
            .withMessage("Phone number is required")
            .isMobilePhone()
            .withMessage("Enter a valid phone number"),

        body("gender")
            .isIn(["male", "female", "other"])
            .withMessage("Gender must be male, female, or others"),

        body("role")
            .isIn(["worker", "customer", "admin"])
            .withMessage("Role must be worker, customer, or admin"),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password, phone, gender, dob, role, addresses, workerInfo } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ error: "User with this email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);
            user = await User.create({
                name,
                email,
                password: secPass,
                phone,
                gender,
                role,
                dob,
                addresses,
                workerInfo
            });
            data = {
                user: {
                    id: user._id,
                },
            };

            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({
                authtoken,
                success: true,
            });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Some error occured");
        }
    }
);
router.post('/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            // Find user by username instead of email
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user._id
                }
            };
            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json({
                authtoken,
                success: true,
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Internal Server Error")
    }
})

router.post('/workers/by-service', async (req, res) => {
    try {
        const { service } = req.body;

        const workers = await User.find({
            role: 'worker',
            "workerInfo.skills.slug": service
        }).select('-password');

        res.json(workers);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/forgot-password",
    [
        body("email").isEmail()
    ],
    async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.json({ success: true });
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            await Otp.deleteMany({ email });

            await Otp.create({
                email,
                otp,
                expiresAt: Date.now() + 10 * 60 * 1000, // 10 mins
            });

            await sendEmail(
                email,
                "Password Reset OTP",
                `Your OTP is ${otp}. It expires in 10 minutes.`
            );

            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
);

router.post(
    "/verify-otp",
    [
        body("email").isEmail(),
        body("otp").isLength({ min: 6, max: 6 }),
    ],
    async (req, res) => {
        const { email, otp } = req.body;

        try {
            const record = await Otp.findOne({ email, otp });

            if (!record || record.expiresAt < Date.now()) {
                return res.status(400).json({ error: "Invalid or expired OTP" });
            }

            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
);
router.post(
    "/reset-password",
    [
        body("email").isEmail(),
        body("password").isLength({ min: 8 }),
    ],
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const otpRecord = await Otp.findOne({ email });
            if (!otpRecord || otpRecord.expiresAt < Date.now()) {
                return res.status(400).json({ error: "OTP expired or invalid" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await User.updateOne(
                { email },
                { password: hashedPassword }
            );

            await Otp.deleteMany({ email });

            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
);


module.exports = router