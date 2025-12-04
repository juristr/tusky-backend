import { Rating, RatingSummary, CreateRatingInput } from '@tusky/api-types';
import { RatingsRepository, ratingsRepository } from '@tusky/data-ratings';

export class RatingsService {
  constructor(private repo: RatingsRepository = ratingsRepository) {}

  getRatingSummary(productId: number): RatingSummary {
    return this.repo.getSummary(productId);
  }

  addRating(productId: number, input: CreateRatingInput): Rating {
    return this.repo.create(productId, input.stars, input.comment);
  }
}

export const ratingsService = new RatingsService();
