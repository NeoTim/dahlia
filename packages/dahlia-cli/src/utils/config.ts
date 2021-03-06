import { formatCode } from './formatCode'

export const deps = [
  '@types/jest',
  '@types/react',
  '@types/react-dom',
  'dahlia',
  'react',
  'react-dom',
  'typescript',
]

export const pkg = {
  version: '0.1.0',
  scripts: {
    start: 'dh start ',
    build: 'dh build',
    test: 'dh test',
  },
  browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
  private: true,
}

// TODO: check files
export const filesToCheck = [
  'package.json',
  'public',
  'src',
  'tsconfig.json',
  'yarn.lock',
  '.gitignore',
  'README.md',
]
