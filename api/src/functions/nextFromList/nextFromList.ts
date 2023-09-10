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

  const { tags = '', id } = event.queryStringParameters

  const nextItems = []

  for await (const tag of tags.split(',')) {
    logger.info({ tag })
    const itemId = await nextItemFromList({
      id,
      tag: tag.length > 0 ? tag : undefined,
    })
    const item = await listItem({ id: itemId })
    logger.info({ item })
    nextItems.push(item)
  }

  // const nextItems = tags.split(',').map(async (tag) => {
  //   logger.info({ tag })
  //   const itemId = await nextItemFromList({
  //     id,
  //     tag: tag.length > 0 ? tag : undefined,
  //   })
  //   const item = await listItem({ id: itemId })
  //   logger.info({ item })
  //   return await item
  // })

  // const nextItemId = await nextItemFromList({ id })

  // const nextItem = await listItem({ id: nextItemId })
  // for await (const item of nextItems) {
  nextItems.forEach((item) => {
    if (
      item?.webhook?.length > 10 &&
      (item?.webhook?.startsWith('http://') ||
        item?.webhook?.startsWith('https://'))
    ) {
      const webhookWithTokens = item.webhook
        .replaceAll('{title}', encodeURIComponent(item.title))
        .replaceAll('{description}', encodeURIComponent(item.description))
        .replaceAll('{url}', encodeURIComponent(item.url))
      fetch(webhookWithTokens, { method: 'POST' })
    }
  })

  logger.info(nextItems)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: nextItems.map((item) =>
        omit(item, ['webhook', 'createdAt', 'userId'])
      ),
    }),
  }
}
