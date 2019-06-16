export function login (state, data) {
  state.id = data.userId
  state.token = data.id
  state.email = data.email
}

export function logout (state) {
  state.id = null
  state.token = null
  state.email = null
}
