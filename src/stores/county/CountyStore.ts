import {defineStore} from "pinia";
import DbMethods from "@/stores/DbMethods";
import type {CountyStoreType, CountyType} from "@/stores/county/CountyStoreType";

export default defineStore('countyStore', {
    state: (): CountyStoreType  => ({
        counties: null,
        loaded: false,
        selectedCountyId: null,
    }),
    actions: {
        initializeCountryList() {
            DbMethods.getCountryListFromDb().then((r: Record<string, unknown>) => {
                this.counties = [];
                for (let county of Object.values(r)) {
                    this.counties.push(<CountyType>county);
                }
                this.loaded = true;
            });
        }
    }
})