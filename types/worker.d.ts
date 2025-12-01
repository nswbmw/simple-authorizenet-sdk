export type Environment = 'sandbox' | 'production'

export interface AuthorizeNetOptions {
  environment?: Environment
}

export default class AuthorizeNet {
  constructor (options?: AuthorizeNetOptions)
  execute<T = any> (data: any): Promise<T>
}
