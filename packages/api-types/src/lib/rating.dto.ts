export interface Rating {
  id: number;
  productId: number;
  stars: number;
  comment: string;
  createdAt: Date;
}

export interface RatingSummary {
  productId: number;
  averageRating: number;
  totalRatings: number;
}

export interface CreateRatingInput {
  stars: number;
  comment: string;
}
