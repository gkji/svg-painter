import React from 'react';
import { SvgRectProps } from '../const/index';

interface Props {
    rectData: SvgRectProps
}

export class SvgRect extends React.PureComponent<Props> {
    [x: string]: any;

    render() {
        const { rectData } = this.props;

        // TODO 需要加入 {...commonProps}
        return (
            <rect {...rectData} />
        );
    }
}
