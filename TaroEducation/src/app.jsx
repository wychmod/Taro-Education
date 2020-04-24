import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index'

import HomeStore from './store/HomeStore'
import CourseStore from './store/CourseStore'
import CalendarStore from './store/CalendarStore'
import AuthStore from './store/AuthStore'
import RankStore from './store/RankStore'
import './assets/css/font-awesome.css'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  HomeStore,
  CourseStore,
  CalendarStore,
  AuthStore,
  RankStore,
};

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/chat/chat',
      'pages/forum/forum',
      'pages/person/person',
      'pages/list/list',
      'pages/rank/rank',
      'pages/question/question',
      'pages/calendar/calendar',
      'pages/course/course',
      'pages/login/login',
      'pages/chapter/chapter'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#6190E8',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    }
  };

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
