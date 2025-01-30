const userValidationSchema = {
  userName: {
    in: ["body"],
    exists: {
      errorMessage: "username field is required",
    },
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
    trim: true,
  },
  phoneNumber: {
    in: ["body"],
    exists: {
      errorMessage: "phoneNumber is required",
    },
    notEmpty: {
      errorMessage: "phoneNumber cannot be empty",
    },
    isString: {
      errorMessage: "phoneNumber must be a string",
    },
    matches: {
      options: /^\+?[1-9]\d{9,14}$/, // Updated regex
      errorMessage:
        "phoneNumber must be a valid international phone number with at least 10 digits",
    },
    trim: true,
  },
  email: {
    in: ["body"],
    exists: {
      errorMessage: "email is required",
    },
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
    isEmail: {
      errorMessage: "must be a valid email address",
    },
    trim: true,
  },
  password: {
    in: ["body"],
    exists: {
      errorMessage: "password is required",
    },
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
    isString: {
      errorMessage: "password must be a string",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "password must be at least 8 characters long",
    },
    matches: {
      options:
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
      errorMessage:
        "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
    trim: true,
  },
};

const idValidationSchema = {
  id: {
    in: ["params"],
    isMongoId: {
      errorMessage: "Invalid object Id format",
    },
  },
};

export default { userValidationSchema, idValidationSchema };
