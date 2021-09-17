import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Auths } from 'src/models/auth.model';
import { AuthServices } from 'src/services/auth.services';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit {

  auths:Observable<Auths>;
  constructor(private store: Store<{ auths: Auths }>, 
    private authServices: AuthServices, ) {
    this.auths = store.pipe(select('auths'))
  }
  displayedColumns: string[] = ['subjectGuid', 'subjectName'];
  dataSource = []
  checkCancel: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

 async getData(){
   let res = await this.authServices.getSubjec();
   console.log(res);
   this.dataSource = res;
   this.checkCancel = true
  }

}
