import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from '../../../services/auth.services'
import { DOCUMENT } from '@angular/common';
import * as AuthAction from '../../../ngRx/auth.actions'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Auths } from 'src/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  auths:Observable<Auths>;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authServices: AuthServices,
    private store:Store<{auths:Auths}>
  ) {
    this.auths = store.pipe(select('auths'))

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  param: any = {
    accessToken: '',
    expireAt: '',
    deviceId: '',
    refreshToken: ''
  }

  async ngOnInit(): Promise<void> {    
    this.param = {
      accessToken: this.findGetParameter('access_token'),      
      refreshToken: this.findGetParameter('refresh_token'),
      deviceId: '1',
    }
    if(this.param.accessToken){
      this.authServices.getAuthToken(this.param).then(
        res => {
          if(res){
            const newToken = new Auths;
            newToken.token = this.param.accessToken
            this.store.dispatch(new AuthAction.SaveToken(newToken.token));
          }          
        }
      )
    }    
  }

  async loginViaGoogle() {
    this.document.location.href = 'https://kassom-dev-api.azurewebsites.net/auth/login-google/web?deviceId=1';
  }

  findGetParameter(parameterName: any) {
    var result = null,
      tmp = [];
    location.hash
      .substr(1)
      .split("&")
      .forEach(function (item) {        
        let myString = item.substring(item.indexOf('=')+1)
        
        if(item.includes(parameterName)){
          result = myString;
        }
        // tmp = item.split("=");
        // if (item === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }
}