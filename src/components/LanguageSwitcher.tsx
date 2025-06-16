import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'en', name: 'English' },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      {languages.map((lng) => (
        <button
          key={lng.code}
          onClick={() => changeLanguage(lng.code)}
          // Làm nổi bật ngôn ngữ đang được chọn
          style={{ fontWeight: i18n.language === lng.code ? 'bold' : 'normal' }}
          disabled={i18n.language === lng.code}
        >
          {lng.name}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;