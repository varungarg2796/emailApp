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

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false); // $ sign to denote it is observable

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
      tap( () => {
        this.signedin$.next(true);
      })
    );
  }

  checkSignedIn() {
    return this.http.get(this.rootUrl + '/auth/signedin').pipe(
      tap( response => {
        console.log(response);
      })
    );
  }
}
