import { useState } from 'react'

interface ToolbarProps {
  activeTab: 'html' | 'css' | 'js'
  onTabChange: (tab: 'html' | 'css' | 'js') => void
  darkMode: boolean
  onDarkModeToggle: () => void
  showConsole: boolean
  onConsoleToggle: () => void
  onDeploy: () => void
  onExport: () => void
  onOpenGallery: () => void
  onShare: () => void
  onAIOpen: () => void
  onOpenSettings?: () => void
  lang: 'en' | 'ar'
  onToggleLang: () => void
  dir: 'ltr' | 'rtl'
  onToggleDir: () => void
}

const tabs = [
  { id: 'html' as const, label: 'HTML', color: 'text-orange-400' },
  { id: 'css' as const, label: 'CSS', color: 'text-blue-400' },
  { id: 'js' as const, label: 'JS', color: 'text-yellow-400' },
]

/* --- SVG icon components --- */

function IconGrid() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function IconSparkles() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
      <path d="M18 14l.7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7z" />
    </svg>
  )
}

function IconTerminal() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  )
}

function IconSun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconText() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="17" y1="10" x2="3" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="17" y1="14" x2="3" y2="14" />
      <line x1="21" y1="18" x2="3" y2="18" />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function IconLink() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function IconRocket() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function IconChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

/* --- Dropdown primitive --- */

interface DropdownProps {
  label: string
  icon: React.ReactNode
  open: boolean
  onToggle: () => void
  onClose: () => void
  children: React.ReactNode
}

function Dropdown({ label, icon, open, onToggle, onClose, children }: DropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        onBlur={(e) => {
          // Close on blur if focus moved outside the dropdown entirely
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
            onClose()
          }
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          open
            ? 'bg-slate-700/80 text-white ring-1 ring-slate-600/50'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <IconChevronDown />
        </span>
      </button>
      {open && (
        <>
          {/* Click-outside trap */}
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute top-full mt-1.5 right-0 min-w-[170px] bg-slate-800/95 backdrop-blur-lg border border-slate-700/60 rounded-xl p-1.5 shadow-2xl shadow-black/40 z-50">
            {children}
          </div>
        </>
      )}
    </div>
  )
}

function DropdownItem({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors flex items-center gap-2.5"
    >
      {children}
    </button>
  )
}

/* --- Main Toolbar --- */

export default function Toolbar({
  activeTab, onTabChange, darkMode, onDarkModeToggle,
  showConsole, onConsoleToggle, onDeploy, onExport,
  onOpenGallery, onShare, onAIOpen, onOpenSettings,
  lang, onToggleLang, dir, onToggleDir,
}: ToolbarProps) {
  const rtl = lang === 'ar'
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name))
  }

  const closeDropdowns = () => setOpenDropdown(null)

  return (
    <header
      className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border-b border-slate-700/50 px-4 py-2 flex items-center gap-1.5 shrink-0 select-none"
      dir={dir}
    >
      {/* Logo + Brand */}
      <div className="flex items-center gap-2.5 mr-1">
        <span className="text-lg font-bold text-violet-400 leading-none">&lt;/&gt;</span>
        <span className="font-bold text-sm text-white hidden sm:inline tracking-tight">
          {rtl ? 'كود زست' : 'CodeZest'}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-slate-700/40 mx-1" />

      {/* Tab buttons */}
      <div className="flex gap-0.5 bg-slate-800/40 rounded-lg p-0.5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === tab.id
                ? `${tab.color} bg-slate-700/70 shadow-sm`
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Tools dropdown — Templates, AI, Console */}
      <Dropdown
        label={rtl ? 'أدوات' : 'Tools'}
        icon={<IconGrid />}
        open={openDropdown === 'tools'}
        onToggle={() => toggleDropdown('tools')}
        onClose={closeDropdowns}
      >
        <DropdownItem onClick={() => { onOpenGallery(); closeDropdowns() }}>
          <IconGrid />
          {rtl ? 'القوالب' : 'Templates'}
        </DropdownItem>
        <DropdownItem onClick={() => { onAIOpen(); closeDropdowns() }}>
          <IconSparkles />
          AI
        </DropdownItem>
        <DropdownItem onClick={() => { onConsoleToggle(); closeDropdowns() }}>
          <IconTerminal />
          {rtl ? 'المخرجات' : 'Console'}
        </DropdownItem>
      </Dropdown>

      {/* View dropdown — Language, Direction, Dark mode */}
      <Dropdown
        label={rtl ? 'عرض' : 'View'}
        icon={<IconText />}
        open={openDropdown === 'view'}
        onToggle={() => toggleDropdown('view')}
        onClose={closeDropdowns}
      >
        <DropdownItem onClick={() => { onToggleLang(); closeDropdowns() }}>
          <IconGlobe />
          {lang === 'ar' ? 'English' : 'العربية'}
        </DropdownItem>
        <DropdownItem onClick={() => { onToggleDir(); closeDropdowns() }}>
          <IconText />
          {dir === 'rtl' ? 'LTR' : 'RTL'}
        </DropdownItem>
        <DropdownItem onClick={() => { onDarkModeToggle(); closeDropdowns() }}>
          {darkMode ? <IconSun /> : <IconMoon />}
          {darkMode ? (rtl ? 'وضع النهار' : 'Light Mode') : (rtl ? 'وضع الليل' : 'Dark Mode')}
        </DropdownItem>
      </Dropdown>

      {/* Divider */}
      <div className="w-px h-5 bg-slate-700/40 mx-1" />

      {/* Share */}
      <button
        onClick={onShare}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
        title={rtl ? 'مشاركة' : 'Share'}
      >
        <IconLink />
        <span className="hidden sm:inline">{rtl ? 'مشاركة' : 'Share'}</span>
      </button>

      {/* Settings */}
      <button
        onClick={onOpenSettings}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
        title="Settings"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <span className="hidden sm:inline">Settings</span>
      </button>

      {/* Export */}
      <button
        onClick={onExport}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
        title={rtl ? 'تصدير' : 'Export'}
      >
        <IconDownload />
        <span className="hidden sm:inline">{rtl ? 'تصدير' : 'Export'}</span>
      </button>

      {/* Deploy — primary action */}
      <button
        onClick={onDeploy}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-sm shadow-violet-600/25 active:scale-95 transition-all"
      >
        <IconRocket />
        {rtl ? 'نشر' : 'Deploy'}
      </button>
    </header>
  )
}
