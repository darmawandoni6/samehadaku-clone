import { forwardRef } from 'react';

import Button from '../button';

interface Props {
  url: string;
  title: string;
  closeTrailer: VoidFunction;
}
const Trailer = forwardRef<HTMLIFrameElement, Props>((props, ref) => {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 z-10 -right-10 text-white hover:bg-white/20 rounded-full"
          onClick={props.closeTrailer}
        >
          <i className="fa-solid fa-x text-xl"></i>
        </Button>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          <iframe
            ref={ref}
            className="absolute top-0 left-0 w-full h-full"
            src={props.url}
            title={props.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
});

Trailer.displayName = 'Trailer';
export default Trailer;
