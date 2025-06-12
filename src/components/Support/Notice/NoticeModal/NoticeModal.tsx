import './styled.css';

export const NoticeModal = () => {
  return (
    <div className="modal-overlay">
      <form className="modal-form modal-container">
        <label>
          제목 :<input type="text" name="fileTitle" />
        </label>
        <label>
          내용 :<input type="text" name="fileContent" />
        </label>
        파일 :
        <input type="file" id="fileInput" />
        <label className="img-label" htmlFor="fileInput">
          파일 첨부하기
        </label>
        <div>
          <div>
            <label>미리보기</label>
            <img className="preview-image" />
          </div>
        </div>
        <div className="button-container">
          <button type="button">저장</button>
          <button type="button">나가기</button>
        </div>
      </form>
    </div>
  );
};
