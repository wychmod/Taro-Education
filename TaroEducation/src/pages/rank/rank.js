import  Taro,{Component} from '@tarojs/taro';
import  {View, Image} from  '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import AuthStore from '../../store/AuthStore';
import RankStore from '../../store/RankStore';
import './rank.scss'

@observer
class  rank  extends   Component{
  constructor(props) {
    super(props);
  }

  config = {
    navigationBarTitleText: '排行榜'
  };

  componentWillMount () {
    // AuthStore.login('admin', 'admin');
    const initial = AuthStore.initial;
    if (!initial) {
      Taro.navigateTo({ url: '/pages/login/login' });
    }
    RankStore.fetchRankItem();
  }

  render(){
    const avatar = AuthStore.head_portrait;
    const name = AuthStore.name;
    const integral = AuthStore.integral;
    const rankItem = RankStore.rankItem;


    return (
      <View>
        <View className='rank-banner'>
          <View className='rank-banner-avatar'>
            <Image src={avatar} className='rank-banner-avatar-img' />
          </View>
          <View className='rank-banner-name'>{name}</View>
          <View className='rank-banner-grade'>{integral}</View>
        </View>
        {rankItem.map((item, index)=>(
          <View className='rank-item'>
            <View className='rank-item-left'>
              <View className='rank-item-number'>{index+1 < 10 ? '0'+(index+1) : (index+1)}</View>
              <Image src={item.head_portrait} className='rank-item-img'/>
              <View className='rank-item-name'>{item.name}</View>
            </View>
            <View className='rank-item-right'>{item.integral}</View>
          </View>
        ))}
      </View>
    )
  }
}
export default  rank;
