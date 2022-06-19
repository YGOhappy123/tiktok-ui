// Layouts
import { HeaderOnly } from '~/components/Layouts'

// Pages
import HomePage from '~/pages/Home'
import FollowingPage from '~/pages/Following'
import ProfilePage from '~/pages/Profile'
import UploadPage from '~/pages/Upload'

const PUBLIC_ROUTES = [
    { path: '/', component: HomePage },
    { path: '/following', component: FollowingPage },
    { path: '/profile', component: ProfilePage, layout: null },
    { path: '/upload', component: UploadPage, layout: HeaderOnly }
]

const PRIVATE_ROUTES = []

export { PUBLIC_ROUTES, PRIVATE_ROUTES }