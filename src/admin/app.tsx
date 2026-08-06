import type { StrapiApp } from '@strapi/strapi/admin';
import AuthLogo from './extensions/logo.png';
import MenuLogo from './extensions/logo.png';
import favicon from './extensions/logo.png';

export default {
  config: {
    auth: {
      logo: AuthLogo,
    },
    head: {
      favicon: favicon,
    },
    locales: ['vi'],
    translations: {
      en: {
        'Auth.form.welcome.title': 'Chào mừng đến CEO Mentoring',
        'Auth.form.welcome.subtitle': 'Đăng nhập vào bảng quản trị',
        'app.components.LeftMenu.navbrand.title': 'CEO Mentoring',
        'app.components.LeftMenu.navbrand.workplace': 'Quản trị viên',
      },
      vi: {
        'Auth.form.welcome.title': 'Chào mừng đến CEO Mentoring',
        'Auth.form.welcome.subtitle': 'Đăng nhập vào bảng quản trị',
        'app.components.LeftMenu.navbrand.title': 'CEO Mentoring',
        'app.components.LeftMenu.navbrand.workplace': 'Quản trị viên',
      }
    },
    menu: {
      logo: MenuLogo,
    },
    theme: {
      light: {
        colors: {
          primary100: '#fcf4e4',
          primary200: '#f8e4c0',
          primary500: '#e60000', // Red branding
          primary600: '#cc0000',
          primary700: '#002b5e', // Dark blue branding
          buttonPrimary500: '#002b5e', // Buttons in blue
          buttonPrimary600: '#001a3c',
        },
      },
      dark: {
        colors: {
          primary100: '#fcf4e4',
          primary200: '#f8e4c0',
          primary500: '#e60000', // Red branding
          primary600: '#cc0000',
          primary700: '#002b5e', // Dark blue branding
          buttonPrimary500: '#002b5e', // Buttons in blue
          buttonPrimary600: '#001a3c',
        }
      }
    },
    tutorials: false,
    notifications: { releases: false },
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
