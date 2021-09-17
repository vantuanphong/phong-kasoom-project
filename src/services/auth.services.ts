import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../environments/environment';
import { select, Store } from '@ngrx/store';
import { Auths } from "src/models/auth.model";

const BASE_API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: "root",
})
export class AuthServices {
  auths:Observable<Auths>;
  token:any;
  constructor(protected httpClient: HttpClient,    
    private store:Store<{auths:Auths}>
    ) {
      this.auths = store.pipe(select('auths'))
      this.auths.subscribe(res =>{
        this.token = res;
      })
    }


  public getLoginViaGoogleCallBack(model:any): Promise<any> {
    let urlParam = `additionalProp1=${model.additionalProp1}&additionalProp2=${model.additionalProp2}&additionalProp3=${model.additionalProp3}`
    return this.httpClient.get<any>(`${BASE_API_URL}auth/login-google/callback?${urlParam}`).toPromise();
  }

  public getAuthToken(model:any): Promise<any> {
    return this.httpClient.post<any>(`${BASE_API_URL}auth/exchange-token`,model).toPromise();
  }

  public async getSubjec(): Promise<any> {    
    const httpHeaders = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    return this.httpClient.get<any>(`${BASE_API_URL}subjects`,{headers:httpHeaders}).toPromise();
  }
}
