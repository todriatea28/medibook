## პროექტის შესახებ
**MediBook** არის React-ზე დაფუძნებული თანამედროვე ვებ-აპლიკაცია, რომელიც უზრუნველყოფს პაციენტებისა და ექიმების ეფექტურ ურთიერთქმედებას. სისტემა საშუალებას აძლევს მომხმარებლებს მოძებნონ ექიმები სპეციალობის მიხედვით, დაჯავშნონ ვიზიტები, აკონტროლონ სტატუსები, მიიღონ დიაგნოზები და შეაფასონ ვიზიტები[cite: 7].

## ძირითადი ფუნქციონალი
- **მონაცემთა მართვა (CRUD & State):** გლობალური სთეით-მენეჯმენტი Zustand-ის გამოყენებით (`persist` middleware), რომელიც უზრუნველყოფს მონაცემების სინქრონიზაციას `localStorage`-თან და Supabase-თან[cite: 8].
- **ძიება და ფილტრაცია:** ოპტიმიზებული ცოცხალი ძიება `useDebounce` ჰუკით და მემოიზებული ფილტრაცია `useMemo`-ს გამოყენებით[cite: 8].
- **მოდალური ფანჯრები და ვალიდაცია:** `ReactDOM.createPortal` მოდალები და მკაცრი ფორმის ვალიდაცია `Zod` / `React Hook Form`-ით[cite: 8].
- **მდგრადობა (Resilience):** `ErrorBoundary` დაცვა თეთრი ეკრანისგან, Double-Click ბლოკირება და ოფლაინ/დემო მონაცემების Fallback რეჟიმი[cite: 8].
- **Responsive დიზაინი:** Mobile-First მიდგომა, სრულად ადაპტირებული ბადეები მობილური ჰამბურგერ-მენიუთი (375px), პლანშეტით (768px) და დესკტოპით (1440px)[cite: 8].

## ტექნოლოგიური სტეკი

| კატეგორია | გამოყენებული ტექნოლოგია |
|---|---|
| **Core** | React, Vite, TypeScript / JavaScript[cite: 9] |
| **State Management** | Zustand (Persist Middleware) + LocalStorage[cite: 9] |
| **Forms & Validation** | Zod / React Hook Form[cite: 9] |
| **Routing & Performance** | React Router (`React.lazy` & `Suspense`)[cite: 9] |
| **Styling & Icons** | Tailwind CSS, Lucide React SVG Icons[cite: 9] |

## პროექტის სტრუქტურა

```text
src/
├── assets/      # ოპტიმიზებული რესურსები და სურათები
├── components/  # ხელახლა გამოყენებადი UI კომპონენტები (Navbar, DoctorCard, Modals)
├── hooks/       # Custom ჰუკები (useDebounce და სხვ.)
├── pages/       # აპლიკაციის ძირითადი გვერდები (PatientDashboard, DoctorDashboard)
├── services/    # ბაზასთან და სერვისებთან კომუნიკაცია
├── store/       # გლობალური Zustand სთეითი
└── types/       # TypeScript ტიპები და ინტერფეისები

## ლოკალურად გაშვების ინსტრუქცია

1. **დააკლონირეთ რეპოზიტორია:**
```bash
git clone [https://github.com/todriatea28/medibook.git](https://github.com/todriatea28/medibook.git)
cd medibook


2. **დააყენეთ პაკეტები:**
```bash
npm install

3. **გაუშვით დეველოპერული სერვერი:**
```bash
npm run dev
*(ბრაუზერში გახსენით: `http://localhost:5173`)*

## სატესტო ანგარიშები

| როლი | ელფოსტა | პაროლი |
| --- | --- | --- |
| **ადმინისტრატორი / ექიმი** | admin@medibook.ge | admin123 |
| **მომხმარებელი / პაციენტი** | patient@medibook.ge | user123 |

## ხელმისაწვდომი სკრიპტები

* `npm run dev` — დეველოპერული სერვერის გაშვება
* `npm run build` — საწარმოო (Production) ვერსიის აწყობა
* `npm run preview` — აწყობილი ვერსიის ლოკალურად გაშვება

## ავტორი

* **თეა თოდრია** — [GitHub პროფილი](https://www.google.com/search?q=https://github.com/todriatea28)


ც ასპროცენტიანად მზად არის ჩასაბარებლად! 🎉

```
