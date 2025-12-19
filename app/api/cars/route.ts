import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
};

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (ch === "\r") continue;

    if (ch === '"') {
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && ch === ",") {
      row.push(cur);
      cur = "";
      continue;
    }

    if (!inQuotes && ch === "\n") {
      row.push(cur);
      rows.push(row.map((s) => s.trim()));
      row = [];
      cur = "";
      continue;
    }

    cur += ch;
  }

  if (cur.length || row.length) {
    row.push(cur);
    rows.push(row.map((s) => s.trim()));
  }

  return rows.filter((r) => r.some((v) => v.length));
}

function toNumber(v: string): number {
  const cleaned = v.replace(/[^0-9.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export async function GET() {
  const csvPath = path.join(process.cwd(), "data", "cars.csv");
  const csv = await fs.readFile(csvPath, "utf-8");

  const rows = parseCsv(csv);
  if (rows.length < 2) return NextResponse.json([]);

  const header = rows[0].map((h) => h.toLowerCase());
  const idx = (name: string) => header.indexOf(name.toLowerCase());

  const iId = idx("id");
  const iBrand = idx("brand");
  const iModel = idx("model");
  const iYear = idx("year");
  const iPrice = idx("price");
  const iMileage = idx("mileage");
  const iFuel = idx("fueltype");
  const iTx = idx("transmission");

  const cars: Car[] = rows.slice(1).map((r, k) => ({
    id: (iId >= 0 ? r[iId] : String(k + 1)) || String(k + 1),
    brand: iBrand >= 0 ? (r[iBrand] || "Unknown") : "Unknown",
    model: iModel >= 0 ? (r[iModel] || "Unknown") : "Unknown",
    year: iYear >= 0 ? toNumber(r[iYear]) : 0,
    price: iPrice >= 0 ? toNumber(r[iPrice]) : 0,
    mileage: iMileage >= 0 ? toNumber(r[iMileage]) : 0,
    fuelType: iFuel >= 0 ? (r[iFuel] || "unknown") : "unknown",
    transmission: iTx >= 0 ? (r[iTx] || "unknown") : "unknown",
  }));

  return NextResponse.json(cars);
}
