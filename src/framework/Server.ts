import Services from "./Services";
import { ConnectState, ExposeState } from './state';
import ws, { ServerOptions } from 'ws';
import Service from "./Service";
import http from 'http'

export default class Server extends Services {
    private wss: ws.Server

    constructor(listen: http.Server) {
        super(ConnectState)

        this.wss = new ws.Server({ noServer: true })
        this.wss.on('connection', client => {
            client.send(JSON.stringify({
                id: -1,
                data: Object.keys(this.services)
            }))
            client.on('message', async(message) => {
                const packet = JSON.parse(message.toString())
                const {
                    id,
                    data: {
                        className,
                        methodName,
                        args
                    } } = packet
                if (className in this.services && methodName in ExposeState[className]) {
                    const service: any = this.get(className)
                    const data = await service[methodName](...args)
                    client.send(JSON.stringify({
                        id,
                        success: true,
                        data
                    }))
                } else {
                    client.send(JSON.stringify({
                        id,
                        success: false,
                        reason: "Method doesn't exist"
                    }))
                }
            })
        })

        listen.on('upgrade', (request, socket, head) => {
            this.wss.handleUpgrade(request, socket, head, socket => {
                this.wss.emit('connection', socket, request);
            });
        });

    }

    public add(T: typeof Service) {
        return new T(this)
    }
}
