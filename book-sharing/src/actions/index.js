export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const SET_OWNERS = 'SET_OWNERS'
export const SET_BORROWERS = 'SET_BORROWERS'
export const BORROW_BOOK = 'BORROW_BOOK'
export const RETURN_BOOK = 'RETURN_BOOK'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function receiveBooks (books) {
  return {
    type: RECEIVE_BOOKS,
    books,
  }
}

export function setOwners (owners) {
  return {
    type: SET_OWNERS,
    owners,
  }
}

export function setBorrowers (borrowers) {
  return {
    type: SET_BORROWERS,
    borrowers,
  }
}

export function borrowBook ({ ownerId, authedId, bookId }) {
  return {
    type: BORROW_BOOK,
    ownerId,
    bookId,
    authedId,
  }
}

export function returnBook ({ authedId, bookId, ownerId }) {
  return {
    type: RETURN_BOOK,
    bookId,
    authedId,
    ownerId,
  }
}