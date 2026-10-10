# Ahmixen AI — Phase 2

The project is separated into independent top-level applications:

- `frontend/` — public Next.js website on port `3000`
- `admin/` — protected Next.js administration app on port `3001`
- `backend/` — shared NestJS and MongoDB API on port `4000`

Phase 2 adds database-driven program landing pages at `/programs/{slug}`, a 14-step admin program builder, curriculum and FAQ editing, configurable public section ordering, draft previews, pricing/CTA settings, SEO metadata, CSRF-protected mutations, and validated media uploads.

## Requirements

- Node.js 20+
- npm 10+
- MongoDB 7+ locally or through MongoDB Atlas

## Environment setup

```cmd
cd /d "C:\Users\Muhammad Haris\Desktop\Ahmixen-AI"
copy .env.example .env
copy frontend\.env.example frontend\.env.local
copy admin\.env.example admin\.env.local
```

Replace `JWT_SECRET` with a random value containing at least 32 characters. If MongoDB is hosted, replace `MONGODB_URI` with the Atlas connection string.

## Install, migrate, and run

```cmd
npm install
npm run seed
npm run dev
```

- Website: `http://localhost:3000`
- Admin: `http://localhost:3001/login`
- API: `http://localhost:4000/api`

The seed command creates the first admin, migrates legacy Phase 1 program fields, and creates demonstration content only when it is missing.

## Initial development credentials

```text
Email: admin@gmail.com
Password: admin@123
```

They come from `ADMIN_EMAIL` and `ADMIN_INITIAL_PASSWORD` in `.env`. The password initializes a missing account only and is never reapplied on restart. Change it in Admin Settings after the first login.

## Program publishing workflow

1. Sign in and open Programs.
2. Choose **New program**.
3. Complete the editor steps, add curriculum/lessons and FAQs, configure media, CTA, pricing, SEO, section visibility, and order.
4. Save as `draft` and use the protected Preview link.
5. Change status to `published` and save. The program appears at `/programs/{slug}` and on the homepage according to its display order.

Draft and archived programs return a public 404 and are excluded from the sitemap. Deleting a program does not delete shared testimonial records.

## Media uploads

Local uploads accept JPG, PNG, WebP, GIF, MP4, and WebM files up to 20 MB. Files are stored in `backend/uploads/`, which is ignored by Git. Production deployments should replace local storage with persistent object storage.

## Verification

```cmd
npm run build
npm test
```

An isolated database-backed API workflow test is provided separately:

```cmd
cd backend
npm run test:integration
```

On Windows, the isolated MongoDB binary requires the current Microsoft Visual C++ Redistributable. You may instead test against the configured development MongoDB instance. For production, use HTTPS, a unique JWT secret, a dedicated database user, persistent media storage, and exact frontend/admin origins.
