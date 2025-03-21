import { NodeMember } from '@/models/NodeMember.model';
import { Gen, Gender, Rol } from '@/utils/enum';
import { Edge, Position } from '@xyflow/react';
type CustomNode = Node;

//INFO: Roles 
export const initNodes: CustomNode[] = [];

//INFO: Relaciones entre los roles 
interface CustomEdge extends Edge {
    source: string;
    target: string;
    sourceHandleId?: string;
    targetHandleId?: string;
}

export const initEdges: CustomEdge[] = [];

//#region TEMPLATES 

const initNodesTemplateI: NodeMember[] = [
    {
        "id": "parent-1",
        "type": "custom",
        "data": {
            "id": "parent-1",
            "name": "...",
            "rol": Rol.FATHER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -410,
            "y": 150
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 100
        },
        "selected": false
    },
    {
        "id": "parent-2",
        "type": "custom",
        "data": {
            "id": "parent-2",
            "name": "...",
            "rol": Rol.MOTHER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.FEMALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": 40,
            "y": 150
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false
    },
    {
        "id": "1738268200862-27",
        "type": "custom",
        "data": {
            "id": "1738268200862-27",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Top,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -390,
            "y": 405
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 88,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268200862-49",
        "type": "custom",
        "data": {
            "id": "1738268200862-27",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Right,
            "gender": Gender.MALE,
            "age": 0,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": -124,
            "y": 280
        },
        "draggable": true,
        "selectable": true,
        "measured": {
            "width": 8,
            "height": 8
        },
        "selected": false
    },
    {
        "id": "1738268226902-74",
        "type": "custom",
        "data": {
            "id": "1738268226902-74",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.FEMALE,
            "age": 14,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -15,
            "y": 405
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false,
        "dragging": false
    }
];

export const initEdgesTemplateI: CustomEdge[] = [
    {
        "id": "child-1738268200862-27-1738268200862-49",
        "source": "1738268200862-27",
        "target": "1738268200862-49",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1
    },
    {
        "id": "parent-1-1738268200862-27-1738268200862-49",
        "source": "parent-1",
        "target": "1738268200862-49",
        "animated": false,
        "type": "step",
        "selected": false,
        "interactionWidth": 1
    },
    {
        "id": "parent-2-1738268200862-27-1738268200862-49",
        "source": "1738268200862-49",
        "target": "parent-2",
        "animated": false,
        "type": "step",
        "selected": false,
        "interactionWidth": 1
    },
    {
        "source": "1738268263956-3",
        "sourceHandle": "targetBottom",
        "target": "1738268226902-74",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268263956-3targetBottom-1738268226902-74targetBottom"
    },
    {
        "source": "1738268263956-3",
        "target": "1738268200862-27",
        "targetHandle": "targetBottom",
        "type": "step",
        "selected": false,
        "id": "xy-edge__1738268263956-3sourceLeft-1738268200862-27targetBottom",
        "sourceHandle": "sourceLeft"
    },
    {
        "source": "1738268263956-3",
        "sourceHandle": "sourceRight",
        "target": "1738268226902-74",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268263956-3sourceRight-1738268226902-74targetBottom"
    },
    {
        "source": "1738268293820-47",
        "target": "1738268263956-3",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1,
        "sourceHandle": null,
        "targetHandle": "targetRight",
        "id": "xy-edge__1738268293820-47-1738268263956-3targetRight"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetBottom",
        "target": "1738268200862-49",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetBottom-1738268200862-49targetBottom"
    },
    {
        "source": "1738268344835-98",
        "target": "1738268360848-6",
        "targetHandle": "targetLeft",
        "type": "step",
        "selected": false,
        "id": "xy-edge__1738268344835-98-1738268360848-6targetLeft",
        "sourceHandle": null
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetBottom",
        "target": "1738268360848-6",
        "targetHandle": "targetTop",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetBottom-1738268360848-6targetTop"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetRight",
        "target": "1738268293820-47",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetRight-1738268293820-47targetBottom"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetBottom",
        "target": "1738268293820-47",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetBottom-1738268293820-47targetBottom"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "sourceRight",
        "target": "1738268293820-47",
        "targetHandle": "targetBottom",
        "type": "step",
        "selected": false,
        "id": "xy-edge__1738268360848-6sourceRight-1738268293820-47targetBottom"
    },
    {
        "source": "1738268531817-71",
        "target": "1738268360848-6",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1,
        "sourceHandle": null,
        "targetHandle": "targetLeft",
        "id": "xy-edge__1738268531817-71-1738268360848-6targetLeft"
    },
    {
        "source": "1738268531816-72",
        "target": "1738268263956-3",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1,
        "id": "xy-edge__1738268531816-72-1738268263956-3targetLeft",
        "sourceHandle": null,
        "targetHandle": "targetLeft"
    },
    {
        "id": "child-1738268580998-78-1738268580998-89",
        "source": "1738268580998-78",
        "target": "1738268200862-49",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1
    }
];

export const initNodesTemplateII: NodeMember[] = [
    {
        "id": "parent-1",
        "type": "custom",
        "data": {
            "id": "parent-1",
            "name": "...",
            "rol": Rol.FATHER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -410,
            "y": 150
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 100
        },
        "selected": false
    },
    {
        "id": "parent-2",
        "type": "custom",
        "data": {
            "id": "parent-2",
            "name": "...",
            "rol": Rol.MOTHER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.FEMALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": 40,
            "y": 150
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false
    },
    {
        "id": "1738268200862-27",
        "type": "custom",
        "data": {
            "id": "1738268200862-27",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Top,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -390,
            "y": 405
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 88,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268200862-49",
        "type": "custom",
        "data": {
            "id": "1738268200862-27",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Right,
            "gender": Gender.MALE,
            "age": 0,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": -124,
            "y": 280
        },
        "draggable": true,
        "selectable": true,
        "measured": {
            "width": 8,
            "height": 8
        },
        "selected": false
    },
    {
        "id": "1738268226902-74",
        "type": "custom",
        "data": {
            "id": "1738268226902-74",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.FEMALE,
            "age": 14,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -15,
            "y": 405
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268263956-3",
        "type": "custom",
        "data": {
            "id": "1738268263956-3",
            "name": "...",
            "rol": Rol.OTHER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Right,
            "gender": Gender.OTHER,
            "age": 0,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": -150,
            "y": 615
        },
        "draggable": true,
        "selectable": true,
        "measured": {
            "width": 8,
            "height": 8
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268293820-47",
        "type": "custom",
        "data": {
            "id": "1738268293820-47",
            "name": "...",
            "rol": Rol.DAUGHTER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Top,
            "positionTarget": Position.Bottom,
            "gender": Gender.FEMALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": -75,
            "y": 780
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268531816-72",
        "type": "custom",
        "data": {
            "id": "1738268531816-72",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Top,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": true,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -240,
            "y": 780
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
];

export const initEdgesTemplateII: CustomEdge[] = [
    {
        "id": "child-1738268200862-27-1738268200862-49",
        "source": "1738268200862-27",
        "target": "1738268200862-49",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1
    },
    {
        "id": "parent-1-1738268200862-27-1738268200862-49",
        "source": "parent-1",
        "target": "1738268200862-49",
        "animated": false,
        "type": "step",
        "selected": false,
        "interactionWidth": 1
    },
    {
        "id": "parent-2-1738268200862-27-1738268200862-49",
        "source": "1738268200862-49",
        "target": "parent-2",
        "animated": false,
        "type": "step",
        "selected": false,
        "interactionWidth": 1
    },
    {
        "source": "1738268263956-3",
        "sourceHandle": "targetBottom",
        "target": "1738268226902-74",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268263956-3targetBottom-1738268226902-74targetBottom"
    },
    {
        "source": "1738268263956-3",
        "target": "1738268200862-27",
        "targetHandle": "targetBottom",
        "type": "step",
        "selected": false,
        "id": "xy-edge__1738268263956-3sourceLeft-1738268200862-27targetBottom",
        "sourceHandle": "sourceLeft"
    },
    {
        "source": "1738268263956-3",
        "sourceHandle": "sourceRight",
        "target": "1738268226902-74",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268263956-3sourceRight-1738268226902-74targetBottom"
    },
    {
        "source": "1738268293820-47",
        "target": "1738268263956-3",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1,
        "sourceHandle": null,
        "targetHandle": "targetRight",
        "id": "xy-edge__1738268293820-47-1738268263956-3targetRight"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetBottom",
        "target": "1738268200862-49",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetBottom-1738268200862-49targetBottom"
    },
    {
        "source": "1738268344835-98",
        "target": "1738268360848-6",
        "targetHandle": "targetLeft",
        "type": "step",
        "selected": false,
        "id": "xy-edge__1738268344835-98-1738268360848-6targetLeft",
        "sourceHandle": null
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetBottom",
        "target": "1738268360848-6",
        "targetHandle": "targetTop",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetBottom-1738268360848-6targetTop"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetRight",
        "target": "1738268293820-47",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetRight-1738268293820-47targetBottom"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetBottom",
        "target": "1738268293820-47",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetBottom-1738268293820-47targetBottom"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "sourceRight",
        "target": "1738268293820-47",
        "targetHandle": "targetBottom",
        "type": "step",
        "selected": false,
        "id": "xy-edge__1738268360848-6sourceRight-1738268293820-47targetBottom"
    },
    {
        "source": "1738268531817-71",
        "target": "1738268360848-6",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1,
        "sourceHandle": null,
        "targetHandle": "targetLeft",
        "id": "xy-edge__1738268531817-71-1738268360848-6targetLeft"
    },
    {
        "source": "1738268531816-72",
        "target": "1738268263956-3",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1,
        "id": "xy-edge__1738268531816-72-1738268263956-3targetLeft",
        "sourceHandle": null,
        "targetHandle": "targetLeft"
    },
    {
        "id": "child-1738268580998-78-1738268580998-89",
        "source": "1738268580998-78",
        "target": "1738268200862-49",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1
    }
];

export const initNodesTemplateIII: NodeMember[] = [
    {
        "id": "parent-1",
        "type": "custom",
        "data": {
            "id": "parent-1",
            "name": "...",
            "rol": Rol.FATHER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": true,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -410,
            "y": 150
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 100
        },
        "selected": false
    },
    {
        "id": "parent-2",
        "type": "custom",
        "data": {
            "id": "parent-2",
            "name": "...",
            "rol": Rol.MOTHER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.FEMALE,
            "age": 14,
            "dead": true,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": 40,
            "y": 150
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false
    },
    {
        "id": "1738268200862-27",
        "type": "custom",
        "data": {
            "id": "1738268200862-27",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Top,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -390,
            "y": 405
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 88,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268200862-49",
        "type": "custom",
        "data": {
            "id": "1738268200862-27",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Right,
            "gender": Gender.MALE,
            "age": 0,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": -124,
            "y": 280
        },
        "draggable": true,
        "selectable": true,
        "measured": {
            "width": 8,
            "height": 8
        },
        "selected": false
    },
    {
        "id": "1738268226902-74",
        "type": "custom",
        "data": {
            "id": "1738268226902-74",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.FEMALE,
            "age": 14,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -15,
            "y": 405
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268263956-3",
        "type": "custom",
        "data": {
            "id": "1738268263956-3",
            "name": "...",
            "rol": Rol.OTHER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Right,
            "gender": Gender.OTHER,
            "age": 0,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": -150,
            "y": 615
        },
        "draggable": true,
        "selectable": true,
        "measured": {
            "width": 8,
            "height": 8
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268293820-47",
        "type": "custom",
        "data": {
            "id": "1738268293820-47",
            "name": "...",
            "rol": Rol.DAUGHTER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Top,
            "positionTarget": Position.Bottom,
            "gender": Gender.FEMALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": -75,
            "y": 780
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268344835-98",
        "type": "custom",
        "data": {
            "id": "1738268344835-98",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": true,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -390,
            "y": 780
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 100
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268360848-6",
        "type": "custom",
        "data": {
            "id": "1738268360848-6",
            "name": "...",
            "rol": Rol.OTHER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Bottom,
            "positionTarget": Position.Right,
            "gender": Gender.OTHER,
            "age": 0,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": false,
            "miscarriage": false,
            "abortion": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": -165,
            "y": 975
        },
        "draggable": true,
        "selectable": true,
        "measured": {
            "width": 8,
            "height": 8
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268531816-72",
        "type": "custom",
        "data": {
            "id": "1738268531816-72",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Top,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": true,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -240,
            "y": 780
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268531817-71",
        "type": "custom",
        "data": {
            "id": "1738268531817-71",
            "name": "...",
            "rol": Rol.SON,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Top,
            "positionTarget": Position.Bottom,
            "gender": Gender.MALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "inGestation": true,
            "avatar": "06.jpg"
        },
        "position": {
            "x": -345,
            "y": 1140
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false,
        "dragging": false
    },
    {
        "id": "1738268580998-78",
        "type": "custom",
        "data": {
            "id": "1738268580998-78",
            "name": "...",
            "rol": Rol.DAUGHTER,
            "icon": {
                "type": {},
                "key": null,
                "ref": null,
                "props": {
                    "className": "h-10 w-10"
                },
                "_owner": null,
                "_store": {}
            },
            "positionSource": Position.Top,
            "positionTarget": Position.Bottom,
            "gender": Gender.FEMALE,
            "age": 14,
            "dead": false,
            "gen": Gen.I,
            "indice": false,
            "avatar": "09.jpg"
        },
        "position": {
            "x": -210,
            "y": 405
        },
        "draggable": true,
        "selectable": true,
        "submenuItems": [
            {
                "label": "Opción 1"
            },
            {
                "label": "Opción 2"
            }
        ],
        "measured": {
            "width": 80,
            "height": 108
        },
        "selected": false,
        "dragging": false
    }
];

export const initEdgesTemplateIII: CustomEdge[] = [
    {
        "id": "child-1738268200862-27-1738268200862-49",
        "source": "1738268200862-27",
        "target": "1738268200862-49",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1
    },
    {
        "id": "parent-1-1738268200862-27-1738268200862-49",
        "source": "parent-1",
        "target": "1738268200862-49",
        "animated": false,
        "type": "step",
        "selected": false,
        "interactionWidth": 1
    },
    {
        "id": "parent-2-1738268200862-27-1738268200862-49",
        "source": "1738268200862-49",
        "target": "parent-2",
        "animated": false,
        "type": "step",
        "selected": false,
        "interactionWidth": 1
    },
    {
        "source": "1738268263956-3",
        "sourceHandle": "targetBottom",
        "target": "1738268226902-74",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268263956-3targetBottom-1738268226902-74targetBottom"
    },
    {
        "source": "1738268263956-3",
        "target": "1738268200862-27",
        "targetHandle": "targetBottom",
        "type": "step",
        "selected": false,
        "id": "xy-edge__1738268263956-3sourceLeft-1738268200862-27targetBottom",
        "sourceHandle": "sourceLeft"
    },
    {
        "source": "1738268263956-3",
        "sourceHandle": "sourceRight",
        "target": "1738268226902-74",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268263956-3sourceRight-1738268226902-74targetBottom"
    },
    {
        "source": "1738268293820-47",
        "target": "1738268263956-3",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1,
        "sourceHandle": null,
        "targetHandle": "targetRight",
        "id": "xy-edge__1738268293820-47-1738268263956-3targetRight"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetBottom",
        "target": "1738268200862-49",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetBottom-1738268200862-49targetBottom"
    },
    {
        "source": "1738268344835-98",
        "target": "1738268360848-6",
        "targetHandle": "targetLeft",
        "type": "step",
        "selected": false,
        "id": "xy-edge__1738268344835-98-1738268360848-6targetLeft",
        "sourceHandle": null
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetBottom",
        "target": "1738268360848-6",
        "targetHandle": "targetTop",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetBottom-1738268360848-6targetTop"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetRight",
        "target": "1738268293820-47",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetRight-1738268293820-47targetBottom"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "targetBottom",
        "target": "1738268293820-47",
        "targetHandle": "targetBottom",
        "type": "step",
        "id": "xy-edge__1738268360848-6targetBottom-1738268293820-47targetBottom"
    },
    {
        "source": "1738268360848-6",
        "sourceHandle": "sourceRight",
        "target": "1738268293820-47",
        "targetHandle": "targetBottom",
        "type": "step",
        "selected": false,
        "id": "xy-edge__1738268360848-6sourceRight-1738268293820-47targetBottom"
    },
    {
        "source": "1738268531817-71",
        "target": "1738268360848-6",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1,
        "sourceHandle": null,
        "targetHandle": "targetLeft",
        "id": "xy-edge__1738268531817-71-1738268360848-6targetLeft"
    },
    {
        "source": "1738268531816-72",
        "target": "1738268263956-3",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1,
        "id": "xy-edge__1738268531816-72-1738268263956-3targetLeft",
        "sourceHandle": null,
        "targetHandle": "targetLeft"
    },
    {
        "id": "child-1738268580998-78-1738268580998-89",
        "source": "1738268580998-78",
        "target": "1738268200862-49",
        "animated": false,
        "type": "buttonedge",
        "selected": false,
        "interactionWidth": 1
    }
];

//#endregion

export default initNodesTemplateI;