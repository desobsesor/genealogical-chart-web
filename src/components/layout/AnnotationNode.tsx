import { memo } from 'react';

function AnnotationNode({ data }: any) {
    return (
        <>
            <div className='annotation-content ml-22 grid grid-cols-1'>
                <div className='annotation-title text-xs col-span-1 font-semibold'>{data?.title}</div>
                <div className='text-xs grid grid-cols-1 col-span-1'>
                    {data?.arrayLabel?.map((item: any) => (
                        <div key={item?.id} className='text-xs col-span-1 list-item ml-4'>{item?.name}</div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default memo(AnnotationNode);