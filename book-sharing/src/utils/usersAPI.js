const api = process.env.REDUX_APP_USERS_API_URL || 'http://localhost:5003'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function getUsers () {
  return fetch(`${api}/users`, { headers })
    .then((res) => res.json())
    .then((data) => data.users)
}
