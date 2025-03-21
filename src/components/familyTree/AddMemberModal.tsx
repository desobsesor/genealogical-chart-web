import { Position } from '@xyflow/react';
import { ArrowLeftCircleIcon, PlusCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Member } from '../../models/Member.model';
import { useHelper } from '../../services/context/HelperContext';
import { Gen, Gender, RelationTypeMember, Rol } from '../../utils/enum';
import ToggleSwitch from '../layout/ToggleSwitch';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (message: string, type: string | 'improvement' | 'support') => void;
}

const AddMemberModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
    const { setAddMember, currentChild } = useHelper();
    const [inGestation, setInGestation] = useState(false);
    const [miscarriage, setMiscarriage] = useState(false);
    const [abortion, setAbortion] = useState(false);
    const [pointSourceLeftTargetRight, setPointSourceLeftTargetRight] = useState<Member>({
        id: '3',
        name: 'Hijo Legitimo',
        rol: Rol.OTHER,
        icon: null,
        positionSource: Position.Top,
        positionTarget: Position.Top,
        gender: Gender.OTHER,
        age: 0,
        dead: false,
        gen: Gen.I,
        indice: false,
        inGestation: false,
        miscarriage: false,
        abortion: false,
        pathologicalDiseases: [],
        events: [],
        occupation: '',
    });
    const [child, setChild] = useState<Member>({
        id: '4',
        name: '...',
        rol: Rol.FATHER,
        icon: null,
        positionSource: Position.Bottom,
        positionTarget: Position.Bottom,
        gender: Gender.MALE,
        age: 42,
        dead: false,
        gen: Gen.I,
        indice: false,
        inGestation: false,
        miscarriage: false,
        abortion: false,
        pathologicalDiseases: [],
        events: [],
        occupation: '',
    });
    const [relationship, setRelationship] = useState<string>(RelationTypeMember.HIJO_LEGITIMO);

    const handleRelationshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRelationship(e.target.value);
    };

    useEffect(() => {
        if (currentChild) {
            setChild(currentChild);
        }
    }, [currentChild]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, isFather: boolean) => {
        const { name, value } = e.target;
        const updateMember = setChild;
        updateMember((prev) => ({ ...prev, [name.split('_')[1]]: name.split('_')[1] === 'age' ? value.replace(/\D/g, '') : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //console.log({ child });
        //console.log({ relationship });
        //console.log({ pointSourceLeftTargetRight });

        setAddMember({ child, relationship, pointSourceLeftTargetRight });
        onClose();
    };

    function handleChangeIsInternal(value: boolean): void {
        setChild((prev) => ({ ...prev, indice: value }));
    }


    function setInGestation_(): void {
        setMiscarriage(false);
        setAbortion(false);
        setInGestation(!inGestation);
        const updateMember = setChild;
        updateMember((prev) => ({ ...prev, inGestation: !inGestation, miscarriage: false, abortion: false, }));
    }

    function setMiscarriage_(): void {
        setAbortion(false);
        setMiscarriage(!miscarriage);
        setInGestation(false);
        const updateMember = setChild;
        updateMember((prev) => ({ ...prev, miscarriage: !miscarriage, abortion: false, inGestation: false }));
    }

    function setAbortion_(): void {
        setMiscarriage(false);
        setAbortion(!abortion);
        setInGestation(false);
        const updateMember = setChild;
        updateMember((prev) => ({ ...prev, abortion: !abortion, miscarriage: false, inGestation: false }));
    }

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${isOpen ? 'bg-opacity-75' : 'opacity-0'}`}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }} >
            <div className="loading-container">
                <div
                    className="bg-white rounded-lg shadow-lg p-2 max-w-96"
                    onClick={(e) => e.stopPropagation()} >
                    <form onSubmit={handleSubmit} className="flex flex-row gap-y-1 h-full text-xs">
                        <div className="flex flex-col bg-white p-2 w-full">
                            <h2 className="text-xl font-bold mb-4 text-blue-600">Datos de la persona</h2>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <label className="pb-4 font-semibold items-center">Nombre:</label>
                                <input
                                    type="text"
                                    name="child_name"
                                    id="child_name"
                                    value={child.name}
                                    onChange={(e) => handleInputChange(e, true)}
                                    onFocus={(e) => e.target.select()}
                                    className="p-2 border rounded mb-4 col-span-4 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-5 items-center gap-4">
                                <label className="pb-4 font-semibold items-center">Genero:</label>
                                <div className="flex gap-4 mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="child_gender"
                                            value={Gender.MALE}
                                            checked={child.gender === Gender.MALE}
                                            onChange={(e) => handleInputChange(e, true)}
                                            className="mr-2"
                                        />
                                        Masculino
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="child_gender"
                                            value={Gender.FEMALE}
                                            checked={child.gender === Gender.FEMALE}
                                            onChange={(e) => handleInputChange(e, true)}
                                            className="mr-2"
                                        />
                                        Femenino
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="child_gender"
                                            value={Gender.OTHER}
                                            checked={child.gender === Gender.OTHER}
                                            onChange={(e) => handleInputChange(e, true)}
                                            className="mr-2"
                                        />
                                        Otro
                                    </label>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <div className="grid col-span-1 grid-cols-3 items-center gap-4">
                                    <label className="pb-4 font-semibold items-center">Edad:</label>
                                    <input
                                        name="child_age"
                                        id="child_age"
                                        value={child.age}
                                        onChange={(e) => handleInputChange(e, true)}
                                        onFocus={(e) => e.target.select()}
                                        className="p-2 text-center border rounded col-span-2 mb-4"
                                    />
                                </div>
                                <div className="grid col-span-1 grid-cols-3 items-center gap-4">
                                    <label className="pb-4 font-semibold items-center">Estado:</label>
                                    <select
                                        name="child_dead"
                                        id='child_dead'
                                        value={child.dead ? 'true' : 'false'}
                                        onChange={(e) => handleInputChange(e, true)}
                                        className="p-2 border rounded col-span-2 mb-4"
                                    >
                                        <option value="false">Vivo</option>
                                        <option value="true">Fallecido</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid col-span-1 grid-cols-3 items-center gap-4">
                                <h3 className="pb-0 font-semibold items-center">Relación:</h3>
                                <select
                                    value={relationship}
                                    onChange={handleRelationshipChange}
                                    className="p-2 border rounded col-span-2 w-full"
                                >
                                    <option value="HijoLegitimo">Legitimo</option>
                                    <option value="HijoAdoptivo">Adoptivo</option>
                                    {/*<option value="HijoLegitimoGemelo">Legitimo gemelo</option>*/}
                                </select>
                            </div>
                            <div className="grid col-span-1 grid-cols-3 items-center gap-4">
                                <h2 className="pb-1 font-semibold items-center">En gestación:</h2>
                                <div data-tour="step-4" className="col-span-2 ml-2">
                                    <ToggleSwitch className='mt-3 mb-2' initialValue={inGestation} label={''} handleChange={setInGestation_} />
                                </div>
                            </div>
                            <div className="grid col-span-1 grid-cols-6 items-center gap-4">
                                <h2 className="font-semibold col-span-1 items-center">Aborto:</h2>
                                <div data-tour="step-4" className="col-span-5 ml-2 grid grid-cols-2">
                                    <ToggleSwitch className='mt-3 mb-2 col-span-1' initialValue={miscarriage} label={'Exp.'} handleChange={setMiscarriage_} />
                                    <ToggleSwitch className='mt-3 mb-2 col-span-1' initialValue={abortion} label={'Prov.'} handleChange={setAbortion_} />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <label className="pb-2 font-semibold items-center">Ocupación:</label>
                                <input
                                    type="text"
                                    name="child_occupation"
                                    id="child_occupation"
                                    value={child.occupation}
                                    onChange={(e) => handleInputChange(e, true)}
                                    onFocus={(e) => e.target.select()}
                                    className="p-2 border col-span-2 rounded"
                                />
                            </div>
                        </div>
                    </form>
                    <div className="mt-0 flex justify-end">
                        <div className="relative mt-8 ml-2 pl-0">
                            <div className="absolute inset-y-0 start-0 flex mt-0 items-center ps-3.5 pointer-events-none mr-6">
                                <ArrowLeftCircleIcon style={{ float: 'left' }} name="success" className="h-6 w-8 text-white-500" color="#FFFFFF" />
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className={`bg-gray-500 hover:bg-gray-600 rounded-md px-3 py-2 pl-12 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className="relative mt-8 ml-2 pl-0">
                            <div className="absolute inset-y-0 start-0 flex mt-0 items-center ps-3.5 pointer-events-none mr-6">
                                <PlusCircleIcon style={{ float: 'left' }} name="success" className="h-6 w-8 text-white-500" color="#FFFFFF" />
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={`bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-2 pl-12 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;