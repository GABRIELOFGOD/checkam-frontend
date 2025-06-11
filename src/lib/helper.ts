import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')        // Remove all non-alphanumeric, non-space, non-hyphen chars
    .replace(/[\s_-]+/g, '-')            // Replace spaces, underscores, and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, '');            // Trim hyphens from start and end
}


export const changeSearch = (setState: Dispatch<SetStateAction<string>>, value: ChangeEvent<HTMLInputElement>) => {
  setState(value.target.value);
}
