import { Script } from "lucid-cardano";

export async function loadPlutusScript(): Promise<Script> {
  const res = await fetch("/plutus.json");
  const plutusJson = await res.json();

  const validator = plutusJson.validators.find(
    (v: { title: string }) =>
      v.title === "proposal_validator.proposal_validator.spend"
  );

  if (!validator) {
    throw new Error("Validator not found in plutus.json");
  }

  const script: Script = {
    type: "PlutusV2",
    script: validator.compiledCode,
  };

  return script;
}

