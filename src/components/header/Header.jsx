import './header.css'

export default function Header() {
    return (
        <div className="header">
            <div className="header--titles">
                <span className="header--title-small">React & Node</span>
                <span className="header--title-large">BLOG</span>
            </div>
            <img
            className="header--image"
            // https://wallpaperaccess.com/full/2394472.png
                src="https://wallpaperaccess.com/full/2394472.png"
            alt="header banner"
            />

            
        </div>
    )
}