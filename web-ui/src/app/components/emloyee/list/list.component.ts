import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AbsenteeismInfo, BriefAbsenteeismInfo, EmployeeInfo, TaskInfo } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/modules/services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @ViewChildren('innerTables') innerTables: QueryList<MatTable<any>>;

  columnTemplateList: any[] = [
    {columnName: 'Ad', columnKey: 'adi'},
    {columnName: 'Soyad', columnKey: 'soyadi'},
    {columnName: 'Email', columnKey: 'email'},
    {columnName: 'Devamsızlık', columnKey: 'absenteeism'},
    {columnName: 'Görevler', columnKey: 'tasks'},
    {columnName: 'Pozisyon', columnKey: 'pozisyon'},
    {columnName: 'Departman', columnKey: 'departman'},
    {columnName: 'İse Baslama Tarihi', columnKey:'ise_baslama_tarihi'},
    {columnName: 'Maas', columnKey:'maas'},
    {columnName: 'Performans Puanı', columnKey:'performans_puanı'},
    {columnName: 'Telefon No', columnKey: 'telefon_numarası'},
  ];
  displayedColumns: string[] = this.columnTemplateList.map(elm => elm.columnKey);
  candidateSelection = new SelectionModel<EmployeeInfo>(true, []);
  dataSource: MatTableDataSource<any>;

  subColumnTemplateList: any[] = []
  subDataSource: MatTableDataSource<any>;
  subDisplayedColumns: string[];
  taskList: TaskInfo[];
  employeeList: EmployeeInfo[];
  absenteeismList: AbsenteeismInfo[];
  userAbsenteeismList: BriefAbsenteeismInfo[];

  isSelectActivate = false;
  onlyLowPerformanceEmployees = false;
  isProgress = false;

  constructor(private employeeService: EmployeeService,
              private datePipe: DatePipe,){}

  ngOnInit(): void {
    this.setDataSource();
  }

  setDataSource(){
    this.subDataSource = new MatTableDataSource([{}]);
    this.employeeService.getEmployees().subscribe((response) => {
      this.employeeList = response.employeeList;
      this.dataSource = new MatTableDataSource(this.employeeList);
    });
    this.employeeService.getTaskInfos().subscribe((response) => {
      this.taskList = response.taskList;
    });
    this.employeeService.getAbsenteeismInfos().subscribe((response) => {
      this.absenteeismList = response.absenteeismList;
    });
  }

  selectEmployee(){
    if (this.displayedColumns.includes('select')) {
      this.displayedColumns = this.displayedColumns.filter((displayedColumn) => displayedColumn !== 'select');
    }
    else {
      this.displayedColumns.splice(0, 0, 'select');
    }
    this.isSelectActivate = !this.isSelectActivate;
  }

  setLeftPosition(value: number, changeValue:number = 0):string{
    return `${this.isSelectActivate ? (value + changeValue) : value}px`;
  }

  isNotSpecialColumn(columnName:string):boolean{
    return !['tasks', 'absenteeism'].includes(columnName);
  }

  selectSpecialColumn(columnName:string , id:string){
    if (columnName === 'tasks') {
      this.subColumnTemplateList = [
        {columnName: 'Görevler', columnKey:'gorev_tanimi', isCheckbox: false, displayValue: true},
        {columnName: 'Son Tarih', columnKey: 'bitis_tarihi', isCheckbox: false, displayValue: true},
      ];
      this.subDisplayedColumns = this.subColumnTemplateList.map(elm => elm.columnKey);
      this.subDataSource = new MatTableDataSource(this.taskList
                                                      .filter((task) => task.atanan_calisan_id === id)
                                                      .map((task) => {
                                                        task.bitis_tarihi = this.getOnlyDates(task.bitis_tarihi);
                                                        return task;
                                                      }));
    }
    if (columnName === 'absenteeism') {
      this.userAbsenteeismList = [];
      let startDate = this.employeeList.find((employee) => employee.calisanlar_id == id)?.ise_baslama_tarihi;
      if (startDate) {
        this.getDatesInRange(
                new Date(this.getOnlyDates(startDate)),
                new Date()).forEach((dateValue) => {
                  this.userAbsenteeismList.push({
                    dateValue: dateValue,
                    state : this.absenteeismList.find((absenteeism) => absenteeism.calisan_id === id
                                                                        && absenteeism.devasilik_tarihi.startsWith(dateValue)) ? true : false
                  });
                });
        let numberOfAbsent = this.absenteeismList.filter((absenteeism) => absenteeism.calisan_id === id).length;
        this.userAbsenteeismList.splice(0, 0, {
          dateValue: 'Toplam',
          absent: numberOfAbsent,
          nonabsent: this.userAbsenteeismList.length - numberOfAbsent,
          state: false
        });
      }
      this.subColumnTemplateList = [
        {columnName: 'Tarih', columnKey:'dateValue' , isCheckbox: false, displayValue: true},
        {columnName: 'Devam Durumu', columnKey: 'state' , isCheckbox: true, displayValue: false},
      ];
      this.subDisplayedColumns = this.subColumnTemplateList.map(elm => elm.columnKey);
      this.subDataSource = new MatTableDataSource(this.userAbsenteeismList);
    }
    // console.log(this.subDataSource.data);
  }

  getOnlyDates(dateTimeStr: string):string{
    return dateTimeStr.split('T')[0]
  }

  // from https://bobbyhadz.com/blog/javascript-get-all-dates-between-two-dates
  getDatesInRange(startDate: Date, endDate: Date) {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(this.datePipe.transform(new Date(date), 'yyyy-MM-dd') || '2000-01-01');
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  showOnlyUnderPerformanceEmployees(){
    if (this.onlyLowPerformanceEmployees) {
      this.onlyLowPerformanceEmployees = false;
      this.dataSource = new MatTableDataSource(this.employeeList);
    }
    else {
      this.employeeService.triggerUpdatedPerformance().subscribe(() => {
        this.isProgress = true;
        setTimeout(() => {
          this.onlyLowPerformanceEmployees = true;
          this.isProgress = false;
          this.employeeService.getScoreThreshold().subscribe((response) => {
            const threshold:number = response.threshold;
            this.employeeService.getEmployees().subscribe((innerResponse) => {
              this.employeeList = innerResponse.employeeList;
              let lowPerformanceEmployeeList:EmployeeInfo[] =
                this.employeeList
                .filter((employee) => parseFloat(employee.performans_puanı).toFixed(2) < threshold.toFixed(2));
              this.dataSource = new MatTableDataSource(lowPerformanceEmployeeList);
            })
          });
        }, 1000 * this.employeeList.length);
      });
    }
  }

  removeEmployee(){
    // let employeeList:AddEmployeeInfo[] = [];
    // this.candidateSelection.selected.forEach((candidateInfo) => {
    //   employeeList.push({
    //     candidateId: candidateInfo.basvuran_id,
    //     name: candidateInfo.adi,
    //     surname: candidateInfo.soyadi,
    //     email: candidateInfo.email,
    //     phoneNumber: candidateInfo.telefon_numarasi,
    //     department: candidateInfo.basvurulan_departman,
    //     position: candidateInfo.basvurulan_pozisyon,
    //     performanceScore: candidateInfo.not_ortalamasi,
    //     attendanceDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '2000-01-01'
    //   });
    // });
    // this.employeeService.addNewEmployees({
    //   employeeInfoList: employeeList
    // }).subscribe(() => {
    //   this.candidateSelection.clear();
    //   this.setDataSource();
    // });
    // this.selectCandidate();
  }



}
