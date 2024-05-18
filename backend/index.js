const cors = require('cors'),
  express = require('express'),
  sqlite = require('sqlite'),
  sqlite3 = require('sqlite3')

const app = express(),
  port = process.env.PORT || 3030

//konfigurera express
app.use(express.json())

let database

;(async () => {
  database = await sqlite.open({ driver: sqlite3.Database, filename: 'todos.sqlite' })

  await database.run('PRAGMA foreign_keys = ON')

  console.log('Redo att göra databasanrop')
})()

app.use(cors())

app.get('/users', async (request, response) => {
  const users = await database.all(`SELECT
  user_id as id,
  user_name as name,
  email
  FROM users`)

  response.send(users)
})

app.get('/users/:id', async (request, response) => {
  const userId = request.params.id
  const user = await database.get(`SELECT user_name as name FROM users WHERE user_id = ?`, [userId])
  response.send(user)
})

// GET-endpunkt för att hämta todos för en specifik användare baserat på användar-id
app.get('/users/:id/todos', async (request, response) => {
  const userId = request.params.id
  // Utför en SQL-fråga för att hämta todos för den specifika användaren baserat på användar-id
  const todos = await database.all(
    `SELECT todo_id as id,description FROM todoList
  WHERE user_id = ?`,
    [userId]
  )

  response.send(todos)
})


app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`)
})
