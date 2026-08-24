export default function MyPageLoading() {
  return (
    <main className="mypage-detail" id="main-content" aria-busy="true">
      <div className="ui-container">
        <div className="mypage-loading" role="status">
          <span className="ui-spinner" aria-hidden="true" />
          <p>데모 회원 내역을 불러오는 중입니다.</p>
        </div>
      </div>
    </main>
  );
}
