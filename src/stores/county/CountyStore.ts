import {defineStore} from "pinia";
import DbMethods from "@/stores/DbMethods";
import type {CountyStoreType, CountyType} from "@/stores/county/CountyStoreType";

export default defineStore('countyStore', {
    state: (): CountyStoreType  => ({
        counties: null,
        loaded: false
    }),
    actions: {
        initializeCountryList() {
            DbMethods.getCountryListFromDb().then((r: Record<string, unknown>) => {
                this.counties = <CountyType>r;
                this.loaded = true;
            });
        }
    }
})