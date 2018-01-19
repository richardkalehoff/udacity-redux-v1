import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    const { users } = this.props

    return (
      <ul>
        {users.map((user) => (
          <li className='user' key={user.id}>
            <img src={user.avatarURL} alt={`Avatar for ${user.name}`} />
            <div>
              <h1>{user.name}</h1>
              <p>{user.questions} Questions</p>
              <p>{user.answers} Answers</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users: Object.keys(users)
      .map((id) => {
        const { name, avatarURL, questions } = users[id]

        return {
          id,
          name,
          avatarURL,
          questions: questions.length,
          answers: users[id].answers.length
        }
      })
      .sort((a, b) => b.questions + b.answers > a.questions + a.answers)
  }
}

export default connect(mapStateToProps)(Leaderboard)