export const MENU = ["HOME", "POSTS", "CATEGORIES", "MAPS", "DATA"] as const;

export type SelectedMenu = (typeof MENU)[number];
