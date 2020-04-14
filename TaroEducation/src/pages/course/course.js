import  Taro,{Component} from '@tarojs/taro';
import  {View} from  '@tarojs/components';
import { observer } from '@tarojs/mobx';
import {AtActivityIndicator} from "taro-ui";
import CourseStore from '../../store/CourseStore';
import CourseBanner from '../../components/course/CourseBanner/CourseBanner';
import CourseDescription from '../../components/course/CourseDescription/CourseDescription';


@observer
class  course  extends   Component{
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    Taro.setNavigationBarTitle({
      title: this.$router.params.name
    });
    CourseStore.initCourse(this.$router.params.id);
  }

  componentDidMount() {
  }

  render(){
    if (CourseStore.courseLoading || CourseStore.simpleChapterLoading) {
      return (
        <AtActivityIndicator mode='center' content='Loading...' />
      )
    }
    return (
      <View>
        <CourseBanner />
        <CourseDescription />
      </View>
    )
  }
}
export default  course;
