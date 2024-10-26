import * as Yup from "yup";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/;

export const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, "Full name must be at least 10 character")
    .max(15, "Full name must be no more than 15 characters")
    .required("Full name is required"),

  userName: Yup.string()
    .min(5, "Username must be at least 5 character")
    .max(8, "Username must be no more than 8 characters")
    .required("Username is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .matches(
      PASSWORD_REGEX,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
