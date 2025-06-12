import './styeld.css';

export const NoticeSearch = () => {
  return (
    <div className="notice-container">
      <div className="input-box">
        제목: <input></input>
        <input type="date"></input>
        <input type="date"></input>
        <button>검색</button>
        <button>등록</button>
      </div>
    </div>
  );
};
