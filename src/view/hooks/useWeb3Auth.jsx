import {useEffect, useState} from 'react';
import {Web3Auth} from "@web3auth/modal";
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";
import {CHAIN_NAMESPACES} from "@web3auth/base";

export default () => {
  const [web3Auth, setWeb3Auth] = useState(null)

  useEffect(() => {
    const run = async () => {
      const _web3auth = new Web3Auth({
        authMode: 'DAPP',
        clientId: process.env.WEB3_AUTH_CLIENT_ID,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.SOLANA,
          chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
          rpcTarget: "https://api.devnet.solana.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
        web3AuthNetwork: "cyan",
      })

      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          uxMode: "popup",
          loginConfig: {
            google: {
              verifier: "tl-google",
              typeOfLogin: "google",
              clientId: "538780875835-m8p3ooigmem22lcod7ija17lclms8i19.apps.googleusercontent.com",
            },
          },
        },
      });
      
      _web3auth.configureAdapter(openloginAdapter);
  
      await _web3auth.initModal()

      setWeb3Auth(_web3auth)
    }

    run()
    .then(() => {})
    .catch(error => console.log(`[Error] ${error.message}`))

  }, [])

  return web3Auth
}
