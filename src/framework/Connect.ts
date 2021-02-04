import Service from "./Service";
import Services from "./Services";
import {ConnectState} from './state'

export default function Connect<T extends Service>(
    key: string
) {
    return (ctor: any) => {
        const lazyLoad = (services: Services) => {
            const service = new ctor(services)
            return service
        }
        ConnectState[key] = lazyLoad
    }
}