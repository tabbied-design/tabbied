import { PACKAGE_VERSION } from 'lib/siteCounts';
import CodeBlock from './CodeBlock';
import { Prose } from './SizingExamples';
import type { Recipe, RecipeGroup } from './examples/recipes/types';
import styles from './ReactDocs.module.css';

// One group of a page's recipes (examples/recipes/<setup>.ts): a heading
// to link to, what it does, and the whole file. A CDN URL in one pins the
// package version the site is built against. Server component.
export default function RecipeExamples({ recipes, group }: { recipes: Recipe[]; group: RecipeGroup }) {
  return (
    <>
      {recipes
        .filter((recipe) => recipe.group === group)
        .map((recipe) => (
          <div key={recipe.id} className={styles.recipe}>
            <h3 id={`recipe-${recipe.id}`} className={styles.minihead}>
              {recipe.title}
            </h3>
            <p>
              <Prose text={recipe.says} />
            </p>
            <CodeBlock
              code={recipe.code.replaceAll('@VERSION@', PACKAGE_VERSION)}
              title={recipe.file}
              lang={recipe.lang}
              className={styles.codeStandalone}
            />
          </div>
        ))}
    </>
  );
}
