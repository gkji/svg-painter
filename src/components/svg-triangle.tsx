import React from 'react';
import { SvgTriangleProps } from '../const/index';
import {log} from '../common/utils';

interface Props {
    data: SvgTriangleProps
}

export class SvgRound extends React.PureComponent<Props> {
    render() {
        const { data } = this.props;
        log('debug data', data, this.props)
        return (
            <polygon {...data}/>
        )
    }
}
