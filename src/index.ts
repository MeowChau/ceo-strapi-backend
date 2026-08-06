// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    try {
      const authenticatedRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'authenticated' },
      });

      if (authenticatedRole) {
        const actions = [
          'api::mentoring-request.mentoring-request.create',
          'api::mentoring-request.mentoring-request.find',
          'api::mentoring-request.mentoring-request.findOne',
          'api::mentoring-request.mentoring-request.me'
        ];

        for (const action of actions) {
          const permission = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { role: authenticatedRole.id, action },
          });

          if (!permission) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                role: authenticatedRole.id,
                action,
              },
            });
            strapi.log.info(`Granted permission ${action} to authenticated role.`);
          }
        }
      }
    } catch (err) {
      strapi.log.error('Failed to grant permissions in bootstrap:', err);
    }
  },
};
