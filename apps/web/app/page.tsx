import Link from 'next/link';
import { curriculumProvider } from '@/lib/curriculum/provider';
import { Card, Badge, Button } from '@learnbyself/ui';
import { ContinueLearning } from '@/components/learning/continue-learning';

export default async function HomePage() {
  const languages = await curriculumProvider.getLanguages();

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. Continue Learning Persistent Banner */}
      <section>
        <ContinueLearning />
      </section>

      {/* 2. Hero Section */}
      <section className="text-center max-w-2xl mx-auto space-y-3 pt-2 sm:pt-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Learn programming <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">step-by-step</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
          Interactive lessons, visual mental models, and hands-on practice. Designed for complete beginners to learn peacefully at their own pace.
        </p>
      </section>

      {/* 3. The 4-Step Learning Engine */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-subtle space-y-3">
        <div className="border-b border-slate-100 pb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            How You Learn Here
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { step: '1', title: 'Learn & Understand', desc: 'Real-world visual analogies' },
            { step: '2', title: 'Interactive Code', desc: 'Line-by-line live runner' },
            { step: '3', title: 'Practice & Fix', desc: 'Step-by-step bug hunting' },
            { step: '4', title: 'Interview Confidence', desc: 'Real technical questions' },
          ].map((item, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-brand-200 hover:bg-brand-50/20 transition-all flex flex-col justify-between"
            >
              <span className="text-[11px] font-bold text-brand-600 font-mono">Step {item.step}</span>
              <p className="font-bold text-xs sm:text-sm text-slate-900 mt-1">{item.title}</p>
              <span className="text-[11px] text-slate-500 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Multi-Language Curriculum Catalog */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Supported Language Tracks</h2>
            <p className="text-xs sm:text-sm text-slate-500">Every track uses the exact same structured learning engine.</p>
          </div>
          <Badge variant="green" size="sm">Phase 1 Active</Badge>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {languages.map((lang) => (
            <Card key={lang.slug} variant={lang.isAvailable ? 'interactive' : 'default'} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl p-1 bg-slate-50 rounded-xl border border-slate-100">{lang.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{lang.name}</h3>
                      <span className="text-xs text-slate-400 font-mono">{lang.version}</span>
                    </div>
                  </div>
                  {lang.isAvailable ? (
                    <Badge variant="green" size="sm">Active Track</Badge>
                  ) : (
                    <Badge variant="slate" size="sm">Curriculum Roadmap</Badge>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">{lang.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {lang.paradigms.map((p, idx) => (
                    <span key={idx} className="text-[10px] sm:text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {lang.isAvailable ? (
                  <Link href={`/${lang.slug}`} className="block">
                    <Button variant="primary" className="w-full font-semibold">
                      Explore {lang.name} Track →
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" disabled className="w-full">
                    Engine Ready • Curriculum Coming Soon
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
