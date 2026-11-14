import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uz: {
    translation: {
      "welcome": "Xush kelibsiz",
      "login": "Kirish",
      "phone": "Telefon raqam",
      "password": "Parol",
      "admin_panel": "Admin Boshqaruvi",
      "doctor_panel": "Doktor Paneli",
      "patient_panel": "Bemor Paneli",
      "choose_lang": "Tilni tanlang",
      "logout": "Chiqish"
    }
  },
  ru: {
    translation: {
      "welcome": "Добро пожаловать",
      "login": "Войти",
      "phone": "Номер телефона",
      "password": "Пароль",
      "admin_panel": "Панель Администратора",
      "doctor_panel": "Панель Доктора",
      "patient_panel": "Панель Пациента",
      "choose_lang": "Выберите язык",
      "logout": "Выйти"
    }
  },
  en: {
    translation: {
      "welcome": "Welcome",
      "login": "Login",
      "phone": "Phone number",
      "password": "Password",
      "admin_panel": "Admin Dashboard",
      "doctor_panel": "Doctor Panel",
      "patient_panel": "Patient Panel",
      "choose_lang": "Choose language",
      "logout": "Logout"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "uz", // Standart til
    interpolation: { escapeValue: false }
  });

export default i18n;
