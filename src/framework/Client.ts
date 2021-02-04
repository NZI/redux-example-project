import Service from "./Service";
import ServiceNotFoundError from "./ServiceNotFoundError";
import ClientNotReadyError from "./ClientNotReadyError";
import Services from "./Services";

interface ServiceResponse {
    id: number,
    data: any
}

export class Client extends Services {
    private ws: WebSocket | null = null
    private queue: {
        [key: string]: any
    } = {}
    private _ready: boolean = false
    private ready: Promise<boolean> | null = null
    private messageId = 0
    private servicesAvailable: string[] = []

    constructor(uri: string) {
        super({})
        this.start(uri)
    }

    public Ready() {
        return this.ready
    }

    start(uri: string) {
        this.ws = new WebSocket(uri)
        this._ready = false

        this.ready = new Promise((resolve, reject) => {
            if (!this.ws) return;
            this.ws.onopen = e => {
                if (!this.ws) return;
                this.ws.onmessage = (message => {
                    const {
                        id,
                        success,
                        reason,
                        data
                    } = JSON.parse(message.data)
                    if (id === -1) {
                        this.servicesAvailable = data
                        this._ready = true
                        return resolve(true)
                    } else if (success) {
                        this.queue[id].resolve(data)
                    } else {
                        this.queue[id].reject(reason)
                    }
                    delete this.queue[id]
                    
                })
            }
            this.ws.onclose = () => {
                this.ws = null
                setTimeout(() => this.start(uri), 1000)
            }
        })
    }

    public get<T extends Service>(key: string): T {
        const self = this
        if (!this._ready) {
            throw new ClientNotReadyError()
        }
        if (!this.servicesAvailable.includes(key)) {
            throw new ServiceNotFoundError(key)
        }
        if (!this.services[key]) {
            const request = (className: string | number | symbol, methodName: string | number | symbol, args: any[]) => {
                return new Promise(async (resolve, reject) => {
                    let id = ++this.messageId
                    this.queue[id] = { resolve, reject }
                    if (!this._ready) {
                        await this.ready
                    }
                    let request: ServiceResponse = {
                        id,
                        data: {
                            className,
                            methodName,
                            args
                        }
                    }
                    if (!this.ws) return reject('Server not connected');
                    this.ws.send(JSON.stringify(request))
                })
            }

            this.services[key] = new Proxy({}, {
                get(classTarget, methodName, classReceiver) {
                    return (...args: any[]) => {
                        return request(key, methodName, args)
                    }
                }
            }) as T
        }

        return this.services[key] as T
    }
}