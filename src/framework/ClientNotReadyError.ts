export default class ClientNotReady extends Error {
    constructor() {
        super('Client not ready. Please await client.ready')
    }
}