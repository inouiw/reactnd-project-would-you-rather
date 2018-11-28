export const SET_DOCUMENT_SIZE = 'SET_WINDOW_SIZE'

export function setDocumentSize(clientWidth, clientHeight) {
  return {
    type: SET_DOCUMENT_SIZE,
    document: {clientWidth, clientHeight},
  }
}