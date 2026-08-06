export default {
  routes: [
    {
      method: 'GET',
      path: '/mentoring-requests/me',
      handler: 'api::mentoring-request.mentoring-request.me',
    }
  ]
};
