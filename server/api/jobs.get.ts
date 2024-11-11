import { defineEventHandler, getQuery } from 'h3';

const companies = [
  { id: '1', name: 'TechCorp', logo: '/placeholder/50/50', location: 'San Francisco, CA' },
  { id: '2', name: 'InnovateLabs', logo: '/placeholder/50/50', location: 'New York, NY' },
  { id: '3', name: 'DataDynamics', logo: '/placeholder/50/50', location: 'Austin, TX' },
  { id: '4', name: 'CloudSphere', logo: '/placeholder/50/50', location: 'Seattle, WA' },
  { id: '5', name: 'AIVentures', logo: '/placeholder/50/50', location: 'Boston, MA' },
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Manager'];
const skills = ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes'];

const jobs = Array.from({ length: 20 }, (_, i) => {
  const company = companies[Math.floor(Math.random() * companies.length)];
  const created = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);

  return {
    _id: (i + 1).toString(),
    title: [
      'Senior Frontend Developer',
      'Full Stack Engineer',
      'DevOps Specialist',
      'UI/UX Designer',
      'Product Manager',
      'Data Scientist',
      'Cloud Architect',
    ][Math.floor(Math.random() * 7)],
    company: company.name,
    companyId: company.id,
    companyLogo: company.logo,
    location: company.location,
    salary: {
      min: Math.floor(Math.random() * 50 + 50) * 1000,
      max: Math.floor(Math.random() * 100 + 100) * 1000,
    },
    description: `We're looking for a talented professional to join our team...`,
    status: ['active', 'draft', 'closed'][Math.floor(Math.random() * 3)],
    type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
    experienceLevel: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
    requiredSkills: Array.from(
      { length: Math.floor(Math.random() * 5) + 2 },
      () => skills[Math.floor(Math.random() * skills.length)]
    ),
    created_at: created.toISOString(),
    modified_at: new Date(created.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
});

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { id, status, type, experienceLevel, search } = query;

  if (id) {
    const job = jobs.find((j) => j._id === id);
    if (job) {
      return job;
    }
    throw createError({ statusCode: 404, statusMessage: 'Job not found' });
  }

  let filteredJobs = [...jobs];

  if (status) {
    filteredJobs = filteredJobs.filter((job) => job.status === status);
  }

  if (type) {
    filteredJobs = filteredJobs.filter((job) => job.type === type);
  }

  if (experienceLevel) {
    filteredJobs = filteredJobs.filter((job) => job.experienceLevel === experienceLevel);
  }

  if (search) {
    const searchLower = String(search).toLowerCase();
    filteredJobs = filteredJobs.filter((job) =>
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.requiredSkills.some(skill => skill.toLowerCase().includes(searchLower))
    );
  }

  return filteredJobs;
});