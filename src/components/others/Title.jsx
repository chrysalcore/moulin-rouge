function Title() {
    return (
        <div className="title">
            <img className="title__logo animate__animated animate__fadeInUp" src={new URL("../../assets/icons/big-logo.svg", import.meta.url)} alt="main logo" />
            <h2 className="title__text animate__animated animate__fadeInUp">Moulin<br />Rouge<span>Restaurant</span></h2>
        </div>
    )
}

export default Title