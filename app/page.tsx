import type { Metadata } from 'next';
import { plexMono, plexSans } from 'lib/fonts';
import { PATTERN_COUNT, TEMPLATE_COUNT } from 'lib/siteCounts';
import { pageMetadata } from 'lib/seo';
import SiteNav from 'components/nav';
import TradesHero from 'components/main-page/TradesHero';
import SkilledHands from 'components/main-page/SkilledHands';
import MakeItYours from 'components/main-page/MakeItYours';
import BeyondWebsites from 'components/main-page/BeyondWebsites';
import ForDevelopers from 'components/main-page/ForDevelopers';
import HomeFaq from 'components/main-page/HomeFaq';
import HomeCta from 'components/main-page/HomeCta';
import HomeFooter from 'components/main-page/HomeFooter';
import { HOME_FONT_VARIABLES } from 'components/main-page/homeFonts';
import { heroTrades, homeSlides, makeItYours, slideCategories } from 'components/main-page/homeShowcase';
import styles from 'components/main-page/HomePage.module.css';

// The homepage, as the 14 October designs draw it: website templates first,
// patterns after them, then the developers, the questions and a last way in.
// The counts are the catalog's own (lib/siteCounts), and the templates it
// shows are real ones (homeShowcase.ts), read here on the server and passed
// down as plain data.

export const metadata: Metadata = pageMetadata({
  title: 'Tabbied - Free website templates for every trade',
  description: `${TEMPLATE_COUNT} free website templates for florists, electricians, bakers and every trade in between, with ${PATTERN_COUNT} generated patterns in place of stock photos.`,
  path: '/',
});

export default function Home() {
  const slides = homeSlides();

  return (
    <div className={`${styles.page} ${plexSans.variable} ${plexMono.variable} ${HOME_FONT_VARIABLES}`}>
      <SiteNav tone="dark" />

      <main>
        <TradesHero templateCount={TEMPLATE_COUNT} trades={heroTrades()} />
        <SkilledHands templateCount={TEMPLATE_COUNT} slides={slides} categories={slideCategories(slides)} />
        <MakeItYours {...makeItYours()} />
        <BeyondWebsites />
        <ForDevelopers />
        <HomeFaq />
        <HomeCta />
      </main>

      <HomeFooter tone="light" />
    </div>
  );
}
