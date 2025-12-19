export default function AboutPage() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="text-2xl font-semibold tracking-tight">About</div>
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <p>CSV 기반 중고차 데이터 대시보드 과제용 페이지입니다.</p>
        <p>Home: 검색 후 상세 이동</p>
        <p>Dashboard: 집계 지표 및 분포</p>
        <p>Detail: 개별 차량 상세</p>
      </div>
    </div>
  );
}
