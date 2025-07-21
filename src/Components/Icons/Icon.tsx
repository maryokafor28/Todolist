import todoimg from "../../assets/images/todo-image.svg";
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

export { TodoImage };
