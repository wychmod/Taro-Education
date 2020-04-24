import  Taro,{Component} from '@tarojs/taro';
import  {View, Image} from  '@tarojs/components';
import { observer } from '@tarojs/mobx';
import AuthStore from '../../store/AuthStore';
import VIP from '../../assets/VIP.svg';
import learn from '../../assets/learn.svg';
import Collection from '../../assets/Collection.svg';
import './PersonalIntroduction.scss';

@observer
class  PersonalIntroduction  extends   Component{
  constructor(props) {
    super(props);
  }

  swtichGrade = (value) => {
    switch (value) {
      case 1:
        return '大一';
      case 2:
        return '大二';
      case 3:
        return '大三';
      case 4:
        return '大四';
    }
    return '大一';
  };

  render(){
    const name = AuthStore.name;
    const avatar = AuthStore.head_portrait;
    const sign = AuthStore.sign;
    const gender = AuthStore.gender;
    const integral = AuthStore.integral;
    const grade = AuthStore.grade;
    return (
      <View className='person-main'>
        <View className='person-banner' />
        <View className='person-card'>
          <View className='person-card-avatar'>
            <Image className='person-card-avatar-img' src={avatar} />
          </View>
          <View className='person-card-name'>
            {name}
          </View>
          <View className='person-card-sign'>
            {sign}
          </View>
          <View className='person-card-main'>
            <View className='person-card-main-item'>
              <View className='person-card-main-item-number'>{gender==='male' ? '男' : '女'}</View>
              <View className='person-card-main-item-name'>性别</View>
            </View>
            <View className='person-card-main-item'>
              <View className='person-card-main-item-number'>{this.swtichGrade(grade)}</View>
              <View className='person-card-main-item-name'>年级</View>
            </View>
            <View className='person-card-main-item'>
              <View className='person-card-main-item-number'>{integral}</View>
              <View className='person-card-main-item-name'>积分</View>
            </View>
          </View>
        </View>
        <View className='person-school'>
          <View className='person-school-left'>
            浙传课堂
          </View>
          <View className='person-school-right'>
            浙传自习
          </View>
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
export default  PersonalIntroduction;
