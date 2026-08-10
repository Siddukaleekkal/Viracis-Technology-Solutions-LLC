'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string
  sender: 'client' | 'admin' | 'system'
  text: string
  timestamp: string
}

interface Conversation {
  id: string
  customerName: string
  customerPhone: string
  unreadCount: number
  lastActive: string
  avatar: string
  messages: Message[]
}

const initialConversations: Conversation[] = []

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeConvId, setActiveConvId] = useState<string>('')
  const [inputMessage, setInputMessage] = useState('')

  // Load persistent conversations from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wizardwash_conversations')
      if (saved) {
        const parsed = JSON.parse(saved)
        setConversations(parsed)
        if (parsed.length > 0) setActiveConvId(parsed[0].id)
      }
    } catch (e) {
      console.error('Failed to load conversations:', e)
    }
  }, [])

  const saveConversations = (updated: Conversation[]) => {
    setConversations(updated)
    try {
      localStorage.setItem('wizardwash_conversations', JSON.stringify(updated))
    } catch (e) {
      console.error('Failed to save conversations:', e)
    }
  }

  const activeConv = conversations.find((c) => c.id === activeConvId)

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputMessage.trim() || !activeConvId) return

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'admin',
      text: inputMessage.trim(),
      timestamp: 'Just now',
    }

    const updated = conversations.map((c) => {
      if (c.id === activeConvId) {
        return {
          ...c,
          unreadCount: 0,
          lastActive: 'Just now',
          messages: [...c.messages, newMsg],
        }
      }
      return c
    })

    saveConversations(updated)
    setInputMessage('')
  }

  const applyTemplate = (text: string) => {
    setInputMessage(text)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Wizard Wash Client Messaging Center</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Real-time SMS & Email communication feed for automated follow-ups & customer replies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-xs rounded-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Twilio / SMS Gateway Ready
          </span>
        </div>
      </div>

      {/* Main Two-Column Messaging Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[650px]">
        
        {/* Left Column: Conversations List */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Conversations</h2>
          </div>
          
          {conversations.length === 0 ? (
            <div className="flex-1 p-8 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
              <p className="font-semibold text-slate-600">No active threads</p>
              <p className="text-slate-400">Incoming customer SMS & email messages will appear here.</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {conversations.map((conv) => {
                const isActive = conv.id === activeConvId
                const lastMsg = conv.messages[conv.messages.length - 1]
                return (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setActiveConvId(conv.id)
                      setConversations((prev) =>
                        prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
                      )
                    }}
                    className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                      isActive ? 'bg-slate-100 border-l-4 border-slate-900 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-xs text-slate-900 truncate">{conv.customerName}</p>
                        <span className="text-[10px] text-slate-400 font-medium">{conv.lastActive}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{lastMsg?.text}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{conv.customerPhone}</p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white font-bold text-[10px] rounded shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Right Column: Chat View */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          
          {!activeConv ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
              <p className="font-semibold text-slate-600">Select or start a conversation</p>
              <p className="text-xs">Incoming messages and outbound SMS dispatches will load in this area.</p>
            </div>
          ) : (
            <>
              {/* Active Chat Header */}
              <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                    {activeConv.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{activeConv.customerName}</h3>
                    <p className="text-[11px] text-slate-500">{activeConv.customerPhone} • Active SMS Thread</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Synced to CRM
                  </span>
                </div>
              </div>

              {/* Messages Thread Container */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
                {activeConv.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed shadow-sm ${
                        msg.sender === 'admin'
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-900 border border-slate-200'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}
              </div>

              {/* Quick Template Shortcuts */}
              <div className="p-2.5 px-4 bg-slate-100 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px]">
                <span className="font-semibold text-slate-400 uppercase text-[10px] whitespace-nowrap">Templates:</span>
                <button
                  onClick={() => applyTemplate("Hi! Confirming our upcoming appointment for your house wash.")}
                  className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded whitespace-nowrap font-medium"
                >
                  Confirm Job
                </button>
                <button
                  onClick={() => applyTemplate("Your invoice has been generated and sent to your email. Thank you!")}
                  className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded whitespace-nowrap font-medium"
                >
                  Send Invoice Note
                </button>
                <button
                  onClick={() => applyTemplate("Our technician is en route to your address now!")}
                  className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded whitespace-nowrap font-medium"
                >
                  En Route
                </button>
              </div>

              {/* Message Input Form */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
                <input
                  type="text"
                  placeholder={`Message ${activeConv.customerName}...`}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg shadow-sm shrink-0"
                >
                  Send SMS
                </button>
              </form>
            </>
          )}

        </div>

      </div>

    </div>
  )
}
