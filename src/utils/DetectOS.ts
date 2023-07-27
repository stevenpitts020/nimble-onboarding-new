import { log } from "../services";

const DetectOS = {
  // is this the best way to do it ?
  getBrowser: () => {
    const ua = navigator.userAgent;
    let tem;
    let M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: "IE", version: tem[1] || "" };
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\bOPR|Edge\/(\d+)/);
      if (tem != null) {
        return { name: "Opera", version: tem[1] };
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];

    tem = ua.match(/version\/(\d+)/i);
    if (tem != null) {
      M.splice(1, 1, tem[1]);
    }
    return {
      name: M[0],
      version: M[1],
    };
  },
  isWebAssemblySupported: () => {
    try {
      if (
        typeof WebAssembly === "object" &&
        typeof WebAssembly.instantiate === "function"
      ) {
        const module = new WebAssembly.Module(
          Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
        );
        if (module instanceof WebAssembly.Module) {
          return (
            new WebAssembly.Instance(module) instanceof WebAssembly.Instance
          );
        }
      }
    } catch (e) {
      log.warn(e, "isWebAssemblySupported");
    }
    return false;
  },
};
export default DetectOS;
