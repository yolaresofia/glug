import { useEffect, useState } from "react";

interface SvgIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  isOpen?: boolean;
}

const MenuIcon: React.FC<SvgIconProps> = ({
  width = 35,
  height = 19,
  color = "#ECE8E2",
  className,
  isOpen = false,
}) => {
  const [theme, setTheme] = useState("lightTheme");

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let footerObserver: IntersectionObserver | null = null;

    const updateNavbarTheme = () => {
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          const sectionType = section.getAttribute("data-section");
          setTheme(sectionType as string);
        }
      });
    };

    updateNavbarTheme();

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionType = entry.target.getAttribute("data-section");
            setTheme(sectionType as string);
          }
        }
      },
      { rootMargin: "-50px 0px 0px 0px", threshold: 0.6 }
    );

    document
      .querySelectorAll("section")
      .forEach((section) => observer!.observe(section));

    // Footer observer - footer has dark background so use darkTheme (light icon)
    const footer = document.querySelector("footer");
    if (footer) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setTheme("darkTheme");
            }
          }
        },
        { rootMargin: "-50px 0px 0px 0px", threshold: 0.1 }
      );
      footerObserver.observe(footer);
    }

    return () => {
      if (observer) observer.disconnect();
      if (footerObserver) footerObserver.disconnect();
    };
  }, []);

  // If menu is open, force color to #712538, otherwise keep theme logic
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
