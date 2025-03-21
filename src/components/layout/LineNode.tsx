import { Handle, Position } from '@xyflow/react';

const LineNode = ({ data }: any) => {
    return (
        <div style={{ width: '100px', height: '2px', background: 'black' }}>
            <Handle type="source" position={Position.Right} style={{ visibility: 'hidden' }} />
            <Handle type="target" position={Position.Left} style={{ visibility: 'hidden' }} />
        </div>
    );
};

export default LineNode;