// source: https://stackoverflow.com/a/52171480/8339960
const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch: number; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

// source: https://stackoverflow.com/a/64072170/8339960
const digit = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+$";
const toB64 = (num: number) => {
  return num
    .toString(2) // binary repr
    .split(/(?=(?:.{6})+(?!.))/g) // groups of 6 bits
    .map((v) => digit[parseInt(v, 2)]) // map to 
    .join("");
}

const seed = cyrb53("persist-redux-storage");
export const uniqueKey = (sliceName: string) => {
  return `${sliceName}.${toB64(cyrb53(sliceName, seed))}`;
};