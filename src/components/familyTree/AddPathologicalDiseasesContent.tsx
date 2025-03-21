import { PathologicalDiseases } from '@/models/PathologicalDiseases.model';
import { PopoverClose } from '@radix-ui/react-popover';
import { PlusCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useHelper } from '../../services/context/HelperContext';
import { Button } from '../ui/button';

const AddPathologicalDiseasesContent: React.FC = () => {
    const {
        currentPathologicalDiseases,
        setCurrentPathologicalDiseases,
        setShowPopoverPathologicalDiseases,
        setIsSaving,
        isSaving
    } = useHelper();

    const [pathologicalDiseases, setPathologicalDiseases] = useState<PathologicalDiseases>({
        id: '1',
        name: '...',
        description: ''
    });

    useEffect(() => {
        if (currentPathologicalDiseases) {
            setPathologicalDiseases(currentPathologicalDiseases);
        }
    }, [currentPathologicalDiseases]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, isFather: boolean) => {
        const { name, value } = e.target;
        const updateMember = setPathologicalDiseases;
        updateMember((prev) => ({ ...prev, [name.split('_')[1]]: name.split('_')[1] === 'age' ? value.replace(/\D/g, '') : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setCurrentPathologicalDiseases(pathologicalDiseases);
        setShowPopoverPathologicalDiseases(true);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-lg p-2 max-w-80 justify-end float-end right-10"
            onClick={(e) => e.stopPropagation()} >
            <form onSubmit={handleSubmit} className="flex flex-row gap-y-1 h-full text-xs">
                <div className="flex flex-col bg-white p-2 w-full">
                    <h2 className="text-xl font-bold mb-4 text-blue-600">Datos de la patología</h2>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <label className="pb-4 font-semibold items-center mr-4">Enfermedad:</label>
                        <input
                            type="text"
                            name="event_name"
                            id="event_name"
                            value={pathologicalDiseases.name}
                            onChange={(e) => handleInputChange(e, true)}
                            onFocus={(e) => e.target.select()}
                            className="p-2 border rounded mb-4 col-span-4 h-8 ml-4"
                        />
                    </div>
                </div>
            </form>
            <div className="mt-0 flex justify-end">
                <PopoverClose asChild>
                    <Button className='mt-2' variant="outline">Cancelar</Button>
                </PopoverClose>
                <div className="relative mt-2 ml-2 pl-0">
                    <div className="absolute inset-y-0 start-0 flex mt-0 items-center ps-3.5 pointer-events-none mr-6">
                        <PlusCircleIcon style={{ float: 'left' }} name="success" className="h-6 w-8 text-white-500" color="#FFFFFF" />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className={`bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-2 pl-12 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                    >
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPathologicalDiseasesContent;