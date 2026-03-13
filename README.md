# Find Your Doctor Nearby

A mobile-first web app to search for doctors near your location. Built with React (Next.js), Node.js API routes, and deployed on Vercel with Blob storage for images.

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS
- **Backend:** Next.js API Routes (Node.js)
- **Storage:** Vercel Blob (for doctor profile images)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   For image uploads, add your Vercel Blob token to `.env.local`:
   - Create a Blob store at [Vercel Dashboard → Storage](https://vercel.com/dashboard/stores)
   - Copy the `BLOB_READ_WRITE_TOKEN` and add it to `.env.local`

3. **Run the dev server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Create a Blob store in your project:
   - Go to your project → Storage → Create Database/Store → Blob
   - This adds `BLOB_READ_WRITE_TOKEN` automatically
4. Deploy

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── doctors/    # GET, POST doctors
│   │   └── upload/     # POST image to Vercel Blob
│   ├── articles/
│   ├── tips/
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── DoctorCard.tsx
│   ├── DoctorList.tsx
│   └── SearchFilters.tsx
└── lib/
    ├── types.ts
    └── data.ts        # Sample doctors
```

## Features

- **Search by location:** Filter doctors by Country, City, Area, and Radius
- **Doctor cards:** Name, specialization, workplace, phone, map link
- **Image uploads:** API ready for uploading doctor photos to Vercel Blob
- **Mobile-first:** Responsive layout optimized for phones and tablets
