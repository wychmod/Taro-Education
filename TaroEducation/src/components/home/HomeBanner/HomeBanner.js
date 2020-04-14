import  Taro,{Component} from '@tarojs/taro';
import  {View, Image} from  '@tarojs/components';
import bannerPng from '../../../assets/home_banner.svg'
import './HomeBanner.scss'

class  HomeBanner  extends   Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <View className='home-banner'>
        <View className='home-banner-main'>
          <View className='home-banner-main-left'>
            <Image className='home-banner-img' src={bannerPng} />
          </View>
          <View className='home-banner-main-right'>
            <View className='home-banner-main-title'>
              Hey Guys
            </View>
            <View className='home-banner-main-info'>
              come to study !
            </View>
            <View className='home-banner-main-button'>
              let`s start
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default  HomeBanner;
