module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    const ctx = strapi.requestContext.get();
    
    if (ctx && ctx.state && ctx.state.user) {
      data.users_permissions_user = ctx.state.user.id;
      data.publishedAt = new Date().toISOString(); // Auto-publish
    }
  },
};
