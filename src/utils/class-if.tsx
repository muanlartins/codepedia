export function classIf(className: string, condition: boolean) {
  return `${condition ? className : ''}`;
}