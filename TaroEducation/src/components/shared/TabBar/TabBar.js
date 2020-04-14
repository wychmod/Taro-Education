import  Taro,{ Component } from '@tarojs/taro';
import  {View} from  '@tarojs/components';
import { AtTabBar } from 'taro-ui';

class  TabBar  extends Component{
  constructor(props) {
    super(props);
  }

  handleClick = (value) => {
    switch (value) {
      case 0:
        Taro.navigateTo({url: '/pages/index/index'});
        break;
      case 1:
        Taro.navigateTo({url: '/pages/chat/chat'});
        break;
      case 2:
        Taro.navigateTo({url: '/pages/forum/forum'});
        break;
      case 3:
        Taro.navigateTo({url: '/pages/person/person'});
        break;
    }
  };

  render(){
    return (
      <View>
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'bullet-list' },
            { title: '聊天', iconType: 'message' },
            { title: '论坛', iconType: 'edit' },
            { title: '个人', iconType: 'home' }
          ]}
          onClick={this.handleClick}
          current={this.props.current}
        />
      </View>
    )
  }
}
export default  TabBar;
