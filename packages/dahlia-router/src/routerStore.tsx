import React from 'react'
import { createStore } from 'dahlia-store'
import { NO_ROUTE_MATCH } from './constant'
import { interceptors } from './interceptor'

import {
  pushState,
  replaceState,
  setFullPath,
  findRooPage,
  findDefaultPage,
  getParams,
} from './util'

import { Page } from './typings'

interface Route {
  path?: string
  component?: any
  children?: Routes
}
type Routes = Route[]

const defaultPage = {
  fullPath: '**',
  component: () => <div>{NO_ROUTE_MATCH}</div>,
  root: false,
  default: false,
  parentPath: '',
} as Page
const currentPath = ''
const currentPage = {} as Page
const pages: Page[] = []
const params: {
  [key: string]: any
} = {}

const store = createStore({
  inited: false,
  defaultPage,
  pages,
  params,
  currentPath,
  currentPage,
  init(routes: Routes) {
    const pages = setFullPath(routes, '')
    store.pages = pages
    store.defaultPage = findDefaultPage(pages) || store.defaultPage
  },
  go({ path, replace }: { path: string; replace?: boolean }) {
    const { pages } = store
    const rootPage = findRooPage(pages, path)
    const params = getParams(pages)

    // handle interceptors
    if (interceptors.length) {
      let canNext = false
      for (const intercept of interceptors) {
        canNext = false
        intercept(
          {
            to: path,
            from: store.currentPath,
          },
          () => (canNext = true),
        )
        if (!canNext) break
      }

      if (!canNext) return
    }

    if (!store.inited) {
      store.inited = true
    }

    if (rootPage) {
      store.currentPath = path
      store.currentPage = rootPage
      store.params = params || {}
      replace ? replaceState(path) : pushState(path)
    }
  },
})

export default store
