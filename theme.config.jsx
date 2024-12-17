// Nextra configuration file

import Image from "next/image";
import LanguageToggle from "./src/components/LanguageToggle";
import TOC from "./src/components/TOC";

export default {
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="CapybaraDB Docs" />
      <meta
        property="og:description"
        content="The chillest AI-native database out there."
      />
    </>
  ),
  logo: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        style={{ display: "inline-block", margin: "5px", paddingBottom: "2px" }}
        src="https://capybaradb.co/images/mainIcon.png"
        alt="CapybaraDB logo"
        width={25}
        height={25}
      />
      <b>CapybaraDB</b>
    </div>
  ),
  logoLink: "https://capybaradb.co",
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
      titleTemplate: "%s - CapybaraDB Docs",
    };
  },

  // ... other theme options
};
