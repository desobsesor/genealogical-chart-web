import { Handle, NodeProps, Position } from '@xyflow/react';
import React from 'react';

interface MyNodeProps extends NodeProps {
    annotationText: string;
}

const MyNode: React.FC<MyNodeProps> = ({ id, data, annotationText }: any) => {

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', position: 'relative', display: 'flex' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div>{data.label}</div>
            </div>
            <div style={{ width: '50px', height: '50', padding: '5px', marginLeft: '90px', backgroundColor: '#f9f9f9', borderLeft: '1px solid #ccc', display: 'flex', alignItems: 'center', position: 'absolute' }}>
                <small>{annotationText}</small>
            </div>
            <Handle type="source" position={Position.Right} id="sourceRight" />
            <Handle type="source" position={Position.Left} id="sourceLeft" />
            <Handle type="target" position={Position.Right} id="targetRight" />
            <Handle type="target" position={Position.Left} id="targetLeft" />
        </div>
    );
};

export default MyNode;