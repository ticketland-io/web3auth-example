import React, {useCallback, useEffect, useState} from 'react';
import * as anchor from '@project-serum/anchor'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import HDKey from 'hdkey'
import {WALLET_ADAPTERS} from "@web3auth/base";
import useWeb3Auth from '../hooks/useWeb3Auth';
import useFirebase from '../hooks/useFirebase';
import useWallet from '../hooks/useWallet';

const {Keypair} = anchor.web3

const Home = () => {
  const [user, setUser] = useState(null)
  const web3Auth = useWeb3Auth()
  const firebaseApp = useFirebase()
  const wallet = useWallet(web3Auth)

  useEffect(() => {
    const run = async () => {
      if(wallet) {
        const privateKey = await web3Auth.provider.request({
          method: "solanaPrivateKey",
          params: {},
        });
        
        // Create the HD wallet using the private from Torus as the seed
        const seed = privateKey
        const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
        const childkey = hdkey.derive("m/44'/501'/0'/0'");
        const keypair = Keypair.fromSeed(childkey.privateKey)
        console.log('>>>>>>>>>>> address', keypair.publicKey.toBase58())

        // We don't need this anymore since we will treat the pirvate key from torus as the seed for our mnemonic
        // console.log(">>>>>>>>>>>>>>>> Account", await wallet.requestAccounts())
      }
    }
    
    run()
    .then(() => {})
    .catch(error => console.log(`[Error] ${error.message}`))
  }, [wallet])
  useEffect(() => {
    const run = async () => {
      const _user = await web3Auth.getUserInfo()
      setUser(_user)

      console.log("User info >>>>>>>>>>>>>", _user)
      console.log("Provider", web3Auth.provider)
    }

    run()
    .then(() => {})
    .catch(error => console.log(`[Error] ${error.message}`))
  }, [web3Auth])

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

      const _user = await web3Auth.getUserInfo()
      setUser(_user)
      console.log("User info >>>>>>>>>>>>>", user)
    }
  }, [web3Auth])

  return (
    <button onClick={login}>Login</button>
  )
}

export default React.memo(Home)
