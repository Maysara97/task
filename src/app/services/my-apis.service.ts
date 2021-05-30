import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap  } from 'rxjs/operators';

/* use those apis to get user geolocations and nationality all apis accept get request
https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en
returns all countries with country codes
*********
https://api.ipify.org/?format=json
returns users ip adress
*********
use ip adress to get user geo location and country
https://ipapi.co/${ip-adress}/json/
*/

@Injectable({
  providedIn: 'root'
})
export class MyApisService {

  constructor(private http : HttpClient) { }
  

  getAllCountries(){
    return this.http.get('https://backofficeapi.online-tkt.com/api/GetAllCountriesByLangName?LangCode=en');
  }

  mergeIpWithLocation(){
   return this.http.get('https://api.ipify.org/?format=json').pipe(
     map((res:any) => {
       return res
     }),
     mergeMap(
       res => this.http.get(`https://ipapi.co/${res.ip}/json/`)
     )
   )
  }
}
