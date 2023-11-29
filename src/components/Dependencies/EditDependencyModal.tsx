// Importe os componentes necessários
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dependency } from '@/interfaces/Dependency/dependency.interface'

const schema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  healthStatus: z.string().min(1, { message: 'Saúde é obrigatória' }),
  lifeTime: z.string().min(1, { message: 'Tempo de vida é obrigatório' }),
  value: z.string().min(1, { message: 'Valor é obrigatório' }),
})

type EditDependencyFormValues = z.infer<typeof schema>

interface EditDependencyModalProps {
  dependency: Dependency
  isOpen: boolean
  onClose: () => void
  onUpdate: (dependencyId: string, data: any) => Promise<void>
}

export function EditDependencyModal({
  dependency,
  isOpen,
  onClose,
  onUpdate,
}: EditDependencyModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDependencyFormValues>({
    defaultValues: {
      name: dependency.name,
      description: dependency.description,
      healthStatus: dependency.healthStatus,
      lifeTime: dependency.lifeTime,
      value: String(dependency.value),
    },
    resolver: zodResolver(schema),
  })

  const toast = useToast()

  const onSubmit: SubmitHandler<EditDependencyFormValues> = async (data) => {
    try {
      await onUpdate(dependency.id, data)
      onClose()

      toast({
        title: 'Dependência atualizada com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Erro ao atualizar dependência',
        description: 'Verifique as informações e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })

      console.error('Error updating dependency:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Dependência</ModalHeader>
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
              <Input type="text" {...register('lifeTime')} />
              <Box color="red">{errors.lifeTime?.message}</Box>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Valor</FormLabel>
              <Input {...register('value')} />
              <Box color="red">{errors.value?.message}</Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="primary" variant="solid" mr={2}>
              Salvar
            </Button>
            <Button onClick={onClose} ml={2}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
