import {useEffect, useState} from 'react'
import {Web3Auth} from "@web3auth/modal"

export default () => {
  const [web3Auth, setWeb3Auth] = useState(null)

  useEffect(() => {
    const run = async () => {
      const _web3auth = new Web3Auth({
        clientId: "",
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x1",
        },
      })

      await _web3auth.initModal()

      setWeb3Auth(_web3auth)
    }

    run()
    .then(() => {})
    .catch(error => console.log(`[Error] ${error.message}`))

  }, [])

  return web3Auth
}
