import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Handle, NodeToolbar, Position } from '@xyflow/react';
import { AxeIcon, CalendarPlusIcon, CheckCheckIcon, FileEditIcon, HeartIcon, HeartOffIcon, TriangleIcon, Unlink2Icon, XIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { useHelper } from '../../../services/context/HelperContext';
import { RelationTypeCouple, RelationTypeMember } from '../../../utils/enum';
import AddEventContent from './AddEventContent';
import AddMemberContent from './AddMemberContent';
import AddPathologicalDiseasesContent from './AddPathologicalDiseasesContent';
import EventHoverCard from './EventHoverCard';
import HoverCardContentDiv from '../../../components/layout/HoverCard';
import MemberHoverCard from './MemberHoverCard';
import PathologicalDiseasesHoverCard from './PathologicalDiseasesHoverCard';

function CustomNode({ data, addChild }: any) {
  const { setAddMember, setShowModalMember, showModalMember, setCurrentChild, setShowPopoverMember } = useHelper();
  const [name, setName] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const setEdit = (data?: any) => {
    setShowPopoverMember(false);
    setCurrentChild(data);
  }

  const setEditInPopover = (data?: any) => {
    setName(data?.name);
    setIsEdit(!isEdit);
  }

  const setPrevEdit = (data: any) => {
    setCurrentChild(data);
    setShowModalMember(!showModalMember);
  }

  const setIndice = (data: any, status: boolean) => {
    //console.log('pasando por aca: ', data);
    const dataMember = { ...data, indice: status };
    setShowPopoverMember(true);
    setCurrentChild(dataMember);
  }

  const setDead = (data: any, status: boolean) => {
    const dataMember = { ...data, dead: status };
    setShowPopoverMember(true);
    setCurrentChild(dataMember);
  }
  return (
    <>
      {data.age != 0 && data?.pathologicalDiseases && data?.pathologicalDiseases.length > 0 &&
        <div className='rounded-xs grid grid-cols-1' style={{ width: '80px', height: '100px', padding: '4px', marginLeft: '86px', backgroundColor: '#f6f6f6', borderLeft: '1px solid #ccc', position: 'absolute' }}>
          <label className="text-xs text-muted-foreground font-semibold justify-items-start mb-0">Patologías</label>
          <div className="min-w-full grid grid-cols-1 justify-items-start align-top">
            {data?.pathologicalDiseases.map((pathologicalDisease: any, index: number) => (
              <div key={`index_${index + 1}`} className="grid grid-cols-1 min-w-full max-h-5 gap-0 py-0 my-0">
                <p className="text-muted-foreground text-xs" style={{ fontSize: '10px' }}>{pathologicalDisease.name}</p>
              </div>
            ))}
          </div>
        </div>}
      {data.age != 0 &&
        (isEdit ? (
          <textarea
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-500 text-custom-white rounded-md p-1 mx-0 text-center text-xs w-20"
            style={{ marginBottom: '4px', wordWrap: 'break-word' }}
          />
        ) : (
          <MemberHoverCard member={data}>
            <div
              className={`bg-gray-500 text-custom-white rounded-md p-1 mx-0 text-center text-xs ${data.indice ? '' : 'w-20'}`}
              style={{ marginBottom: '4px', wordWrap: 'break-word' }}
            >
              {data.name}
            </div>
          </MemberHoverCard>
        ))
      }
      {/* //NOTE: Nodo para rol de genero masculino */}
      {data.gender === 'Male' && data.age != 0 &&
        <div className={`${data.inGestation || data.miscarriage || data.abortion ? 'px-0 py-0 rounded-xs border-2 border-none' : 'px-2 py-1.5 shadow-md rounded-xs bg-white border-2 border-stone-400'}`}>
          {data.inGestation && <TriangleIcon className='relative w-20 h-20 text-gray-500 font-normal' />}
          {data.miscarriage && <div className="w-20 h-20 rounded-full bg-gray-700 border-4 border-white"></div>}
          {data.abortion && <XIcon className='w-20 h-20' size={58} strokeWidth={2} absoluteStrokeWidth />}
          {!data.indice && !data.inGestation && !data.miscarriage && !data.abortion &&
            <div className="py-1 flex items-center img-container text-center">
              <div className={`text-gray-500 text-4xl font-bold text-center ${data.age > 9 ? 'px-2.5 py-1' : 'px-4'}`}>{data.age}</div>
              {/*data.dead && <div className='overlay-img'><XIcon className='relative w-28 h-28 text-gray-400 font-normal' style={{ marginLeft: '-26px' }} /></div>*/}
              {data.dead && <div className='overlay-img'><XIcon className='w-28 h-28 text-gray-500' size={68} strokeWidth={2} absoluteStrokeWidth style={{ marginLeft: '-25px' }} /></div>}
            </div>}
          {data.indice && !data.inGestation && !data.miscarriage && !data.abortion &&
            <div className="px-2 py-2.5 rounded-xs bg-white border-2 border-stone-400">
              <div className="flex items-center img-container">
                <div className={`text-gray-500 text-4xl font-bold text-center ${data.age > 9 ? 'px-1' : 'px-4'}`}>{data.age}</div>
                {/*data.dead && <div className='overlay-img'><XIcon className='relative w-28 h-28 text-gray-400 font-normal' style={{ marginLeft: '-36px' }} /></div>*/}
                {data.dead && <div className='overlay-img'><XIcon className='w-28 h-28 text-gray-500' size={68} strokeWidth={2} absoluteStrokeWidth style={{ marginLeft: '-36px' }} /></div>}
              </div>
            </div>}
          <Handle
            type="target"
            position={data.positionTarget}
            className={`${data.positionTarget == 'left' || data.positionTarget == 'right' ? 'h' : 'w'}-1.5 !bg-teal-500`}
          />
          <Handle type="source" position={data.positionSource} className={`!bg-teal-500`} />
          <Handle id='sourceBottom' type="source" position={Position.Bottom} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='targetBottom' type="target" position={Position.Bottom} className='bg-transparent border-0 h-0 w-0 z-0' />
        </div>}

      {/* //NOTE: Nodo para rol de genero femenino */}
      {data.gender === 'Female' && data.age != 0 &&
        <div className="shadow-md text-center flex items-center px-2 py-2 rounded-full bg-white border-2 border-stone-400">
          {data.inGestation && <TriangleIcon className='relative w-20 h-20 text-gray-500 font-normal' />}
          {data.miscarriage && <div className="w-20 h-20 rounded-full bg-gray-700 border-4 border-white"></div>}
          {data.abortion && <XIcon className='w-20 h-20' size={58} strokeWidth={2} absoluteStrokeWidth />}
          {!data.indice && !data.inGestation && !data.miscarriage && !data.abortion &&
            <div className="py-1 flex items-center img-container text-center">
              <div className={`text-gray-500 text-4xl font-bold text-center ${data.age > 9 ? 'px-2.5 py-1.5' : 'px-4'}`}>{data.age}</div>
              {data.dead && <div className='overlay-img'><XIcon className='w-24 h-24 text-gray-500' size={68} strokeWidth={2} absoluteStrokeWidth style={{ marginLeft: '-19px' }} /></div>}
            </div>}
          {data.indice && !data.inGestation && !data.miscarriage && !data.abortion &&
            <div className="flex items-center px-2.5 py-2 rounded-full bg-white border-2 border-stone-400">
              <div className="flex items-center">
                <div className={`text-gray-500 text-4xl font-bold text-center ${data.age > 9 ? 'px-1 py-1' : 'px-4'}`}>{data.age}</div>
                {data.dead && <div className='overlay-img'><XIcon className='w-20 h-20 text-gray-500' size={68} strokeWidth={2} absoluteStrokeWidth style={{ marginLeft: '-22px' }} /></div>}
              </div>
            </div>}
          <Handle
            type="target"
            position={data.positionTarget}
            className={`${data.positionTarget == 'left' || data.positionTarget == 'right' ? 'h' : 'w'}-1.5 !bg-teal-500`}
          />
          <Handle
            type="source"
            position={data.positionSource}
            className={`${data.positionSource == 'left' || data.positionSource == 'right' ? 'h' : 'w'}-1.5 !bg-teal-500`}
          />
          <Handle id='sourceTop' type="source" position={Position.Top} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='sourceBottom' type="target" position={Position.Bottom} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='targetTop' type="source" position={Position.Top} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='targetBottom' type="target" position={Position.Bottom} className='bg-transparent border-0 h-0 w-0 z-0' />
        </div>}
      {/* //NOTE: Nodo conector de nodos */}
      {data.age == 0 &&
        <div className="flex items-center px-0 py-0 border-2 border-transparent bg-gray-300 w-2 h-2">
          <Handle id='targetLeft' type="target" position={Position.Left} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='sourceRight' type="source" position={Position.Right} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='targetRight' type="target" position={Position.Right} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='sourceLeft' type="source" position={Position.Left} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='sourceBottom' type="source" position={Position.Bottom} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='targetBottom' type="target" position={Position.Bottom} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='sourceTop' type="source" position={Position.Top} className='bg-transparent border-0 h-0 w-0 z-0' />
          <Handle id='targetTop' type="target" position={Position.Top} className='bg-transparent border-0 h-0 w-0 z-0' />
          <label style={{ marginTop: '-4px' }} className='w-2 bg-gray-200 text-xl text-gray-100 bg-transparent'>
            {data.name === RelationTypeCouple.MATRIMONIO && <span>{"-"}</span>}
            {data.name === RelationTypeCouple.DIVORCIO && <span>{"//"}</span>}
            {data.name === RelationTypeCouple.SEPARACION && <span>{"/"}</span>}
            {data.name === RelationTypeCouple.CONVIVIENTES && <span>-</span>}
            {data.name === RelationTypeMember.OTHER && <span className=''>{"//"}</span>}
          </label>
          {/*<Handle
              type="target"
              position={data.positionTarget}
              className={`bg-transparent border-0 h-0 w-0 z-0`}
            />
            <Handle
              type="source"
              position={data.positionSource}
              className={`bg-transparent border-0 h-0 w-0 z-0`}
            />
              <Handle
                id='cb'
                type="source"
                position={Position.Bottom}
                className={`bg-transparent`}
              />*/}
        </div>}
      {/* //INFO Acciones para cada nodo */}
      {data.age > 0 && <NodeToolbar
        isVisible={data.forceToolbarVisible || undefined}
        position={Position.Bottom}
      >
        {/*<button className='bg-blue-500 p-1 text-white mx-1 rounded-md w-8 h-8'
          onClick={() => { setPrevEdit(data) }}>
          <ExternalLink className='w-6 h-6' />
        </button>*/}
        {/*<button className='bg-blue-500 p-1 text-white mx-1 rounded-md w-8 h-8'
          onClick={() => { setEdit() }}>
          <Edit2Icon className='w-5 h-5 ml-1' />
        </button>*/}
        <Popover>
          <PopoverTrigger asChild>
            <button className='bg-blue-500 p-1 text-white mx-1 rounded-md w-8 h-8' onClick={() => { setEdit(data) }}>
              <HoverCardContentDiv data={{ title: 'Editar informacion', description: 'Editar información basica del individuo', time: '' }}>
                <FileEditIcon className='w-5 h-5 ml-1' />
              </HoverCardContentDiv>
            </button>
          </PopoverTrigger>
          <PopoverContent className="border-2 mt-2 shadow-lg">
            <AddMemberContent />
          </PopoverContent>
        </Popover>
        {!data.indice && (!data.inGestation && !data.miscarriage && !data.abortion) && <button className='bg-blue-500 p-1 text-white mx-1 rounded-md w-8 h-8'
          onClick={() => { setIndice(data, true) }}>
          <HoverCardContentDiv data={{ title: 'Aplicar como indice', description: 'Individuo indice o Individuo identificado', time: '' }}>
            <CheckCheckIcon className='w-6 h-6' />
          </HoverCardContentDiv>
        </button>}
        {data.indice && (!data.inGestation && !data.miscarriage && !data.abortion) && <button className='bg-gray-500 p-1 text-white mx-1 rounded-md w-8 h-8'
          onClick={() => { setIndice(data, false) }} title={'Cancelar indice'}>
          <Unlink2Icon className='w-6 h-6 text-gray-50' />
        </button>}
        {!data.dead && (!data.inGestation && !data.miscarriage && !data.abortion) && <button className='bg-blue-500 p-1 text-white mx-1 rounded-md w-8 h-8'
          onClick={() => { setDead(data, true) }}>
          <HoverCardContentDiv data={{ title: 'Individuo fallecido', description: 'Aplicar como un individuo fallecido', time: '' }}>
            <HeartIcon className='w-6 h-6' />
          </HoverCardContentDiv>
        </button>}
        {data.dead && (!data.inGestation && !data.miscarriage && !data.abortion) && <button className='bg-gray-500 p-1 text-white mx-1 rounded-md w-8 h-8'
          onClick={() => { setDead(data, false) }} >
          <HoverCardContentDiv data={{ title: 'Individuo vivo', description: 'Aplicar como un individuo vivo', time: '' }}>
            <HeartOffIcon className='w-6 h-6 text-gray-50' />
          </HoverCardContentDiv>
        </button>}
        {!data.dead && (!data.inGestation && !data.miscarriage && !data.abortion) && <Popover>
          <PopoverTrigger asChild>
            <button className='bg-blue-500 p-1 text-white mx-1 rounded-md w-8 h-8' onClick={() => { setEdit(data) }}>
              <EventHoverCard member={data}>
                <CalendarPlusIcon className='w-5 h-5 ml-1' />
              </EventHoverCard>
            </button>
          </PopoverTrigger>
          <PopoverContent className="border-2 mt-2 shadow-lg">
            <AddEventContent />
          </PopoverContent>
        </Popover>}
        {!data.dead && (!data.inGestation && !data.miscarriage && !data.abortion) && <Popover>
          <PopoverTrigger asChild>
            <button className='bg-blue-500 p-1 text-white mx-1 rounded-md w-8 h-8' onClick={() => { setEdit(data) }}>
              <PathologicalDiseasesHoverCard member={data}>
                <AxeIcon className='w-5 h-5 ml-1' />
              </PathologicalDiseasesHoverCard>
            </button>
          </PopoverTrigger>
          <PopoverContent className="border-2 mt-2 shadow-lg">
            <AddPathologicalDiseasesContent />
          </PopoverContent>
        </Popover>}
        {/*!data.dead && (!data.inGestation && !data.miscarriage && !data.abortion) &&
          <button className='bg-blue-500 p-1 text-white mx-1 rounded-md w-8 h-8'
            onClick={() => {
              addChild(Rol.FATHER, RelationTypeMember.HIJO_LEGITIMO);
            }}>
            <PlusCircleIcon className='w-6 h-6' />
          </button>*/}
      </NodeToolbar>}
    </>
  );
}

export default memo(CustomNode);
