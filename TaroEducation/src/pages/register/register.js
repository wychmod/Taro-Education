import  Taro,{Component} from '@tarojs/taro';
import  {View,Text,Button} from  '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import {AtButton, AtForm, AtInput, AtToast} from "taro-ui";
import AuthStore from "../../store/AuthStore";
import './register.scss'

class register extends   Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      secondPassword: '',
      code: '',
      isToast: false,
      toastText: '',
      count: 60,
      showButton: true,
    }
  }

  config = {
    navigationBarTitleText: '注册'
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

  handleChangeSecondPassWord (secondPassword) {
    this.setState({
      secondPassword,
    })
  }

  handleFetchCode = () => {
    if(this.state.username === '' || !(/^1[3456789]\d{9}$/.test(this.state.username))) {
      this.setState({
        isToast: true,
        toastText: '手机号输入错误',
      });
      setTimeout(() => {
        this.setState({
          isToast: false
        })
      },2000)
    } else {
      let count = this.state.count;
      AuthStore.fetchCode(this.state.username);
      // 这里写一个定时器就可以去更新灰色按钮的内容而且show_btn是false时会出现灰色按钮，当倒计时结束又变成可以触发的按钮
      const timer = setInterval(() => {
        this.setState({
          count: (count--),
          showButton: false,
        }, () => {
          if (count === 0) {
            clearInterval(timer);
            this.setState({
              showButton: true ,
              count: 60,
            })
          }
        })
      }, 1000)

    }
  };

  onReset (event) {
    this.setState({
      username: '',
      password: '',
      secondPassword: '',
    })
  }

  onSubmit (event) {
    AuthStore.register(this.state.username, this.state.password, this.state.code)
  }

  handleChangeCode (code) {
    this.setState({
      code,
    })
  }

  render(){
    return (
      <View>
        <View className='register-text'>教育小程序注册</View>
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
            name='password'
            type='password'
            placeholder='重复一遍密码'
            value={this.state.secondPassword}
            onChange={this.handleChangeSecondPassWord.bind(this)}
          />
          <AtInput
            clear
            type='text'
            maxLength='4'
            placeholder='验证码'
            value={this.state.code}
            onChange={this.handleChangeCode.bind(this)}
          >
            {this.state.showButton ?
              <View onClick={this.handleFetchCode}>获取验证码</View> :
              <View>{this.state.count}S重发</View>
            }
          </AtInput>
          <AtButton formType='submit' type='primary' className='register-button'>注册</AtButton>
          <AtButton formType='reset' type='primary' className='register-button'>重置</AtButton>
        </AtForm>
        {this.state.isToast &&
          <AtToast isOpened text={this.state.toastText} />
        }
      </View>
    )
  }
}

export default register;
