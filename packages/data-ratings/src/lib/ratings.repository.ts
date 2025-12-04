import { Rating, RatingSummary } from '@tusky/api-types';

const ratings: Rating[] = [
  // Product 1: Wireless Noise-Cancelling Headphones (avg ~5)
  {
    id: 1,
    productId: 1,
    stars: 5,
    comment: 'Best headphones I ever owned!',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    productId: 1,
    stars: 5,
    comment: 'Amazing noise cancellation',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 3,
    productId: 1,
    stars: 5,
    comment: 'Crystal clear sound quality',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 4,
    productId: 1,
    stars: 4,
    comment: 'Great but a bit heavy',
    createdAt: new Date('2024-04-05'),
  },

  // Product 2: Ultra HD Smart TV (avg ~4)
  {
    id: 5,
    productId: 2,
    stars: 4,
    comment: 'Great picture quality',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 6,
    productId: 2,
    stars: 5,
    comment: 'Perfect for movies',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 7,
    productId: 2,
    stars: 4,
    comment: 'Smart features work well',
    createdAt: new Date('2024-03-25'),
  },
  {
    id: 8,
    productId: 2,
    stars: 3,
    comment: 'Sound could be better',
    createdAt: new Date('2024-04-12'),
  },

  // Product 3: Leather Crossbody Bag (avg ~4)
  {
    id: 9,
    productId: 3,
    stars: 5,
    comment: 'Beautiful craftsmanship',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 10,
    productId: 3,
    stars: 4,
    comment: 'Very stylish and practical',
    createdAt: new Date('2024-02-28'),
  },
  {
    id: 11,
    productId: 3,
    stars: 4,
    comment: 'Good quality leather',
    createdAt: new Date('2024-03-15'),
  },

  // Product 4: Men's Running Shoes (avg ~5)
  {
    id: 12,
    productId: 4,
    stars: 5,
    comment: 'Super comfortable for long runs',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 13,
    productId: 4,
    stars: 5,
    comment: 'Great arch support',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 14,
    productId: 4,
    stars: 5,
    comment: 'Lightweight and breathable',
    createdAt: new Date('2024-03-20'),
  },
  {
    id: 15,
    productId: 4,
    stars: 4,
    comment: 'Runs a bit small, size up',
    createdAt: new Date('2024-04-08'),
  },

  // Product 5: Stainless Steel Water Bottle (avg ~4)
  {
    id: 16,
    productId: 5,
    stars: 4,
    comment: 'Keeps water cold all day',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 17,
    productId: 5,
    stars: 5,
    comment: 'No leaks, great seal',
    createdAt: new Date('2024-03-05'),
  },
  {
    id: 18,
    productId: 5,
    stars: 4,
    comment: 'Nice design',
    createdAt: new Date('2024-04-01'),
  },

  // Product 6: Scented Soy Candle Set (avg ~4)
  {
    id: 19,
    productId: 6,
    stars: 4,
    comment: 'Lovely scents, burns evenly',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: 20,
    productId: 6,
    stars: 5,
    comment: 'Perfect gift set',
    createdAt: new Date('2024-02-14'),
  },
  {
    id: 21,
    productId: 6,
    stars: 4,
    comment: 'Long lasting fragrance',
    createdAt: new Date('2024-03-30'),
  },

  // Product 7: Fitness Smartwatch (avg ~5)
  {
    id: 22,
    productId: 7,
    stars: 5,
    comment: 'Tracks everything accurately',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: 23,
    productId: 7,
    stars: 5,
    comment: 'Battery lasts a week',
    createdAt: new Date('2024-02-22'),
  },
  {
    id: 24,
    productId: 7,
    stars: 5,
    comment: 'Sleep tracking is spot on',
    createdAt: new Date('2024-03-18'),
  },
  {
    id: 25,
    productId: 7,
    stars: 4,
    comment: 'Great value for money',
    createdAt: new Date('2024-04-10'),
  },

  // Product 8: Organic Face Moisturizer (avg ~4)
  {
    id: 26,
    productId: 8,
    stars: 4,
    comment: 'Gentle on sensitive skin',
    createdAt: new Date('2024-01-30'),
  },
  {
    id: 27,
    productId: 8,
    stars: 5,
    comment: 'Love the natural ingredients',
    createdAt: new Date('2024-02-25'),
  },
  {
    id: 28,
    productId: 8,
    stars: 4,
    comment: 'Absorbs quickly',
    createdAt: new Date('2024-03-12'),
  },
];

let nextId = 29;

export class RatingsRepository {
  findByProductId(productId: number): Rating[] {
    return ratings.filter((r) => r.productId === productId);
  }

  create(productId: number, stars: number, comment: string): Rating {
    const rating: Rating = {
      id: nextId++,
      productId,
      stars,
      comment,
      createdAt: new Date(),
    };
    ratings.push(rating);
    return rating;
  }

  getSummary(productId: number): RatingSummary {
    const productRatings = this.findByProductId(productId);
    const totalRatings = productRatings.length;
    const averageRating =
      totalRatings > 0
        ? productRatings.reduce((sum, r) => sum + r.stars, 0) / totalRatings
        : 0;

    return {
      productId,
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings,
    };
  }
}

export const ratingsRepository = new RatingsRepository();
