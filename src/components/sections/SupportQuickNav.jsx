import { AlertTriangle, FileText, HeartHandshake, HelpCircle, ShieldCheck } from 'lucide-react'

const icons = { HelpCircle, FileText, ShieldCheck, HeartHandshake, AlertTriangle }

const SupportQuickNav = ({ sections, activeId, onNavigate }) => (
  <nav className="lg:sticky lg:top-44 bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">Quick Navigation</p>

    <ul className="flex flex-col gap-1">
      {sections.map((section) => {
        const Icon = icons[section.icon]
        const isActive = activeId === section.id

        return (
          <li key={section.id}>
            <button
              onClick={() => onNavigate(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                isActive ? 'bg-green-800 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {section.label}
            </button>
          </li>
        )
      })}
    </ul>
  </nav>
)

export default SupportQuickNav
