import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { text, color } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import { Button, Welcome } from '@storybook/react/demo'
import { Hello, SubmitInfo } from '../index'
const InputType = SubmitInfo.Type
import ColorButton from './ColorButton'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Demo', module)
.add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)
  .add(
    'ColorButton with text',
    withInfo('描述信息')(() => (
      <ColorButton color={text('color', 'green')}>Color Button</ColorButton>
    )),
  )
  .add(
    'ColorButton with color panel',
    withInfo(`import ColorButton from './ColorButton'`)(() => (

      <ColorButton color={color('color', 'green')}>Color Button</ColorButton>
    )),
  )
storiesOf('Hello', module)
  .add('with text', withInfo(`import {Hello} from 'andor'`)(() => <Hello />))
  .add('SubmitInfo', withInfo(`test`)(() => <SubmitInfo type={InputType.Input} />))