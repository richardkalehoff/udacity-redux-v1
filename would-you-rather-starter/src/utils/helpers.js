export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatQuestion ({ id, timestamp, optionOne, optionTwo }) {
  return {
    id,
    timestamp,
    optionOneText: optionOne.text,
    optionOneCount: optionOne.count,
    optionTwoText: optionTwo.text,
    optionTwoCount: optionTwo.count,
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