const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = process.env.JWT_SECRET;
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
            .isIn(["male", "female", "others"])
            .withMessage("Gender must be male, female, or others"),

        body("profilePhoto").notEmpty().withMessage("Profile photo is required"),

        body("role")
            .isIn(["worker", "customer", "admin"])
            .withMessage("Role must be worker, customer, or admin"),

        body("address.city").notEmpty().withMessage("City is required"),
        body("address.state").notEmpty().withMessage("State is required"),
        body("address.pincode")
            .isPostalCode("IN")
            .withMessage("Invalid pincode"),

        body("workerInfo.skills")
            .if(body("role").equals("worker"))
            .isArray({ min: 1 })
            .withMessage("Skills are required for workers"),

        body("workerInfo.experience")
            .optional()
            .isNumeric()
            .withMessage("Experience must be a number"),

        body("workerInfo.availability")
            .optional()
            .isBoolean()
            .withMessage("Availability must be true/false"),

        body("workerInfo.serviceArea")
            .optional()
            .isArray()
            .withMessage("Service area must be an array of strings"),

        body("customerInfo.bookingHistory")
            .optional()
            .isArray()
            .withMessage("Booking history must be an array"),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password, phone, gender, DOB, address, profilePhoto, role, customerInfo, workerInfo } = req.body;
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
                profilePhoto,
                role,
                DOB,
                address,
                workerInfo: role === "worker" ? workerInfo : undefined,
                customerInfo: role === "customer" ? customerInfo : undefined,
            });
            data = {
                user: {
                    id: user.id,
                },
            };

            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken, success: true });
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
          id: user.id
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ authtoken, success: true });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post('/getuser', fetchuser, async(req,res)=>{
    try{
        userId=req.user.id
        const user=await User.findById(userId).select('-password')
        res.send(user)
    } catch(error){
        console.log(error.message)
        return res.status(500).send("Internal Server Error")
    }
})
module.exports = router