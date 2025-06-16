import React, { useEffect } from "react";
import { Button, Input, Checkbox, Divider, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import useLoginStore from "@stores/useLoginStore";
import { BSLogo } from "@assets/svg/BSLogo";
import HeroLink from "@components/HeroLink";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { isVisible, setIsVisible } = useLoginStore();

  useEffect(() => {
    const theme = localStorage.getItem("heroui-theme");
    if (theme && theme !== "system") {
      document.documentElement.classList.add(theme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      document.documentElement.classList.add(defaultTheme);
    }
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col items-center pb-6">
          <BSLogo size={100} />
          <p className="text-small text-default-500 mt-3">
            {t("login.tagline")}
          </p>
        </div>
        <Form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            isRequired
            label={t("login.emailLabel")}
            name="email"
            placeholder={t("login.emailPlaceholder")}
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                )}
              </button>
            }
            label={t("login.passwordLabel")}
            name="password"
            placeholder={t("login.passwordPlaceholder")}
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              {t("login.rememberMe")}
            </Checkbox>
            <HeroLink className="text-default-500" to="#" size="sm">
              {t("login.forgotPassword")}
            </HeroLink>
          </div>
          <Button className="w-full" color="primary" type="submit">
            {t("login.signIn")}
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">{t("login.or")}</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            {t("login.continueWithGoogle")}
          </Button>
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            {t("login.continueWithGithub")}
          </Button>
        </div>
        <p className="text-small text-center">
          {t("login.needAccount")}&nbsp;
          <HeroLink to="/signup">{t("login.signUp")}</HeroLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
