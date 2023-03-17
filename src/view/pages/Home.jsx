import React, {useCallback} from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {WALLET_ADAPTERS} from "@web3auth/base";
import useWeb3Auth from '../hooks/useWeb3Auth';
import useFirebase from '../hooks/useFirebase';

const Home = () => {
  const web3Auth = useWeb3Auth()
  const firebaseApp = useFirebase()

  const login = useCallback(async () => {
    if(web3Auth) {
      const signInWithGoogle = async () => {
        try {
          const auth = getAuth(firebaseApp);
          const googleProvider = new GoogleAuthProvider();
          return await signInWithPopup(auth, googleProvider);
        } catch (err) {
          console.error(err);
          throw err;
        }
      };

      const loginRes = await signInWithGoogle()
      const idToken = await loginRes.user.getIdToken(true)

      await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: idToken,
          verifierIdField: "sub", // same as your JWT Verifier ID
          domain: "http://localhost:5173",
        },
      });

      const user = await web3Auth.getUserInfo()
      console.log("User info", user)
      console.log("Provider", web3Auth.provider)
    }
  }, [web3Auth])

  return (
    <button onClick={login}>Login</button>
  )
}

export default React.memo(Home)
