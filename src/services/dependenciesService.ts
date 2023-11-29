import { api } from '@/services/api'

import { Dependency } from '@/interfaces/Dependency/dependency.interface'

export async function createDependency(
  dependencyData: Omit<Dependency, 'id'>,
): Promise<Dependency> {
  try {
    const response = await api.post('/dependencies', dependencyData)
    return response.data
  } catch (error) {
    throw new Error('Error creating dependency')
  }
}

export async function getAllDependencies(): Promise<Dependency[]> {
  try {
    const response = await api.get('/dependencies')
    return response.data
  } catch (error) {
    throw new Error('Error fetching dependencies')
  }
}

export async function getDependencyById(
  id: string,
): Promise<Dependency | null> {
  try {
    const response = await api.get(`/dependencies/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching dependency by ID')
  }
}

export async function getDependencyByActiveId(
  activeId: string,
): Promise<Dependency[]> {
  try {
    const response = await api.get(`/dependencies/active/${activeId}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching dependencies by Active ID')
  }
}

export async function updateDependency(
  id: string,
  dependencyData: Partial<Dependency>,
): Promise<Dependency | null> {
  try {
    const response = await api.put(`/dependencies/${id}`, dependencyData)
    return response.data
  } catch (error) {
    throw new Error('Error updating dependency')
  }
}

export async function deleteDependency(id: string): Promise<void> {
  try {
    await api.delete(`/dependencies/${id}`)
  } catch (error) {
    throw new Error('Error deleting dependency')
  }
}
