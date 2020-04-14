import  Taro,{Component} from '@tarojs/taro';
import  {View, Image} from  '@tarojs/components';
import { observer } from '@tarojs/mobx';
import { AtActivityIndicator, AtSearchBar } from "taro-ui";
import HomeStore from "../../store/HomeStore";
import './list.scss';

@observer
class  list  extends   Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isSelect: false,
    }
  }

  config = {
    navigationBarTitleText: '课程列表'
  };

  componentDidMount () {
    HomeStore.fetchCourses();
  }

  onchange = (value) => {
    console.log(value);
    this.setState({
      value: value,
    });
  };

  onActionClick = () => {
    if (this.state.value !== '') {
      this.setState({
        isSelect: true
      });
      return;
    }
    this.setState({
      isSelect: false
    });
  };

  render(){
    if (HomeStore.loading) {
      return (
        <AtActivityIndicator mode='center' content='Loading...' />
      )
    }

    let courses = [];
    if (this.state.isSelect) {
      courses = HomeStore.courses.filter(c => c.title === this.state.value);
    } else {
      courses = HomeStore.courses;
    }

    return (
      <View className='list'>
        <AtSearchBar
          value={this.state.value}
          onChange={value => this.onchange(value)}
          onActionClick={() => this.onActionClick()}
        />
        <View className='courses-list'>
          {courses.map(c => (
            <View className='courses-list-item'
                  onClick={() => {Taro.navigateTo({url: `/pages/course/course?id=${c.id}&name=${c.title}`});}}
            >
              <View className='courses-list-card'>
                <Image className='courses-list-card-img' src={c.title_pic} />
              </View>
              <View className='courses-list-card-title'>{c.title}</View>
            </View>
            ))}
        </View>
      </View>
    )
  }
}
export default  list;
