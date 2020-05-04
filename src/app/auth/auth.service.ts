import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
interface UserNameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SigninResponse {
  username: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null); // $ sign to denote it is observable
  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable( username: string) {
    return this.http.post<UserNameAvailableResponse>(this.rootUrl + '/auth/username', {
      username,
   });
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignUpResponse>(this.rootUrl + '/auth/signup',
      credentials
    ).pipe(
      tap( ({username}) => {
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }

  signout() {
    return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  checkSignedIn() {
    return this.http.get<SignedInResponse>(this.rootUrl + '/auth/signedin').pipe(
      tap( ({authenticated, username}) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    );
  }

  signin(credentials: SignInCredentials) {
    return this.http.post<SigninResponse>(this.rootUrl + '/auth/signin', credentials)
    .pipe(
      tap( ({username}) => { // if we have any error returned from the service, it will skip tap
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }
}
