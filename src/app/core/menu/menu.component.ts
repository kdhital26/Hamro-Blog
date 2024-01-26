import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppService } from 'src/app/shared/service/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges, AfterViewInit {
  loggedInUserId: string = '';
  userName: string = ''
  showMenu = false;
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
    } else {
      let loggedInUserName = this.appService.getUserDetails()?.userName;
      this.userName = loggedInUserName ? loggedInUserName : '';
    }
   }

  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  getUser() {
    this.appService.getUserByLoggedInId(this.loggedInUserId).subscribe((res: any) => {
      const {body: { users }} = res;
      sessionStorage.setItem('loggedInUser', JSON.stringify(users));
      this.userName = users.userName;
    }, error => {
      console.log(error)
    })
  }

  navigateToContent(type: string) {
    this.cd.detectChanges();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([`/content`], {queryParams: {type: type}});
  }

}
