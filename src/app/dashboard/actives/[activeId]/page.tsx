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
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useActives } from '@/hooks/useActives'
import { Active } from '@/interfaces/Active/active.interface'
import { useRouter } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ActiveDetails({ params }: { params: any }) {
  const activeId = params.activeId
  const { fetchActiveById, deleteActive } = useActives()
  const toast = useToast()
  const router = useRouter()

  const [active, setActive] = useState<Active | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setIsError(false)

        const activeData = await fetchActiveById(activeId)

        setActive(activeData)
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
        <Input value={active.description} isDisabled />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Health Status</FormLabel>
        <Input value={active.healthStatus} isDisabled />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Life Time</FormLabel>
        <Input value={active.lifeTime} isDisabled />
      </FormControl>

      <HStack mt={4} spacing={4}>
        <Button
          colorScheme="blue"
          onClick={() => router.push('/dashboard/actives')}
        >
          Voltar para o Dashboard
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
          Excluir Ativo
        </Button>
      </HStack>
    </Box>
  )
}
