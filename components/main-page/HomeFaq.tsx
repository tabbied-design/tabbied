'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import t from './HomePage.module.css';
import styles from './HomeFaq.module.css';

// The homepage's questions, as an accordion with one answer open at a time
// (the first, to begin with). Every answer is in the prerendered page,
// closed ones `hidden`, so a reader without the script, or a search engine,
// still has all seven.

type Faq = { question: string; answer: string; link?: { href: string; text: string } };

const FAQS: readonly Faq[] = [
  {
    question: 'What can I use for free?',
    answer: 'Every website template and pattern on Tabbied is free to customize and download.',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'Not to customize. Colors and patterns change in your browser. Some basic HTML or React helps when you edit the downloaded files.',
  },
  {
    question: 'Can I change the text and photos?',
    answer:
      "Not in the editor yet. For now, you can replace the placeholder text and photos in the downloaded files. We're working on making everything editable on Tabbied, including AI-generated content.",
  },
  {
    question: 'Can I use a pattern on its own?',
    answer: 'Yes. Download any pattern as PNG, SVG or React for print, packaging, or other projects.',
    link: { href: '/patterns', text: 'Browse the pattern library' },
  },
  {
    question: "Will my site look like everyone else's?",
    answer:
      'Patterns are generated, so you can create one no one else has and pair it with your own palette.',
  },
  {
    question: 'Can I use this for client projects?',
    answer:
      'Yes. You can use templates and patterns in personal and commercial work, including sites you build for clients.',
  },
  {
    question: 'How do I publish my website?',
    answer:
      'Download your site as HTML/CSS or React, then host it anywhere that serves static files, such as Netlify, Vercel or GitHub Pages.',
  },
];

export default function HomeFaq() {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <section className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <h2 id={`${id}-title`} className={`${t.title} ${styles.title}`}>
          Frequently asked questions.
        </h2>
        <div className={styles.list}>
          {FAQS.map((faq, k) => {
            const expanded = open === k;

            return (
              <div key={faq.question} className={styles.item}>
                <h3>
                  <button
                    type="button"
                    className={styles.toggle}
                    aria-expanded={expanded}
                    aria-controls={`${id}-answer-${k}`}
                    onClick={() => setOpen(expanded ? -1 : k)}
                  >
                    <span className={styles.questionText}>{faq.question}</span>
                    <span className={styles.icon} aria-hidden="true" />
                  </button>
                </h3>
                <p id={`${id}-answer-${k}`} className={styles.answer} hidden={!expanded}>
                  {faq.answer}
                  {faq.link ? (
                    <>
                      {' '}
                      <Link href={faq.link.href} prefetch={false} className={styles.link}>
                        {faq.link.text} &#x2197;
                      </Link>
                    </>
                  ) : null}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
