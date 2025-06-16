import { Icon } from "@iconify/react";

interface BSLogoProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "size"> {
  size?: number;
  width?: number;
  height?: number;
}

export const BSLogo = ({
  size = 32,
  width,
  height,
  className = "",
  ...props
}: BSLogoProps) => {
  const iconSize = Math.max(size * 0.4, 16);
  const titleSize = Math.max(size * 0.3, 12);
  const subtitleSize = Math.max(size * 0.25, 10);

  const containerStyle = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`text-foreground ${width || height ? "" : "w-fit"} flex flex-col items-center justify-center transition-all duration-300 ease-in-out select-none ${className} `
        .trim()
        .replace(/\s+/g, " ")}
      style={containerStyle}
      {...props}
    >
      {/* Main Title */}
      <div
        className="leading-none font-bold tracking-tight"
        style={{ fontSize: `${titleSize}px` }}
      >
        BookHub
      </div>

      {/* Book Icon */}
      <Icon
        icon="oi:book"
        className="text-primary my-1"
        style={{ fontSize: `${iconSize}px` }}
      />

      {/* Subtitle */}
      <div
        className="leading-none font-semibold tracking-wide opacity-80"
        style={{ fontSize: `${subtitleSize}px` }}
      >
        STORE
      </div>
    </div>
  );
};
