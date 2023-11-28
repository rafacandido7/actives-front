import { useContext } from 'react'

import { ActivesContext } from '@/contexts/ActivesContext'

export function useActives() {
  return useContext(ActivesContext)
}
