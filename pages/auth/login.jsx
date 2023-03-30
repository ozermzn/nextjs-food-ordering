import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import { LoginSchema } from "@/schema/LoginSchema";
import Link from "next/link";
import { useSession, signIn, getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
const Login = () => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [currentUser, setCurrenUser] = useState();

  async function onSubmit(values, actions) {
    const { email, password } = values;
    let options = { redirect: false, email, password };
    try {
      const res = await signIn("credentials", options);
      actions.resetForm();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setCurrenUser(
          res.data?.find((user) => user.email === session?.user?.email)
        );
        session && push("/profile/" + currentUser?._id);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [session, push, currentUser]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: LoginSchema,
    });

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col items-center my-20">
        <Title className={"text-[40px] mb-6"}>Login</Title>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-y-3 mx-auto md:w-1/2 w-full"
        >
          <Input
            name="email"
            type={"email"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            errorMessage={errors.email}
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
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
          <button
            type="button"
            className="btn-primary !bg-secondary w-full"
            onClick={() => signIn("github")}
          >
            Github <i className="fa-brands fa-github fa-lg"></i>
          </button>
          <Link
            href="/auth/register"
            className="text-sm underline text-slate-500 hover:text-slate-900 hover:scale-105"
          >
            Do you no have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);

  if (session && user) {
    return {
      redirect: {
        destination: `/profile/${user._id}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default Login;
