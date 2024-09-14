// src/components/RegistrationForm.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, addDoc, getDoc, doc, query, where, getDocs } from "firebase/firestore";
import { auth, db, provider } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string()
      .oneOf(["student", "instructor"], "Invalid Role")
      .required("Role is required"),
  });

  const addUserToFirestore = async (userData) => {
    try {
      // Add user data to Firestore and get the document reference
      const docRef = await addDoc(collection(db, "registeredUsers"), userData);

      // Fetch the newly created document using its ID
      const userDoc = await getDoc(doc(db, "registeredUsers", docRef.id));

      if (userDoc.exists()) {
        const registeredUserData = userDoc.data();
        // Log the registered user data
        console.log("Registered user data:", registeredUserData);
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
      throw error; // Re-throwing error to be caught by toast.promise
    }
  };

  const getUserData = async (email) => {
    const usersCollection = collection(db, "registeredUsers");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    return querySnapshot;
  };

  const registerUser = async (userData) => {
    try {
      await addDoc(collection(db, "registeredUsers"), userData);
      const querySnapshot = await getUserData(userData.email);

      if (!querySnapshot.empty) {
        // Get the user data
        const registeredUserData = querySnapshot.docs[0].data();
        sessionStorage.setItem("user", registeredUserData);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error registering user.");
      throw error;
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Perform Google sign-in
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Define user data
      const userData = {
        uid: user.uid,
        name: user.displayName || "No Name",
        email: user.email,
        role: "student", // Default role
        createdAt: new Date(),
      };

      // Check if the user already exists
      const querySnapshot = await getUserData(user.email);

      if (!querySnapshot.empty) {
        // User with the email already exists
        const existingUserDoc = querySnapshot.docs[0];
        const existingUserData = existingUserDoc.data();
        console.log("Existing user data:", existingUserData);

        sessionStorage.setItem("user", existingUserData);
        // Dispatch login action
        dispatch(
          login({
            user: {
              uid: existingUserData.uid,
              email: existingUserData.email,
              displayName: existingUserData.name,
            },
            role: existingUserData.role, // Use the existing role
          })
        );
        navigate("/dashboard");
        // Display toast message
        toast.success("User already registered. Logging in...");

        // Exit the function as no further action is needed
        return;
      }

      // Email does not exist, register the user
      await toast.promise(registerUser(userData), {
        pending: "Loading...",
        success: "Registration successful",
        error: "Registration failed",
      });

      // Dispatch login action
      dispatch(
        login({
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          },
          role: "student", // Default role for new users
        })
      );

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      // Handle errors
      toast.error("An error occurred");
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { name, email, password, role } = values;

    toast.promise(
      async () => {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Define user data
        const userData = {
          uid: user.uid,
          name,
          email,
          role,
          createdAt: new Date(),
        };

        // Save user data in Firestore
        await addUserToFirestore(userData);
        resetForm();

        setSubmitting(false);
      },
      {
        pending: "Logging in...",
        success: "Login Successful",
        error: "Login Unsuccessful",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Register</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    {/* Name */}
                    <div className="relative">
                      <Field
                        autoComplete="off"
                        id="name"
                        name="name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                        placeholder="Name"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Name
                      </label>
                      <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Field
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="email"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                      <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <Field
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <Field
                        autoComplete="off"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                        placeholder="Confirm Password"
                      />
                      <label
                        htmlFor="confirmPassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Confirm Password
                      </label>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Role */}
                    <div className="relative">
                      <Field
                        as="select"
                        id="role"
                        name="role"
                        className="peer placeholder-transparent h-8 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                      </Field>
                      <label
                        htmlFor="role"
                        className="absolute left-0 -top-4 text-gray-600 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-lg"
                      >
                        Role
                      </label>
                      <ErrorMessage name="role" component="div" className="text-red-600 text-sm" />
                    </div>

                    {/* Submit Button */}
                    <div className="relative">
                      <button type="submit" className="bg-cyan-500 text-white rounded-md px-4 py-2">
                        Register
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Google Sign-In Button */}
            <div className="w-full flex justify-center mt-4">
              <button
                onClick={handleGoogleSignUp}
                className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    fill="#34A853"
                  />
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    fill="#EB4335"
                  />
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    fill="#4285F4"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="flex items-center justify-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="ml-1 font-medium hover:text-gray-800">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
