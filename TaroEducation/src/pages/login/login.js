import  Taro,{Component} from '@tarojs/taro';
import  {View, Canvas, Image} from  '@tarojs/components';
import { AtForm, AtInput, AtButton, AtToast } from 'taro-ui';
import { observer } from '@tarojs/mobx'
import AuthStore from '../../store/AuthStore';
import { getRandom } from '../../utils/DateFormat';
import verificationCode from '../../assets/verification_code.png';
import './login.scss';


@observer
class  login  extends   Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      code: '',
      isToast: false,
      toastText: '',
      leftNumber: 0,
      rightNumber: 0,
    }
  }

  config = {
    navigationBarTitleText: '登录'
  };

  componentDidMount() {
    this.handleChangeNumber();
  }


  handleChangeUserName (username) {
    this.setState({
      username,
    })
  }

  handleChangePassWord (password) {
    this.setState({
      password,
    })
  }

  handleChangeCode (code) {
    this.setState({
      code,
    })
  }

  onSubmit (event) {
    const number = this.state.leftNumber + this.state.rightNumber;
    if (parseInt(this.state.code) === parseInt(number)) {
      AuthStore.login(this.state.username, this.state.password);
    } else {
      this.setState({
        isToast: true,
        toastText: '验证码错误',
      })
    }
  }


  handleChangeNumber = () => {
    this.setState({
      leftNumber: getRandom(1,10),
      rightNumber: getRandom(1,10),
    })
  };


  onReset (event) {
    this.setState({
      username: '',
      password: '',
    })
  }

  render(){
    return (
      <View>
        <View className='login-text'>教育小程序登录</View>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='username'
            type='text'
            placeholder='账号/手机号'
            value={this.state.username}
            onChange={this.handleChangeUserName.bind(this)}
          />
          <AtInput
            name='password'
            type='password'
            placeholder='密码字数不能少于六位'
            value={this.state.password}
            onChange={this.handleChangePassWord.bind(this)}
          />
          <AtInput
            clear
            type='number'
            placeholder='验证码'
            value={this.state.code}
            onChange={this.handleChangeCode.bind(this)}
          >
            {/*<Image src={verificationCode} />*/}
            <View onClick={this.handleChangeNumber}>{this.state.leftNumber} + {this.state.rightNumber} =</View>
          </AtInput>
          <AtButton formType='submit' type='primary' className='login-button'>提交</AtButton>
          <AtButton formType='reset' type='primary' className='login-button'>重置</AtButton>
        </AtForm>
        <View
          className='login-register'
          onClick={()=>{Taro.redirectTo({ url: '/pages/register/register' })}}
        >
          账号注册
        </View>
        {this.state.isToast &&
          <AtToast isOpened text={this.state.toastText} />
        }
      </View>
    )
  }
}
export default  login;
