# AM Law Office

საიტის source ახლა ინახება `site/` ფოლდერში, ხოლო build გენერირდება repo-ს root-ში, რათა GitHub Pages-მა პირდაპირ `main` ბრენჩიდან იმუშაოს.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`

`npm run build`-ის შემდეგ root-ში ახლდება `index.html`, `assets/` და `favicon.svg`, ამიტომ GitHub Pages დაუყოვნებლივ იღებს მუშა სტატიკურ ვერსიას.
