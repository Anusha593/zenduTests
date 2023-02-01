import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  getWorkflowDetails(){
    return this.http.get('assets/json/workflow.json')
  }
  getSubmissionsdata(){
    return this.http.get('assets/json/submissionData.json')
  }
}
