import React from 'react';
import { SvgLineProps } from '../const/index';

interface Props {
    lineData: SvgLineProps
}

export class SvgLine extends React.PureComponent<Props> {
    [x: string]: any;

    render() {
        const { lineData } = this.props;

        // TODO 需要加入 {...commonProps}
        return (
            <line {...lineData} />
        );
    }
}
