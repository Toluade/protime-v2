/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-globals */

const workercode = () => {
  let timerInterval: any;
  let time = 0;
  self.onmessage = function ({ data: { turn } }) {
    if (turn === "off" || timerInterval) {
      clearInterval(timerInterval);
      time = 0;
    }
    if (turn === "on") {
      timerInterval = setInterval(() => {
        time = 1000;
        self.postMessage({ time });
      }, 1000);
    }
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
