import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate, useSearchParams } from "react-router";

interface ErrorConfig {
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  suggestions: string[];
}

const Error = ({ code = "404" }: { code?: string }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const errorCode = searchParams.get("code") || code;

  const errorConfigs: Record<string, ErrorConfig> = {
    "400": {
      title: "Bad Request",
      description:
        "The request you made is invalid or malformed. Please check your input and try again.",
      icon: "heroicons:exclamation-triangle",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      suggestions: [
        "Check if all required fields are filled",
        "Verify the format of your input data",
        "Contact support if the problem persists",
      ],
    },
    "401": {
      title: "Unauthorized",
      description:
        "You need to log in to access this page. Please sign in with your account.",
      icon: "heroicons:lock-closed",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      suggestions: [
        "Sign in to your account",
        "Create a new account if you don't have one",
        "Reset your password if you forgot it",
      ],
    },
    "403": {
      title: "Access Forbidden",
      description:
        "You don't have permission to access this resource. Contact an administrator if you believe this is an error.",
      icon: "heroicons:shield-exclamation",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      suggestions: [
        "Check if you have the required permissions",
        "Contact your administrator for access",
        "Sign in with a different account",
      ],
    },
    "404": {
      title: "Page Not Found",
      description:
        "The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.",
      icon: "heroicons:document-magnifying-glass",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      suggestions: [
        "Check the URL for typos",
        "Go back to the previous page",
        "Visit our homepage to find what you need",
      ],
    },
    "500": {
      title: "Internal Server Error",
      description:
        "Something went wrong on our end. We're working to fix this issue. Please try again later.",
      icon: "heroicons:server",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      suggestions: [
        "Refresh the page after a few minutes",
        "Clear your browser cache",
        "Contact support if the issue persists",
      ],
    },
    "503": {
      title: "Service Unavailable",
      description:
        "The service is temporarily unavailable due to maintenance or high traffic. Please try again later.",
      icon: "heroicons:wrench-screwdriver",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      suggestions: [
        "Wait a few minutes and try again",
        "Check our status page for updates",
        "Follow us on social media for announcements",
      ],
    },
  };

  const config = errorConfigs[errorCode] || errorConfigs["404"];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Error Icon and Code */}
        <div className="mb-8">
          <div
            className={`inline-flex h-24 w-24 items-center justify-center rounded-full ${config.bgColor} mb-6`}
          >
            <Icon icon={config.icon} className={`text-4xl ${config.color}`} />
          </div>
          <div className="mb-4 flex items-center justify-center space-x-4">
            <span className={`text-6xl font-bold md:text-8xl ${config.color}`}>
              {errorCode}
            </span>
            <div
              className={`h-16 w-1 md:h-24 ${config.bgColor} rounded-full`}
            ></div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-800 md:text-3xl dark:text-slate-200">
                {config.title}
              </h1>
              <p className="text-sm text-slate-600 md:text-base dark:text-slate-400">
                Error Code: {errorCode}
              </p>
            </div>
          </div>
        </div>

        {/* Error Description */}
        <div className="mb-8">
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {config.description}
          </p>
        </div>

        {/* Suggestions */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
            What you can do:
          </h3>
          <div className="mx-auto grid max-w-lg gap-3">
            {config.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 rounded-lg bg-slate-50 p-3 text-left dark:bg-slate-800/50"
              >
                <div
                  className={`h-6 w-6 rounded-full ${config.bgColor} mt-0.5 flex flex-shrink-0 items-center justify-center`}
                >
                  <span className={`text-xs font-bold ${config.color}`}>
                    {index + 1}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            color="primary"
            size="lg"
            className="min-w-40 bg-gradient-to-r from-blue-600 to-purple-600 font-medium text-white"
            startContent={<Icon icon="heroicons:home" />}
            onPress={() => navigate("/")}
          >
            Go Home
          </Button>

          <Button
            variant="flat"
            color="default"
            size="lg"
            className="min-w-40 font-medium"
            startContent={<Icon icon="heroicons:arrow-left" />}
            onPress={handleGoBack}
          >
            Go Back
          </Button>

          {errorCode === "500" || errorCode === "503" ? (
            <Button
              variant="light"
              color="primary"
              size="lg"
              className="min-w-40 font-medium"
              startContent={<Icon icon="heroicons:arrow-path" />}
              onPress={handleRefresh}
            >
              Refresh Page
            </Button>
          ) : null}
        </div>

        {/* Floating Background Elements */}
        <div className="absolute top-1/4 left-10 -z-10 h-32 w-32 rounded-full bg-blue-200/10 blur-xl dark:bg-blue-500/5"></div>
        <div className="absolute right-10 bottom-1/4 -z-10 h-48 w-48 rounded-full bg-purple-200/10 blur-xl dark:bg-purple-500/5"></div>
      </div>
    </div>
  );
};

export default Error;
