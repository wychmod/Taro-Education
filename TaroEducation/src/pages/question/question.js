import  Taro,{Component} from '@tarojs/taro';
import  {View,Text,Button} from  '@tarojs/components';
import { observer } from '@tarojs/mobx'
import { AtSearchBar, AtIcon } from 'taro-ui'
import QuestionStore from "../../store/QuestionStore";
import './question.scss';
import {TABBAR_TYPES} from "../../constants/constants";
import TabBar from "../../components/shared/TabBar/TabBar";

@observer
class  question  extends   Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isSelect: false,
    }
  }

  config = {
    navigationBarTitleText: '问卷'
  };

  componentWillMount() {
    QuestionStore.fetchQuestionItem();
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

  switchClassName(type) {
    if (type === 1) {
      return 'question-items-introduce-tag question-tag'
    }
    return 'question-items-introduce-tag question-tag-vip'
  }

  render(){
    let questionItems = [];
    if (this.state.isSelect) {
      questionItems = QuestionStore.questionItems.filter(q => q.title === this.state.value);
    } else {
      questionItems = QuestionStore.questionItems;
    }
    return (
      <View>
        <AtSearchBar
          value={this.state.value}
          onChange={value => this.onchange(value)}
          onActionClick={() => this.onActionClick()}
        />
        {questionItems && questionItems.map(q => (
          <View
            className='question-items'
            onClick={() => {Taro.navigateTo({url: `/pages/questionnaire/questionnaire?id=${q.id}&name=${q.title}`});}}
          >
            <View className='question-items-introduce'>
              <View className='question-items-title'>{q.title}</View>
              <View className='question-items-introduce-bottom'>
                <View className='question-items-introduce-item'>{q.people}人完成</View>
                <View className='question-items-introduce-item'>共{q.number}题</View>
                <View className='question-items-introduce-item'>-{this.switchType(q.degree)}-</View>
                <View className={this.switchClassName(q.type)}>{q.type === 1 ? '免费' : '会员'}</View>
              </View>
            </View>
            <AtIcon value='edit' size='20' color='#78A4FA' />
          </View>
        ))}
        <View className='question-hr' />
        <TabBar current={TABBAR_TYPES.FORUM} />
      </View>
    )
  }
}
export default  question;
