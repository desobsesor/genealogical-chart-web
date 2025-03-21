import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow
} from '@xyflow/react';


// this is a little helper component to render the actual edge label
function EdgeLabel({ transform, label }: { readonly transform: string; readonly label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        background: 'transparent',
        padding: 10,
        color: '#ff5050',
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
}

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: any) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const disabled = false;
  const onEdgeClick = () => {
    //console.log('Click en node');
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  const changeRelationOnEdgeClick = (animated: boolean) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id ? { ...edge, animated } : edge
      )
    );
  };

  return (
    <>
      <BaseEdge id={id} type='step' path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        {disabled && <div className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button className="button-edge__button" onClick={onEdgeClick}>
            X
          </button>
        </div>}
        <div>
          <div
            className="button-edge__label nodrag nopan"
            style={{
              transform: `translate(-50%, 0%) translate(${labelX}px,${labelY + 30}px)`,
            }}
          >
            {disabled && data?.startLabel && (
              <EdgeLabel
                transform={`translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`}
                label={data?.startLabel}
              />
            )}
            {disabled && data?.endLabel && (
              <>
                <button title='Marcar como hijo legitimo' className="button-edge__button text-xs" style={{ fontSize: '8px' }} onClick={() => { changeRelationOnEdgeClick(false) }}>
                  L
                </button>
                <button title='Marcar como hijo adoptado' className="button-edge__button text-xs" style={{ fontSize: '8px' }} onClick={() => { changeRelationOnEdgeClick(true) }}>
                  A
                </button>
              </>
            )}
          </div>
        </div>
      </EdgeLabelRenderer >
    </>
  );
}