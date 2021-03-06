import React, {useState} from 'react';
import {ModelList} from './model'
import {SvgLine, SvgPath, SvgRect, SvgRound} from './components'
import {Drawing, GraphType, MapOf, PenStatus} from './const';
import pen from './pen'
import './App.scss';
import {ModelData} from './const/interface';


const GraphComponent: MapOf<any> = {
  [GraphType.line]: SvgLine,
  [GraphType.rect]: SvgRect,
  [GraphType.round]: SvgRound,
  [GraphType.path]: SvgPath,
}

const modelList = new ModelList(pen);

function App() {
  const [drawing, setDrawing] = useState<Drawing>(Drawing.end);
  const [graphList, setGraphList] = useState<ModelData[]>(modelList.toData());
  const [graphType, setGraphType] = useState<GraphType>(GraphType.round);

  const handleDraw = (type: GraphType) => {
    setDrawing(Drawing.start);
    pen.setPenType(type)
    setGraphType(type)
  }

  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    const event = e.nativeEvent
    const { offsetX: x, offsetY: y } = event

    if (drawing === Drawing.start) {
      pen.updatePen(x, y, PenStatus.down)
      modelList.startGraph(graphType, x, y);
      setGraphList(modelList.toData());
      setDrawing(Drawing.moving)
    }
  }

  const handleMouseUpCanvas = (e: React.MouseEvent) => {
    const event = e.nativeEvent
    const { offsetX: x, offsetY: y } = event

    if (drawing === Drawing.moving) {
      pen.updatePen(x, y, PenStatus.up)
      modelList.endGraph(graphType, x, y);
      setGraphList(modelList.toData());
      setDrawing(Drawing.start)
    }
  }

  const handleMouseMoveCanvas = (e: React.MouseEvent) => {
    const event = e.nativeEvent
    const { offsetX: x, offsetY: y } = event

    if (drawing === Drawing.moving) {
      pen.updatePen(x, y)
      modelList.endGraph(graphType, x, y);
      setGraphList(modelList.toData());

    }
  }

  const handleClearAll = () => {
    modelList.clearAll();
    setGraphList(modelList.toData());
  }

  const renderGraph = (graph: ModelData, index: number) => {
    return <React.Fragment key={index}>
        {
          React.createElement(graph.component, {
          key: index,
          data: graph.props
      })}
      </React.Fragment>
  }
  return (
    <div className="App">
      <div className="header">

      </div>
      <div className="body">
        <div className="main">
          <div className="left-side">
            <button className="draw-line-btn" onClick={() => handleDraw(GraphType.path)}></button>
            <button className="draw-rect-btn" onClick={() => handleDraw(GraphType.rect)}>长方形</button>
            <button className="draw-round-btn" onClick={() => handleDraw(GraphType.round)}>圆形</button>
            <button className="draw-round-btn" onClick={() => handleDraw(GraphType.ellipse)}>椭圆</button>
            <button className="draw-round-btn" onClick={() => handleDraw(GraphType.polygon)}>三角形</button>
            <button className="draw-path-btn" onClick={() => handleDraw(GraphType.line)}>路径</button>
            <button className="clear-all-btn" onClick={handleClearAll}>清空</button>
          </div>
          <div className="right-side">
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
        <div className="tool-area">

        </div>
      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default App;
