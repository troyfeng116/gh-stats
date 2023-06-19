import { VERSION_NUMBER } from '@/config/constants'

if (process.env.NODE_ENV === 'development') {
    console.log(`In dev! v${VERSION_NUMBER}`)
} else {
    console.log(`v${VERSION_NUMBER}`)
    console.log = () => false
    console.error = () => false
    console.warn = () => false
    console.info = () => false
    console.group = () => false
    console.groupCollapsed = () => false
}
