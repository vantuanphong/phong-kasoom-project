import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../environments/environment';

const BASE_API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: "root",
})
export class AuthServices {
  constructor(protected httpClient: HttpClient) {}


  public getLoginViaGoogleCallBack(model:any): Promise<any> {
    let urlParam = `additionalProp1=${model.additionalProp1}&additionalProp2=${model.additionalProp2}&additionalProp3=${model.additionalProp3}`
    return this.httpClient.get<any>(`${BASE_API_URL}auth/login-google/callback?${urlParam}`).toPromise();
  }

  public getAuthToken(model:any): Promise<any> {
    return this.httpClient.post<any>(`${BASE_API_URL}auth/exchange-token`,model).toPromise();
  }

  public getSubjec(model:any): Promise<any> {
    return this.httpClient.post<any>(`${BASE_API_URL}auth/exchange-token`,model).toPromise();
  }
}
