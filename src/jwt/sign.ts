import { generateSignature } from './generate-signature'

interface ISignOptions {
  data: Record<string, any>
  exp: number
  secret: string
}

function encodeToBase64(data: Record<string, any>) {
  return Buffer
    .from(JSON.stringify(data))
    .toString('base64url')
}

export default function sign({
  data,
  exp,
  secret,
}: ISignOptions) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  const payload = {
    ...data,
    iat: Date.now(),
    exp,
  }

  const base64EncodedHeader = encodeToBase64(header)
  const base64EncodedPayload = encodeToBase64(payload)
  const signature = generateSignature({
    header: base64EncodedHeader,
    payload: base64EncodedPayload,
    secret,
  })

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`
}
