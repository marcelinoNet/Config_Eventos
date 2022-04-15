import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import {AppComponent} from '../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginValid = false;
  public username:any = null;
  public password:any = null;

  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _appComponent :AppComponent
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public ngOnInit(): void {
    
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public onSubmit(): void {
    if(this.username && this.password)
      this._router.navigateByUrl('/events');
  }
}