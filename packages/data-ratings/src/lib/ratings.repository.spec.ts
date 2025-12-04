import { describe, it, expect, beforeEach } from 'vitest';
import { RatingsRepository } from './ratings.repository';

describe('RatingsRepository', () => {
  let repo: RatingsRepository;

  beforeEach(() => {
    repo = new RatingsRepository();
  });

  describe('create', () => {
    it('should create a new rating', () => {
      const rating = repo.create(1, 5, 'Great product!');

      expect(rating).toBeDefined();
      expect(rating.productId).toBe(1);
      expect(rating.stars).toBe(5);
      expect(rating.comment).toBe('Great product!');
      expect(rating.createdAt).toBeInstanceOf(Date);
    });

    it('should assign unique ids to ratings', () => {
      const rating1 = repo.create(1, 5, 'Great!');
      const rating2 = repo.create(1, 4, 'Good!');

      expect(rating1.id).not.toBe(rating2.id);
    });
  });

  describe('findByProductId', () => {
    it('should return empty array for product with no ratings', () => {
      const ratings = repo.findByProductId(999);
      expect(ratings).toEqual([]);
    });

    it('should return ratings for specific product', () => {
      repo.create(1, 5, 'Great!');
      repo.create(1, 4, 'Good!');
      repo.create(2, 3, 'Okay');

      const product1Ratings = repo.findByProductId(1);
      expect(product1Ratings.length).toBe(2);
      expect(product1Ratings.every((r) => r.productId === 1)).toBe(true);
    });
  });

  describe('getSummary', () => {
    it('should return zero average for product with no ratings', () => {
      const summary = repo.getSummary(999);

      expect(summary.productId).toBe(999);
      expect(summary.averageRating).toBe(0);
      expect(summary.totalRatings).toBe(0);
    });

    it('should calculate average rating correctly', () => {
      repo.create(1, 5, 'Great!');
      repo.create(1, 4, 'Good!');
      repo.create(1, 3, 'Okay');

      const summary = repo.getSummary(1);

      expect(summary.productId).toBe(1);
      expect(summary.averageRating).toBe(4);
      expect(summary.totalRatings).toBe(3);
    });

    it('should round average to one decimal place', () => {
      repo.create(1, 5, 'Great!');
      repo.create(1, 4, 'Good!');

      const summary = repo.getSummary(1);

      expect(summary.averageRating).toBe(4.5);
    });
  });
});
