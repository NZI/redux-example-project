export default class ServiceNotFoundError extends Error {
    constructor(service: string) {
        super(`Service ${service} not found`)
    }
}