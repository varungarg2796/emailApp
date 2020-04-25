import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment, UrlTree, CanLoad, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from './auth.service';
import { take, skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad  {

  constructor( private authService: AuthService) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    // return false; // false for not allowing, true for allowing

    return this.authService.signedin$.pipe(
      skipWhile( value => value === null), // I don't care about values which is null
      take(1) // taking one value which satisfies skipWhile
    );
  }
}

