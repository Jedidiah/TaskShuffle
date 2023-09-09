import type { APIGatewayEvent, Context } from 'aws-lambda'
import omit from 'lodash/omit'

import { logger } from 'src/lib/logger'
import { listItem } from 'src/services/listItems/listItems'
import { nextItemFromList } from 'src/services/lists/lists'
/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: nextFromList function`)

  const nextItemId = await nextItemFromList({
    id: event.queryStringParameters.id,
  })

  const nextItem = await listItem({ id: nextItemId })

  if (
    nextItem?.webhook?.length > 10 &&
    (nextItem.webhook.startsWith('http://') ||
      nextItem.webhook.startsWith('https://'))
  ) {
    await fetch(nextItem.webhook, { method: 'POST' })
  }

  logger.info(nextItem)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: omit(nextItem, ['webhook', 'createdAt', 'userId']),
    }),
  }
}
