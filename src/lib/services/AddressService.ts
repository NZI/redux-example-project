// API Key	c211e2c1869b4e778759cf0094bebcc2
// API Secret	2fcad4ca5ebe4afcb6fddd98ea2e15eb
// API URL	https://api.addy.co.nz/

// URL: https://api.addressfinder.io/api/nz/address/metadata?format=json&key=TDJQWCAGBL6394ERK7VU&wv=3.24.0&session=11ef1e0d-1953-4f23-84e9-788f244e5419&pxid=2-.1.6.1f.YxF
// https://broadbandmap.nz/availability/-36.8576908667/174.8209025667?address=69%20Reihana%20Street%2C%20Orakei%2C%20Auckland%201071


import Connect from '~/framework/Connect'
import Expose from '~/framework/Expose'
import ServiceNotFoundError from '~/framework/ServiceNotFoundError'
import Service from '~/framework/Service'
import UserService from './UserService'

@Connect('AddressService')
export default class AddressService extends Service {
    @Expose()
    public async searchAddress() {

    }
}