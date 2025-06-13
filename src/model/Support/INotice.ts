export interface INotice {
  noticeId: number;
  loginId: string;
  noticeTitle: string;
  regDate: string;
}

export interface INoticeResponse {
  count: number;
  list: INotice[];
}
