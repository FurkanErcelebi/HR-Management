import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {environment} from '../../../environments/environment';
import { GetCandidateResponse } from 'src/app/models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient:HttpClient) { }

  getCandidates():Observable<GetCandidateResponse>{
    return this.httpClient.get(`${environment.API_URL}/candidate/get`).pipe(map((res: any) => res));
  }

}
