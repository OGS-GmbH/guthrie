type Variables = Partial<{
  mapping: Partial<{
    dataSource: (value: string) => string,
    event: (value: string) => string 
  }>
}>

export type {
  Variables
}
