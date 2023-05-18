const palette = {
  neutral100: "#FFFFFF",
  neutral900: "#010006",

  primary100: "#28415F",
  primary200: '#8ecccc',
  primary300: "#50717b",

  secondary100: "#3a4042",
  secondary200: "#212121",

  accent100: "#FFEED4",


  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  eventBg: "#F99393",



} as const



export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.primary200,

  /**
   * The default color of the screen background.
   */
  background: palette.secondary200,

  erythrocytes: palette.primary100,
  leukocytes: palette.primary200,


}
