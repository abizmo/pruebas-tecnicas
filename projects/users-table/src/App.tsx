import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [colorful, setColorful] = useState(false)
  const [countrySorting, setCountrySorting] = useState(false)

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(({ results }) => setUsers(results))
      .catch(error => console.error(error))
  }, [])

  const toggleColorful = () => setColorful(!colorful)
  const toggleCountrySorting = () => setCountrySorting(!countrySorting)
  const deleteUser = (email: string) =>
    setUsers(users.filter(user => user.email !== email))

  const usersToShow = countrySorting
    ? [...users].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : users
  return (
    <>
      <header>
        <h1>Prueba técnica</h1>
        <div>
          <button onClick={toggleColorful}>Colorear filas</button>
          <button onClick={toggleCountrySorting}>
            {countrySorting ? 'No ordenar por país' : 'Ordenar por país'}
          </button>
        </div>
      </header>
      <main>
        <table className={colorful ? 'table--colorful' : ''}>
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
            {usersToShow.map(user => (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button type='button' onClick={() => deleteUser(user.email)}>
                    Borrar
                  </button>
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
