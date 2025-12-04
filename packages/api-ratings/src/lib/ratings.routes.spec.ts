import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { ratingsRoutes } from './ratings.routes';

vi.mock('@tusky/service-ratings', () => ({
  ratingsService: {
    getRatingSummary: vi.fn().mockImplementation((productId: number) => ({
      productId,
      averageRating: 4.5,
      totalRatings: 10,
    })),
    addRating: vi.fn().mockImplementation((productId: number, input) => ({
      id: 1,
      productId,
      stars: input.stars,
      comment: input.comment,
      createdAt: new Date('2024-01-01'),
    })),
  },
}));

vi.mock('@tusky/service-products', () => ({
  productsService: {
    getById: vi.fn().mockImplementation((id: number) => {
      if (id === 1) {
        return { id: 1, name: 'Test Product', price: 99, rating: 5 };
      }
      return undefined;
    }),
  },
}));

describe('Ratings Routes', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = Fastify();
    await app.register(ratingsRoutes);
    await app.ready();
  });

  describe('GET /api/ratings/:productId', () => {
    it('should return rating summary for existing product', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/ratings/1',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.productId).toBe(1);
      expect(body.averageRating).toBe(4.5);
      expect(body.totalRatings).toBe(10);
    });

    it('should return 404 for non-existent product', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/ratings/999',
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.message).toBe('Product not found');
    });
  });

  describe('POST /api/ratings/:productId', () => {
    it('should create a new rating for existing product', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/ratings/1',
        payload: {
          stars: 5,
          comment: 'Excellent product!',
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.productId).toBe(1);
      expect(body.stars).toBe(5);
      expect(body.comment).toBe('Excellent product!');
    });

    it('should return 404 for non-existent product', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/ratings/999',
        payload: {
          stars: 5,
          comment: 'Great!',
        },
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.message).toBe('Product not found');
    });

    it('should validate stars range', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/ratings/1',
        payload: {
          stars: 6,
          comment: 'Invalid stars',
        },
      });

      expect(response.statusCode).toBe(400);
    });

    it('should require comment field', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/ratings/1',
        payload: {
          stars: 5,
        },
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
