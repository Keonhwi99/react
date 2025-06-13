import { createContext, useState, type FC } from 'react';

interface INoticeContext {
  searchData: { 
    title: string;
    startDate: string;
    endDate: string;
  };
  setSearchData: (params: Partial<INoticeContext['searchData']>) => void;
}

const defaultValue: INoticeContext = {
  searchData: {
    title: '',
    startDate: '',
    endDate: '',
  },
  setSearchData: () => {},
};
// 새로운 context 만들기
export const NoticeContext = createContext(defaultValue);

//provider를 통해서 context에 data를 넣어주고, 다른 component에서 사용할 수 있게 합니다.
export const NoticeProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [searchData, setSearchData] = useState(defaultValue.searchData);

  const updateSearchData = (params: Partial<INoticeContext['searchData']>) => {
    setSearchData((prev) => ({ ...prev, params }));
  };
  // provider를 통해서 NoticeContext를 넘겨준다.
  return (
    <NoticeContext.Provider
      value={{ searchData: searchData, setSearchData: updateSearchData }}
    >
      {children}
    </NoticeContext.Provider>
  );
};
