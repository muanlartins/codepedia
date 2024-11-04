const isClient = typeof window !== "undefined";

export const getItem = (key: string) => {
  if (isClient)
    return localStorage.getItem(key);
}

export const setItem = (key: string, value: string) => {
  if (isClient)
    localStorage.setItem(key, value);
}