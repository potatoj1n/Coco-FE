import { AttendanceDiv, EditUserInfo, MainPageWrapper, Span, UserInput } from './MypageStyles';

const MyPage = () => {
  return (
    <MainPageWrapper>
      <span className="text-2xl font-semibold mt-7">My Page</span>
      <AttendanceDiv className="mt-5">
        <span className="text-xl font-semibold">어서오세요 은진님</span>
      </AttendanceDiv>
      <EditUserInfo>
        <Span>회원정보</Span>
        <UserInput></UserInput>
      </EditUserInfo>
    </MainPageWrapper>
  );
};

export default MyPage;
