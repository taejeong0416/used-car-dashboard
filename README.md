# Used Car Dashboard (Next.js + Tailwind)

## 실행
```bash
npm install
npm run dev
```

## CSV 연결
- `data/cars.csv`를 본인 CSV로 교체하세요.
- 기본 헤더(권장):
  - id, brand, model, year, price, mileage, fuelType, transmission

헤더명이 다르면 `app/api/cars/route.ts`에서 매핑 부분만 바꾸면 됩니다.
