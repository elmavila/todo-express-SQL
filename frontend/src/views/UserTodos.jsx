import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function UserTodos() {
    const [todos, setTodos] = useState([])
    const [selectedUserName, setSelectedUserName] = useState(null)
    // Hämta användarens ID från URL:en med hjälp av useParams-hooken från react-router-dom
    const { userId } = useParams()

    useEffect(() => {
        fetchData()
    }, [userId])

    function fetchData() {
        fetch(`http://localhost:3030/users/${userId}/todos`)
            .then(response => {
                // Kontrollera om anropet var framgångsrikt
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Konvertera responsen till JSON-format
                return response.json();
            })
            .then(todosData => {
                // Uppdatera tillståndsvariabeln med användarens todos
                setTodos(todosData);

                fetch(`http://localhost:3030/users/${userId}`)
                    .then(response => response.json())
                    .then(userData => setSelectedUserName(userData.name))
                    .catch(error => console.error('Error fetching user data:', error));
            })

            .catch(error => {
                // Hantera fel om anropet misslyckas
                console.error('Error fetching data:', error);
            });
    }

    return (
        <div>
            <h1>Todos for: {selectedUserName}</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.description}</li>
                ))}
            </ul>
            <button><Link to="/">Back to home</Link>
            </button>
        </div>
    )
}

export default UserTodos;
