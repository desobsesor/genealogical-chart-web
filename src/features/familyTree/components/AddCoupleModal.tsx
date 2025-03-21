import { Position } from '@xyflow/react';
import { ArrowLeftCircleIcon, PlusCircleIcon } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react';
import { Member } from '../../../models/Member.model';
import { useHelper } from '../../../services/context/HelperContext';
import { Gen, Gender, RelationTypeCouple, RelationTypeMember, Rol } from '../../../utils/enum';
import { getFirstLastNames } from '../../../utils/string';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (message: string, type: string | 'improvement' | 'support') => void;
}

const AddCoupleModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
    const { setAddCouple, setLabelFamily, childs, setChilds } = useHelper();
    const [relationship, setRelationship] = useState<string>(RelationTypeCouple.MATRIMONIO);
    const [numberChilds, setNumberChilds] = useState<number>(2);
    const [pointSourceLeftTargetRight] = useState<Member>({
        id: '1',
        name: 'Matrimonio',
        rol: Rol.OTHER,
        icon: null,
        positionSource: Position.Right,
        positionTarget: Position.Left,
        gender: Gender.OTHER,
        age: 0,
        dead: false,
        gen: Gen.I,
        indice: false,
        inGestation: false,
        miscarriage: false,
        abortion: false,
        avatar: '06.jpg',
        pathologicalDiseases: [],
        events: [],
        occupation: '',
    });

    const [father, setFather] = useState<Member>({
        id: '2',
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
        avatar: '06.jpg',
        pathologicalDiseases: [],
        events: [],
        occupation: 'Padre de familia',
    });

    const [mother, setMother] = useState<Member>({
        id: '3',
        name: '...',
        rol: Rol.MOTHER,
        icon: null,
        positionSource: Position.Bottom,
        positionTarget: Position.Bottom,
        gender: Gender.FEMALE,
        age: 37,
        dead: false,
        gen: Gen.I,
        indice: false,
        inGestation: false,
        miscarriage: false,
        abortion: false,
        avatar: '06.jpg',
        pathologicalDiseases: [],
        events: [],
        occupation: 'Ama de casa',
    });

    useEffect(() => {
        setLabelFamily('Familia ' + getFirstLastNames(father?.name || '* *', mother?.name || '* *'))
    }, [father, mother]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, isFather: boolean) => {
        const { name, value } = e.target;
        const updateMember = isFather ? setFather : setMother;
        updateMember((prev) => ({ ...prev, [name.split('_')[1]]: name.split('_')[1] === 'age' ? value.replace(/\D/g, '') : value }));
    };

    const handleRelationshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRelationship(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setChilds_(numberChilds);
        setAddCouple({ father, mother, relationship, childs, pointSourceLeftTargetRight });
        onClose();
    };

    const setChilds_ = (numberChilds: number) => {
        const newPointChilds: any[] = Array.from({ length: numberChilds }, (_, index) => ({
            name: RelationTypeMember.OTHER,
            rol: Rol.OTHER,
            icon: null,
            positionSource: Position.Top,
            positionTarget: Position.Bottom,
            gender: Gender.OTHER,
            age: 0,
            dead: false,
            gen: Gen.II,
            indice: false,
            pathologicalDiseases: [],
            events: [],
            occupation: '',
        }));

        const newChilds: any[] = Array.from({ length: numberChilds }, (_, index) => ({
            name: `Hijo ${index + 1}`,
            rol: Rol.SON,
            icon: null,
            positionSource: Position.Top,
            positionTarget: Position.Top,
            gender: Gender.MALE,
            age: 12,
            dead: false,
            gen: Gen.II,
            indice: false,
            inGestation: false,
            avatar: '06.jpg',
            pathologicalDiseases: [],
            events: [],
            occupation: '',
        }));

        setChilds([...newPointChilds, ...newChilds]);
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-40 transition-opacity ${isOpen ? 'bg-opacity-75' : 'opacity-0'}`}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }} >
            <div className="loading-container">
                <div
                    className="bg-white rounded-lg shadow-lg p-2 max-w-xl"
                    onClick={(e) => e.stopPropagation()} >
                    <form onSubmit={handleSubmit} className="flex flex-row h-full text-xs">
                        {/* Left Panel (Father) */}
                        <div className="flex flex-col bg-white p-4 w-1/2 border-e-2">
                            <h2 className="text-xl font-bold mb-4 text-blue-600">Datos del padre</h2>
                            <label className="mb-2 font-medium">Nombre:</label>
                            <input
                                type="text"
                                name="father_name"
                                id="father_name"
                                value={father.name}
                                onChange={(e) => handleInputChange(e, true)}
                                onFocus={(e) => e.target.select()}
                                placeholder='Julano de tal'
                                className="p-2 border rounded mb-4"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className='col-span-1'>
                                    <label className="mb-2 font-medium">Edad:</label>
                                    <input
                                        name="father_age"
                                        id="father_age"
                                        value={father.age}
                                        onChange={(e) => handleInputChange(e, true)}
                                        onFocus={(e) => e.target.select()}
                                        className="p-2 border rounded mb-4 w-24"
                                        size={3}
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <label className="mb-2 font-medium">Estado actual:</label>
                                    <select
                                        name="father_dead"
                                        id='father_dead'
                                        value={father.dead === true ? 'true' : 'false'}
                                        onChange={(e) => handleInputChange(e, true)}
                                        className="p-2 border rounded mb-4"
                                    >
                                        <option value="false">Vivo</option>
                                        <option value="true">Fallecido</option>
                                    </select>
                                </div>
                            </div>

                            <label className="mb-2 font-medium">Ocupación:</label>
                            <input
                                type="text"
                                name="father_occupation"
                                id="father_occupation"
                                value={father.occupation}
                                onChange={(e) => handleInputChange(e, true)}
                                onFocus={(e) => e.target.select()}
                                className="p-2 border rounded mb-4"
                            />
                        </div>

                        {/* Right Panel (Mother) */}
                        <div className="flex flex-col bg-white p-4 w-1/2">
                            <h2 className="text-xl font-bold mb-4 text-pink-600">Datos de la madre</h2>
                            <label className="mb-2 font-medium">Nombre:</label>
                            <input
                                type="text"
                                name="mother_name"
                                id="mother_name"
                                value={mother.name}
                                onChange={(e) => handleInputChange(e, false)}
                                onFocus={(e) => e.target.select()}
                                className="p-2 border rounded mb-4"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className='col-span-1'>
                                    <label className="mb-2 font-medium">Edad:</label>
                                    <input
                                        name="mother_age"
                                        id="mother_age"
                                        value={mother.age}
                                        onChange={(e) => handleInputChange(e, false)}
                                        onFocus={(e) => e.target.select()}
                                        className="p-2 border rounded mb-4 w-24"
                                        size={3}
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <label className="mb-2 font-medium">Estado Actual:</label>
                                    <select
                                        name="mother_dead"
                                        id="mother_dead"
                                        value={mother.dead === true ? 'true' : 'false'}
                                        onChange={(e) => handleInputChange(e, false)}
                                        className="p-2 border rounded mb-4"
                                    >
                                        <option value="false">Vivo</option>
                                        <option value="true">Fallecido</option>
                                    </select>
                                </div>
                            </div>
                            <label className="mb-2 font-medium">Ocupación:</label>
                            <input
                                type="text"
                                name="mother_occupation"
                                id="mother_occupation"
                                value={mother.occupation}
                                onChange={(e) => handleInputChange(e, false)}
                                onFocus={(e) => e.target.select()}
                                className="p-2 border rounded mb-4"
                            />
                        </div>
                    </form>

                    {/* Relationship Section */}
                    <div className="mt-0 mx-3 text-xs">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className='col-span-1 mr-2'>
                                <h3 className="mb-2 font-medium">Relación padres</h3>
                                <select
                                    value={relationship}
                                    onChange={handleRelationshipChange}
                                    className="p-2 border rounded w-full"
                                >
                                    <option value="Matrimonio">Matrimonio</option>
                                    <option value="Separación">Separación</option>
                                    <option value="Divorcio">Divorcio</option>
                                    <option value="Convivientes">Convivientes</option>
                                </select>
                            </div>
                            <div className='col-span-1 grid ml-2'>
                                <label className="mb-2 font-medium">Número de hijos:</label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <div
                                            key={num}
                                            className={`p-3 rounded cursor-pointer ${numberChilds === num ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                            onClick={() => { setNumberChilds(num) }}
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex justify-end">
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

export default memo(AddCoupleModal);