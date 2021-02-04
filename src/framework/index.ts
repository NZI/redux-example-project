import Connect from './Connect'
import Expose from './Expose'
import Service from './Service'
import ServiceNotFoundError from './ServiceNotFoundError'

class User {

}

@Connect('UserService')
class UserService extends Service {
    @Expose()
    hello() {
        return '123'
    }

    async currentUser(): Promise<User | null> {
        return null
    }
}

@Connect('ProductService')
class ProductService extends Service {
    @Expose()
    public async getProductsInCart() {
        const userService = await this.services.get<UserService>('UserService')
        if (!userService) {
            throw new ServiceNotFoundError('UserService')
        }

        console.log(userService)

        const currentUser = await userService.currentUser()
        const res = await userService.hello()
        return res;
    }
}

async function main() {
    // const server = new Server({port: 3030})

    // server.add(ProductService)

    // const productService = await server.get<ProductService>('ProductService')

    // if (!productService) {
    //     return
    // }

    // const res = await productService.getProductsInCart()
    // console.log({res})

}

main()

