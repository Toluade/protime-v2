export const listOfNumbers = (highest: number) => {
  let array: Array<number> = [];
  for (let i = 0; i < highest + 1; i++) {
    array = [...array, i];
  }

  return array;
};
