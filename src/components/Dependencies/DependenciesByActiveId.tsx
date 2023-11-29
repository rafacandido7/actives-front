// DependenciesByActiveId.tsx
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Dependency } from '@/interfaces/Dependency/dependency.interface'
import { useDependencies } from '@/hooks/useDependencies'
import { EditDependencyModal } from './EditDependencyModal'
import { translateHealthStatus } from '@/utils/translateHealthStatus'
import { formatCurrency } from '@/utils/formatCurrency'
import { deleteDependency } from '@/services/dependenciesService'

interface DependenciesByActiveIdProps {
  activeId: string
}

export function DependenciesByActiveId({
  activeId,
}: DependenciesByActiveIdProps) {
  const { getDependenciesByActiveId, updateDependency } = useDependencies()
  const [dependencies, setDependencies] = useState<Dependency[] | null>(null)
  const [selectedDependency, setSelectedDependency] =
    useState<Dependency | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
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

  const handleEditClick = (dependency: Dependency) => {
    setSelectedDependency(dependency)
    onOpen()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateDependency = async (dependencyId: string, data: any) => {
    const { value, description, name, healthStatus, lifeTime } = data

    await updateDependency(dependencyId, {
      value: Number(value),
      description,
      name,
      healthStatus,
      lifeTime,
      activeId,
    })
  }

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
    return <Text mt={4}>O Ativo não tem dependencias adicionadas.</Text>
  }

  return (
    <Box mt={4} bg="white" borderRadius="md" p={4}>
      <Text fontSize="xl" as="b" mb={4}>
        Dependências do ativo
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
                  colorScheme="primary"
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(dependency)}
                >
                  Editar
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteDependency(dependency.id)}
                  mt={2}
                >
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedDependency && (
        <EditDependencyModal
          dependency={selectedDependency}
          isOpen={isOpen}
          onClose={() => {
            setSelectedDependency(null)
            onClose()
          }}
          onUpdate={handleUpdateDependency}
        />
      )}
    </Box>
  )
}
