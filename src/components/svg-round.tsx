import React from 'react';
import { SvgRoundProps } from '../const/index';
import {log} from '../common/utils';

interface Props {
    roundData: SvgRoundProps
}

export class SvgRound extends React.PureComponent<Props> {
    render() {
        const { roundData } = this.props;
        log('debug roundData', roundData)
        return (
            <circle {...roundData} />
        );
    }
}
