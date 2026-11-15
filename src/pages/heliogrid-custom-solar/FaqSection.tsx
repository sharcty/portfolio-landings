import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RevealSection from '../../shared/RevealSection';
import { solarFaqItems } from './data';

export default function FaqSection() {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  return (
    <div className="mx-auto max-w-3xl">
      <RevealSection className="mb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
          Engineering &amp; Tax Credit Answers
        </span>
        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
          Frequently Asked Questions
        </h3>
      </RevealSection>

      <div className="space-y-3.5">
        {solarFaqItems.map((faq, idx) => {
          const isOpen = openFaqIdx === idx;
          return (
            <RevealSection key={idx} delay={idx * 60}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#FAF9F6]">
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-sm font-extrabold text-[#0F172A] sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-amber-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>
          );
        })}
      </div>
    </div>
  );
}
