export default function useUtils() {
  const hasClass = (el: HTMLElement, className: string) => {
    return el.classList
      ? el.classList.contains(className)
      : new RegExp(`\\b${className}\\b`).test(el.className)
  }

  const slugify = (str: string) => {
    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()

    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
    const to = 'aaaaeeeeiiiioooouuuunc------'
    for (let i = 0, l = from.length; i < l; i++)
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes

    return str
  }

  const genUuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
  const genUID = () => {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    const firstPart: Number = (Math.random() * 46656) | 0
    const secondPart: Number = (Math.random() * 46656) | 0
    const firstPart1 = (`000${firstPart.toString(36)}`).slice(-3)
    const secondPart1 = (`000${secondPart.toString(36)}`).slice(-3)
    return firstPart1 + secondPart1
  }

  const dims = () => {
    const w = window
    const d = document
    const e = d.documentElement
    const g = d.getElementsByTagName('body')[0]
    const x = w.innerWidth || e.clientWidth || g.clientWidth
    const y = w.innerHeight || e.clientHeight || g.clientHeight
    return {
      x,
      y,
    }
  }
  const log = console.log.bind(console)
  return { genUID, genUuidv4, hasClass, dims, slugify, log }
}
