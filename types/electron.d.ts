declare module 'electron' {
    interface IpcRenderer {
        processEnv: typeof process.env;
        userDataUrl: string;
    }
}
