// Utilitaire PocketBase pour l’UI Astro/SSR
import PocketBase from "pocketbase";

// Pour l’admin local : PB_URL= "http://127.0.0.1:8090"
const PB_URL = import.meta.env.PB_URL || "http://127.0.0.1:8090";

/**
 * Retourne un client PocketBase.
 * - En dev, aucune auth requise si la règle "create" = true.
 * - Sinon, tu peux gérer ici une auth Admin/User si besoin.
 */
export async function getPB() {
  const pb = new PocketBase(PB_URL);
  // Exemple si tu veux loguer un admin via variables d'env :
  // if (!pb.authStore.isValid && import.meta.env.PB_ADMIN_EMAIL) {
  //   await pb.admins.authWithPassword(import.meta.env.PB_ADMIN_EMAIL, import.meta.env.PB_ADMIN_PASSWORD);
  // }
  return pb;
}

export default getPB;
