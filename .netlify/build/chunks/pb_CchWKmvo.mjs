import PocketBase from 'pocketbase';

const PB_URL = "http://127.0.0.1:8090";
function createPB() {
  return new PocketBase(PB_URL);
}
async function getPB() {
  return createPB();
}

export { createPB as c, getPB as g };
