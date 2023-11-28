'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie, parseCookies } from 'nookies'

import { api } from '@/services/api'
import { login, getUserInfo, register } from '@/services/userService'

import { User } from '@/interfaces/User/user.interface'
import { UserCredentials } from '@/interfaces/User/credentials.user.interface'
import { RegisterUser } from '@/interfaces/User/register.user.interface'

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: ({ email, password }: UserCredentials) => void
  signUp: ({ name, email, password }: RegisterUser) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

const { Provider } = AuthContext

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    async function getUserInformations() {
      return await getUserInfo()
    }

    const { 'nextAuth-Token': token } = parseCookies()

    const fetchUserInformation = async () => {
      if (token) {
        try {
          const { email, name } = await getUserInformations()

          setUser({ email, name })

          api.defaults.headers.Authorization = `Bearer ${token}`
        } catch (error) {
          console.error('Error fetching user information:', error)
        }
      }
    }

    fetchUserInformation()
  }, [])

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

  async function signUp({ email, name, password }: RegisterUser) {
    const token = await register({
      email,
      name,
      password,
    })

    setCookie(undefined, 'nextAuth-Token', token, {
      maxAge: 60 * 60 * 24 * 3, // 3 dias
    })

    api.defaults.headers.Authorization = `Bearer ${token}`

    setUser({ name, email })
  }

  async function signOut() {
    try {
      setCookie(undefined, 'nextAuth-Token', '', {
        maxAge: -1,
      })

      delete api.defaults.headers.Authorization

      setUser(null)

      router.push('/')
    } catch (error) {
      console.error('Error during sign out:', error)
    }
  }

  return (
    <Provider value={{ isAuthenticated, user, signIn, signUp, signOut }}>
      {children}
    </Provider>
  )
}
