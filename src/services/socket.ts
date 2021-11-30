import { evolve, pick, pipe } from "ramda";

class BackOff {

  public current: number = 0;
  public timer: number | null = null;
  public max: number = 10;
  public delay: number = 100;
  public fn: Function | null = null;

  constructor(config: { [key: string]: any } = {}) {
    Object.assign(this, config);
  }

  public stop(): void {
    this.reset({ max: 0, fn: null });
  }

  public reset(config: any = {}): void {
    this.timer && clearTimeout(this.timer);
    Object.assign(this, { ...config, current: 0, timer: null });
  }

  public retry(): void {
    const { timer, current, delay, max, fn } = this;

    if (!fn || timer || current > max) {
      return;
    }

    const onTimeout = () => {
      fn();
      this.timer = null;
    };

    Object.assign(this, {
      current: current + 1,
      timer: setTimeout(onTimeout, delay * Math.pow(2, current))
    });
  }
}

export class Socket {

  private url: string | null = null;
  private connection: WebSocket | null = null;
  private queue: any[] = [];
  private dispatch!: (msg: any) => any;
  private messages: { result?: any; error?: any; open?: any; close?: any } = {};
  private retryState!: BackOff;
  private connectCallback: any;

  constructor({ url, dispatch, onConnect }: { url: string, dispatch: (val: any) => any, onConnect?: any }) {
    Object.assign(this, {
      url,
      dispatch,
      retryState: new BackOff({ fn: this.start.bind(this) }),
      connectCallback: onConnect
    });
  }

  public start(): void {
    try {
      console.log('[Socket.start] Connecting...');
      this.connection = this.config(new WebSocket(this.url!));
    } catch (e) {
      console.error('[Socket.start]', e);
    }
  }

  public stop(): void {
    this.retryState.stop();

    try {
      this.connection && this.connection.close();
    } catch (e) { }
  }

  private config(socket: WebSocket): WebSocket {
    socket.addEventListener('open', () => {
      this.retryState.reset({ key: socket });
      this.connectCallback && this.connectCallback(this);
      if (!this.queue.length) { return; }
      this.queue.forEach(this.send.bind(this));
      this.queue = [];
    });

    socket.addEventListener('message', pipe(
      pick(['data', 'origin', 'timeStamp']),
      evolve({ data: JSON.parse }),
      this.dispatch
    ) as any);

    socket.addEventListener('close', (e) => {
      this.retryState.retry();
      console.log('[Socket.close]', e);
    });

    socket.addEventListener('error', (event) => {
      this.retryState.retry();
      console.error('[Socket.error]', event);
    });

    return socket;
  }

  public send(message: any): void {
    const { queue, connection, messages: { error } } = this;

    if (!connection || connection.readyState !== WebSocket.OPEN) {
      queue.push(message);
      if (queue.length > 1000) { this.queue = queue.slice(1); }
      return;
    }

    try {
      connection.send(JSON.stringify(message));
    } catch (e) {
      console.error('[Socket.send]', error);
    }
  }
}
