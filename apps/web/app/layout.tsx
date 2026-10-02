import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'LearnBySelf | Interactive Programming Platform',
  description: 'Learn programming step-by-step with interactive coding lessons, mental models, and real practice.',
  openGraph: {
    title: 'LearnBySelf — Learn Programming at Your Own Pace',
    description: 'Interactive, beginner-friendly coding lessons with visual models and hands-on practice.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
