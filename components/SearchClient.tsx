"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Car } from "@/lib/cars";

type Props = { cars: Car[] };

export default function SearchClient({ cars }: Props) {
  const [q, setQ] = useState("");
  const [fuel, setFuel] = useState("all");
  const [tx, setTx] = useState("all");

  const fuels = useMemo(() => ["all", ...Array.from(new Set(cars.map((c) => c.fuelType)))], [cars]);
  const txs = useMemo(() => ["all", ...Array.from(new Set(cars.map((c) => c.transmission)))], [cars]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return cars.filter((c) => {
      const textHit =
        !qq ||
        c.brand.toLowerCase().includes(qq) ||
        c.model.toLowerCase().includes(qq) ||
        String(c.year).includes(qq);

      const fuelHit = fuel === "all" || c.fuelType === fuel;
      const txHit = tx === "all" || c.transmission === tx;
      return textHit && fuelHit && txHit;
    });
  }, [cars, q, fuel, tx]);

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="브랜드/모델/연식 검색"
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />
        <select
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        >
          {fuels.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select
          value={tx}
          onChange={(e) => setTx(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        >
          {txs.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border">
        <div className="grid grid-cols-12 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
          <div className="col-span-4">차량</div>
          <div className="col-span-2">연식</div>
          <div className="col-span-3">가격</div>
          <div className="col-span-3">주행거리</div>
        </div>

        <ul className="divide-y">
          {filtered.slice(0, 30).map((c) => (
            <li key={c.id} className="px-3 py-2 hover:bg-gray-50">
              <Link href={`/detail/${c.id}`} className="grid grid-cols-12 items-center text-sm">
                <div className="col-span-4 font-medium">
                  {c.brand} {c.model}
                </div>
                <div className="col-span-2 text-gray-700">{c.year}</div>
                <div className="col-span-3 text-gray-700">{c.price.toLocaleString()}</div>
                <div className="col-span-3 text-gray-700">{c.mileage.toLocaleString()}</div>
              </Link>
            </li>
          ))}
          {!filtered.length && (
            <li className="px-3 py-10 text-center text-sm text-gray-500">검색 결과가 없습니다.</li>
          )}
        </ul>
      </div>

      <div className="mt-3 text-xs text-gray-500">표시는 최대 30개까지.</div>
    </div>
  );
}
