import Services from './Services'

export default class Service {
    protected readonly services: Services

    constructor(services: Services) {
        this.services = services
    }
}