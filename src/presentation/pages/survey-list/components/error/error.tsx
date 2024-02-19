type ErrorProps = {
  error: string,
  reload: () => void
}

export function Error({ error, reload }: ErrorProps) {
  return (
    <div>
      <span data-testid='error'>{error}</span>
      <button data-testid='reload' onClick={reload}>Recarregar</button>
    </div>
  )
}