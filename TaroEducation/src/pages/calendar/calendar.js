import  Taro,{Component} from '@tarojs/taro';
import  { View, Image, Button } from  '@tarojs/components';
import { AtCalendar, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import { observer } from '@tarojs/mobx'
import taskImg from '../../assets/task.svg';
import CalendarStore from '../../store/CalendarStore';
import { dateFormat } from '../../utils/DateFormat';
import './calendar.scss'

@observer
class  calendar  extends   Component{

  config = {
    navigationBarTitleText: '日历'
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
  }

  componentDidMount() {
    CalendarStore.fetchTasks(dateFormat("YYYY-mm-dd",new Date()));
  }

  onDayClick = (item) => {
    CalendarStore.fetchTasks(item.value);
  };

  onTaskClick = (id) => {
    CalendarStore.fetchTask(id);
    this.setState({
      isOpened: true
    });
  };

  render(){
    const tasks = CalendarStore.tasks;
    const task = CalendarStore.task;
    return (
      <View>
        <AtCalendar className='calendar-main' onDayClick={(item) => this.onDayClick(item)} />
        {tasks && tasks.map(t => (
          <View className='calendar-task' onClick={() => this.onTaskClick(t.id)}>
            <View className='calendar-left'>
              <Image src={taskImg} className='calendar-img' />
              <View className='calendar-title'>{t.title}</View>
            </View>
            <View className='calendar-right'>{dateFormat("YYYY-mm-dd", new Date(t.datetime))}</View>
          </View>
        ))}
        <AtModal isOpened={this.state.isOpened}>
          <AtModalHeader>{task && task.title}</AtModalHeader>
          <AtModalContent>
            {task && task.details}
          </AtModalContent>
          <AtModalAction>
            <Button onClick={() => this.setState({isOpened: false})}>取消</Button>
            <Button onClick={() => this.setState({isOpened: false})}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
export default  calendar;
