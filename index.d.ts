import Vue from 'vue'

/** 场景值 */
type SceneCode =
  | 1020    // 公众号 profile 页相关小程序列表
  | 1035    // 公众号自定义菜单
  | 1036    // App 分享消息卡片
  | 1037    // 小程序打开小程序
  | 1038    // 从另一个小程序返回
  | 1043    // 公众号模板消息

/** 小程序启动时的参数 */
interface LaunchOption {
  /** 启动小程序的路径 */
  path: string
  /** 启动小程序的场景值 */
  scene: SceneCode
  /** 启动小程序的 query 参数 */
  query: any
  /** 转发信息 */
  shareTicket: string
  /** 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 `{}` */
  referrerInfo: SceneCode | {}
}

/** 页面没有找到事件参数 */
interface PageNotFoundOption {
  /** 不存在页面的路径 */
  path: string
  /** 打开不存在页面的 query 参数 */
  query: any
  /** 是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面） */
  isEntryPage: boolean
}

/** 滑动页面事件参数 */
interface PageScrollOption {
  /** 页面在垂直方向已滚动的距离（单位px） */
  scrollTop: number
}

/** 转发事件参数 */
interface ShareAppMessageOption {
  /** 转发事件来源。 `button`: 页面内转发按钮； `menu`: 右上角转发菜单 */
  from: 'button' | 'menu'
  /** 如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined */
  target: any
  /** 页面中包含web-view组件时，返回当前web-view的url */
  webViewUrl?: string
}

/** 转发配置 */
interface ShareAppMessageConfig {
  /** 转发标题 (默认: 当前小程序名称) */
  title?: string
  /** 转发路径 (默认: 当前页面 path ，必须是以 / 开头的完整路径) */
  path?: string
  /** 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。 (默认: 使用默认截图) */
  imageUrl?: string
}

/** 页面尺寸改变事件参数 */
interface ResizeOption {
  size: {
    /** 新的显示区域宽度 */
    windowWidth: number
    /** 新的显示区域高度 */
    windowHeight: number
  }
}

interface TabItemTapOption {
  /** 被点击tabItem的序号，从0开始 */
  index: string | number
  /** 被点击tabItem的页面路径 */
  pagePath: string
  /** 被点击tabItem的按钮文字 */
  text: string
}

// 声明选项属性: 添加生命周期等各种钩子
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    /** 文件类型 */
    mpType?: 'app' | 'page'
    /** 页面配置 */
    config?: any
    /** [App.vue] 小程序初始化完成时触发，全局只触发一次。参数也可以使用 `wx.getLaunchOptionsSync` 获取。 */
    onLaunch?(option: LaunchOption): void
    /** [App.vue] 小程序启动，或从后台进入前台显示时触发。也可以使用 `wx.onAppShow` 绑定监听。 */
    onShow?(option: LaunchOption): void
    /** [App.vue] 小程序从前台进入后台时触发。也可以使用 `wx.onAppHide` 绑定监听。 */
    onHide?(): void
    /** [App.vue] 小程序发生脚本错误或 API 调用报错时触发。也可以使用 `wx.onError` 绑定监听。 */
    onError?(error: string): void
    /** [App.vue] 小程序要打开的页面不存在时触发。也可以使用 `wx.onPageNotFound` 绑定监听。 */
    onPageNotFound?(option: PageNotFoundOption): void
    /** 生命周期回调—监听页面加载 */
    onLoad?(query: any): void
    /** 生命周期回调—监听页面显示 */
    onShow?(): void
    /** 生命周期回调—监听页面初次渲染完成 */
    onReady?(): void
    /** 生命周期回调—监听页面隐藏 */
    onHide?(): void
    /** 生命周期回调—监听页面卸载 */
    onUnload?(): void
    /** 监听用户下拉动作 */
    onPullDownRefresh?(): void
    /** 页面上拉触底事件的处理函数 */
    onReachBottom?(): void
    /** 用户点击右上角转发或页面内转发按钮（`button` 组件` open-type="share"`） */
    onShareAppMessage?(option: ShareAppMessageOption): ShareAppMessageConfig
    /** 页面滚动触发事件的处理函数 */
    onPageScroll?(option: PageScrollOption): void
    /** 页面尺寸改变时触发, 小程序屏幕旋转时触发 */
    onResize?(ResizeOption): void
    /** 当前是 tab 页时，点击 tab 时触发 */
    onTabItemTap?(option: TabItemTapOption): void
  }
}

declare module 'vue/types/vue' {
  // 声明原型链属性: `this.x`
  interface Vue {
    /** 寄存在 mpvue 中的各种小程序参数，请通过 `this.$root.$mp` 获取，不要在 `mounted` 生命周期之前获取 */
    $mp: {
      /** 小程序在 page onLoad 时候传递的 options */
      query: any
      /** 小程序在 app onLaunch/onShow 时候传递的 options */
      appOptions: any
    }
  }
}
