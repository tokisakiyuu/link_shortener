import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
import { getFullURL } from '@/lib'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ip = req.socket.remoteAddress || ''
  const { origin } = new URL(getFullURL(req))
  const { link } = req.query
  if (!link) {
    return res.status(403).send('你倒是把你要缩短的链接通过link查询参数传给我呀🙏')
  }
  if (Array.isArray(link)) {
    const result = await Promise.all(
      link.map(async l => ({
        short: await createShortenLink(origin, l, ip),
        full: l
      }))
    )
    return res.status(200).json(result)
  } else {
    const result = await createShortenLink(origin, link, ip)
    return res.status(200).json([
      { short: result, full: link }
    ])
  }
}

async function createShortenLink(origin: string, link: string, ip: string): Promise<string> {
  const existMapRecord = await prisma.linkMap.findFirst({ where: { link } })
  if (existMapRecord) {
    return `${origin}/${existMapRecord.key}`
  }
  const key = await createKey()
  await prisma.linkMap.create({
    data: {
      link,
      key,
      user_ip: ip
    }
  })
  return `${origin}/${key}`
}

async function createKey(): Promise<string> {
  const key = nanoid(10)
  if ( !(await prisma.linkMap.findUnique({ where: { key } })) ) {
    return key
  }
  return await createKey()
}