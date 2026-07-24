'use client'

import { useState } from 'react'
import { createClient } from '../../lib/supabase/client'
export default function DashboardPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  
  const [result, setResult] = useState<{
    title?: string
    description?: string
    htmlCode?: string
  } | null>(null)
  
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  // 1. Generate Site
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    setError(null)
    setSaveStatus(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate website')
      }

      setResult(data.data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // 2. Copy Code to Clipboard
  const handleCopyCode = () => {
    if (!result?.htmlCode) return
    navigator.clipboard.writeText(result.htmlCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 3. Download HTML File
  const handleDownload = () => {
    if (!result?.htmlCode) return
    const blob = new Blob([result.htmlCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${result.title ? result.title.toLowerCase().replace(/\s+/g, '-') : 'site'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // 4. Save Site to Supabase Database
  const handleSaveSite = async () => {
    if (!result?.htmlCode) return
    setSaving(true)
    setSaveStatus(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('You must be logged in to save sites.')
      }

      const { error: dbError } = await supabase.from('sites').insert({
        user_id: user.id,
        title: result.title || 'Untitled Site',
        description: result.description || '',
        html_code: result.htmlCode,
      })

      if (dbError) throw dbError

      setSaveStatus('Site saved successfully!')
    } catch (err: any) {
      setSaveStatus(err.message || 'Failed to save site')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
          SawaSite AI
        </h1>
        <div className="text-sm text-slate-400">Dashboard</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Controls */}
        <div className="lg:col-span-4 bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-slate-200">Generate Website</h2>
          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                Describe the website you want to build
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A modern landing page for an organic coffee shop..."
                rows={5}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-semibold rounded-lg text-sm transition"
            >
              {loading ? 'Generating site...' : 'Generate Site'}
            </button>
          </form>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
              {error}
            </div>
          )}

          {result?.description && (
            <div className="mt-2 p-4 bg-slate-900/60 rounded-lg border border-slate-800 flex flex-col gap-3">
              <div>
                <h3 className="text-xs font-semibold text-emerald-400 mb-1">
                  {result.title}
                </h3>
                <p className="text-xs text-slate-400">{result.description}</p>
              </div>

              <button
                onClick={handleSaveSite}
                disabled={saving}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-medium rounded-md transition text-slate-200"
              >
                {saving ? 'Saving...' : '💾 Save to Supabase'}
              </button>

              {saveStatus && (
                <p className="text-xs text-center text-emerald-400">{saveStatus}</p>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Live Preview Window & Export Actions */}
        <div className="lg:col-span-8 bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col min-h-[500px]">
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-slate-500 ml-2 font-mono">Live Preview</span>
            </div>

            {/* Export Actions */}
            {result?.htmlCode && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded transition"
                >
                  {copied ? '✓ Copied!' : 'Copy Code'}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-2.5 py-1 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium transition"
                >
                  Download .html
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 bg-white relative">
            {result?.htmlCode ? (
              <iframe
                title="Generated Site"
                srcDoc={`
                  <!text/html;charset=utf-8>
                  <html>
                    <head>
                      <script src="https://cdn.tailwindcss.com"></script>
                    </head>
                    <body>${result.htmlCode}</body>
                  </html>
                `}
                className="w-full h-full border-none min-h-[500px]"
              />
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-center text-slate-400">
                <p className="text-sm">
                  Enter a prompt on the left and click **Generate Site** to render your preview here.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}