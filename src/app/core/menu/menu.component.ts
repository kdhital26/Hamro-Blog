import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  navigateToContent(type: string) {
    this.cd.detectChanges();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([`/content`], {queryParams: {type: type}});
  }

}
