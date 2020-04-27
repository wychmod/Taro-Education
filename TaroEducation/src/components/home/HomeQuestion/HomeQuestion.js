import  Taro,{Component} from '@tarojs/taro';
import  { View } from  '@tarojs/components';
import {AtIcon} from "taro-ui";
import { observer } from '@tarojs/mobx'
import QuestionStore from '../../../store/QuestionStore';
import './HomeQuestion.scss'

@observer
class  HomeQuestion  extends   Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    QuestionStore.fetchQuestionItem();
  }

  switchType(type) {
    switch (type) {
      case 1 :
        return '简单';
      case 2 :
        return '中等';
      case 3 :
        return '困难';
    }
  }

  render(){
    const questionItems = QuestionStore.questionItems;
    return (
      <View className='home-question'>
        <View className='home-question-header'>
          <View className='home-question-title'>热门题库</View>
          <View className='home-question-second-title' onClick={() => Taro.navigateTo({url: '/pages/question/question'})}>更多</View>
        </View>
        <View className='home-question-main'>
          {questionItems && questionItems.map(q => (
            <View
              className='home-question-item'
              onClick={() => {Taro.navigateTo({url: `/pages/questionnaire/questionnaire?id=${q.id}&name=${q.title}`});}}
            >
              <View className='home-question-icon'>
                <AtIcon prefixClass='fa' size='40' value='graduation-cap' color='#fff' />
              </View>
              <View className='home-question-introduce'>
                <View className='home-question-title'>{q.title}</View>
                <View className='home-question-introduce-bottom'>
                  <View className='home-question-introduce-item'>{q.people}人完成</View>
                  <View className='home-question-introduce-item'>共{q.number}题</View>
                  <View className='home-question-introduce-item'>-{this.switchType(q.degree)}-</View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
export default  HomeQuestion;
