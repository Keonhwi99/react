import './styled.css';

export const NoticeMain = () => {
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
          <tr>
            <td colSpan={4} className="notice-empty-row">
              등록된 공지사항이 없습니다
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
