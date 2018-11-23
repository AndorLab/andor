import * as React from 'react'
import {Button} from 'antd'
// import logo from '@assets/logo.svg'
// import back from '@assets/back.jpg'
class Hello extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return(
      <div>
      <Button>Hello</Button>
        {/* <img src={back} alt='logo Test'/> */}
      </div>
    )
  }
}

export default Hello