import UAParser from 'ua-parser-js'

const OS_TYPES = Object.freeze({
  ANDROID : 'Android',
  IOS: 'iOS'
})
const UA = new UAParser()
const os = UA.getOS();

export const isAndroidType = () => os.name === OS_TYPES.ANDROID

export const isIOSType = () => os.name === OS_TYPES.IOS