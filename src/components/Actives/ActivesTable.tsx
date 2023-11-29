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
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useActives } from '@/hooks/useActives'
import { AddActiveModal } from './AddActiveModal'
import { Link } from '@chakra-ui/next-js'

export function ActivesTable() {
  const { actives, fetchAllActives, deleteActive } = useActives()
  const toast = useToast()

  useEffect(() => {
    if (!actives.length) {
      fetchAllActives()
    }
  }, [actives, fetchAllActives])

  const handleDelete = async (id: string) => {
    try {
      await deleteActive(id)
      toast({
        title: 'Ativo excluído com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Erro ao excluir ativo',
        description: 'Verifique as informações e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      console.error('Error deleting active:', error)
    }
  }

  return (
    <Box mt={4} bg="white" borderRadius="md" p={4}>
      <AddActiveModal />
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
          {actives.map((active) => (
            <Tr key={active.id}>
              <Td>
                <Link href={`/dashboard/actives/${active.id}`}>
                  {active.id}
                </Link>
              </Td>
              <Td>{active.name}</Td>
              <Td>{active.healthStatus}</Td>
              <Td>{active.lifeTime}</Td>
              <Td>
                <HStack spacing={2}>
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
    </Box>
  )
}
