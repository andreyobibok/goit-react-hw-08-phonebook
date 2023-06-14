export function filterAxiosError(rawAxiosError) {
  if (rawAxiosError.name === 'AxiosError') {
    const { name, code, message } = rawAxiosError;
    const serializedError = { name, code, message };
    if (rawAxiosError.response) {
      serializedError.status = rawAxiosError.response.status;
      serializedError.statusText = rawAxiosError.response.statusText;
      serializedError.data = rawAxiosError.response.data;
    }
    return serializedError;
  } else {
    return rawAxiosError;
  }
}

export function serializeAxiosData(rawData, level = 1, maxLevel = 3) {
  if (typeof rawData === 'object' && rawData !== null) {
    if (level > maxLevel) {
      return null;
    }

    const flatData = {};
    const rawKeys = Object.keys(rawData);
    for (const key of rawKeys) {
      if (['string', 'number', 'bool'].includes(typeof rawData[key])) {
        flatData[key] = rawData[key];
      } else if (typeof rawData[key] === 'object' && rawData[key] !== null) {
        flatData[key] = serializeAxiosData(rawData[key], level + 1, maxLevel);
      }
    }

    return flatData;
  }

  return null;
}
