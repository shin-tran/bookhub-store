import { forwardRef } from "react";
import { LinkIcon } from "@heroui/shared-icons";
import { linkAnchorClasses } from "@heroui/theme";
import { type LinkProps, useLink } from "@heroui/react";
import { useNavigate } from "react-router";

interface HeroLinkProps extends Omit<LinkProps, "href"> {
  to?: string;
  href?: string;
}

const HeroLink = forwardRef<HTMLAnchorElement, HeroLinkProps>((props, ref) => {
  const navigate = useNavigate();
  const { to, href, ...restProps } = props;
  const {
    Component,
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon className={linkAnchorClasses} />,
    getLinkProps,
  } = useLink({
    ...restProps,
    href: href,
    ref,
  });

  const linkProps = getLinkProps();

  // Add cursor-pointer when 'to' prop is provided
  const finalClassName = to
    ? `${linkProps.className || ""} cursor-pointer`.trim()
    : linkProps.className;
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to && !href) {
      navigate(to);
    }

    if (restProps.onClick) {
      restProps.onClick(e);
    }
  };
  return (
    <Component {...linkProps} className={finalClassName} onClick={handleClick}>
      <>
        {children}
        {showAnchorIcon && anchorIcon}
      </>
    </Component>
  );
});

export default HeroLink;
