import { Link, useLocation } from "react-router-dom"
import "./BreadCrumbs.css"

interface Breadcrumb {
    title: string,
    path: string
}

export const BreadCrumbs = () => {
    const location = useLocation();

    const allcrumbs: Breadcrumb[] = [];
    const path = location.pathname;

   //Getting previous page title
    const startCrumb = location.state?.type;
    let startPath;

    if(startCrumb === "Spel") {
        startPath = "/games"
    } else if(startCrumb === "Din profil") {
        startPath = "/profile"
    } else {
        startPath = "/"
    }

    const completeStartCrumb = {
        title: startCrumb,
        path: startPath
    }

    allcrumbs.push(completeStartCrumb);

    //Replacing symbols with spaces in title
    const formatTitle = (title: string) => {
        const titleArr = title.split("%20");
        const result = titleArr.join(" ");

        const newCrumb: Breadcrumb = {
            title: result,
            path: ""
        }

        allcrumbs.push(newCrumb);
    }

    //Filtering for page title in url
    const page = path.split("/").filter(crumb => crumb !== "" && crumb !== "details" && isNaN(Number(crumb)));
    page.map((title) => formatTitle(title));

    return (
        <ul className="breadcrumbs">
            {allcrumbs.map((breadcrumb, index) => (
                <li key={index}>
                    {
                        breadcrumb.path &&
                        <Link to={breadcrumb.path}>
                            { breadcrumb.title }
                        </Link>
                    }
                    {
                        breadcrumb.path === "" &&
                        breadcrumb.title
                    }
                </li>
            ))}
        </ul>
    )
}
