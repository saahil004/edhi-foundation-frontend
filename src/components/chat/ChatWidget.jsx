import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BotMessageSquare, Send, X } from 'lucide-react'
import {
  getConversation,
  getStoredConversationId,
  sendChatMessage,
  setStoredConversationId,
} from '../../lib/chatApi.js'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm the Edhi Foundation assistant. Ask me about our services, appeals, or how to donate.",
  sources: [],
}

const STARTER_PROMPTS = ['What services do you offer?', 'How can I donate?', 'How do I contact you?']

const bubbleVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
}

// The RAG backend's ingestion pipeline sometimes falls back to a raw source
// filename/chunk-index (e.g. "galleryData.js #0", "src\\components\\...jsx")
// as the citation title when it ingests frontend source files, instead of a
// human-readable one. Those aren't meaningful to a visitor and leak internal
// file structure, so filter them out client-side until the backend's titling
// is fixed at the source.
const isPresentableSourceTitle = (title) =>
  Boolean(title) &&
  !/\.(jsx?|tsx?)\b/i.test(title) &&
  !/[\\/]/.test(title) &&
  !/^title\s*[-—]/i.test(title) &&
  !/#\d+$/.test(title)

const ChatBubble = ({ message, onSourceClick, disabled }) => {
  const isUser = message.role === 'user'
  const presentableSources = (message.sources ?? []).filter((s) => isPresentableSourceTitle(s.title)).slice(0, 2)

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser ? 'bg-green-800 text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {presentableSources.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5 border-t border-black/10 pt-2">
            {presentableSources.map((source) => (
              <button
                key={source.document_id}
                type="button"
                disabled={disabled}
                onClick={() => onSourceClick(source.title)}
                className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium text-gray-600 transition-colors hover:bg-green-800 hover:text-white disabled:pointer-events-none disabled:opacity-50"
              >
                {source.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [conversationId, setConversationId] = useState(() => getStoredConversationId())
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Restore a previous conversation (if one is saved) once on mount, so a
  // page reload doesn't drop the visitor mid-conversation.
  useEffect(() => {
    if (!conversationId) return

    getConversation(conversationId).then((conversation) => {
      if (!conversation || conversation.messages.length === 0) {
        // Stale/expired ID (backend no longer knows it) — don't keep reusing it.
        setStoredConversationId(null)
        setConversationId(null)
        return
      }
      setMessages(
        conversation.messages.map((m) => ({ role: m.role, content: m.content, sources: m.sources ?? [] }))
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, sending, open])

  const sendQuestion = async (question) => {
    if (!question || sending) return

    setMessages((prev) => [...prev, { role: 'user', content: question, sources: [] }])
    setSending(true)
    setError('')

    try {
      const res = await sendChatMessage(question, conversationId)
      setConversationId(res.conversation_id)
      setStoredConversationId(res.conversation_id)
      setMessages((prev) => [...prev, { role: 'assistant', content: res.answer, sources: res.sources ?? [] }])
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const question = input.trim()
    setInput('')
    sendQuestion(question)
  }

  const showStarterPrompts = messages.length === 1 && !sending

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="group fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-200"
      >
        <span className="flex h-full w-full items-center justify-center rounded-full bg-white text-gray-900 transition-all duration-150 ease-in group-hover:bg-transparent group-hover:text-white">
          {open ? <X size={24} /> : <BotMessageSquare size={24} />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 flex h-[32rem] max-h-[70vh] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-green-800 px-4 py-3 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <BotMessageSquare size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-bold leading-tight">Edhi Foundation Assistant</p>
                <p className="text-xs text-green-100/80">Ask about our services & appeals</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <AnimatePresence initial={false}>
                {messages.map((message, i) => (
                  <ChatBubble
                    key={i}
                    message={message}
                    disabled={sending}
                    onSourceClick={(title) => sendQuestion(`Tell me more about ${title}`)}
                  />
                ))}
              </AnimatePresence>

              {showStarterPrompts && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendQuestion(prompt)}
                      className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-800 transition-colors hover:bg-teal-100"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}

              {sending && (
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                </div>
              )}
            </div>

            {error && <div className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700">{error}</div>}

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-gray-200 p-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                maxLength={1000}
                disabled={sending}
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-gray-400 disabled:bg-gray-50"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-800 text-white transition-colors hover:bg-green-900 disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget
