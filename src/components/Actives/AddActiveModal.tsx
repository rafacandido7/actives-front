'use client'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useActives } from '@/hooks/useActives'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  healthStatus: z.string().min(1, { message: 'Saúde é obrigatória' }),
  lifeTime: z.string().min(1, { message: 'Tempo de vida é obrigatório' }),
})

type AddActiveFormValues = z.infer<typeof schema>

export function AddActiveModal() {
  const [isLoading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { createActive } = useActives()
  const toast = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddActiveFormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<AddActiveFormValues> = async (data) => {
    try {
      setLoading(true)
      await createActive(data)
      onClose()

      router.push('/dashboard/actives')

      toast({
        title: 'Ativo adicionado com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Erro ao adicionar ativo',
        description: 'Verifique as informações e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })

      console.error('Error creating active:', error)
    } finally {
      setLoading(false)
      reset()
    }
  }

  return (
    <>
      <HStack justifyContent="space-between" mb={4}>
        <Button colorScheme="primary" variant="solid" onClick={onOpen}>
          Adicionar Ativo
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Ativo</ModalHeader>
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Nome</FormLabel>
                <Input {...register('name')} />
                <Box color="red">{errors.name?.message}</Box>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Descrição</FormLabel>
                <Input {...register('description')} />
                <Box color="red">{errors.description?.message}</Box>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Saúde</FormLabel>
                <Select {...register('healthStatus')}>
                  <option value="HEALTY">Saudável</option>
                  <option value="WARNING">Atenção</option>
                  <option value="CRITICAL">Crítico</option>
                </Select>
                <Box color="red">{errors.healthStatus?.message}</Box>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Validade</FormLabel>
                <Input type="date" {...register('lifeTime')} />
                <Box color="red">{errors.lifeTime?.message}</Box>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="primary"
                variant="solid"
                mr={2}
                isLoading={isLoading}
              >
                Adicionar
              </Button>
              <Button
                onClick={() => {
                  reset()
                  onClose()
                }}
                ml={2}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
