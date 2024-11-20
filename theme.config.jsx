// Nextra configuration file

import Image from "next/image";
import LanguageToggle from "./src/components/LanguageToggle";
import TOC from "./src/components/TOC";

export default {
  logo: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        style={{ display: "inline-block", margin: "5px", paddingBottom: "2px" }}
        src="/images/mainIcon.png"
        alt="OneNode logo"
        width={25}
        height={25}
      />
      <b>OneNode DB</b>
    </div>
  ),
  logoLink: "https://db.onenode.ai",
  toc: { component: <TOC /> },
  navbar: {
    extraContent: <LanguageToggle />,
  },
  project: {
    link: null,
  },
  editLink: {
    component: null,
  },
  sidebar: {
    toggleButton: true,
    titleComponent({ title, type }) {
      if (title === "Python") {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              style={{ display: "inline-block", margin: "4px" }}
              src="/images/python-icon.svg"
              alt="python logo"
              width={15}
              height={15}
            />
            <span style={{ alignSelf: "center" }}>{title}</span>
          </div>
        );
      } else if (title === "Javascript") {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              style={{ display: "inline-block", margin: "4px" }}
              src="/images/logo-javascript.svg"
              alt="javascript logo"
              width={15}
              height={15}
            />
            {title}
          </div>
        );
      }
      return <>{title}</>;
    },
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s - OneNode DB Docs",
    };
  },

  // ... other theme options
};
