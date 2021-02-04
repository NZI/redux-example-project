import { Client } from "~/framework/Client"

let client: Client | null = null

export default async function(): Promise<Client> {
    if (!client) {
        client = new Client('ws://localhost:3030')
    }
    await client.Ready()

    return client
}