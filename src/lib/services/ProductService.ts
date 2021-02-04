
import Connect from '~/framework/Connect'
import Expose from '~/framework/Expose'
import ServiceNotFoundError from '~/framework/ServiceNotFoundError'
import Service from '~/framework/Service'
import UserService from './UserService'

@Connect('ProductService')
export default class ProductService extends Service {
    @Expose()
    public async getProductsInCart() {
        const userService = this.services.get<UserService>('UserService')
        if (!userService) {
            throw new ServiceNotFoundError('UserService')
        }

        const currentUser = await userService.currentUser()
        const res = await userService.hello()
        return res;
    }

    @Expose()
    public async getCalculation(a: number, b: number) {
        return a + b;
    }
}