import PocketBase from "pocketbase";

const PB_URL = import.meta.env.PB_URL || "http://127.0.0.1:8090";

export function createPB() {
  return new PocketBase(PB_URL);
}

export async function getPB() {
  return createPB();
}

export default getPB;
