import { CustomUsersService } from '../../resource'

export async function login (context, data) {
  try {
    let response = await CustomUsersService.create('login', {
      email: data.email,
      password: data.password
    })
    response.data.email = data.email
    context.commit('login', response.data)
    return true
  } catch (err) {
    return false
  }
}

export async function logout (context, data) {
  try {
    await CustomUsersService.create(`logout?access_token=${context.state.token}`)
    context.commit('logout')
    return true
  } catch (err) {
    return false
  }
}
