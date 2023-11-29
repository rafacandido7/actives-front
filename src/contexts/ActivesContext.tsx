'use client'

import { createContext, useEffect, useState, ReactNode } from 'react'
import {
  createActive,
  getAllActives,
  getActiveById,
  updateActive,
  deleteActive,
} from '@/services/activesService'

import { Active } from '@/interfaces/Active/active.interface'

interface ActivesContextData {
  actives: Active[]
  createActive: (activeData: Omit<Active, 'id'>) => Promise<void>
  fetchAllActives: () => Promise<void>
  fetchActiveById: (id: string) => Promise<Active | null>
  updateActive: (id: string, activeData: Partial<Active>) => Promise<void>
  deleteActive: (id: string) => Promise<void>
}

interface ActivesProviderProps {
  children: ReactNode
}

export const ActivesContext = createContext<ActivesContextData>(
  {} as ActivesContextData,
)

export function ActivesProvider({ children }: ActivesProviderProps) {
  const [actives, setActives] = useState<Active[]>([])

  const fetchAllActives = async () => {
    try {
      const allActives = await getAllActives()
      setActives(allActives)
    } catch (error) {
      console.error('Error fetching all actives:', error)
    }
  }

  useEffect(() => {
    fetchAllActives()
  }, [])

  const createActiveHandler = async (activeData: Omit<Active, 'id'>) => {
    try {
      await createActive(activeData)
      await fetchAllActives()
    } catch (error) {
      console.error('Error creating active:', error)
    }
  }

  const fetchActiveById = async (id: string) => {
    try {
      const active = await getActiveById(id)

      return active || null
    } catch (error) {
      console.error('Error fetching active by ID:', error)
      return null
    }
  }

  const updateActiveHandler = async (
    id: string,
    activeData: Partial<Active>,
  ) => {
    try {
      await updateActive(id, activeData)
      await fetchAllActives()
    } catch (error) {
      console.error('Error updating active:', error)
    }
  }

  const deleteActiveHandler = async (id: string) => {
    try {
      await deleteActive(id)
      await fetchAllActives()
    } catch (error) {
      console.error('Error deleting active:', error)
    }
  }

  return (
    <ActivesContext.Provider
      value={{
        actives,
        createActive: createActiveHandler,
        fetchAllActives,
        fetchActiveById,
        updateActive: updateActiveHandler,
        deleteActive: deleteActiveHandler,
      }}
    >
      {children}
    </ActivesContext.Provider>
  )
}
