import { useContext } from 'react'
import { DependenciesContext } from '@/contexts/DependenciesContext'

export function useDependencies() {
  return useContext(DependenciesContext)
}
