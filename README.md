## simple-authorizenet-sdk

Simple AuthorizeNet SDK for Node.js

### No proxy

```js
const AuthorizeNet = require('simple-authorizenet-sdk')
const authorizeNetClient = new AuthorizeNet({
  environment: 'sandbox' // sandbox|production
})

;(async () => {
  const res = await authorizeNetClient.execute({
    createTransactionRequest: {
      merchantAuthentication: {
        name: 'xxx',
        transactionKey: 'xxx'
      },
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount: '10',
        payment: {
          creditCard: {
            cardNumber: '4242424242424242',
            expirationDate: '2029-04',
            cardCode: '999'
          }
        },
        order: { invoiceNumber: 'INV-1' },
        lineItems: {
          lineItem: [
            {
              itemId: '1',
              name: 'apple',
              description: 'Red Fuji Apple',
              quantity: '10',
              unitPrice: 1
            }
          ]
        },
        customer: { email: 'test@example.com' },
        billTo: {
          firstName: 'Ellen',
          lastName: 'Johnson',
          address: '12 Main Street',
          city: 'Pecan Springs',
          state: 'TX',
          zip: '44628',
          country: 'US',
          phoneNumber: '1234567890',
          email: 'test@example.com'
        },
        shipTo: {
          firstName: 'Ellen',
          lastName: 'Johnson',
          address: '12 Main Street',
          city: 'Pecan Springs',
          state: 'TX',
          zip: '44628',
          country: 'US'
        },
        customerIP: '164.70.95.228'
      }
    }
  })
  console.dir(res, { depth: 10 })
})().catch(console.error)
```

### Proxy

```js
const AuthorizeNet = require('simple-authorizenet-sdk')
const authorizeNetClient = new AuthorizeNet({
  environment: 'sandbox',
  proxy: {
    protocol: 'http', // http|socks
    host: '127.0.0.1',
    port: 1234,
    username: 'admin',
    password: '123456'
  }
})

;(async () => {
  const res = await authorizeNetClient.execute({
    createTransactionRequest: {
      merchantAuthentication: {
        name: 'xxx',
        transactionKey: 'xxx'
      },
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount: '10',
        payment: {
          creditCard: {
            cardNumber: '4242424242424242',
            expirationDate: '2029-04',
            cardCode: '999'
          }
        },
        order: { invoiceNumber: 'INV-1' },
        lineItems: {
          lineItem: [
            {
              itemId: '1',
              name: 'apple',
              description: 'Red Fuji Apple',
              quantity: '10',
              unitPrice: 1
            }
          ]
        },
        customer: { email: 'test@example.com' },
        billTo: {
          firstName: 'Ellen',
          lastName: 'Johnson',
          address: '12 Main Street',
          city: 'Pecan Springs',
          state: 'TX',
          zip: '44628',
          country: 'US',
          phoneNumber: '1234567890',
          email: 'test@example.com'
        },
        shipTo: {
          firstName: 'Ellen',
          lastName: 'Johnson',
          address: '12 Main Street',
          city: 'Pecan Springs',
          state: 'TX',
          zip: '44628',
          country: 'US'
        },
        customerIP: '164.70.95.228'
      }
    }
  })
  console.dir(res, { depth: 10 })
})().catch(console.error)
```
