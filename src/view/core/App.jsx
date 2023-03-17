import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route
          path='*'
          element={<Navigate to='/' replace />}
        />
      </Routes>
    </div>
  )
}

export default App
