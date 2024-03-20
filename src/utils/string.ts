export function upperFirst(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1)}`
}

export function camelCaseToKebabCase(input: string): string {
  return input.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`).replace(/^-/, '')
}

export function kebabCaseToCamelCase(input: string): string {
  return upperFirst(input.toLowerCase().replace(/-([a-z])/g, (_, match) => match.toUpperCase()))
}
