import { Component, OnInit, } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signedin$: BehaviorSubject<boolean>;
  constructor(private authService: AuthService, private router: Router) {
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    this.authService.checkSignedIn().subscribe(({ authenticated }) => {
      if (authenticated) {
        this.router.navigateByUrl('/inbox');
      }
    });
  }
}
