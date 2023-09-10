export class Log {
    logLevel: number;

    constructor ( logLevelArg: number ) {
        this.logLevel = logLevelArg;
    }

    
    public Info(message: string) {
        if (this.logLevel < 1) return;
        console.log("[INFO] :", message)
    }

    public Warn(message: string) {
        if (this.logLevel < 2) return;
        console.log("[WARN] :", message)
    }

    public Error(message: string) {
        if (this.logLevel < 3) return;
        console.log("[ERROR] :", message)
    }
}