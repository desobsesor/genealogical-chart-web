import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";

type HoverCardProps = {
    data?: any;
    children?: React.ReactNode;
}

const HoverCardContentDiv: React.FC<HoverCardProps> = ({ data, children }) => {
    const { title, description, time } = data;
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent align="start" alignOffset={4} className="w-80">
                <div className="flex space-x-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold flex justify-start">{title}</h4>
                        <p className="text-sm justify-start">
                            {description}
                        </p>
                        {time && <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                {time}
                            </span>
                        </div>}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default HoverCardContentDiv;
