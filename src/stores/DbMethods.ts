import {countryList} from "@/stores/ApiUrls";

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
}