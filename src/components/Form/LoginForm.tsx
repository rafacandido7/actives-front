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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import LoginImage from '../../../public/assets/log.svg'
import Logo from '../../../public/assets/logo.svg'

const schema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
})

export function LoginForm() {
  const [isSubmitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = () => {
    onClick()
  }

  const onClick = () => {
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
    }, 2000)
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Image src={Logo} alt="logo" />
          <Heading fontSize={'4xl'}>Login</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                Ainda não tem uma conta?{' '}
                <Link href="/register" color={'blue.400'}>
                  Cadastre-se
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
                Entrar
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <>
          <Image alt="Login Image" src={LoginImage} />
        </>
      </Flex>
    </Stack>
  )
}
