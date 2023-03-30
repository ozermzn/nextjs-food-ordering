import React from "react";
import Input from "../form/Input";
import Title from "../ui/Title";
import { useFormik } from "formik";
import { passwordSchema } from "@/schema/PasswordSchema";
import axios from "axios";
const Password = ({ user }) => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
    } catch (err) {
      console.log(err);
    }
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: passwordSchema,
    });
  return (
    <div className="w-full">
      <div className="p-8 flex-1 w-full">
        <Title className={"text-[40px]"}>Password</Title>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <Input
              type={"password"}
              name="password"
              errorMessage={errors.password}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Password
            </Input>
            {errors.password && (
              <span className="danger-input">{errors.password}</span>
            )}
          </div>
          <div className="w-full">
            <Input
              type={"password"}
              name="confirmPassword"
              errorMessage={errors.confirmPassword}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Password Again
            </Input>
            {errors.confirmPassword && (
              <span className="danger-input">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn-primary mt-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
