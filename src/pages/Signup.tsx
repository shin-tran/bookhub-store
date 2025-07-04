import { BSLogo } from "@assets/svg/BSLogo";
import HeroLink from "@components/HeroLink";
import {
  addToast,
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
} from "@heroui/react";
import { useSignupUser } from "@hooks/useUsers";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const signupMutation = useSignupUser();

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await signupMutation.mutateAsync({
      fullName: String(data.fullName),
      email: String(data.email),
      password: String(data.password),
      phone: String(data.phone),
    });
    if (res?.data) {
      addToast({ title: t("signup.onSignupSuccess"), color: "success" });
      form.reset();
      navigate("/login");
    } else {
      addToast({
        title: "Error Signup",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        color: "danger",
        timeout: 2000,
      });
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col items-center pb-6">
          <BSLogo size={100} />
          <p className="text-small text-default-500 mt-3">
            {t("signup.tagline")}
          </p>
        </div>
        <Form className="flex flex-col gap-3" onSubmit={handleSignupSubmit}>
          <Input
            isRequired
            classNames={{
              base: "-mb-[2px]",
              inputWrapper:
                "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
            label={t("signup.fullnameLabel")}
            name="fullName"
            placeholder={t("signup.fullnamePlaceholder")}
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            classNames={{
              base: "-mb-[2px]",
              inputWrapper:
                "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
            label={t("signup.emailLabel")}
            name="email"
            placeholder={t("signup.emailPlaceholder")}
            type="email"
            variant="bordered"
            errorMessage={t("signup.emailErrorMessage")}
          />
          <Input
            isRequired
            classNames={{
              base: "-mb-[2px]",
              inputWrapper:
                "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
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
            label={t("signup.passwordLabel")}
            name="password"
            placeholder={t("signup.passwordPlaceholder")}
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <Input
            isRequired
            classNames={{
              inputWrapper: "rounded-t-none",
            }}
            label={t("signup.phoneNumberLabel")}
            name="phone"
            placeholder={t("signup.phoneNumberPlaceholder")}
            type="tel"
            variant="bordered"
          />
          <Checkbox isRequired className="py-4" size="sm">
            {t("signup.agreeWith")}&nbsp;
            <HeroLink className="relative z-[1]" href="" size="sm" isExternal>
              {t("signup.terms")}
            </HeroLink>
            &nbsp; {t("signup.and")}&nbsp;
            <HeroLink className="relative z-[1]" href="" size="sm" isExternal>
              {t("signup.privacyPolicy")}
            </HeroLink>
          </Checkbox>
          <Button
            color="primary"
            className="w-full"
            type="submit"
            isLoading={signupMutation.isPending}
          >
            {t("signup.signUpButton")}
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">
            {t("signup.or")}
          </p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            {t("signup.signUpWithGoogle")}
          </Button>
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            {t("signup.signUpWithGithub")}
          </Button>
        </div>
        <p className="text-small text-center">
          {t("signup.haveAccount")}&nbsp;
          <HeroLink to={"/login"}>{t("signup.logInLink")}</HeroLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
