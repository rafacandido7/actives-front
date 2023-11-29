import { createContext, useEffect, useState, ReactNode } from 'react'

import {
  createDependency,
  getAllDependencies,
  getDependencyById,
  updateDependency,
  deleteDependency,
  getDependencyByActiveId,
} from '@/services/dependenciesService'

import { Dependency } from '@/interfaces/Dependency/dependency.interface'

interface DependenciesContextData {
  dependencies: Dependency[]
  createDependency: (dependencyData: Omit<Dependency, 'id'>) => Promise<void>
  fetchAllDependencies: () => Promise<void>
  fetchDependencyById: (id: string) => Promise<void>
  updateDependency: (
    id: string,
    dependencyData: Partial<Dependency>,
  ) => Promise<void>
  deleteDependency: (id: string) => Promise<void>
  getDependenciesByActiveId: (activeId: string) => Promise<Dependency[]>
}

interface DependenciesProviderProps {
  children: ReactNode
}

export const DependenciesContext = createContext<DependenciesContextData>(
  {} as DependenciesContextData,
)

export function DependenciesProvider({ children }: DependenciesProviderProps) {
  const [dependencies, setDependencies] = useState<Dependency[]>([])

  const fetchAllDependencies = async () => {
    try {
      const allDependencies = await getAllDependencies()
      setDependencies(allDependencies)
    } catch (error) {
      console.error('Error fetching all dependencies:', error)
    }
  }

  useEffect(() => {
    fetchAllDependencies()
  }, [])

  const createDependencyHandler = async (
    dependencyData: Omit<Dependency, 'id'>,
  ) => {
    try {
      await createDependency(dependencyData)
      await fetchAllDependencies()
    } catch (error) {
      console.error('Error creating dependency:', error)
    }
  }

  const fetchDependencyById = async (id: string) => {
    try {
      await getDependencyById(id)
    } catch (error) {
      console.error('Error fetching dependency by ID:', error)
    }
  }

  const updateDependencyHandler = async (
    id: string,
    dependencyData: Partial<Dependency>,
  ) => {
    try {
      await updateDependency(id, dependencyData)
      await fetchAllDependencies()
    } catch (error) {
      console.error('Error updating dependency:', error)
    }
  }

  const deleteDependencyHandler = async (id: string) => {
    try {
      await deleteDependency(id)
      await fetchAllDependencies()
    } catch (error) {
      console.error('Error deleting dependency:', error)
    }
  }

  const getDependenciesByActiveId = async (activeId: string) => {
    try {
      const dependencies = await getDependencyByActiveId(activeId)
      return dependencies
    } catch (error) {
      console.error('Error fetching dependencies by Active ID:', error)
      return []
    }
  }

  return (
    <DependenciesContext.Provider
      value={{
        dependencies,
        createDependency: createDependencyHandler,
        fetchAllDependencies,
        fetchDependencyById,
        updateDependency: updateDependencyHandler,
        deleteDependency: deleteDependencyHandler,
        getDependenciesByActiveId,
      }}
    >
      {children}
    </DependenciesContext.Provider>
  )
}
