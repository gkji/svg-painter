import React from 'react'
import { SvgEllipseProps } from '../const/index'

interface Props {
    data: SvgEllipseProps
}

export class SvgEllipse extends React.PureComponent<Props> {
    render() {
        const { data } = this.props
        return (
          <ellipse {...data}/>
        )
    }
}
