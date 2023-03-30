import axios from "axios";
import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import React from "react";
import { useFormik } from "formik";
import { registerSchema } from "@/schema/RegisterSchema";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Register = () => {
  const { push } = useRouter();
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );
      if (res.status === 200) {
        toast.success("User Created Succesfully!");
        push("/auth/login");
      } else {
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      actions.resetForm();
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: registerSchema,
    });

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col items-center my-20">
        <Title className={"text-[40px] mb-6"}>Register</Title>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-y-3 mx-auto md:w-1/2 w-full"
        >
          <Input
            name="name"
            type={"text"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            errorMessage={errors.name}
            touched={touched.name}
          >
            Name
          </Input>

          {errors.name && <span className="danger-input">{errors.name}</span>}
          <Input
            name="email"
            type={"email"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            errorMessage={errors.email}
            touched={touched.email}
          >
            Email
          </Input>

          {errors.email && <span className="danger-input">{errors.email}</span>}
          <Input
            name="password"
            type={"password"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            errorMessage={errors.password}
            touched={touched.password}
          >
            Password
          </Input>

          {errors.password && (
            <span className="danger-input">{errors.password}</span>
          )}
          <Input
            name="confirmPassword"
            type={"password"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            errorMessage={errors.confirmPassword}
            touched={touched.confirmPassword}
          >
            Confirm Password
          </Input>
          {errors.confirmPassword && (
            <span className="danger-input">{errors.confirmPassword}</span>
          )}
          <button className="btn-primary w-full" type="submit">
            Register
          </button>
          <button className="btn-primary !bg-secondary w-full" type="submit">
            Github <i className="fa-brands fa-github fa-lg"></i>
          </button>
          <Link
            href="/auth/login"
            className="text-sm underline text-slate-500 hover:text-slate-900 hover:scale-105"
          >
            Do you have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
