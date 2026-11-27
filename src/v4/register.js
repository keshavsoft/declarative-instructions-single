import meta from "./meta.js";

const registerGlobal = (instructions) => {
  if (typeof globalThis === "undefined") return;

  globalThis.ks ??= {};
  globalThis.ks.declarative ??= {};
  globalThis.ks.declarative.instructionsSingle = { meta, data: instructions };
};

export default registerGlobal;
