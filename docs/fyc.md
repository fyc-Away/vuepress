# 面试总结(自用)

## vue

### 聊聊对vue的理解

> vue是一个渐进式的JS框架。他易用，灵活，高效； 可以把一个页面分隔成多个组件；当其他页面有类似功能时，直接让封装的组件进行复用； 他是构建用户界面的声明式框架，只关心图层；不关心具体是如何实现的

### V-model的是什么？

> Vue的双向数据绑定是由数据劫持结合发布者订阅者实现的。 数据劫持是通过Object.defineProperty()来劫持对象数据的setter和getter操作。 在数据变动时作你想做的事
>
> - 通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化->视图更新 在初始化vue实例时，遍历data这个对象，给每一个键值对利用Object.definedProperty对data的键值对新增get和set方法，利用了事件监听DOM的机制，让视图去改变数据

### 谈谈对生命周期的理解

- beforeCreate阶段：vue实例的挂载元素el和数据对象data都是undefined，还没有初始化。
- created阶段：vue实例的数据对象data有了，可以访问里面的数据和方法，未挂载到DOM，el还没有
- beforeMount阶段：vue实例的el和data都初始化了，但是挂载之前为虚拟的dom节点
- mounted阶段：vue实例挂载到真实DOM上，就可以通过DOM获取DOM节点
- beforeUpdate阶段：响应式数据更新时调用，发生在虚拟DOM打补丁之前，适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器
- updated阶段：虚拟DOM重新渲染和打补丁之后调用，组成新的DOM已经更新，避免在这个钩子函数中操作数据，防止死循环
- beforeDestroy阶段：实例销毁前调用，实例还可以用，this能获取到实例，常用于销毁定时器，解绑事件
- destroyed阶段：实例销毁后调用，调用后所有事件监听器会被移除，所有的子实例都会被销毁

### VUE和REACT有什么区别？

> react整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在react中，是单向数据流；

> vue的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立Watcher来监听，当属性变化的时候，响应式的更新对应的虚拟dom。

### vuex的流程

```
页面通过mapAction异步提交事件到action。action通过commit把对应参数同步提交到mutation。
mutation会修改state中对于的值。 最后通过getter把对应值跑出去，在页面的计算属性中
通过mapGetter来动态获取state中的值

```

### vuex有哪几种状态和属性

> - state中保存着共有数据，数据是响应式的
> - getter可以对state进行计算操作，主要用来过滤一些数据，可以在多组件之间复用
> - mutations定义的方法动态修改state中的数据，通过commit提交方法，方法必须是同步的
> - actions将mutations里面处理数据的方法变成异步的，就是异步操作数据，通store.dispatch来分发actions，把异步的方法写在actions中，通过commit提交mutations，进行修改数据。
> - modules：模块化vuex

### vue路由的两种模式

> - hash ——即地址栏URL中的#符号（此hsah 不是密码学里的散列运算） hash 虽然出现URL中，但不会被包含在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。
> - history ——利用了HTML5 History Interface 中新增的pushState() 和replaceState() 方法
>
> 这两个方法应用于浏览器的历史记录站，在当前已有的back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改是，虽然改变了当前的URL，但你浏览器不会立即向后端发送请求。

### vue中 key 值的作用

> 当 Vue.js 用v-for正在更新已渲染过的元素列表时，它默认用“就地复用”策略。 如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

> key的作用主要是为了高效的更新虚拟DOM。

### `$route`和`$router`的区别

> - $route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
> - $router是“路由实例”对象包括了路由的跳转方法，钩子函数等。

### vue-router守卫

> - 导航守卫 router.beforeEach 全局前置守卫

- to: Route: 即将要进入的目标（路由对象）
- from: Route: 当前导航正要离开的路由
- next: Function: 一定要调用该方法来 resolve 这个钩子。（一定要用这个函数才能去到下一个路由，如果不用就拦截） 执行效果依赖 next 方法的调用参数。
- next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
- next(false): 取消进入路由，url地址重置为from路由地址(也就是将要离开的路由地址)。

```
// main.js 入口文件
    import router from './router'; // 引入路由
    router.beforeEach((to, from, next) => { 
      next();
    });
    router.beforeResolve((to, from, next) => {
      next();
    });
    router.afterEach((to, from) => {
      console.log('afterEach 全局后置钩子');
    });


```

路由独享的守卫 你可以在路由配置上直接定义 beforeEnter 守卫

```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})

```

组件内的守卫 你可以在路由组件内直接定义以下路由导航守卫

```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用，我们用它来禁止用户离开
    // 可以访问组件实例 `this`
    // 比如还未保存草稿，或者在用户离开前，
    将setInterval销毁，防止离开之后，定时器还在调用。
  }
}

```

### axios是什么？怎么使用？描述使用它实现登录功能的流程？

> 请求后台资源的模块。

```
$ npm install axios -S装好

```

> 然后发送的是跨域，需在配置文件中config/index.js进行设置。后台如果是Tp5则定义一个资源路由。 js中使用import进来，然后.get或.post。返回在.then函数中如果成功，失败则是在.catch函数中

### vue修饰符

- stop：阻止事件的冒泡
- prevent：阻止事件的默认行为
- once：只触发一次
- self：只触发自己的事件行为时，才会执行

### vue项目中的性能优化

> 1.不要在模板里面写过多表达式

> 2.循环调用子组件时添加key

> 3.频繁切换的使用v-show，不频繁切换的使用v-if

> 4.尽量少用float，可以用flex

> 5.按需加载，可以用require或者import()按需加载需要的组件

> 6.路由懒加载

### vue.extend和vue.component

> - extend 是构造一个组件的语法器。 然后这个组件你可以作用到Vue.component这个全局注册方法里 还可以在任意vue模板里使用组件。 也可以作用到vue实例或者某个组件中的components属性中并在内部使用apple组件。
> - Vue.component 你可以创建 ，也可以取组件。

### Vue组件间的参数传递

**父组件与子组件传值**

> 父组件传给子组件：子组件通过`props`方法接受数据；

- 子组件传给父组件： `$emit` 方法传递参数

**非父子组件间的数据传递，兄弟组件传值**

> `eventBus`，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。项目比较小时，用这个比较合适（虽然也有不少人推荐直接用`VUEX`，具体来说看需求）

### Vue的路由实现：hash模式 和 history模式

- `hash`模式：在浏览器中符号`“#”`，#以及#后面的字符称之为`hash`，用 `window.location.hash` 读取。特点：`hash`虽然在`URL`中，但不被包括在`HTTP`请求中；用来指导浏览器动作，对服务端安全无用，`hash`不会重加载页面。
- `history`模式：h`istory`采用`HTML5`的新特性；且提供了两个新方法： `pushState()`， `replaceState()`可以对浏览器历史记录栈进行修改，以及`popState`事件的监听到状态变更

### v-if 和 v-show 区别

- `v-if`按照条件是否渲染，`v-show`是`display`的`block`或`none`

### `keep-alive`的作用是什么

- 包裹动态组件时，会缓存不活动的组件实例,主要用于保留组件状态或避免重新渲染

> 比如有一个列表和一个详情，那么用户就会经常执行打开详情=>返回列表=>打开详情…这样的话列表和详情都是一个频率很高的页面，那么就可以对列表组件使用``进行缓存，这样用户每次返回列表的时候，都能从缓存中快速渲染，而不是重新渲染

### 指令v-el的作用是什么

> 提供一个在页面上已存在的 `DOM`元素作为 `Vue`实例的挂载目标.可以是 CSS 选择器，也可以是一个 `HTMLElement` 实例,

### 在Vue中使用插件的步骤

- 采用`ES6`的`import ... from ...`语法或`CommonJS`的`require()`方法引入插件
- 使用全局方法`Vue.use( plugin )`使用插件,可以传入一个选项对象`Vue.use(MyPlugin, { someOption: true })`

### vue的优点是什么？

- 低耦合。视图（`View`）可以独立于`Model`变化和修改，一个`ViewModel`可以绑定到不同的`"View"`上，当View变化的时候Model可以不变，当`Model`变化的时候`View`也可以不变
- 可重用性。你可以把一些视图逻辑放在一个`ViewModel`里面，让很多`view`重用这段视图逻辑
- 可测试。界面素来是比较难于测试的，而现在测试可以针对`ViewModel`来写

### 路由之间跳转？

**声明式（标签跳转）**

```text
<router-link :to="index">
```

**编程式（ js跳转）**

```text
router.push('index')
```

- 

### Vue 组件 data 为什么必须是函数

- 每个组件都是 `Vue` 的实例。
- 组件共享 `data` 属性，当 `data` 的值是同一个引用类型的值时，改变其中一个会影响其他
- 

### 怎么快速定位哪个组件出现性能问题

> 用 `timeline` 工具。 大意是通过 `timeline` 来查看每个函数的调用时常，定位出哪个函数的问题，从而能判断哪个组件出了问题

### extend 能做什么

> 这个 `API` 很少用到，作用是扩展组件生成一个构造器，通常会与 `$mount` 一起使用。

```js
// 创建组件构造器
let Component = Vue.extend({
  template: '<div>test</div>'
})
// 挂载到 #app 上
new Component().$mount('#app')
// 除了上面的方式，还可以用来扩展已有的组件
let SuperComponent = Vue.extend(Component)
new SuperComponent({
    created() {
        console.log(1)
    }
})
new SuperComponent().$mount('#app')
```

### mixin 和 mixins 区别

> `mixin` 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的

```js
Vue.mixin({
    beforeCreate() {
        // ...逻辑
        // 这种方式会影响到每个组件的 beforeCreate 钩子函数
    }
})
```

- 虽然文档不建议我们在应用中直接使用 `mixin`，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 `ajax` 或者一些工具函数等等。
- `mixins` 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 `mixins` 混入代码，比如上拉下拉加载数据这种逻辑等等。
- 另外需要注意的是 `mixins` 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并，具体可以阅读 文档。

### computed 和 watch 区别

- `computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存，只有当计算值变化才会返回内容。
- `watch` 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。
- 所以一般来说需要依赖别的属性来动态获得值的时候可以使用 `computed`，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用 `watch`。
- 另外 `computer` 和 `watch` 还都支持对象的写法，这种方式知道的人并不多。

```js
vm.$watch('obj', {
    // 深度遍历
    deep: true,
    // 立即触发
    immediate: true,
    // 执行的函数
    handler: function(val, oldVal) {}
})
var vm = new Vue({
  data: { a: 1 },
  computed: {
    aPlus: {
      // this.aPlus 时触发
      get: function () {
        return this.a + 1
      },
      // this.aPlus = 1 时触发
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})


```

### Proxy 相比于 defineProperty 的优势

- 数组变化也能监听到
- 不需要深度遍历监听

```js
let data = { a: 1 }
let reactiveData = new Proxy(data, {
	get: function(target, name){
		// ...
	},
	// ...
})
```

------


## react

### 给我介绍一下react

1. 以前我们没有jquery的时候，我们大概的流程是从后端通过ajax获取到数据然后使用jquery生成dom结果然后更新到页面当中，但是随着业务发展，我们的项目可能会越来越复杂，我们每次请求到数据，或则数据有更改的时候，我们又需要重新组装一次dom结构，然后更新页面，这样我们手动同步dom和数据的成本就越来越高，而且频繁的操作dom，也使我我们页面的性能慢慢的降低。
2. 这个时候mvvm出现了，mvvm的双向数据绑定可以让我们在数据修改的同时同步dom的更新，dom的更新也可以直接同步我们数据的更改，这个特定可以大大降低我们手动去维护dom更新的成本，**mvvm为react的特性之一，虽然react属于单项数据流，需要我们手动实现双向数据绑定。**
3. 有了mvvm还不够，因为如果每次有数据做了更改，然后我们都全量更新dom结构的话，也没办法解决我们频繁操作dom结构(降低了页面性能)的问题，为了解决这个问题，**react内部实现了一套虚拟dom结构**，也就是用js实现的一套dom结构，他的**作用是将真实dom在js中做一套缓存**，每次有数据更改的时候，react内部先使用算法，也就是鼎鼎有名的diff算法对dom结构进行对比，找到那些我们需要新增、更新、删除的dom节点，然后一次性对真实DOM进行更新，这样就大大降低了操作dom的次数。 那么diff算法是怎么运作的呢，首先，diff针对类型不同的节点，会直接判定原来节点需要卸载并且用新的节点来装载卸载的节点的位置；针对于节点类型相同的节点，会对比这个节点的所有属性，如果节点的所有属性相同，那么判定这个节点不需要更新，如果节点属性不相同，那么会判定这个节点需要更新，react会更新并重渲染这个节点。
4. react设计之初是主要负责UI层的渲染，虽然每个组件有自己的state，state表示组件的状态，当状态需要变化的时候，需要使用setState更新我们的组件，但是，我们想通过一个组件重渲染它的兄弟组件，我们就需要将组件的状态提升到父组件当中，让父组件的状态来控制这两个组件的重渲染，当我们组件的层次越来越深的时候，状态需要一直往下传，无疑加大了我们代码的复杂度，我们需要一个状态管理中心，来帮我们管理我们状态state。
5. 这个时候，redux出现了，我们可以将所有的state交给redux去管理，当我们的某一个state有变化的时候，依赖到这个state的组件就会进行一次重渲染，这样就解决了我们的我们需要一直把state往下传的问题。redux有action、reducer的概念，action为唯一修改state的来源，reducer为唯一确定state如何变化的入口，这使得redux的数据流非常规范，同时也暴露出了redux代码的复杂，本来那么简单的功能，却需要完成那么多的代码。
6. 后来，社区就出现了另外一套解决方案，也就是mobx，它推崇代码简约易懂，只需要定义一个可观测的对象，然后哪个组价使用到这个可观测的对象，并且这个对象的数据有更改，那么这个组件就会重渲染，而且mobx内部也做好了是否重渲染组件的生命周期shouldUpdateComponent，不建议开发者进行更改，这使得我们使用mobx开发项目的时候可以简单快速的完成很多功能，连redux的作者也推荐使用mobx进行项目开发。但是，随着项目的不断变大，mobx也不断暴露出了它的缺点，就是数据流太随意，出了bug之后不好追溯数据的流向，这个缺点正好体现出了redux的优点所在，所以针对于小项目来说，社区推荐使用mobx，对大项目推荐使用redux



### react和vue的区别

```
   =>  相同点：
	1.数据驱动页面，提供响应式的视图组件
	2.都有virtual DOM,组件化的开发，通过props参数进行父子之间组件传递数据，都实现了webComponents规范
	3.数据流动单向，都支持服务器的渲染SSR
	4.都有支持native的方法，react有React native， vue有wexx
=>  不同点：
	1.数据绑定：Vue实现了双向的数据绑定，react数据流动是单向的
	2.数据渲染：大规模的数据渲染，react更快
	3.使用场景：React配合Redux架构适合大规模多人协作复杂项目，Vue适合小快的项目
	4.开发风格：react推荐做法jsx + inline style把html和css都写在js了
		    vue是采用webpack + vue-loader单文件组件格式，html, js, css同一个文件

```

### 纯函数

```
Redux数据流里，reduces其实是根据之前的状态（previous state）和现有的action（current action）
更新state(这个state可以理解为上下累加器的结果）
每次redux reducer被执行时，state和action被传入，这个state根据action进行累加或者是'自身消减'(reduce),
进而返回最新的state,这也就是典型reduce函数的用法：state ->  action ->  state

```

### react的refs

```
refs就想一个逃生窗，允许我们之间访问dom元素或者组件实例，可以向组件添加一个ref属性的值是一个回调函数，
它将接受底层dom元素或组件的已挂在实例，作为第一个参数

```

### react中的keys

```
帮组我们跟踪哪些项目已更改、添加、从列表中删除，key是独一无二的，可以让我们高效的去定位元素，并且操作它

```

### React的生命周期

```
三个状态：Mounting(已插入真实的DOM）
	  Updating(正在被重新渲染)
	  Unmounting(已移除真实的DOM)
componentDIdMount 在第一次渲染后调用，只在客服端。之后组件已经生成对应的DOM结构，
componentDidUpdate 在组件完成更新后立即调用，在出初始化是不会调用

```

### React子组件向父组件传值

```
父组件通过props 给子组件传递数据，子组件则是通过调用父组件传给它的函数给父组件传递数据。

```

### 为什么虚拟DOM会提高性能 

```
虚拟DOM相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能
具体实现步骤：
	·用JavaScript对象结构表示DOM树的结构；然后用这个树构建一个真正的DOM树，插到文档中
        ·当状态变更的时候，重新构造一棵树的对象树，然后用新的树和旧的树进行对比，记录两棵树差异
	·把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。

```

### reac性能优化是哪个周期函

```
shouldComponentUpdate 这个方法用来判断是否需要调用render方法重新描绘dom.因为dom的描绘非常消耗性能，
如果我们在shouldComponentUpdate方法中能够写出更优化的dom diff算法，可以极大的提高性能

```

### 怎么划分业务组件和技术组件

```
根据组件的职责通常把组件分为UI组件和容器组件
UI组件负责UI的呈现，容器组件负责管理数据和逻辑
两者通过React-redux提供connect方法联系起来

```

### setState

```
setState通过一个队列机制实现state更新，当执行setState时，会将需要更新的state很后放入状态队列
而不会立即更新this.state，队列机制可以高效地批量更新state。如果不通过setState而直接修改this.state的值	
那么该state将不会被放入状态队列中。当下次调用setState并对状态队列进行合并时，就会忽略之前修改的state，造成不可预知的错误

同时，也利用了队列机制实现了setState的异步更新，避免了频繁的重复更新state

同步更新state:
	setState 函数并不会阻塞等待状态更新完毕，因此 setNetworkActivityIndicatorVisible 有可能先于数据渲染完毕就执行。
	第二个参数是一个回调函数，在setState的异步操作结束并且组件已经重新渲染的时候执行
	也就是说，我们可以通过这个回调来拿到更新的state的值，实现代码的同步

例子：componentDidMount() {

	fetch('https://test.com')
    
	.then((res) => res.json())
    
	.then(
    (data) => {
this.setState({ data:data });
			StatusBar.setNetworkActivityIndicatorVisible(false);
        }
```

### shouldComponentUpdate 

shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。

### 展示组件(Presentational component)和容器组件(Container component)之间有何不同

- 展示组件关心组件看起来是什么。展示专门通过 props 接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心 UI 状态而不是数据的状态。
- 容器组件则更关心组件是如何运作的。容器组件会为展示组件或者其它容器组件提供数据和行为(behavior)，它们会调用 Flux actions，并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是(其它组件的)数据源。

### 类组件(Class component)和函数式组件(Functional component)之间有何不同

- 类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态
- 当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 '无状态组件(stateless component)'，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件

### 状态(state)和属性(props)之间有何不同

- State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。
- Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据--回调函数也可以通过 props 传递。

### 何为受控组件(controlled component)

在 HTML 中，类似 ``, `` 和 `` 这样的表单元素会维护自身的状态，并基于用户的输入来更新。当用户提交表单时，前面提到的元素的值将随表单一起被发送。但在 React 中会有些不同，包含表单元素的组件将会在 state 中追踪输入的值，并且每次调用回调函数时，如 onChange 会更新 state，重新渲染组件。一个输入表单元素，它的值通过 React 的这种方式来控制，这样的元素就被称为"受控元素"。

### 何为高阶组件(higher order component)

高阶组件是一个以组件为参数并返回一个新组件的函数。HOC 运行你重用代码、逻辑和引导抽象。最常见的可能是 Redux 的 connect 函数。除了简单分享工具库和简单的组合，HOC 最好的方式是共享 React 组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的 HOC。

### 为什么建议传递给 setState 的参数是一个 callback 而不是一个对象

因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state。

### 除了在构造函数中绑定 this，还有其它方式吗

你可以使用属性初始值设定项(property initializers)来正确绑定回调，create-react-app 也是默认支持的。在回调中你可以使用箭头函数，但问题是每次组件渲染时都会创建一个新的回调。

### (在构造函数中)调用 super(props) 的目的是什么

在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。

### 应该在 React 组件的何处发起 Ajax 请求

在 React 组件中，应该在 componentDidMount 中发起网络请求。这个方法会在组件第一次“挂载”(被添加到 DOM)时执行，在组件的生命周期中仅会执行一次。更重要的是，你不能保证在组件挂载之前 Ajax 请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用 setState，这将不起作用。在 componentDidMount 中发起网络请求将保证这有一个组件可以更新了。

### 事件在 React 中的处理方式

为了解决跨浏览器兼容性问题，您的 React 中的事件处理程序将传递 SyntheticEvent 的实例，它是 React 的浏览器本机事件的跨浏览器包装器。

这些 SyntheticEvent 与您习惯的原生事件具有相同的接口，除了它们在所有浏览器中都兼容。有趣的是，React 实际上并没有将事件附加到子节点本身。React 将使用单个事件监听器监听顶层的所有事件。这对于性能是有好处的，这也意味着在更新 DOM 时，React 不需要担心跟踪事件监听器。

### createElement 和 cloneElement 有什么区别

React.createElement():JSX 语法就是用 React.createElement()来构建 React 元素的。它接受三个参数，第一个参数可以是一个标签名。如 div、span，或者 React 组件。第二个参数为传入的属性。第三个以及之后的参数，皆作为组件的子组件。

```
React.createElement(
    type,
    [props],
    [...children]
)
```

React.cloneElement()与 React.createElement()相似，不同的是它传入的第一个参数是一个 React 元素，而不是标签名或组件。新添加的属性会并入原有的属性，传入到返回的新元素中，而就的子元素奖杯替换。

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

### React 中有三种构建组件的方式

React.createClass()、ES6 class 和无状态函数。

### react 组件的划分业务组件技术组件

- 根据组件的职责通常把组件分为 UI 组件和容器组件。
- UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
- 两者通过 React-Redux 提供 connect 方法联系起来。

------



## 小程序

### 微信小程序有几个文件

- `WXSS (WeiXin Style Sheets)`是一套样式语言，用于描述 `WXML` 的组件样式， `js` 逻辑处理，网络请求`json`小程序设置，如页面注册，页面标题及 `tabBar`。
- `app.json` 必须要有这个文件，如果没有这个文件，项目无法运行，因为微信框架把这个作为配置文件入口，整个小程序的全局配置。包括页面注册，网络设置，以及小程序的`window` 背景色，配置导航条样式，配置默认标题。
- `app.js` 必须要有这个文件，没有也是会报错！但是这个文件创建一下就行 什么都不需要写以后我们可以在这个文件中监听并处理小程序的生命周期函数、声明全局变量。
- `app.wxss` 配置全局 `css`

### 微信小程序怎样跟事件传值

> 给 `HTML` 元素添加 `data-*`属性来传递我们需要的值，然后通过 `e.currentTarget.dataset` 或`onload`的`param`参数获取。但 `data -` 名称不能有大写字母和不可以存放对象

### 小程序的 wxss 和 css 有哪些不一样的

- `wxss`的图片引入需使用外链地址
- 没有 `Body`；样式可直接使用 `import` 导入

### 关联微信公众号如何确定用户的唯一性

> 使用 `wx.getUserInfo` 方法 `withCredentials` 为 `true` 时 可获取 `encryptedData`，里面有 `union_id`。后端需要进行对称解密

### 微信小程序与vue区别

- 生命周期不一样，微信小程序生命周期比较简单
- 数据绑定也不同，微信小程序数据绑定需要使用`{{}}`，`vue` 直接`:`就可以
- 显示与隐藏元素，`vue`中，使用 `v-if` 和 `v-show` 控制元素的显示和隐藏，小程序中，使用`wx-if` 和`hidden` 控制元素的显示和隐藏
- 事件处理不同，小程序中，全用 `bindtap(bind+event)`，或者 `catchtap(catch+event)` 绑定事件,`vue：`使用 `v-on:event` 绑定事件，或者使用`@event` 绑定事件
- 数据双向绑定也不也不一样在 `vue`中,只需要再表单元素上加上 `v-model`,然后再绑定 `data`中对应的一个值，当表单元素内容发生变化时，`data`中对应的值也会相应改变，这是 `vue`非常 nice 的一点。微信小程序必须获取到表单元素，改变的值，然后再把值赋给一个 `data`中声明的变量。

### 登录

**unionid和openid**

> 了解小程序登陆之前，我们写了解下小程序/公众号登录涉及到两个最关键的用户标识：

- `OpenId` 是一个用户对于一个小程序／公众号的标识，开发者可以通过这个标识识别出用户。
- `UnionId` 是一个用户对于同主体微信小程序／公众号／`APP`的标识，开发者需要在微信开放平台下绑定相同账号的主体。开发者可通过`UnionId`，实现多个小程序、公众号、甚至APP 之间的数据互通了。

**关键Api**

- `wx.login` 官方提供的登录能力
- `wx.checkSession`校验用户当前的`session_key`是否有效
- `wx.authorize` 提前向用户发起授权请求
- `wx.getUserInfo` 获取用户基本信息

**登录流程设计**

- **利用现有登录体系**

> 直接复用现有系统的登录体系，只需要在小程序端设计用户名，密码/验证码输入页面，便可以简便的实现登录，只需要保持良好的用户体验即可

- **利用`OpenId` 创建用户体系**

> `OpenId` 是一个小程序对于一个用户的标识，利用这一点我们可以轻松的实现一套基于小程序的用户体系，值得一提的是这种用户体系对用户的打扰最低，可以实现静默登录。具体步骤如下

- 小程序客户端通过 `wx.login` 获取 `code`
- 传递 `code` 向服务端，服务端拿到 code 调用微信登录凭证校验接口，微信服务器返回 `openid` 和会话密钥 `session_key` ，此时开发者服务端便可以利用 `openid` 生成用户入库，再向小程序客户端返回自定义登录态
- 小程序客户端缓存 （通过`storage`）自定义登录态（`token`），后续调用接口时携带该登录态作为用户身份标识即可

**利用 Unionid 创建用户体系**

> 如果想实现多个小程序，公众号，已有登录系统的数据互通，可以通过获取到用户 `unionid` 的方式建立用户体系。因为 `unionid` 在同一开放平台下的所所有应用都是相同的，通过 `unionid` 建立的用户体系即可实现全平台数据的互通，更方便的接入原有的功能，那如何获取 `unionid` 呢，有以下两种方式

- 如果户关注了某个相同主体公众号，或曾经在某个相同主体`App`、公众号上进行过微信登录授权，通过 `wx.login` 可以直接获取 到 `unionid`

- 结合

   

  ```
  wx.getUserInfo
  ```

   

  和

   

  ```
  <button open-type="getUserInfo"><button/>
  ```

   

  这两种方式引导用户主动授权，主动授权后通过返回的信息和服务端交互 (这里有一步需要服务端解密数据的过程，很简单，微信提供了示例代码) 即可拿到

   

  ```
  unionid
  ```

   

  建立用户体系， 然后由服务端返回登录态，本地记录即可实现登录，附上微信提供的最佳实践

  - 调用 `wx.login` 获取 `code`，然后从微信后端换取到 `session_key`，用于解密 `getUserInfo`返回的敏感数据

  - 使用

     

    ```
    wx.getSetting
    ```

     

    获取用户的授权情况

    - 如果用户已经授权，直接调用 `API` `wx.getUserInfo` 获取用户最新的信息；
    - 用户未授权，在界面中显示一个按钮提示用户登入，当用户点击并授权后就获取到用户的最新信息

  - 获取到用户数据后可以进行展示或者发送给自己的后端。

注意事项

- 需要获取 `unionid` 形式的登录体系，在以前（18年4月之前）是通过以下这种方式来实现，但后续微信做了调整（因为一进入小程序，主动弹起各种授权弹窗的这种形式，比较容易导致用户流失），调整为必须使用按钮引导用户主动授权的方式，这次调整对开发者影响较大，开发者需要注意遵守微信的规则，并及时和业务方沟通业务形式，不要存在侥幸心理，以防造成小程序不过审等情况

```text
 wx.login(获取code) ===> wx.getUserInfo(用户授权) ===> 获取 unionid
```

- 因为小程序不存在 `cookie` 的概念， 登录态必须缓存在本地，因此强烈建议为登录态设置过期时间
- 值得一提的是如果需要支持风控安全校验，多平台登录等功能，可能需要加入一些公共参数，例如`platform`，`channel`，`deviceParam`等参数。在和服务端确定方案时，作为前端同学应该及时提出这些合理的建议，设计合理的系统。
- `openid` ， `unionid` 不要在接口中明文传输，这是一种危险的行为，同时也很不专业

### 图片导出

> 这是一种常见的引流方式，一般同时会在图片中附加一个小程序二维码。

**基本**

- 借助 `canvas` 元素，将需要导出的样式首先在 `canvas` 画布上绘制出来 （`api`基本和`h5`保持一致，但有轻微差异，使用时注意即可
- 借助微信提供的 `canvasToTempFilePath` 导出图片，最后再使用 `saveImageToPhotosAlbum` （需要授权）保存图片到本地

**如何优雅实现**

- 绘制出需要的样式这一步是省略不掉的。但是我们可以封装一个绘制库，包含常见图形的绘制，例如矩形，圆角矩形，圆， 扇形， 三角形， 文字，图片减少绘制代码，只需要提炼出样式信息，便可以轻松的绘制，最后导出图片存入相册。笔者觉得以下这种方式绘制更为优雅清晰一些，其实也可以使用加入一个type参数来指定绘制类型，传入的一个是样式数组，实现绘制。
- 结合上一步的实现，如果对于同一类型的卡片有多次导出需求的场景，也可以使用自定义组件的方式，封装同一类型的卡片为一个通用组件，在需要导出图片功能的地方，引入该组件即可。

```js
class CanvasKit {
   constructor() {
   }
   drawImg(option = {}) {
     ...
     return this
   }
   drawRect(option = {}) {
     return this
   }
   drawText(option = {}) {
     ...
     return this
   }
   static exportImg(option = {}) {
     ...
   }
 }

 let drawer = new CanvasKit('canvasId').drawImg(styleObj1).drawText(styleObj2)
 drawer.exportImg()
```

注意事项

- 小程序中无法绘制网络图片到`canvas`上，需要通过`downLoadFile` 先下载图片到本地临时文件才可以绘制
- 通常需要绘制二维码到导出的图片上，有一种方式导出二维码时，需要携带的参数必须做编码，而且有具体的长度（`32`可见字符）限制，可以借助服务端生成 短链接 的方式来解决

### 数据统计

> 数据统计作为目前一种常用的分析用户行为的方式，小程序端也是必不可少的。小程序采取的曝光，点击数据埋点其实和h5是一样的。但是埋点作为一个和业务逻辑不相关的需求，我们如果在每一个点击事件，每一个生命周期加入各种埋点代码，则会干扰正常的业务逻辑，和使代码变的臃肿，笔者提供以下几种思路来解决数据埋点

**设计一个埋点sdk**

> 小程序的代码结构是，每一个 `Page` 中都有一个 `Page` 方法，接受一个包含生命周期函数，数据的 业务逻辑对象 包装这层数据，借助小程序的底层逻辑实现页面的业务逻辑。通过这个我们可以想到思路，对`Page`进行一次包装，篡改它的生命周期和点击事件，混入埋点代码，不干扰业务逻辑，只要做一些简单的配置即可埋点，简单的代码实现如下

```js
// 代码仅供理解思路
 page = function(params) {
   let keys = params.keys()
   keys.forEach(v => {
       if (v === 'onLoad') {
         params[v] = function(options) {
           stat()   //曝光埋点代码
           params[v].call(this, options)
         }
       }
       else if (v.includes('click')) {
         params[v] = funciton(event) {
           let data = event.dataset.config
           stat(data)  // 点击埋点
           param[v].call(this)
         }
       }
   })
 }
```

> 这种思路不光适用于埋点，也可以用来作全局异常处理，请求的统一处理等场景。

**分析接口**

> 对于特殊的一些业务，我们可以采取 接口埋点，什么叫接口埋点呢？很多情况下，我们有的`api`并不是多处调用的，只会在某一个特定的页面调用，通过这个思路我们可以分析出，该接口被请求，则这个行为被触发了，则完全可以通过服务端日志得出埋点数据，但是这种方式局限性较大，而且属于分析结果得出过程，可能存在误差，但可以作为一种思路了解一下。

**微信自定义数据分析**

> 微信本身提供的数据分析能力，微信本身提供了常规分析和自定义分析两种数据分析方式，在小程序后台配置即可。借助小程序数据助手这款小程序可以很方便的查看

### 工程化

**工程化做什么**

> 目前的前端开发过程，工程化是必不可少的一环，那小程序工程化都需要做些什么呢，先看下目前小程序开发当中存在哪些问题需要解决：

- 不支持 `css`预编译器,作为一种主流的 `css`解决方案，不论是 `less`,`sass`,`stylus` 都可以提升`css`效率
- 不支持引入npm包 （这一条，从微信公开课中听闻，微信准备支持）
- 不支持`ES7`等后续的`js`特性，好用的`async await`等特性都无法使用
- 不支持引入外部字体文件，只支持`base64`
- 没有 `eslint` 等代码检查工具

**方案选型**

> 对于目前常用的工程化方案，`webpack`，`rollup`，`parcel`等来看，都常用与单页应用的打包和处理，而小程序天生是 “多页应用” 并且存在一些特定的配置。根据要解决的问题来看，无非是文件的编译，修改，拷贝这些处理，对于这些需求，我们想到基于流的 `gulp`非常的适合处理，并且相对于`webpack`配置多页应用更加简单。所以小程序工程化方案推荐使用 `gulp`

**具体开发思路**

> 通过 `gulp` 的 `task` 实现：

- 实时编译 `less` 文件至相应目录
- 引入支持`async`，`await`的运行时文件
- 编译字体文件为`base64` 并生成相应`css`文件，方便使用
- 依赖分析哪些地方引用了`npm`包，将`npm`包打成一个文件，拷贝至相应目录
- 检查代码规范

### 小程序架构

![img](https://user-images.githubusercontent.com/2350193/44563914-ff97c380-a792-11e8-8e77-6d0970891e24.png)

> 微信小程序的框架包含两部分 `View` 视图层、`App Service`逻辑层。`View` 层用来渲染页面结构，`AppService` 层用来逻辑处理、数据请求、接口调用。

它们在两个线程里运行。

> 视图层和逻辑层通过系统层的 `JSBridage` 进行通信，逻辑层把数据变化通知到视图层，触发视图层页面更新，视图层把触发的事件通知到逻辑层进行业务处理

![img](https://user-images.githubusercontent.com/2350193/44186238-db146980-a14a-11e8-8096-bcb8fa6d28b2.png)

- 视图层使用 `WebView` 渲染，`iOS`中使用自带 `WKWebView`，在 `Android` 使用腾讯的 `x5`内核（基于 `Blink`）运行。
- 逻辑层使用在 `iOS` 中使用自带的 `JSCore` 运行，在 `Android`中使用腾讯的 `x5` 内核（基于 `Blink`）运行。
- 开发工具使用 `nw.js` 同时提供了视图层和逻辑层的运行环境。

### WXML && WXSS

**WXML**

- 支持数据绑定
- 支持逻辑算术、运算
- 支持模板、引用
- 支持添加事件（`bindtap`）
- `Wxml`编译器：`Wcc` 把 `Wxml`文件 转为 `JS`
- 执行方式：`Wcc index.wxml`
- 使用 `Virtual DOM`，进行局部更新

**WXSS**

- wxss编译器：`wcsc` 把`wxss`文件转化为 `js`
- 执行方式： `wcsc index.wxss`

**尺寸单位 rpx**

> `rpx（responsive pixel`）: 可以根据屏幕宽度进行自适应。规定屏幕宽为 `750rpx`。公式：

```js
const dsWidth = 750

export const screenHeightOfRpx = function () {
  return 750 / env.screenWidth * env.screenHeight
}

export const rpxToPx = function (rpx) {
  return env.screenWidth / 750 * rpx
}

export const pxToRpx = function (px) {
  return 750 / env.screenWidth * px
}
```

**样式导入**

> 使用 `@import`语句可以导入外联样式表，`@import`后跟需要导入的外联样式表的相对路径，用 `;` 表示语句结束

**内联样式**

> 静态的样式统一写到 `class` 中。`style` 接收动态的样式，在运行时会进行解析，请尽量避免将静态的样式写进 `style` 中，以免影响渲染速度

**全局样式与局部样式**

> 定义在 `app.wxss` 中的样式为全局样式，作用于每一个页面。在`page` 的 `wxss` 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 `app.wxss` 中相同的选择器

### 小程序有什么问题

- 小程序仍然使用 `WebView` 渲染，并非原生渲染。（部分原生）
- 服务端接口返回的头无法执行，比如：`Set-Cookie`。
- 依赖浏览器环境的 `JS`库不能使用。
- 不能使用 `npm`，但是可以自搭构建工具或者使用 `mpvue`。（未来官方有计划支持）
- 不能使用 `ES7`，可以自己用`babel+webpack`自搭或者使用 `mpvue`。
- 不支持使用自己的字体（未来官方计划支持）。
- 可以用 `base64` 的方式来使用 `iconfont`。
- 小程序不能发朋友圈（可以通过保存图片到本地，发图片到朋友前。二维码可以使用B接口）。
- 获取二维码/小程序接口的限制
- 程序推送只能使用“服务通知” 而且需要用户主动触发提交 `formId`，`formId` 只有7天有效期。（现在的做法是在每个页面都放入`form`并且隐藏以此获取更多的 `formId`。后端使用原则为：优先使用有效期最短的）
- 小程序大小限制 2M，分包总计不超过 8M
- 转发（分享）小程序不能拿到成功结果，原来可以。链接（小游戏造的孽）

### 授权获取用户信息流程

- `session_key` 有有效期，有效期并没有被告知开发者，只知道用户越频繁使用小程序，`session_key` 有效期越长
- 在调用 `wx.login` 时会直接更新 `session_key`，导致旧 `session_key` 失效
- 小程序内先调用 `wx.checkSession` 检查登录态，并保证没有过期的 `session_key` 不会被更新，再调用 `wx.login` 获取 `code`。接着用户授权小程序获取用户信息，小程序拿到加密后的用户数据，把加密数据和 `code` 传给后端服务。后端通过 `code` 拿到 `session_key` 并解密数据，将解密后的用户信息返回给小程序

### 先授权获取用户信息再 login 会发生什么

- 用户授权时，开放平台使用旧的 `session_key` 对用户信息进行加密。调用 `wx.login` 重新登录，会刷新 `session_key`，这时后端服务从开放平台获取到新 `session_key`，但是无法对老 `session_key` 加密过的数据解密，用户信息获取失败
- 在用户信息授权之前先调用 `wx.checkSession` 呢？`wx.checkSession` 检查登录态，并且保证 wx.login 不会刷新 `session_key`，从而让后端服务正确解密数据。但是这里存在一个问题，如果小程序较长时间不用导致 `session_key` 过期，则 `wx.login` 必定会重新生成 `session_key`，从而再一次导致用户信息解密失败