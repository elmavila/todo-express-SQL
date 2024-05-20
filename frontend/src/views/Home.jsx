import { useState, useEffect } from 'react'
import UserList from '../components/UserList'
import SearchInput from '../components/SearchInput'

function Home() {
  // Tillståndsvariabel för att lagra användardata
  const [users, setUsers] = useState([])
  const [searchName, setSearchName] = useState('')
  // Använder useEffect för att köra fetchData-funktionen vid komponentens montering
  useEffect(() => {
    fetchData()
  }, [])

  // Funktion för att hämta data från API:et
  function fetchData() {
    fetch('/users')
      .then((response) => {
        // Kontrollerar om anropet var framgångsrikt
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        // Konverterar responsen till JSON-format
        return response.json()
      })
      .then((userData) =>
        setUsers(userData)
      )
      .catch((error) => {
        // Hanterar fel om anropet misslyckas
        console.error('Error fetching data:', error)
      })
  }

  function handleSearchInputChange(event) {
    // Uppdatera tillståndsvariabeln `searchName` med värdet från sökrutan
    setSearchName(event.target.value)
  }

  // Renderar komponenten
  return (
    <div>
      {/*  Dynamiskt ändra rubriken beroende på vald användare  */}
      <h1>Users:</h1>

       {/* Inmatningsfältet för sökning */}
      <SearchInput value={searchName} onChange={handleSearchInputChange} />

      {/* Lista som visar användarnas namn och e-postadresser */}
      <UserList users={users} searchName={searchName} />
    </div>
  )
}

// Exporterar komponenten så att den kan användas i andra delar av applikationen
export default Home
