import { Rating, RatingSummary, CreateRatingInput } from '@tusky/api-types';
import { RatingsRepository, ratingsRepository } from '@tusky/data-ratings';
import { ProductsService, productsService } from '@tusky/service-products';

export class RatingsService {
  constructor(
    private repo: RatingsRepository = ratingsRepository,
    private products: ProductsService = productsService
  ) {}

  getRatingSummary(productId: number): RatingSummary {
    return this.repo.getSummary(productId);
  }

  addRating(productId: number, input: CreateRatingInput): Rating {
    const rating = this.repo.create(productId, input.stars, input.comment);
    const summary = this.repo.getSummary(productId);
    this.products.updateRating(productId, summary.averageRating);
    return rating;
  }
}

export const ratingsService = new RatingsService();
