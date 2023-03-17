import {useEffect, useState} from 'react';
import {SolanaWallet} from "@web3auth/solana-provider";

export default (web3Auth) => {
  const [wallet, setWallet] = useState()

  useEffect(() => {
    if(web3Auth) {
      setWallet(new SolanaWallet(web3Auth.provider))
    }
  }, [web3Auth])

  return wallet
}
