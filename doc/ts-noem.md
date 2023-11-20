### ts 注意事项[参考]

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