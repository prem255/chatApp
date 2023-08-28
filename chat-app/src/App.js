// import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './HOC/privateRouter';
import LoginPanel from './components/account/index'
import Main from './components/Main'
//contexts
import AccountProvider from './contexts/AccountProvider';
// function App() {
// const clientId = '1084812599674-vuvmapn5j9b1jflr3io09bhj75g23icp.apps.googleusercontent.com';

//   return (
//     <>
//       <GoogleOAuthProvider clientId={clientId}>
//         <UserProvider>
//           <AccountProvider>
//             <Main />
//           </AccountProvider>
//         </UserProvider>
//       </GoogleOAuthProvider>
//     </>
//   );
// }

function App() {

  return (

    <Routes>
      <Route path="/" exact element={<PrivateRoute> < Main /> </PrivateRoute>} />
      <Route path="/login" exact element={<LoginPanel />} />
    </Routes>
  );
}

export default App;
