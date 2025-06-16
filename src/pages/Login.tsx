import React, { useEffect } from "react";
import { Button, Input, Checkbox, Form, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import useLoginStore from "@stores/useLoginStore";
import { BSLogo } from "@assets/svg/BSLogo";
import HeroLink from "@components/HeroLink";

const Login = () => {
  const { isVisible, setIsVisible } = useLoginStore();

  useEffect(() => {
    const theme = localStorage.getItem("heroui-theme");
    if (theme) {
      document.documentElement.classList.add(theme);
    } else {
      // Set default theme if none is stored
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      document.documentElement.classList.add(defaultTheme);
      localStorage.setItem("heroui-theme", defaultTheme);
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
            Log in to your account to continue
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
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
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <HeroLink className="text-default-500" to="#" size="sm">
              Forgot password?
            </HeroLink>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            Continue with Github
          </Button>
        </div>
        <p className="text-small text-center">
          Need to create an account?&nbsp;
          <HeroLink to="/signup">Sign Up</HeroLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
