import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { validationResult } from "express-validator";
import validationSchemas from "../../validators/userValidation.js";
import { checkSchema } from "express-validator";
import sendMail from "../../helpers/sendMail.js";

export const userValidationSchema = validationSchemas.userValidationSchema;

// Middleware to validate user input
export const validateUser = checkSchema(userValidationSchema);

export const registerUser = async (req, res) => {
  const { userName, email, password, phoneNumber } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(), // Send validation errors as an array
    });
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email! Please try again.",
      });
    }

    const existingMobile = await User.findOne({ phoneNumber });
    if (existingMobile) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists with the same mobile number! Please try again.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      phoneNumber,
      email,
      password: hashPassword,
    });

    await newUser.save();

    // NEW USER
    // EMAIL VERIFICATION STEPS

    // AFTER VERIFY SUCCESS newUSer->verified : true.
    // Save
    sendMail(
      email,
      "welcome to our Ecommerce Project",
      `Hi, ${userName} Thank you for registring!  `
    );
    res.status(201).json({
      // Use 201 for successful creation
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error(e); // Changed to console.error for error logging
    res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    //ensure password is a string

    password = password.toString();

    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User does not exists! Please register first",
      });

    console.log("Password from request:", password, typeof password); // Check if it’s a string
    console.log(
      "Hashed password from DB:",
      checkUser.password,
      typeof checkUser.password
    ); // Should be a string

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect email/password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged In successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//auth logout
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully",
  });
};

//auth middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};
