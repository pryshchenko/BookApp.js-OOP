import { DivComponent } from '../../common/div-component';
import './header.css'

export class Header extends DivComponent {
	constructor(appstate) {
		super()
		this.appstate = appstate
	}

	render() {
		this.el.classList.add('header')
		this.el.innerHTML = `
		<a class="logomain" href="#">
			<img class="main-logo" src="static/img/logo.svg" alt="logo">
		</a>
		<div class="righside">
			<a href="#">
				<div class="search-block">
					<img src="static/img/search-header.svg" alt="search">
					Поиск книг
				</div>
			</a>
			<a href="#favorites">
				<div class="favorites">
					<img src="static/img/favorites-header.svg" alt="favorites">
					Избранное
					<span class="fav-sum">
						${this.appstate.favorites.length}
					</span>
				</div>
			</a>
		</div>
		`
		return this.el
	}
}