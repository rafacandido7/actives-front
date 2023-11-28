import {
  Box,
  BoxProps,
  useColorModeValue,
  Flex,
  CloseButton,
} from '@chakra-ui/react'
import Image from 'next/image'

import Logo from '../../../public/assets/logo.svg'

import { NavbarItem } from '../Navbar/NavbarItem'

import { SidebarLinks } from '@/utils/SidebarLinks'

interface SidebarProps extends BoxProps {
  onClose: () => void
}
export function SidebarContent({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={Logo} alt="logo" />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {SidebarLinks.map((link) => (
        <NavbarItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavbarItem>
      ))}
    </Box>
  )
}
