import {cityList, countryList, deleteCity, newCity, updateCity} from "@/stores/ApiUrls";
import type {City} from "@/stores/county/CountyStoreType";
import CountyStore from "@/stores/county/CountyStore";

export default class DbMethods {
    public static async getCountryListFromDb(): Promise<Record<string, unknown>> {
        const response: Response = await fetch(countryList, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    }

    public static async getCitiesForCountry(id: number): Promise<Record<string, unknown>> {
        const response: Response = await fetch(cityList(id), {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    }

    public static async addNewCity(cityName: string): Promise<boolean> {
        const store = CountyStore();
        const cityData: Record<string, string | number> = {
            city_name: cityName,
            county_id: <number>store.selectedCountyId
        }
        try {
            const response = await fetch(newCity, {
                mode: 'cors',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityData)
            });
            if (!response.ok) {
                return false;
            }

            const data: Record<string, unknown> = await response.json();
            let cities: Array<City> | undefined = store.cities.get(store.selectedCountyId!);
            if (!cities) cities = [];
            cities.push({
                name: <string>data.name,
                id: <number>data.id
            });
            store.cities.set(store.selectedCountyId!, cities);
            return true;
        } catch (error) {
            console.error('An error occurred:', error);
            return false;
        }
    }

    public static async deleteCity(cityId: number): Promise<boolean> {
        const store = CountyStore();
        try {
            const response = await fetch(deleteCity(cityId), {
                mode: 'cors',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                return false;
            }

            store.deleteCityById(cityId);
            return true;
        } catch (error) {
            console.error('An error occurred:', error);
            return false;
        }
    }

    public static async updateCity(cityId: number, cityName: string): Promise<boolean> {
        const store = CountyStore();
        const cityData: Record<string, string | number> = {
            city_name: cityName
        }
        try {
            const response = await fetch(updateCity(cityId), {
                mode: 'cors',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityData)
            });
            if (!response.ok) {
                return false;
            }

            const data: Record<string, unknown> = await response.json();
            const modifiedCity: City | undefined = store.getCityById((<City>data).id);
            if (modifiedCity) modifiedCity.name = (<City>data).name;
            return true;
        } catch (error) {
            console.error('An error occurred:', error);
            return false;
        }
    }
}