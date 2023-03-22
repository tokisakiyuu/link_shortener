import type { NextApiRequest, NextApiResponse } from 'next'
import { restoreLink } from '@/lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { short } = req.query
  if (!short) {
    return res.status(403).send('请把要复原的链接通过short查询参数传给我')
  }
  if (Array.isArray(short)) {
    const result = await Promise.all(
      short.map(async l => ({
        short: l,
        full: await restoreLink(l)
      }))
    )
    return res.status(200).json(result)
  } else {
    const result = await restoreLink(short)
    return res.status(200).json([
      { short, full: result }
    ])
  }
}