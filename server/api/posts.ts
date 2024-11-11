import { defineEventHandler, getQuery } from 'h3';

const posts = [
  { _id: '1', data: 'Post 1', status: 'active', created_at: '2023-01-01T00:00:00Z', modified_at: getRandomModifiedAt('2023-01-01T00:00:00Z') },
  { _id: '2', data: 'Post 2', status: 'inactive', created_at: '2023-01-01T00:00:00Z', modified_at: getRandomModifiedAt('2023-01-01T00:00:00Z') },
  { _id: '3', data: 'Post 3', status: 'draft', created_at: '2023-01-01T00:00:00Z', modified_at: getRandomModifiedAt('2023-01-01T00:00:00Z') },
  { _id: '4', data: 'Post 4', status: 'active', created_at: '2023-01-01T00:00:00Z', modified_at: getRandomModifiedAt('2023-01-01T00:00:00Z') },
  { _id: '5', data: 'Post 5', status: 'draft', created_at: '2023-01-01T00:00:00Z', modified_at: getRandomModifiedAt('2023-01-01T00:00:00Z') },
];

function getRandomModifiedAt(createdAt) {
  const createdAtDate = new Date(createdAt);
  const now = new Date();
  const randomTime = createdAtDate.getTime() + Math.random() * (now.getTime() - createdAtDate.getTime());
  return new Date(randomTime).toISOString();
}

export default defineEventHandler((event) => {
  const { id } = getQuery(event);

  if (id) {
    const post = posts.find((p) => p._id === id);
    if (post) {
      return post;
    } else {
      throw createError({ statusCode: 404, statusMessage: 'Post not found' });
    }
  }

  return posts;
});
