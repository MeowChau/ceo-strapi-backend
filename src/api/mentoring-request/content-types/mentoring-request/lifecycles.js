module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    data.publishedAt = new Date().toISOString(); // Auto-publish
  },
  async afterCreate(event) {
    const { result } = event;
    const ctx = strapi.requestContext.get();
    
    // Automatically link the currently logged-in user to this mentoring request
    if (ctx && ctx.state && ctx.state.user) {
      try {
        await strapi.documents('api::mentoring-request.mentoring-request').update({
          documentId: result.documentId,
          data: {
            user: ctx.state.user.id
          }
        });
        console.log(`Successfully linked mentoring request ${result.documentId} to user ${ctx.state.user.id}`);
      } catch (err) {
        console.error('Error linking user in afterCreate hook:', err);
      }
    }
  }
};
