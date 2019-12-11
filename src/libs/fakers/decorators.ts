export function fakeDecorator(...args: any[]) {
  console.log(args)
  return function(...kwargs: any[]) {
    console.log(kwargs)
  }
}
