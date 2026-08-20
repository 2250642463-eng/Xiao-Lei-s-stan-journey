import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

/**
 * 自定义渲染函数，可以包装 Provider
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options })
}

// 导出常用的 testing-library 工具
export { screen, waitFor, fireEvent, within } from '@testing-library/react'
