#TestUser Details

1. sri@gmail.com - Password : Sri@1234
2. surya@gmail.com - Password : Surya@1234


#Firebase Authentication with React and Redux
This project is a chat application built using React, Redux, Firebase, and React Router. It demonstrates user authentication (sign-up and sign-in) with Firebase Authentication, and user data storage in Firestore. It also showcases basic chat functionality where users can search for and initiate chats with other users.

#Table of Contents
Features
Technologies Used
Getting Started
Prerequisites
Installation
Running the Application
Project Structure
Usage
Sign-Up
Sign-In
Search Users and Start Chat
Contributing
License



#Features
User authentication using Firebase Authentication.
Storage of user data in Firestore.
Random avatar assignment during sign-up from a set of predefined images.
Protected routes using React Router and Redux.
User search functionality.
Basic chat initiation between users.


#Technologies Used
React
Redux
Firebase (Authentication, Firestore)
React Router
React Toastify

#Getting Started
#Prerequisites
Node.js and npm installed on your machine.
Firebase project set up with Firestore and Authentication enabled.
Basic knowledge of React and Firebase.

#Installation
Clone the repository:

git clone https://github.com/srikanth141199/Chat-app-Redux
cd firebase-auth-chat-app

#Install dependencies:
npm install


#Running the Application

npm start
Open your browser and navigate to http://localhost:3000.


Project Structure

src
├── assets
│   ├── image1.png
│   ├── image2.png
│   ├── image3.png
│   ├── image4.png
│   └── image5.png
├── components
│   ├── Aside
│   │   └── Aside.js
│   ├── ChatPanel
│   │   └── ChatPanel.js
│   ├── Home
│   │   └── Home.js
│   ├── SignIn
│   │   └── SignIn.js
│   ├── SignUp
│   │   └── SignUp.js
│   └── Search
│       └── Search.js
├── config
│   ├── firebase.js
│   └── firebaseConfig.js
├── redux
│   ├── Reducers
│   │   ├── authReducer.js
│   │   └── chatReducer.js
│   └── store.js
├── App.js
├── index.js
└── styles
    └── App.css


#Usage
#Sign-Up
Navigate to the Sign-Up page.
Enter your name, email, and password.
Upon successful sign-up, a random avatar will be assigned, and your details will be stored in Firestore.

#Sign-In
Navigate to the Sign-In page.
Enter your email and password.
Upon successful sign-in, you will be redirected to the home page.

#Search Users and Start Chat
On the home page, use the search bar to find users by their name.
Click on a user to initiate a chat.
