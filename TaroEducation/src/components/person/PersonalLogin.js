import  Taro,{Component} from '@tarojs/taro';
import {View, Text, Button, Image} from '@tarojs/components';
import { observer } from '@tarojs/mobx'
import './PersonalLogin.scss'
import VIP from "../../assets/VIP.svg";
import learn from "../../assets/learn.svg";
import Collection from "../../assets/Collection.svg";

@observer
class  PersonalLogin  extends   Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View className='person-main'>
        <View className='person-banner'>
          <View className='person-banner-button' onClick={() => Taro.redirectTo({url: '/pages/login/login'})}>登录/注册</View>
        </View>
        <View className='person-button'>
          <View className='person-button-left'>
            <Image src={VIP} className='person-button-left-img' />
            <View className='person-button-left-text'>历史足迹</View>
          </View>
          <View className='person-button-right'>></View>
        </View>
        <View className='person-button'>
          <View className='person-button-left'>
            <Image src={learn} className='person-button-left-img' />
            <View className='person-button-left-text'>我的学习</View>
          </View>
          <View className='person-button-right'>></View>
        </View>
        <View className='person-button'>
          <View className='person-button-left'>
            <Image src={Collection} className='person-button-left-img' />
            <View className='person-button-left-text'>我的收藏</View>
          </View>
          <View className='person-button-right'>></View>
        </View>
      </View>
    )
  }
}
export default  PersonalLogin;
