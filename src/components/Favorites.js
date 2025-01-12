import KaspiGold from '../../src/img/kaspi-gold.svg'

export default function Favorite() {
    return(
        <div className="favorites container">
        <h2>Частые</h2>
        <ul>
            <li><img className="" src={KaspiGold} alt="" width={35} height={30} />
            <span>Петр В.</span></li>
            <li><img className="" src={KaspiGold} alt="" width={35} height={30} />
            <span>Анастасия А.</span></li>
            <li><img className="" src={KaspiGold} alt="" width={35} height={30} />
            <span>Иван К.</span></li>
        </ul>
        </div>
    )
}