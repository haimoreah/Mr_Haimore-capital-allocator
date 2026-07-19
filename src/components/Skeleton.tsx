export function SkeletonBucketCard({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="rounded-[18px] p-5 skeleton"
      style={{
        animationDelay: `${delay}ms`,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg" style={{ background: 'var(--bg-subtle)' }} />
          <div className="h-4 w-24 rounded-lg" style={{ background: 'var(--bg-subtle)' }} />
        </div>
        <div className="h-5 w-10 rounded-full" style={{ background: 'var(--bg-subtle)' }} />
      </div>
      {/* Amount */}
      <div className="h-8 w-40 rounded-lg" style={{ background: 'var(--bg-subtle)' }} />
      {/* Description */}
      <div className="mt-3 space-y-1.5">
        <div className="h-3 w-full rounded-lg" style={{ background: 'var(--bg-subtle)' }} />
        <div className="h-3 w-4/5 rounded-lg" style={{ background: 'var(--bg-subtle)' }} />
      </div>
    </div>
  )
}

export function SkeletonResults() {
  return (
    <section className="flex flex-col gap-3">
      {/* Section label */}
      <div className="h-4 w-28 rounded-lg skeleton" style={{ background: 'var(--bg-subtle)' }} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <SkeletonBucketCard delay={0}   />
        <SkeletonBucketCard delay={60}  />
        <SkeletonBucketCard delay={120} />
        <SkeletonBucketCard delay={180} />
      </div>
    </section>
  )
}
