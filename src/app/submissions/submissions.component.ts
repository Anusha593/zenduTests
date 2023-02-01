/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, Injectable, OnInit } from '@angular/core';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { faCalendarDays, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '../http.service';


/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}




@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss'],

})
export class SubmissionsComponent implements OnInit {
  model1: string;
  model2: Date;
  faExport = faFileExport
  workFlowData: any;
  display: any;
  faCalendarDays = faCalendarDays;
  marker1 = { position: { lat: 20.2736308, lng: 70.7512555 } };
  marker2 = { position: { lat: 23.2736308, lng: 70.7512555 } };
  marker3 = { position: { lat: 22.2736308, lng: 70.7512555 } };

  markers = [this.marker1, this.marker2, this.marker3];

  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
  };
  zoom = 6;
  mapClicked: boolean;
  listClicked: boolean;
  submissionData: any;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private httpService: HttpService) {
    this.mapClicked = true;
    this.listClicked = false;

    this.model2 = new Date();
    const yyyy = this.model2.getFullYear();
    const mm = this.model2.getMonth() + 1; // Months start at 0!
    const dd = this.model2.getDate();


    const formattedToday = dd + '/' + mm + '/' + yyyy;
    this.model1 = formattedToday.toString();

    console.log('date', formattedToday)
  }
  ngOnInit() {
    this.getWorkflowDetails();
    this.getSubmissionDetails();
  }

  getWorkflowDetails() {
    this.httpService.getWorkflowDetails().subscribe(data => {
      this.workFlowData = data;
      console.log('workflow data', this.workFlowData)
    })
  }
  getClass(status: string) {
    if (status === 'Unassigned' || status === 'Needs Review') {
      return 'unassigned';
    } else if (status === 'Low Risk') {
      return 'lowrisk';
    } else if (status === 'Uncomplete') {
      return 'uncomplete';
    } else {
      return '';
    }
  }
  /*Map code*/
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  getColor(text: string) {
    if (text === 'map') {
      this.mapClicked = true;
      this.listClicked = false;
      return 'map';
    } else if (text === 'list') {
      this.listClicked = true;
      this.mapClicked = false;
      return 'list';
    } else {
      return 'map';
    }

  }
  getSubmissionDetails() {
    this.httpService.getSubmissionsdata().subscribe(data => {
      this.submissionData = data;
      console.log('submission data', this.submissionData)
    })
  }
}