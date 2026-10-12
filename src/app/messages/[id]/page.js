import ChatThread from '@/components/chat/ChatThread'

export const metadata = { title: 'চ্যাট' }

export default async function ThreadPage({ params }) {
  const { id } = await params
  return <ChatThread conversationId={id} />
}
