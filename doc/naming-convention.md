### 命名规范

```
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
