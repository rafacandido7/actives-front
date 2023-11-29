'use client'

// AddDependencyModal.tsx

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
import { useDependencies } from '@/hooks/useDependencies'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  healthStatus: z.string().min(1, { message: 'Saúde é obrigatória' }),
  lifeTime: z.string().min(1, { message: 'Tempo de vida é obrigatório' }),
  value: z.string().min(1, { message: 'Valor é obrigatório' }),
})

type AddDependencyFormValues = z.infer<typeof schema>

export function AddDependencyModal({ activeId }: { activeId: string }) {
  const [isLoading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { createDependency } = useDependencies()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddDependencyFormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<AddDependencyFormValues> = async (data) => {
    const { value, description, name, healthStatus, lifeTime } = data

    try {
      setLoading(true)
      await createDependency({
        value: Number(value),
        description,
        name,
        healthStatus,
        lifeTime,
        activeId,
      })
      onClose()

      toast({
        title: 'Dependência adicionada com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Erro ao adicionar dependência',
        description: 'Verifique as informações e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })

      console.error('Error creating dependency:', error)
    } finally {
      setLoading(false)
      reset()
    }
  }

  return (
    <>
      <HStack justifyContent="flex-end" mb={4}>
        <Button colorScheme="primary" variant="solid" onClick={onOpen}>
          Adicionar Dependência
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Dependência</ModalHeader>
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
                <FormLabel>Tempo de Vida</FormLabel>
                <Input type="date" {...register('lifeTime')} />
                <Box color="red">{errors.lifeTime?.message}</Box>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Valor</FormLabel>
                <Input {...register('value')} />
                <Box color="red">{errors.value?.message}</Box>
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
