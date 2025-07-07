import yellowclock from "../../assets/images/yelloe-clock.jpg";
import whiteclock from "../../assets/images/white-clock.jpg";

type ImageProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

function YellowClockIcon({ className, width, height }: ImageProps) {
  return (
    <img
      src={yellowclock}
      alt="Yellow Clock"
      className={className}
      style={{ width, height }}
    />
  );
}
function WhiteClockIcon({ className, width, height }: ImageProps) {
  return (
    <img
      src={whiteclock}
      alt="White Clock"
      className={className}
      style={{ width, height }}
    />
  );
}

export { YellowClockIcon, WhiteClockIcon };
