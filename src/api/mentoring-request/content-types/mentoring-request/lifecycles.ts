export default {
  beforeCreate(event: any) {
    const ctx = strapi.requestContext.get();
    
    // Automatically link the currently logged-in user to this mentoring request
    if (ctx && ctx.state && ctx.state.user) {
      event.params.data.user = ctx.state.user.id;
    }
  }
};
