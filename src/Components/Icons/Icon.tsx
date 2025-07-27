import todoimg from "../../assets/images/todo-image.svg";
import zigzag from "../../assets/images/zigzag.svg";
import arrowhit from "../../assets/images/arrow-hit.svg";
import coffeepencil from "../../assets/images/coffee-pencilimg.jpg";
import openbook from "../../assets/images/open-book.jpg";
import bookimg from "../../assets/images/bookimg.jpeg";
import plainbook from "../../assets/images/plain-book.jpg";
import landingimage from "../../assets/images/landingimage.jpg";
import deservebetter from "../../assets/images/deserve-better.jpg";
import logo from "../../assets/images/logo.png";
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
function CoffeePencilImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={coffeepencil}
      alt="Coffee Pencil"
      className={className}
      style={{ width, height }}
    />
  );
}
function OpenBookImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={openbook}
      alt="Open Book"
      className={className}
      style={{ width, height }}
    />
  );
}
function PlainBookImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={plainbook}
      alt="Plain Book"
      className={className}
      style={{ width, height }}
    />
  );
}
function LandingImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={landingimage}
      alt="Landing"
      className={className}
      style={{ width, height }}
    />
  );
}
function BookImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={bookimg}
      alt="Book"
      className={className}
      style={{ width, height }}
    />
  );
}
function DeserveBetterImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={deservebetter}
      alt="Deserve Better"
      className={className}
      style={{ width, height }}
    />
  );
}
function LogoImage({ className, width, height }: ImageProps) {
  return (
    <img
      src={logo}
      alt="Logo"
      className={className}
      style={{ width, height }}
    />
  );
}

export {
  TodoImage,
  ZigzagImage,
  ArrowhitImage,
  CoffeePencilImage,
  OpenBookImage,
  PlainBookImage,
  LandingImage,
  BookImage,
  DeserveBetterImage,
  LogoImage,
};
