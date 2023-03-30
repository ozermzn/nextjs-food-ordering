import React from "react";
import Input from "../form/Input";
import Title from "../ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "@/schema/ProfilSchema";
import axios from "axios";
import { toast } from "react-toastify";
const Account = ({ user }) => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
      if (res.status === 200) {
        toast.success("Your information will be update!");
      }
    } catch (err) {
      console.log(err);
    }
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        name: user?.name,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        address: user?.address,
        job: user?.job,
        bio: user?.bio,
      },
      onSubmit,
      validationSchema: profileSchema,
    });
  return (
    <div className="w-full">
      <div className="p-8 flex-1 w-full">
        <Title className={"text-[40px]"}>Account Settings</Title>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <Input
              type={"text"}
              name="name"
              errorMessage={errors.name}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Name
            </Input>
            {errors.name && <span className="danger-input">{errors.name}</span>}
          </div>
          <div>
            <Input
              type={"email"}
              name="email"
              errorMessage={errors.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Email
            </Input>
            {errors.email && (
              <span className="danger-input">{errors.email}</span>
            )}
          </div>
          <div>
            <Input
              type={"number"}
              name="phoneNumber"
              errorMessage={errors.phoneNumber}
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Phone Number
            </Input>
            {errors.phoneNumber && (
              <span className="danger-input">{errors.phoneNumber}</span>
            )}
          </div>
          <div>
            <Input
              type={"text"}
              name="address"
              errorMessage={errors.address}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Address
            </Input>
            {errors.address && (
              <span className="danger-input">{errors.address}</span>
            )}
          </div>
          <div>
            <Input
              type={"text"}
              name="job"
              errorMessage={errors.job}
              value={values.job}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Job
            </Input>
            {errors.job && <span className="danger-input">{errors.job}</span>}
          </div>
          <div>
            <Input
              type={"text"}
              name="bio"
              errorMessage={errors.bio}
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Bio
            </Input>
            {errors.bio && <span className="danger-input">{errors.bio}</span>}
          </div>
          <button type="submit" className="btn-primary mt-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
