import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { ratingsService } from '@tusky/service-ratings';
import { productsService } from '@tusky/service-products';

export async function ratingsRoutes(fastify: FastifyInstance) {
  const getRatingSummaryOpts: RouteShorthandOptions = {
    schema: {
      tags: ['ratings'],
      summary: 'Get rating summary for a product',
      params: {
        type: 'object',
        properties: {
          productId: { type: 'string' },
        },
        required: ['productId'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            productId: { type: 'number' },
            averageRating: { type: 'number' },
            totalRatings: { type: 'number' },
          },
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  };

  fastify.get<{ Params: { productId: string } }>(
    '/api/ratings/:productId',
    getRatingSummaryOpts,
    async (request, reply) => {
      const productId = parseInt(request.params.productId, 10);
      const product = productsService.getById(productId);
      if (!product) {
        reply.code(404);
        return { message: 'Product not found' };
      }
      return ratingsService.getRatingSummary(productId);
    }
  );

  const createRatingOpts: RouteShorthandOptions = {
    schema: {
      tags: ['ratings'],
      summary: 'Add a new rating for a product',
      params: {
        type: 'object',
        properties: {
          productId: { type: 'string' },
        },
        required: ['productId'],
      },
      body: {
        type: 'object',
        properties: {
          stars: { type: 'number', minimum: 1, maximum: 5 },
          comment: { type: 'string' },
        },
        required: ['stars', 'comment'],
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            productId: { type: 'number' },
            stars: { type: 'number' },
            comment: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  };

  fastify.post<{
    Params: { productId: string };
    Body: { stars: number; comment: string };
  }>('/api/ratings/:productId', createRatingOpts, async (request, reply) => {
    const productId = parseInt(request.params.productId, 10);
    const product = productsService.getById(productId);
    if (!product) {
      reply.code(404);
      return { message: 'Product not found' };
    }
    const rating = ratingsService.addRating(productId, request.body);
    reply.code(201);
    return rating;
  });
}
