interface SvgIconProps {
  width?: number;
  height?: number;
  className?: string;
  isOpen?: boolean;
  theme?: string;
}

const MenuIcon: React.FC<SvgIconProps> = ({
  width = 35,
  height = 19,
  className,
  isOpen = false,
  theme = "darkTheme",
}) => {
  // If menu is open, force burgundy (#712538)
  // Otherwise use theme: lightTheme = burgundy, darkTheme = cream
  const colorTheme = isOpen ? "#712538" : theme === "lightTheme" ? "#712538" : "#ECE8E2";

  return isOpen ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="25"
      viewBox="0 0 26 25"
      fill="none"
      className={className}
    >
      <path
        d="M1.37744 1L24.6221 24.2446"
        stroke={colorTheme}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M24.6221 1L1.37744 24.2446"
        stroke={colorTheme}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 9.84H35"
        stroke={colorTheme}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M0 18H35"
        stroke={colorTheme}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M0 1H35"
        stroke={colorTheme}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default MenuIcon;
