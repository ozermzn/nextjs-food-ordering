import * as Yup from "yup";

export const ReservationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone number must me at least 10 characters")
    .required("Phone number  is required"),

  email: Yup.string().required("Email is required").email("Email is invalid"),
  reservations: Yup.string()
    .required("Persons number is required")
    .min(1, "Persons number is invalid"),
  date: Yup.string().required("Date is required"),
});
