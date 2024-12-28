interface Window {
    electron: {
        ipc: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            send: (channel: string, data: any) => void
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            on: (channel: string, callback: (event: any, data: any) => void) => void
        }
    }
}
