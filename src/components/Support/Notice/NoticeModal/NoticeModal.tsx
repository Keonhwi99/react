import { useRecoilState } from 'recoil';
import './styled.css';
import { modalState } from '../../../../stores/modalState';
import { useEffect, useRef, useState, type FC } from 'react';
import axios, { type AxiosResponse } from 'axios';
import type { INoticeDetail } from '../../../../model/Support/INotice';

interface INoticeProps {
  // postSuccess: () => void;
  id: number;
  // setId: React.Dispatch<React.SetStateAction<number>>;
  reSearch?: () => void;
}

interface IPostResponse {
  result: 'success' | 'fail';
}

export const NoticeModal: FC<INoticeProps> = ({ id, reSearch }) => {
  const [_, setModal] = useRecoilState(modalState);
  const formRef = useRef<HTMLFormElement>(null);
  const [detail, setDetail] = useState<INoticeDetail>();

  useEffect(() => {
    id && detailNotice();

    // return () => {
    //   // readonly 는 수정될 수 없는 값. 그래서 0으로 지정해줌.
    //   setId(0);
    // };
  }, []);

  const saveNotice = () => {
    axios
      .post('/api/support/noticeSave.do', formRef.current)
      .then((res: AxiosResponse<IPostResponse>) => {
        if (res.data.result === 'success') {
          alert('저장되었습니다.');
          setModal({ isOpen: false });
          reSearch?.();
        }
      });
  };

  const detailNotice = () => {
    const param = new URLSearchParams();

    param.append('noticeId', id?.toString());

    axios
      .post('/api/support/noticeDetail.do', param)
      .then((res: AxiosResponse<{ detailValue: INoticeDetail }>) => {
        setDetail(res.data.detailValue);
      });
  };

  const updateDetail = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    formData.append('noticeId', id.toString());

    axios
      .post('/api/support/noticeUpdate.do', formData)
      .then((res: AxiosResponse<IPostResponse>) => {
        if (res.data.result === 'success') {
          alert('수정되었습니다.');
          setModal({ isOpen: false });
        }
      });
  };

  const deletDetail = () => {
    const param = new URLSearchParams({ noticeId: id.toString() });

    axios
      .post('/api/support/noticeDelet.do', param)
      .then((res: AxiosResponse<IPostResponse>) => {
        if (res.data.result === 'success') {
          alert('삭제되었습니다.');
          setModal({ isOpen: false });
        }
      });
  };

  return (
    <div className="modal-overlay">
      <form ref={formRef} className="modal-form modal-container">
        <label>
          제목 :
          <input type="text" name="title" defaultValue={detail?.noticeTitle} />
        </label>
        <label>
          내용 :
          <input
            type="text"
            name="content"
            defaultValue={detail?.NoticeContent}
          />
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
          <button type="button" onClick={!id ? saveNotice : updateDetail}>
            {!id ? '저장' : '수정'}
          </button>
          {!!id && (
            <button type="button" onClick={deletDetail}>
              삭제
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setModal({ isOpen: false });
            }}
          >
            나가기
          </button>
        </div>
      </form>
    </div>
  );
};
