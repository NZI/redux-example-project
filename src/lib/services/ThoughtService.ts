import Connect from "~/framework/Connect";
import Expose from "~/framework/Expose";
import Service from "~/framework/Service";
import { ThoughtType } from "~/lib/interfaces/ThoughtType";
import { Thought } from "../interfaces/Thought";

/**
 * ThoughtService:
 *  - think
 *    - 
 */

interface ISerialized {

}

interface UserSerialized extends ISerialized {
    id: string
}

abstract class Serializable<T> {
    abstract serialize(): T;
}

class UserSerializeService extends Serializable<UserSerialized> {
    public id: string = '';

    serialize(): UserSerialized {
        let s: UserSerialized 

        s = {
            id: '123',
        }

        return s;
    }

    deserialise() {

    }
}

@Connect('ThoughtService')
export default class ThoughtService extends Service {
    @Expose()
    public async think(thought: string): Promise<Thought[]> {
        if (thought.length <= 0) {
            return [];
        }

        const thoughts = []

        // thoughts.push({
        //     type: ThoughtType.INFO,
        //     value: 'our website is currently under construction'
        // })

        thoughts.push({
            type: ThoughtType.WEBSITE,
            value: `http://${thought}.com`
        })

        thoughts.push({
            type: ThoughtType.PHONE,
            value: `phone / mobile number for '${thought}'`
        })

        thoughts.push({
            type: ThoughtType.INTERNET,
            value: `Fibre internet @ '${thought}'`
        })

        thoughts.push({
            type: ThoughtType.NETWORK,
            value: `cat6 network install @ '${thought}'`
        })

        thoughts.push({
            type: ThoughtType.COMPUTER,
            value: `Build me a '${thought}' computer`
        })

        thoughts.push({
            type: ThoughtType.INFO,
            value: `Contact me about '${thought}'`
        })

        return thoughts
    }
}