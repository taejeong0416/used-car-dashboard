import KpiCard from "@/components/KpiCard";
import { computeDashboard, getCars } from "@/lib/cars";

export default async function DashboardPage() {
  const cars = await getCars();
  const d = computeDashboard(cars);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="text-2xl font-semibold tracking-tight">Dashboard</div>
        <div className="mt-2 text-sm text-gray-600">데이터를 집계한 지표를 표시합니다.</div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard title="전체 매물 수" value={d.n.toLocaleString()} />
        <KpiCard title="평균 가격" value={d.avgPriceText} />
        <KpiCard title="평균 주행거리" value={d.avgMileageText} />
        <KpiCard title="연료 타입 수" value={d.fuelMix.length.toLocaleString()} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold">브랜드 Top 5</div>
          <ul className="mt-3 space-y-2 text-sm">
            {d.topBrands.map(([k, v]) => (
              <li key={k} className="flex items-center justify-between">
                <span className="text-gray-700">{k}</span>
                <span className="font-medium">{v.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold">연식 구간 분포</div>
          <ul className="mt-3 space-y-2 text-sm">
            {d.yearBins.map((b) => (
              <li key={b.label} className="flex items-center justify-between">
                <span className="text-gray-700">{b.label}</span>
                <span className="font-medium">{b.count.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
