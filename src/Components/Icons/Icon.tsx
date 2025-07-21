import todoimg from "../../assets/images/todo-image.svg";
import zigzag from "../../assets/images/zigzag.svg";
import arrowhit from "../../assets/images/arrow-hit.svg";
type ImageProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};
function TodoImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={todoimg}
      alt="Todo"
      className={className}
      style={{ width, height }}
    />
  );
}
function ZigzagImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={zigzag}
      alt="Zigzag"
      className={className}
      style={{ width, height }}
    />
  );
}

function ArrowhitImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={arrowhit}
      alt="Arrow Hit"
      className={className}
      style={{ width, height }}
    />
  );
}

export { TodoImage, ZigzagImage, ArrowhitImage };
