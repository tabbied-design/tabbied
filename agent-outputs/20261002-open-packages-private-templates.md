# Open packages, private templates: repositories, publishing, CI and licenses

2026-10-02. Four questions about taking the repository private while keeping
the pattern library open:

1. How should the Git repositories be set up?
2. Why publish `tabbied-mcp` and `tabbied-templates`, not just `tabbied`?
3. What does a private repository do to Cloudflare and to CI/CD on GitHub?
4. Which licenses, for the open packages and for the templates?

Nothing here has been changed in the repository; this is the plan and the
reasons for it.

**Outcome, the same day:** the repository stays one public monorepo, and the
templates are protected by their license rather than by hiding the source,
since a live preview can be copied whatever the repository's visibility. The
root LICENSE is now proprietary with the three packages carved out as MIT,
the Terms of Service carry a fuller Template License (section 7), every
download ships it as `LICENSE.md` with an `AGENTS.md`, and the live template
pages, `llms.txt` and the MCP template tools carry a notice for AI agents. The
split, the mirror and the CI cost analysis below were not needed. The licensing section is a recommendation, not legal advice,
and one point in it (templates already published under the root MIT license)
is worth a lawyer's half hour.

## The short version

1. **Make this repository private and keep it as the one place the work
   happens.** Create a new public repository that is a one-way, automated
   mirror of `packages/` (the three npm packages), and publish to npm from
   there. Don't split the monorepo into two repositories that both take
   commits: 36 of the 44 commits that touched `packages/` also touched the
   site, so a split turns most changes into two PRs and a release.
2. **The site needs neither package published. People outside the repo
   need both, and the release workflow is failing without them.**
   `npx -y tabbied-mcp` (in the README and the MCP docs) is a 404, `npm
   install` fails in the React download of five templates, and every push
   to `main` turns the Release workflow red because it tries to publish both
   and npm refuses.
3. **Cloudflare is unaffected.** On GitHub, Actions stops being free: at the
   current pace CI uses about 5,000 billable minutes a month against 2,000
   included on GitHub Free (3,000 on Team). npm provenance can't be issued
   from a private repository, which is why publishing moves to the public
   mirror. On GitHub Free, branch protection and rulesets also go away on a
   private repository.
4. **MIT for all three packages, patterns included** (no change, but two
   packages are missing their LICENSE file). **For the templates, a
   proprietary notice in the private repository and a `LICENSE.md` in every
   download** that restates the grant already in the Terms of Service,
   section 7.

## What the repository looks like today

These figures were measured from the repository, npm and GitHub on
2026-10-02.

- **Three workspaces, all declared MIT.** `tabbied` 0.7.0, `tabbied-mcp`
  0.2.2, `tabbied-templates` 0.2.0. A LICENSE file exists only at the root
  and in `packages/tabbied/`.
- **Only `tabbied` is on npm.** `npm view tabbied-mcp` and `npm view
  tabbied-templates` both answer E404.
- **The packages are self-contained.** No package test or script reads a
  path outside its own folder; the MCP tests read `tabbied/catalog.json`
  through module resolution. So the packages build and test on their own,
  which is what makes a mirror possible.
- **The site and the packages change together.** 36 of the 44 commits that
  touch `packages/` also touch paths outside it (the density rescale, the
  September pattern drop, the MCP server, the editable spec). CLAUDE.md is
  full of invariants that cross the line: codegen feeds the catalog, the
  catalog feeds the Worker's MCP endpoint, the preview runtime bundles the
  whole catalog, `check:previews` gates a new pattern on its committed
  preview.
- **The templates are not one folder.** They are `app/templates/`,
  `components/template/`, `components/Artwork.tsx` and `Figure.tsx`,
  `lib/templateSites.ts`, `templateOrder.ts`, `templateShots.ts`,
  `templateCategories.ts`, `lib/generated/artwork.js`, `public/images/` (96
  MB), `public/template-shots/` (14 MB), the packager, the two annotation
  codemods, the image pipeline and its prompts, and the e2e specs that gate
  them. The two-pass build reads the export to make the downloads. The
  templates cannot leave the site, so **the site goes private with them**.
- **GitHub:** 10 stars, 0 forks, 3 open issues. Two of those are package
  issues: [#78](https://github.com/tabbied-design/tabbied/issues/78) (pattern
  fit) and [#75](https://github.com/tabbied-design/tabbied/issues/75) (river
  studies).
- **CI:** the last 200 CI runs (2026-09-23 to 2026-10-02) took about 1,300
  wall-clock minutes. Each run has three jobs and each job bills rounded up
  to the minute, so that is about 1,700 billable minutes in ten days. The
  Playwright job is 14 of a typical run's 19 minutes.

## 1. Repository setup

### Recommendation: a private monorepo, mirrored to a public repository

```
tabbied-design/tabbied        (private)   everything, as today; all work lands here
        |
        |  on push to main: filter to an allowlist of paths, push (fast-forward only)
        v
tabbied-design/<public name>  (public)    packages/tabbied, packages/tabbied-mcp,
                                          packages/tabbied-templates, a root README,
                                          LICENSE, CI for the packages, and the npm
                                          publish
```

**The private repository is the current one, made private.** It keeps its
history, issues, PRs, the Cloudflare connection, every clone's `origin`, and
every Claude Code environment that names it. Nothing about day-to-day work
changes: one tree, one PR per change, CLAUDE.md as it is.

**The public repository is derived, never edited by hand.** A workflow in the
private repository runs on every push to `main`:

1. Check out with full history.
2. Run `git filter-repo` with an **allowlist** of paths: `--path
   packages/tabbied/ --path packages/tabbied-mcp/ --path
   packages/tabbied-templates/`, plus a `mirror/` folder renamed to the root
   (`--path mirror/ --path-rename mirror/:`) that holds the public repo's own
   README, LICENSE, root `package.json`, `.changeset/config.json` and
   `.github/workflows/`.
3. Check the result: fail if any path falls outside the allowlist.
4. Push to the public repository's `main`, fast-forward only.

Three properties hold this together:

- **An allowlist, never a denylist.** A new template folder must be private
  by default. With a denylist, the first template added under a new path
  would go public on the next push to `main`.
- **filter-repo is deterministic.** The same history and the same options
  produce the same commit hashes, so each run's output extends the last and
  the push is a fast-forward. A push that is not a fast-forward means the
  filter changed. The job should stop there, never force-push.
- **Credentials are a deploy key on the public repository**, with its
  private half stored as a secret in the private one. `GITHUB_TOKEN` cannot
  push to another repository.

Two things this costs, both small for a two-person project:

- **Commit messages and author names of mirrored commits are public.** That
  is true today too. If a message should not travel, filter-repo's
  `--message-callback` can rewrite it, or the mirror can squash.
- **An outside contributor's PR lands on the mirror and has to be carried
  into the private repository by hand.** Download the PR's patch, `git am`
  it (the author is kept), merge, and close the public PR with a link to the
  mirrored commit. If outside contributions ever become routine, that is the
  moment to reconsider the alternative below.

### The alternatives, and why not

- **Keep this repository public and move the templates out.** Every template
  is already in this repository's public history. Removing them means
  rewriting the history of a public repository and force-pushing it, and
  GitHub keeps PR refs and cached views that only its support can purge. The
  site would have to move out with the templates anyway, so it ends in the
  same two repositories, with the harder surgery done on the public side.
- **A public packages repository as the source of truth, with the private
  site consuming it** (from npm, or as a git submodule). This is the
  textbook shape and the wrong one here. From npm, a cross-cutting change
  (most of them, per the 36 of 44) becomes a package PR, a release, then a
  site PR. As a submodule, it becomes two PRs and a pointer bump, and
  [Workers Builds' submodule handling has a spotty
  record](https://community.cloudflare.com/t/cloning-fails-on-repository-with-a-submodule/279527).
  Revisit this if the packages grow an outside community.

### Naming

- **Recommended: keep `tabbied-design/tabbied` for the private repository**
  and give the public one a new name (for example `tabbied-design/patterns`
  or `tabbied-design/tabbied-js`; this is your call). Nothing that points at
  the current repository has to change.
- **The tempting alternative is to rename this repository to something like
  `tabbied-site` and give `tabbied` to the public one.** GitHub redirects a
  renamed repository's old URL only until a new repository takes the name.
  From then on, every clone, Claude Code environment and integration still
  pointing at `tabbied-design/tabbied` is silently talking to the public
  repository, and a push from a stale clone publishes private history. Do it
  only after every remote has been updated, if at all.

### What moves, and what stays

| Path | Where it lives |
| --- | --- |
| `packages/tabbied/` (core, React wrapper, 338 patterns, CLI) | private, mirrored public |
| `packages/tabbied-mcp/` | private, mirrored public |
| `packages/tabbied-templates/` (the edits engine, no template content) | private, mirrored public (see question 2) |
| `docs/mcp-server.md`, `svg-export.md`, `grid-snapping.md`, `editable-templates.md` | move under `packages/*/docs/` so the allowlist stays one folder per package |
| `mirror/` (new: the public repo's README, LICENSE, root `package.json`, workflows) | private, mirrored to the public root |
| Everything else: the site, the Worker, the templates, `public/`, `scripts/`, `e2e/`, `agent-outputs/` | private only |

`public/previews/` (the pattern previews) can stay private. The catalog
points agents at `https://tabbied.com/previews/<slug>.webp`, which the site
serves.

### Publishing moves to the public repository

npm [does not issue provenance from a private
repository](https://github.blog/changelog/2023-07-25-publishing-with-npm-provenance-from-private-source-repositories-is-no-longer-supported/).
Trusted publishing (OIDC) still works from a private repository, but the
provenance attestation that RELEASING.md promises is quietly dropped, and it
couldn't link to source anyone can read anyway. So split the release:

- **Versioning stays private.** Changesets, the "Version Packages" PR and
  the weekly auto-patch run where the work happens, and their version
  commits reach the public repository through the mirror.
- **Publishing moves public.** The public repository's `release.yml` runs on
  push to `main`: `npm ci`, build, test, `changeset publish`. That command
  publishes only versions npm doesn't have yet, and it creates the tags and
  GitHub Releases in the public repository.

Four follow-ups:

- **Re-point the npm trusted publisher** on all three packages to the
  public repository's name and `release.yml`.
- **Update `repository.url`** in the three `package.json` files to the
  public repository, or the registry rejects the upload with a 422.
- **Switch the changelog generator.** `@changesets/changelog-github` links
  PR numbers in the repository it is configured for, and private PR numbers
  are 404s to the public. Use the plain `@changesets/cli/changelog`.
- **Fix the weekly auto-patch's tag lookup.** It reads `<name>@*` tags,
  which will now be created in the public repository. Have the private job
  tag its own version commits, or fetch tags from the public repository.

### Order of operations

1. **Fix the release now.** It doesn't depend on any of the rest (question 2).
2. **Create the public repository, empty.**
3. **Transfer issues #78 and #75 to it while this repository is still
   public.** GitHub does not allow transferring an issue from a private
   repository to a public one.
4. **Add the license files** (question 4).
5. **Add `mirror/` and the mirror workflow, and run it once.** Read the
   public tree by eye before anything else depends on it.
6. **Move publishing** to the public repository, re-point the trusted
   publishers, and confirm the first release there carries provenance.
7. **Make this repository private.** Per [GitHub's
   docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility),
   stars and watchers are erased (10 of each) and public forks are detached
   (there are none). Check the Actions budget first (question 3).
8. **Update the links.** The README and the package READMEs link into this
   repository by relative path or by URL.

### What going private does not do

- **It doesn't recall what has already been public.** Every template, prompt
  and pipeline script committed since August has been cloneable by anyone,
  and may sit in archives such as Software Heritage. Going private stops new
  copies, not old ones.
- **It doesn't hide the templates themselves.** `/templates/<slug>/site/`
  serves each template's full HTML, CSS and pictures to every visitor, by
  design; only the zips are gated. PR previews on `workers.dev` are public
  too. A private repository protects the *source*: the TSX, the codemods,
  the image prompts, the packager, the gates, and everything not yet
  shipped. The license (question 4) is what governs use of the pages.

## 2. Why publish `tabbied-mcp` and `tabbied-templates`

**The site needs neither on npm.** The root `package.json` links all three
workspaces as `"*"`, the Worker bundles `tabbied-mcp` from source, and
Cloudflare builds from the repository. Publishing is for people outside the
repository, and three things outside it already assume both packages exist.

### `tabbied-mcp`: the local MCP server is documented and can't be installed

The README, `docs/mcp-server.md` and the package README all tell people to
run:

```bash
npx -y tabbied-mcp
claude mcp add tabbied -- npx -y tabbied-mcp
```

Both fail with E404 today. The remote endpoint at `https://tabbied.com/mcp`
works without the package, but it can't render: `render_design` needs a real
browser, so it exists only in the stdio server. Without the package nobody
outside this repository can render a design through MCP. Its README also
documents `import { buildServer } from 'tabbied-mcp'` for embedding.

### `tabbied-templates`: five React downloads don't install

The five templates built on the shared `TemplateSite` component (Solstice,
Verdant, Ember and Oak, Facet, Nocturne) ship `TemplateSite.tsx` in their
React download, and it imports `derivePaletteProperties` and `parseEmphasis`
from `tabbied-templates`. The packager notices the import and writes
`"tabbied-templates": "^0.2.0"` into that download's `package.json`
(`EXTERNAL_DEPENDENCIES` in `scripts/package-templates.mjs`). So `npm
install` in those five React zips fails with E404 today. The HTML zips are
unaffected: they load only `tabbied`, from esm.sh.

### The release workflow fails on every push to `main`

`changeset publish` publishes every workspace that is not `"private": true`
and whose version npm doesn't have. Both packages qualify on every run, and
trusted publishing cannot create a package that doesn't exist yet (the
trusted publisher lives on the package's settings page, which appears only
after a first publish). The log of the latest run, on 2026-10-02:

```
error while publishing tabbied-templates: E404 Not Found - PUT https://registry.npmjs.org/tabbied-templates
packages failed to publish:
  tabbied-mcp@0.2.2
  tabbied-templates@0.2.0
Publish command exited with code 1
```

Every Release run on a push to `main` since at least 2026-09-29 has ended
that way. A workflow that is always red hides the day it fails for a real
reason.

### The fix

Follow "Bootstrapping a new package" in RELEASING.md, once per package:

```bash
npm run build:packages
npm publish --workspace tabbied-mcp --access public
npm publish --workspace tabbied-templates --access public
```

Then add each package's trusted publisher on npmjs.com. That first version
goes up from a laptop, so it carries no provenance; every release after it
does.

If you decide against publishing one of them:

- **`tabbied-templates`:** mark it `"private": true` (changesets and the
  release workflow skip private packages), and copy its source into the
  React download the way `LOCAL_IMPORTS` already copies `TemplateSite.tsx`,
  instead of listing it as a dependency.
- **`tabbied-mcp`:** mark it `"private": true` and remove the `npx`
  instructions from the three documents above.

My recommendation is to publish both. Neither contains template content:
`tabbied-templates` is the edits engine, and `tabbied-mcp`'s template tools
read `editable-catalog.json` from whichever host serves them.

## 3. A private repository, Cloudflare, and CI/CD

### Cloudflare Workers Builds: unaffected

- **Builds keep working.** Builds reach the repository through the
  "Cloudflare Workers and Pages" GitHub App, which [works with private
  repositories](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/).
  Making this same repository private changes nothing. If you ever rename it
  or move the site to a different repository, check the app's repository
  list (Organization settings, GitHub Apps) and the Worker's Settings,
  Builds connection.
- **Build minutes are Cloudflare's**, not GitHub's, and don't depend on the
  repository's visibility.
- **PR comments and preview URLs keep working.** The previews
  (`*-tabbied.<account>.workers.dev`) stay publicly reachable whatever the
  repository's visibility, and they run on production's bindings (see
  CLAUDE.md). If previews should be private, that is Cloudflare Access in
  front of `workers.dev`, not a GitHub setting.
- **The build watch path** that excludes `agent-outputs/*` is configured on
  the Workers Builds project and stays as it is.
- **The mirror plan changes nothing about the build.** The site still builds
  from one repository with its packages in it, which is another reason to
  prefer it over a submodule.

### GitHub Actions: minutes stop being free

| | Public repository | Private repository |
| --- | --- | --- |
| Standard Linux runners | free, unlimited | 2,000 min/month included on GitHub Free, 3,000 on Team ($4/user/month) |
| Past the included minutes | n/a | $0.006/min for Linux 2-core |

([GitHub's Actions billing
docs](https://docs.github.com/billing/managing-billing-for-github-actions/about-billing-for-github-actions);
the per-minute rate is the one in effect since GitHub's January 2026 price
cut.)

At the measured pace of about 1,700 billable minutes per ten days, that is
roughly 5,000 to 5,500 a month. On GitHub Free the included minutes run out
around day 11, and the remaining ~3,000 to 3,500 minutes cost about $20 a
month. **Before flipping visibility, check Billing, Budgets:** a $0 Actions
budget that stops at the limit makes every job fail from day 11 until the
month turns.

Cheap ways to spend less:

- **Add `paths-ignore`** for `agent-outputs/**` and `docs/**` on the CI
  workflow. A report like this one currently costs a full e2e run.
- **Run Playwright once per change, not twice.** It runs on the PR and again
  on the push to `main`; consider running it on the PR only, or sharding it.
- **Let the public mirror run the package unit tests**, where they are free.
  The private CI keeps the site, the Worker and e2e.

### Other things a private repository changes on GitHub

- **Branch protection and rulesets** are not available for private
  repositories on GitHub Free; they need Team. If `main` is protected today
  (RELEASING.md suggests it may be), that protection, including required
  status checks, stops being enforced.
- **Secret scanning push protection** is free on public repositories and
  needs the paid Secret Protection add-on on private ones. Dependabot alerts
  keep working.
- **GitHub Apps keep working if they are installed on the repository:**
  Claude, the Claude Code review and approval apps, Cloudflare. A new
  public repository needs the apps it should have (at least Claude, if
  agents will work on it).
- **The publish moves to the public repository** (question 1), because of
  npm provenance.
- **GitHub Pages:** nothing to lose; the repository doesn't use it.

## 4. Licenses

### Open: MIT for all three packages, patterns included

This is no change from today, and it is the right default:

- **It's what the code already says.** All three `package.json` files
  declare MIT, `tabbied` 0.7.0 is published as MIT, and css-doodle, its one
  runtime dependency, is MIT. Changing the license of a published package is
  churn for its users.
- **One license for the patterns too.** The patterns are css-doodle source
  compiled into the package. Putting a separate license on the JSON (CC BY
  4.0, say) would make every site that embeds `tabbied` carry two licenses
  and two attribution rules for no gain.
- **It matches the Terms.** MIT's notice requirement attaches to copies of
  the code, not to the PNGs and SVGs people export, which is what the Terms
  of Service already promise ("yours to use in personal and commercial
  projects, without attribution").
- **Apache-2.0 was considered.** Its argument is the explicit patent grant,
  and nothing here is patent-relevant.

Two gaps to close:

- **Add a LICENSE file to `packages/tabbied-mcp/` and
  `packages/tabbied-templates/`.** They declare MIT but ship no license
  text, and MIT requires the notice to travel with copies. npm always packs
  a `LICENSE` file whatever `files` says, so adding the file is enough.
- **Add a short Trademarks paragraph to the public README.** MIT grants no
  rights to the name or the mark, and the Terms already reserve both; the
  README should say so where developers read it.

### Proprietary: the templates

**In the private repository,** replace the root MIT `LICENSE` with a notice
along these lines:

```
Copyright (c) 2026 Sy Hong and Ye Joo Park. All rights reserved.

This repository is proprietary and confidential. No license is granted
except as set out in the Tabbied Terms of Service (https://tabbied.com/terms-of-service/).

The packages under packages/ are licensed separately under the MIT License;
see the LICENSE file in each package.
```

It is a notice, not a grant: nobody else can read the repository.

**In every download,** have `scripts/package-templates.mjs` write a
`LICENSE.md` into both the HTML and the React package. It should copy the
decision already made in the Terms of Service, section 7:

- **The grant:** to the account that chose the template, a worldwide,
  non-exclusive, perpetual license to use, modify and publish websites made
  from it, for themselves or for clients, including commercially. It covers
  the code, the design, the sample text and the pictures.
- **The restrictions:** no selling, sublicensing, sharing or redistributing
  it as a template, theme or starter kit; no including it in a collection of
  templates or themes; no competing service.
- **A link to the Terms**, which govern if the two ever disagree.
- **Third-party notices:** `tabbied` (MIT, loaded from esm.sh or installed
  from npm), `lucide-react` (ISC, in the React package), and the fonts,
  which load from Google Fonts and Adobe Fonts under those services' terms.

This is the shape of the licenses that Tailwind Plus and ThemeForest's
Regular License use: unlimited projects for the licensee, no redistribution
as a template. A source-available license (BSL, Elastic, PolyForm) is the
wrong tool here. Those are written for software published openly with
limits on use, and these templates are a product licensed per account.

**Fix one line in the downloads now.** The HTML package's README ends with
"Patterns by Tabbied (tabbied@x), MIT licensed." and carries no license for
the template itself, which reads as if the whole download were MIT. Say that
the `tabbied` library is MIT and the template is licensed under
`LICENSE.md`.

### The part that is not fixed by a new file

The root `LICENSE` has been MIT since 2026-06-14, and the templates have
been committed under it, in a public repository, since August. Someone who
copied the repository before it goes private can argue that those versions
are MIT, and an open-source grant cannot be withdrawn from copies already
distributed. The Terms of Service govern templates taken through the site,
not copies taken from GitHub.

The practical exposure looks small (0 forks, 10 stars), and everything added
or changed after the switch is proprietary from its first commit. But how far
the old grant reaches is a question for a lawyer, not one this plan can
settle.

## Sources

- [Publishing with npm provenance from private source repositories is no longer supported](https://github.blog/changelog/2023-07-25-publishing-with-npm-provenance-from-private-source-repositories-is-no-longer-supported/) (GitHub changelog)
- [Trusted publishing for npm packages](https://docs.npmjs.com/trusted-publishers/) (npm docs)
- [Setting repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility) (GitHub docs)
- [About billing for GitHub Actions](https://docs.github.com/billing/managing-billing-for-github-actions/about-billing-for-github-actions) (GitHub docs)
- [GitHub Actions pricing 2026](https://cicdcost.com/github-actions-pricing) (the post-January-2026 Linux rate)
- [Workers Builds: GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/) (Cloudflare docs)
- [Cloning fails on repository with a submodule](https://community.cloudflare.com/t/cloning-fails-on-repository-with-a-submodule/279527) (Cloudflare community)
