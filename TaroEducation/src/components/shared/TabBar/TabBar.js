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
        Taro.navigateTo({url: '/pages/course/course'});
        break;
      case 2:
        Taro.navigateTo({url: '/pages/question/question'});
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
            { title: '论坛', iconType: 'message' },
            { title: '竞赛', iconType: 'edit' },
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
