// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    try {
      // 1. Grant authenticated permissions
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
              data: { role: authenticatedRole.id, action },
            });
            strapi.log.info(`Granted permission ${action} to authenticated role.`);
          }
        }
      }

      // 2. Grant public permissions for articles and events
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const publicActions = [
          'api::article.article.find',
          'api::article.article.findOne',
          'api::event.event.find',
          'api::event.event.findOne'
        ];
        for (const action of publicActions) {
          const permission = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { role: publicRole.id, action },
          });
          if (!permission) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: { role: publicRole.id, action },
            });
            strapi.log.info(`Granted permission ${action} to public role.`);
          }
        }
      }

      // 3. Seed Articles Data
      const existingArticlesCount = await strapi.db.query('api::article.article').count();
      if (existingArticlesCount === 0) {
        const initialArticles = [
            { title: "Thực thi chiến lược hiệu quả", desc: "<p>Nếu thực thi chiến lược không hiệu quả thì lỗi ở chiến lược hay lỗi ở thực thi? Trước đây hay cho rằng, chiến lược thất bại là do thực thi. Nay, để chiến lược được thực thi hiệu quả thì đầu tiên chiến lược phải đúng...</p>", imageUrl: "/assets/img/baiVietMau/bai1.png", time: "03/08/2026", tags: "Đào tạo, Tin tức", comments: 0 },
            { title: "Thay đổi tư duy, văn hoá và hành vi của tổ chức", desc: "<p>Quá trình chuyển đổi số đòi hỏi sự thay đổi toàn diện từ tư duy lãnh đạo đến văn hoá tổ chức và hành vi của từng cá nhân...</p>", imageUrl: "/assets/img/baiVietMau/bai2.png", time: "02/08/2026", tags: "Tin tức", comments: 0 },
            { title: "[CEO DIALOGUE] Trục 1 – Khi CEO không có mặt, hệ thống có tiếp tục vận hành?", desc: "<p>Một bài toán muôn thuở của các doanh nghiệp là phụ thuộc quá nhiều vào sự hiện diện của người đứng đầu...</p>", imageUrl: "/assets/img/baiVietMau/bai3.png", time: "31/07/2026", tags: "CEO Dialogue", comments: 0 },
            { title: "[CEO DIALOGUE] Trục 1 – Ai được quyền quyết?", desc: "<p>Trao quyền là một nghệ thuật. Phân định rõ quyền hạn và trách nhiệm sẽ giúp tổ chức linh hoạt và phản ứng nhanh hơn...</p>", imageUrl: "/assets/img/baiVietMau/bai4.png", time: "30/07/2026", tags: "CEO Dialogue", comments: 15 },
            { title: "Chuyển đổi số doanh nghiệp", desc: "<p>Cẩm nang toàn diện về chuyển đổi số, từ việc đánh giá mức độ trưởng thành số đến triển khai thực tế...</p>", imageUrl: "/assets/img/baiVietMau/bai5.png", time: "27/07/2026", tags: "Tin tức", comments: 0 },
            { title: "Nghề CEO - Nghề chịu trách nhiệm cuối cùng", desc: "<p>Những áp lực vô hình và trách nhiệm nặng nề mà người đứng đầu doanh nghiệp phải đối mặt trong môi trường kinh doanh khốc liệt...</p>", imageUrl: "/assets/img/baiVietMau/bai6.png", time: "27/07/2026", tags: "Tin tức", comments: 0 },
            { title: "Phát triển năng lực lãnh đạo thời kỳ 4.0", desc: "<p>Lãnh đạo trong kỷ nguyên số đòi hỏi những kỹ năng mới như thấu cảm, tư duy dữ liệu và khả năng thích ứng linh hoạt...</p>", imageUrl: "/assets/img/baiVietMau/bai7.png", time: "25/07/2026", tags: "Đào tạo", comments: 0 },
            { title: "Quản trị rủi ro trong bối cảnh kinh tế biến động", desc: "<p>Chiến lược xây dựng doanh nghiệp kiên cường, có khả năng chống chịu trước các cú sốc từ thị trường...</p>", imageUrl: "/assets/img/baiVietMau/bai8.png", time: "22/07/2026", tags: "Tin tức", comments: 0 },
            { title: "Xây dựng chiến lược nhân sự bền vững", desc: "<p>Làm thế nào để thu hút, giữ chân và phát triển nhân tài trong thời kỳ thế hệ Z đang làm chủ lực lượng lao động...</p>", imageUrl: "/assets/img/baiVietMau/bai9.jpg", time: "20/07/2026", tags: "Đào tạo", comments: 0 },
            { title: "Định hình lại mô hình kinh doanh sau khủng hoảng", desc: "<p>Các bài học đắt giá và hướng đi mới cho doanh nghiệp muốn phục hồi và tăng trưởng đột phá...</p>", imageUrl: "/assets/img/baiVietMau/bai10.png", time: "18/07/2026", tags: "Tin tức", comments: 0 }
        ];
        
        for (let i = 11; i <= 28; i++) {
            initialArticles.push({
                ...initialArticles[(i - 1) % 10],
                title: `${initialArticles[(i - 1) % 10].title} (Copy ${i})`,
            });
        }

        for (const article of initialArticles) {
          await strapi.documents('api::article.article').create({
            data: { ...article, publishedAt: new Date() }
          });
        }
        strapi.log.info(`Seeded ${initialArticles.length} articles.`);
      }

      // 4. Seed Events Data
      const existingEventsCount = await strapi.db.query('api::event.event').count();
      if (existingEventsCount === 0) {
        const initialEvents = [
            { title: "CEO Mentoring #17", date: "14/08/2026 - Hà Nội", desc: "<p>Mentor: Ông Nguyễn Mạnh Hùng, Nguyên Bộ trưởng Bộ Khoa học và Công nghệ</p>", imageUrl: "/assets/img/about/z7934289768980_21088567fa80181416162d7272c561a2-20260628161753-vw10m.jpg" },
            { title: "CEO Mentoring #18", date: "15/08/2026 - TP Hồ Chí Minh", desc: "<p>Mentor: Ông Võ Quang Huệ, Chủ tịch Foundry AI Việt Nam, Nguyên Phó tổng Giám đốc Tập đoàn VinGroup</p>", imageUrl: "/assets/img/about/z7934289805121_b022af287ca855669016fcb915cc851d-20260628161753-8cne3.jpg" },
            { title: "CEO Mentoring #19", date: "21/08/2026 - Hà Nội", desc: "<p>Mentor: Ông Nguyễn Mạnh Hùng, Nguyên Bộ trưởng Bộ Khoa học và Công nghệ</p>", imageUrl: "/assets/img/about/87c9484f52c5d39b8ad4.jpg" },
            { title: "CEO Mentoring #20", date: "28/08/2026 - Hà Nội", desc: "<p>Mentor: Ông Nguyễn Mạnh Hùng, Nguyên Bộ trưởng Bộ Khoa học và Công nghệ</p>", imageUrl: "/assets/img/about/ceo-mentoring-18-20260628161442-tjcbb.jpg" }
        ];

        for (const event of initialEvents) {
          await strapi.documents('api::event.event').create({
            data: { ...event, publishedAt: new Date() }
          });
        }
        strapi.log.info(`Seeded ${initialEvents.length} events.`);
      }

    } catch (err) {
      strapi.log.error('Failed to run bootstrap scripts:', err);
    }
  },
};
