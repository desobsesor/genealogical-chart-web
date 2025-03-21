import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";
import { Member } from "@/models/Member.model";

type MemberHoverCardProps = {
    member: Member;
    children?: React.ReactNode;
}

const MemberHoverCard: React.FC<MemberHoverCardProps> = ({ children, member }) => {
    const { name, rol, age, dead, gender, occupation, pathologicalDiseases, currentStatus, events } = member;
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent align="start" alignOffset={4} className="w-80 p-4">
                <div className="flex items-center space-x-4">
                    <img src={`avatars/${member.avatar}`} alt={name} className="h-12 w-12 rounded-full" />
                    <div className="space-y-0">
                        <h4 className="text-lg font-semibold">{name}</h4>
                        {(() => {
                            let rolText;
                            switch (rol) {
                                case 'Father':
                                    rolText = 'Padre';
                                    break;
                                case 'Mother':
                                    rolText = 'Madre';
                                    break;
                                case 'Son':
                                    rolText = 'Hijo';
                                    break;
                                default:
                                    rolText = 'Hija';
                            }
                            return <p className="text-sm text-muted-foreground">Rol: {rolText}</p>;
                        })()}
                        <p className="text-sm text-muted-foreground">Edad: {age} años</p>
                        <p className="text-sm text-muted-foreground">Genero: {gender === 'Male' ? 'Masculino' : 'Femenino'}</p>
                        {occupation && <p className="text-sm text-muted-foreground">Ocupación: {occupation}</p>}
                        {pathologicalDiseases && pathologicalDiseases.length > 0 &&
                            <div>
                                <label className="text-xs text-muted-foreground font-semibold justify-items-start mb-0">Patologías</label>
                                <div className="min-w-full grid grid-cols-1 justify-items-start align-top">
                                    {pathologicalDiseases.map((pathologicalDisease: any, index: number) => (
                                        <div key={index + 1} className="flex items-center min-w-full max-h-5 gap-0 py-0 my-0">
                                            <p className="text-muted-foreground text-xs" style={{ fontSize: '10px' }}>{pathologicalDisease.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        <p className="text-sm text-muted-foreground">Estado: {dead ? 'Fallecido' : 'Vivo'}</p>
                        {events && events.length > 0 && events.map((event: any, index) => (
                            <div key={index + 1} className="flex items-center justify-between min-w-full">
                                <div className="flex items-center pt-1">
                                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                                    <span className="text-xs text-muted-foreground">{event.name}</span>
                                </div>
                                <div className="flex items-center pt-1 ml-4">
                                    <span className="text-xs text-muted-foreground">
                                        {" "} - {new Date(event.issueDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {/*<div className="flex items-center pt-2"></div>
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined: {new Date(member.joinedDate).toLocaleDateString()}
                            </span>
                        </div>*/}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default MemberHoverCard;