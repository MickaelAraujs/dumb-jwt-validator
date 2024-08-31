import { createHmac } from 'node:crypto'

interface SignatureOptions {
  secret: string
  header: string
  payload: string
}

export function generateSignature({
  header,
  payload,
  secret,
}: SignatureOptions) {
  const hmac = createHmac('sha256', secret)
  return hmac.update(`${header}.${payload}`).digest('base64url')
}
