import  Taro,{Component} from '@tarojs/taro';
import  {View, Image} from  '@tarojs/components';
import { observer } from '@tarojs/mobx';
import CourseStore from '../../../store/CourseStore';
import notebook from '../../../assets/notebook.svg';
import './CourseDescription.scss';

@observer
class  CourseDescription  extends   Component{
  constructor(props) {
    super(props);
  }
  render(){
    let course = null;
    let simpleChapter = [];
    if (CourseStore.course && CourseStore.simpleChapter) {
      course = CourseStore.course;
      simpleChapter = CourseStore.simpleChapter;
    }
    return (
      <View className='course-description'>
        <View className='course-description-title'>课程描述</View>
        <View className='course-description-main'>{course ? course.description : '无'}</View>
        <View className='course-description-title'>课程步骤</View>
        <View className='course-description-chapter'>
          {simpleChapter && simpleChapter.map(chapter => (
            <View className='course-description-chapter-item'>
              <View className='course-description-chapter-item-left'>
                <Image src={notebook} className='course-description-chapter-img' />
                <View className='course-description-chapter-content'>
                  <View className='course-description-chapter-title'>{chapter && chapter.title}</View>
                  <View className='course-description-chapter-type'>{chapter && chapter.type}</View>
                </View>
              </View>
              <View className='course-description-chapter-order'>{chapter.order > 10 ? chapter.order : '0' + chapter.order}</View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
export default  CourseDescription;
