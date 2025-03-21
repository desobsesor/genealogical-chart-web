import React, { createContext, useContext, useState, useMemo } from "react";

type HelperContextType = {
    addCouple: any;
    setAddCouple: (value: any) => void;
    addMember: any;
    setAddMember: (value: any) => void;
    labelFamily: string;
    setLabelFamily: (value: any) => void;
    childs: any;
    setChilds: (value: any) => void;
    currentChild: any;
    setCurrentChild: (value: any) => void;
    events: any;
    setEvents: (value: any) => void;
    currentEvent: any;
    setCurrentEvent: (value: any) => void;
    pathologicalDiseases: any;
    setPathologicalDiseases: (value: any) => void;
    currentPathologicalDiseases: any;
    setCurrentPathologicalDiseases: (value: any) => void;
    showModalCouple: any;
    setShowModalCouple: (value: any) => void;
    showModalMember: any;
    setShowModalMember: (value: any) => void;
    showPopoverMember: boolean;
    setShowPopoverMember: (value: boolean) => void;
    showPopoverEvent: boolean;
    setShowPopoverEvent: (value: boolean) => void;
    showPopoverPathologicalDiseases: boolean;
    setShowPopoverPathologicalDiseases: (value: boolean) => void;
    isSaving: boolean;
    setIsSaving: (value: boolean) => void;
    showModalRelationCouple: boolean;
    setShowModalRelationCouple: (value: boolean) => void;
};

const HelperContext = createContext<HelperContextType | undefined>(undefined);

export const HelperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [addCouple, setAddCouple] = useState<any | null>(null);
    const [addMember, setAddMember] = useState<any | null>(null);
    const [labelFamily, setLabelFamily] = useState<string>('Familia');
    const [childs, setChilds] = useState<any | null>(null);
    const [events, setEvents] = useState<any | null>(null);
    const [pathologicalDiseases, setPathologicalDiseases] = useState<any | null>(null);
    const [currentChild, setCurrentChild] = useState<any | null>(null);
    const [currentEvent, setCurrentEvent] = useState<any | null>(null);
    const [currentPathologicalDiseases, setCurrentPathologicalDiseases] = useState<any | null>(null);

    const [showModalRelationCouple, setShowModalRelationCouple] = useState<boolean>(false);
    const [showModalCouple, setShowModalCouple] = useState<boolean>(false);
    const [showModalMember, setShowModalMember] = useState<boolean>(false);
    const [showPopoverMember, setShowPopoverMember] = useState<boolean>(false);
    const [showPopoverEvent, setShowPopoverEvent] = useState<boolean>(false);
    const [showPopoverPathologicalDiseases, setShowPopoverPathologicalDiseases] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState(false);

    const contextValue = useMemo(() => ({
        addCouple,
        setAddCouple,
        addMember,
        setAddMember,
        labelFamily,
        setLabelFamily,
        childs,
        setChilds,
        currentChild,
        setCurrentChild,
        events,
        setEvents,
        currentEvent,
        setCurrentEvent,
        pathologicalDiseases,
        setPathologicalDiseases,
        currentPathologicalDiseases,
        setCurrentPathologicalDiseases,
        showModalCouple,
        setShowModalCouple,
        showModalMember,
        setShowModalMember,
        showPopoverMember,
        showPopoverEvent,
        showPopoverPathologicalDiseases,
        setShowPopoverMember,
        setShowPopoverEvent,
        setShowPopoverPathologicalDiseases,
        isSaving,
        setIsSaving,
        showModalRelationCouple,
        setShowModalRelationCouple
    }), [
        addCouple,
        addMember,
        labelFamily,
        childs,
        currentChild,
        events,
        currentEvent,
        pathologicalDiseases,
        currentPathologicalDiseases,
        showModalCouple,
        showModalMember,
        showPopoverMember,
        showPopoverEvent,
        showPopoverPathologicalDiseases,
        isSaving,
        showModalRelationCouple
    ]);

    return (
        <HelperContext.Provider value={contextValue}>
            {children}
        </HelperContext.Provider>
    );
};

export const useHelper = () => {
    const context = useContext(HelperContext);
    if (!context) {
        throw new Error("useHelper debe usarse dentro de un HelperProvider");
    }
    return context;
};