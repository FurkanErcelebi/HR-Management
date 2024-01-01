import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CandidateInfo } from 'src/app/models/candidate';
import { AddEmployeeInfo } from 'src/app/models/employee';
import { CandidateService } from 'src/app/modules/services/candidate.service';
import { EmployeeService } from 'src/app/modules/services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

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
