import initNoirWasm, { acir_read_bytes, compile } from "@noir-lang/noir_wasm";
import initialiseAztecBackend from "@noir-lang/aztec_backend";
import { initialiseResolver } from "@noir-lang/noir-source-resolver";

export const compileCircuit = async () => {
  await initNoirWasm();

  return await fetch("/main.nr")
    .then((r) => r.text())
    .then((code) => {
      initialiseResolver((id: any) => {
        return code;
      });
    })
    .then(() => {
      try {
        const compiled_noir = compile({});
        return compiled_noir;
      } catch (e) {
        console.log("Error while compiling:", e);
      }
    });
};

function hexToUnsignedInt(hex: string): Uint8Array {
  const arr: number[] = [];
  for (let n = 0; n < hex.length; n += 2) {
    arr.push(parseInt(hex.substring(n, n + 2), 16));
  }
  return new Uint8Array(arr);
}

export const getAcir = async () => {
  const { circuit, abi } = await compileCircuit();
  await initialiseAztecBackend();

  let acir_bytes = hexToUnsignedInt(circuit);
  return acir_read_bytes(acir_bytes);
};

export async function exec(acir: any) {
  const worker = new Worker(new URL("./worker.ts", import.meta.url));
  worker.onmessage = (e) => {
    if (e.data instanceof Error) {
      // oh no!
    } else {
      // yey!
    }
  };
  worker.postMessage({ acir, input: { x: 3, y: 4 } });
}

export async function test() {
  getAcir().then(exec);
}
