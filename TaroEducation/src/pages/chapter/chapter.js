import  Taro,{Component} from '@tarojs/taro';
import  {View, Image} from  '@tarojs/components';
import { observer } from '@tarojs/mobx';
import { AtRate, AtDivider } from 'taro-ui'
import CourseStore from '../../store/CourseStore';
import AuthStore from "../../store/AuthStore";
// import WxParse from '../../components/wxParse/wxParse'
import { dateFormat } from '../../utils/DateFormat';
// import "../../components/wxParse/wxParse.wxss";
import './chapter.scss'

@observer
class  chapter  extends   Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Taro.setNavigationBarTitle({
      title: this.$router.params.name
    });
    const initial = AuthStore.initial;
    if (!initial) {
      Taro.navigateTo({ url: '/pages/login/login' });
    }
    // AuthStore.login('admin', 'admin');
    CourseStore.fetchChapter(this.$router.params.id);
  }

  options = {
    addGlobalClass: true
  };

  imgClick = (src) => {
    Taro.previewImage({urls: [src]}).then(() => {
    })
  };

  linkClick = (href) => {
    Taro.setClipboardData({data: href}).then(() => {
      Taro.showToast({title: '链接已复制'}).then(() => {
      })
    })

  };

  render(){
    const chapter = CourseStore.chapter;
    let teachers = null;
    if (chapter) {
      const article = chapter.details;
      const course = chapter.course;
      teachers = course.teachers;
      // WxParse.wxParse('article', 'html', article, this.$scope, 10)
    }
    return (
      <View>
        <View className='chapter-title'>{chapter ? chapter.title : ''}</View>
        <View className='chapter-introduce'>
          <Image className='chapter-avatar' src={teachers.head_portrait} />
          <View className='chapter-teachers'>
            <View className='chapter-teachers-name'>{teachers.name}</View>
            <View className='chapter-teachers-bottom'>
              <View className='chapter-teachers-addtime'>
                {chapter ? dateFormat("YYYY-mm-dd", new Date(chapter.add_time)) : ''}
              </View>
              <View className='chapter-rate'><AtRate value={3.5} size={10} /></View>
            </View>
          </View>
        </View>
        {/*<import src='../../components/wxParse/wxParse.wxml' />*/}
        <AtDivider content='' className='chapter-divider' />
        <View className='chapter-rich-text'>
          {/*<template is='wxParse' data='{{wxParseData:article.nodes}}'/>*/}
        </View>
      </View>
    )
  }
}
export default  chapter;
