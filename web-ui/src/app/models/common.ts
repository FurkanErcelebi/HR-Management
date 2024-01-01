
export class SidePageInfo {
  title: string;
  url: string;
  isFocus: boolean = false;
}

export class SideRouteInfo {
  pageType: string;
  sidePageList: SidePageInfo[];
}

export class CommonResponse {
  result: string;
}
