import React, { useState } from 'react';
import { Line, Point, Rect, GraphList, BaseGraph } from './model'
import { SvgLine, SvgRect, SvgRound, SvgPath } from './components'
import {GraphType, Drawing, SvgRoundProps, SvgPathProps} from './const';


import './App.scss';
import { SvgLineProps, SvgBaseProps, SvgRectProps } from './const/interface';

const log = console.log

const graphListModel = new GraphList;

function App() {
  const [drawing, setDrawing] = useState<Drawing>(Drawing.end);
  const [graphList, setGraphList] = useState<SvgBaseProps[]>(graphListModel.toData());
  const [graphType, setGraphType] = useState<GraphType>(GraphType.round);

  const handleDrawLine = () => {
    setDrawing(Drawing.start);
    setGraphType(GraphType.line)
  }

  const handleDrawRect = () => {
    setDrawing(Drawing.start);
    setGraphType(GraphType.rect)
  }

  const handleDrawRound = () => {
    setDrawing(Drawing.start);
    setGraphType(GraphType.round)
  }

  const handleDrawPath = () => {
    setDrawing(Drawing.start);
    setGraphType(GraphType.path)
  }

  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    const { clientX: x, clientY: y } = e;

    if (drawing === Drawing.start) {
      graphListModel.startGraph(graphType, x, y);
      setGraphList(graphListModel.toData());
      setDrawing(Drawing.moving)
    }
  }

  const handleMouseUpCanvas = (e: React.MouseEvent) => {
    const { clientX: x, clientY: y } = e;

    if (drawing === Drawing.moving) {
      graphListModel.endGraph(graphType, x, y);
      setGraphList(graphListModel.toData());
      setDrawing(Drawing.start)
    }
  }

  const handleMouseMoveCanvas = (e: React.MouseEvent) => {
    const { pageX: x, pageY: y } = e;
    if (drawing === Drawing.moving) {
      log('moving')
      graphListModel.endGraph(graphType, x, y);
      setGraphList(graphListModel.toData());
    }
  }

  const handleClearAll = () => {
    graphListModel.clearAll();
    setGraphList(graphListModel.toData());
  }



  const renderGraph = (graph: SvgBaseProps, index: number) => {
    if (graphType === GraphType.line) {
      return <SvgLine key={index} lineData={graph as SvgLineProps}/>
    } else if (graphType === GraphType.rect) {
      return <SvgRect key={index} rectData={graph as SvgRectProps}/>
    } else if (graphType === GraphType.round) {
      return <SvgRound key={`${index}`} roundData={graph as SvgRoundProps}/>
    } else if (graphType === GraphType.path) {
      return <SvgPath key={index} data={graph as SvgPathProps}/>
    }
  }
  return (
    <div className="App">

      <div className="body">
        <svg className="canvas"
          onMouseDown={handleMouseDownCanvas}
          onMouseUp={handleMouseUpCanvas}
          onMouseMove={handleMouseMoveCanvas}
        >
          {
            graphList.map((graph, index) => {
              return renderGraph(graph, index);
            })
          }
        </svg>
      </div>
      <div className="header">
        <button className="draw-line-btn" onClick={handleDrawLine}>线</button>
        <button className="draw-rect-btn" onClick={handleDrawRect}>长方形</button>
        <button className="draw-round-btn" onClick={handleDrawRound}>圆形</button>
        <button className="draw-path-btn" onClick={handleDrawPath}>路径</button>
        <button className="clear-all-btn" onClick={handleClearAll}>清空</button>
      </div>
    </div>
  );
}

export default App;
