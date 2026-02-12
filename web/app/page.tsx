export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">MARK HERRING</h1>
          <p className="text-xl text-gray-600 mb-2">Interactive Interview Agent</p>
          <p className="text-sm text-gray-500">AI-Powered Resume Experience</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 leading-relaxed">
            <strong>Technically fluent marketing leader</strong> with 30+ years building GTM engines
            for technical infrastructure companies. Proven track record scaling revenue from $1M → $30M ARR,
            doubling qualified pipeline to $53M, and building hybrid PLG + enterprise motions.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Available Interview Contexts:</h2>

          <a
            href="/kore.ai"
            className="block p-4 border-2 border-gray-300 rounded-lg hover:border-mark-blue hover:bg-blue-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Kore.ai</h3>
            <p className="text-sm text-gray-600">Enterprise AI platform for conversational AI</p>
          </a>

          <a
            href="/descript"
            className="block p-4 border-2 border-gray-300 rounded-lg hover:border-mark-blue hover:bg-blue-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Descript</h3>
            <p className="text-sm text-gray-600">All-in-one video and audio editing platform</p>
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            This is an AI-powered interview experience. Select a company context above to begin.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            You'll need the access password provided by Mark to proceed.
          </p>
        </div>
      </div>
    </div>
  )
}
