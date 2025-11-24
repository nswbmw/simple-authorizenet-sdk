## simple-authorizenet-sdk

Simple Authorize.net SDK for Node.js.

### Install

```sh
$ npm i simple-authorizenet-sdk --save
```

### Example

```js
import AuthorizeNet from 'simple-authorizenet-sdk'

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

  /*
  {
    transactionResponse: {
      responseCode: '1',
      authCode: 'EI4FK2',
      avsResultCode: 'Y',
      cvvResultCode: 'P',
      cavvResultCode: '2',
      transId: '80048381034',
      refTransID: '',
      transHash: '',
      testRequest: '0',
      accountNumber: 'XXXX4242',
      accountType: 'Visa',
      messages: [
        { code: '1', description: 'This transaction has been approved.' }
      ],
      transHashSha2: '',
      SupplementalDataQualificationIndicator: 0,
      networkTransId: 'EPDDD6DPHK80P0DMVM2IAGD'
    },
    messages: {
      resultCode: 'Ok',
      message: [ { code: 'I00001', text: 'Successful.' } ]
    }
  }
  */
  console.log(res)
})().catch(console.error)
```
