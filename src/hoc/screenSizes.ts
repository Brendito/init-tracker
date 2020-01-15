import withSizes from "react-sizes";

export interface ScreenSizes {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
}

export const mapSizesToProps = (width: any) =>
  ({
    isMobile: width < 480,
    isTablet: width >= 480 && width < 1024,
    isLaptop: width >= 1024 && width < 1680,
    isDesktop: width >= 1680
  } as ScreenSizes);
export const withScreenSizes = (mapSizesToProps: any) => {
  return withSizes(mapSizesToProps);
};
