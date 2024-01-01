export const MENU = ["HOME", "POSTS", "CATEGORIES", "DATA"] as const;

export type SelectedMenu = (typeof MENU)[number];
