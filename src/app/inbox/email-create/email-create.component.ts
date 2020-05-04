import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {

  email: Email;
  showModal = false;
  constructor(private authService: AuthService, private emailService: EmailService) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: authService.username + '@angular-email.com'
    };
  }

  ngOnInit() {
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe( () => {
      this.showModal = false;
    });
  }
}
