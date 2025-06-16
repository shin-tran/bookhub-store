import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button, Input, Checkbox, Divider, Form } from "@heroui/react";
import useSignupStore from "@stores/useSignupStore";
import { BSLogo } from "@assets/svg/BSLogo";
import HeroLink from "@components/HeroLink";

const Signup = () => {
  const { isVisible, setIsVisible } = useSignupStore();
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

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

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col items-center pb-6">
          <BSLogo size={100} />
          <p className="text-small text-default-500 mt-3">
            Create an account to get started
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >
          <Input
            isRequired
            classNames={{
              base: "-mb-[2px]",
              inputWrapper:
                "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
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
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
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
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <Input
            isRequired
            classNames={{
              base: "-mb-[2px]",
              inputWrapper:
                "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
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
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
          />
          <Input
            isRequired
            classNames={{
              inputWrapper: "rounded-t-none",
            }}
            label="Phone number"
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
            variant="bordered"
          />
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <HeroLink className="relative z-[1]" href="" size="sm" isExternal>
              Terms
            </HeroLink>
            &nbsp; and&nbsp;
            <HeroLink className="relative z-[1]" href="" size="sm" isExternal>
              Privacy Policy
            </HeroLink>
          </Checkbox>
          <Button color="primary" className="w-full" type="submit">
            Sign Up
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
            Sign Up with Google
          </Button>
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            Sign Up with Github
          </Button>
        </div>
        <p className="text-small text-center">
          Already have an account?&nbsp;
          <HeroLink to={"/login"}>Log In</HeroLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
