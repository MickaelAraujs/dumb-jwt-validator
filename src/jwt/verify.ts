import { generateSignature } from "./generate-signature"

interface IVerifyOptions {
  secret: string,
  token: string
}

export function verify({
  secret,
  token,
}: IVerifyOptions) {
  const [headerSent, payloadSent, signatureSent] = token.split('.')

  const signature = generateSignature({
    header: headerSent,
    payload: payloadSent,
    secret,
  })

  if (signature !== signatureSent) throw new Error('Invalid JWT Token.')

  const decodedPayload = JSON.parse(
    Buffer.from(payloadSent, 'base64url')
      .toString('utf-8')
  )

  if (decodedPayload.exp < Date.now()) throw new Error('Expired Token.')

  return decodedPayload
}
