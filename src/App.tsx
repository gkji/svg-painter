import React, { useState } from 'react';
import { LineModel, PointModel, RectModel, ModelList, BaseModel } from './model'
import { SvgLine, SvgRect, SvgRound, SvgPath } from './components'
import {GraphType, Drawing, SvgRoundProps, SvgPathProps} from './const';


import './App.scss';
import { SvgLineProps, SvgBaseProps, SvgRectProps, ModelData } from './const/interface';

const modelList = new ModelList;

function App() {
  const [drawing, setDrawing] = useState<Drawing>(Drawing.end);
  const [graphList, setGraphList] = useState<ModelData[]>(modelList.toData());
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
      modelList.startGraph(graphType, x, y);
      setGraphList(modelList.toData());
      setDrawing(Drawing.moving)
    }
  }

  const handleMouseUpCanvas = (e: React.MouseEvent) => {
    const { clientX: x, clientY: y } = e;

    if (drawing === Drawing.moving) {
      modelList.endGraph(graphType, x, y);
      setGraphList(modelList.toData());
      setDrawing(Drawing.start)
    }
  }

  const handleMouseMoveCanvas = (e: React.MouseEvent) => {
    const { pageX: x, pageY: y } = e;
    if (drawing === Drawing.moving) {
      modelList.endGraph(graphType, x, y);
      setGraphList(modelList.toData());
    }
  }

  const handleClearAll = () => {
    modelList.clearAll();
    setGraphList(modelList.toData());
  }

  const renderGraph = (graph: ModelData, index: number) => {
    if (graph.type === GraphType.line) {
      return <SvgLine key={index} lineData={graph.props as SvgLineProps}/>
    } else if (graph.type === GraphType.rect) {
      return <SvgRect key={index} rectData={graph.props as SvgRectProps}/>
    } else if (graph.type === GraphType.round) {
      return <SvgRound key={index} roundData={graph.props as SvgRoundProps}/>
    } else if (graph.type === GraphType.path) {
      return <SvgPath key={index} data={graph.props as SvgPathProps}/>
    }
  }
  return (
    <div className="App">
        <div className="header">
        <button className="draw-line-btn" onClick={handleDrawLine}>线</button>
        <button className="draw-rect-btn" onClick={handleDrawRect}>长方形</button>
        <button className="draw-round-btn" onClick={handleDrawRound}>圆形</button>
        <button className="draw-path-btn" onClick={handleDrawPath}>路径</button>
        <button className="clear-all-btn" onClick={handleClearAll}>清空</button>
      </div>
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
    </div>
  );
}

export default App;
