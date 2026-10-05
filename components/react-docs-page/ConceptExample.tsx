import { PACKAGE_VERSION } from 'lib/siteCounts';
import CodeBlock from './CodeBlock';
import ConceptPreview from './ConceptPreview';
import SetupTabs from './SetupTabs';
import { CONCEPT_EXAMPLES, CONCEPT_PREVIEWS, CONCEPT_SETUPS, type ConceptId } from './examples/concepts';
import styles from './ReactDocs.module.css';

// One example on /docs/concepts: what it draws, live, then the code in every
// setup, behind the switch between them (examples/concepts.ts). A server
// component: the six code panels are rendered here and SetupTabs only shows
// one, and the preview gets its settings as props, so the samples never
// reach the browser as data.
export default function ConceptExample({ id }: { id: ConceptId }) {
  return (
    <>
      <div className={styles.recipePreview}>
        <span className={styles.previewLabel}>Live result</span>
        <div className={styles.previewBody}>
          <ConceptPreview id={id} spec={CONCEPT_PREVIEWS[id]} />
        </div>
      </div>
      <SetupTabs
        label="Setup"
        tabs={CONCEPT_SETUPS.map(({ id: setup, label }) => {
          const { code, lang, file } = CONCEPT_EXAMPLES[id][setup];
          return {
            id: setup,
            label,
            panel: (
              <CodeBlock
                code={code.replaceAll('@VERSION@', PACKAGE_VERSION)}
                lang={lang}
                title={file}
              />
            ),
          };
        })}
      />
    </>
  );
}
