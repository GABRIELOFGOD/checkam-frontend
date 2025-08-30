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

export function isError(err: unknown): err is Error {
  return err instanceof Error;
}

export function timeAgo(inputDate: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - inputDate.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  // const diffYears = Math.floor(diffDays / 365);

  if (diffSec < 60) {
    return `${diffSec} second${diffSec === 1 ? "" : "s"} ago`;
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  } else if (diffHr < 24) {
    return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
  } else {
    // Return full date if ≥ 1 year
    return inputDate.toLocaleDateString();
  }
}

