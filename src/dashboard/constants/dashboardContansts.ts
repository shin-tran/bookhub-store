export const UsersTableColumns = [
  { name: "ID", uid: "_id" },
  { name: "FULL NAME", uid: "fullName", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "PHONE NUMBER", uid: "phone" },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "STATUS", uid: "isActive", sortable: true },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const INITIAL_VISIBLE_USERS_COLUMNS = [
  "fullName",
  "role",
  "email",
  "isActive",
  "createdAt",
  "actions",
];
