import  Taro,{Component} from '@tarojs/taro';
import  {View, Image} from  '@tarojs/components';
import { observer } from '@tarojs/mobx'
import { AtActivityIndicator } from 'taro-ui'
import HomeStore from "../../../store/HomeStore";
import './HomeCourses.scss'

@observer
class  HomeCourses  extends   Component{
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    HomeStore.fetchHomeCourses();
  }

  render(){
    if (HomeStore.loading) {
      return (
        <AtActivityIndicator mode='center' content='Loading...' />
      )
    }
    const courses = HomeStore.HomeCourses;
    return (
      <View className='home-courses'>
        <View className='home-courses-header'>
          <View className='home-courses-title'>推荐课程</View>
          <View className='home-courses-second-title' onClick={() => Taro.navigateTo({url: '/pages/list/list'})}>更多</View>
        </View>
        <View className='home-courses-list'>
          {courses.map(c => (
            <View
              className='home-courses-card'
              onClick={() => {Taro.navigateTo({url: `/pages/course/course?id=${c.id}&name=${c.title}`});}}
            >
              <View className='home-courses-card-title'>{c.title}</View>
              <Image className='home-courses-card-img' src={c.title_pic} />
            </View>
          ))}
        </View>
      </View>
    )
  }
}
export default  HomeCourses;
