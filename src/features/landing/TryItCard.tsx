import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import { Card, CardLabel, CardTitle, CardDesc } from './BentoGrid'

const ICONS = [
  'lucide:rocket',
  'lucide:flame',
  'lucide:zap',
  'lucide:star',
  'lucide:heart',
  'lucide:code-2',
  'lucide:coffee',
  'lucide:globe',
  'lucide:music',
  'ph:brain',
  'ph:lightning',
  'tabler:crystal-ball',
]

const GRADIENTS = [
  { from: '#6366f1', to: '#a855f7', dir: '135deg' },
  { from: '#F74562', to: '#EB4BBB', dir: '135deg' },
  { from: '#f97316', to: '#eab308', dir: '135deg' },
  { from: '#10b981', to: '#06b6d4', dir: '135deg' },
  { from: '#3b82f6', to: '#6366f1', dir: '135deg' },
]

function pickRandom<T>(arr: T[], exclude: T): T {
  let next: T
  do { next = arr[Math.floor(Math.random() * arr.length)] } while (next === exclude)
  return next
}

export function TryItCard() {
  const [icon, setIcon] = useState(ICONS[0])
  const [gradient, setGradient] = useState(GRADIENTS[0])
  const [spin, setSpin] = useState(0)

  const randomize = useCallback(() => {
    setIcon((prev) => pickRandom(ICONS, prev))
    setGradient((prev) => pickRandom(GRADIENTS, prev))
    setSpin((r) => r + 360)
  }, [])

  return (
    <Card className="col-span-1 p-6 flex flex-col gap-4" delay={0.1}>
      <div>
        <CardLabel>Interactive</CardLabel>
        <CardTitle>Try It Right Here</CardTitle>
        <CardDesc>Hit randomize and see a new logo every time.</CardDesc>
      </div>

      {/* Preview + dice */}
      <div className="flex justify-center">
        <div className="relative">
          <motion.div
            className="flex size-24 items-center justify-center rounded-3xl shadow-lg shadow-black/20"
            animate={{ background: `linear-gradient(${gradient.dir}, ${gradient.from}, ${gradient.to})` }}
            transition={{ duration: 0.3 }}
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
          </motion.div>
          <button
            type="button"
            onClick={randomize}
            data-umami-event="try it card interact"
            className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-xl border border-border bg-[var(--surface)] text-[var(--foreground)] shadow-md transition-opacity hover:opacity-80"
          >
            <motion.span
              animate={{ rotate: spin }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-flex"
            >
              <Icon icon="lucide:dice-5" width={14} />
            </motion.span>
          </button>
        </div>
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
