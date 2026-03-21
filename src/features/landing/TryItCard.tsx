import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Card, CardLabel, CardTitle, CardDesc } from './BentoGrid'

const ICONS = [
  'lucide:rocket',
  'lucide:flame',
  'lucide:zap',
  'lucide:star',
  'lucide:heart',
  'lucide:code-2',
]

const GRADIENTS = [
  { from: '#6366f1', to: '#a855f7', dir: '135deg' },
  { from: '#F74562', to: '#EB4BBB', dir: '135deg' },
  { from: '#f97316', to: '#eab308', dir: '135deg' },
  { from: '#10b981', to: '#06b6d4', dir: '135deg' },
  { from: '#3b82f6', to: '#6366f1', dir: '135deg' },
]

export function TryItCard() {
  const [icon, setIcon] = useState(ICONS[0])
  const [gradient, setGradient] = useState(GRADIENTS[0])

  return (
    <Card className="col-span-1 p-6 flex flex-col gap-4" delay={0.1}>
      <div>
        <CardLabel>Interactive</CardLabel>
        <CardTitle>Try It Right Here</CardTitle>
        <CardDesc>Pick an icon and a color — see your logo update live.</CardDesc>
      </div>

      {/* Preview */}
      <div className="flex justify-center">
        <div
          className="flex size-24 items-center justify-center rounded-3xl shadow-lg shadow-black/20"
          style={{
            background: `linear-gradient(${gradient.dir}, ${gradient.from}, ${gradient.to})`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={icon}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <Icon icon={icon} width={44} className="text-white" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Icon swatches */}
      <div className="flex justify-center gap-2">
        {ICONS.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIcon(i)}
            data-umami-event="try it card interact"
            className={`flex size-8 items-center justify-center rounded-lg transition-all ${
              icon === i
                ? 'bg-[var(--surface-secondary)] ring-2 ring-primary/50'
                : 'bg-[var(--surface-secondary)] opacity-50 hover:opacity-100'
            }`}
          >
            <Icon icon={i} width={15} className="text-[var(--foreground)]" />
          </button>
        ))}
      </div>

      {/* Gradient swatches */}
      <div className="flex justify-center gap-2">
        {GRADIENTS.map((g) => (
          <button
            key={g.from}
            type="button"
            onClick={() => setGradient(g)}
            data-umami-event="try it card interact"
            className={`size-6 rounded-full transition-all ${
              gradient.from === g.from ? 'ring-2 ring-offset-2 ring-primary/60 ring-offset-[var(--surface)]' : 'opacity-70 hover:opacity-100'
            }`}
            style={{ background: `linear-gradient(${g.dir}, ${g.from}, ${g.to})` }}
          />
        ))}
      </div>

      <a
        href="/editor"
        className="mt-auto flex items-center justify-between rounded-xl border border-border bg-[var(--surface-secondary)] px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground"
      >
        Open full editor
        <Icon icon="lucide:arrow-right" width={13} />
      </a>
    </Card>
  )
}
