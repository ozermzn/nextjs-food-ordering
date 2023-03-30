import * as Yup from "yup";
export const footerSchema = Yup.object({
  location: Yup.string()
    .required("location is required")
    .min(5, "Your location must be at least 5 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  phone: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .required("Phone number  is required"),
  description: Yup.string()
    .min(10, "Your description must be at least 10 characters.")
    .required("description is required"),
  day: Yup.string()
    .min(3, "Day must be at least 3 characters.")
    .required("Day is required"),
  time: Yup.string()
    .min(10, "Time must be at least 10 characters.")
    .required("Time is required"),
});
