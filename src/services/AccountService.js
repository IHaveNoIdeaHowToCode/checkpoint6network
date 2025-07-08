import { AppState } from '../AppState.js'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(accountData) {
    const response = await api.put('/account', accountData)
    logger.log('GOT ACCOUNT DATA', response.data)
    const account = new Account(response.data)
    AppState.account = account
  }
}

export const accountService = new AccountService()
