// import { useLocation } from 'react-router-dom';
import './styled.css';
import axios, { type AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { PageNavigation } from '../../../common.componets/PageNavigation/PageNavigation';
import type {
  INotice,
  INoticeResponse,
} from '../../../../model/Support/INotice';
import { NoticeContext } from '../../../../provider/NoticeProvider';

// interface INotice {
//   noticeID: number;
//   loginId: string;
//   noticeTitle: string;
//   regGata: string;
// }

// interface INoticeResponse {
//   count : number;
//   list : INotice[]
// }

export const NoticeMain = () => { // 다른 파일에서 NoticeMain을 호출할 때 무조건 있어야함.
  // const { search } = useLocation();
  const [noticeList, setNoticeList] = useState<INotice[]>([]); // useState에 INotice가 배열상태[]로 
  const [noticeCnt, setNoticeCnt] = useState<number>(0);
  const { searchData } = useContext(NoticeContext);

  useEffect(() => {
    searchList();
  }, [searchData]);

  // 공지사항 조회를 해주는 함수
  const searchList = (cPage?: number) => {
    cPage = cPage || 1;

    const searchPharam = new URLSearchParams(searchData);
    searchPharam.append('currentPage', cPage.toString());
    searchPharam.append('pageSize', '5');

    axios
      .post('/api/support/noticeListBody.do', searchPharam)
      .then((res: AxiosResponse<INoticeResponse>) => {
        setNoticeList(res.data.list);
        setNoticeCnt(res.data.count);
      });

    // axios를 통해서 받은 data를 담아야함.
    // 문제 1. axios로 서버를 갔다 와야해서 시간이 오래걸림
  };

  return (
    <div className="notice-main-container">
      <table className="notice-table">
        <thead className="notice-table-header">
          <tr>
            <th>공지번호</th>
            <th>공지 제목</th>
            <th>공지 날짜</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.length > 0 ? (
            noticeList.map((notice) => {
              return (
                <tr key={notice.noticeId} className="notice-table-row">
                  <td className="notice-cell">{notice.noticeId}</td>
                  <td className="notice-cell cursor-pointer text-blue-600 hover:text-blue-800">
                    {notice.noticeTitle}
                  </td>
                  <td className="notice-cell">{notice.regDate}</td>
                  <td className="notice-cell">{notice.loginId}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="notice-empty-row">
                등록된 공지사항이 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <PageNavigation
        totalItems={noticeCnt}
        itemsPerPage={5}
        onPageChange={searchList}
      />
    </div>
  );
};
