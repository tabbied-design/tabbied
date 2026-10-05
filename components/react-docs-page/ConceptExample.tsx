import { PACKAGE_VERSION } from 'lib/siteCounts';
import CodeBlock from './CodeBlock';
import SetupTabs from './SetupTabs';
import { CONCEPT_EXAMPLES, CONCEPT_SETUPS, type ConceptId } from './examples/concepts';

// One example on /docs/concepts, in every setup, behind the switch between
// them (examples/concepts.ts). A server component: the six code panels are
// rendered here and SetupTabs only shows one.
export default function ConceptExample({ id }: { id: ConceptId }) {
  return (
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
  );
}
