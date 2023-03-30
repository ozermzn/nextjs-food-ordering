import Input from "./form/Input";
import Title from "./ui/Title";
import { useFormik } from "formik";
import { ReservationSchema } from "@/schema/ReservationSchema";
const Reservation = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    actions.resetForm();
  };
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        reservations: "",
        date: "",
      },
      onSubmit,
      validationSchema: ReservationSchema,
    });

  return (
    <div className="container mx-auto py-12  lg:text-start text-center">
      <Title className={"text-[40px] mb-11"}>Book a Table</Title>
      <div className="flex items-center justify-center gap-5 lg:flex-row flex-col">
        <div className="flex-1 w-3/4">
          <form className="flex flex-col  gap-y-5" onSubmit={handleSubmit}>
            <div>
              <Input
                name="fullName"
                onChange={handleChange}
                type={"text"}
                value={values.fullName}
                errorMessage={errors.fullName}
                touched={touched.fullName}
                onBlur={handleBlur}
              >
                Full Name
              </Input>

              {errors.fullName && (
                <span className="danger-input">{errors.fullName}</span>
              )}
            </div>
            <div>
              <Input
                name="phoneNumber"
                onChange={handleChange}
                value={values.phoneNumber}
                type={"number"}
                errorMessage={errors.phoneNumber}
                onBlur={handleBlur}
                touched={touched.phoneNumber}
              >
                Phone Number
              </Input>
              {errors.phoneNumber && (
                <span className="danger-input">{errors.phoneNumber}</span>
              )}
            </div>
            <div>
              <Input
                type={"email"}
                name="email"
                onChange={handleChange}
                value={values.email}
                errorMessage={errors.email}
                onBlur={handleBlur}
                touched={touched.email}
              >
                Email
              </Input>
              {errors.email && (
                <span className="danger-input">{errors.email}</span>
              )}
            </div>
            <div>
              <Input
                name="reservations"
                type={"number"}
                onChange={handleChange}
                value={values.reservations}
                errorMessage={errors.reservations}
                onBlur={handleBlur}
                touched={touched.reservations}
              >
                How many persons?
              </Input>
              {errors.reservations && (
                <span className="danger-input">{errors.reservations}</span>
              )}
            </div>
            <div>
              <Input
                className={"!p-1 !px-4 text-slate-500 font-semibold"}
                name="date"
                type={"datetime-local"}
                onChange={handleChange}
                value={values.date}
                errorMessage={errors.date}
                onBlur={handleBlur}
                touched={touched.date}
              ></Input>
              {errors.date && (
                <span className="danger-input">{errors.date}</span>
              )}
            </div>
            <button type="submit" className="btn-primary mt-4">
              Book Now
            </button>
          </form>
        </div>
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d376.22894687690547!2d28.97287731468048!3d41.02894060000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab988c0ba73b3%3A0x6aba494ae0139dfb!2sEcuador%20Coffee%20House!5e0!3m2!1str!2str!4v1678177110864!5m2!1str!2str"
            className="rounded-xl"
            allowFullScreen=""
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
