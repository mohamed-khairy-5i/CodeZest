import { useState, useMemo } from 'react'
import type { Template } from '../data/templates'
import ar from '../data/ar'

interface TemplateGalleryProps {
  templates: Template[]
  onLoad: (template: Template) => void
  onClose: () => void
  lang: 'en' | 'ar'
}

export default function TemplateGallery({ templates, onLoad, onClose, lang }: TemplateGalleryProps) {
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const t = (key: string): string => {
    if (lang === 'ar' && ar[key]) return ar[key]
    return key
  }

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    templates.forEach(tmpl => tmpl.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags)
  }, [templates])

  // Filter templates by search and tag
  const filtered = useMemo(() => {
    return templates.filter(tmpl => {
      const matchesSearch = search === '' ||
        tmpl.name.toLowerCase().includes(search.toLowerCase()) ||
        tmpl.description.toLowerCase().includes(search.toLowerCase())
      const matchesTag = selectedTag === null || tmpl.tags.includes(selectedTag)
      return matchesSearch && matchesTag
    })
  }, [templates, search, selectedTag])

  const rtl = lang === 'ar'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div
        className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl w-[90vw] max-w-4xl max-h-[85vh] flex flex-col shadow-2xl shadow-black/40"
        onClick={e => e.stopPropagation()}
      >
        {/* Header — gradient bar with subtle bottom glow */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900 via-slate-800/50 to-slate-900 border-b border-slate-700/50 shadow-[0_1px_0_0_rgba(139,92,246,0.08)]">
          <h2 className="text-lg font-bold text-white">
            {rtl ? '📂 معرض القوالب' : '📂 Template Gallery'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-700/80"
          >
            ✕
          </button>
        </div>

        {/* Search + Tags */}
        <div className="p-4 border-b border-slate-700/50 space-y-3">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={rtl ? 'بحث...' : 'Search templates...'}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition"
          />
          <div className="flex flex-wrap gap-2" dir="ltr">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                selectedTag === null
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {rtl ? 'الكل' : 'All'}
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition capitalize ${
                  selectedTag === tag
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              {rtl ? 'لا توجد قوالب مطابقة' : 'No matching templates'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" dir={rtl ? 'rtl' : 'ltr'}>
              {filtered.map(tmpl => (
                <div
                  key={tmpl.id}
                  className="group bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 cursor-pointer transition-all hover:border-purple-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-purple-500/10"
                  onClick={() => onLoad(tmpl)}
                >
                  <div className="text-3xl mb-3 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: tmpl.icon }} />
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-purple-400 transition">
                    {tmpl.name}
                  </h3>
                  <p className="text-slate-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tmpl.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-slate-700/60 text-slate-300 rounded text-[10px] font-medium capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with gradient divider */}
        <div className="relative flex items-center justify-between p-3 before:absolute before:top-0 before:left-3 before:right-3 before:h-px before:bg-gradient-to-r before:from-transparent before:via-purple-500/25 before:to-transparent text-xs text-slate-500">
          <span>
            {rtl
              ? `${filtered.length} من أصل ${templates.length} قالب`
              : `${filtered.length} of ${templates.length} templates`}
          </span>
          <span>{rtl ? 'انقر لتحميل القالب' : 'Click to load a template'}</span>
        </div>
      </div>
    </div>
  )
}
