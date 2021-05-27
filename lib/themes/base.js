import normal from './normal'
import dark from './dark'

const themes = {
  normal,
  dark,
}

export default function getTheme(theme) {
  console.log({theme});
  return themes[theme]
}
