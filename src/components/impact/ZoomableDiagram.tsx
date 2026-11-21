import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Focus, Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ZoomableDiagram({ children, label }: { children: ReactNode; label: string }) {
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : 200;
  return <div className="impact-diagram" aria-label={label}>
    <TransformWrapper minScale={0.7} maxScale={3} centerZoomedOut wheel={{ disabled: true }} doubleClick={{ disabled: true }} panning={{ excluded: ["button", "select"] }}>
      {({ zoomIn, zoomOut, resetTransform, centerView }) => <>
        <TransformComponent wrapperClass="impact-diagram-viewport" contentClass="impact-diagram-content">{children}</TransformComponent>
        <div className="impact-diagram-tools">
          <Button variant="ghost" size="icon-sm" aria-label={`Zoom in ${label}`} title="Zoom in" onClick={() => zoomIn(0.3, duration)}><Plus /></Button>
          <Button variant="ghost" size="icon-sm" aria-label={`Zoom out ${label}`} title="Zoom out" onClick={() => zoomOut(0.3, duration)}><Minus /></Button>
          <Button variant="ghost" size="icon-sm" aria-label={`Center ${label}`} title="Center view" onClick={() => centerView(undefined, duration)}><Focus /></Button>
          <Button variant="ghost" size="icon-sm" aria-label={`Reset ${label} view`} title="Reset view" onClick={() => resetTransform(duration)}><RotateCcw /></Button>
        </div>
      </>}
    </TransformWrapper>
  </div>;
}