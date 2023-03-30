import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import React from "react";
import { useFormik } from "formik";
import { AdminSchema } from "@/schema/AdminSchema";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AdminLogin = () => {
  const { push } = useRouter();
  async function onSubmit(values, actions) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin`,
        values
      );

      if (res.status === 200) {
        toast.success("Login successful");
        actions.resetForm();
        push("/admin/profile");
      }
    } catch (err) {
      console.log(err);
    }
  }
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit,
      validationSchema: AdminSchema,
    });

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col items-center my-20">
        <Title className={"text-[40px] mb-6"}>Admin Login</Title>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-y-3 mx-auto md:w-1/2 w-full"
        >
          <Input
            name="username"
            type={"text"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            errorMessage={errors.username}
          >
            Username
          </Input>

          {errors.username && (
            <span className="danger-input">{errors.username}</span>
          )}
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
          <button className="btn-primary w-full" type="submit">
            Login
          </button>

          <Link
            href="/"
            className="text-sm underline text-slate-500 hover:text-slate-900 hover:scale-105"
          >
            Home Page
          </Link>
        </form>
      </div>
    </div>
  );
};
//token admin tokene eşitse admin profile sayfasına atar.

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token === process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin/profile",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default AdminLogin;
