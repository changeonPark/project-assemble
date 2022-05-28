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

// convert base64 -> Blob
export function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = window.atob(dataURI.split(",")[1])
  else byteString = window.unescape(dataURI.split(",")[1])

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })

  // var binary = window.atob(dataURI.split(',')[1]);
  // var array = [];
  // for(var i = 0; i < binary.length; i++) {
  //     array.push(binary.charCodeAt(i));
  // }
  // return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}
