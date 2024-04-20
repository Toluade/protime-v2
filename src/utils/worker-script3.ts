const workercode = () => {
  const timers: { [key: string]: NodeJS.Timeout | null } = {};

  self.onmessage = function ({ data: { id, turn } }) {
    if (turn === "off" && timers[id]) {
      clearInterval(timers[id]!);
      //   delete timers[id];
      timers[id] = null;
    }
    if (turn === "on" && !timers[id]) {
      timers[id] = setInterval(() => {
        self.postMessage({ id, time: 1000 });
      }, 1000);
    }
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
