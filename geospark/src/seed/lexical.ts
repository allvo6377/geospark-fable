/* Helpers to build Lexical rich-text JSON for seeded blog posts. */

type LexicalNode = Record<string, unknown>

export const text = (t: string, format = 0): LexicalNode => ({
  type: 'text',
  text: t,
  format,
  style: '',
  mode: 'normal',
  detail: 0,
  version: 1,
})

export const bold = (t: string): LexicalNode => text(t, 1)

export const p = (...children: LexicalNode[]): LexicalNode => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  textFormat: 0,
  textStyle: '',
  children,
})

export const h2 = (t: string): LexicalNode => ({
  type: 'heading',
  tag: 'h2',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [text(t)],
})

export const h3 = (t: string): LexicalNode => ({
  type: 'heading',
  tag: 'h3',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [text(t)],
})

export const quote = (t: string): LexicalNode => ({
  type: 'quote',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [text(t)],
})

export const ul = (...items: string[]): LexicalNode => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: items.map((it, i) => ({
    type: 'listitem',
    value: i + 1,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [text(it)],
  })),
})

export const ol = (...items: string[]): LexicalNode => ({
  type: 'list',
  listType: 'number',
  tag: 'ol',
  start: 1,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: items.map((it, i) => ({
    type: 'listitem',
    value: i + 1,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [text(it)],
  })),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const doc = (...children: LexicalNode[]): any => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children,
  },
})
