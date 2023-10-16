export const getSumOfArray = (arrs: any[]): number => {
  const sum = arrs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)
  return sum
}
