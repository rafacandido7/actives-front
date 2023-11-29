'use client'

import {
  Box,
  Heading,
  Input,
  useToast,
  Spinner,
  FormControl,
  FormLabel,
  Button,
  HStack,
  Select,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { DependenciesByActiveId } from '@/components/Dependencies/DependenciesByActiveId'

import { useActives } from '@/hooks/useActives'

import { Active } from '@/interfaces/Active/active.interface'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ActiveDetails({ params }: { params: any }) {
  const activeId = params.activeId
  const { fetchActiveById, updateActive, deleteActive } = useActives()
  const toast = useToast()
  const router = useRouter()

  const [active, setActive] = useState<Active | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isEditing, setIsEditing] = useState(true)
  const [initialValues, setInitialValues] = useState<Active | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setIsError(false)

        const activeData = await fetchActiveById(activeId)

        setActive(activeData)
        setInitialValues(activeData)
      } catch (error) {
        setIsError(true)
        toast({
          title: 'Erro',
          description: 'Erro ao carregar detalhes do ativo.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        console.error('Error loading active details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [activeId, fetchActiveById, toast])

  const handleDelete = async () => {
    try {
      await deleteActive(activeId)
      toast({
        title: 'Ativo excluído com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      router.push('/dashboard/actives')
    } catch (error) {
      console.error('Error deleting active:', error)
    }
  }

  const handleUpdate = async () => {
    try {
      await updateActive(activeId, {
        name: active?.name,
        description: active?.description,
        healthStatus: active?.healthStatus,
        lifeTime: active?.lifeTime,
      })
      toast({
        title: 'Ativo atualizado com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      setIsEditing(false)
      setInitialValues(active)
    } catch (error) {
      console.error('Error updating active:', error)
    }
  }

  const isValueChanged = () => {
    return (
      active &&
      (active.name !== initialValues?.name ||
        active.description !== initialValues?.description ||
        active.healthStatus !== initialValues?.healthStatus ||
        active.lifeTime !== initialValues?.lifeTime)
    )
  }

  const handleChange = (key: keyof Active, value: string) => {
    setActive((prev) => {
      if (prev) {
        return { ...prev, [key]: value }
      }
      return prev
    })
  }
  if (isLoading) {
    return (
      <Box p={4}>
        <Spinner size="lg" />
      </Box>
    )
  }

  if (isError || !active) {
    return <Box>Error loading active details.</Box>
  }

  const healthStatusOptions = [
    { label: 'Saudável', value: 'HEALTY' },
    { label: 'Atenção', value: 'WARNING' },
    { label: 'Crítico', value: 'CRITICAL' },
  ]

  return (
    <Box p={4} bg="white" borderRadius="md">
      <Heading as="h1" mb={4}>
        {active.name}
      </Heading>

      <FormControl mb={2}>
        <FormLabel>Id</FormLabel>
        <Input value={active.id} isDisabled />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Description</FormLabel>
        <Input
          value={active.description}
          isDisabled={!isEditing}
          placeholder="Description"
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Health Status</FormLabel>
        <Select
          value={active.healthStatus}
          isDisabled={!isEditing}
          onChange={(e) => handleChange('healthStatus', e.target.value)}
        >
          {healthStatusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Life Time</FormLabel>
        <Input
          value={active.lifeTime}
          isDisabled={!isEditing}
          placeholder="Life Time"
          onChange={(e) => handleChange('lifeTime', e.target.value)}
        />
      </FormControl>

      <DependenciesByActiveId activeId={activeId} />

      <HStack mt={4} spacing={4}>
        <Button
          colorScheme="blue"
          onClick={() => router.push('/dashboard/actives')}
        >
          Voltar para o Dashboard
        </Button>
        {isEditing && (
          <Button
            colorScheme="green"
            onClick={handleUpdate}
            isDisabled={!isValueChanged()}
          >
            Salvar Alterações
          </Button>
        )}
        <Button colorScheme="red" onClick={handleDelete} isDisabled={isEditing}>
          Excluir Ativo
        </Button>
      </HStack>
    </Box>
  )
}
