import {
  setup_generic_prover_and_verifier,
  create_proof,
} from "@noir-lang/barretenberg/dest/client_proofs";
import initialiseAztecBackend from "@noir-lang/aztec_backend";

onmessage = async (event) => {
  try {
    await initialiseAztecBackend();
    const { acir, input } = event.data;
    const [prover] = await setup_generic_prover_and_verifier(acir);
    const proof = await create_proof(prover, acir, input);
    postMessage(proof);
  } catch (er) {
    postMessage(er);
  } finally {
    close();
  }
};
