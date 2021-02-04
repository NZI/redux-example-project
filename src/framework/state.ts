import Service from "./Service"
import Services from "./Services"

export const ConnectState: {
    [key: string]: (Service | ((services: Services) => any))
} = {}

export const ExposeState: {
    [key: string]: { [key: string]: boolean }
} = {}