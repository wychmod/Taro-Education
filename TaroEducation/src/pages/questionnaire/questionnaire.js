import  Taro,{Component} from '@tarojs/taro';
import  {View,Text,Button} from  '@tarojs/components';
import { observer } from '@tarojs/mobx'
import { AtTabs, AtTabsPane, AtCheckbox, AtModal } from 'taro-ui'
import QuestionStore from "../../store/QuestionStore";
import './questionnaire.scss'

@observer
class  questionnaire  extends   Component{
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      checkList1: [],
      checkList2: [],
      checkList3: [],
      checkList4: [],
      isModalOpen: false,
      isOpenAnswer: false,
    };
  }

  componentWillMount () {
    Taro.setNavigationBarTitle({
      title: this.$router.params.name
    });
    QuestionStore.fetchQuestionnaire(this.$router.params.id);
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  handleChange = (value, index) => {
    console.log(value);
    let list = [];
    list.push(value.pop());
    switch (index) {
      case 0:
        this.setState({
          checkList1: list
        });
        break;
      case 1:
        this.setState({
          checkList2: list
        });
        break;
      case 2:
        this.setState({
          checkList3: list
        });
        break;
      case 3:
        this.setState({
          checkList4: list
        });
        break;
    }
  };

  handleChangeCurrent = () => {
    if (this.state.current === 3) {
      this.setState({
        isModalOpen: true,
        isOpenAnswer: true
      });
    } else {
      const number = this.state.current;
      this.setState({
        current: number + 1
      })
    }
  };

  handleConfirm = () => {
    this.setState({
      isModalOpen: false
    })
  };

  handleList = (index) => {
    switch (index) {
      case 0:
        return this.state.checkList1;
      case 1:
        return this.state.checkList2;
      case 2:
        return this.state.checkList3;
      case 3:
        return this.state.checkList4;
    }
  };

  handleOptions = (question) => {
    const options = [{
        value: 'a',
        label: question.key_a,
      },{
        value: 'b',
        label: question.key_b,
      },{
        value: 'c',
        label: question.key_c,
      },{
        value: 'd',
        label: question.key_d,
    }]
    return options;
  };


  render(){
    const tabList = [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4'}];
    let question = null;
    if (QuestionStore.questionnaire) {
      question = QuestionStore.questionnaire.question;
    }

    let content = '';
    let number = 0;
    if (question[0].right_key !== this.state.checkList1[0]) {
      content = content + '第一道题错误。';
      number = number + 1;
    }
    if (question[1].right_key !== this.state.checkList2[0]) {
      content = content + '第二道题错误。';
      number = number + 1;
    }
    if (question[2].right_key !== this.state.checkList3[0]) {
      content = content + '第三道题错误。';
      number = number + 1;
    }
    if (question[3].right_key !== this.state.checkList4[0]) {
      content = content + '第四道题错误。';
      number = number + 1;
    }
    if (number === 0) {
      return '恭喜全部答对！'
    } else {
      content = content + `共错误${number}道题。`;
    }
    console.log(content);
    return (
      <View>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          {question && question.map((q, index) => (
            <AtTabsPane current={this.state.current} index={index} >
              <View className='questionnaire-main' >
                <View className='questionnaire-title'>
                  <View className='questionnaire-button'>单选</View>
                  <Text className='questionnaire-title-main'>        {q.description}</Text>
                </View>
                <AtCheckbox
                  options={this.handleOptions(q)}
                  selectedList={this.handleList(index)}
                  onChange={value => this.handleChange(value, index)}
                />
                {this.state.isOpenAnswer &&
                <View className='questionnaire-answer'>
                  答案是：{q.right_key}
                </View>
                }
                <View
                  className='questionnaire-bottom-button'
                  onClick={this.handleChangeCurrent}
                >
                  {index === 3 ? '完成答题' : '下一题'}
                </View>
              </View>
            </AtTabsPane>
          ))}
        </AtTabs>
        {question &&
          <AtModal
            isOpened={this.state.isModalOpen}
            title='恭喜您回答完问题'
            confirmText='确认'
            onClose={ this.handleConfirm }
            onConfirm={ this.handleConfirm }
            content={content}
          />
        }
      </View>
    )
  }
}
export default  questionnaire;
