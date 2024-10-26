import * as yup from "yup";

export const loginSchema = yup.object().shape({
  input: yup.string().required("Username atau email diperlukan"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password minimal 6 karakter"),
});
