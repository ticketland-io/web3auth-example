import React from 'react'
import styles from './styles'

const Home = props => {
  const classes = styles();

  return (
    <div>Stateless Component</div>
  )
}

export default React.memo(Home)
