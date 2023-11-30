# Testing Web

## 项目说明

```
｜ 项目由 vue3 + vite + vue-router + element-plus + sass + ts 搭建
｜ 采用 unplugin-auto-import 和 unplugin-vue-components 做自动导入
｜ vue 等相关生命周期可直接使用
```

### 安装

```
｜ 采用yarn进行node包管理
｜ yarn 安装依赖
｜ yarn dev 运行开发环境
｜ yarn build 打包发布
```

### 资源引入顺序

```
｜ 第一级: vue 相关引入(放在最前面)、第三方插件的js、css
｜ 第二级: 组件引入
｜ 第三级: 接口 api、store、hooks、utils、私有方法
```

<details>
  <summary>命名规范</summary><br>

```bash
1. 目录名
  参照项目命名规则，有复数结构时，要采用复数命名法。
    eg. docs、assets、components、directives、mixins、utils、views
2. HTML 文件名
  全部采用小写方式， 优先选择单个单词命名，多个单词命名以下划线分隔。
3. CSS 文件名
  全部采用小写方式， 优先选择单个单词命名，多个单词命名以短横线分隔.
4. js 文件名
  全部采用小写驼峰式命名.
5. 图片命名
  全部采用小写方式， 优先选择单个单词命名，多个单词命名以下划线分隔。
  图片业务（可选）+ 图片功能类别（必选）+ 图片模块名称（可选）+ 图片精度（可选）@2x | @3x
  字体图标 统一放置/assets/icons/svg 采用svg-icon组件进行显示
  eg. logo_national.gif cargo_disc_xxx.png
6. js命名
  6.1 变量
    camelCase 类型 + 对象描述或属性的方式。 let mySchool = "我的学校"
  6.2 常量 全部大写下划线分割 使用大写字母和下划线来组合命名, 下划线用以分割单词
  6.3 方法
    camelCase 统一使用动词或者动词 + 名词形式
    私有方法下划线开头
      eg. jumpPage setFormVal _initRules
    ps:
      canXxx 判断是否可执行某个动作(权) 函数返回一个布尔值。true:可执行;false:不可执行
      hasXxx 判断是否含有某个值 函数返回一个布尔值。true:含有此值;false:不含有此值
      isXxx 判断是否为某个值 函数返回一个布尔值。true:为某个值;false:不为某个值
      getXxx 获取某个值 函数返回一个非布尔值
      setXxx 设置某个值 无返回值、返回是否设置成功或者返回链式对象

7. Vue 相关命名
  7.1 页面命名
    优先选择单个单词命名，多个单词命名驼峰式连接.
  7.2 组件命名
    业务组件: 单词大写开头 (PascalCase)
    基础组件: 采用 kebab-case
      ps: 模板中业务组件大写开头 快速区分; 基础组件 采用 kebab-case
    命名顺序: 组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾
      eg. SearchForm, SelectPort
  7.3 路由命名
    页面路径采用 kebab-case 格式 path: '/user-info'
  7.4 自定义事件
    采用 kebab-case 的事件名, 便于区分原生事件和自定义事件。
      eg. this.$emit('my-event') <MyComponent @my-event="handleDoSomething" />
  8. 特殊规范
    ref: camelCase命名方式,以ref结尾 eg. formRef, chartRef
    hooks: camelCase命名方式,以use开头Hook结尾
      eg. useTableParamsHook
    store: camelCase命名方式,以use开头Store结尾
      eg. useUserInfoStore
    dialog: 弹层model变量以dialog结尾
      eg. xxxDialog: true
    api: 调用某一接口以接口模块开头、Api结尾; 便于区分方法和接口
      eg. userApi.xxx()
  9.每个组件文件代码总行数不要超过 500行
    建议vue组件不要超过500行，既然是组件化开发，那么如果一个组件文件体积太大，存在几十个方法、几十个 data数据，那就说明这个组件大概率包含的功能点太多，是可以被继续细化出多个单一功能的子组件

  10.每个函数不要超过 100行
    不要让一个方法函数包含过多的逻辑功能，函数包含过多逻辑，容易混乱，遵循函数功能单一原则
```
</details>

<details>
  <summary>css 命名规范</summary><br>

CSS 的命名，采用 [BEM](http://getbem.com/) 命名规范，可以有效的避免组件间样式的相互污染，减少嵌套层级。具体规则如下：

#### BEM 是什么?

BEM 使用分隔符将类名区隔成三个部分：

[prefix]-[block]\_\_[element]--[modifier]

- **prefix**：全局的前缀，这里指代表 tdesign 的前缀，也就是 t-
- **Block(块)** ：组件的最外层父元素，这个类包含最通用和可重用的功能。
- **Element(元素)** ：组件内可包含一个或多个元素，元素为块添加了新功能。无需重置任何属性。
- **Modifier(修饰类)** ：块或元素都可以通过修饰词来表示为变体。

#### BEM 的特点

- 易于理解和学习
- 创建的结构易于扩展和维护

#### BEM 命名规则

通过几个常见实例，来讲解一下项目实践中的注意事项。

##### 1. 无元素和修饰类的块
##### 2. 含简单修饰类的组件

- 组件可能有变体，**变体必须使用修饰类来表示**
- **修饰类不能单独使用**。修饰类旨在增强而非替代基类

##### 3. 含元素的组件

稍微复杂的结构通常有子元素。

- 每个需要设置样式的子元素**必须**包含一个类名。
- 不要省略 HTML 中子元素的类名，否则会对组件中的元素使用更高权重的选择器。BEM 目的之一是保持样式一致和较低的权重值（specificity）。
- 如果结构具有多个层级的子元素，**类名无需反映出每个层级**。
- BEM 并不打算传达结构层级。表示组件中子元素的 BEM 类名**只需包含块名和元素名**。

##### 4. 含修饰类的元素

在某些情况下，你可能希望更改组件中的单个元素。在这种情况下，**不能**在组件上添加修饰类，只能在元素上添加修饰类。

##### 5. 基于组件修饰类调整元素样式

如果需要以相同的方式调整同一个组件内的多个元素，可以在组件的基类上添加修饰类，再基于这个修饰类来调整次级元素的样式。虽然增加了样式权重值，但修改组件更加简单了。

##### 6. 类名含有多个单词怎么办？

使用双下划线与双连字符区隔块\_\_元素--修饰类的意图正是为此。因此:

- 使用**连字符**来区隔单词，保证样式类名全小写，**不使用驼峰命名法（Camel-Case）**
- 类名应该易于阅读，因此除非缩写是普遍可识别的，否则缩写并不建议使用

```bash
<!-- GOOD -->
prefix-block\_\_element-name--modifier-name
```

```bash
<!-- BAD -->
prefix-block\_\_elementName--modifierName
```

##### 7. 如何表示组件状态？

很多组件具有多种状态，比如 tab 组件有激活状态、禁用状态。

- 使用独立的状态钩子来表示状态，状态类名以 t-is-开头，我们整理一套**推荐使用的状态类名**（见附）供君选用
- 设置状态样式时，状态类名**必须**与其作用的元素类名或者块类名联合使用（.a.b 形式），不能使用后代选择器、子选择器等其他方式设置样式，以减小对全局样式的污染
- 修饰类的作用是用来表示组件的另外一个变体，而非另外一种状态，所以状态**不使用**修饰符的形式（如 t-tabs\_\_tab-disabled）

```html
<!-- GOOD -->
<style>
  .t-tabs {
  }
  .t-tabs__tab {
  }
  .t-tabs__tab.t-is-active {
  }
  .t-tabs__tab.t-is-disabled {
  }
</style>
<div class="t-tabs">
  <ul class="t-tabs__tablist">
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-is-active">tab 1</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-is-disabled">tab 2</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab">tab 3</a>
    </li>
  </ul>
</div>
```

```html
<!-- BAD -->
<style>
  .t-tabs {
  }
  .t-tabs__tab {
  }
  .t-tabs__tabitem .t-is-active {
  }
  .t-tabs__tabitem .t-is-disabled {
  }
</style>
<div class="t-tabs">
  <ul class="t-tabs__tablist">
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-is-active">tab 1</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-is-disabled">tab 2</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab">tab 3</a>
    </li>
  </ul>
</div>
```

```html
<!-- BAD -->
<style>
  .t-tabs {
  }
  .t-tabs__tab {
  }
  .t-tabs__tab-active {
  }
  .t-tabs__tab-disabled {
  }
</style>
<div class="t-tabs">
  <ul class="t-tabs__tablist">
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-tabs__tab-active">tab 1</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-tabs__tab-disabled">tab 2</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab">tab 3</a>
    </li>
  </ul>
</div>
```

#### 常见状态类名

| **状态**  |           **类名**           |          **说明**           |
| :-------: | :--------------------------: | :-------------------------: |
|   加载    |         t-is-loading         |                             |
|   禁用    |        t-is-disabled         |                             |
|   成功    |         t-is-success         |                             |
|   报错    |          t-is-error          |                             |
|   警告    |         t-is-warning         |                             |
|   聚焦    |         t-is-focused         |                             |
|   选中    |        t-is-selected         |                             |
|   勾选    |         t-is-checked         |                             |
|   关闭    |        t-is-closable         |         是否可关闭          |
|   激活    |         t-is-active          |     比如当前 tab 选中项     |
|  当前项   |         t-is-current         | 主要用于 step，表示当前步骤 |
| 隐藏/显示 |   t-is-hidden/t-is-visible   |                             |
| 展开/折叠 | t-is-expanded/t-is-collapsed |                             |

#### 推荐常用单词

| **状态**  |           **类名**            |
| :-------: | :---------------------------: |
|    头     |            header             |
|    身     |             body              |
|    尾     |            footer             |
| 容器/内容 |  container / wrap / content   |
|   侧边    |   side / sidebar / sidemenu   |
| 边框修饰  | xxx–bordered / xxx–borderless |

#### 图标类，以 info 举例

| **说明** |            **类名**             |
| :------: | :-----------------------------: |
|   默认   |           t-icon-info           |
| 其他颜色 | t-icon-info t-icon-info--danger |
| 其他尺寸 |      t-icon-info t-size-l       |

#### 尺寸类

|  **尺寸**  |      **类名**      |  **说明**   |
| :--------: | :----------------: | :---------: |
|    较小    |     t-size-xs      | extra small |
|     小     |      t-size-s      |    small    |
| 中（默认） |      t-size-m      |   middle    |
|     大     |      t-size-l      |    large    |
|    较大    |     t-size-xl      | extra large |
| 高度 100%  | t-size-full-height |
| 宽度 100%  | t-size-full-width  |
| 宽度自适应 | t-size-auto-width  |

</details>

<details>
  <summary>ts 开发规范</summary><br>

```typescript

1、变量定义
const num = ref(0)
const str = ref('string')
const bool = ref(false)
const array = ref([]) | ref<[]>() | ref<XXX[]>() | reactive([])
const obj = ref({}) | ref({ xxx: String })
enum xxxEnum {
  已下架 = 1
  进行中
  已上线
}


2、类构造函数对象参数不使用any，同时继承父类和接口的办法
interface BaseInterface {
    getTableData(params?: unknown): unknown
    postFormData(params: unknown): unknown
    putFormData(params: unknown): unknown
    deleteRecord(ids: number[] | string[]): unknown
}

class BaseXXXClass extends BaseApiClass implements BaseInterface {
    id = 0
    readonly xxx = 'xxx'

    constructor(data: Partial<BaseXXXClass> = {}) {
        super()
        Object.assign(this, data)
    }
}

3、简写空方法
handleXXXClick(): void {
    return;
}

4、unknown类型遍历键值
export const paramsFix = (query: unknown) => {
  type typeofKey = keyof typeof query;

  if (typeof query === 'object' && query) {
    const keys = Object.keys(query);
    keys.forEach((key: string) => {
      const keyValue = query[key as typeofKey];
      if (keyValue !== undefined && keyValue !== '') {
		    console.log(keyValue);
      }
    });
  }
}

```
</details>

<details>
  <summary>git 规范规范</summary><br>

每次提交尽量只做一件事 没事多提交!
添加到混存区: git add .
将暂存区内容添加到本地仓库中: yarn run commit 或者 npx cz

```bash
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

```bash
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

</details>

<details>
  <summary>插件和库</summary><br>

### vscode plugin

| 插件名称                      | 用途                |
| :---------------------------- | :------------------ |
| Vue Language Features (Volar) | vue3 开发工具(必装) |
| ESLint                        | 代码规范(必装)      |
| prettier                      | 代码格式化(必装)    |
| Stylelint                     | -(必装)             |
| Color Highlight               | 颜色高亮工具        |
| Error Lens                    | 开发报错显示        |

### 第三方库

| 第三方库名称   | 官网                                               |
| :------------- | :------------------------------------------------- |
| vue3           | https://vuejs.org/                                 |
| vite          | https://vitejs.dev/                       |
| vue-router          | https://router.vuejs.org/zh/                       |
| element-plus | https://element-plus.org/zh-CN/       |
| typescript          | https://www.typescriptlang.org/                         |
| sass          | https://sass-lang.com/                         |
| pinia          | https://pinia.web3doc.top/                         |
| axios          | https://axios-http.com/                         |
| mock          | http://mockjs.com/                         |

</details>
