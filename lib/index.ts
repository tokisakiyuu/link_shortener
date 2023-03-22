import { NextApiRequest } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function getFullURL(req: NextApiRequest) {
  const metaKeySymbol = Reflect.ownKeys(req).find(s => String(s) === 'Symbol(NextRequestMeta)') as string
  const nextReqMeta = Reflect.get(req, metaKeySymbol)
  return nextReqMeta.__NEXT_INIT_URL as string
}

export async function restoreLink(short: string) {
  const { pathname } = new URL(short)
  const key = pathname.substring(1)
  const result = await prisma.linkMap.findUnique({ where: { key } })
  if (!result) return null
  return result.link
}