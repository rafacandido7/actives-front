import { IconType } from 'react-icons'
import { BiSupport } from 'react-icons/bi'
import { FiHome } from 'react-icons/fi'
import { GrAction } from 'react-icons/gr'

interface LinkItemProps {
  name: string
  icon: IconType
  path: string
}

export const SidebarLinks: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Ativos', icon: GrAction, path: '/actives' },
  { name: 'Suporte', icon: BiSupport, path: '/supportCalls' },
]
