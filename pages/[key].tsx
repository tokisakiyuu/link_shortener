import { GetServerSideProps } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function RedirectPage() {
  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const key = ctx.resolvedUrl.substring(1)
  const result = await prisma.linkMap.findUnique({ where: { key } })
  if (!result) return {
    props: {},
    notFound: true
  }
  return {
    props: {},
    redirect: {
      destination: result.link
    }
  }
}
