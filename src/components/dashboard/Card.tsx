'use client'

import Image from 'next/image'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'

import DashboardImage from '../../../public/assets/dashboard.svg'

export default function Card() {
  return (
    <Center py={6}>
      <Box
        maxW={'900px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box
          h={'400px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Image src={DashboardImage} fill alt="Example" />
        </Box>
        <Stack>
          <Text
            color={'primary.300'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            Genactive
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            Gerencie os seus ativos de TI e mantenha a sua empresa organizada
          </Heading>
          <Text color={'gray.500'}>
            Bem-vindo ao Dashboard do Genactive! Nosso serviço oferece uma
            variedade abrangente de funcionalidades projetadas para simplificar
            o controle eficiente de todos os seus recursos tecnológicos.
          </Text>
          <Text color={'gray.500'}>
            Desde o gerenciamento de hardware até a supervisão de software,
            nossa interface flexível e segura permite que você execute operações
            essenciais de administração de ativos com facilidade.
          </Text>
          <Text color={'gray.500'}>
            Mantenha o controle total sobre seu ambiente de TI e otimize o
            desempenho de seus ativos com nosso serviço.
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://avatars.githubusercontent.com/u/98934793?v=4'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Rafael Cândido</Text>
            <Text color={'gray.500'}>Nov 28, 2023</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
