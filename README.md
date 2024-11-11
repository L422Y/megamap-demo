# Job Board Demo with Nuxt 3 + MegaMap

A modern job board demo showcasing real-time filtering, searching, and state management using MegaMap and Nuxt 3.

## Features

- 🚀 Built with Nuxt 3 and TypeScript
- 💾 State management using MegaMap with automated caching
- 🔍 Real-time search across job titles, companies, and skills
- 🎯 Advanced filtering by status, job type, and experience level
- 🎨 Dark mode UI with Nuxt UI components
- 🔄 Related jobs recommendations
- ⚡️ Automatic cache invalidation
- 🎯 Company-specific job listings
- 📱 Fully responsive design

## Technologies Used

- [Nuxt 3](https://nuxt.com/) - Vue.js Framework
- [MegaMap](https://github.com/l422y/megamap) - State Management
- [Nuxt UI](https://ui.nuxt.com/) - UI Components
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/job-board-demo
cd job-board-demo
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Start the development server
```bash
npm run dev
# or
pnpm dev
```

4. Visit `http://localhost:3000`

## Project Structure

```
job-board-demo/
├── components/       # Reusable Vue components
│   └── RelatedJobs.vue
├── pages/           # Application pages
│   ├── index.vue    # Job listings page
│   └── jobs/
│       └── [id].vue # Job detail page
├── server/          # Server API routes
│   └── api/
│       └── jobs.ts  # Jobs API endpoint
├── stores/          # Pinia stores
│   └── useJobStore.ts
├── types/           # TypeScript types
└── app.vue          # Root component
```

## Key Features Implementation

### State Management with MegaMap

```typescript
const jobStore = new ReactiveMegaMap<string, JobT>({
  loadOne: (id) => $fetch(`/api/jobs?id=${id}`),
  loadAll: () => $fetch("/api/jobs"),
  searchableFields: ["title", "company", "location", "requiredSkills"],
  subListFilters: {
    active: (job) => job.status === "active",
    draft: (job) => job.status === "draft",
    closed: (job) => job.status === "closed",
  },
  expiryInterval: 5 * 60 * 1000, // 5 minutes cache
})
```

### Job Filtering System

- Status filtering (Active, Draft, Closed)
- Job type filtering (Full-time, Part-time, Remote)
- Experience level filtering
- Skill-based filtering
- Location-based filtering

### Related Jobs Algorithm

Jobs are related based on:
- Matching skills
- Same company
- Similar experience level requirements
- Matching job type

## API Endpoints

### GET /api/jobs
Returns all jobs with optional filtering

Query Parameters:
- `id`: Get specific job by ID
- `status`: Filter by job status
- `type`: Filter by job type
- `experienceLevel`: Filter by experience level
- `search`: Search jobs by title, company, or skills

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Anthropic](https://www.anthropic.com/) - For assistance in development
- [MegaMap](https://github.com/l422y/megamap) - For the excellent state management library
- [Nuxt](https://nuxt.com/) - For the amazing framework
- [Nuxt UI](https://ui.nuxt.com/) - For the beautiful components

## Support

If you have any questions or run into issues, please open an issue in the repository.