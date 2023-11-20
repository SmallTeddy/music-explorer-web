### git 提交规范

每次提交尽量只做一件事 没事多提交!
添加到混存区: git add .
将暂存区内容添加到本地仓库中: yarn run commit 或者 npx cz

```
1.选择 type(非必填)
以下为日志类别对照表：
feat: 新功能  |   fix: 修复    |  perf: 优化    |  refactor: 重构
style: 格式   |   revert: 回滚 |  build: 构建
test: 测试    |   ci: 集成     |  chore: 其它   |   docs: 文档
2.输入本次修改的范围(非必填)
What is the scope of this change: eg. 首页
3.输入提交的信息(必填)
Write a short, imperative tense description of the change: eg. 样式替换
4. 提交详细的描述信息(可选: 直接回车下一步)
Provide a longer description of the change: eg. 船盘 title 字体更改颜色
5.是否是一次重大的更改(可选: 直接回车下一步)
Are there any breaking changes?
6.是否影响某个 open issue(直接回车下一步)
Does this change affect any open issues?
```

#### git 常用命令

```
├─ git status 查看状态
├─ git pull 拉取远程代码
├─ git push 推送代码
├─ git reset HEAD~ 撤销暂存区内容
├─ git checkout xxx 切换版本
├─ git checkout -b xxx 创建一个分支并切换
├─ git merge xxx 合并代码
├─ git branch xxx 创建分支
├─ git branch -d xxx 删除分支
├─ git branch -v 显示所有分支
├─ git reset --hard commitId 回滚版本所对应的 commit SHA
├─ git push --force 此时本地代码落后于远程代码
```
