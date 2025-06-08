
// Enterprise logging utility
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  userId?: string;
  sessionId?: string;
  component?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logLevel: LogLevel = (process.env.VITE_LOG_LEVEL as LogLevel) || 'info';
  
  private levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  private shouldLog(level: LogLevel): boolean {
    return this.levels[level] >= this.levels[this.logLevel];
  }

  private createLogEntry(level: LogLevel, message: string, data?: any, meta?: Partial<LogEntry>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      ...meta,
    };
  }

  private formatConsoleOutput(entry: LogEntry): void {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const prefix = `[${timestamp}] [${entry.level.toUpperCase()}]`;
    
    switch (entry.level) {
      case 'debug':
        console.debug(prefix, entry.message, entry.data);
        break;
      case 'info':
        console.info(prefix, entry.message, entry.data);
        break;
      case 'warn':
        console.warn(prefix, entry.message, entry.data);
        break;
      case 'error':
        console.error(prefix, entry.message, entry.data);
        break;
    }
  }

  private async sendToExternalService(entry: LogEntry): Promise<void> {
    // In production, send to logging service (Sentry, LogRocket, etc.)
    if (!this.isDevelopment && entry.level === 'error') {
      try {
        // TODO: Implement external logging service integration
        // await fetch('/api/logs', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(entry),
        // });
      } catch (error) {
        console.error('Failed to send log to external service:', error);
      }
    }
  }

  debug(message: string, data?: any, meta?: Partial<LogEntry>): void {
    if (!this.shouldLog('debug')) return;
    
    const entry = this.createLogEntry('debug', message, data, meta);
    this.formatConsoleOutput(entry);
  }

  info(message: string, data?: any, meta?: Partial<LogEntry>): void {
    if (!this.shouldLog('info')) return;
    
    const entry = this.createLogEntry('info', message, data, meta);
    this.formatConsoleOutput(entry);
  }

  warn(message: string, data?: any, meta?: Partial<LogEntry>): void {
    if (!this.shouldLog('warn')) return;
    
    const entry = this.createLogEntry('warn', message, data, meta);
    this.formatConsoleOutput(entry);
    this.sendToExternalService(entry);
  }

  error(message: string, error?: Error | any, meta?: Partial<LogEntry>): void {
    if (!this.shouldLog('error')) return;
    
    const data = error instanceof Error 
      ? { message: error.message, stack: error.stack, name: error.name }
      : error;
    
    const entry = this.createLogEntry('error', message, data, meta);
    this.formatConsoleOutput(entry);
    this.sendToExternalService(entry);
  }

  // Utility methods for common logging scenarios
  userAction(action: string, userId?: string, data?: any): void {
    this.info(`User action: ${action}`, data, { userId, component: 'UserAction' });
  }

  apiCall(endpoint: string, method: string, duration?: number, status?: number): void {
    const message = `API ${method} ${endpoint}`;
    const data = { duration, status };
    
    if (status && status >= 400) {
      this.error(message, data, { component: 'API' });
    } else {
      this.info(message, data, { component: 'API' });
    }
  }

  performance(metric: string, value: number, unit: string = 'ms'): void {
    this.info(`Performance: ${metric}`, { value, unit }, { component: 'Performance' });
  }
}

export const logger = new Logger();
export default logger;
