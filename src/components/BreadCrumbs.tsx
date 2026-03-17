import { Link, useLocation } from "react-router-dom"
import "./BreadCrumbs.css"

interface Breadcrumb {
    breadcrumb: string,
    path: string
}

export const BreadCrumbs = () => {

    // Getting states from location 
    const location = useLocation();
    const { type, title } = location.state;

    // Creating crumbs with paths
    const allCrumbs: Breadcrumb[] = [];
    let crumb: Breadcrumb = {
        breadcrumb: type,
        path: "" 
    }

    if(type === "Spel") {
        crumb.path = "/games";

    } else if (type === "Din profil") {
        crumb.path = "/profile";
    } else {
        crumb.breadcrumb = "Hem",
        crumb.path = "/"
    }

    allCrumbs.push(crumb)
    allCrumbs.push({breadcrumb: title, path: ""});
    
    return (
        <ul className="breadcrumbs">
            {allCrumbs.length > 0 && allCrumbs.map((breadcrumb, index) => (

                breadcrumb.path !== null && breadcrumb.path !== "" 
                ? <li key={index}><Link to={breadcrumb.path}>{ breadcrumb.breadcrumb }</Link></li>
                : <li key={index}>{ breadcrumb.breadcrumb }</li>

            ))}
        </ul>
    )
}
