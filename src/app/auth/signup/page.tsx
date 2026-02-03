"use client";
import { useRegisterUser } from "@/src/hooks/use-auth";
import { SignupValues } from "@/src/types/user";
import * as Yup from "yup";
import { FormikProvider, useFormik, Form } from "formik";
import CustomInput from "@/src/components/shared/CustomInput";
import CustomFileUpload from "@/src/components/shared/CustomFileUpload";
import CustomButton from "@/src/components/shared/CustomButton";

const signupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  avatar: Yup.mixed().required("Avatar is required"),
});

export default function SignUpPage() {
  const { mutate, isPending } = useRegisterUser();

  const formik = useFormik<SignupValues>({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      avatar: null,
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      mutate(values);
    },
  });

  const { errors, touched, getFieldProps, handleSubmit, isValid } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Create Account
        </h2>

        <FormikProvider value={formik}>
          <Form autoComplete="off">
            <CustomInput
              label="Full Name"
              placeholder="Enter your name"
              required
              {...getFieldProps("fullName")}
              autoComplete="name"
              error={
                touched.fullName && errors.fullName
                  ? (errors.fullName as string)
                  : ""
              }
            />

            <CustomInput
              label="Username"
              placeholder="Choose a username"
              required
              {...getFieldProps("username")}
              autoComplete="username"
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
              autoComplete="new-password"
              error={
                touched.password && errors.password
                  ? (errors.password as string)
                  : ""
              }
            />
            <CustomFileUpload label="Avatar" name="avatar" required />

            <CustomButton
              type="submit"
              isLoading={isPending}
              onClick={() => {
                if (!isValid) {
                  console.log("Validation Errors:", errors);
                }
                handleSubmit();
              }}
              className="mt-6 bg-blue-600 hover:bg-blue-700 font-bold py-3 shadow-md"
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
