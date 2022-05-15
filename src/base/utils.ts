// Tailwind CSS
export function cls(...classnames: string[]) {
  return classnames.join(" ")
}

// Scroll Event Function
export function eventFit(callback: any) {
  let tick = false
  return function trigger() {
    if (tick) {
      return
    }

    tick = true

    return requestAnimationFrame(function task() {
      tick = false
      return callback()
    })
  }
}

// DeDuplicate Array
export function deDuplicationArray(array1: string[]): string[] {
  if (array1.length === 0) return array1
  else {
    return array1.filter((item, index) => {
      return array1.indexOf(item) === index
    })
  }
}

// Unix Time Changer
export function TimestampToTime(timestamp: string) {
  const time =
    Math.floor(new Date().getTime() / 1000) -
    Math.floor(new Date(timestamp).getTime() / 1000)
  return {
    dd: Math.floor(time / 3600 / 24),
    hh: Math.floor(time / 3600),
    mm: Math.floor(time / 3600),
  }
}
