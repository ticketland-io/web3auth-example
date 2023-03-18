import {useEffect, useState} from 'react'
import {Web3AuthNoModal} from "@web3auth/no-modal";
import {OpenloginAdapter} from "@web3auth/openlogin-adapter";
import {CHAIN_NAMESPACES, ADAPTER_EVENTS} from "@web3auth/base"

export default () => {
  const [web3Auth, setWeb3Auth] = useState(null)

  useEffect(() => {
    const run = async () => {
      const _web3Auth = new Web3AuthNoModal({
        authMode: 'DAPP',
        clientId: process.env.WEB3_AUTH_CLIENT_ID,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.SOLANA,
          chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
          rpcTarget: "https://api.devnet.solana.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
        sessionTime: 86400 * 7, // 7 days
        web3AuthNetwork: "testnet",
        useCoreKitKey: true,
      });

      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          clientId: process.env.WEB3_AUTH_CLIENT_ID,
          uxMode: "redirect",
          network: "testnet",
          loginConfig: {
            jwt: {
              verifier: "tl-firebase-verifier",
              typeOfLogin: "jwt",
              clientId: process.env.WEB3_AUTH_CLIENT_ID,
            },
          },
        },
        loginSettings: {
          mfaLevel: 'mandatory',
        }
      });
      
      _web3Auth.configureAdapter(openloginAdapter);
  
      await _web3Auth.init();

      _web3Auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      _web3Auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setUser(null);
      });

      _web3Auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
        console.error("some error or user has cancelled login request", error);
      });

      setWeb3Auth(_web3Auth);
    }

    run()
    .then(() => {})
    .catch(error => console.log(`[Error] ${error.message}`))

  }, [])

  return web3Auth
}
