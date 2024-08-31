import sign from "./jwt/sign"
import { verify } from "./jwt/verify"

const secret = '##thissecretsouldnotbehere##'
const DAYINMILISECONDS = 24 * 60 * 60 * 1000 //hours, minutes, seconds, miliseconds

const token = sign({
  data: {
    sub: '@jhondoe',
    roles: ['admin']
  },
  exp: Date.now() + DAYINMILISECONDS,
  secret,
})

const decoded = verify({
  token,
  secret
})

console.log(token)
console.log(decoded)
