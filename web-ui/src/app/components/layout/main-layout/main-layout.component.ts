import { Component, OnInit } from '@angular/core';
import { CandidateInfo } from 'src/app/models/candidate';


const ELEMENT_DATA: CandidateInfo[] = [
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
  {names: 'Elif Günaçtı', submitDate: '11.10.2023', cvUrl: '', criteriaScore1: '9/10', criteriaScore2: '5/10', criteriaScore3: '5/10', criteriaScore4: '7/10'},
];


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{

  ngOnInit(): void {
    console.log();
  }

  columnTemplateList: any[] = [
    {columnName: 'Aday Ad Soyad', columnKey: 'names'},
    {columnName: 'Başvuru Tarihi', columnKey: 'submitDate'},
    {columnName: '(Kriter 1) Puanı', columnKey: 'criteriaScore1'},
    {columnName: '(Kriter 2) Puanı', columnKey: 'criteriaScore2'},
    {columnName: '(Kriter 3) Puanı', columnKey: 'criteriaScore3'},
    {columnName: '(Kriter 4) Puanı', columnKey: 'criteriaScore4'},
  ];
  displayedColumns: string[] = ['cv'].concat(this.columnTemplateList.map(elm => elm.columnKey));
  dataSource = ELEMENT_DATA;

  isFocus1 = false;
  isFocus2 = false;



  changeFocus(idx:number , isFocused:boolean){
    console.log(idx, isFocused);
    if (idx == 1) {
      this.isFocus1 = isFocused;
      this.isFocus2 = false;
    } else {
      this.isFocus2 = isFocused;
      this.isFocus1 = false;
    }
  }

}
