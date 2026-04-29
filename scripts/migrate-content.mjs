/**
 * migrate-content.mjs
 *
 * Migrates /content/*.md files from Reveal.js format to Slidev format:
 *   - vertical slide separator `\n--\n` → `\n---\n`
 *   - `Note:\n<text>` speaker notes → `<!--\n<text>\n-->`
 *   - theme frontmatter: Reveal.js theme names → Slidev equivalents
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const contentDir = resolve(__dirname, '../content')

const themeMap = {
  black: 'default',
  white: 'default',
  league: 'default',
  sky: 'default',
  beige: 'default',
  simple: 'default',
  solarized: 'default',
  night: 'default',
  moon: 'default',
}

function migrateTheme(frontmatter) {
  return frontmatter.replace(/^(theme:\s*)(\S+)/m, (_, prefix, theme) => {
    const mapped = themeMap[theme] ?? theme
    return `${prefix}${mapped}`
  })
}

function migrateFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return raw

  let frontmatter = match[1]
  frontmatter = migrateTheme(frontmatter)

  return `---\n${frontmatter}\n---\n${raw.slice(match[0].length)}`
}

function migrateNotes(content) {
  // `Note:\n<one or more lines until next slide separator or end>` → HTML comment
  return content.replace(/^Note:\n([\s\S]*?)(?=\n---|\n--|$)/gm, (_, noteText) => {
    return `<!--\n${noteText.trim()}\n-->`
  })
}

function migrateVerticalSeparators(content) {
  // Replace vertical `\n--\n` with horizontal `\n---\n`
  return content.replace(/\n--\n/g, '\n---\n')
}

function migrate(raw) {
  let result = migrateFrontmatter(raw)
  // Extract content after frontmatter to apply note/separator transforms
  const fmMatch = result.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  if (fmMatch) {
    const fm = fmMatch[0]
    let body = result.slice(fm.length)
    body = migrateNotes(body)
    body = migrateVerticalSeparators(body)
    result = fm + body
  } else {
    result = migrateNotes(result)
    result = migrateVerticalSeparators(result)
  }
  return result
}

const files = readdirSync(contentDir).filter((f) => f.endsWith('.md'))

for (const file of files) {
  const filePath = join(contentDir, file)
  const raw = readFileSync(filePath, 'utf8')
  const migrated = migrate(raw)
  if (migrated !== raw) {
    writeFileSync(filePath, migrated, 'utf8')
    console.log(`Migrated: ${file}`)
  } else {
    console.log(`No changes: ${file}`)
  }
}

console.log('Migration complete.')
