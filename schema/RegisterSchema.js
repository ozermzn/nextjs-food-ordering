import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(5, "Your name must be at least 8 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Pasword is required")
    .min(8, "Password must be at least 8 characters.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character."
    ),
  confirmPassword: Yup.string()
    .required("Pasword is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});
