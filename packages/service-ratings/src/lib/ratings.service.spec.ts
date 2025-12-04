import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RatingsService } from './ratings.service';
import { RatingsRepository } from '@tusky/data-ratings';

describe('RatingsService', () => {
  let service: RatingsService;
  let mockRepo: RatingsRepository;

  beforeEach(() => {
    mockRepo = {
      getSummary: vi.fn().mockReturnValue({
        productId: 1,
        averageRating: 4.5,
        totalRatings: 10,
      }),
      create: vi.fn().mockReturnValue({
        id: 1,
        productId: 1,
        stars: 5,
        comment: 'Great!',
        createdAt: new Date(),
      }),
      findByProductId: vi.fn(),
    } as unknown as RatingsRepository;

    service = new RatingsService(mockRepo);
  });

  describe('getRatingSummary', () => {
    it('should return rating summary for product', () => {
      const summary = service.getRatingSummary(1);

      expect(mockRepo.getSummary).toHaveBeenCalledWith(1);
      expect(summary.productId).toBe(1);
      expect(summary.averageRating).toBe(4.5);
      expect(summary.totalRatings).toBe(10);
    });
  });

  describe('addRating', () => {
    it('should create a new rating', () => {
      const input = { stars: 5, comment: 'Great!' };
      const rating = service.addRating(1, input);

      expect(mockRepo.create).toHaveBeenCalledWith(1, 5, 'Great!');
      expect(rating.productId).toBe(1);
      expect(rating.stars).toBe(5);
      expect(rating.comment).toBe('Great!');
    });
  });
});
