import * as Yup from "yup";
export const profileSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(5, "Your name must be at least 5 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  phoneNumber: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .required("Phone number  is required"),
  address: Yup.string()
    .min(10, "Your address information must be at least 10 characters.")
    .required("Address is required"),
  job: Yup.string()
    .min(3, "Job must be at least 3 characters.")
    .required("Job is required"),
  bio: Yup.string()
    .min(10, "Bio must be at least 10 characters.")
    .required("Bio is required"),
});
