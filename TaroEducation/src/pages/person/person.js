import  Taro,{Component} from '@tarojs/taro';
import  {View} from  '@tarojs/components';
import { observer } from '@tarojs/mobx'
import AuthStore from '../../store/AuthStore';
import PersonalIntroduction from '../../components/person/PersonalIntroduction';
import PersonalLogin from '../../components/person/PersonalLogin';
import {TABBAR_TYPES} from "../../constants/constants";
import TabBar from "../../components/shared/TabBar/TabBar";

@observer
class  person  extends   Component{
  constructor(props) {
    super(props);
  }

  config = {
    navigationBarTitleText: '个人中心'
  };

  componentWillMount () {
    // AuthStore.login('admin', 'admin');
  }

  render(){
    const initial = AuthStore.initial;
    console.log(initial)
    if (!initial) {
      return (
        <View className='person'>
          <PersonalLogin />
          <TabBar current={TABBAR_TYPES.PERSON} />
        </View>
      )
    }
    return (
      <View className='person'>
        <PersonalIntroduction />
        <TabBar current={TABBAR_TYPES.PERSON} />
      </View>
    )
  }
}
export default  person;
