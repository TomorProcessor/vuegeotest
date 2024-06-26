const serverUrl: string = 'http://127.0.0.1:8000';
export const countryList: string = serverUrl + '/counties';
export const cityList = (countyId: number): string => {
    return serverUrl + '/counties/' + countyId + '/cities';
};

export const newCity: string = serverUrl + '/new_city';

export const deleteCity = (cityId: number): string => {
    return serverUrl + '/delete_city/' + cityId;
}