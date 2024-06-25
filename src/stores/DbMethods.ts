import {cityList, countryList} from "@/stores/ApiUrls";

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
}