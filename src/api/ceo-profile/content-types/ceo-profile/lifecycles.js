module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    data.publishedAt = new Date().toISOString(); // Auto-publish
  },
  async afterCreate(event) {
    const { result } = event;
    const ctx = strapi.requestContext.get();
    
    if (ctx && ctx.state && ctx.state.user) {
      try {
        await strapi.documents('api::ceo-profile.ceo-profile').update({
          documentId: result.documentId,
          data: {
            users_permissions_user: ctx.state.user.id
          }
        });
      } catch (err) {
        console.error("Lỗi khi link user:", err);
      }
    }
  }
};
