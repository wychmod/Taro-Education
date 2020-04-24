import  Taro,{Component} from '@tarojs/taro';
import  {View, Canvas, Image} from  '@tarojs/components';
import { AtForm, AtInput, AtButton, AtToast } from 'taro-ui';
import { observer } from '@tarojs/mobx'
import AuthStore from '../../store/AuthStore';
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
      toastText: ''
    }
  }

  config = {
    navigationBarTitleText: '登录'
  };

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
    if (this.state.code === 'dwse') {
      AuthStore.login(this.state.username, this.state.password);
    } else {
      this.setState({
        isToast: true,
        toastText: '验证码错误',
      })
    }
  }


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
            type='text'
            maxLength='4'
            placeholder='验证码'
            value={this.state.code}
            onChange={this.handleChangeCode.bind(this)}
          >
            <Image src={verificationCode} />
          </AtInput>
          <AtButton formType='submit' type='primary' className='login-button'>提交</AtButton>
          <AtButton formType='reset' type='primary' className='login-button'>重置</AtButton>
        </AtForm>
        {this.state.isToast &&
          <AtToast isOpened text={this.state.toastText} />
        }
      </View>
    )
  }
}
export default  login;
