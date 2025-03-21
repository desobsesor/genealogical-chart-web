import { DialogAlert } from '@/components/familyTree/DialogAlert';
import AnnotationNode from '@/components/layout/AnnotationNode';
import ButtonEdge from '@/components/layout/ButtonEdge';
import HoverCardContentDiv from '@/components/layout/HoverCard';
import { PathologicalDiseases } from '@/models/PathologicalDiseases.model';
import { formatDate } from '@/utils/dates';
import { generateUniqueId } from '@/utils/number';
import { getFirstLastNames } from '@/utils/string';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  ControlButton,
  Controls,
  Edge,
  FitViewOptions,
  MiniMap,
  Panel,
  Position,
  ReactFlow,
  reconnectEdge,
  useEdgesState,
  useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';
import '@xyflow/react/dist/style.css';
import { ChevronsLeftRightEllipsisIcon, DonutIcon, EraserIcon, FlipVerticalIcon, Grid2x2CheckIcon, Grid2x2XIcon, GroupIcon, ImageDownIcon, Layers2Icon, LayersIcon, LayoutPanelTopIcon, ListChecksIcon, ListCollapseIcon, LocateIcon, LucideWorkflow, NfcIcon, SaveIcon, SpaceIcon, SplitIcon, TrendingUpDownIcon, TriangleIcon, UserPlusIcon, UserRound, UserRoundPlusIcon, UserSquareIcon, XIcon } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import CustomNode from '../components/familyTree/CustomNode';
import { initEdges, initEdgesTemplateI, initEdgesTemplateII, initEdgesTemplateIII, initNodes, initNodesTemplateI, initNodesTemplateII, initNodesTemplateIII } from '../components/familyTree/InitialElements';
import CurrentDateTime from '../components/helpers/CurrentDatetime';
import ImageCapture from '../components/helpers/ImageCapture';
import { Member } from '../models/Member.model';
import { NodeMember } from '../models/NodeMember.model';
import { useHelper } from '../services/context/HelperContext';
import { Gen, Gender, RelationTypeCouple, RelationTypeMember, Rol } from '../utils/enum';
import { getSafeKeyObjectFromStorage } from '../utils/safe-token-storage';
const edgeTypes = {
  buttonedge: ButtonEdge,
};

const App: React.FC = () => {
  const familyTree: any = JSON.parse(getSafeKeyObjectFromStorage('familyTree')) ?? {};
  const edgeReconnectSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initEdges);
  const {
    addCouple,
    labelFamily,
    setLabelFamily,
    addMember,
    childs,
    setShowModalMember,
    setShowModalCouple,
    currentChild,
    currentEvent,
    currentPathologicalDiseases,
    showPopoverMember,
    setShowPopoverEvent,
    showPopoverEvent,
    setShowPopoverMember,
    showPopoverPathologicalDiseases,
    setShowPopoverPathologicalDiseases,
    setIsSaving,
    isSaving
  } = useHelper();
  const [nodeMemberDefault, setNodeMemberDefault] = useState<any>();
  const [nodeMemberConnector, setNodeMemberConnector] = useState<any>();
  const [nodesCouple, setNodesCouple] = useState<any[]>([]);
  const [initX, setInitX] = useState<number>(-160);
  const [initY, setInitY] = useState<number>(0);
  const [distancingParentsX, setDistancingParentsX] = useState<number>(600);
  const [withGrid, setWithGrid] = useState<boolean>(false);
  const [toolbarVisible, setToolbarVisible] = useState<boolean>(false);

  const patologias = [{
    id: '1', name: "....", description: ''
  }, {
    id: '2', name: "....", description: ''
  }, {
    id: '3', name: "....", description: ''
  }] as PathologicalDiseases[];

  const nodeTypes = {
    annotation: AnnotationNode,
    custom: CustomNode,
  }

  //#region HOOKS 

  useEffect(() => {
    if (familyTree?.nodes?.length > 0 && familyTree?.edges?.length) {
      setEdges(familyTree.edges);
      setNodes(familyTree.nodes);
      setInitX(-160);
      setInitY(0);
    }
  }, []);

  useEffect(() => {
    setNodeMemberDefault({
      id: 'custom_1',
      type: 'custom',
      data: {
        id: 'custom_1',
        name: '...',
        rol: Rol.OTHER,
        icon: <DonutIcon className='h-10 w-10' />,
        positionSource: Position.Bottom,
        positionTarget: Position.Bottom,
        gender: Gender.OTHER,
        age: 1,
        dead: false,
        gen: Gen.I,
        indice: false,
        inGestation: false,
        miscarriage: false,
        abortion: false,
        avatar: '09.jpg'
      },
      position: { x: initX, y: initY },
      draggable: true,
      selectable: true,
      submenuItems: [{ label: 'Opción 1', onClick: () => { } }, { label: 'Opción 2', onClick: () => { } }]
    });
  }, []);

  useEffect(() => {
    setNodeMemberConnector({
      id: 'connector_1',
      type: 'custom',
      data: {
        id: 'connector_1',
        name: '...',
        rol: Rol.OTHER,
        icon: <DonutIcon className='h-10 w-10' />,
        positionSource: Position.Left,
        positionTarget: Position.Right,
        gender: Gender.OTHER,
        age: 0,
        dead: false,
        gen: Gen.I,
        indice: false,
        inGestation: false,
        miscarriage: false,
        abortion: false,
        avatar: '09.jpg'
      },
      position: { x: initX, y: initY },
      draggable: true,
      selectable: true,
    });
  }, []);

  useEffect(() => {
    setNodesCouple([{
      id: '1',
      type: 'custom',
      data: {
        id: '1',
        name: 'Padre',
        rol: Rol.FATHER,
        icon: <DonutIcon className='h-10 w-10' />,
        positionSource: Position.Bottom,
        positionTarget: Position.Bottom,
        gender: Gender.MALE,
        age: 15,
        dead: false,
        gen: Gen.I,
        indice: false,
        inGestation: false,
        miscarriage: false,
        abortion: false,
        avatar: '06.jpg'
      },
      position: { x: -250, y: -20 },
      draggable: false,
      selectable: true,
    },
    {
      id: '2',
      type: 'custom',
      data: {
        id: '2',
        name: 'nodePoint_1',
        rol: Rol.OTHER,
        icon: <NfcIcon className='h-10 w-10' />,
        positionSource: Position.Left,
        positionTarget: Position.Right,
        gender: Gender.OTHER,
        age: 0,
        dead: false,
        gen: Gen.I,
        indice: false,
        inGestation: false,
        avatar: '06.jpg'
      },
      position: { x: 35, y: 200 },
      draggable: false,
      selectable: true,
    },
    {
      id: '3',
      type: 'custom',
      data: {
        id: '3',
        name: 'Madre',
        rol: Rol.MOTHER,
        icon: <DonutIcon className='h-10 w-10' />,
        positionSource: Position.Bottom,
        positionTarget: Position.Bottom,
        gender: Gender.FEMALE,
        age: 15,
        dead: false,
        gen: Gen.I,
        indice: false,
        inGestation: false,
        miscarriage: false,
        abortion: false,
        avatar: '06.jpg'
      },
      position: { x: 250, y: -20 },
      draggable: false,
      selectable: true,
    },
    {
      id: '4',
      type: 'custom',
      data: {
        level: 4,
        label: 'Enfermedades patologicas!',
        arrowStyle: {
          right: 0,
          bottom: 0,
          transform: 'translate(-30px,10px) rotate(-80deg)',
        },
      },
      position: { x: -100, y: 300 },
      draggable: false,
      selectable: true,
    }]);
  }, []);

  useEffect(() => {
    if (currentPathologicalDiseases && showPopoverPathologicalDiseases) {
      setNodes((nodes: any) =>
        nodes.map((node: any) =>
          node.id === currentChild.id
            ? { ...node, data: { ...node.data, pathologicalDiseases: [...(node.data.pathologicalDiseases || []), currentPathologicalDiseases] } }
            : node
        ),
      );
      toast("La patología se ha agregado exitosamente!", {
        description: "" + formatDate(new Date(), 'YYYY/MM/DD HH:mm'),
        action: {
          label: "Guardar",
          onClick: () => {
            handleSaveInfo();
          }
        }
      })
      setShowPopoverPathologicalDiseases(true);
      setIsSaving(false);
    }
  }, [currentPathologicalDiseases, showPopoverPathologicalDiseases]);

  useEffect(() => {
    if (currentEvent && showPopoverEvent) {
      setNodes((nodes: any) =>
        nodes.map((node: any) =>
          node.id === currentChild.id
            ? { ...node, data: { ...node.data, events: [...(node.data.events || []), currentEvent] } }
            : node
        ),
      );
      toast("El evento se ha agregado exitosamente!", {
        description: "" + formatDate(new Date(), 'YYYY/MM/DD HH:mm'),
        action: {
          label: "Guardar",
          onClick: () => {
            handleSaveInfo();
          }
        }
      })
      setShowPopoverEvent(true);
      setIsSaving(false);
    }
  }, [currentEvent, showPopoverEvent]);

  useEffect(() => {
    if (currentChild && currentChild?.gender != Gender.OTHER && showPopoverMember) {
      setNodes((nodes: any) =>
        nodes.map((node: any) =>
          node.id === currentChild?.id
            ? { ...node, position: { x: node.position.x, y: node.position.y }, data: { ...node.data, ...currentChild } }
            : node
        ),
      );
      setShowPopoverMember(true);
      setIsSaving(false);

      toast("Actualización exitosa!", {
        description: "" + formatDate(new Date(), 'YYYY/MM/DD HH:mm'),
        action: {
          label: "Guardar",
          onClick: () => {
            handleSaveInfo();
          }
        }
      });
    }
  }, [currentChild, showPopoverMember]);

  useEffect(() => {
    if (addCouple) {
      const numberChilds = childs?.length / 2
      if (childs?.length > 0 && nodes.length === 0) {
        const newNodes: NodeMember[] = [];
        for (let i = 0; i < childs?.length; i++) {
          let obj: NodeMember = {
            id: `child_${i}`,
            type: 'custom',
            data: {
              id: `child_${i}`,
              name: childs[i].name,
              rol: childs[i].rol,
              icon: <DonutIcon className='h-10 w-10' />,
              positionSource: childs[i].age === 0 ? Position.Bottom : childs[i].positionSource,
              positionTarget: childs[i].age === 0 ? Position.Bottom : childs[i].positionTarget,
              gender: childs[i].gender,
              age: childs[i].age,
              dead: childs[i].dead,
              gen: childs[i].gen,
              indice: childs[i].indice,
              inGestation: childs[i].inGestation,
              miscarriage: childs[i].miscarriage,
              abortion: childs[i].abortion,
              avatar: childs[i].gender === Gender.MALE ? '06.jpg' : '09.jpg',
              pathologicalDiseases: patologias
            },
            position: { x: 0, y: 0 },
            draggable: false,
            selectable: true,
            relationType: RelationTypeMember.HIJO_LEGITIMO
          };
          let eventObj = {
            id: `annotation_${i}`,
            type: 'annotation',
            data: {
              title: 'Patologías',
              arrayLabel: patologias,
              arrowStyle: {
                right: 0,
                bottom: 0,
                transform: 'translate(-90px,20px) rotate(-80deg)',
              },
            },
            position: { x: -100, y: 300 },
            draggable: false,
            selectable: true,
          }

          let objs = {};
          let eventObjs = {};
          switch (numberChilds) {
            case 1:
              setEdges((eds) => {
                const newEdge = {
                  id: 'ec1-ec0',
                  source: 'child_1',
                  target: 'child_0',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                };
                const existingEdgeIndex = eds.findIndex(edge => edge.id === 'ec1-ec0');
                if (existingEdgeIndex !== -1) {
                  const updatedEdges = [...eds];
                  updatedEdges[existingEdgeIndex] = newEdge;
                  return updatedEdges;
                } else {
                  return [...eds, newEdge];
                }
              });
              objs = {
                ...obj, position: childs[i].age === 0 ? { x: ((((distancingParentsX / numberChilds) * i + 1) + -90)), y: 208 } :
                  { x: ((((distancingParentsX / numberChilds) * i) + (-473)) * -1), y: initY + 350 }
              }
              if (childs[i].age != 0 && patologias.length > 0) {
                eventObjs = {
                  ...eventObj, position: childs[i].age === 0 ? { x: ((((distancingParentsX / numberChilds) * i + 1) + -290)), y: 208 } :
                    { x: ((((distancingParentsX / numberChilds) * i) + (-393)) * -1), y: initY + 338 }
                }
              }
              break;
            case 2:
              setEdges((eds) => {
                const newEdges = [{
                  id: 'ec2-ec1',
                  source: 'child_2',
                  target: 'child_1',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec3-ec0',
                  source: 'child_3',
                  target: 'child_0',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }];

                const updatedEdges = [...eds];
                newEdges.forEach(newEdge => {
                  const existingEdgeIndex = updatedEdges.findIndex(edge => edge.id === newEdge.id);
                  if (existingEdgeIndex !== -1) {
                    updatedEdges[existingEdgeIndex] = newEdge;
                  } else {
                    updatedEdges.push(newEdge);
                  }
                });

                return updatedEdges;
              });
              objs = {
                ...obj, position: childs[i].age === 0 ? { x: ((((distancingParentsX / numberChilds) * i + 1) + (-163))), y: 208 } :
                  { x: ((((distancingParentsX / numberChilds) * i) + (-700)) * -1), y: initY + 350 }
              };
              if (childs[i].age != 0 && patologias.length > 0) {
                eventObjs = {
                  ...eventObj, position: childs[i].age === 0 ? { x: ((((distancingParentsX / numberChilds) * i + 1) + -290)), y: 208 } :
                    { x: ((((distancingParentsX / numberChilds) * i) + (-620)) * -1), y: initY + 338 }
                }
              }
              break;
            case 3:
              setEdges((eds) => {
                const newEdges = [{
                  id: 'ec3-ec2',
                  source: 'child_3',
                  target: 'child_2',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec4-ec1',
                  source: 'child_4',
                  target: 'child_1',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec5-ec0',
                  source: 'child_5',
                  target: 'child_0',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }];

                const updatedEdges = [...eds];
                newEdges.forEach(newEdge => {
                  const existingEdgeIndex = updatedEdges.findIndex(edge => edge.id === newEdge.id);
                  if (existingEdgeIndex !== -1) {
                    updatedEdges[existingEdgeIndex] = newEdge;
                  } else {
                    updatedEdges.push(newEdge);
                  }
                });

                return updatedEdges;
              });
              objs = {
                ...obj, position: childs[i].age === 0 ? { x: ((((distancingParentsX / numberChilds) * i + 1) + (-163))), y: 208 } :
                  { x: ((((distancingParentsX / numberChilds) * i) + (-800)) * -1), y: initY + 350 }
              }
              if (childs[i].age != 0 && patologias.length > 0) {
                eventObjs = {
                  ...eventObj, position: childs[i].age === 0 ? { x: ((((distancingParentsX / numberChilds) * i + 1) + -290)), y: 208 } :
                    { x: ((((distancingParentsX / numberChilds) * i) + (-720)) * -1), y: initY + 338 }
                }
              }
              break;
            case 4:
              setEdges((eds) => {
                const newEdges = [{
                  id: 'ec4-ec3',
                  source: 'child_4',
                  target: 'child_3',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec5-ec2',
                  source: 'child_5',
                  target: 'child_2',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec6-ec1',
                  source: 'child_6',
                  target: 'child_1',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec7-ec0',
                  source: 'child_7',
                  target: 'child_0',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }];

                const updatedEdges = [...eds];
                newEdges.forEach(newEdge => {
                  const existingEdgeIndex = updatedEdges.findIndex(edge => edge.id === newEdge.id);
                  if (existingEdgeIndex !== -1) {
                    updatedEdges[existingEdgeIndex] = newEdge;
                  } else {
                    updatedEdges.push(newEdge);
                  }
                });

                return updatedEdges;
              });
              objs = {
                ...obj, position: childs[i].age === 0 ? { x: ((((distancingParentsX / numberChilds) * i + 1) + (-190))), y: 208 } :
                  { x: ((((distancingParentsX / numberChilds) * i) + (-823)) * -1), y: initY + 350 }
              }
              if (childs[i].age != 0 && patologias.length > 0) {
                eventObjs = {
                  ...eventObj, position: childs[i].age === 0 ? { x: ((((distancingParentsX / numberChilds) * i + 1) + -290)), y: 208 } :
                    { x: ((((distancingParentsX / numberChilds) * i) + (-735)) * -1), y: initY + 338 }
                }
              }
              break;
            case 5:
              setEdges((eds) => {
                const newEdges = [{
                  id: 'ec4-ec1',
                  source: 'child_5',
                  target: 'child_4',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec4-ec2',
                  source: 'child_6',
                  target: 'child_3',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec5-ec3',
                  source: 'child_7',
                  target: 'child_2',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec8-ec1',
                  source: 'child_8',
                  target: 'child_1',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec9-ec0',
                  source: 'child_9',
                  target: 'child_0',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }];

                const updatedEdges = [...eds];
                newEdges.forEach(newEdge => {
                  const existingEdgeIndex = updatedEdges.findIndex(edge => edge.id === newEdge.id);
                  if (existingEdgeIndex !== -1) {
                    updatedEdges[existingEdgeIndex] = newEdge;
                  } else {
                    updatedEdges.push(newEdge);
                  }
                });

                return updatedEdges;
              });
              objs = {
                ...obj, position: childs[i].age === 0 ? { x: ((((distancingParentsX / numberChilds) * i + 1) + (-200))), y: 208 } :
                  { x: ((((distancingParentsX / numberChilds) * i) + (-843)) * -1), y: initY + 350 }
              }
              break;
            case 6:
              setEdges((eds) => {
                const newEdges = [{
                  id: 'ec6-ec5',
                  source: 'child_6',
                  target: 'child_5',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec7-ec4',
                  source: 'child_7',
                  target: 'child_4',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec8-ec3',
                  source: 'child_8',
                  target: 'child_3',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec9-ec2',
                  source: 'child_9',
                  target: 'child_2',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec10-ec1',
                  source: 'child_10',
                  target: 'child_1',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }, {
                  id: 'ec11-ec0',
                  source: 'child_11',
                  target: 'child_0',
                  animated: addCouple.relationship === RelationTypeMember.HIJO_ADOPTIVO,
                  type: 'smoothstep'
                }];

                const updatedEdges = [...eds];
                newEdges.forEach(newEdge => {
                  const existingEdgeIndex = updatedEdges.findIndex(edge => edge.id === newEdge.id);
                  if (existingEdgeIndex !== -1) {
                    updatedEdges[existingEdgeIndex] = newEdge;
                  } else {
                    updatedEdges.push(newEdge);
                  }
                });

                return updatedEdges;
              });
              objs = {
                ...obj, position: childs[i].age === 0 ? { x: (((((distancingParentsX - 11) / numberChilds) * i + 1) + (-210))), y: 208 } :
                  { x: (((((distancingParentsX - 10) / numberChilds) * i) + (-834)) * -1), y: initY + 350 }
              }
              break;
            default:
              break;
          }

          newNodes.push(objs as NodeMember);
          if (eventObjs && childs[i].age != 0) {
            newNodes.push(eventObjs as NodeMember);
          }
        }

        setCouple([
          { ...nodesCouple[0], data: addCouple.father },
          { ...nodesCouple[1], data: addCouple.pointSourceLeftTargetRight },
          { ...nodesCouple[2], data: addCouple.mother },
          ...newNodes]);

        setRelationCouple([{
          id: 'e1-e8',
          source: '1',
          target: '2',
          animated: addCouple.relationship === RelationTypeCouple.CONVIVIENTES,
          type: 'smoothstep'
        }, {
          id: 'e8-e4',
          source: '2',
          target: '3',
          animated: addCouple.relationship === RelationTypeCouple.CONVIVIENTES,
          type: 'smoothstep'
        }]);
      }
    }
  }, [addCouple]);

  useEffect(() => {
    setShowModalMember(addMember);
  }, [addMember]);

  useEffect(() => {
    const fatherNode = findNodeByRole(Rol.FATHER);
    const motherNode = findNodeByRole(Rol.MOTHER);
    if (fatherNode && motherNode) {
      setLabelFamily('Familia ' + getFirstLastNames(fatherNode?.data?.name, motherNode?.data?.name));
    }
  }, [isSaving]);

  //#endregion

  const handleLoadTemplate = (gen: Gen) => {
    handleSaveInfo();
    cleanNodesAndEdges();
    let nodesTemplate;
    if (gen === Gen.I) {
      nodesTemplate = initNodesTemplateI;
    } else if (gen === Gen.II) {
      nodesTemplate = initNodesTemplateII;
    } else {
      nodesTemplate = initNodesTemplateIII;
    }
    let edgesTemplate;
    if (gen === Gen.I) {
      edgesTemplate = initEdgesTemplateI;
    } else if (gen === Gen.II) {
      edgesTemplate = initEdgesTemplateII;
    } else {
      edgesTemplate = initEdgesTemplateIII;
    }
    setNodes(nodesTemplate);
    setEdges(edgesTemplate);
  }

  const handleSaveInfo = () => {
    const familyTree: any = {
      nodes,
      edges
    }
    localStorage.setItem('familyTree', JSON.stringify(familyTree));
    console.log('familyTree:', familyTree);
    toast("Se ha guardado exitosamente la información del familiograma!", {
      description: "" + formatDate(new Date(), 'YYYY/MM/DD HH:mm'),
      action: {
        label: "Enviar",
        onClick: () => {
          //console.log("Datos enviados: ", familyTree)
        }
      },
    })
  }

  const showModalCouple_ = () => {
    setShowModalCouple(false);
    setNodes([]);
    setEdges([]);
  }

  const showModalMember_ = () => {
    setShowModalMember(false);
  }

  //#region ACCIONES SOBRE EL LIENZO 

  const setMember = useCallback(
    (memberNew: Partial<Member>) =>
      setNodes((nds) => [...nds, memberNew]),
    [setNodes],
  );

  const setCouple = useCallback(
    (members: Partial<NodeMember>[]) => {
      setNodes((nds) => {
        const existingIds = new Set(nds.map((node) => node.id));
        const newMembers = members.filter((member) => !existingIds.has(member.id));
        return [...nds, ...newMembers];
      });
    },
    [setNodes],
  );

  const setRelationCouple = useCallback(
    (relations: any[]) =>
      setEdges((eds) => [...eds, ...relations]),
    [setEdges],
  );

  const setRelationParentsChild = useCallback(
    (relationsParentsChild: any[]) =>
      setEdges((eds) => [...eds, ...relationsParentsChild]),
    [setEdges],
  );

  const setToolbar = useCallback(
    (memberNew: any) =>
      setNodes((nodes: any) =>
        nodes.map((node: any) =>
          node.id === memberNew.id
            ? { ...node, data: { ...node.data, forceToolbarVisible: true } }
            : node
        ),
      ),
    [setNodes],
  )

  const setCouple_ = useCallback(
    (memberNew: any) =>
      setNodes((nodes: any) =>
        nodes.map((node: any) =>
          node.id === memberNew.id
            ? { ...node, data: { ...node.data, forceToolbarVisible: true } }
            : node
        ),
      ),
    [setNodes],
  )

  //#endregion

  //#region HANDLERS TOOLBAR 

  const addParent = (rol: Rol) => {
    const idParent = rol === Rol.MOTHER ? 'parent-2' : 'parent-1'
    setMember({
      ...nodeMemberDefault,
      id: idParent,
      position: { x: rol === Rol.MOTHER ? initX + 200 : initX - 250, y: initY + 150 },
      data: {
        ...nodeMemberDefault.data,
        id: idParent,
        rol,
        gender: rol === Rol.MOTHER ? Gender.FEMALE : Gender.MALE,
        age: 14,
        avatar: rol === Rol.MOTHER ? '09.jpg' : '06.jpg'
      }
    });
    const existNode = findNodeByRole(rol === Rol.MOTHER ? Rol.FATHER : Rol.MOTHER);

    if (existNode) {
      setRelationParentsChild([{
        id: `child-${existNode?.id}-${idParent}`,
        source: existNode?.id,
        target: idParent,
        animated: false,
        type: 'step',
        selected: true,
        interactionWidth: 4,
      }]);

    }
  }

  const addChild = (rol: Rol, relationTypeMember: RelationTypeMember, inGestation?: boolean, abortion?: boolean, miscarriage?: boolean) => {
    const idChild = generateUniqueId();
    const idNodeConnector = generateUniqueId();
    setInitX(initX + 100);
    const existChild = findNodeByRole(Rol.SON || Rol.DAUGHTER);
    const existEdge = findEdgeByNode(existChild?.id);
    const gender = rol == Rol.SON || rol == Rol.FATHER ? Gender.MALE : Gender.FEMALE
    setMember({
      ...nodeMemberDefault,
      id: idChild,
      position: { x: initX - 30, y: initY + 450 },
      data: {
        ...nodeMemberDefault.data,
        id: idChild,
        rol: rol,
        gender,
        age: 14,
        positionSource: Position.Top,
        positionTarget: Position.Bottom,
        inGestation,
        abortion,
        miscarriage,
        avatar: rol === Rol.DAUGHTER ? '09.jpg' : '06.jpg'
      },
    });
    if (existChild) {
      setRelationParentsChild([{
        id: `child-${idChild}-${idNodeConnector}`,
        source: idChild,
        target: existEdge?.target,
        animated: relationTypeMember === RelationTypeMember.HIJO_ADOPTIVO,
        type: 'buttonedge',
        selected: true,
        interactionWidth: 1,
      }]);
    }
    if (!existChild) {
      setMember({ ...nodeMemberConnector, id: idNodeConnector, position: { x: initX + 36, y: initY + 280 }, data: { ...nodeMemberConnector.data, id: idChild, rol: rol, gender, age: 0, positionSource: Position.Bottom } });
      setRelationParentsChild([{
        id: `child-${idChild}-${idNodeConnector}`,
        source: idChild,
        target: idNodeConnector,
        animated: relationTypeMember === RelationTypeMember.HIJO_ADOPTIVO,
        type: 'buttonedge',
        selected: true,
        interactionWidth: 1,
      }, {
        id: `parent-1-${idChild}-${idNodeConnector}`,
        source: 'parent-1',
        target: idNodeConnector,
        animated: false,
        type: 'step',
        selected: true,
        interactionWidth: 1
      }, {
        id: `parent-2-${idChild}-${idNodeConnector}`,
        source: idNodeConnector,
        target: 'parent-2',
        animated: false,
        type: 'step',
        selected: true,
        interactionWidth: 1,
        //targetHandleId: 'targetRight',
        //style: { stroke: 'gray', strokeDasharray: '4,4' },
      }]);
    }
    handleDeleteEdge('child-parent-1-parent-2');
    handleDeleteEdge('child-parent-1-parent-1');
    handleDeleteEdge('child-parent-2-parent-1');
  }

  //#endregion

  //#region HANDLERS 

  const findNodeByRole = (role: Rol) => {
    const node = nodes.find((node: any) => node.data.rol === role);
    return node || null;
  };

  const findEdgeByNode = (role: Rol) => {
    const edge = edges.find((edge: any) => edge.source === role);
    return edge || null;
  };

  const cleanNodesAndEdges = () => {
    setNodes([]);
    setEdges([]);
  }

  const handleAddCouple = () => {
    setShowModalCouple(true);
    setCouple(nodesCouple);
  }

  const handleDeleteEdge = (edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  };

  const handleEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    const confirmDelete = window.confirm(`Are you sure you want to delete the connection between ${edge.source} and ${edge.target}?`);
    if (confirmDelete) {
      handleDeleteEdge(edge.id);
    }
  };

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge: any, newConnection: any) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);

  //#endregion

  //#region CONFIGURATION

  function nodeColor(node: any) {
    switch (node.type) {
      case 'input':
        return '#6ede87';
      case 'output':
        return '#6865A5';
      default:
        return '#ff0072';
    }
  }

  const fitViewOptions: FitViewOptions = {
    padding: 0.2, // Espacio extra alrededor de los nodos
    includeHiddenNodes: true, // Incluir nodos ocultos en el cálculo del zoom
    minZoom: 0.5, // Zoom mínimo
    maxZoom: 1.2, // Zoom máximo
  };
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, type: 'step' }, eds)), [setEdges]);

  const setPosition = useCallback(
    (pos: any) =>
      setNodes((nodes: any) =>
        nodes.map((node: any) => ({
          ...node,
          data: { ...node.data, toolbarPosition: pos },
        })),
      ),
    [setNodes],
  );

  const forceToolbarVisible = useCallback(
    (enabled: any) =>
      setNodes((nodes: any) =>
        nodes.map((node: any) => ({
          ...node,
          data: { ...node.data, forceToolbarVisible: enabled },
        })),
      ),
    [setNodes],
  );
  //#endregion

  return (
    <>
      <div className='div-to-capture max-w-full justify-center'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          snapToGrid
          onReconnect={onReconnect}
          onReconnectStart={onReconnectStart}
          onReconnectEnd={onReconnectEnd}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={fitViewOptions}
          className="bg-white"
          attributionPosition="top-right"
          connectionMode={ConnectionMode.Loose}
          edgeTypes={edgeTypes}
          //style={{ backgroundColor: "#F7F9FB", maxHeight: "80vh", border: "1px solid gray" }}
          preventScrolling={true}
        >
          {withGrid && <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />}
          {withGrid && <Background id="2" gap={100} color="#ccc" variant={BackgroundVariant.Lines} />}
          {<MiniMap nodeColor={nodeColor} />}
          <Controls showZoom={false} showFitView={false} showInteractive={false} className='mr-8' orientation='vertical' position={'bottom-left'} style={{ marginBottom: '50vh' }} >
            <DialogAlert onClick={cleanNodesAndEdges}>
              <HoverCardContentDiv data={{ title: 'Limpiar el tablero', description: 'clic para limpiar el tablero y eliminar la informacion almacenada', time: '' }}>
                <EraserIcon className='text-gray-600 min-w-6 min-h-6 max-w-6 max-h-6' />
              </HoverCardContentDiv>
            </DialogAlert>
            <div className='border-t-2 text-white border-gray-300 gap-0 my-0 w-8 h-1'>|</div>
            <ControlButton className='all-items'
              onClick={() => handleLoadTemplate(Gen.I)}>
              <HoverCardContentDiv data={{ title: 'Cargar plantilla de familia basica', description: 'Clic para cargar una plantilla de una familia basica (padre, madre, hijo hombre, hija mujer)', time: '' }}>
                <LayoutPanelTopIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => handleLoadTemplate(Gen.II)}>
              <HoverCardContentDiv data={{ title: 'Cargar plantilla de 2 generaciones', description: 'Clic para cargar en el tablero una plantilla para 3 generaciones', time: '' }}>
                <Layers2Icon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => handleLoadTemplate(Gen.III)}>
              <HoverCardContentDiv data={{ title: 'Cargar plantilla de 3 generaciones', description: 'Clic para cargar en el tablero una plantilla para 3 generaciones', time: '' }}>
                <LayersIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <div className='border-t-2 text-white border-gray-300 gap-0 my-0 w-8 h-1'>|</div>
            <ControlButton className='all-items'>
              <ImageCapture dataTestId="rf__wrapper" classNames={["react-flow", "bg-white", "light"]} >
                <HoverCardContentDiv data={{ title: 'Generar imagen del familiograma', description: 'Clic para generar una imagen del tablero en format png', time: '' }}>
                  <ImageDownIcon className='text-gray-600 min-w-6 min-h-6' />
                </HoverCardContentDiv>
              </ImageCapture>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => handleSaveInfo()}>
              <HoverCardContentDiv data={{ title: 'Guardar información del familiograma', description: 'Clic para guardar en el almacenamiento del navegador la información del familiograma', time: '' }}>
                <SaveIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
          </Controls>
          <Controls showZoom={false} showFitView={false} showInteractive={false} className='mr-8' orientation='horizontal' position={'bottom-center'} >
            <ControlButton className='all-items'
              onClick={() => {
                addParent(Rol.FATHER);
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar padre', description: 'Agregar un nodo de rol padre', time: '' }}>
                <UserRoundPlusIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                addParent(Rol.MOTHER);
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar madre', description: 'Agregar un nodo de rol madre', time: '' }}>
                <UserPlusIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                const idFather = 'parent-1';
                const idMother = 'parent-2';
                setEdges((eds) =>
                  eds.map((edge) =>
                    edge.source === idFather || edge.source === idMother ? { ...edge, animated: false } : edge
                  )
                );
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar relación de casados', description: 'Agregar estado actual de la relación entre los padres', time: '' }}>
                <SpaceIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                const idFather = 'parent-1';
                const idMother = 'parent-2';
                const idChild = generateUniqueId();
                const idNodeConnector = generateUniqueId();

                setEdges((eds) =>
                  eds.map((edge) =>
                    edge.source === idFather || edge.source === idMother ? { ...edge, animated: false } : edge
                  )
                );

                setMember({
                  ...nodeMemberConnector,
                  id: idNodeConnector,
                  position: { x: initX, y: initY + 280 },
                  data: {
                    ...nodeMemberConnector.data,
                    name: RelationTypeCouple.DIVORCIO,
                    id: idChild,
                    rol: Rol.OTHER,
                    gender: Gender.OTHER,
                    age: 0,
                    positionSource: Position.Bottom
                  }
                });
                setRelationParentsChild([{
                  id: `parent-1-${idChild}-${idNodeConnector}`,
                  source: 'parent-1',
                  target: idNodeConnector,
                  animated: false,
                  type: 'step',
                  selected: true,
                  interactionWidth: 1
                }, {
                  id: `parent-2-${idChild}-${idNodeConnector}`,
                  source: idNodeConnector,
                  target: 'parent-2',
                  animated: false,
                  type: 'step',
                  selected: true,
                  interactionWidth: 1,
                  //targetHandleId: 'targetRight',
                  //style: { stroke: 'gray', strokeDasharray: '4,4' },
                }]);

                handleDeleteEdge('child-parent-1-parent-2');
                handleDeleteEdge('child-parent-1-parent-1');
                handleDeleteEdge('child-parent-2-parent-1');
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar relación de divorciados', description: 'Agregar estado actual de la relación entre los padres', time: '' }}>
                <SplitIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                const idFather = 'parent-1';
                const idMother = 'parent-2';
                setEdges((eds) =>
                  eds.map((edge) =>
                    edge.source === idFather || edge.source === idMother ? { ...edge, animated: true } : edge
                  )
                );
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar relación de convivientes', description: 'Agregar estado actual de la relación entre los padres', time: '' }}>
                <FlipVerticalIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                const idFather = 'parent-1';
                const idMother = 'parent-2';
                const idChild = generateUniqueId();
                const idNodeConnector = generateUniqueId();
                setEdges((eds) =>
                  eds.map((edge) =>
                    edge.source === idFather || edge.source === idMother ? { ...edge, animated: false } : edge
                  )
                );
                setMember({
                  ...nodeMemberConnector,
                  id: idNodeConnector,
                  position: { x: initX, y: initY + 280 },
                  data: {
                    ...nodeMemberConnector.data,
                    name: RelationTypeCouple.SEPARACION,
                    id: idChild,
                    rol: Rol.OTHER,
                    gender: Gender.OTHER,
                    age: 0,
                    positionSource: Position.Bottom
                  }
                });
                setRelationParentsChild([{
                  id: `parent-1-${idChild}-${idNodeConnector}`,
                  source: 'parent-1',
                  target: idNodeConnector,
                  animated: false,
                  type: 'step',
                  selected: true,
                  interactionWidth: 1
                }, {
                  id: `parent-2-${idChild}-${idNodeConnector}`,
                  source: idNodeConnector,
                  target: 'parent-2',
                  animated: false,
                  type: 'step',
                  selected: true,
                  interactionWidth: 1,
                  //style: { stroke: 'gray', strokeDasharray: '4,4' },
                }]);

                handleDeleteEdge('child-parent-1-parent-2');
                handleDeleteEdge('child-parent-1-parent-1');
                handleDeleteEdge('child-parent-2-parent-1');
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar relación de separados', description: 'Agregar estado actual de la relación entre los padres', time: '' }}>
                <TrendingUpDownIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                addChild(Rol.SON, RelationTypeMember.HIJO_LEGITIMO);
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar hijo legitimo', description: 'Agregar un hijo legitimo', time: '' }}>
                <UserRound className='text-gray-600 min-w-7 min-h-7' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                addChild(Rol.SON, RelationTypeMember.HIJO_ADOPTIVO);
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar hijo adoptivo', description: 'Agregar un hijo adoptivo', time: '' }}>
                <ChevronsLeftRightEllipsisIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                addChild(Rol.DAUGHTER, RelationTypeMember.HIJO_LEGITIMO);
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar hija', description: 'Clic para agregar un nuevo nodo de rol hija', time: '' }}>
                <UserSquareIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                addChild(Rol.DAUGHTER, RelationTypeMember.HIJO_ADOPTIVO);
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar hija adoptiva', description: 'Clic para agregar un nuevo nodo de rol hija adoptiva', time: '' }}>
                <ChevronsLeftRightEllipsisIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <div className='border-r-2 text-white border-gray-300 gap-0 my-0'>-</div>
            <ControlButton className='all-items'
              onClick={() => {
                addChild(Rol.DAUGHTER, RelationTypeMember.HIJO_LEGITIMO_GEMELO);
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar hijos gemelos', description: 'Clic para agregar nuevos nodos de hijos gemelos', time: '' }}>
                <GroupIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                addChild(Rol.SON, RelationTypeMember.HIJO_LEGITIMO, true);
                addChild(Rol.SON, RelationTypeMember.HIJO_LEGITIMO, true);

              }}>
              <HoverCardContentDiv data={{ title: 'Agregar hijo en gestación', description: 'Clic para agregar un nuevo nodo de tipo hijo en gestación', time: '' }}>
                <TriangleIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                addChild(Rol.SON, RelationTypeMember.HIJO_LEGITIMO, false, false, true);
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar aborto espontáneo', description: 'Clic para agregar un nuevo nodo de tipo aborto espontáneo', time: '' }}>
                <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-white"></div>
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                addChild(Rol.SON, RelationTypeMember.HIJO_LEGITIMO, false, true, false);
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar aborto provocado', description: 'Clic para agregar un nuevo nodo de tipo aborto provocado', time: '' }}>
                <XIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                const idChild = generateUniqueId();
                setInitX(initX + 100);
                setMember({
                  ...nodeMemberDefault,
                  id: idChild,
                  position: { x: initX - 30, y: initY + 450 },
                  data: {
                    ...nodeMemberDefault.data,
                    id: idChild,
                    rol: Rol.SON,
                    gender: Gender.MALE,
                    age: 14,
                    positionSource: Position.Bottom,
                    positionTarget: Position.Bottom,
                    inGestation: false,
                    abortion: false,
                    miscarriage: false,
                    avatar: '06.jpg'
                  },
                  draggable: true,
                  selectable: true
                });
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar nuevo individuo', description: 'Clic para agregar un nuevo individuo', time: '' }}>
                <LucideWorkflow className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
            <ControlButton className='all-items'
              onClick={() => {
                const idChild = generateUniqueId();
                setInitX(initX + 100);
                setMember({ ...nodeMemberConnector, id: idChild, position: { x: initX + 36, y: initY + 280 }, data: { ...nodeMemberConnector.data, id: idChild, rol: Rol.OTHER, gender: Gender.OTHER, age: 0, positionSource: Position.Bottom } });
              }}>
              <HoverCardContentDiv data={{ title: 'Agregar nuevo conector', description: 'Clic para agregar un nuevo conector de individuos', time: '' }}>
                <LocateIcon className='text-gray-600 min-w-6 min-h-6' />
              </HoverCardContentDiv>
            </ControlButton>
          </Controls>
          <Controls showZoom={true} showInteractive={false} className='mr-8' position={'bottom-left'} orientation='horizontal'  >
            <ControlButton className='all-items' title='Activar la barra de acciones para todos los nodos'
              onClick={() => {
                setToolbarVisible(!toolbarVisible);
                forceToolbarVisible(!toolbarVisible);
              }}>
              {!toolbarVisible && <ListChecksIcon className='text-gray-600 min-w-6 min-h-6' />}
              {toolbarVisible && <ListCollapseIcon className='text-gray-600 min-w-6 min-h-6' />}
            </ControlButton>
            <ControlButton className='all-items' title='Activar grilla'
              onClick={() => {
                setWithGrid(!withGrid);
              }}>
              {!withGrid && <Grid2x2CheckIcon className='text-gray-600 min-w-6 min-h-6' />}
              {withGrid && <Grid2x2XIcon className='text-gray-600 min-w-6 min-h-6' />}
            </ControlButton>
          </Controls>
          <Panel className=' relative w-full justify-center max-w-full z-50'>
            <h3 className='text-[1.8em] text-center mt-[2vh]'>{labelFamily}</h3>
            <div className="flex items-center justify-end rounded-md px-4 py-0 mr-8" style={{ marginTop: '-40px' }}>
              <CurrentDateTime />
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </>
  );
};

export default App;