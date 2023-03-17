import {SolanaWallet} from "@web3auth/solana-provider";


export default (web3Auth) => {
  const [wallet, setWallet] = useState()

  useEffect(() => {
    if(web3Auth) {
      setWallet(new SolanaWallet(web3auth.provider))
    }
  }, [web3Auth])

  return wallet
}
