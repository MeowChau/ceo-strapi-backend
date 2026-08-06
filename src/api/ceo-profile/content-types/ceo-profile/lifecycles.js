module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    const ctx = strapi.requestContext.get();
    
    if (ctx && ctx.state && ctx.state.user) {
      data.ownerEmail = ctx.state.user.email;
    }
    data.publishedAt = new Date().toISOString(); // Auto-publish
  }
};
