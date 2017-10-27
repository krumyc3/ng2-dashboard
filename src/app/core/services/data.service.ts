import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class DataService {

  url = environment.serverUrl;

  public projectChanged: EventEmitter<Object>;
  public categoryChanged: EventEmitter<Object>;

  constructor(private http: Http, private router: Router, private authService: AuthService) {
    this.projectChanged = new EventEmitter();
    this.categoryChanged = new EventEmitter();
  }

  onProjectChanged(data){
    localStorage.setItem('project', JSON.stringify(data));
    this.projectChanged.emit(data);
  }

  onCategoryChanged(){
    this.categoryChanged.emit(true);
  }

  getAdminUrl(){
    return environment.adminUrl;
  }
  getHeaders(): Headers {
    return this.authService.getHeaders();
  }

  isUserEmailExists(data)
  {
    return this.http.post(this.url + '/api/userexists', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getUser(data) {
    return this.http.post(this.url + '/api/user/get', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  /*
  ---------------- Project -----------------
  */

  getUserProject(){
    return this.http.post(this.url + '/api/user/project/list', {}, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getDueDiligenceType(){
    return this.http.post(this.url + '/api/duediligence', {}, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  submitProject(data){
    return this.http.post(this.url + '/api/user/project/submit', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getUserSubmittedProject(){
    return this.http.post(this.url + '/api/user/project/submit_list', {}, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  /*
  ---------------- Assessment -----------------
  */
  getAssessmentList(projectID = null){
    let data = {projectID: projectID};
    return this.http.post(this.url + '/api/assessment/list', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getAssessmentListFlat(projectID = null){
    let data = {projectID: projectID};
    return this.http.post(this.url + '/api/assessment/list_flat', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getAssessment(data){
    return this.http.post(this.url + '/api/assessment/get', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getAssessmentFlat(data){
    return this.http.post(this.url + '/api/assessment/get_flat', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }


  getAssignment(data){
    return this.http.post(this.url + '/api/assessment/assignment/get', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  saveAssignment(data){
    return this.http.post(this.url + '/api/assessment/assignment/save', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getUserAssignment(data){
    return this.http.post(this.url + '/api/assessment/assignment/get_user', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getUUID()
  {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  /*
  ---------------- Data -----------------
  */
  getCountryList(){
    return this.http.post(this.url + '/api/data/country', {}, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getStateList(data){
    return this.http.post(this.url + '/api/data/state', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getCityList(data){
    return this.http.post(this.url + '/api/data/city', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  /*
  ---------------- QA -----------------
  */

  getQAList(){
    return this.http.post(this.url + '/api/questionnaire/list', {}, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getQA(data){
    return this.http.post(this.url + '/api/questionnaire/get', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  saveQA(data){
    return this.http.post(this.url + '/api/admin/questionnaire/save', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  /*
  ---------------- Answer -----------------
  */

  getAnswers(data){
    return this.http.post(this.url + '/api/user/answer/get', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getAnswerList(data){
    return this.http.post(this.url + '/api/user/answer/list', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getUserAnswerList(data){
    return this.http.post(this.url + '/api/user/answer/userlist', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  saveAnswers(data){
    return this.http.post(this.url + '/api/user/answer/save', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  toggleNA(data){
    return this.http.post(this.url + '/api/user/answer/toggle-na', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  /*
  ---------------- Team -----------------
  */

  getTeam(data){
    return this.http.post(this.url + '/api/user/team/get', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getTeamMembers(data){
    return this.http.post(this.url + '/api/user/team/members', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  /*
  ---------------- Attachment -----------------
  */

  getAttachment(data){
    return this.http.post(this.url + '/api/user/attachment/list', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getUserAttachment(data){
    return this.http.post(this.url + '/api/user/attachment/user', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  saveAttachment(sourceType, data){
    let headers = new Headers();
    headers.set('Accept', 'application/json');
  	headers.append('x-chaos-token', JSON.parse(localStorage.getItem('token')));
    let api_url = '/api/user/attachment/save';
    if(sourceType != 'Computer')
      api_url = '/api/user/attachment/save_link';
    return this.http.post(this.url + api_url, data, { headers: headers })
      .map((response: Response) => response.json());
  }

  /**************** ADMIN *********************/
  /*
  ---------------- Admin Assessment -----------------
  */

  getAdminAssessmentList(){
    return this.http.post(this.url + '/api/admin/assessment/list', {}, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getAdminAssessmentListFlat(){
    return this.http.post(this.url + '/api/admin/assessment/list_flat', {}, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getAdminAssessment(data){
    return this.http.post(this.url + '/api/admin/assessment/get', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  getAdminAssessmentFlat(data){
    return this.http.post(this.url + '/api/admin/assessment/get_flat', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  saveAsssessment(data){
    return this.http.post(this.url + '/api/admin/assessment/save', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  /*
  ---------------- Admin Project -----------------
  */

  getSubmittedProject(){
    return this.http.post(this.url + '/api/admin/project/submit_list', {}, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  updateProjectFeedback(data){
    return this.http.post(this.url + '/api/admin/project/update_feedback', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }

  updateProjectStatus(data){
    return this.http.post(this.url + '/api/admin/project/update_status', data, { headers: this.getHeaders() })
      .map((response: Response) => response.json());
  }
}
