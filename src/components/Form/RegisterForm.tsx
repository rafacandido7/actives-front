'use client'

import { useState } from 'react'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import RegisterImage from '../../../public/assets/login.svg'
import Logo from '../../../public/assets/logo.svg'

const schema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório!' })
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
})

export function RegisterForm() {
  const [isSubmitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onClick = () => {
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
    }, 2000)
  }

  const onSubmit = () => {
    onClick()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1} p={8}>
        <Image alt="Register Image" src={RegisterImage} />
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Image src={Logo} alt="logo" />
          <Heading fontSize={'4xl'}>Cadastre-se</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="name">
              <FormLabel>Nome</FormLabel>
              <Input type="text" {...register('name')} />
              <Text color="red.500">{errors.name?.message?.toString()}</Text>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register('email')} />
              <Text color="red.500">{errors.email?.message?.toString()}</Text>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text color="red.500">
                {errors.password?.message?.toString()}
              </Text>
            </FormControl>
            <Stack my={5}>
              <Text align="end">
                Já possui uma conta?{' '}
                <Link href="/login" color={'blue.400'}>
                  Faça login
                </Link>
              </Text>
            </Stack>
            <Stack spacing={6}>
              <Button
                colorScheme="primary"
                variant="solid"
                isLoading={isSubmitting}
                type="submit"
              >
                Cadastrar
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Stack>
  )
}
