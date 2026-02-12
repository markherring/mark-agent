import { useState } from 'react'

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void
  questions?: Record<string, string[]>
}

export function SuggestedQuestions({ onSelectQuestion, questions }: SuggestedQuestionsProps) {
  const firstCategory = questions ? Object.keys(questions)[0] : 'Experience & Background'
  const [expandedCategory, setExpandedCategory] = useState<string | null>(firstCategory)

  // Show loading state if no questions provided
  if (!questions || Object.keys(questions).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Suggested Questions
        </h3>
        <p className="text-sm text-gray-500">Loading questions...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        Suggested Questions
      </h3>

      <div className="space-y-1.5">
        {Object.entries(questions).map(([category, questionList]) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full px-3 py-2 text-left font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center"
            >
              <span className="text-sm">{category}</span>
              <svg
                className={`w-4 h-4 transition-transform ${expandedCategory === category ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedCategory === category && (
              <div className="border-t border-gray-200 bg-gray-50">
                {questionList.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => onSelectQuestion(question)}
                    className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-white hover:text-mark-blue transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          💡 <strong>Tip:</strong> Ask follow-up questions to dive deeper into any topic.
          Mark's responses adapt to your context and interests.
        </p>
      </div>
    </div>
  )
}
