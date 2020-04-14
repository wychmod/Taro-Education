import  Taro,{ Component } from '@tarojs/taro';
import  {View, Button} from  '@tarojs/components';
import { AtIcon  } from 'taro-ui'
import './HomeNavigation.scss'

class  HomeNavigation  extends   Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <View className='home-navigation'>
        <View className='home-navigation-item'>
          <Button className='home-navigation-item-button' onClick={() => {Taro.navigateTo({url: '/pages/list/list'});}}>
            <AtIcon prefixClass='fa' value='book' color='#fff' />
          </Button>
          <View className='home-navigation-item-title'>课程</View>
        </View>
        <View className='home-navigation-item'>
          <Button className='home-navigation-item-button' onClick={() => {Taro.navigateTo({url: '/pages/question/question'});}}>
            <AtIcon prefixClass='fa' value='pencil' color='#fff' />
          </Button>
          <View className='home-navigation-item-title'>做题</View>
        </View>
        <View className='home-navigation-item'>
          <Button className='home-navigation-item-button' onClick={() => {Taro.navigateTo({url: '/pages/calendar/calendar'});}}>
            <AtIcon prefixClass='fa' value='calendar' color='#fff' />
          </Button>
          <View className='home-navigation-item-title'>日历</View>
        </View>
        <View className='home-navigation-item'>
          <Button className='home-navigation-item-button' onClick={() => {Taro.navigateTo({url: '/pages/rank/rank'});}}>
            <AtIcon prefixClass='fa' value='bar-chart' color='#fff' />
          </Button>
          <View className='home-navigation-item-title'>排名</View>
        </View>
      </View>
    )
  }
}
export default  HomeNavigation;
