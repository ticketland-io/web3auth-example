import React, {useCallback} from 'react'
import styles from './styles'

const Home = props => {
  const classes = styles();

  const login = useCallback(async () => {
    const web3auth = new Web3Auth({
      clientId: "",
      chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x1",
      },
    })

    await web3auth.initModal()
  }, [])

  return (
    <button onClick={login}>Login</button>
  )
}

export default React.memo(Home)
