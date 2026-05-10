"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuredProducts = exports.otherFeaturedProducts = exports.featuredProduct = exports.mockProducts = void 0;
exports.productUrlSlug = productUrlSlug;
exports.findProductByUrlSlug = findProductByUrlSlug;
const img = (slug, files) => files.map((f) => `/products/${slug}/${f}`);
exports.mockProducts = [
    {
        "id": "1",
        "slug": "breitling-niebieski",
        "name": "Superocean Heritage B20 Automatic 42",
        "brand": "Breitling",
        "category": "zegarki",
        "material": "Stal nierdzewna, niebieski ceramiczny bezel, bransoleta stalowa typu mesh",
        "reference": "AB2010161C1A1",
        "year": "#2023",
        "condition": "Bardzo dobry, drobne ślady użytkowania na bezelu i kopercie",
        "priceOnRequest": true,
        "status": "Dostępny",
        "images": [
];
