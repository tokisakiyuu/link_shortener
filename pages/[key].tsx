import { GetServerSideProps } from 'next'

export default function RedirectPage() {
  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
    redirect: {
      destination: 'https://baidu.com'
    }
  }
}
