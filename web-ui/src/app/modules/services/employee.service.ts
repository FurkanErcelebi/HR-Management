import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommonResponse } from 'src/app/models/common';
import { AddEmployeeRequest, EmployeeInfo, GetAbsenteeismResponse, GetEmployeeResponse, GetTasksResponse, GetThresholdResponse } from 'src/app/models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }

  addNewEmployees(request: AddEmployeeRequest):Observable<CommonResponse>{
    return this.httpClient.post(`${environment.API_URL}/employee/add-batch`, request)
                          .pipe(map((res: any) => res));
  }

  getEmployees():Observable<GetEmployeeResponse>{
    return this.httpClient.get(`${environment.API_URL}/employee/get`)
                          .pipe(map((res: any) => res));
  }

  getTaskInfos():Observable<GetTasksResponse>{
    return this.httpClient.get(`${environment.API_URL}/tasks/get`)
                          .pipe(map((res: any) => res));
  }

  getAbsenteeismInfos():Observable<GetAbsenteeismResponse>{
    return this.httpClient.get(`${environment.API_URL}/absenteeism/get`)
                          .pipe(map((res: any) => res));
  }

  getScoreThreshold():Observable<GetThresholdResponse>{
    return this.httpClient.get(`${environment.API_URL}/score-threshold`)
                          .pipe(map((res: any) => res));
  }

  triggerUpdatedPerformance():Observable<CommonResponse>{
    return this.httpClient.post(`${environment.API_URL}/trigger-performance-calculation`, {})
                          .pipe(map((res: any) => res));
  }

}
