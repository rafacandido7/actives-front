export const translateHealthStatus = (status: string) => {
  switch (status) {
    case 'HEALTY':
      return 'Saudável'
    case 'WARNING':
      return 'Atenção'
    case 'CRITICAL':
      return 'Crítico'
    default:
      return status
  }
}
