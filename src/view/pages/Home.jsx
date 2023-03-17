import React, {useCallback} from 'react'
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base"
import useWeb3Auth from '../hooks/useWeb3Auth'

const Home = props => {
  const web3Auth = useWeb3Auth()

  const login = useCallback(async () => {
    if(web3Auth) {
      const web3authProvider = await web3auth.connect()
      console.log('>>>>>>>>', web3authProvider)
    }
  }, [web3Auth])

  return (
    <button onClick={login}>Login</button>
  )
}

export default React.memo(Home)
