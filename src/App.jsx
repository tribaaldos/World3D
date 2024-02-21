import { useState } from 'react'

import './App.css'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import Experience from './World/World'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Experience />
    </>
  )
}

export default App
