

export const objectToArray = (obj, indexName) => Object.keys(obj).reduce((arr, key) => [...arr, { [indexName]: key, ...obj[key] }], []);