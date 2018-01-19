export function formatQuestion ({ id, timestamp, optionOne, optionTwo, author }) {
  return {
    id,
    timestamp,
    optionOneText: optionOne.text,
    optionOneCount: optionOne.count,
    optionTwoText: optionTwo.text,
    optionTwoCount: optionTwo.count,
    author
  }
}

export function formatQuestions (questions) {
  return Object.keys(questions)
    .map((id) => formatQuestion(questions[id]))
    .reduce((questions, q) => {
      questions[q.id] = q
      return questions
    }, {})
}