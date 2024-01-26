import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppService } from 'src/app/shared/service/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loggedInUserId: string = '';
  userName: string = ''
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private appService: AppService
  ) {
    let queryParams = location.search;
    let split = queryParams.split('loggedInUser=');
    if(split[1]){
      this.loggedInUserId = split[1]
      this.getUser();
    }
   }
  isMenuOpen = false;

 

  ngOnInit(): void {
    this.userName = this.appService.getUserDetails().userName;
  }

  getUser() {
    this.appService.getUserByLoggedInId(this.loggedInUserId).subscribe((res: any) => {
      const {body: { users }} = res;
      sessionStorage.setItem('loggedInUser', JSON.stringify(users));
    }, error => {
      console.log(error)
    })
  }

  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToContent(type: string) {
    this.cd.detectChanges();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([`/content`], {queryParams: {type: type}});
    this.router.navigate(['/content'], { queryParams: { type: type } });
  }
}
