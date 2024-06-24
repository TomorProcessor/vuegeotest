import {countryList} from "@/stores/ApiUrls";

export default class DbMethods {
    public static async getCountryListFromDb(): Promise<Record<string, unknown>> {
        const response: Response = await fetch(countryList);
        return await response.json();
    }
}