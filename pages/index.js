import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex overflow-hidden text-black bg-gray-300 rounded-lg gap-1">
          <img src={session?.user?.image} alt="" className="w-6 h-6" />
          <span className="px-2 ">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )
}
