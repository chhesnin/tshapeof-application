// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBrGkL63ouML3F2oNjsYV1k4F0064c-RDM',
  authDomain: 'tshapeof-application.firebaseapp.com',
  projectId: 'tshapeof-application',
  storageBucket: 'tshapeof-application.appspot.com',
  messagingSenderId: '1086896262714',
  appId: '1:1086896262714:web:54cbb92379b72946c8ef03'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
