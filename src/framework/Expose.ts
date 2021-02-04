import Service from "./Service";
import { ExposeState } from "./state";


export default function Expose<T extends Service>() {
    return function (
        target: T,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const { constructor: { name } } = target
        if (!(name in ExposeState)) {
            ExposeState[name] = {}
        }
        ExposeState[name][propertyKey] = true
    };
}
