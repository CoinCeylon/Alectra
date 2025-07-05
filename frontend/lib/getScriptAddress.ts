import type { Script } from "lucid-cardano";
import { getLucid } from "./lucid";
import { loadPlutusScript } from "./loadContract";

export async function getScriptAddress(walletName = "lace") {
  const lucid = await getLucid(walletName);
  const script: Script = await loadPlutusScript();

  const address = lucid.utils.validatorToAddress(script);
  return address;
}
