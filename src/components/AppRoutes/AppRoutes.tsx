import { FC } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "../../App"

const paths = [
    "/",
    "/add-user",
    "/?sortKey=firstName",
    "/edit-user/:userid",
    "/success/:username/:userid",
    "/delete-user/:userid",
]

const AppRoutes: FC = () => (
    <Router>
        <Routes>
            {paths.map(path => <Route key={path} path={path} element={<App />} />)}
        </Routes>
    </Router>
)

export default AppRoutes