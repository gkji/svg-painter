import React from 'react';
import { SvgPolygonProps } from '../const/index';
import {log} from '../common/utils';

interface Props {
    data: SvgPolygonProps
}

export class SvgPolygon extends React.PureComponent<Props> {
    render() {
        const { data } = this.props;
        return (
            <polygon {...data} />
        )
    }
}
