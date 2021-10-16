export const camelCase = (str: string): string => {
  const output = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return output.substr(0, 1).toLowerCase() + output.substr(1);
};

export const pascalCase = (str: string): string => {
  const output = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return output.substr(0, 1).toUpperCase() + output.substr(1);
};

export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z0-9])[\s_.]?([A-Z])/g, '$1-$2')
    .replace(/([a-z0-9])[\s_.]([a-z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
};
