import { Component, OnInit } from '@angular/core';
import { CandidateInfo } from 'src/app/models/candidate';
import { CandidateService } from '../../../modules/services/candidate.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AddEmployeeInfo, EmployeeInfo } from 'src/app/models/employee';
import { EmployeeService } from '../../../modules/services/employee.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{

  columnTemplateList: any[] = [
    {columnName: 'Ad', columnKey: 'adi'},
    {columnName: 'Soyad', columnKey: 'soyadi'},
    {columnName: 'Email', columnKey: 'email'},
    {columnName: 'Telefon No', columnKey: 'telefon_numarasi'},
    {columnName: 'ELTS Puanı', columnKey: 'elts_puani'},
    {columnName: 'Universite', columnKey: 'universite'},
    {columnName: 'Not Ortalamasi', columnKey: 'not_ortalamasi'},
    {columnName: 'Deneyim Yılı', columnKey: 'is_deneyimi'},
    {columnName: 'Basvurulan Pozisyon', columnKey: 'basvurulan_pozisyon'},
    {columnName: 'Basvurulan Departman', columnKey: 'basvurulan_departman'},
  ];
  displayedColumns: string[] = this.columnTemplateList.map(elm => elm.columnKey);
  candidateSelection = new SelectionModel<CandidateInfo>(true, []);
  dataSource: any;

  isFocus1 = false;
  isFocus2 = false;
  isSelectCandidate = false;

  constructor(private candidateService: CandidateService,
              private employeeService: EmployeeService,
              private datePipe: DatePipe){}

  ngOnInit(): void {
    this.setDataSource();
  }

  setDataSource(){
    this.candidateService.getCandidates().subscribe((response) => {
      this.dataSource = response.candidateList;
    });
  }

  changeFocus(idx:number , isFocused:boolean){
    if (idx == 1) {
      this.isFocus1 = isFocused;
      this.isFocus2 = false;
    } else {
      this.isFocus2 = isFocused;
      this.isFocus1 = false;
    }
  }

  selectCandidate(){
    if (this.displayedColumns.includes('select')) {
      this.displayedColumns = this.displayedColumns.filter((displayedColumn) => displayedColumn !== 'select');
    }
    else {
      this.displayedColumns.splice(0, 0, 'select');
    }
    this.isSelectCandidate = !this.isSelectCandidate;
  }

  approveCandidate(){
    let employeeList:AddEmployeeInfo[] = [];
    this.candidateSelection.selected.forEach((candidateInfo) => {
      employeeList.push({
        candidateId: candidateInfo.basvuran_id,
        name: candidateInfo.adi,
        surname: candidateInfo.soyadi,
        email: candidateInfo.email,
        phoneNumber: candidateInfo.telefon_numarasi,
        department: candidateInfo.basvurulan_departman,
        position: candidateInfo.basvurulan_pozisyon,
        performanceScore: candidateInfo.not_ortalamasi,
        attendanceDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '2000-01-01'
      });
    });
    this.employeeService.addNewEmployees({
      employeeInfoList: employeeList
    }).subscribe(() => {
      this.candidateSelection.clear();
      this.setDataSource();
    });
    this.selectCandidate();
  }

  rejectCandidate(){
    this.selectCandidate();
  }

}
