import express from 'express'
import path from 'path';
import ProductService from '~/lib/services/ProductService'
import Server from '~/framework/Server'
import UserService from '~/lib/services/UserService';
import ThoughtService from '~/lib/services/ThoughtService';

async function main() {

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/frontend', express.static(path.join(process.cwd(), 'dist/frontend')));
    app.use(express.static(path.join(process.cwd(), 'dist/static')));

    // Start the server
    const listen = app.listen(3030).on('listening', () =>
        console.log('Server listening on http://localhost:3030')
    );
    const server = new Server(listen)

    server.add(ProductService)
    server.add(UserService)
    server.add(ThoughtService)

    const productService = server.get<ProductService>('ProductService')

    const res = await productService.getProductsInCart()

}

main()
