export const UsersTableColumns = [
  { name: "ID", uid: "_id" },
  { name: "FULL NAME", uid: "fullName", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "PHONE NUMBER", uid: "phone" },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "STATUS", uid: "isActive", sortable: true },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const BooksTableColumns = [
  { name: "ID", uid: "_id" },
  { name: "BOOK NAME", uid: "mainText", sortable: true },
  { name: "AUTHOR", uid: "author", sortable: true },
  { name: "PRICE", uid: "price" },
  { name: "SOLD", uid: "sold", sortable: true },
  { name: "QUANTITY", uid: "quantity", sortable: true },
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
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

export const INITIAL_VISIBLE_BOOKS_COLUMNS = [
  "mainText",
  "author",
  "category",
  "price",
  "quantity",
  "createdAt",
  "actions",
];
