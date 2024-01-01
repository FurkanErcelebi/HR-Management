
export class EmployeeInfo {
  calisanlar_id: string;
  adi : string;
  soyadi : string;
  email : string;
  telefon_numarası : string;
  pozisyon : string;
  departman : string;
  ise_baslama_tarihi: string;
  maas: number;
  performans_puanı: string;
}

export class AddEmployeeInfo {
  candidateId?: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  department: string;
  position: string;
  attendanceDate: string;
  performanceScore: number;
}

export class AddEmployeeRequest {
  employeeInfoList: AddEmployeeInfo[];
}

export class GetEmployeeResponse {
  employeeList: EmployeeInfo[];
}

export class TaskInfo {
  gorev_id: string;
  gorev_tanimi: string;
  atanan_calisan_id: string;
  baslangic_tarihi: string;
  bitis_tarihi: string;
  gorev_durumu: string;
}

export class GetTasksResponse {
  taskList: TaskInfo[];
}

export class AbsenteeismInfo {
  devamsizlık_id: string;
  calisan_id: string;
  devasilik_tarihi: string;
  devamsizlik_nedeni: string;
}

export class GetAbsenteeismResponse {
  absenteeismList: AbsenteeismInfo[];
}

export class BriefAbsenteeismInfo {
  dateValue: string;
  state?: boolean;
  absent?: number;
  nonabsent?: number;
}

export class GetThresholdResponse {
  threshold: number;
}

