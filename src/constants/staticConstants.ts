export const STATIC_CONSTANTS = {
  NAVIGATION_ITEMS: [
    { path: "/", icon: "heroicons:home", key: "home" },
    { path: "/books", icon: "heroicons:book-open", key: "books" },
    { path: "/about", icon: "heroicons:information-circle", key: "about" },
  ],

  USER_MENU_ITEMS: [
    {
      icon: "heroicons:user",
      action: "profile",
      roles: ["USER"],
      path: "/profile",
      key: "profile",
    },
    {
      icon: "heroicons:squares-2x2",
      action: "dashboard",
      roles: ["ADMIN"],
      path: "/admin",
      key: "dashboard",
    },
    {
      icon: "heroicons:shopping-bag",
      action: "/checkout",
      roles: ["USER"],
      path: "/checkout",
      key: "checkout",
    },
    {
      icon: "heroicons:heart",
      action: "favorites",
      roles: ["USER"],
      path: "/favorites",
      key: "favorites",
    },
    {
      icon: "heroicons:cog-6-tooth",
      action: "settings",
      roles: ["USER"],
      path: "/settings",
      key: "settings",
    },
    {
      icon: "heroicons:arrow-right-on-rectangle",
      action: "logout",
      isDanger: true,
      roles: ["USER"],
      key: "logout",
    },
  ],
} as const;
