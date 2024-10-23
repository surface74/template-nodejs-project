const validate = (uuid: string): boolean => {
  const regexp = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;
  return typeof uuid === 'string' && regexp.test(uuid);
};

/**
 * Make GUID like 0e71e02d-bf7c-4a2b-b076-f50ac44b0581
 */
const getUUID = (): string => {
  const parts: string[] = [];
  parts.push(getHexRandom(0x10000000, 0xffffffff));
  parts.push(getHexRandom(0x1000, 0xffff));
  parts.push(getHexRandom(0x1000, 0xffff));
  parts.push(getHexRandom(0x1000, 0xffff));
  parts.push(getHexRandom(0x100000000000, 0xffffffffffff));

  const uuid: string = parts.join('-');
  return uuid;
};

const getHexRandom = (min: number, max: number): string => {
  const random = Math.floor(min + Math.random() * (max + 1 - min));
  return random.toString(16);
};

export { validate, getUUID };
