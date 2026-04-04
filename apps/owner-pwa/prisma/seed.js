"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // Clear existing data
    await prisma.scenario.deleteMany();
    // Create example scenarios
    await prisma.scenario.create({
        data: {
            title: "Zegarek Rolex Submariner — prezentacja lifestyle",
            description: "Krótki film (60s) przedstawiający zegarek Rolex Submariner w codziennych sytuacjach — poranek w kawiarni, spotkanie biznesowe, wieczorny spacer po Starym Mieście. Ujęcia slow-motion na detale tarczy i bransolety. Muzyka: ambient piano. Końcowa plansza z logo Warszawski Czas.",
            status: "PENDING",
        },
    });
    await prisma.scenario.create({
        data: {
            title: "Kolekcja letnia 2026 — teaser kampanii",
            description: "Dynamiczny teaser (30s) promujący letnią kolekcję zegarków. Montaż: szybkie cięcia między ujęciami plaży, jachtu i rooftop baru. Każdy zegarek pojawia się w innej scenie. Kolorystyka: ciepłe złoto + błękit morza. Zakończenie: „Czas na lato. Warszawski Czas.", z, datą, premiery, kolekcji, : ., ",: status, "PENDING": ,
        },
    });
    console.log("✅ Seeded 2 example scenarios");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
