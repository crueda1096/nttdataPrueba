import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getallcountries(){
    let url = "https://restcountries.com/v3.1/all";
    return this.http.get(url);
  }

  countriesbyregion(region:string){
    console.log(region);
    let url = (region == "")? "https://restcountries.com/v3.1/all" : "https://restcountries.com/v3.1/region/"+region;
    return this.http.get(url);
  }

  countrybycode(code:string){
    
    console.log(code);
    let url = "https://restcountries.com/v3.1/name/"+code;
    return this.http.get(url);

  }

}
