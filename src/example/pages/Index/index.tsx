import * as React from 'react'
import './index.less'
import {Hello, SubmitInfo} from '../../../index'
const InputType = SubmitInfo.Type

interface IState {
  hasMapLoaded?: boolean
}

export default class Index extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    // console.log(this.props.match)
  }

  render() {
    return (
      <React.Fragment>
        success
        <Hello/>
        <SubmitInfo type={InputType.Input}/>
      </React.Fragment>
    )
  }
}