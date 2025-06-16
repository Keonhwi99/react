// import { NoticeContext } from './../../provider/NoticeProvider';
export interface INotice {
  noticeId: number;
  loginId: string;
  noticeTitle: string;
  regDate: string;
}

export interface INoticeDetail extends INotice {
  NoticeContent: string;
}

export interface INoticeResponse {
  count: number;
  list: INotice[];
}
