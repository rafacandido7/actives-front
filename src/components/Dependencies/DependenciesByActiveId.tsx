import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  useToast,
  HStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Dependency } from '@/interfaces/Dependency/dependency.interface'
import { useDependencies } from '@/hooks/useDependencies'
import { translateHealthStatus } from '@/utils/translateHealthStatus'
import { AddDependencyModal } from './AddDependencyModal'
import { formatCurrency } from '@/utils/formatCurrency'

interface DependenciesByActiveIdProps {
  activeId: string
}

export function DependenciesByActiveId({
  activeId,
}: DependenciesByActiveIdProps) {
  const { getDependenciesByActiveId, deleteDependency } = useDependencies()
  const [dependencies, setDependencies] = useState<Dependency[] | null>(null)
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dependenciesData = await getDependenciesByActiveId(activeId)
        setDependencies(dependenciesData)
      } catch (error) {
        console.error('Error loading dependencies by active ID:', error)
      }
    }

    fetchData()
  }, [activeId, getDependenciesByActiveId])

  const handleDeleteDependency = async (dependencyId: string) => {
    try {
      await deleteDependency(dependencyId)
      setDependencies(
        (prevDependencies) =>
          prevDependencies?.filter(
            (dependency) => dependency.id !== dependencyId,
          ) || null,
      )
      toast({
        title: 'Dependência excluída com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error deleting dependency:', error)
      toast({
        title: 'Erro ao excluir dependência',
        description: 'Verifique as informações e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  if (!dependencies || dependencies.length === 0) {
    return <Text mt={4}>O Ativo não tem dependências adicionadas.</Text>
  }

  return (
    <Box mt={4} bg="white" borderRadius="md" p={4}>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="xl" as="b" mb={4}>
          Dependências do Ativo
        </Text>
        <AddDependencyModal activeId={activeId} />
      </HStack>
      <Table variant="simple" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Health Status</Th>
            <Th>Life Time</Th>
            <Th>Valor</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dependencies.map((dependency) => (
            <Tr key={dependency.id}>
              <Td>{dependency.id}</Td>
              <Td>{dependency.name}</Td>
              <Td>{dependency.description}</Td>
              <Td>{translateHealthStatus(dependency.healthStatus)}</Td>
              <Td>{dependency.lifeTime}</Td>
              <Td>{formatCurrency(dependency.value)}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteDependency(dependency.id)}
                >
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
