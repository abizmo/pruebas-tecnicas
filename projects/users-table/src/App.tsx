import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((res) => res.json())
      .then(({ results }) => setUsers(results))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <header>
        <h1>Prueba técnica</h1>
      </header>
      <main>{JSON.stringify(users)}</main>
    </>
  )
}

export default App
