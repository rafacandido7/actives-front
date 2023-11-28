'use client'

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAllActives, deleteActive } from '@/services/activesService'
import { AddActiveModal } from './AddActiveModal'

export function ActivesTable() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery('actives', getAllActives)
  const toast = useToast()

  const deleteMutation = useMutation(deleteActive, {
    onSuccess: () => {
      queryClient.invalidateQueries('actives')
      toast({
        title: 'Ativo excluído com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir ativo',
        description: 'Verifique as informações e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      console.error('Error deleting active:', error)
    },
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
    } catch (error) {
      console.error('Error deleting active:', error)
    }
  }

  return (
    <Box mt={4} bg="white" borderRadius="md" p={4}>
      <AddActiveModal />
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Saúde</Th>
              <Th>LifeTime</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((active) => (
                <Tr key={active.id}>
                  <Td>{active.id}</Td>
                  <Td>{active.name}</Td>
                  <Td>{active.healthStatus}</Td>
                  <Td>{active.lifeTime}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button colorScheme="blue" size="sm">
                        Editar
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(active.id)}
                      >
                        Excluir
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}
