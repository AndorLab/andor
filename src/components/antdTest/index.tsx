import * as React from 'react'
import { Button } from 'antd'
import logo from '../../assets/logo.svg'
// import back from '../../assets/back.jpg'
export interface IHelloProps {
  imgPath?: string | React.ReactNode
}
const Hello = (props: IHelloProps) => {
  return (
    <div>
      <Button>Hello</Button>
      {/* <img src={props.imgPath ? props.imgPath : back} alt='logo Test' /> */}
      <img src={props.imgPath ? props.imgPath : logo} alt='logo Test' />
    </div>
  )
}

export default Hello