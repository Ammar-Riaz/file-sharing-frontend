"use client";

import { LoginValues } from "@/src/types/user";
import * as Yup from "yup";
import { FormikProvider, useFormik, Form } from "formik";
import CustomInput from "@/src/components/shared/CustomInput";
import CustomButton from "@/src/components/shared/CustomButton";
import { useLoginUser } from "@/src/hooks/use-auth";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const { mutate, isPending } = useLoginUser();

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const { errors, touched, getFieldProps } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Login
        </h2>

        <FormikProvider value={formik}>
          <Form autoComplete="off">
            <CustomInput
              label="Email"
              placeholder="Enter your email"
              required
              {...getFieldProps("email")}
              autoComplete="email"
              error={
                touched.email && errors.email ? (errors.email as string) : ""
              }
            />

            <CustomInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
              {...getFieldProps("password")}
              autoComplete="current-password"
              error={
                touched.password && errors.password
                  ? (errors.password as string)
                  : ""
              }
            />

            <CustomButton
              type="submit"
              isLoading={isPending}
              className="mt-6 bg-blue-600 hover:bg-blue-700 font-bold py-3 shadow-md"
            >
              Login
            </CustomButton>
          </Form>
        </FormikProvider>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
