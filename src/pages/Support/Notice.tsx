import { ContentBox } from '../../components/common.componets/ContentBox/ContentBox';
import { NoticeMain } from '../../components/Support/Notice/NoticeMain/NoticeMain';
import { NoticeSearch } from '../../components/Support/Notice/NoticeSearch/NoticeSearch';

export const Notice = () => {
  return (
    <>
      <ContentBox>공지사항</ContentBox>
      <NoticeSearch></NoticeSearch>
      <NoticeMain></NoticeMain>
    </>
  );
};
