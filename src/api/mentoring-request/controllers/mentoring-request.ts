/**
 * mentoring-request controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::mentoring-request.mentoring-request', ({ strapi }) => ({
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }
    
    // In Strapi v5, use the Document API
    const data = await strapi.documents('api::mentoring-request.mentoring-request').findMany({
      filters: {
        user: {
            documentId: user.documentId
        }
      },
      populate: '*'
    });
    
    return { data };
  }
}));
