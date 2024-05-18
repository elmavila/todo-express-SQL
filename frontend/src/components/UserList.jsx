import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function UserList({ users, searchName }) {

  const filteredUsers = users.filter(user => {
    // Kontrollera om user.name och searchName är definierade och är strängar
    if (typeof user.name !== 'string' || typeof searchName !== 'string') {
      return false; // Om någon av dem inte är strängar, ignorera användaren
    }
    // Använd toLowerCase() för att jämföra strängarna utan hänsyn till skiftläge
    return user.name.toLowerCase().startsWith(searchName.toLowerCase());
  });

  return (
    <ul>
      {/* Villkorlig rendering av användarlistan eller felmeddelande */}
      {filteredUsers.length > 0 && (
        filteredUsers.map(user => (
          <li key={user.id}>
            {/* Länk till användarens todo-lista */}
            <Link to={`/user/${user.id}/todos`}>
              {/* Visa användarens namn och e-postadress */}
              <strong>{user.name}</strong> - {user.email}
            </Link>
          </li>
        ))
      )}
      {filteredUsers.length === 0 ? (
        <p>No matching users found.</p>
      ) : null}
    </ul>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired, // Förväntar sig en array av användare
  searchName: PropTypes.string.isRequired // Förväntar sig en sträng för söknamnet
};

export default UserList;
