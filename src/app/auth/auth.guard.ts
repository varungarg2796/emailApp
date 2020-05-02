import { Injectable } from '@angular/core';
import {  Route, UrlSegment, CanLoad, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from './auth.service';
import { take, skipWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad  {

  constructor( private authService: AuthService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    // return false; // false for not allowing, true for allowing

    return this.authService.signedin$.pipe(
      skipWhile( value => value === null), // I don't care about values which is null
      take(1), // taking one value which satisfies skipWhile i.e value which is not null
      tap( (isSignedIn) => {
        if (!isSignedIn) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}

