export interface CountyType extends Record<string, unknown> {
    id: string,
    name: string
}

export interface CountyStoreType {
    counties: Array<CountyType> | null,
    loaded: boolean,
    selectedCountyId: string | null
}