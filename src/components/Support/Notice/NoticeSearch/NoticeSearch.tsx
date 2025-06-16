import { useContext, useEffect, useRef, useState } from 'react';
import './styeld.css';
import { useNavigate } from 'react-router-dom';
import { NoticeContext } from '../../../../provider/NoticeProvider';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';

export const NoticeSearch = () => {
  const [_, setModal] = useRecoilState(modalState);
  const title = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  //startDate, endDate, title을 url에 navigate를 이용해서 올릴것임
  // const navigate = useNavigate();
  const { setSearchData } = useContext(NoticeContext);

  // useEffect(() => {
  //   window.location.search &&
  //     navigate(window.location.pathname, { replace: true });
  // }, [navigate]);

  const handlerSerch = () => {
    setSearchData({
      title: title.current ? title.current.value : '',
      startDate: startDate || '',
      endDate: endDate || '',
    });
    // console.log(startDate, endDate, title?.current?.value);
    // title?.current?.value 이거는 밑의 if문과 같은 내용
    // if(title){
    //   if(title.current){
    //     console.log(title.current.value)
    //   }
    // }
    const query: string[] = [];
    !title?.current?.value || query.push(`title=${title.current.value}`);
    !startDate || query.push(`startDate=${startDate}`);
    !endDate || query.push(`endDate=${endDate}`);

    const queryString = query.length > 0 ? `?${query.join('&')}` : '';
    navigate(queryString);
  };

  const openModal = () => {
    setModal({ isOpen: true });
  };

  return (
    <div className="notice-container">
      <div className="input-box">
        제목: <input ref={title}></input>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        <input type="date" onChange={(e) => setEndDate(e.target.value)}></input>
        <button onClick={handlerSerch}>검색</button>
        <button onClick={openModal}>등록</button>
      </div>
    </div>
  );
};
