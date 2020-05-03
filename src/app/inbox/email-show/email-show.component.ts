import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  email: Email;

  ngOnInit() {
  }

}
