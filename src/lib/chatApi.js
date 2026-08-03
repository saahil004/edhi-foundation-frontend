const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL

const CONVERSATION_ID_KEY = 'chat_conversation_id'

export function getStoredConversationId() {
  return localStorage.getItem(CONVERSATION_ID_KEY)
}

export function setStoredConversationId(id) {
  if (id) {
    localStorage.setItem(CONVERSATION_ID_KEY, id)
  } else {
    localStorage.removeItem(CONVERSATION_ID_KEY)
  }
}

/**
 * @param {string} question
 * @param {string|null} conversationId
 * @returns {Promise<{answer: string, sources: Array, conversation_id: string}>}
 */
export async function sendChatMessage(question, conversationId) {
  const response = await fetch(`${CHAT_API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ question, conversation_id: conversationId ?? null }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(extractErrorMessage(response.status, data))
  }

  return data
}

export async function getConversation(conversationId) {
  const response = await fetch(`${CHAT_API_URL}/conversations/${conversationId}`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) return null

  return response.json()
}

// The backend uses one error envelope for most statuses, but a distinct
// (slowapi-provided) shape specifically for 429s — see the RAG backend's
// API contract doc.
function extractErrorMessage(status, data) {
  if (status === 429) {
    return "You're sending messages a bit too fast — please wait a moment and try again."
  }
  if (status === 422) {
    return data?.error?.message ?? 'Please enter a question first.'
  }
  return data?.error?.message ?? 'Something went wrong. Please try again.'
}
