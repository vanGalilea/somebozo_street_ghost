import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import hooks from 'feathers-hooks'
import auth from 'feathers-authentication-client'
import superagent from 'superagent'

const host = 'https://somebozo-api.herokuapp.com'
export const FEATHERS_TOKEN_KEY = 'somebozoB8'

const feathersClient = feathers()
  .configure(hooks())
  .configure(rest(host).superagent(superagent))
  .configure(auth({
    storage: window.localStorage,
    storageKey: FEATHERS_TOKEN_KEY,
  }))

export default feathersClient
