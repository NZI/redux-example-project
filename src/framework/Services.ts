import Service from './Service'
import ServiceNotFoundError from './ServiceNotFoundError'

type ServiceCollection = {
    [key: string]: Service | ((services: Services) => Service)
}

export default class Services {
    protected services: ServiceCollection = {}

    constructor(services: ServiceCollection) {
        this.services = services
    }

    public get<T extends Service>(key: string): T{
        if (!(key in this.services)) {
            throw new ServiceNotFoundError(key)
        }
        
        const service = this.services[key] as (services: Services) => Service

        if (service instanceof Function) {
            this.services[key] = service(this)
        }

        return this.services[key] as T
    }
}