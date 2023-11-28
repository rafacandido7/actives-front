import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'nextAuth-Token': token } = parseCookies()

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`
}
