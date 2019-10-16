import React from 'react';
import { SvgPathProps } from '../const/index';

interface Props {
    data: SvgPathProps
}

export class SvgPath extends React.PureComponent<Props> {
    [x: string]: any;

    pathToString (pathData: SvgPathProps): string {
        const { d: { moveTo, lineToList } } = pathData;
        let s = ''
        s += `M${moveTo.x} ${moveTo.y}`
        lineToList.forEach(lineTo => {
            s += ` L${lineTo.x} ${lineTo.y}`
        })
        return s;
    }

    render() {
        const { data } = this.props;
        const d = this.pathToString(data);
        return (
            <path {...data} d={d} />
        );
    }
}
