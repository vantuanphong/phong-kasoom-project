import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Auths } from 'src/models/auth.model';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import * as AuthAction from '../ngRx/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kasoom-project';
  auths:Observable<Auths>;
  token:any;
  constructor(
    private store:Store<{auths:Auths}>,
    private router: Router,
  ) {
    this.auths = store.pipe(select('auths'))
    this.auths.subscribe(res =>{
      this.token = res;
      console.log(this.token)

    })
  }

  async logout() {
    this.store.dispatch(new AuthAction.DeleteToken());
    this.router.navigate(['/']);
  }
}
