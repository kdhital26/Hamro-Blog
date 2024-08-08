import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/model/user.model';
import { LoginService, } from '../shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRightPanelActive = false;
  user = new User();
  constructor(
    private userService: LoginService,
    private router: Router
  ) { }

  togglePanel() {
    this.isRightPanelActive = !this.isRightPanelActive;
  }

  login() {
    this.userService.login(this.user)
    .subscribe ((result: any) => {
      if(result) {
        const { body: {user} } = result;
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        this.userService.loggedInUser$.next(user);
        this.router.navigateByUrl('/home');
      }
    }, error => {
      console.log(error, 'error here')
    })
    
  }
}
