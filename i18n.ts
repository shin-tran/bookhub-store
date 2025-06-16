import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./src/assets/locales/en/translation.json";
import translationVI from "./src/assets/locales/en/translation.json";

const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // Kết nối i18next với react-i18next
  .init({
    resources, // Danh sách các ngôn ngữ
    lng: "vi", // Ngôn ngữ mặc định khi khởi động
    fallbackLng: "en", // Ngôn ngữ sẽ được sử dụng nếu ngôn ngữ hiện tại không có key cần tìm
    detection: {
      order: ["localStorage", "navigator"], // Ưu tiên localStorage, sau đó đến ngôn ngữ trình duyệt
      caches: ["localStorage"], // Nơi lưu lựa chọn
    },
    interpolation: {
      escapeValue: false, // React đã có sẵn cơ chế chống XSS
    },
  });

export default i18n;
