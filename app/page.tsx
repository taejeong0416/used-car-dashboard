import SearchClient from "@/components/SearchClient";
import { getCars } from "@/lib/cars";

export default async function HomePage() {
  const cars = await getCars();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="text-2xl font-semibold tracking-tight">중고차 검색</div>
        <div className="mt-2 text-sm text-gray-600">검색 결과를 클릭하면 상세 페이지로 이동합니다.</div>
      </div>

      <SearchClient cars={cars} />
    </div>
  );
}
