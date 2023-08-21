import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])

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
      <main>
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button type='button'>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}

export default App
