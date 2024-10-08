import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, provider } from "../firebase/firebase";
import {
  signInWithRedirect,
  signInWithEmailAndPassword,
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

// Validation Schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Initialize Formik for email and password login
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, values.email, values.password);
        console.log("Logged in successfully");
      } catch (error) {
        console.error("Error logging in: ", error.message);
      }
    },
  });

  // Handle Google Sign-In with Redirect
  const handleGoogleSignIn = async () => {
    try {
    
      const res = await signInWithPopup(auth, provider);
      console.log(res);
      sessionStorage.setItem("token", res.user.accessToken);
      dispatch(
        login({
          user: {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
          },
          role: "user", // Adjust this based on your user roles logic
        })
      );
      toast("Login Sucessfull");
      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in with Google: ", error.message);
      toast("Login Unsucessfull");
    }
  };

  // Handle Google Sign-In result after redirect
  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Google login success", result.user);
        }
      } catch (error) {
        console.error("Error after redirect: ", error.message);
      }
    };

    handleAuthRedirect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            {/* Email/Password Form */}
            <form onSubmit={formik.handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className={`peer placeholder-transparent h-10 w-full border-b-2 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-600"
                        : "border-gray-300"
                    } text-gray-900 focus:outline-none`}
                    placeholder="Email address"
                    {...formik.getFieldProps("email")}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 text-sm">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className={`peer placeholder-transparent h-10 w-full border-b-2 ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-600"
                        : "border-gray-300"
                    } text-gray-900 focus:outline-none`}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600 text-sm">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="relative">
                  <button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1">
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <div>
              <div className="flex items-center justify-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/new user" className="ml-1 font-medium hover:text-gray-800">
                  Sign Up
                </Link>
              </div>

              {/* Google Sign-In Button */}
              <div className="w-full flex justify-center mt-4">
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <svg
                    className="h-6 w-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="800px"
                    height="800px"
                    viewBox="-0.5 0 48 48"
                  >
                    <title>Google-color</title>
                    <path
                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      fill="#FBBC05"
                    />
                    <path
                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      fill="#EB4335"
                    />
                    <path
                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      fill="#34A853"
                    />
                    <path
                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      fill="#4285F4"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
