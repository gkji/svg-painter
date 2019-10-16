import React from 'react';
import { SvgRoundProps } from '../const/index';
import {log} from '../common/utils';

interface Props {
    data: SvgRoundProps
}

export class SvgRound extends React.PureComponent<Props> {
    render() {
        const { data } = this.props;
        return (
            <circle {...data} />
        );
    }
}
