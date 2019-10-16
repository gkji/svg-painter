import React from 'react';
import { SvgPathProps } from '../const/index';

interface Props {
    data: SvgPathProps
}

export class SvgPath extends React.PureComponent<Props> {
    [x: string]: any;

    pathToString (pathData: SvgPathProps): string {
        const { d: { moveTo, lineTo } } = pathData;
        let s = ''
        s += `M${moveTo.x} ${moveTo.y} L ${lineTo.x} ${lineTo.y}`
        return s;
    }

    render() {
        console.log('props', this.props)
        const { data } = this.props;
        const d = this.pathToString(data);
        console.log('d', d);
        return (
            <path {...data} d={d} />
        );
    }
}
