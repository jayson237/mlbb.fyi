import { Checkbox } from "@/components/shared/checkbox";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { Label } from "@/components/shared/label";
import { HeroType } from "@/lib/const";
import useHeroFilter from "@/lib/state/useHeroFilter";

const HeroesFilter = () => {
  const heroFilter = useHeroFilter();

  const addOrRemove = (type: string) => {
    const newArr = [...heroFilter.type];
    const index = newArr.indexOf(type);
    if (index === -1) {
      newArr.push(type);
    } else {
      newArr.splice(index, 1);
    }
    heroFilter.change(newArr);
  };

  return (
    <>
      <form action="">
        <GradiantCard className="max-w-[590px] px-6 md:w-[200px]">
          <h3 className="font-semibold">Filter by</h3>
          <p className="text-medium mt-1 text-sm">Type</p>
          <ul className="mt-2.5 flex w-full flex-col gap-2">
            {HeroType.map((type, i) => (
              <li key={i} className="flex w-full items-center gap-1.5">
                <Checkbox
                  id={type.name}
                  onClick={() => addOrRemove(type.name)}
                />
                <Label htmlFor={type.name} className="mt-[1px]">
                  {type.name}
                </Label>
              </li>
            ))}
          </ul>
        </GradiantCard>
      </form>
    </>
  );
};

export default HeroesFilter;
