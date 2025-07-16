import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function unslugify(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}


export const changeSearch = (setState: Dispatch<SetStateAction<string>>, value: ChangeEvent<HTMLInputElement>) => {
  setState(value.target.value);
}
