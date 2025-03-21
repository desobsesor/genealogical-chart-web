import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Member } from "@/models/Member.model";
import { CalendarIcon } from "lucide-react";

type EventHoverCardProps = {
    member: Member;
    children?: React.ReactNode;
}

const EventHoverCard: React.FC<EventHoverCardProps> = ({ children, member }) => {
    const { events } = member;
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent align="start" alignOffset={4} className="w-100 p-4">
                {!events && (
                    <>
                        Clic para agregar un evento
                    </>
                )}
                {events && events.length > 0 && (
                    <div className="flex items-center space-x-4">
                        <div className="space-y-0">
                            <p className="text-sm text-muted-foreground font-semibold justify-items-start mb-2 border-b-2 border-gray-400">Eventos importantes</p>
                            <div className="space-y-1 min-w-full">
                                {events.map((event: any, index) => (
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
                            </div>
                        </div>
                    </div>
                )}
            </HoverCardContent>
        </HoverCard>
    )
}

export default EventHoverCard;