'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { login, getUserInfo } from '@/services/userService'

import { User } from '@/interfaces/User.interface'
import { UserCredentials } from '@/interfaces/UserCredentials.inteface'
import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:8080',
})

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: ({ email, password }: UserCredentials) => void
}

export const AuthContext = createContext({} as AuthContextType)

const { Provider } = AuthContext

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  // useEffect(() => {
  //   async function getUserInformations() {
  //     return await getUserInfo()
  //   }

  //   const { 'nextAuth-token': token } = parseCookies()

  //   if (token) {
  //     const { email, name } = getUserInformations()

  //     setUser({ email, name })

  //     api.defaults.headers.Authorization = `Bearer ${token}`
  //   }
  // }, [])

  async function signIn({ email, password }: UserCredentials) {
    const token = await login({
      email,
      password,
    })

    setCookie(undefined, 'nextAuth-Token', token, {
      maxAge: 60 * 60 * 24 * 3, // 3 dias
    })

    api.defaults.headers.Authorization = `Bearer ${token}`

    const { name, email: userEmail } = await getUserInfo()

    setUser({ name, email: userEmail })
  }

  return (
    <Provider value={{ isAuthenticated, user, signIn }}>{children}</Provider>
  )
}
