import { GradiantCard } from "../shared/gradiant-card";

interface InfoCardProps {
  className?: string;
  title: string;
  value: number | undefined;
}

const InfoCard: React.FC<InfoCardProps> = ({ className, title, value }) => {
  return (
    <GradiantCard className={className} title={title}>
      <p className="mt-8 text-right text-xl/[16px] font-semibold sm:mt-7 md:mt-12 md:text-2xl lg:text-3xl">
        {value}
      </p>
    </GradiantCard>
  );
};

export default InfoCard;
