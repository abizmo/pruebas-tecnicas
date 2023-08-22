import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [colorful, setColorful] = useState(false)
  const [countrySorting, setCountrySorting] = useState(false)
  const [countryFilter, setCountryFilter] = useState('')
  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(({ results }) => {
        setUsers(results)
        originalUsers.current = results
      })
      .catch(error => console.error(error))
  }, [])

  const toggleColorful = () => setColorful(!colorful)

  const toggleCountrySorting = () => setCountrySorting(!countrySorting)

  const deleteUser = (email: string) =>
    setUsers(users.filter(user => user.email !== email))

  const handleChangeCountryFilter = ({
    target
  }: ChangeEvent<HTMLInputElement>) => setCountryFilter(target.value)

  const restoreUsers = () => setUsers(originalUsers.current)

  const usersFiltered = countryFilter
    ? users.filter(user =>
        user.location.country
          .toLowerCase()
          .includes(countryFilter.toLowerCase())
      )
    : users

  const usersToShow = countrySorting
    ? [...usersFiltered].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : usersFiltered

  return (
    <>
      <header>
        <h1>Prueba técnica</h1>
        <div>
          <button onClick={toggleColorful}>Colorear filas</button>
          <button onClick={toggleCountrySorting}>
            {countrySorting ? 'No ordenar por país' : 'Ordenar por país'}
          </button>
          <button onClick={restoreUsers}>Resetear usuarios</button>
          <input
            type='text'
            placeholder='Filtrar por país'
            value={countryFilter}
            onChange={handleChangeCountryFilter}
          />
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
