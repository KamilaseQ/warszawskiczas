import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb({
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
});

async function main() {
  await prisma.notification.deleteMany();
  await prisma.scenarioComment.deleteMany();
  await prisma.scenarioActivity.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.invitation.deleteMany();
  await prisma.scenario.deleteMany();
  await prisma.user.deleteMany();

  const editorPass = await bcrypt.hash(process.env.EDITOR_PASSWORD || "editor123A", 12);
  const ownerPass = await bcrypt.hash(process.env.OWNER_PASSWORD || "owner123", 12);
  const viewerPass = await bcrypt.hash(process.env.VIEWER_PASSWORD || "viewer123A", 12);

  const owner = await prisma.user.create({
    data: {
      username: process.env.OWNER_USERNAME || "owner",
      password: ownerPass,
      role: "owner",
      accountStatus: "active",
    },
  });

  const editor = await prisma.user.create({
    data: {
      username: process.env.EDITOR_USERNAME || "editor",
      password: editorPass,
      role: "editor",
      accountStatus: "active",
    },
  });

  await prisma.user.create({
    data: {
      username: process.env.VIEWER_USERNAME || "viewer",
      password: viewerPass,
      role: "viewer",
      accountStatus: "active",
    },
  });

  await prisma.scenario.create({
    data: {
      title: "Zegarek Rolex Submariner — prezentacja lifestyle",
      description:
        "Krótki film (60s) przedstawiający zegarek Rolex Submariner w codziennych sytuacjach — poranek w kawiarni, spotkanie biznesowe, wieczorny spacer po Starym Mieście. Ujęcia slow-motion na detale tarczy i bransolety. Muzyka: ambient piano. Końcowa plansza z logo Warszawski Czas.",
      ownerNote: "Prośba o decyzję, czy ton filmu ma być bardziej spokojny czy dynamiczny.",
      status: "in_review",
      priority: "high",
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      authorId: editor.id,
      reviewerId: owner.id,
      activities: {
        create: {
          actorId: editor.id,
          actorName: editor.username,
          action: "scenario.created_and_sent",
          toStatus: "in_review",
        },
      },
    },
  });

  await prisma.scenario.create({
    data: {
      title: "Kolekcja letnia 2026 — teaser kampanii",
      description:
        "Dynamiczny teaser (30s) promujący letnią kolekcję zegarków. Montaż: szybkie cięcia między ujęciami plaży, jachtu i rooftop baru. Każdy zegarek pojawia się w innej scenie. Kolorystyka: ciepłe złoto + błękit morza. Zakończenie: „Czas na lato. Warszawski Czas.\" z datą premiery kolekcji.",
      ownerNote: "Wersja po pierwszej rundzie uwag.",
      status: "changes_requested",
      priority: "normal",
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
      authorId: editor.id,
      reviewerId: owner.id,
      comments: {
        create: {
          authorId: owner.id,
          authorName: owner.username,
          type: "review",
          body: "Dodaj mocniejszy początek i skróć końcową planszę.",
        },
      },
      activities: {
        create: {
          actorId: owner.id,
          actorName: owner.username,
          action: "scenario.status_changed",
          fromStatus: "in_review",
          toStatus: "changes_requested",
        },
      },
    },
  });

  console.log("Seeded owner-pwa users and example scenarios");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
