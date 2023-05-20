import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

const Info = () => {
  return (
    <>
      <InfoIcon className="absolute right-6 top-6 h-4 w-4 cursor-pointer stroke-[3] text-softGray" />
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon className="absolute right-6 top-6 h-4 w-4 cursor-pointer stroke-[3] text-softGray" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </>
  );
};

export default Info;
