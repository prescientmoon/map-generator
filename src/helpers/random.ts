export const random = (max: number) => Math.floor(max * Math.random())
export const choice = <T>(arr: T[]) => arr[random(arr.length)]
