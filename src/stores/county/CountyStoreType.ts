export interface County extends Record<string, unknown> {
    id: number,
    name: string
}

export interface CountyStoreType {
    counties: Array<County> | null,
    loaded: boolean,
    selectedCountyId: number | null
}