import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Member } from "@/models/Member.model";
import { DotSquareIcon } from "lucide-react";

type EventHoverCardProps = {
    member: Member;
    children?: React.ReactNode;
}

const PathologicalDiseasesHoverCard: React.FC<EventHoverCardProps> = ({ children, member }) => {
    const { pathologicalDiseases } = member;
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent align="start" alignOffset={4} className="w-100 p-4">
                {!pathologicalDiseases && (
                    <>
                        Clic para agregar una patología
                    </>
                )}
                {pathologicalDiseases && pathologicalDiseases.length > 0 && (
                    <div className="flex items-center space-x-4">
                        <div className="space-y-0">
                            <p className="text-sm text-muted-foreground font-semibold justify-items-start mb-2 border-b-2 border-gray-400">Enfermedades patológicas</p>
                            <div className="space-y-1 min-w-full">
                                {pathologicalDiseases.map((pathologicalDisease: any, index) => (
                                    <div key={index + 1} className="grid grid-cols-1 min-w-full">
                                        <div className="flex items-center pt-1">
                                            <DotSquareIcon className="mr-2 h-4 w-4 opacity-70" />
                                            <span className="text-xs text-muted-foreground">{pathologicalDisease.name}</span>
                                        </div>
                                        <div className="flex items-center pt-1 ml-4">
                                            <span className="text-xs text-muted-foreground">
                                                {pathologicalDisease.description}
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

export default PathologicalDiseasesHoverCard;