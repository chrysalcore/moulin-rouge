// Tipos para el estado de los recursos remotos
export type ResourceStatus = {
    loading: boolean
    error: Error | null
    handleRetry: () => void
}
