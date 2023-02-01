import { Component } from '@angular/core';
import { faClockRotateLeft, faUserGroup,faChartColumn, faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  count=0;
    faUserGroup=faUserGroup;
  faClockRotateLeft=faClockRotateLeft;
  faChartColumn=faChartColumn
faBars=faBars;



}
