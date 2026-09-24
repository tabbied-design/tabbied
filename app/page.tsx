import type { Metadata } from 'next';
import { plexMono, plexSans } from 'lib/fonts';
import { PALETTE_COUNT, PATTERN_COUNT, TEMPLATE_COUNT } from 'lib/siteCounts';
import { pageMetadata } from 'lib/seo';
import HomeNav from 'components/main-page/HomeNav';
import HomeHero from 'components/main-page/HomeHero';
import HomePatternLibrary from 'components/main-page/HomePatternLibrary';
import HomeHowItWorks from 'components/main-page/HomeHowItWorks';
import HomeTemplates from 'components/main-page/HomeTemplates';
import HomeStory from 'components/main-page/HomeStory';
import HomeFooter from 'components/main-page/HomeFooter';
import styles from 'components/main-page/home.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Tabbied - Free generative patterns and website templates',
  description: `Explore a growing library of ${PATTERN_COUNT} customizable patterns and ${TEMPLATE_COUNT} free website templates, ready to edit, download, and use.`,
  path: '/',
});

export default function Home() {
  return (
    <div className={`${styles.home} ${plexMono.variable} ${plexSans.variable}`}>
      <HomeNav />

      <HomeHero patternCount={PATTERN_COUNT} templateCount={TEMPLATE_COUNT} />

      <HomePatternLibrary patternCount={PATTERN_COUNT} />

      <HomeHowItWorks />

      <HomeTemplates templateCount={TEMPLATE_COUNT} />

      <HomeStory
        patternCount={PATTERN_COUNT}
        templateCount={TEMPLATE_COUNT}
        paletteCount={PALETTE_COUNT}
      />

      <HomeFooter />
    </div>
  );
}
