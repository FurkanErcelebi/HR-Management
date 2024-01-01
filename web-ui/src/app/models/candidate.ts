
export class CandidateInfo {
  basvuran_id : number;
  adi : string;
  soyadi : string;
  email : string;
  telefon_numarasi : string;
  elts_puani : number;
  universite : string;
  not_ortalamasi : number;
  is_deneyimi : number;
  basvurulan_pozisyon : string;
  basvurulan_departman : string;
}

export class GetCandidateResponse {
  candidateList: CandidateInfo[];
}

