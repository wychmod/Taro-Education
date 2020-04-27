import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import TabBar from '../../components/shared/TabBar/TabBar'
import HomeBanner from '../../components/home/HomeBanner/HomeBanner'
import HomeNavigation from '../../components/home/HomeNavigation/HomeNavigation'
import HomeCourses from '../../components/home/HomeCourses/HomeCourses'
import HomeQuestion from '../../components/home/HomeQuestion/HomeQuestion'
import { TABBAR_TYPES } from '../../constants/constants'
import AuthStore from "../../store/AuthStore";

import './index.scss'


@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  };

  componentWillMount () {
    // AuthStore.login('admin', 'admin');
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    return (
      <View className='index-main'>
        <HomeBanner />
        <HomeNavigation />
        <HomeCourses />
        <HomeQuestion />
        <TabBar current={TABBAR_TYPES.HOME} />
      </View>
    )
  }
}

export default Index 
