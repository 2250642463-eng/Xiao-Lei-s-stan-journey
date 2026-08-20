import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>React 19 + TypeScript</h1>
        <p>现代化前端开发框架</p>
      </header>

      <main className="app-main">
        <div className="card">
          <h2>欢迎使用</h2>
          <p>这是一个基于 React 19 和 TypeScript 的项目模板</p>
          
          <div className="counter">
            <button onClick={() => setCount(count - 1)}>-</button>
            <span>计数: {count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        </div>

        <div className="features">
          <h3>特性</h3>
          <ul>
            <li>⚡️ Vite - 极速的开发体验</li>
            <li>⚛️ React 19 - 最新版本</li>
            <li>🔷 TypeScript - 类型安全</li>
            <li>📏 ESLint - 代码质量检查</li>
            <li>💅 Prettier - 代码格式化</li>
          </ul>
        </div>
      </main>

      <footer className="app-footer">
        <p>查看 docs/ 目录了解更多开发规范</p>
      </footer>
    </div>
  )
}

export default App
