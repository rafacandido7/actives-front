import { AxiosResponse } from 'axios'

import { api } from '@/services/api'

import { UserCredentials } from '@/interfaces/UserCredentials.inteface'
import { RegisterUser } from '@/interfaces/RegisterUser'
import { User } from '@/interfaces/User.interface'

export async function login({ email, password }: UserCredentials) {
  try {
    const response: AxiosResponse<{ accessToken: string }> = await api.post(
      '/auth/signIn',
      {
        email,
        password,
      },
    )

    if (response.status !== 201) {
      throw new Error('Error on signIn')
    }

    const token = response.data.accessToken

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
    }

    return token
  } catch (error) {
    console.error('Error on signIn:', error)
    throw new Error('Error on signIn')
  }
}

export async function register({ email, password, name }: RegisterUser) {
  try {
    const response: AxiosResponse = await api.post('/auth/signUp', {
      email,
      password,
      name,
    })

    const token = response.data.accessToken

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
    }
  } catch (error) {
    console.error('Error on signUp:', error)
    throw new Error('Error on signUp')
  }
}

export async function getUserInfo() {
  try {
    const response: AxiosResponse<User> = await api.get('/users/me')

    const { email, name } = response.data

    return { email, name }
  } catch (error) {
    console.error('Error on get user informations:', error)
    throw new Error('Error on get user informations')
  }
}
