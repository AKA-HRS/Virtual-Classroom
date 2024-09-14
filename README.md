# Virtual Classroom

## Overview

The Virtual Classroom is a web application designed to facilitate online learning. Built with the FERN stack (Firebase, Express, React, Node.js), this application offers features such as class management, real-time discussions, role-based access, and a user-friendly registration process. The application is styled with Tailwind CSS and utilizes Redux Toolkit for state management. Vite is used for a fast and efficient development setup.

## Features

- **Class Management**: Create and manage classes with ease.
- **Real-Time Discussions**: Engage in live discussions and collaborations.
- **Role-Based Access**: Assign and manage user roles such as students and instructors.
- **User Authentication**: Sign up and log in using email/password or Google authentication.

## Getting Started

To get started with the Virtual Classroom project, follow these instructions:

### Prerequisites

Ensure you have the following software installed:

- Node.js
- npm or yarn
- Firebase account and project setup

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/virtual-classroom.git
    cd virtual-classroom
    ```

2. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set Up Firebase**

    - Create a Firebase project.
    - Add Firebase configuration to your project by creating a `firebase.js` file in the `src/firebase` directory and add your Firebase config.

4. **Run the Application**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application should now be running at `http://localhost:3000`.

## Folder Structure

- **`src/`**: Contains all source code.
  - **`components/`**: React components such as registration forms and buttons.
  - **`firebase/`**: Firebase configuration and initialization.
  - **`pages/`**: React components for different pages.
  - **`store/`**: Redux store and slices.
  - **`styles/`**: Tailwind CSS styles.

## Key Features and Implementation

### Registration Form

The registration form uses Formik for form management and validation, with Yup for schema validation. It supports:

- **Email/Password Registration**: Users can register using their email and password.
- **Google Sign-In**: Users can register and log in using their Google account.

**File**: `RegistrationForm.jsx`

#### Google Sign-In

- Uses Firebase Authentication to allow users to sign in with Google.
- Updates the form fields (`name` and `email`) with Google account details upon successful sign-in.
- Saves user data to Firestore.

### Redux Toolkit

- **State Management**: Manages authentication state (`isAuthenticated`, `userRole`, `user`) and user role updates using Redux Toolkit.
- **Slices**: Contains reducers and actions to handle authentication and user roles.

### Tailwind CSS

- Provides a responsive and modern UI with utility-first CSS classes.
- Ensures a consistent design throughout the application.

## Contribution

Contributions are welcome! To contribute to the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

-----

## Contact

For questions or feedback, please reach out to:

- **Email**: harshraj2003sinha@gmail.com
- **GitHub**: aka-hrs (https://github.com/aka-hrs)
