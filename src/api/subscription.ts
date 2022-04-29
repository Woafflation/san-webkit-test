import { mutate, query } from '@/api'
import { Cache } from '@/api/cache'

const PAYMENT_CARD_QUERY = `{
  card: fetchDefaultPaymentInstrument {
    brand
    last4
    expMonth
    expYear
  }
}`

type PaymentCardQuery = SAN.API.Query<'card', undefined | SAN.PaymentCard>

const noop = () => {}
const accessor = ({ card }) => card
export const queryPaymentCard = () =>
  query<PaymentCardQuery>(PAYMENT_CARD_QUERY).then(accessor).catch(noop)
export const clearPaymentCardQuery = () => Cache.delete(PAYMENT_CARD_QUERY)

// ----------------------------------

const UPDATE_PAYMENT_CARD_MUTATION = (cardToken: string) => `mutation {
    updateDefaultPaymentInstrument(cardToken: "${cardToken}")
  }`

export const mutateUpdatePaymentCard = (cardToken: string) =>
  mutate<any>(UPDATE_PAYMENT_CARD_MUTATION(cardToken))
