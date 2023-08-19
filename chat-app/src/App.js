import { GoogleOAuthProvider } from '@react-oauth/google';

import Main from "./components/Main"

//contexts
import UserProvider from './contexts/UserProvider';
import AccountProvider from './contexts/AccountProvider';

function App() {
  const clientId = '1084812599674-vuvmapn5j9b1jflr3io09bhj75g23icp.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <AccountProvider>
          <Main />
        </AccountProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
