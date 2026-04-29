/**
 * build-slides.mjs
 *
 * Builds every .md file in /content as a standalone Slidev presentation
 * into dist/slides/<slug>/ with the correct --base path.
 *
 * Usage: node scripts/build-slides.mjs
 */

import { execSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const contentDir = resolve(__dirname, '../content')
const rootDir = resolve(__dirname, '..')

const files = readdirSync(contentDir).filter((f) => f.endsWith('.md'))

if (files.length === 0) {
  console.log('No .md files found in /content – skipping Slidev build.')
  process.exit(0)
}

for (const file of files) {
  const slug = file.replace(/\.md$/i, '')
  const inputPath = `content/${file}`
  const outDir = `dist/slides/${slug}`
  const base = `/slides/${slug}/`

  console.log(`\nBuilding: ${slug} → ${outDir}`)

  execSync(
    `node_modules/.bin/slidev build "${inputPath}" --base "${base}" --out "${resolve(rootDir, outDir)}"`,
    { cwd: rootDir, stdio: 'inherit' },
  )
}

console.log('\nAll Slidev presentations built successfully.')
