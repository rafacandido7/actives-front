import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Dependency } from '@/interfaces/Dependency/dependency.interface'
import { useDependencies } from '@/hooks/useDependencies'
import { translateHealthStatus } from '@/utils/translateHealthStatus'

interface DependenciesByActiveIdProps {
  activeId: string
}

export function DependenciesByActiveId({
  activeId,
}: DependenciesByActiveIdProps) {
  const { getDependenciesByActiveId } = useDependencies()
  const [dependencies, setDependencies] = useState<Dependency[] | null>(null)

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

  if (!dependencies || dependencies.length === 0) {
    return <Text mt={4}>O Ativo não tem dependencias adicionadas.</Text>
  }

  return (
    <Box mt={4} bg="white" borderRadius="md" p={4}>
      <Text fontSize="xl" as="b" mb={4}>
        Dependencias do ativo
      </Text>
      <Table variant="simple" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Health Status</Th>
            <Th>Life Time</Th>
            <Th>Valor</Th>
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
              <Td>{dependency.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
