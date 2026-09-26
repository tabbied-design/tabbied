import type { CSSProperties } from 'react';
import type { PatternDefinition } from 'tabbied';
import { TabbiedPattern } from 'tabbied/react';
import { TemplateMenu } from './TemplateMenu';
import s from './LocalBusinessSite.module.css';

export type LocalBusiness = {
  name: string;
  eyebrow: string;
  headline: string;
  intro: string;
  phone: string;
  area: string;
  colors: [string, string, string, string, string];
  services: { name: string; detail: string; price: string }[];
  promise: string;
  steps: { title: string; detail: string }[];
  quote: string;
  quoteBy: string;
  hours: string;
};

export default function LocalBusinessSite({ business, pattern }: { business: LocalBusiness; pattern: PatternDefinition }) {
  const [paper, ink, accent, soft, line] = business.colors;
  const vars = { '--paper': paper, '--ink': ink, '--accent': accent, '--soft': soft, '--line': line } as CSSProperties;

  return (
    <div className={s.page} style={vars} data-edit-root="localBusiness">
      <header className={s.header}>
        <a className={s.brand} href="#" data-edit="brand.name" data-edit-max="30">{business.name}</a>
        <nav className={s.nav} aria-label="Main navigation">
          <a href="#services">Services</a><a href="#process">How it works</a><a href="#contact">Contact</a>
        </nav>
        <a className={s.phone} href={`tel:${business.phone.replace(/[^+\d]/g, '')}`} data-edit="contact.phone" data-edit-max="24">{business.phone}</a>
        <TemplateMenu className={s.menu}><a href="#services">Services</a><a href="#process">How it works</a><a href="#contact">Contact</a></TemplateMenu>
      </header>

      <main>
        <section className={s.hero}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow} data-edit="hero.eyebrow" data-edit-max="50">{business.eyebrow}</p>
            <h1 data-edit="hero.title" data-edit-max="90">{business.headline}</h1>
            <p className={s.intro} data-edit="hero.intro" data-edit-multiline data-edit-max="240">{business.intro}</p>
            <div className={s.actions}><a className={s.primary} href="#contact">Get a free estimate</a><a className={s.secondary} href="#services">See services</a></div>
            <p className={s.area} data-edit="contact.area" data-edit-max="80">Serving {business.area}</p>
          </div>
          <div className={s.pattern} aria-hidden="true">
            <TabbiedPattern pattern={pattern} palette={business.colors} fit="cover" density={0.58} height="100%" />
            <span className={s.patternLabel}>Local. Skilled. Ready.</span>
          </div>
        </section>

        <section className={s.services} id="services">
          <div className={s.sectionHead}><p className={s.eyebrow}>What we do</p><h2>Straightforward help, done properly.</h2></div>
          <div className={s.serviceGrid}>{business.services.map((service, i) => <article className={s.card} key={service.name}><span>0{i + 1}</span><h3 data-edit={`services.${i}.name`} data-edit-max="40">{service.name}</h3><p data-edit={`services.${i}.detail`} data-edit-multiline data-edit-max="180">{service.detail}</p><strong data-edit={`services.${i}.price`} data-edit-max="30">{service.price}</strong></article>)}</div>
        </section>

        <section className={s.promise}>
          <div><p className={s.eyebrow}>Our promise</p><h2 data-edit="promise" data-edit-multiline data-edit-max="180">{business.promise}</h2></div>
          <div className={s.miniPattern} aria-hidden="true"><TabbiedPattern pattern={pattern} palette={[soft, ink, accent, line, paper]} fit="cover" density={0.35} height="100%" /></div>
        </section>

        <section className={s.process} id="process">
          <div className={s.sectionHead}><p className={s.eyebrow}>How it works</p><h2>Three steps. No runaround.</h2></div>
          <ol>{business.steps.map((step, i) => <li key={step.title}><span>{i + 1}</span><div><h3 data-edit={`steps.${i}.title`} data-edit-max="36">{step.title}</h3><p data-edit={`steps.${i}.detail`} data-edit-multiline data-edit-max="160">{step.detail}</p></div></li>)}</ol>
        </section>

        <section className={s.testimonial}><blockquote data-edit="testimonial.quote" data-edit-multiline data-edit-max="240">&ldquo;{business.quote}&rdquo;</blockquote><p data-edit="testimonial.by" data-edit-max="60">{business.quoteBy}</p></section>

        <section className={s.contact} id="contact">
          <div><p className={s.eyebrow}>Book a visit</p><h2>Tell us what you need.</h2><p>Call <a href={`tel:${business.phone.replace(/[^+\d]/g, '')}`}>{business.phone}</a> or send a few details. We reply by the next working day.</p></div>
          <div className={s.contactDetails}><p><span>Service area</span>{business.area}</p><p><span>Hours</span>{business.hours}</p><a className={s.primary} href={`mailto:hello@${business.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.example`}>Request an estimate</a></div>
        </section>
      </main>
      <footer className={s.footer}><strong>{business.name}</strong><span>Independent and locally owned</span><a href="#">Back to top</a></footer>
    </div>
  );
}
