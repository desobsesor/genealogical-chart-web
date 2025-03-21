import { MemberEvent } from '@/models/MemberEvent.model';
import { formatDate, subtractDaysToDate, validateDateWithError } from '@/utils/dates';
import { PopoverClose } from '@radix-ui/react-popover';
import { PlusCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useHelper } from '../../services/context/HelperContext';
import { Button } from '../ui/button';

const AddEventContent: React.FC = () => {
    const [isDateValid, setIsDateValid] = useState(false);
    const [errorDateValid, setErrorDateValid] = useState<string>();
    const [invoiceDateIssue, setInvoiceDateIssue] = useState<any | null>(formatDate(new Date(), 'yyyy-MM-DD'));

    const {
        currentEvent,
        setCurrentEvent,
        setShowPopoverEvent,
        setIsSaving,
        isSaving
    } = useHelper();

    const [event, setEvent] = useState<MemberEvent>({
        id: '1',
        name: '...',
        issueDate: new Date()
    });

    useEffect(() => {
        if (currentEvent) {
            setEvent(currentEvent);
        }
    }, [currentEvent]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, isFather: boolean) => {
        const { name, value } = e.target;
        const updateMember = setEvent;
        updateMember((prev) => ({ ...prev, [name.split('_')[1]]: name.split('_')[1] === 'age' ? value.replace(/\D/g, '') : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsSaving(true);
        setCurrentEvent(event);
        setShowPopoverEvent(true);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-lg p-2 max-w-80 justify-end float-end right-10"
            onClick={(e) => e.stopPropagation()} >
            <form onSubmit={handleSubmit} className="flex flex-row gap-y-1 h-full text-xs">
                <div className="flex flex-col bg-white p-2 w-full">
                    <h2 className="text-xl font-bold mb-4 text-blue-600">Datos del evento</h2>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <label className="pb-4 font-semibold items-center">Evento:</label>
                        <input
                            type="text"
                            name="event_name"
                            id="event_name"
                            value={event.name}
                            onChange={(e) => handleInputChange(e, true)}
                            onFocus={(e) => e.target.select()}
                            className="p-2 border rounded mb-4 col-span-4 h-8"
                        />
                    </div>
                    <div className="grid col-span-1 grid-cols-6 items-center gap-4">
                        <h2 className="font-semibold col-span-1 items-center">Fecha:</h2>
                        <div data-tour="step-4" className="col-span-5 ml-2 grid grid-cols-2">
                            <div className="relative mt-2">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    name="event_issueDate"
                                    id="event_issueDate"
                                    onChange={(e) => {
                                        const newDate = new Date(e.target.value);
                                        const [isValid, error] = validateDateWithError(newDate, subtractDaysToDate(new Date(Date.now()), 1));
                                        setIsDateValid(isValid);
                                        setInvoiceDateIssue(e.target.value);
                                        setErrorDateValid(error ?? '');
                                    }}
                                    value={invoiceDateIssue}
                                    className="border border-gray-300 p-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-full ps-10 p-1.6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>
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

export default AddEventContent;