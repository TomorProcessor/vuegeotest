import {defineStore} from "pinia";
import DbMethods from "@/stores/DbMethods";
import type {CountyStoreType, County, City} from "@/stores/county/CountyStoreType";

export default defineStore('countyStore', {
    state: (): CountyStoreType  => ({
        counties: null,
        loaded: false,
        selectedCountyId: null,
        cities: new Map<number, Array<City>>()
    }),
    actions: {
        initializeCountryList() {
            DbMethods.getCountryListFromDb().then((r: Record<string, unknown>) => {
                this.counties = [];
                for (let county of Object.values(r)) {
                    this.counties.push(<County>county);
                }
                this.loaded = true;
            });
        },
        deleteCityById(id: number) {
            const countyIdForCity: number = this.getCountyIdForCityId(id);
            const cityArray: Array<City> = this.cities.get(countyIdForCity)!.filter(city => city.id !== id);
            this.cities.set(countyIdForCity, cityArray);
        },
        getCountyIdForCityId(id: number): number {
            for (let [countyId, cityArray] of this.cities.entries()) {
                for (const city of cityArray) {
                    if (city.id === id) {
                        return countyId;
                    }
                }
            }
            return NaN;
        },
        getCityById(id: number): City | undefined {
            const countyIdForCity: number = this.getCountyIdForCityId(id);
            const cityArray: Array<City> | undefined = this.cities.get(countyIdForCity)
            if (!cityArray) return undefined;
            return cityArray.find(city => city.id === id);
        }
    },
    getters: {
        selectedCounty(): County | null {
            return this.counties?.find(county => county.id === this.selectedCountyId) || null;
        },
        citiesForSelectedCounty(): Array<City> | null {
            if (this.selectedCountyId == null) return null;
            const countyId: number = this.selectedCountyId;
            if (!this.cities?.has(countyId)) {
                DbMethods.getCitiesForCountry(countyId).then((r: Record<string, unknown>) => {
                    const cities: Array<City> = [];
                    for (let city of Object.values(r)) {
                        cities.push(<County>city);
                    }
                    this.cities.set(countyId, cities);
                });
            }
            return this.cities?.get(this.selectedCountyId) || null;
        }
    }
})