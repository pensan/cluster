class Logger {
    public debug() : void {
        console.log('[DEBUG]', this.toArray(arguments).join(' '));     
    }
    
    private toArray(args) : Array<any> {
        return Array.prototype.slice.call(args)
    }
}

export = new Logger();