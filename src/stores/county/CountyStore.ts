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
            for (let [countyId, cityArray] of this.cities.entries()) {
                let cityFound: boolean = false;
                for (const city of cityArray) {
                    if (city.id === id) {
                        cityFound = true;
                        break;
                    }
                }
                if (cityFound) {
                    cityArray = cityArray.filter(city => city.id !== id);
                    this.cities.set(countyId, cityArray);
                    break;
                }
            }
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