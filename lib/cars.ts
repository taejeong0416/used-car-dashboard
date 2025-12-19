export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
};

export async function getCars(): Promise<Car[]> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${base}/api/cars`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load cars");
  return (await res.json()) as Car[];
}

export function computeDashboard(cars: Car[]) {
  const n = cars.length;

  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const fmtInt = (x: number) => Math.round(x).toLocaleString();

  const avgPrice = avg(cars.map((c) => c.price));
  const avgMileage = avg(cars.map((c) => c.mileage));

  const by = <K extends string>(keyFn: (c: Car) => K) => {
    const m = new Map<K, number>();
    for (const c of cars) m.set(keyFn(c), (m.get(keyFn(c)) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  };

  const topBrands = by((c) => c.brand).slice(0, 5);
  const fuelMix = by((c) => c.fuelType);

  const yearBins = [
    { label: "2014-", test: (y: number) => y <= 2014 },
    { label: "2015-2017", test: (y: number) => y >= 2015 && y <= 2017 },
    { label: "2018-2020", test: (y: number) => y >= 2018 && y <= 2020 },
    { label: "2021+", test: (y: number) => y >= 2021 },
  ].map((b) => ({
    label: b.label,
    count: cars.filter((c) => b.test(c.year)).length,
  }));

  return {
    n,
    avgPriceText: fmtInt(avgPrice),
    avgMileageText: fmtInt(avgMileage),
    topBrands,
    fuelMix,
    yearBins,
  };
}
