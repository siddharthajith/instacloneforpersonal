export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
      {categories.map((cat) => {
        const selected = active === cat
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selected
                ? 'bg-ink text-white'
                : 'bg-stone-100 text-ink-soft hover:bg-stone-200'
            }`}
            aria-pressed={selected}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
