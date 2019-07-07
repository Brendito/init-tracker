import withSizes from 'react-sizes'

export const mapSizesToProps = ({ width }) => ({
   isMobile: width < 480,
   isTablet: width >= 480 && width < 1024,
   isLaptop: width >= 1024 && width < 1680,
   isDesktop: width >= 1680
})
export const withScreenSizes = ({ mapSizesToProps }) => {
   return withSizes(mapSizesToProps)
}
