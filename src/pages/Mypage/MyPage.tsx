import { AttendanceDiv, UserInfo, MainPageWrapper, UserInput, EditUser } from './MypageStyles';

const MyPage = () => {
  return (
    <MainPageWrapper>
      <span className="text-2xl font-semibold mt-7">My Page</span>
      <AttendanceDiv className="mt-5">
        <span className="text-xl font-semibold">어서오세요 은진님</span>
      </AttendanceDiv>
      <UserInfo>
        <span className="text-lg">회원정보</span>
        <EditUser>
          <UserInput></UserInput>
          <UserInput></UserInput>
          <UserInput></UserInput>
        </EditUser>
      </UserInfo>
    </MainPageWrapper>
  );
};

export default MyPage;
