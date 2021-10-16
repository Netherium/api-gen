import { ChildProcess, ChildProcessWithoutNullStreams, fork } from 'child_process';


// eslint-disable-next-line max-len
const setInputsTimeouts = (inputs: string[], childProcess: ChildProcessWithoutNullStreams, inputInitDelay: number, inputInterval: number): NodeJS.Timeout[] => {
  const inputsTimeouts: NodeJS.Timeout[] = [];
  let inputTimeout = inputInitDelay;
  for (const input of inputs) {
    inputsTimeouts.push(setTimeout(() => childProcess.stdin.write(`${input}`), inputTimeout));
    inputTimeout = inputTimeout + inputInterval;
  }
  return inputsTimeouts;
};

const clearInputsTimeouts = (inputsTimer: NodeJS.Timeout[]): void => {
  for (const inputTimer of inputsTimer) {
    clearTimeout(inputTimer);
  }
};


// eslint-disable-next-line max-len
export const cliExecute = (additionalArguments: any = [], inputs: any = [], showOutput = false, processTimer = 30000, inputInitDelay = 1000, inputInterval = 1000): Promise<any> => {
  return new Promise((resolve, reject) => {
    let childProcess: ChildProcessWithoutNullStreams | ChildProcess | null = null;
    childProcess = fork(process.cwd(), {
      stdio: 'pipe',
      execArgv: ['-r', 'ts-node/register/transpile-only', ...additionalArguments],
    });
    childProcess.stdin.setDefaultEncoding('utf-8');
    childProcess.stdout.setEncoding('utf-8');
    let result = '';
    const inputsTimer = setInputsTimeouts(inputs, childProcess, inputInitDelay, inputInterval);
    const childProcessTimer = setTimeout(() => reject('Max timeout reached'), processTimer);

    childProcess.stdout.on('data', (data: any) => {
      result += data.toString();
      if (showOutput) {
        console.info(data);
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
  });
};

export const KEYSTROKE = {
  DOWN: '\x1B\x5B\x42',
  UP: '\x1B\x5B\x41',
  ENTER: '\x0D',
  SPACE: '\x20',
  BACKSPACE: '\x7f'
};
