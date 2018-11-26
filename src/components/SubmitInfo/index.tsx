import * as React from 'react'
import { Input, DatePicker, InputNumber } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
// import moment from 'moment'
import './index.less'
const {MonthPicker} = DatePicker
const  {TextArea} = Input

/**
 * 可接受类型
 *
 * @enum {number}
 */
enum InputType {
  'Input',　// 输入框
  'TextArea', // 文本域
  'DatePicker',　// 月份选择器
  'InputNumber'　// 数字输入框
}
interface IProps {
  /**
   * 默认显示信息
   */
  defaultInfo?: string | React.ReactNode,
  /**
   * 默认操作信息
   */
  defaultOperationInfo?: string | React.ReactNode,
  /**
   * Input　失去焦点事件
   */
  onBlur?: (value: string) => void,
  type: InputType, // 输入框类型
}
interface IState {
  /**
   * 是否显示Input输入框
   */
  isDisplayInput?: boolean
  /**
   * 默认显示信息
   */
  defaultInfo?: string | React.ReactNode,
  /**
   * 默认操作信息
   */
  defaultOperationInfo?: string | React.ReactNode,
  /**
   * 输入框值
   */
  inputValue?: string
}
/**
 * 一个点击后面文字，所有控件变为输入框，输入框失去焦点触发事件的组件
 *
 * @export
 * @class SubmitInfo
 * @extends {React.Component<IProps, IState>}
 */
class SubmitInfo extends React.Component<IProps, IState> {
  input: React.ReactNode
  static Type = InputType
  constructor(props: IProps) {
    super(props)
    this.state = {
      isDisplayInput: false,
      defaultInfo: this.props.defaultInfo ? this.props.defaultInfo : '缺失的信息:',
      defaultOperationInfo: this.props.defaultOperationInfo ? this.props.defaultOperationInfo : '缺失的操作提示'
    }
  }
  handleOnBlue = () => {
    if (this.state.inputValue && this.state.inputValue.length > 0) {
      this.props.onBlur!(this.state.inputValue!)
    }
  }

  switchComponent = () => {
    this.setState({
      isDisplayInput: true
    }, () => {
      (this.input! as any).focus()
    })
  }
  handleOnChange = (evt) => {
    this.setState({
      inputValue: evt.target.value.toString()
    })
  }
  /**
   * 处理时间选择器
   *
   * @memberof SubmitInfo
   */
  handleDatePickerChange = (momentValue) => {
    this.props.onBlur!(momentValue.format('YYYYMM'))
  }
  // 根据类型渲染不同的输入组件
  renderInput = () => {
    let tempComponent: React.ReactNode = null
    switch (this.props.type) {
      case InputType.Input:
        tempComponent = <Input value={this.state.inputValue} onChange={this.handleOnChange} className='submitInput' onBlur={this.handleOnBlue} ref={node => this.input = node!} />
        break
      case InputType.InputNumber:
        tempComponent = <InputNumber value={parseFloat(this.state.inputValue!)} min={0} max={130} defaultValue={3} onChange={this.handleOnChange} />
        break
      case InputType.TextArea:
        tempComponent = <TextArea value={this.state.inputValue} onChange={this.handleOnChange} className='submitInput' onBlur={this.handleOnBlue} ref={node => this.input = node!} />
        break
      case InputType.DatePicker:
        tempComponent = <MonthPicker placeholder='选择月份' className='submitInput' onChange={this.handleDatePickerChange} ref={node => this.input = node!}  />
        break
      default:
        tempComponent = <div>请选择正确的输入类型！</div>
        break
    }
    return tempComponent
  }
  render() {
    return (
      <div className={`submitInfoContainer`}>
        {this.state.isDisplayInput ? (this.renderInput()) : ''}
        {this.state.isDisplayInput ? '' : (<span className='no-value'>{this.state.defaultInfo}<span onClick={this.switchComponent} className='supplement'> {this.state.defaultOperationInfo}</span></span>)}
      </div>
    )
  }
}

// SubmitInfo.Type = InputType
export default SubmitInfo