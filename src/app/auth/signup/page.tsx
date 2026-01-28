"use client";
import CustomButton from "@/src/components/shared/CustomButton";
import CustomInput from "@/src/components/shared/CustomInput";
import CustomFileUpload from "@/src/components/shared/CustomFileUpload";
import { useState } from "react";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  avatar: Yup.mixed().required("Avatar is required"),
  coverImage: Yup.mixed().optional(),
});

interface SignupValues {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: File | null;
  coverImage: File | null;
}

export default function SignUpPage() {
  const [error, setError] = useState("");

  const formik = useFormik<SignupValues>({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      avatar: null,
      coverImage: null,
    },
    validationSchema: signupSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, { setSubmitting });
    },
  });

  const { errors, touched, getFieldProps, isSubmitting } = formik;

  const handleSubmit = async (
    values: SignupValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    setError("");
    try {
      console.log("Form Values:", values);
      //   await signup(values);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <FormikProvider value={formik}>
          <Form className="space-y-4">
            <CustomInput
              label="Full Name"
              placeholder="Enter your name"
              required
              {...getFieldProps("name")}
              error={touched.name && errors.name ? (errors.name as string) : ""}
            />

            <CustomInput
              label="Username"
              placeholder="Choose a username"
              required
              {...getFieldProps("username")}
              error={
                touched.username && errors.username
                  ? (errors.username as string)
                  : ""
              }
            />

            <CustomInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
              {...getFieldProps("email")}
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
              error={
                touched.password && errors.password
                  ? (errors.password as string)
                  : ""
              }
            />
            <CustomFileUpload label="Avatar" name="avatar" required />

            <CustomButton
              type="submit"
              isLoading={isSubmitting}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-300"
            >
              Sign Up
            </CustomButton>
          </Form>
        </FormikProvider>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
