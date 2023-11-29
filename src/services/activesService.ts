import { api } from '@/services/api'

import { Active } from '@/interfaces/Active/active.interface'
import { parseCookies } from 'nookies'

export async function createActive(activeData: Omit<Active, 'id'>) {
  try {
    const response = await api.post('/actives', activeData)

    return response.data
  } catch (error) {
    throw new Error('Error creating active')
  }
}

export async function getAllActives(): Promise<Active[]> {
  try {
    const response = await api.get('/actives')
    return response.data
  } catch (error) {
    throw new Error('Error fetching actives')
  }
}

export async function getActiveById(id: string): Promise<Active | null> {
  try {
    const response = await api.get(`/actives/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching active by ID')
  }
}

export async function updateActive(
  id: string,
  activeData: Partial<Active>,
): Promise<Active | null> {
  try {
    const response = await api.put(`/actives/${id}`, activeData)
    return response.data
  } catch (error) {
    throw new Error('Error updating active')
  }
}

export async function deleteActive(id: string): Promise<void> {
  try {
    await api.delete(`/actives/${id}`)
  } catch (error) {
    throw new Error('Error deleting active')
  }
}
