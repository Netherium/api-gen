import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

// tslint:disable-next-line:max-line-length
const setInputsTimeouts = (inputs: string[], childProcess: ChildProcessWithoutNullStreams, inputInitDelay: number, inputInterval: number) => {
  const inputsTimeouts: NodeJS.Timeout[] = [];
  let inputTimeout = inputInitDelay;
  for (const input of inputs) {
    inputsTimeouts.push(setTimeout(() => childProcess.stdin.write(`${input}`), inputTimeout));
    inputTimeout = inputTimeout + inputInterval;
  }
  return inputsTimeouts;
}

const clearInputsTimeouts = (inputsTimer: NodeJS.Timeout[]) => {
  for (const inputTimer of inputsTimer) {
    clearTimeout(inputTimer);
  }
}

// tslint:disable-next-line:max-line-length
export const cliExecute = (cmd: any, inputs: any = [], showOutput = false, processTimer = 30000, inputInitDelay = 1000, inputInterval = 1000) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(cmd, {stdio: 'pipe', shell: true});
    childProcess.stdin.setDefaultEncoding('utf-8');
    childProcess.stdout.setEncoding('utf-8');
    let result = '';
    const inputsTimer = setInputsTimeouts(inputs, childProcess, inputInitDelay, inputInterval);
    const childProcessTimer = setTimeout(() => reject('Max timeout reached'), processTimer);

    childProcess.stdout.on('data', (data: any) => {
      result += data.toString();
      if (showOutput) {
        console.log(data);
      }
    });
    childProcess.on('close', (code: any) => {
      clearInputsTimeouts(inputsTimer);
      clearTimeout(childProcessTimer);
      resolve({data: result, code});
    });
    childProcess.on('error', (err: any) => {
      clearInputsTimeouts(inputsTimer);
      clearTimeout(childProcessTimer);
      resolve({error: err, code: childProcess.exitCode});
    });
  })
}

export const KEYSTROKE = {
  DOWN: '\x1B\x5B\x42',
  UP: '\x1B\x5B\x41',
  ENTER: '\x0D',
  SPACE: '\x20',
  BACKSPACE: '\x7f'
};
