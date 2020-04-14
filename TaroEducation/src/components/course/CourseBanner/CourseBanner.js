import  Taro,{Component} from '@tarojs/taro';
import  {View} from  '@tarojs/components';
import { observer } from '@tarojs/mobx';
import { AtAvatar, AtRate } from 'taro-ui';
import CourseStore from '../../../store/CourseStore';
import './CourseBanner.scss';


@observer
class  CourseBanner  extends   Component{
  constructor(props) {
    super(props);
  }
  render(){
    let teacher = [];
    let course = null;
    if (CourseStore.course) {
      teacher = CourseStore.course.teachers;
      course = CourseStore.course;
    }
    return (
      <View className='course-banner'>
        <View className='course-banner-box'>
          <View className='course-banner-box-avatar'>
            <AtAvatar size='large' circle image={teacher ? teacher.head_portrait : 'https://jdc.jd.com/img/200'} />
          </View>
          <View className='course-banner-box-title'>
            <View className='course-banner-box-name'>by {teacher ?  teacher.name : '小王'}</View>
            <View className='course-banner-box-create'>{course ? course.add_time.replace(/-/g, '.').substr(0,9) : '2019.10.27'}</View>
          </View>
          <View className='course-banner-box-introduce'>
            <AtRate value={course ? course.grade : 0} />
            <View className='course-banner-box-reviews'>Reviews {course ? course.grade_number : 0}</View>
          </View>
        </View>
      </View>
    )
  }
}
export default  CourseBanner;
