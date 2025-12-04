import { Product } from '@tusky/api-types';
import { ProductsRepository, productsRepository } from '@tusky/data-products';

export class ProductsService {
  constructor(private repo: ProductsRepository = productsRepository) {}

  getAll(): Product[] {
    return this.repo.findAll();
  }

  getById(id: number): Product | undefined {
    return this.repo.findById(id);
  }

  updateRating(productId: number, rating: number): void {
    this.repo.updateRating(productId, rating);
  }
}

export const productsService = new ProductsService();
