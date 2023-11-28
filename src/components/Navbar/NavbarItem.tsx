import { ReactNode } from 'react'
import { Box, FlexProps, Flex, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactNode
  path: string
}

export function NavbarItem({ icon, children, path, ...rest }: NavItemProps) {
  return (
    <Box
      as="a"
      href={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'primary.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}
