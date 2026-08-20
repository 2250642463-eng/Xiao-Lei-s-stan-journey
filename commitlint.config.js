export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 类型枚举
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档更新
        'style', // 代码格式（不影响代码运行的变动）
        'refactor', // 重构（既不是新功能，也不是修复 bug）
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建系统或外部依赖的变动
        'ci', // CI 配置文件和脚本的变动
        'chore', // 其他不修改 src 或测试文件的变动
        'revert', // 回退之前的 commit
      ],
    ],
    // type 必须小写
    'type-case': [2, 'always', 'lower-case'],
    // type 不能为空
    'type-empty': [2, 'never'],
    // subject 不能为空
    'subject-empty': [2, 'never'],
    // subject 结尾不能有句号
    'subject-full-stop': [2, 'never', '.'],
    // subject 最大长度
    'subject-max-length': [2, 'always', 100],
    // header 最大长度
    'header-max-length': [2, 'always', 120],
  },
}
