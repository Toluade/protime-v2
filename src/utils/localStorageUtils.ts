/* eslint-disable @typescript-eslint/no-explicit-any */
export function setItem<T>(key: string, value: T) {
  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  }
}

export function getItem(
  key: string,
  type: "string" | "array" | "object" = "string"
) {
  const storedItem = localStorage.getItem(key);

  if (storedItem && type === "string") {
    return storedItem as string;
  } else if (storedItem) {
    return JSON.parse(storedItem);
  } else return null;
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}

export function clearStorage() {
  localStorage.clear();
}

export function addToStoredArray<T>(key: string, value: T) {
  const array = getItem(key, "array");
  let newArray;
  if (array) {
    newArray = [value, ...array];
  } else {
    newArray = [value];
  }

  setItem(key, newArray);
}

export function deleteFromStoredArray<T>(key: string, value: T) {
  const array = getItem(key, "array");
  if (!array) return;

  const newArray = array?.filter((item: T) => item !== value);
  setItem(key, newArray);
}
