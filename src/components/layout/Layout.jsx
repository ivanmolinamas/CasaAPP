import Header from "../header/Header"
import Content from "../content/Content"
import classes from "./Layout.module.css"

export default function Layout() {

    return (
        <main className={classes.main}>
            <div className={classes.header}>
            <Header />
            </div>
            <div className={classes.content}>
            <Content>
                <p>Content</p>
            </Content>
            </div>
        </main>
    )
}