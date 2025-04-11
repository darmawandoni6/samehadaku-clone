import { FC } from 'react';

interface Props {
  text: string;
}
const Badge: FC<Props> = prop => {
  return (
    <div className="rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent hover:bg-secondary/80 bg-primary/20 text-white">
      {prop.text}
    </div>
  );
};

export default Badge;
