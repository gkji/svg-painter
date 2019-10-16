import React from 'react';
import { SvgRectProps } from '../const/index';

interface Props {
    data: SvgRectProps
}

export class SvgRect extends React.PureComponent<Props> {
    [x: string]: any;

    render() {
        const { data } = this.props;

        // TODO 需要加入 {...commonProps}
        return (
            <rect {...data} />
        );
    }
}
