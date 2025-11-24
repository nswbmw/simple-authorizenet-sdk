export type Environment = 'sandbox' | 'production'

export type ProxyOptions =
  | string
  | {
      protocol: 'http' | 'socks'
      host: string
      port: number
      username?: string
      password?: string
    }

export interface AuthorizeNetOptions {
  environment?: Environment
  proxy?: ProxyOptions
}

export default class AuthorizeNet {
  constructor (options?: AuthorizeNetOptions)
  execute (data: any): Promise<any>
}
