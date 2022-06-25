// Routes config
import { ROUTES_CONFIG } from '~/config'

// Layouts
import { HeaderOnly } from '~/layouts'

// Pages
import HomePage from '~/pages/Home'
import FollowingPage from '~/pages/Following'
import ProfilePage from '~/pages/Profile'
import UploadPage from '~/pages/Upload'
import SearchPage from '~/pages/Search'

const PUBLIC_ROUTES = [
    { path: ROUTES_CONFIG.home, component: HomePage },
    { path: ROUTES_CONFIG.following, component: FollowingPage },
    { path: ROUTES_CONFIG.profile, component: ProfilePage },
    { path: ROUTES_CONFIG.upload, component: UploadPage, layout: HeaderOnly },
    { path: ROUTES_CONFIG.search, component: SearchPage }
]

const PRIVATE_ROUTES = []

export { PUBLIC_ROUTES, PRIVATE_ROUTES }
