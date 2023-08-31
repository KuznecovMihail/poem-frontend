import { DRAFT, PUBLISHED, WAITING } from "./types/newsAdminFilterStatusTypes";

export function draft() {
  return { type: DRAFT, payload: { statusFilter: 24, nameFilter: "Черновик" } };
}
export function published() {
  return {
    type: PUBLISHED,
    payload: { statusFilter: 40, nameFilter: "Опубликовано" },
  };
}
export function waiting() {
  return {
    type: WAITING,
    payload: { statusFilter: 39, nameFilter: "Ожидает публикации" },
  };
}
