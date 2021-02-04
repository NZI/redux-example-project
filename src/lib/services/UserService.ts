
import Connect from '~/framework/Connect'
import Expose from '~/framework/Expose'
import Service from '~/framework/Service'

class User {

}

@Connect('UserService')
export default class UserService extends Service {
    
    @Expose()
    async getUser(apiKey: string): Promise<User> {
        return new User()
    }


    @Expose()
    hello() {
        return '123'
    }

    async currentUser(): Promise<User | null> {
        return null
    }
}